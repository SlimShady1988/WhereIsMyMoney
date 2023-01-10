import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import About from "../pages/About";
import {UserContext} from "../context";

const AppRouter = () => {
    const {user} = useContext(UserContext)
    // const user = {};
    // user.isAuth = true;

    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) => {
                    return <Route exact key={path} path={path} element={<Component/>}/>
                }
            )}
            {publicRoutes.map(({path, Component}) => {
                    return <Route exact key={path} path={path} element={<Component/>}/>
                }
            )}
            <Route path="*" element={<About/>}/>
        </Routes>
    );
}

export default AppRouter;