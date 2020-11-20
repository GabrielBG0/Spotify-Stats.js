import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import LeftMenu from '../LeftMenu'
import './index.css'


export default function AccessDenied(props) {
    return (
        <div >
            <Header />
            <div className="usable-area">
                <div className="left-menu">
                    <LeftMenu isHereH={true} />
                </div>
                <div className="home">
                    <h1>Hey</h1>
                    <p>It looks like you have denied us access to your data, but it's ok! comeback later if you hcange your mind</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}