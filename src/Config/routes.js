//importar el layout
import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutBasic from '../layouts/LayoutBasic'

// import Admin pages
import AdminHome from '../Pages/Admin'
import AdminSingIn from "../Pages/Admin/SignIn";
import AdminUsers from '../Pages/Admin/Users'
import AdminMenuWeb from "../Pages/Admin/MenuWeb";
import AdminProducts from "../Pages/Admin/Products";
import AdminBlog from "../Pages/Admin/Blog";


//import pages
import Home from '../Pages/Home';
import Contact from '../Pages/Contact';
import Products from '../Pages/Products';
import Blog from '../Pages/Blog';

//import transversal pages
import Error404 from '../Pages/Error404'


const routes = [
    {
        path: "/admin",
        component: LayoutAdmin,
        exact: false,
        routes: [
            {
                path: "/admin",
                component: AdminHome,
                exact: true
            },
            {
                path: "/admin/login",
                component: AdminSingIn,
                exact: true
            },
            {
                path: "/admin/users",
                component: AdminUsers,
                exact: true
            },
            {
                path: "/admin/menu",
                component: AdminMenuWeb,
                exact: true
            },
            {
                path: "/admin/products",
                component: AdminProducts,
                exact: true
            },
            {
                path: "/admin/blog",
                component: AdminBlog,
                exact: true
            },
            {
                component: Error404
            }
        ]

    },
    {
        path: "/",
        component: LayoutBasic,
        exact: false,
        routes: [
            {
                path: "/",
                component: Home,
                exact: true
            },
            {
                path: "/contact",
                component: Contact,
                exact: true
            },
            {
                path: "/products",
                component: Products,
                exact: true
            },
            {
                path: "/blog",
                component: Blog,
                exact: true
            },
            {
                path: "/blog/:url",
                component: Blog,
                exact: true
            },
            {
                component: Error404
            }
        ]
    }
]

export default routes;