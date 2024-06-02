import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        role: '',
        accessToken: null,
        name: ''
    });

    const changeUser = (newUser) => {
        setUser(newUser);
    };

    const saveUser = (data) => {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);
        document.cookie = `user=${JSON.stringify(data)}; expires=${expirationDate.toUTCString()}`;
    }

    const removeUser = () => {
        document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }

    const getUser = (name) => {
        const cookies = document.cookie.split('; ');

        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) {
                return JSON.parse(decodeURIComponent(cookieValue));
            }
        }
        return null;
    }

    return (
        <UserContext.Provider value={{ user, changeUser, saveUser, removeUser, getUser }}>
            {children}
        </UserContext.Provider>
    );
};
