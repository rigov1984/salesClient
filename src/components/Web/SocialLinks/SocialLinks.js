import React from 'react';
//importamos las imagenes  como si fueran componentes de React
import { ReactComponent as YouTubeIcon } from "../../../assets/img/svg/youtube.svg";
import { ReactComponent as TwiterIcon } from "../../../assets/img/svg/twitter.svg";
import { ReactComponent as FacebbokIcon } from "../../../assets/img/svg/facebook.svg";
import { ReactComponent as LinkedinIcon } from "../../../assets/img/svg/linkedin.svg";

import "./SocialLinks.scss";

export default function SocialLinks() {
    return (
        <div className="social-links">
            <a
                href="https://www.youtube.com/watch?v=GiJ6SyhCvqM"
                className="youtube"
                target="_blank"  //permite que cuando pinchen se valla al link
                rel="noreferrer"
            >
                <YouTubeIcon />
            </a>

            <a
                href="https://twitter.com/?lang=es"
                className="twitter"
                target="_blank"
                rel="noreferrer"
            >
                <TwiterIcon />
            </a>
            <a
                href="https://www.facebook.com/"
                className="facebook"
                target="_blank"
                rel="noreferrer"
            >
                <FacebbokIcon />
            </a>
            <a
                href="https://co.linkedin.com/"
                className="linkedin"
                target="_blank"
                rel="noreferrer"
            >
                <LinkedinIcon />
            </a>
        </div>
    )
}

