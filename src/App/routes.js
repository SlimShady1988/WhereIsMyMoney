import {
    ADMIN_ROUTE,
    PROFILE_ROUTE,
    BUDGET_ROUTE,
    WALLET_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    PRODUCT_ROUTE,
    OPERATIONS_ROUTE,
    ABOUT_ROUTE,
    CATEGORIES_ROUTE,
    CREDIT_OPERATION_ROUTE,
    DEBIT_OPERATION_ROUTE,
    WALLETS_ROUTE, CREDIT_CATEGORY_ROUTE, DEBIT_CATEGORY_ROUTE
} from "./utils/consts";

import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Categories from "./pages/Categories";
import Wallets from "./pages/Wallets";
import Auth from "./pages/Auth";
import About from "./pages/About";
// import CategoryItem from "./components/CategoryItem";
import Wallet from "./pages/Wallet";
import CreditCategory from "./pages/CreditCategory";
import Operations from "./pages/Operations";
import CreditOperation from "./pages/CreditOperation";
import DebitOperation from "./pages/DebitOperation";
import Budget from "./pages/Budget";
import DebitCategory from "./pages/DebitCategory";

export const adminRoutes = [
    {path:'ADMIN_ROUTE', Component: AdminDashboard}
]

export const authRoutes = [
    {path: PROFILE_ROUTE, Component: Profile},
    {path: BUDGET_ROUTE, Component: Budget},
    {path: WALLET_ROUTE + '/:id', Component: Wallet},
    {path: WALLETS_ROUTE, Component: Wallets},
    {path: DEBIT_CATEGORY_ROUTE + '/:id', Component: DebitCategory},
    {path: CREDIT_CATEGORY_ROUTE + '/:id', Component: CreditCategory},
    {path: CATEGORIES_ROUTE, Component: Categories},
    {path: PRODUCT_ROUTE, Component: Product},
    {path: OPERATIONS_ROUTE, Component: Operations},
    {path: CREDIT_OPERATION_ROUTE + '/:id', Component: CreditOperation},
    {path: DEBIT_OPERATION_ROUTE + '/:id', Component: DebitOperation},

]

export const publicRoutes = [
    {path: ABOUT_ROUTE, Component: About},
    {path: LOGIN_ROUTE, Component: Auth},
    {path: REGISTRATION_ROUTE, Component: Auth},
]