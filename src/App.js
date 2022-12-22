import './App.css';
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";  
import LogIn from './Authentification/LogIn';
import SignUp from './Authentification/SignUp';
import FirstPage from './Form/FirstPage';
import SecondPage from './Form/SecondPage';
import ThirdPage from './Form/ThirdPage';
import Header from './header/Header';

function App() {
  return (
    <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<SecondPage/>} />
          <Route exact path="/FirstPage" element={<FirstPage/>} />
          <Route exact path="/SecondPage" element={<ThirdPage/>} />
        </Routes>
    </div>
  );
}

export default App;
