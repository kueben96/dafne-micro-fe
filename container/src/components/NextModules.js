import React, { useRef } from 'react'
import { mount } from 'landing/NextApp'

export const BB8 = () => {
    // create reference to an html element
    const ref = useRef(null);

    useEffect(() => {
        mount(ref.current)
        // add empty dependency array to only call this function when the marketing object is first rendered to the screen
    }, []);

    return (
        <div ref={ref}></div>
    )
}