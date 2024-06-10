import { useState, useRef, useEffect } from 'react';


const useScrollHandler = () => {
    const [scrollUp, setScrollUp] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY.current) {
                setScrollUp(false);
            } else {
                setScrollUp(true);
            }
            lastScrollY.current = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return scrollUp;
};


export default useScrollHandler;