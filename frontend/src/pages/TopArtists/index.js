import React from 'react'
import Header from '../Header'
import './index.css'

function TopArtists() {
    return (
        <div>
            <Header />
            <div className="usable-area">
                <div className="left-menu">
                    <h1>menu</h1>
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

        </div>
    )
}

export { TopArtists }