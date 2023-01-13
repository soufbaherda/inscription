import React from 'react';
import form from './form.module.css'
import logo from '../images/logoEmi.png';
import um5 from '../images/UM5.png';
import { FcNext } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
const SecondPage = () => {
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext);
    if (user == null) {
        navigate("/SignUp")
    }
    return (
        <>
            <Header />
            <div className={form.cont}>
                <div className={form[`cont-a`]}>
                    <img src={logo} className={form.logo}></img>
                    <img src={um5} className={form.logo}></img>
                </div>
                <div className={form.title}>
                    <p style={{ lineHeight: "0.4" }}>
                        <a style={{ color: "grey" }}>Merci  </a>
                        <h1>Fin du processus</h1>
                        <a style={{ color: "grey", marginBottom: "10%" }}>vous avez reçu une confirmation par e-mail.</a>
                    </p>

                </div>
            </div>
        </>
    );
}

export default SecondPage;

