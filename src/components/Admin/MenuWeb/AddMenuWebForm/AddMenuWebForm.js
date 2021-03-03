import React, { useState } from 'react';
import { Form, Input, Button, Select, notification } from "antd";
import { Icon } from '@ant-design/compatible';
import { addMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";

import "./AddMenuWebForm.scss";

export default function AddMenuWebForm(props) {
    const { setIsVisibleModal, setReloadMenuWeb } = props;
    const [menuWebData, setMenuWebData] = useState({});

    const addMenu = event => {
        event.preventDefault();
        let finalData = {
            title: menuWebData.title,
            url: (menuWebData.http ? menuWebData.http : "http://") + menuWebData.url
        };
        if (!finalData.title || !finalData.url || !menuWebData.url) {
            notification["error"]({
                message: "Todos los campos son obligatorios."
            })
        } else {
            const accesToken = getAccessTokenApi();
            finalData.active = false;
            finalData.order = 1000;

            addMenuApi(accesToken, finalData)
                .then(response => {
                    notification["success"]({
                        message: response
                    });
                    setIsVisibleModal(false);
                    setReloadMenuWeb(true);
                    setMenuWebData({})
                    finalData = {}
                })
                .catch(() => {
                    notification["error"]({
                        message: "Error en el servidor."
                    });
                });
        }
    };

    return (
        <div className="add-menu-web-form">
            <AddForm
                menuWebData={menuWebData}
                setMenuWebData={setMenuWebData}
                addMenu={addMenu}
            />
        </div>
    );
}


function AddForm(props) {
    const { menuWebData, setMenuWebData, addMenu } = props;
    const { Option } = Select;

    const selectBefore = (
        <Select
            defaultValue="http://"
            style={{ width: 90 }}
            onChange={e => setMenuWebData({ ...menuWebData, http: e })}//al valor http le agrega el valor de e(es decir el valor de option.)
        >
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>
    );
    return (
        <Form className="form-add" onSubmitCapture={addMenu}>
            <Form.Item>
                <Input
                    prefix={<Icon type="font-size" />}
                    placeholder="Titulo"
                    value={menuWebData.title}
                    onChange={e => setMenuWebData({ ...menuWebData, title: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    addonBefore={selectBefore}
                    placeholder="URL"
                    value={menuWebData.url}
                    onChange={e => setMenuWebData({ ...menuWebData, url: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit" >
                    Crear Menu
                </Button>
            </Form.Item>
        </Form>
    )
}