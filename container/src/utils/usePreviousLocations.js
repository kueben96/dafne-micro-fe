import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const usePreviousLocations = () => {
    const [previousLocations, setPreviousLocations] = useState({});
    const location = useLocation();

    useEffect(() => {
        setPreviousLocations((prev) => {
            const path = location.pathname;
            return { ...prev, [path]: prev[path] ? prev[path] + 1 : 1 };
        });
    }, [location]);

    return previousLocations;
};
