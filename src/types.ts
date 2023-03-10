export type Comet<T> = {
    get: () => T;
    set: (newValue: T) => void;
    subscribe: (callback: (newValue: T) => void) => () => void;
}
export type CometGetter<CometType> = ((get: <Target>(c: Comet<Target>) => Target) => CometType);