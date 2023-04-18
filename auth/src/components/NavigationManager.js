import { useEffect } from "react";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";
import { routes } from "../routing/routes";


/**
 * responsible for managing navigation between different micro frontend applications and the shell container app
 * by listeting for custom events and dispatching its own custom events
 * @param {*} { children }
 * @returns
 */
function NavigationManager({ children }) {
    // get current location of app
    const location = useLocation();
    // navigate to new url 
    const navigate = useNavigate();

    // set up an event listener for [shell] navigated
    // dispatched by shell container whenever user navigates to new URL within the app.
    // when this event is received --> check if new url matches of any of the "routes" inside auth
    // if so, coponent navigates using useNavigate to the new url
    useEffect(() => {
        function shellNavigationHandler(event) {
            // console.log(" shellNavigationHandler event")
            // console.log(event)
            const pathname = event.detail;
            console.log("SHELL NAVIGATION EVENT DETAIL")
            console.log(pathname)
            // console.log("match routes:", matchRoutes(routes, { pathname }))
            if (location.pathname === pathname || !matchRoutes(routes, { pathname })) {
                return;
            }
            navigate(pathname);
        }

        window.addEventListener("[shell] navigated", shellNavigationHandler);

        return () => {
            window.removeEventListener("[shell] navigated", shellNavigationHandler);
        };
    }, [location]);

    // dispatches custom event called "[auth] navigated"
    // dispatched whenever user navigates to new url within the app
    // other mfes can listen to this events and update their ui accordingly
    // component returns children, allowing the child components to render normally

    useEffect(() => {
        window.dispatchEvent(
            new CustomEvent("[auth] navigated", { detail: location.pathname })
        );
    }, [location]);

    return children;
}

export default NavigationManager;