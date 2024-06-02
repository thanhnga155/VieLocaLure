import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        role: 'user',
        accessToken: null
    });

    const changeUser = (newUser) => {
        setUser(newUser);
    };

    return (
        <UserContext.Provider value={{ user, changeUser }}>
            {children}
        </UserContext.Provider>
    );
};
