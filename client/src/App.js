import { BrowserRouter } from "react-router-dom";
import React from "react";

import AppRouter from "./Components/AppRouter";
import NavBar from "./Components/NavBar";

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;