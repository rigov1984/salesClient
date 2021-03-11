import React from 'react';
import MainBanner from "../components/Web/MainBanner";
import HomeProducts from "../components/Web/HomeProducts";
import HowMyProductsWork from "../components/Web/HowMyProductsWork";
import ReviewsProducts from "../components/Web/ReviewsProducts";

export default function Home() {

    return (
        <>
            <MainBanner />
            <HomeProducts />
            <HowMyProductsWork />
            <ReviewsProducts />
        </>
    )
};