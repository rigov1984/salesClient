import React, { useState, useEffect } from 'react';
import { Menu } from "antd";
import { Link } from "react-router-dom";//para la navegacion
import { getMenuApi } from "../../../api/menu";
import institucionalLogo from "../../../assets/img/png/logo.png";

import "./MenuTop.scss";
import Item from 'antd/lib/list/Item';
export default function MenuTop() {
    const [menuData, setMenuData] = useState([]);
    //llamamos al menu
    useEffect(() => {
        getMenuApi()
            .then(response => {
                //guardamos todos los menus activos
                const arrayMenu = [];
                response.menu.forEach(item => {

                    item.active && arrayMenu.push(item);//esta linea simplifica el if de abajo y es lo mismo
                    // if (item.active) {
                    //     arrayMenu.push(item)
                    // }
                })
                setMenuData(arrayMenu);
            })
    }, [])

    return (
        <Menu className="menu-top-web" mode="horizontal">
            <Menu.Item className="menu-top-web__logo">
                <Link to={"/"}>
                    <img src={institucionalLogo} alt="People Relax" />
                </Link>
            </Menu.Item>
            {/* recorremos el array y lo pintamos dinamicamente */}
            {menuData.map(item => {
                //detectamos si la url es externa  y la pintamos
                const external = item.url.indexOf("http") > -1 ? true : false;
                if (external) {
                    return (
                        <Menu.Item key={item._id} className="menu-top-web__item">
                            <a href={item.url} target="_blank" rel="noreferrer">{item.title}</a>
                        </Menu.Item>
                    );
                }
                return (
                    <Menu.Item key={item._id} className="menu-web-top__item">
                        <Link to={item.url}>{item.title}</Link>
                    </Menu.Item>
                )
            })}
            <div>social Media..</div>
        </Menu>
    )
}