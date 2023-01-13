import './App.css';
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import LogIn from './Authentification/LogIn';
import SignUp from './Authentification/SignUp';
import FirstPage from './Form/FirstPage';
import SecondPage from './Form/SecondPage';
import ThirdPage from './Form/ThirdPage';
import FourthPage from './Form/FourthPage';
import Final from './Form/Final';
import Header from './header/Header';
import WebcamImage from './Form/WebcamImage';
import { UserContext } from './UserContext';
import { useMemo } from 'react';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  
  return (
      <UserContext.Provider value={value}>
        <Routes>
        <Route exact path="/" element={<LogIn/>}/>
          <Route exact path="/SignUp" element={<SignUp />} />
          <Route exact path="/FirstPage" element={<FirstPage />} />
          <Route exact path="/SecondPage" element={<SecondPage />} />
          <Route exact path="/ThirdPage" element={<ThirdPage />} />
          <Route exact path="/FourthPage" element={<FourthPage />} />
          <Route exact path="/Final" element={<Final />} />
          <Route exact path="/Webcam" element={<WebcamImage />} />
        </Routes>
      </UserContext.Provider>
  );
}

export default App;
