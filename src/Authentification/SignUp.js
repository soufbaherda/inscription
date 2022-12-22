import React from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';
import school from '../images/school.jpg'
import bg from '../images/bg.jpg'
import logo from '../images/logo.png'
const SignUp = () => {
    const handlerSubmit = (e)=>{
        e.preventDefault();
        console.log("hello")

    }
    return (
        <div>
            <div className={styles[`cont`]} >
                <div className={styles[`cont-image`]} style={{ backgroundImage: `url(${bg})` }}>
                    <div className={styles[`form`]}>
                        <img src={logo} />
                        <p className={styles[`pa`]}>INSCRIPTION</p>
                        <form onSubmit={handlerSubmit}>
                            <input type="text" placeholder='Entrez votre matricule CNC ...' className={styles[`input`]}></input>
                            <a  style={{ position: "relative", left: "0%",textAlign :"left", fontSize: "15px",fontWeight: "bold",color :"#018cff"  }}>Mot de pass :</a>
                            <input type="password" placeholder='Mot de pass...' className={styles[`input`]}></input>
                            <button className={styles[`bttn`]} type="submit" >Connexion</button>
                        </form>
                        <a style={{ position: "relative", left: "7%", fontSize: "12px" }}>Besoin d’aide ? Contactez Nous !</a>
                    </div>
                </div>
                <div className={styles[`cont-image`]}>
                    <img src={school} className={styles[`img1`]} alt="Card image cap" />
                </div>
            </div>
        </div>
    );
}

export default SignUp;
