import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/Homepage';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';
import Login from './pages/SignIn/Login';
import SignUp from './pages/SignIn/SignUp';
import Destination from './pages/Destination';
import Tour from './pages/Tour';
import Contact from './pages/Contact';
import Area from './pages/Destination/DestinationArea';
import SearchResult from './pages/SearchResult';
import { GetArea } from './services/AreaApi';
import { useContext, useEffect, useState } from 'react';
import TourDetail from './pages/Tour/TourDetail';
import AdminLayout from './pages/AdminLayout';
import { UserContext, useUser } from './contexts/UserContext';
import Auth from './components/Auth';
import Booking from './pages/Booking';
import ImageSearchResult from './pages/ImageSearchResult';

const areaSample = [
    {
        'name_en': 'North Vietnam',
        'name_vi': 'Miền Bắc',
        'url': '/destination/north-vietnam',
        'id': 0
    },
    {
        'name_en': 'Central Vietnam',
        'name_vi': 'Miền Trung',
        'url': '/destination/central-vietnam',
        'id': 1
    },
    {
        'name_en': 'South Vietnam',
        'name_vi': 'Miền Nam',
        'url': '/destination/south-vietnam',
        'id': 2
    }
];

function App() {

    const [data, setData] = useState([]);
    const { user } = useContext(UserContext);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const areas = await GetArea();
                setData(areas.map(area => {
                    const parts = area.url.split('/'); 
                    return {
                        url: parts.slice(2).join('/'),
                        id: area.id
                    }
                }));
            } catch (error) {
                console.error('Error fetching all areas data:', error);
            }
        };
    
        fetchData();
        if (data.length == 0) {
            setData(areaSample.map(area => {
                const parts = area.url.split('/'); 
    
                return {
                    url: parts.slice(2).join('/'),
                    id: area.id
                }
            }));
        }
    }, [])
    return (
        <LanguageProvider>
            <div>
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        {
                            !user &&
                            <>
                                <Route path='/' element={<HomePage/>}/>
                                <Route path='/login' element={<Login/>}/>
                            </>
                        }
                        <Route path='/register' element={<SignUp/>}/>
                        <Route path='/area'>
                            <Route index element={<Destination/>} />
                            {
                                data.map(d => (
                                    <Route path={d.url} element={<Area/>} />
                                ))
                            }
                        </Route>
                        <Route path='/tour'>
                            <Route index element={<Tour/>}/>
                            <Route path=':id' element={<TourDetail />} />
                        </Route>
                        <Route path='/contact' element={<Contact/>} />
                        <Route path='/search' element={<SearchResult/>} />
                        <Route path='/search/i/:id' element={<ImageSearchResult/>} />
                        <Route element={<Auth />}>
                        {
                            user?.role === 'admin' && (
                                <>
                                    <Route path='/' element={<Navigate to={'/admin'}/>}/>
                                    <Route path='/admin/*' element={<AdminLayout />}/>
                                    <Route path='/login' element={<Navigate to={'/admin'}/>}/>
                                </>
                                
                            )
                        }
                        {
                            user?.role !== 'admin' && 
                            <Route path='/' element={<HomePage/>}/>
                        }
                        {
                            user?.role === 'client' && 
                            <>
                                <Route path='/login' element={<Navigate to={'/'}/>}/>
                                <Route path='/booking/book-tour/:tourPack/:tour' element={<Booking/>}/>
                            </>
                        }
                        </Route>
                    </Routes>
                        {
                            user?.role !== 'admin' && 
                            <Footer/>
                        }
                    
                </BrowserRouter>
            </div>
        </LanguageProvider>
    );
}

export default App;
