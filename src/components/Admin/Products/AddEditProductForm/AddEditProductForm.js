import React, { useEffect, useState } from 'react'
import { Form, Input, Button, notification } from "antd";
import { Icon } from '@ant-design/compatible';
import { getAccessTokenApi } from "../../../../api/auth";
import { addProductApi, updateProductApi } from "../../../../api/product";

import "./AddEditProductForm.scss";

export default function AddEditProductForm(props) {
    const { setIsVisibleModal, setReloadProducts, product } = props;
    const [productData, setProductData] = useState({});

    useEffect(() => {
        //esto es un if (si curso existe, ejecuta el setProductdata)
        product ? setProductData(product) : setProductData({});
    }, [product])

    const addProduct = e => {
        e.preventDefault();

        if (!productData.idProduct) {
            notification["error"]({
                message: "El id del producto es obligatorio."
            })
        } else {
            const accessToken = getAccessTokenApi();

            addProductApi(accessToken, productData)
                .then(response => {
                    const typeNotification = response.code === 200 ? "success" : "warning";
                    notification[typeNotification]({
                        message: response.message
                    })
                    setIsVisibleModal(false);
                    setReloadProducts(true);
                    setProductData({});
                })
                .catch(() => {
                    notification["error"]({
                        message: "Error del servidor, intentelo mas tarde."
                    })
                })

        }
    }

    const updateProduct = e => {
        e.preventDefault();
        const accessToken = getAccessTokenApi();
        updateProductApi(accessToken, product._id, productData)
            .then(response => {
                const typeNotification = response.code === 200 ? "success" : "warning";
                notification[typeNotification]({
                    message: response.message
                });
                setIsVisibleModal(false);
                setReloadProducts(true);
                setProductData({});
            })
            .catch(() => {
                notification["error"]({
                    message: "Error del servidor, intentelo mas tarde."
                })
            })
    }

    return (
        <div className="add-edit-product-form">
            <AddEditForm
                product={product}
                addProduct={addProduct}
                updateProduct={updateProduct}
                productData={productData}
                setProductData={setProductData}
            />
        </div>
    )
}


function AddEditForm(props) {
    const { product, addProduct, updateProduct, setProductData, productData } = props;

    return (
        <Form className="form-add-edit" onSubmitCapture={product ? updateProduct : addProduct}>
            <Form.Item>
                <Input
                    prefix={<Icon type="key" />}
                    placeholder="Id del producto"
                    value={productData.productData}
                    onChange={e => setProductData({ ...productData, idProduct: e.target.value })}
                    disabled={product ? true : false}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<Icon type="link" />}
                    placeholder="Url del curso"
                    value={productData.link}
                    onChange={e => setProductData({ ...productData, link: e.target.value })}

                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<Icon type="gif" />}
                    placeholder="Coupon de descuento"
                    value={productData.coupon}
                    onChange={e => setProductData({ ...productData, coupon: e.target.value })}

                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<Icon type="dollar" />}
                    placeholder="Precio del curso"
                    value={productData.price}
                    onChange={e => setProductData({ ...productData, price: e.target.value })}

                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    {product ? "Actualizar producto" : "Crear producto"}
                </Button>
            </Form.Item>
        </Form>
    )
}