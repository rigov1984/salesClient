import React, { useState, useEffect, createContext } from 'react';
import jwtDecode from 'jwt-decode';
import {
    getAccessTokenApi,
    getRefreshTokenApi,
    refreshAccesTokenApi,
    logout
} from '../api/auth';


//contexto del auth
export const AuthContext = createContext();

//el AuthProvider siempre se va a ejecutar en cualquier parte de la web
export default function AuthProvider(props) {

    const { children } = props;
    const [user, setUser] = useState({
        user: null,
        isLoading: true
    });

    useEffect(() => {
        checkUserLogin(setUser);
    }, [])

    //devolvemos el contexto que es toda la pagina web
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

//Comprueba si el usuario esta logueado
function checkUserLogin(setUser) {
    //nos devuelve el token
    const accessToken = getAccessTokenApi();
    //si el false que es nulo o que no existe.
    if (!accessToken) {
        const refreshToken = getRefreshTokenApi();
        //si el refreshToken es false es nulo y tambien caduco
        if (!refreshToken) {
            //deslogueamos el usuario
            logout();
            setUser({
                user: null,
                isLoading: false
            });
        } else {
            //si es valido refrescamos el token
            refreshAccesTokenApi(refreshToken);
        }
    } else {
        //actualizamos el user
        setUser({
            isLoading: false,
            user: jwtDecode(accessToken)
        });
    }
}
