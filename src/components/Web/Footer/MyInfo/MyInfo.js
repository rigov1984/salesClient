import React from 'react'
import LogoInstitucional from "../../../../assets/img/png/logo.png";
import SocialLink from "../../SocialLinks";

import "./MyInfo.scss";

export default function MyInfo() {
    return (
        <div className="my-info">
            <img src={LogoInstitucional} alt="People Relax" />
            <h4>
                Infórmate de lo último de masajes. Nuestras ofertas y novedades directamente en tu e-mail.</h4>
            <SocialLink />
        </div>
    )
}
