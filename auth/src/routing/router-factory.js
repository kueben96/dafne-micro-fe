import { createBrowserRouter, createMemoryRouter } from "react-router-dom";
import { routes } from "./routes";

function createRouter({ strategy, initialPathname, onNavigateBackToShell }) {
    if (strategy === 'browser') {
        return createBrowserRouter(routes);
    }

    const initialEntries = [initialPathname || "/"];
    return createMemoryRouter(routes(onNavigateBackToShell), { initialEntries: initialEntries });
}

export { createRouter };
