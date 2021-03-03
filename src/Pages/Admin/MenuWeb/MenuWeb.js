import React, { useState, useEffect } from 'react';
import { getMenuApi } from "../../../api/menu";
import MenuWebList from "../../../components/Admin/MenuWeb/MenuWebList";

export default function MenuWeb() {
    //estado que guarda el menu
    const [menu, setMenu] = useState([]);
    const [reloadMenuWeb, setReloadMenuWeb] = useState(false);

    //cuando reloadMenuWeb se vuelve a ejecutar en useefect
    //para ver los cambios reflejados en el menu sin tener que recargar la pagina
    useEffect(() => {
        getMenuApi().then(response => {
            setMenu(response.menu);
        })
        setReloadMenuWeb(false);
    }, [reloadMenuWeb])

    return (
        <div className="menu-web">
            <MenuWebList menu={menu} setReloadMenuWeb={setReloadMenuWeb} />
        </div>
    )
}