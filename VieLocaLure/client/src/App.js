import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import HomePage from './pages/homepage';
import Footer from './components/footer';

localStorage.setItem('language', 'vi')

function App() {
  return (
    <div>
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
