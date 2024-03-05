import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/Homepage';
import Footer from './components/Footer';
import { LanguageProvider } from './LanguageContext';
import Login from './pages/Login';

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
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    </LanguageProvider>
  );
}

export default App;
