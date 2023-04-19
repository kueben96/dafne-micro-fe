import { createBrowserRouter, createMemoryRouter } from "react-router-dom";
import { routes } from "./routes";

function createRouter({ strategy, initialPathname, onNavigateOnShell = null }) {
    if (strategy === 'browser') {
        return createBrowserRouter(routes({}));
    }

    const initialEntries = [initialPathname || "/"];
    return createMemoryRouter(routes(onNavigateOnShell), { initialEntries: initialEntries });
}

export { createRouter };
