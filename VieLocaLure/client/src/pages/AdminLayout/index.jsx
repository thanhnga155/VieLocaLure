import React from 'react'
import Sidebar from '../../components/Admin/Sidebar';
import Header from '../../components/Admin/Header';
import Footer from '../../components/Admin/Footer';
import './scss/style.scss';
import Content from '../../components/Admin/Content';

const AdminLayout = () => {
    return (
        <div className='admin-page-layout'>
            <Sidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <Header />
                <div className="body flex-grow-1">
                    <Content />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default AdminLayout;