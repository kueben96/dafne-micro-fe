import { createBrowserRouter, createMemoryRouter } from "react-router-dom";
import { routes } from "./routes";

function createRouter({ strategy, initialPathname, onAuthClicked }) {
    if (strategy === 'browser') {
        return createBrowserRouter(routes(onAuthClicked));
    }
    else {
        const initialEntries = [initialPathname || "/"];
        return createMemoryRouter(routes(onAuthClicked), { initialEntries: initialEntries });
    }

}

export { createRouter };
