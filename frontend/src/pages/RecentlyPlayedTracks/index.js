import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import LeftMenu from '../LeftMenu'
import './index.css'


export default function RecentlyPlayedTracks(props) {
    return (
        <div >
            <Header />
            <div className="usable-area">
                <div className="left-menu">
                    <LeftMenu isHereH={true} />
                </div>
                <div className="home">
                    <h1>Recently Played Tracks</h1>
                </div>
            </div>
            <Footer />
        </div>
    )
}