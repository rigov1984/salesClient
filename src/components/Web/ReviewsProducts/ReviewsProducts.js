import React from 'react';
import { Row, Col, Card, Avatar } from "antd";
import AvatarPersona from "../../../assets/img/jpg/avatar-persona.jpg";

import "./ReviewsProducts.scss";

export default function ReviewsProducts() {
    return (
        <Row className="reviews-products">
            <Row>
                <Col lg={4} />
                <Col lg={16} className="reviews-products__title" >
                    <h2>Forma parte de lo +35 mil estudiantes que estan aprendiendo con mis cursos..</h2>
                </Col>
                <Col lg={4} />
            </Row>
            <Row>
                <Col lg={4} />
                <Col lg={16}>
                    <Row className="row-cards">
                        <Col md={8}>
                            <CardReview
                                name="Nadin Villareal"
                                subtitle="Cliente masajeador"
                                avatar={AvatarPersona}
                                review="Lorem ipsum dolor sit amet consectetur adipiscing elit velit, donec justo netus tempus cubilia litora posuere maecenas, scelerisque hendrerit fames risus duis magnis dis. Nostra scelerisque ornare vulputate consequat volutpat, neque laoreet sem torquent ultricies, felis potenti per sapien. Dictum hendrerit morbi fermentum nam varius dapibus porta per, facilisi pretium facilisis integer massa tortor at, curabitur libero rhoncus ad ullamcorper justo blandit posuere, aliquet cras ac volutpat senectus molestie."
                            />
                        </Col>
                        <Col md={8}>
                            <CardReview
                                name="gLORIA Glorieta"
                                subtitle="Cliente masajeador"
                                avatar={AvatarPersona}
                                review="Lorem ipsum dolor sit amet consectetur adipiscing elit velit, donec justo netus tempus cubilia litora posuere maecenas, scelerisque hendrerit fames risus duis magnis dis. Nostra scelerisque ornare vulputate consequat volutpat, neque laoreet sem torquent ultricies, felis potenti per sapien. Dictum hendrerit morbi fermentum nam varius dapibus porta per, facilisi pretium facilisis integer massa tortor at, curabitur libero rhoncus ad ullamcorper justo blandit posuere, aliquet cras ac volutpat senectus molestie."
                            />
                        </Col>
                        <Col md={8}>
                            <CardReview
                                name="Nadin Villareal"
                                subtitle="Cliente masajeador"
                                avatar={AvatarPersona}
                                review="Lorem ipsum dolor sit amet consectetur adipiscing elit velit, donec justo netus tempus cubilia litora posuere maecenas, scelerisque hendrerit fames risus duis magnis dis. Nostra scelerisque ornare vulputate consequat volutpat, neque laoreet sem torquent ultricies, felis potenti per sapien. Dictum hendrerit morbi fermentum nam varius dapibus porta per, facilisi pretium facilisis integer massa tortor at, curabitur libero rhoncus ad ullamcorper justo blandit posuere, aliquet cras ac volutpat senectus molestie."
                            />
                        </Col>
                    </Row>
                    <Row className="row-cards">
                        <Col md={8}>
                            <CardReview
                                name="Pedro Infante"
                                subtitle="Cliente masajeador"
                                avatar={AvatarPersona}
                                review="Lorem ipsum dolor sit amet consectetur adipiscing elit velit, donec justo netus tempus cubilia litora posuere maecenas, scelerisque hendrerit fames risus duis magnis dis. Nostra scelerisque ornare vulputate consequat volutpat, neque laoreet sem torquent ultricies, felis potenti per sapien. Dictum hendrerit morbi fermentum nam varius dapibus porta per, facilisi pretium facilisis integer massa tortor at, curabitur libero rhoncus ad ullamcorper justo blandit posuere, aliquet cras ac volutpat senectus molestie."
                            />
                        </Col>
                        <Col md={8}>
                            <CardReview
                                name="Diego Forero"
                                subtitle="Cliente masajeador"
                                avatar={AvatarPersona}
                                review="Lorem ipsum dolor sit amet consectetur adipiscing elit velit, donec justo netus tempus cubilia litora posuere maecenas, scelerisque hendrerit fames risus duis magnis dis. Nostra scelerisque ornare vulputate consequat volutpat, neque laoreet sem torquent ultricies, felis potenti per sapien. Dictum hendrerit morbi fermentum nam varius dapibus porta per, facilisi pretium facilisis integer massa tortor at, curabitur libero rhoncus ad ullamcorper justo blandit posuere, aliquet cras ac volutpat senectus molestie."
                            />
                        </Col>
                        <Col md={8}>
                            <CardReview
                                name="Ricardo Gomez"
                                subtitle="Cliente masajeador"
                                avatar={AvatarPersona}
                                review="Lorem ipsum dolor sit amet consectetur adipiscing elit velit, donec justo netus tempus cubilia litora posuere maecenas, scelerisque hendrerit fames risus duis magnis dis. Nostra scelerisque ornare vulputate consequat volutpat, neque laoreet sem torquent ultricies, felis potenti per sapien. Dictum hendrerit morbi fermentum nam varius dapibus porta per, facilisi pretium facilisis integer massa tortor at, curabitur libero rhoncus ad ullamcorper justo blandit posuere, aliquet cras ac volutpat senectus molestie."
                            />
                        </Col>
                    </Row>
                </Col>
                <Col lg={4} />
            </Row>
        </Row>
    );
}

function CardReview(props) {
    const { name, subtitle, avatar, review } = props;
    const { Meta } = Card;

    return (
        <Card className="reviews-products__card">
            <p>{review}</p>
            <Meta
                avatar={<Avatar src={avatar} />}
                title={name}
                description={subtitle}
            />
        </Card>
    )
}