import React, { useState } from 'react';
import form from './form.module.css'
import Modal from 'react-modal';
import { FcNext } from "react-icons/fc";
import styles from "./model.module.css";
import Webcam from "react-webcam";
import { Model } from 'react-model';
import MyModal from'../Model/BootstrapDialogTitle'




const ThirdPage = () => {
    const [modal, setModal] = useState(false);
    const handlerSubmit = () => {

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
                        <a style={{ fontSize: "15px", marginLeft: "10%", fontWeight: "bold" }}>CARTE D’IDENTITÉ NATIONALE (CIN) :</a>
                        {/* <div className={form[`input`]}>
                            <input type="file" placeholder='Choose file' className={form[`input`]}></input>
                        </div> */}
                        {/* <input type="text" placeholder='Nom de famille' className={form[`input`]}></input> */}
                    </form>
                    <form onSubmit={handlerSubmit}>
                        <a style={{ fontSize: "15px", marginLeft: "10%", fontWeight: "bold" }}>Prénom :</a>
                        <button onClick={() => {
                            setModal(true);
                        }} className={styles[`btn-modal`]}>
                            Open
                        </button>
                        {modal && <MyModal OnClose={setModal(false)}
                        />}
                        {console.log({modal})}
                        <button className={form[`bttn`]} style={{ left: "0%", }} type="submit" ><a>Suivant <FcNext /></a></button>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default ThirdPage;
