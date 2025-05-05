import { BrowserRouter } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { Context } from "./index";
import AppRouter from "./Components/AppRouter";
import NavBar from "./Components/NavBar";

function App() {
    const { user } = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            user.checkAuth();
        }
    }, [user]);

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;