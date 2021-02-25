//importar el layout
import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutBasic from '../layouts/LayoutBasic'

// import Admin pages
import AdminHome from '../Pages/Admin'
import AdminSingIn from "../Pages/Admin/SignIn";
import AdminUsers from '../Pages/Admin/Users'
import AdminMenuWeb from "../Pages/Admin/MenuWeb";

//import pages
import Home from '../Pages/Home';
import Contact from '../Pages/Contact'

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
                component: Error404
            }
        ]
    }
]

export default routes;