import React, { useContext } from 'react';
import logo from '../images/logo.png'
import navbar from './header.module.css'
import { Link } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { UserContext } from '../UserContext';

const Header = () => {
    const { user, setUser } = useContext(UserContext);

    return (
        <div className={navbar.navbar}>
            <div className={navbar.container}>
                <div className={navbar.logoContainer}>
                    <img src={logo} alt='logo' className={navbar.logo} />
                </div>
                <a style={{ color: "blue" }}>Bienvenue(e)  <a style={{ color: "blue", fontWeight: "bold" }}>{user[2]} {user[3]}</a></a>
                <div >
                    <Link to ="/" onClick={() => {
                        setUser(null);
                    }} className={navbar.btn}><a>
                        Déconnexion</a>
                        <IoMdLogOut />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
