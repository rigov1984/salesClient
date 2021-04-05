import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { Icon } from '@ant-design/compatible';

import './MenuSider.scss';

function MenuSider(props) {
    const { menuCollapsed, location } = props;
    const { Sider } = Layout;
    return (
        <Sider className="admin-sider" collapsed={menuCollapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
                <Menu.Item key="/admin">
                    <Link to={"/admin"}>
                        <Icon type="home" />
                        <span className="nav-tex">Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/users">
                    <Link to={"/admin/users"}>
                        <Icon type="user" />
                        <span className="nac-tex">Usuarios</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/admin/menu">
                    <Link to={"/admin/menu"}>
                        <Icon type="menu" />
                        <span className="nac-tex">Menù</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/admin/products">
                    <Link to="/admin/products">
                        <Icon type="appstore" />
                        <span className="nac-tex">Productos</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/admin/blog">
                    <Link to="/admin/blog">
                        <Icon type="message" />
                        <span className="nac-tex">Blog</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

//El withRouter permite encontrar la ruta
export default withRouter(MenuSider);