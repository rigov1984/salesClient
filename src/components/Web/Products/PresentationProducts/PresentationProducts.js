import React from 'react';
import ProductLogo from "../../../../assets/img/png/academy-logo.png";

import "./PresentationProducts.scss";

export default function PresentationProducts() {
    return (
        <div className="presentation-products">
            <img src={ProductLogo} alt="productos" />
            <p>
                is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <p>!!!Echeles un vistazo y aproveche las ofertas..</p>
        </div>
    )
}
