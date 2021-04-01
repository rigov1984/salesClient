import React, { useState, useEffect } from 'react';
import { Row, Col, Spin, notification } from "antd";
import { getProductsApi } from '../api/product';
import PresentationProducts from "../components/Web/Products/PresentationProducts";
import ProductsList from '../components/Web/Products/ProductsList';

export default function Products() {

    const [products, setProducts] = useState(null);

    useEffect(() => {
        getProductsApi()
            .then(response => {
                // ? quiere decir que primero valida si el response tiene la propiedad code valida si no lo tiene entra al else
                if (response?.code !== 200) {
                    notification["warning"]({
                        message: response.message
                    })
                } else {
                    setProducts(response.products)
                }
            })
            .catch(() => {
                notification["error"]({
                    message: "Error del servidor, intentelo màs tarde."
                })
            })
    }, [])

    return (
        <Row>
            <Col md={4} />
            <Col md={16}>
                <PresentationProducts />
                {!products ? (
                    <Spin tip="Cargando productos" style={{ textAlign: "center", width: "100%", padding: "20px" }} />
                ) : (
                    <ProductsList products={products} />
                )}
            </Col>
            <Col md={4} />
        </Row>
    )
}