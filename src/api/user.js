import { basePath, apiVersion } from "./config";

export function signUpApi(data) {
    const url = `${basePath}/${apiVersion}/sign-up`;

    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "Application/json"
        }
    };
    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            if (result.user) {
                return { ok: true, message: "Usuario creado correctamente" };
            }
            return { ok: false, message: result.message };
        })
        .catch(err => {
            return { ok: false, message: err.message };
        })
}

export function signInApi(data) {
    const url = `${basePath}/${apiVersion}/sign-in`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "Application/json"
        }
    };
    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            // console.log(result);
            return result;
        })
        .catch(err => {
            return err.message;
        });

}

//funcion que devuelve toda la informacion de los usuarios
//toca enviar el token
export function getUsersApi(token) {
    const url = `${basePath}/${apiVersion}/users`;

    const params = {
        method: "GET",
        headers: {
            "Content-Type": "Application/json",
            Authorization: token
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err.message;
        })
}

//funcion que devuelve toda la informacion de los usuarios
//recibe el token y el tipo de usuario que se quiere octener
export function getUsersActiveApi(token, status) {
    const url = `${basePath}/${apiVersion}/users-active?active=${status}`;

    const params = {
        method: "GET",
        headers: {
            "Content-Type": "Application/json",
            Authorization: token
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err.message;
        })
}

//funcion para subir imagenes al usuario
export function uploadAvatarApi(token, avatar, userId) {
    const url = `${basePath}/${apiVersion}/upload-avatar/${userId}`;
    //obligatorio hacerlo cuando queremos mandar una imagen mediante una peticion fetch
    const formData = new FormData();

    formData.append("avatar", avatar, avatar.name);

    const params = {
        method: "PUT",
        body: formData,//estamos enviando la imagen 
        headers: {
            Authorization: token
        }
    }
    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err.message;
    })
}
//funcion para obtener la url de un avatar
export function getAvatarApi(avatarName) {
    const url = `${basePath}/${apiVersion}/get-avatar/${avatarName}`;

    return fetch(url).then(response => {
        return response.url;
    }).catch(err => {
        return err.message;
    })
}

//funcion para hacer update de un avatar
export function updateUserApi(token, user, userId) {
    const url = `${basePath}/${apiVersion}/update-user/${userId}`;
    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(user)
    }
    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err.message;
    })
}

export function activateUserApi(token, userId, status) {
    const url = `${basePath}/${apiVersion}/activate-user/${userId}`;
    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        //al bodi siempre le debemos pasar un string
        body: JSON.stringify({
            active: status
        })
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result.message;
        })
        .catch(err => {
            return err.message;
        })
}

export function deleteUserApi(token, userId) {
    const url = `${basePath}/${apiVersion}/delete-user/${userId}`;

    const params = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    }

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result.message;
        })
        .catch(err => {
            return err.message;
        })
}

//funcion para crear usuario por el administrador
export function signUpAdminApi(token, data) {
    const url = `${basePath}/${apiVersion}/sign-admin`;

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(data)
    }
    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result.message;
        })
        .catch(err => {
            return err.message;
        })
}