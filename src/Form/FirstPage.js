import React, { useContext, useState, useEffect } from 'react';
import form from './form.module.css'
import { FcNext } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import { UserContext } from '../UserContext';

const FirstPage = () => {
    const [admis, setadmis] = useState([]);
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const navigate = useNavigate()

    const { user, setUser } = useContext(UserContext);


    let matricule = user && user[0];
    console.log(user)
    useEffect(() => {
        async function getUser() {
            const res = await fetch(`http://127.0.0.1:5000/api/user/${matricule}`);
            const data = await res.json();
            setNom(data[0])
            setPrenom(data[1])
            setEmail(data[2])
            setTel(data[3])
            setadmis(data);
        }
        getUser();
    }, []);


    const handlerSubmit = (e) => {

        e.preventDefault();

        var compte = JSON.stringify({
            matricule,
            nom,
            prenom,
            email,
            tel,
        });

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: compte,
            redirect: "follow",
        };
        fetch("http://127.0.0.1:5000/api/update/", requestOptions)
        .then(()=>{
            if (user[7]) {
                if (user[8]) {
                    fetch(`http://127.0.0.1:5000/api/send/${matricule}/2`)
                        .then((response) => response.json())
                        .then((result) => {
                            console.log('send:', result);
                            navigate("/Final")
                        });
                }
                else {
                    navigate("/FourthPage")
                }
    
            }
            else {
                navigate("/ThirdPage")
            }
    
        })
        
    }

    return (
        <div>
            <Header />
            <div className={form.cont}>
                <div className={form.bar}>
                    <div className={form[`cont-a`]}>
                        <div className={form.progress}><a className={form.a1}> Votre profile</a></div>
                        <div><a className={form.a2}>Fournir CIN</a></div>
                        <a className={form.a2}>Piéces à fournir</a>
                    </div>
                </div>
                <div className={form.title}>
                    <p style={{ lineHeight: "0.4" }}>
                        <a style={{ color: "grey" }}>Etape 1 </a>
                        <h1>Votre Profile</h1>
                        <a style={{ color: "grey" }}>Verifier vos informations personnelle !!</a>
                    </p>
                </div>
                <form onSubmit={handlerSubmit} style={{
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
                    <div style={{
                        position: "relative",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover"
                    }}>
                        <a style={{ fontSize: "15px", marginLeft: "10%", fontWeight: "bold" }} >Nom de famille :</a>
                        <input type="text" placeholder='Nom de famille' className={form[`input1`]} value={nom} onChange={(e) => setNom(e.target.value)}></input>
                        <a style={{ fontSize: "15px", marginLeft: "10%", fontWeight: "bold" }}>Adresse mail :</a>
                        <input type="mail" placeholder='Adresse mail' className={form[`input1`]}
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            title="Please enter a valid email address"
                            required
                            value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div>
                        <a style={{ fontSize: "15px", marginLeft: "10%", fontWeight: "bold" }}>Prénom :</a>
                        <input type="text" placeholder='Prénom' className={form[`input1`]} value={prenom} onChange={(e) => setPrenom(e.target.value)}></input>
                        <a style={{ fontSize: "15px", marginLeft: "10%", fontWeight: "bold" }}>Numéro de téléphone :</a>
                        <input type="num" placeholder='Numéro de téléphone' className={form[`input1`]}
                            pattern="[0-9]{10}"
                            title="Please enter a valid phone number in the format: 0634567890"
                            required
                            value={tel} onChange={(e) => setTel(e.target.value)}></input>
                        <button className={form.bttn} style={{ marginLeft: "80%" }} type="submit"> <a>Suivant <FcNext /></a></button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default FirstPage;
