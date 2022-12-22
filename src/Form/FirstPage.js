import React from 'react';
import form from './form.module.css'
import { FcNext } from "react-icons/fc";
import { Link } from 'react-router-dom';

const FirstPage = () => {
    const handlerSubmit = () => {
        console.log("hello")
    }
    return (
        <div>
            <div className={form.cont}>
                <div className={form.bar}>
                    <div className={form[`cont-a`]}>
                        <div className={form.progress}><a className={form.a1}> Votre profile</a></div>
                        <div><a className={form.a2}>Piéces à fournir</a></div>
                        <a className={form.a2}>Vérification</a>
                    </div>
                </div>
                <div className={form.title}>
                    <p style={{ lineHeight: "0.4" }}>
                        <a style={{ color: "grey" }}>Etape 1 </a>
                        <h1>Votre Profile</h1>
                        <a style={{ color: "grey" }}>Verifier vos informations personnelle !!</a>
                    </p>
                </div>
                <div style={{
                    display: "grid",
                    backgroundColor: "dfeaff",
                    gridTemplateColumns: "repeat(2, 0.5fr)",
                    /* grid-gap: 2rem; */
                    gridAutoRows: "minmax(100px, auto)",
                    margin: "auto",
                    padding: "1% 2% ",
                    height: "80vh",
                    marginTop: "5%"
                }}>
                    <form onSubmit={handlerSubmit} style={{
                        position: "relative",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover"
                    }}>
                        <a style={{ fontSize: "15px", marginLeft: "10%", fontWeight: "bold" }}>Nom de famille :</a>
                        <input type="text" placeholder='Nom de famille' className={form[`input`]}></input>
                        <a style={{ fontSize: "15px", marginLeft: "10%", fontWeight: "bold" }}>Adresse mail :</a>
                        <input type="mail" placeholder='Adresse mail' className={form[`input`]}></input>
                    </form>
                    <form onSubmit={handlerSubmit}>
                        <a style={{ fontSize: "15px", marginLeft: "10%", fontWeight: "bold" }}>Prénom :</a>
                        <input type="text" placeholder='Prénom' className={form[`input`]}></input>
                        <a style={{ fontSize: "15px", marginLeft: "10%", fontWeight: "bold" }}>Numéro de téléphone :</a>
                        <input type="num" placeholder='Numéro de téléphone' className={form[`input`]}></input>
                        <Link to= "/SecondPage" ><a className={form.bttn} style={{marginLeft :"80%"}}> <a>Suivant <FcNext /></a></a></Link>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default FirstPage;
