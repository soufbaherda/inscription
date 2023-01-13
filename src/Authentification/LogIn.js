import React,{ useState } from 'react';
import styles from './login.module.css'
import school from '../images/school.jpg'
import bg from '../images/bg.jpg'
import logo from '../images/logo.png'
import { useNavigate } from 'react-router-dom';
import MuiAlert from "@material-ui/lab/Alert";



const LogIn = () => {
    const [cin, setCin] = useState("");
    const [state, setstate] = useState(true);
    const navigate = useNavigate()
    function Alert(props) {
        return <MuiAlert elevation={6} 
                         variant="filled" {...props} />;
      }
    const handlerSubmit = (e) => {
        e.preventDefault();
        fetch(`http://127.0.0.1:5000/api/exist/${cin}`)
        .then((response) => response.json())
        .then((data) => {
            if(data){
                navigate("/SignUp");
            }
            setstate(data)
        });
        

    }
    return (
        <div>
            <div className={styles[`cont`]} >
                <div className={styles[`cont-image`]} style={{ backgroundImage: `url(${bg})` }}>
                    <div className={styles[`form`]}>
                        <img src={logo} />
                        <p className={styles[`pa`]}>INSCRIPTION</p>
                        <form onSubmit={handlerSubmit}>
                            <input type="text" placeholder='Entrez votre matricule CNC ...' className={styles[`input`]} onChange={(e) => setCin(e.target.value)} onClick ={()=>{setstate(true)}}></input>
                            {state?<></>:<Alert style={{position: "relative", left: "5%",textAlign :"center"}} severity="error">Désolé mais vous n'êtes pas admis </Alert>}
                            <button className={styles[`bttn`]} type="submit">Verifier l’admission</button>
                        </form>
                        <a style={{ position: "relative", left: "30%", fontSize: "12px" }}>Besoin d’aide ? Contactez Nous !</a>
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
