import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import LeftMenu from '../LeftMenu'
import './index.css'


export default function TopArtists(props) {
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
            </div>
            <Footer />
        </div>
    )
}