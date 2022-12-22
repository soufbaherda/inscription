import React from 'react';
import styles from './login.module.css'
import school from '../images/school.jpg'
import bg from '../images/bg.jpg'
import logo from '../images/logo.png'

const LogIn = () => {
    const handlerSubmit = (e) => {
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
                            <button className={styles[`bttn`]} type="submit">Verifier l’admission</button>
                        </form>
                        <a style={{ position: "relative", left: "7%", fontSize: "12px" }}>Besoin d’aide ? Contactez Nous !</a>
                    </div>
                </div>
                <div className={styles[`cont-image`]} style={{ backgroundImage: `url(${school})` }}>
                    {/* <img src={school} className={styles[`img1`]} alt="Card image cap" /> */}
                    
                </div>

            </div>
        </div>
    );
}

export default LogIn;
