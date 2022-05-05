import React, { useEffect } from 'react';

const useOnClickOutside = (
    ref: React.RefObject<HTMLElement>,
    handler: (
        e: MouseEvent | TouchEvent | null
    ) => void,
    removeEventListener?: boolean,
) => {
    useEffect(
        () => {
            const listener = (event: MouseEvent | TouchEvent) => {
                if (!ref.current || ref.current.contains(event.target as Node)) {
                    return;
                }
                handler(event);
            };
            if (removeEventListener) {
                document.removeEventListener('click', listener);
            } else {
                document.addEventListener('click', listener);
            }
            return () => {
                document.removeEventListener('click', listener);
            };
        },
        [ref, handler, removeEventListener],
    );
};

export default useOnClickOutside;