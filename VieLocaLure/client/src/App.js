import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/Homepage';
import Footer from './components/Footer';
import { LanguageProvider } from './LanguageContext';

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
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    </LanguageProvider>
  );
}

export default App;
