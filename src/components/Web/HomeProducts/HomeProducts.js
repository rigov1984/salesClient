import React from 'react'
import { Row, Col, Card, Button } from "antd";
import { Link } from "react-router-dom";
import masajeadorCuello from "../../../assets/img/jpg/react-js-hooks.jpg";
import masajeadorPies from "../../../assets/img/jpg/react-native.jpg";
import masajeadorEspalda from "../../../assets/img/jpg/javascript-es6.jpg";

import "./HomeProducts.scss";

export default function HomeProducts() {
    return (
        <Row className="home-products">
            <Col lg={24} className="home-products__title">
                <h2>Aprende y mejora tus habilidades</h2>
            </Col>

            <Col lg={4} />
            <Col lg={16}>
                <Row className="row-products" >
                    <Col md={6}>
                        <CardPorducts
                            image={masajeadorCuello}
                            title="masajeador Cuello"
                            subtitle="masajeador Cuello"
                            link=""
                        />
                    </Col>
                    <Col md={6}>
                        <CardPorducts
                            image={masajeadorPies}
                            title="masajeador Pies"
                            subtitle="masajeador Pies"
                            link=""
                        />
                    </Col>

                    <Col md={6}>
                        <CardPorducts
                            image={masajeadorEspalda}
                            title="masajeador Espalda"
                            subtitle="masajeador Espalda"
                            link=""
                        />
                    </Col>
                </Row>
            </Col>
            <Col lg={4} />
            <Col lg={24} className="home-products__more">
                <Link to="/products">
                    <Button>Ver mas..</Button>
                </Link>
            </Col>
        </Row>
    )
}

function CardPorducts(props) {
    const { image, title, subtitle, link } = props;
    const { Meta } = Card;

    return (
        <a href={link} target="_blank" rel="noopener noreferrer">
            <Card
                className="home-products__card"
                cover={<img src={image} alt={title} />}
                actions={[<Button>INGRESAR</Button>]}
            >
                <Meta title={title} description={subtitle} />
            </Card>
        </a>
    )

}
