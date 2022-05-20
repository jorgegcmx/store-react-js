import { useEffect, useState } from 'react';

export function useStateWithDep(defaultValue) {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);
    return [value, setValue];
}