import { useSyncExternalStore } from 'react';

import { Comet, CometGetter } from "./types"

export const comet = <T>(initialValue: T | CometGetter<T>): Comet<T> => {
    let value = typeof initialValue === 'function' ? (null as T) : initialValue;

    const subscribers = new Set<(newValue: T) => void>();
    const notify = (data: T) => subscribers.forEach((callback) => callback(data))

    const get = <Target>(atom: Comet<Target>) => {
        let currentValue = atom.get();
        atom.subscribe((newValue) => {
            if (newValue === currentValue) return; // So we don't re-render when we don't need to.
            currentValue = newValue;
            computeValue();
            notify(value);
        });
        return currentValue;
    }

    const computeValue = () => {
        const newValue = typeof initialValue === 'function' ? (initialValue as CometGetter<T>)(get) : value;
        if (newValue && typeof (newValue as any).then === 'function') {
            value = null as T;
            (newValue as any as Promise<T>).then(resolvedValue => {
                value = resolvedValue;
            })
        } else {
            value = newValue;
            notify(value)
        }
    }

    computeValue();

    return {
        get: () => value,
        set: (newValue: T) => {
            value = newValue
            notify(newValue);
        },
        subscribe: (callback) => {
            subscribers.add(callback);

            return () => {
                subscribers.delete(callback);
            }
        }
    }

}

export const useComet = <T>(comet: Comet<T>): [T, Comet<T>["set"]] => {
    return [useSyncExternalStore(comet.subscribe, comet.get), comet.set]
}

export const useCometValue = <T>(comet: Comet<T>): T => {
    return useSyncExternalStore(comet.subscribe, comet.get);
}

export const setCometValue = <T>(comet: Comet<T>): Comet<T>["set"] => {
    return comet.set
}