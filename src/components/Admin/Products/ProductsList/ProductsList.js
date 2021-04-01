import React, { useState, useEffect } from 'react';
import { List, Button, Modal as ModalAntd, notification } from "antd";
import { Icon } from '@ant-design/compatible';
import DragSortableList from "react-drag-sortable";
import Modal from "../../../Modal";
import AddEditProductForm from "../AddEditProductForm";
import { getAccessTokenApi } from "../../../../api/auth";
import { getCourseDataUdemyApi, deleteProductApi, updateProductApi } from "../../../../api/product";


import "./ProductsList.scss";

const { confirm } = ModalAntd;

export default function ProductsList(props) {
    const { products, setReloadProducts } = props;
    const [listProducts, setListProducts] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        const listProductArray = [];

        products.forEach(product => {
            listProductArray.push({
                content: (
                    <Product
                        product={product}
                        deleteProduct={deleteProduct}
                        editProductModal={editProductModal}
                    />
                )
            });
        });
        setListProducts(listProductArray);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products]);

    const onSort = (sortedList, dropEvent) => {
        const accessToken = getAccessTokenApi();

        sortedList.forEach(item => {
            const { _id } = item.content.props.product;
            const order = item.rank;
            updateProductApi(accessToken, _id, { order })
        });
    }

    const addProductModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Creando nuevo producto");
        setModalContent(
            <AddEditProductForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadProducts={setReloadProducts}
            />
        );
    }

    const editProductModal = product => {
        setIsVisibleModal(true);
        setModalTitle("Actualizando nuevo producto");
        setModalContent(
            <AddEditProductForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadProducts={setReloadProducts}
                product={product}
            />
        );
    }

    const deleteProduct = product => {
        const accesToken = getAccessTokenApi();

        confirm({
            title: "Eliminando producto",
            content: `Estas seguro que quieres eliminar el producto ${product.idProduct}`,
            okText: "Eliminar",
            okType: "danger",
            onOk() {
                deleteProductApi(accesToken, product._id)
                    .then(response => {
                        const typeNotification = response.code === 200 ? "success" : "warning";
                        notification[typeNotification]({
                            message: response.message
                        });
                        setReloadProducts(true);
                    })
                    .catch(() => {
                        notification["error"]({
                            message: "Error del servidor, intentelo mas tarde."
                        })
                    });
            }
        })
    }

    return (
        <div className="products-list">
            <div className="products-list__header">
                <Button type="primary" onClick={addProductModal}>Nuevo producto</Button>
            </div>
            <div className="products-list__items">
                {listProducts.length === 0 && (
                    <h2 style={{ textAlign: "center", margin: 0 }}>
                        No tienes productos creados</h2>
                )}
                {/* Se le pasa un componente con la informacion de los productos  */}
                <DragSortableList items={listProducts} onSort={onSort} type="vertical" />
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

function Product(props) {
    const { product, deleteProduct, editProductModal } = props;
    const [productData, setProductData] = useState(null);    //se guarda la informacion del producto

    useEffect(() => {
        getCourseDataUdemyApi(product.idProduct)
            .then(response => {
                if (response.code !== 200) {
                    notification["warning"]({
                        message: `El curso con el id ${product.idProduct} no se ha encontrado.`
                    })
                }
                setProductData(response.data);
            })
    }, [product]);
    //pinta los datos de los cursos cuando tenga contenido
    if (!productData) {
        return null;
    }
    // return (<h1>hello word</h1>)
    return (
        <List.Item
            actions={[
                <Button type="primary" onClick={() => editProductModal(product)} >
                    <Icon type="edit" />
                </Button>,
                <Button type="danger" onClick={() => deleteProduct(product)} >
                    <Icon type="delete" />
                </Button>
            ]}
        >
            <img src={productData.image_480x270}
                alt={productData.title}
                style={{ width: "100px", marginRight: "20px" }}
            />
            <List.Item.Meta
                title={`${productData.title} | ID:${product.idProduct}`}
                description={productData.headline}
            />
        </List.Item>
    )
}