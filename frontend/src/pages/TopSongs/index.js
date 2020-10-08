import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import LeftMenu from '../LeftMenu'
import './index.css'


export default function TopSongs(props) {
    return (
        <div >
            <Header />
            <div className="usable-area">
                <div className="left-menu">
                    <LeftMenu isHereS={true} />
                </div>
                <div className="content">
                    <div className="time-frame">
                        <h1>Short Term</h1>
                    </div>
                    <div className="time-frame">
                        <h1>Medium term</h1>
                    </div>
                    <div className="time-frame">
                        <h1>Long term</h1>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}