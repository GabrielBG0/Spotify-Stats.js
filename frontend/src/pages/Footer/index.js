import React from 'react'
import './index.css'
export default function Footer(props) {
    return (
        <nav className="footer">
            <ul className="footer-nav">{props.children}</ul>
        </nav>
    )
}