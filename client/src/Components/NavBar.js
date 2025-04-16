import React, { useContext } from 'react';
import { Context } from "../index";
import { HOME_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { Link, useNavigate } from "react-router-dom";
import '../Styles/Components/NavBar.css';
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const username = user.user?.username;


    const handleLogout = () => {
        user.setIsAuth(false);
        user.setUser({});
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate(HOME_ROUTE);
    };

    return (
        <nav className="navbar bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link to={HOME_ROUTE} className="custom-nav-link">
                    Мир психологии
                </Link>
                {user.isAuth ? (
                    <div className="d-flex align-items-center">
                        {username && <span className="navbar-text me-3">Привет, {username}!</span>}
                        <button className="btn btn-outline-light" type="button" onClick={handleLogout}>
                            Выйти
                        </button>
                    </div>
                ) : (
                    <div className="d-flex">
                        <button className="btn btn-outline-light me-2" type="button" onClick={() => navigate(LOGIN_ROUTE)}>
                            Выполнить вход
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
});

export default NavBar
