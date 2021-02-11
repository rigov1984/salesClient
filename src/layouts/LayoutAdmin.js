import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import useAuth from "../hooks/useAuth";
import MenuTop from '../components/Admin/MenuTop';
import MenuSider from '../components/Admin/MenuSider';
import AdminSignIn from '../Pages/Admin/SignIn/SignIn';
//importamos el hook userAuth que devuelve el contexto
// y el contexto devuelve la pagina y tiene un valor que es el user.

import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
    const { routes } = props;
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const { Header, Content, Footer } = Layout;
    const { user, isLoading } = useAuth();
    //si isloading es falso es por que ha terminado de cargar
    //es decir no hay usuarios o el usuario no esta logueado
    //const user = null;
    if (!user && !isLoading) {
        return (
            <>
                <Route path="/admin/login" component={AdminSignIn} />
                <Redirect to="/admin/login" />
            </>
        );
    }

    if (user && !isLoading) {
        return (
            <Layout>
                <MenuSider menuCollapsed={menuCollapsed} />
                <Layout className="layout-admin"
                    style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}>
                    <Header className="layout-admin__header">
                        <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed} />
                    </Header>
                    <Content className="layout-admin__content">
                        <LoadRoutes routes={routes} />
                    </Content>
                    <Footer className="layout-admin__footer">
                        Ricardo Gomez v
                </Footer>
                </Layout>
            </Layout >
        );
    }
    return null;
}

function LoadRoutes({ routes }) {
    return (
        <Switch>
            {
                routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                ))
            }
        </Switch>
    )
}