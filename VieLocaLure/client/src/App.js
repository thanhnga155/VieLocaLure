import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/Homepage';
import Footer from './components/Footer';
import { LanguageProvider } from './LanguageContext';
import Login from './pages/SignIn/Login';
import SignUp from './pages/SignIn/SignUp';
import Destination from './pages/Destination';
import Tour from './pages/Tour';
import Contact from './pages/Contact';

// localStorage.setItem('language', 'vi')
// require('dotenv').config()

function App() {
  return (
    <LanguageProvider>
        <div>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<SignUp/>}/>
                    <Route path='/destination' element={<Destination/>}></Route>
                    <Route path='/tour' element={<Tour/>}></Route>
                    <Route path='/contact' element={<Contact/>} />
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    </LanguageProvider>
  );
}

export default App;
