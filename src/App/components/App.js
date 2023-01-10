import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./AppRouter";
import NavBar from "./NavBar";
import {observer} from "mobx-react-lite";
import {UserContext} from "../context";
import {check} from "../http/userApi";
import {Spinner} from "react-bootstrap";

const App = observer (() => {
    const {user} = useContext(UserContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.setUser(true);
            user.setIsAuth(true);
        }).finally(() => setLoading(false))
    }, []);

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
})

export default  App;
