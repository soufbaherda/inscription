import React from 'react';
import logo from '../images/logo.png'
import navbar from './header.module.css'
import { Link } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";

const Header = () => {
    return (
        <div className={navbar.navbar}>
            <div className={navbar.container}>
                <div className={navbar.logoContainer}>
                    <img src={logo} alt='logo' className={navbar.logo} />
                </div>
                <a style={{ color: "blue" }}>Bienvenue(e)  <a style={{ color: "blue", fontWeight: "bold" }}>Ahmaed Boufal</a></a>
                <div >
                    <a className={navbar.btn}>
                        Déconnexion<IoMdLogOut />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Header;
