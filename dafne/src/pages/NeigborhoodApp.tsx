import React, { useEffect, useRef } from 'react'
import { mount } from 'neighborhood/DashboardApp'

const NeigborhoodApp = () => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (ref.current) {
            mount(ref.current);
            // add an empty dependency array to only call this function when the marketing object is first rendered to the screen
        }
    }, []);
    return <div ref={ref}></div>;
}

export default NeigborhoodApp