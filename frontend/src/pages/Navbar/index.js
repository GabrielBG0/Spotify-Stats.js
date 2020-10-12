import React, { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import { FiXOctagon, FiSettings, FiChevronLeft, FiUser } from 'react-icons/fi'
import { SpotifyApi, refreshToken } from '../../services/spotifyApi'
import { FiPlay, FiSkipForward, FiSkipBack, FiPause } from 'react-icons/fi'
import './styles.css'

function Navbar(props) {

    return (
        <nav className="navbar">
            <ul className="navbar-nav">{props.children}</ul>
        </nav>
    )
}

function NavButtonPlay(props) {
    const [token, setToken] = useState(localStorage.getItem('access_token'))
    const [isPlaying, setIsPlaying] = useState(false)
    const time = new Date()

    async function Play() {
        if (!SpotifyApi.getAccessToken) {
            SpotifyApi.setAccessToken(token)
        }
        SpotifyApi.play()
        setIsPlaying(true)
    }

    async function Pause() {
        if (!SpotifyApi.getAccessToken) {
            SpotifyApi.setAccessToken(token)
        }
        SpotifyApi.pause()
        setIsPlaying(false)
    }


    useEffect(() => {
        if (localStorage.getItem('token_time') + localStorage.getItem('expires_in') < (time.getTime() / 1000)) {
            refreshToken()
        }
        setToken(localStorage.getItem('access_token'))
    }, [])

    return (
        <li className="nav-item">
            <a href="#" className="icon-button" onClick={() => {
                if (isPlaying) {
                    Pause()
                } else if (!isPlaying) {
                    Play()
                }
            }}>
                {!isPlaying && <FiPlay />}
                {isPlaying && <FiPause />}
            </a>
        </li>
    )
}

function NavButtonNP(props) {

    const [token, setToken] = useState(localStorage.getItem('access_token'))
    const time = new Date()

    function Next() {
        if (!SpotifyApi.getAccessToken) {
            SpotifyApi.setAccessToken(token)
        }
        SpotifyApi.skipToNext()
    }

    function Previous() {
        if (!SpotifyApi.getAccessToken) {
            SpotifyApi.setAccessToken(token)
        }
        SpotifyApi.skipToPrevious()
    }

    useEffect(() => {
        if (localStorage.getItem('token_time') + localStorage.getItem('expires_in') < (time.getHours() / 1000)) {
            refreshToken()
            setToken(localStorage.getItem('access_token'))
        }
    }, [])

    return (
        <li className="nav-item">
            <a href="#" className="icon-button" onClick={() => {
                if (props.next) {
                    Next()
                } else {
                    Previous()
                }
            }}>
                {props.next && <FiSkipForward />}
                {!props.next && <FiSkipBack />}
            </a>
        </li>
    )
}

function NavButton(props) {
    return (
        <li className="nav-item">
            <a href="#" className="icon-button" >
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

export { Navbar, NavItem, DropdownMenu, NavButton, NavButtonPlay, NavButtonNP }