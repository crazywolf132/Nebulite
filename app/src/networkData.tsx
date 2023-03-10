import React from 'react';
import { useCometValue } from 'nebulite';
import { todosComet } from './comets';

export default () => {
    const value = useCometValue(todosComet);

    return (
        <pre>
            <code>
                {JSON.stringify(value, null, 4)}
            </code>
        </pre>
    )
}