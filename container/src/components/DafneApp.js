import React, { useRef, useEffect } from "react";
import { mount } from "../../../dafne/src/bootstrap";

const DafneApp = () => {
    const ref = useRef(null);

    useEffect(() => {
        mount(ref.current)
    });
    return (
        <div ref={ref}></div>
    )
}

export default DafneApp