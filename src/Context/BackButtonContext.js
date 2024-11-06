// BackButtonContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context for managing back button behavior
const BackButtonContext = createContext();

// Custom hook to use the back button context
export const useBackButton = () => useContext(BackButtonContext);

export const BackButtonProvider = ({ children }) => {
    const [backAction, setBackAction] = useState(null);

    // Set a default back action to navigate -1 if no specific action is provided
    const defaultBackAction = () => window.history.back();

    return (
        <BackButtonContext.Provider value={{ backAction, setBackAction, defaultBackAction }}>
            {children}
        </BackButtonContext.Provider>
    );
};
