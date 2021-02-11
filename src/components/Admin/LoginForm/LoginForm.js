import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { Icon } from '@ant-design/compatible';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../utils/constants';
import { signInApi } from '../../../api/user';

import "./LoginForm.scss";

export default function LoginForm() {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const changeForm = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const login = async e => {
        e.preventDefault();
        const result = await signInApi(inputs);
        //si devuelve el mensaje existe un error
        if (result.message) {
            notification["error"]({ message: result.message })
        } else {
            const { accessToken, refreshToken } = result;
            //guardamos el accestoken en el localstorage
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);

            notification["success"]({ message: "Login correcto." });
            //redireccionamos al usuario
            window.location.href = "/admin";

        }
    };
    return (
        <Form className="login-form" onChange={changeForm} onSubmitCapture={login}>
            <Form.Item>
                <Input
                    prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                    type="email"
                    name="email"
                    placeholder="Correo electronico"
                    className="login-form__input"
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="login-form__input"
                />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="login-form__button">
                    Entrar
                </Button>
            </Form.Item>
        </Form>
    )
}