import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { FiXOctagon, FiSettings, FiChevronLeft, FiUser } from 'react-icons/fi'
import './styles.css'

function Navbar(props) {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">{props.children}</ul>
        </nav>
    )
}

function NavButtonPlay(props) {

    const [isPlaying, setIsPlaying] = useState(false)
    return (
        <li className="nav-item">
            <a href="#" className="icon-button" onClick={() => {
                if (isPlaying) {
                    props.func[1]()
                    setIsPlaying(!isPlaying)
                } else {
                    props.func[0]()
                    setIsPlaying(!isPlaying)
                }
            }}>
                {props.icon[1]}
                {props.icon[0]}
            </a>
        </li>
    )
}

function NavButton(props) {
    return (
        <li className="nav-item">
            <a href="#" className="icon-button" onClick={() => props.func}>
                {props.icon}
            </a>
        </li>
    )
}

function NavItem(props) {

    const [open, setOpen] = useState(false)
    return (
        <li className="nav-item">
            <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
                {props.icon}
            </a>
            {open && props.children}
        </li>
    )
}

function DropdownMenu() {

    const [activeMenu, setActiveMenu] = useState('main')
    const [menuHeight, setMenuHeight] = useState(null)

    function calcHeight(el) {
        const height = el.offsetHeight
        setMenuHeight(height + 35)
    }

    function DropdownItem(props) {
        return (
            <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-rigth">{props.rightIcon}</span>
            </a>
        )
    }
    return (

        <div className="dropdown" style={{ height: menuHeight }}>
            <CSSTransition in={activeMenu === 'main'}
                unmountOnExit
                timeout={500}
                classNames="menu-primary"
                onEnter={calcHeight}>
                <div className="menu">
                    <DropdownItem leftIcon={<FiUser height={20} width={20} strokeWidth={1.5} />}>My Profile</DropdownItem>
                    <DropdownItem leftIcon={<FiSettings height={20} width={20} strokeWidth={1.5} />} goToMenu="settings">Settings</DropdownItem>
                </div>
            </CSSTransition>

            <CSSTransition in={activeMenu === 'settings'}
                unmountOnExit
                timeout={500}
                classNames="menu-secondary"
                onEnter={calcHeight}>
                <div className="menu">
                    <DropdownItem leftIcon={<FiChevronLeft height={20} width={20} />} goToMenu="main">Return</DropdownItem>
                    <DropdownItem leftIcon={<FiXOctagon height={20} width={20} strokeWidth={1.5} />}>Under Construction</DropdownItem>
                </div>
            </CSSTransition>
        </div>

    )
}

export { Navbar, NavItem, DropdownMenu, NavButton, NavButtonPlay }