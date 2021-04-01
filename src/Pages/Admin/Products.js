import React, { useState, useEffect } from 'react';
import ProductsList from "../../components/Admin/Products/ProductsList";
import { getProductsApi } from "../../api/product";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [reloadProducts, setReloadProducts] = useState(false);//recargar productos

    useEffect(() => {
        getProductsApi()
            .then(response => {
                setProducts(response.products)
            });
        setReloadProducts(false);
    }, [reloadProducts]);


    return (
        <div className="products">
            <ProductsList
                products={products}
                setReloadProducts={setReloadProducts}
            />
        </div>
    )
}
