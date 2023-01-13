import React, { useEffect, useState } from 'react';
import form from './form.module.css'
import logo from '../images/logo.png'
import { FcNext } from "react-icons/fc";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';

import navbar from '../header/header.module.css'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { ClipLoader } from 'react-spinners'
import createPalette from '@material-ui/core/styles/createPalette';
//import MyModal from'../Model/BootstrapDialogTitle'




const FourthPage = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    const [state, setState] = useState(false)
    const formData = new FormData();
    const onChange = (e) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
        setImage(URL.createObjectURL(e.target.files[0]))

    };
    const { user, setUser } = useContext(UserContext);
    let matricule = user && user[0];
    let cin = user && user[1]
    if (user == null) {
        navigate("/SignUp")
    }
    const handlerSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        // const formData = new FormData();
        formData.append('file', file);
        console.log('formData', formData)
        fetch(`http://127.0.0.1:5000/api/upload/${filename.split(".")[0]}`,
            {
                method: 'POST',
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
                if (result) {
                    setMessage(result);
                    fetch(`http://127.0.0.1:5000/api/signature/${filename}`)
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data)
                            setState(data)
                            if (!data) {
                                setLoading(false);
                                alert("Veuillez Reload un autre fichier");
                                setFile(null)
                            }
                            else{
                                setLoading(true);
                                alert("C'est votre Baccalauréat, vous pouvez continuer");
                                fetch(`http://127.0.0.1:5000/api/send/${matricule}/1`)
                                    .then((response) => response.json())
                                    .then((result) => {
                                        console.log('send:', result);
                                        setLoading(false);
                                        navigate("/Final")
                                    });
                            }
                            
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            <Header />
            <div className={form.cont}>
                <div className={form.bar}>

                    <div className={form[`cont-a`]}>
                        <div ><a className={form.a2}> Votre profile</a></div>
                        <div><a className={form.a2}>Fournir CIN</a></div>
                        <div className={form.progress}><a className={form.a1}>Piéces à fournir</a></div>
                    </div>
                </div>
                <div className={form.title}>
                    <p style={{ lineHeight: "0.4" }}>
                        <a style={{ color: "grey" }}>Etape  </a>
                        <h1>Bac</h1>
                        <a style={{ color: "grey", marginBottom: "10%" }}>Votre Baccalauréat (Bac) :</a>
                    </p>

                </div>


                <div style={{
                    //display: "grid",
                    backgroundColor: "dfeaff",
                    gridTemplateColumns: "repeat(2, 0.5fr)",
                    /* grid-gap: 2rem; */
                    gridAutoRows: "minmax(100px, auto)",
                    margin: "auto",
                    marginTop: "5%",
                    padding: "1% 2% ",
                    //height: "80vh",
                    marginTop: "5%"
                }}>

                    <div style={{
                        position: "relative",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover"
                    }}>
                        <br />
                        {!loading ? (
                            <form onSubmit={handlerSubmit} className={form['form1']}>
                                <input type="file" name="file" placeholder='Choose file' className={form[`input`]}
                                    style={{ left: "20%" }}
                                    onChange={onChange}></input>
                                {file ? (
                                    <div >
                                        <p>
                                            <img style={{ width: '20%' }} src={image} alt={file.name} />
                                        </p>
                                    </div>
                                ) : <p>Drag your files here or click in this area.</p>}
                                <button type="submit" >Upload</button>
                            </form>) :
                            <ClipLoader loading={loading} size={300} className={form[`loading`]} />
                        }

                        {/* <div className={form[`input`]}>
                                
                            </div>  */}
                    </div>
                    <div>
                        <br />
                        <br />
                        <button className={form[`bttn`]} style={{ left: "5%", }} onClick={() => { navigate("/FirstPage") }}><FaArrowLeft /> précédent</button>
                        {/* {state && <button className={form[`bttn`]} style={{ left: "80%", }} >Suivant <FaArrowRight /> </button>} */}
                    </div>
                </div>

            </div>
        </>
    );
}

export default FourthPage;
