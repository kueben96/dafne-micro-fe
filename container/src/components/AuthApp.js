import React, { useRef, useEffect } from "react";
import { mount } from "../../../auth/src/bootstrap";

const AuthApp = () => {
    const ref = useRef(null);

    useEffect(() => {
        mount(ref.current)
    });
    return (
        <div ref={ref}></div>
    )
}

export default AuthApp