import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import LeftMenu from '../LeftMenu'
import { Login, setToken } from '../../services/spotifyApi'
import './index.css'


export default function TopArtists(props) {
    function login() {
        if (!localStorage.getItem('token') || localStorage.getItem('token') === null) {
            Login()
        }
    }
    return (
        <div >
            <Header />
            <div className="usable-area">
                <div className="left-menu">
                    <LeftMenu isHereH={true} />
                </div>
                <div className="home">
                    <h1>Home</h1>
                    <p>Welcome to the Spotify Stats Home page</p>
                </div>
                <button onClick={login}>teste login</button>
            </div>
            <Footer />
        </div>
    )
}