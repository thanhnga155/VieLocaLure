import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export { UserContext };

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const user = localStorage.getItem('user')
		if (user) {
			return JSON.parse(user);
		}
		return null
    });

    const changeUser = (newUser) => {
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    return (
        <UserContext.Provider value={{ user, changeUser }}>
            {children}
        </UserContext.Provider>
    );
};
