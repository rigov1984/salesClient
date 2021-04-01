import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Rate, notification } from "antd";
import { getCourseDataUdemyApi } from '../../../../api/product';
import "./ProductsList.scss";
import Meta from 'antd/lib/card/Meta';

export default function ProductsList(props) {
    const { products } = props;
    return (
        <div className="products-list">
            <Row>
                {products.map(product => (
                    <Col md={8} key={product._id} className="products-list__product">
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

function Product(props) {
    const { product } = props;
    const [productInfo, setProductInfo] = useState({});
    const [urlProduct, setUrlProduct] = useState("");

    const { Meta } = Card;

    useEffect(() => {
        getCourseDataUdemyApi(product._idProduct)
            .then(response => {
                if (response?.code !== 200) {
                    notification["warning"]({
                        message: response.message
                    })
                } else {
                    setProductInfo(response.data)
                    montUrl(response.data.url)
                }
            })
            .catch(() => {
                notification["error"]({
                    message: "Error del servidor, intentelo màs tarde."
                })
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product])

    const montUrl = url => {
        if (!product.link) {
            const baseUrl = `https://www.udemy.com${url}`
            const finalUrl = baseUrl + (product.coupon ? `?couponCode=${product.coupon}` : "");
            setUrlProduct(finalUrl);
        } else {
            setUrlProduct(product.link)
        }
    }
    return (
        <a href={urlProduct} target="_blank" rel="noopener noreferrer">
            <Card
                cover={<img src={productInfo.image_480x270} alt={productInfo.title} />}
            >
                <Meta
                    title={productInfo.title}
                    description={productInfo.headline}
                />
                <Button>Entrar al producto</Button>
                <div className="products-list__product-footer">
                    <span>{product.price ? `${product.price} $` : productInfo.price}</span>
                    <div>
                        <Rate disabled defaultValue={5} />
                    </div>
                </div>
            </Card>
        </a>
    )
}