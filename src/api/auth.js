import { basePath, apiVersion } from './config';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constants';
import jwtDecode from "jwt-decode";


//Funcion para octener el token
export function getAccessTokenApi() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    //Valida que el token exista 
    if (!accessToken || accessToken === "null") {
        return null;
    }

    // comprobamos si el token ha expirado y Devuelve true si el token ha caducado y false si el token no ha expirado
    return willExpireToken(accessToken) ? null : accessToken;
}

export function getRefreshTokenApi() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);


    if (!refreshToken || refreshToken === "null") {
        return null;
    }
    return willExpireToken(refreshToken) ? null : refreshToken;

}

//funcion que permite conectar con el endpoint para hacer el refreshToken
//se ejecuta el accestoken siempre que el refreshtoken sea valido
export function refreshAccesTokenApi(refreshToken) {
    const url = `${basePath}/${apiVersion}/refresh-access-token`;
    const bodyObj = {
        refreshToken: refreshToken
    };
    const params = {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: {
            "Content-Type": "application/json"
        }
    };

    fetch(url, params)
        .then(response => {
            if (response.status !== 200) {
                return null;
            }
            return response.json();
        })
        .then(result => {
            //desloguea usuario
            if (!result) {
                logout();
            } else {
                const { accessToken, refreshToken } = result;
                localStorage.setItem(ACCESS_TOKEN, accessToken);
                localStorage.setItem(REFRESH_TOKEN, refreshToken);
            }
        })
}

//Funcion para desloguear usuario
export function logout() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
}

//Funcion que comprueba que un token halla expirado
//Devuelve true si el token ha caducado y false si el token no ha expirado
function willExpireToken(token) {
    const seconds = 60;
    const metaToken = jwtDecode(token);
    const { exp } = metaToken;//sacamos la fecha de expiracion
    const now = (Date.now() + seconds) / 1000;//para pasarlo a una fecha en unix por medio de la api de javascript

    return now > exp;
}