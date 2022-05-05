import { useState, useEffect } from 'react';

const useViewport = () => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    useEffect(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    return {
        width,
        height,
        sizes: {
            xxl: width >= 1400,
            xl: width >= 1200 && width < 1400,
            lg: width >= 992 && width < 1200,
            md: width >= 768 && width < 992,
            sm: width >= 576 && width < 768,
            xs: width < 576,
        },
        devices: {
            desktop: width >= 992,
            tablet: width >= 768,
            phone: width < 768,
        },
    };
};

export default useViewport;