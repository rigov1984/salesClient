import React from 'react';
import { Row, Col } from "antd";
import { Icon } from '@ant-design/compatible';
import { Link } from "react-router-dom";

import "./NavigationFooter.scss";

export default function NavigationFooter() {
    return (
        <Row className="navigation-footer">
            <Col>
                <h3>Navegacion</h3>
            </Col>
            <Col md={12}></Col>
            <Col md={12}><RenderListLeft /></Col >
            <Col md={12}><RenderListRight /></Col >
        </Row>
    )
}


function RenderListLeft() {
    return (
        <ul>
            <li>
                <a href="#">
                    <Icon type="hdd" />
                    Ssitema/servidores
                </a>
            </li>
            <li>
                <a href="#">
                    <Icon type="appstore" />
                   CMS
                </a>
            </li>
            <li>
                <a href="#">
                    <Icon type="user" />
                    Portafolio
                </a>
            </li>
            <li>
                <a href="#">
                    <Icon type="right" />
                    Politica de cookies
                </a>
            </li>
            {/* lista interna
            <li>
                <Link to="/contact">
                    <Icon type="code" />
                    Desarrollo web
                </Link>
            </li> */}
        </ul>
    )
}


function RenderListRight() {
    return (
        <ul>
            <li>
                <a href="#">
                    <Icon type="book" />
                    cursos online
                </a>
            </li>
            <li>
                <a href="#">
                    <Icon type="code" />
                    Desarrollo web
                </a>
            </li>
            <li>
                <a href="#">
                    <Icon type="database" />
                    Base de datos
                </a>
            </li>
            <li>
                <a href="#">
                    <Icon type="right" />
                    Politica de privacidad
                </a>
            </li>
            {/* lista interna
            <li>
                <Link to="/contact">
                    <Icon type="code" />
                    Desarrollo web
                </Link>
            </li> */}
        </ul>
    )
}