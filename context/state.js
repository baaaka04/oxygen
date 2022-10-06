import { createContext, useContext } from 'react';

export const AppContext = createContext();

export function AppWrapper({ children }) {

    return (
        <AppContext.Provider value={{}}>
            {children}
        </AppContext.Provider>
    );
}
export function useAppContext() {
    return useContext(AppContext);
}