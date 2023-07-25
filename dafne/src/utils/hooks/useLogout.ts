import { useCallback } from 'react';

const useLogout = (): (() => void) => {
    const logout = useCallback(() => {
        localStorage.removeItem('jwtToken');
        const logoutEvent = new CustomEvent('userLogout');
        window.dispatchEvent(logoutEvent);
    }, []);

    return logout;
};

export default useLogout;
