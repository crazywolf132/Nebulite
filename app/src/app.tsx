import React from 'react';
import Total from './total'
import { useComet, resetComet } from 'nebulite';
import { bonusComet, salaryComet, todoItemComet } from './comets';
import NetworkData from './networkData';

export default () => {

    const [salary, setSalary] = useComet(salaryComet);
    const [bonus, setBonus] = useComet(bonusComet);
    const [todoItem, setTodoItem] = useComet(todoItemComet)

    return (
        <div>
            <div>
                <input value={salary} onChange={({ target: { value } }: any) => setSalary(+value)} />
            </div>
            <div>
                <input value={bonus} onChange={({ target: { value } }: any) => setBonus(+value)} />
            </div>
            <div>
                <input value={todoItem} onChange={({ target: { value } }: any) => setTodoItem(+value)} />
            </div>
            <button onClick={() => {
                resetComet(todoItemComet)
            }}>
                RESET
            </button>
            <Total />
            <NetworkData />
        </div>
    )
}