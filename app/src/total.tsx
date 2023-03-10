import { useComet, useCometValue } from 'nebulite';
import React from 'react';
import { bonusComet, outcomeComet, salaryComet } from './comets';

export default () => {

    const salary = useCometValue(salaryComet)
    const bonus = useCometValue(bonusComet)
    const result = useCometValue(outcomeComet);

    return (
        <div>
            <h2>Total</h2>
            <span>Salary: {salary}</span><br />
            <span>Bonus: {bonus}</span><br />
            <span>Together: {result}</span>
        </div>
    )
}