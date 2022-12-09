import React from 'react';
import Header from '../App/Header/Header';
import Footer from '../App/Footer/Footer';
import Main from '../App/Main/Main';
import './App.css'

function App() {
    return(
        <div className="container">
            <Header />
            <Main />
            <Footer />
        </div>
    )
}
export default App;