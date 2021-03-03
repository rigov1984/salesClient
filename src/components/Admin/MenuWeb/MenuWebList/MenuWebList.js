import React, { useState, useEffect } from 'react';
import { Switch, List, Button, Modal as ModalAntd, notification } from "antd";
import { Icon } from '@ant-design/compatible';
import Modal from "../../../Modal";
import DragSortableList from 'react-drag-sortable';
import { updateMenuApi, activateMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";
import AddMenuWebForm from "../AddMenuWebForm";

import "./MenuWebList.scss";

const { confirm } = ModalAntd;

export default function MenuWebList(props) {
    const { menu, setReloadMenuWeb } = props;
    const [listItems, setListItems] = useState([]);//guardamos la nueva version del menu
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // console.log(listItems);
    //se ejecuta(actualiza) cuando el menu se cambie 
    useEffect(() => {
        const listItemsArray = [];

        menu.forEach(item => {
            listItemsArray.push({
                content: (<MenuItem item={item} activateMenu={activateMenu} />)
            });
        });
        setListItems(listItemsArray);
    }, [menu])

    const activateMenu = (menu, status) => {
        const accesToken = getAccessTokenApi();
        activateMenuApi(accesToken, menu._id, status).then(response => {
            notification["success"]({
                message: response
            })
        })
    };
    //s ejecuta cuando el menu se cambie de posiscion(esta en la documentacion del componente DragSortableList)
    const onSort = (sortedList, dropEvent) => {
        const accesToken = getAccessTokenApi();

        //recorremos el array que devuelve el sortedList
        sortedList.forEach(item => {
            //por cada iteraccion sacamos el id de cada menu
            const { _id } = item.content.props.item;
            const order = item.rank;
            updateMenuApi(accesToken, _id, { order });

        });

    }

    const addMenuWebModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Creando nuevo Menu");
        setModalContent(
            <AddMenuWebForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadMenuWeb={setReloadMenuWeb}
            />
        )
    };
    return (
        <div className="menu-web-list">
            <div className="menu-web-list__header">
                <Button type="primary" onClick={addMenuWebModal}>Crear Menu</Button>
            </div>
            <div className="menu-web-list__items">
                <DragSortableList items={listItems} onSort={onSort} type="vertical" />
            </div>
            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
        </div>
    );
}

//componente menu
function MenuItem(props) {
    const { item, activateMenu } = props;

    return (
        <List.Item
            actions={[
                <Switch defaultChecked={item.active} onChange={e => activateMenu(item, e)} />,
                <Button type="primary">
                    <Icon type="edit" />
                </Button>,
                <Button type="danger">
                    <Icon type="delete" />
                </Button>
            ]}
        >
            <List.Item.Meta title={item.title} description={item.url} />
        </List.Item>
    )
}

