import { useEffect, useState } from 'react';
import randomNumber from '~/utils/randomNumber';

const useRandomNumber = (min: number, max: number) => {
    const [number, setNumber] = useState(randomNumber(min, max));
    useEffect(() => {
        setNumber(randomNumber(min, max));
    }, [min, max]);
    return number;
};

export default useRandomNumber;