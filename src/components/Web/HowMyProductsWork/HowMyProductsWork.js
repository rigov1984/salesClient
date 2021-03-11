import React from 'react';
import { Row, Col, Card } from "antd";
import { Icon } from '@ant-design/compatible';


import "./HowMyProductsWork.scss";

export default function HowMyProductsWork() {
    return (
        <Row className="how-my-products-work">
            <Col lg={24} className="how-my-products-work__title">
                <h2>Como funcionan mis cursos</h2>
                <h3>
                    Cada cursi cuenta con contenido bajo la web de udem
    </h3>
            </Col>

            <Col lg={4} />
            <Col lg={16}>
                <Row className="row-cards">
                    <Col md={8}>
                        <CardInfo
                            icon="clock-circle"
                            title="Cursos y clases"
                            description="Cursos de entre 10 y 30 horas cada clase con duracion maxima"
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo
                            icon="key"
                            title="Acceso 24 /7"
                            description="Accede a los cursos en cualquier momento, desde cualquier lugar"
                        />
                    </Col>

                    <Col md={8}>
                        <CardInfo
                            icon="message"
                            title="Aprendizaje colaborativo"
                            description="Aprende de los demas dejando tus dudas para que profesores y compañeros te ayuden"
                        />
                    </Col>

                </Row>
                <Row className="row-cards">
                    <Col md={8}>
                        <CardInfo
                            icon="user"
                            title="Mejora tu perfil"
                            description="Aprende y mejora tu perfil para mantenerte actualizado"
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo
                            icon="dollar"
                            title="Precios bajos"
                            description="Obten el curso que necesitas por solo 9.99 y ten acceso"
                        />
                    </Col>

                    <Col md={8}>
                        <CardInfo
                            icon="check-circle"
                            title="Certificado de finalizacion"
                            description="Al completar el curso tendras tus certificados."
                        />
                    </Col>

                </Row>
            </Col>
            <Col lg={4} />
        </Row>
    )
}


function CardInfo(props) {
    const { icon, title, description } = props;
    const { Meta } = Card;
    return (
        <Card className="how-my-products-work__card">
            <Icon type={icon} className="how-my-products-work__icon" />
            <Meta title={title} description={description} />
        </Card>
    );
};