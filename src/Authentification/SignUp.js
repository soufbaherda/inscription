import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import school from '../images/school.jpg'
import bg from '../images/bg.jpg'
import logo from '../images/logo.png'
import { UserContext } from '../UserContext';
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'relative',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid ',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const SignUp = () => {
    const [matricule, setMatricule] = useState("");
    const [password, setPassword] = useState("");
    const { user: compte, setUser: setCompte } = useContext(UserContext);
    const [state, setstate] = useState(false);
    const navigate = useNavigate();

    function Alert(props) {
        return <MuiAlert elevation={6}
            variant="filled" {...props} />;
    }
    const handlerSubmit = (e) => {
        e.preventDefault();
        var compte = JSON.stringify({
            matricule,
            password,
        });
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: compte,
            redirect: "follow",
        };
        fetch("http://127.0.0.1:5000/api/login/", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setCompte(data);
                console.log(compte)
                        if (data !== null) {
    
                            navigate("/SecondPage");
                        }
                        else {
                            setstate(true)
                        }
                    });
            }
    
    return (
            <div>
                <div className={styles[`cont`]} >
                    <div className={styles[`cont-image`]} style={{ backgroundImage: `url(${bg})` }}>
                        <div className={styles[`form`]}>
                            <img style={{ position: "relative", left: "15%" }} src={logo} />
                            <p className={styles[`pa`]}>INSCRIPTION</p>
                            <form onSubmit={handlerSubmit}>
                                <input type="text" placeholder='Entrez votre matricule CNC ...' className={styles[`input`]} onChange={(e) => setMatricule(e.target.value)} />
                                <a style={{ position: "relative", left: "10%", textAlign: "left", fontSize: "15px", fontWeight: "bold", margin: "3% 0%", color: "#018cff" }}>Mot de pass :</a>
                                <input type="password" placeholder='Mot de pass...' className={styles[`input`]} onChange={(e) => setPassword(e.target.value)} />
                                {state ? <Alert style={{ position: "relative", left: "5%", textAlign: "center" }} severity="error">Impossible de se connecter car le matricule ou le mot de passe sont incorrects.</Alert> : <></>}
                                <button className={styles[`bttn`]} type="submit" >Connexion</button>
                            </form>
                            <a style={{ position: "relative", left: "30%", fontSize: "12px" }}>Besoin d’aide ? Contactez Nous !</a>
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
