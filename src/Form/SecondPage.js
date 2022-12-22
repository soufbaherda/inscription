import React from 'react';
import form from './form.module.css'
import logo from '../images/logoEmi.png';
import um5 from '../images/UM5.png';
import {  FcNext } from "react-icons/fc";
import { Link } from 'react-router-dom';
const SecondPage = () => {
    return (
        <div className={form.cont}>

            <div className={form[`cont-a`]}>
                <img src={logo} className={form.logo}></img>
                <h1 style={{ color: '#018cff',fontSize:"35px" }} className={form.a2}>INSCRIPTION</h1>
                <img src={um5} className={form.logo}></img>
            </div>
            <div className={form.cont2}>
                <a >
                    <p>Baccalauréat + 02 copies certifiées conformes ( à presenter plutard ) ;</p>
                    <p >
                        <li>01 extrait d’acte de naissance ;</li>
                        <li> 01 copies légalisées de la carte d’identité nationale ;</li>
                        <li>01 photos récentes (petit format)  ;</li>
                        <li>Livret de santé ;</li>
                        <li>200DH (frais d’inscription + affranchissement postal) ;</li>
                    </p>
                    <p>Assurance couvrant obligatoirement les clauses particulières suivantes :</p>
                    <p>
                    <li>Etude à l’Ecole Mohammadia d’ingénieurs pendant l’année universitaire en question ;</li>
                    <li> Visites et stages en entreprise au moins pour 3 mois durant l’année universitaire en question ;</li>
                    <li>Frais médicaux, pharmaceutiques, chirurgicaux et d’hospitalisation.</li>
                    </p>
                </a>
            </div>
            <div >
                <Link to= "/FirstPage" ><a className={form.bttn} style={{marginLeft :"80%"}}> <a>Suivant <FcNext /></a></a></Link>
            </div>
        </div>
    );
}

export default SecondPage;

