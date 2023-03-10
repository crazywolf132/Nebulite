import { comet } from 'nebulite';

export const salaryComet = comet(10_000);
export const bonusComet = comet(5);
export const outcomeComet = comet((get: any) => get(salaryComet) * get(bonusComet));
export const todoItemComet = comet<number | null>(null);

export const todosComet = comet((get) => {
    const todoItemToGet = get(todoItemComet);
    let postfix = ``;
    if (todoItemToGet == null) {
        postfix = ''
    } else {
        postfix = `${todoItemToGet}`
    }

    return fetch(`https://jsonplaceholder.typicode.com/todos/${postfix}`)
        .then(response => response.json())
})