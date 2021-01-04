import React, { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import { FiXOctagon, FiSettings, FiChevronLeft, FiUser } from 'react-icons/fi'
import { SpotifyApi, refreshToken } from '../../../services/spotifyApi'
import { FiPlay, FiSkipForward, FiSkipBack, FiPause, FiTablet, FiSpeaker, FiTv, FiSmartphone } from 'react-icons/fi'
import { BiDevices } from 'react-icons/bi'
import { GoDeviceDesktop } from 'react-icons/go'
import { RiQuestionLine } from 'react-icons/ri'
import { GiConsoleController } from 'react-icons/gi'
import { AiOutlineCar } from 'react-icons/ai'
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

function DropdownMenu(props) {

    const [activeMenu, setActiveMenu] = useState('main')
    const [menuHeight, setMenuHeight] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('access_token'))
    const [devices, setDevices] = useState([])
    const time = new Date()

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

    function setDefaultDevice(device) {
        localStorage.setItem('device', device)
    }

    function setDeviceIcon(deviceType) {
        switch (deviceType) {
            case 'Computer':
                return (<GoDeviceDesktop height={20} width={20} />)
            case 'Tablet':
                return (<FiTablet height={20} width={20} />)
            case 'Smartphone':
                return (<FiSmartphone height={30} width={30} />)
            case 'Speaker':
                return (<FiSpeaker height={20} width={20} />)
            case 'TV':
                return (<FiTv height={20} width={20} />)
            case 'GameConsole':
                return (<GiConsoleController height={20} width={20} />)
            case 'Automobile':
                return (<AiOutlineCar height={20} width={20} />)
            default:
                return (<RiQuestionLine height={20} width={20} />)
        }

    }

    async function getDevices() {
        if (!SpotifyApi.getAccessToken) {
            SpotifyApi.setAccessToken(token)
        }
        const list = await SpotifyApi.getMyDevices()
        setDevices(list.devices)
    }

    useEffect(() => {
        if (localStorage.getItem('token_time') + localStorage.getItem('expires_in') < (time.getHours() / 1000)) {
            refreshToken()
            setToken(localStorage.getItem('access_token'))
        }
        getDevices()
        console.log(devices)
    }, [token])

    return (

        <div className="dropdown" style={{ height: menuHeight }}>
            <CSSTransition in={activeMenu === 'main'}
                unmountOnExit
                timeout={500}
                classNames="menu-primary"
                onEnter={calcHeight}>
                <div className="menu">
                    <DropdownItem leftIcon={<BiDevices height={20} width={20} />} goToMenu="settings">Devices</DropdownItem>
                </div>
            </CSSTransition>

            <CSSTransition in={activeMenu === 'settings'}
                unmountOnExit
                timeout={500}
                classNames="menu-secondary"
                onEnter={calcHeight}>
                <div className="menu">
                    <DropdownItem leftIcon={<FiChevronLeft height={20} width={20} strokeWidth={1.5} />} goToMenu="main">Return</DropdownItem>
                    {devices && devices.map((device) => (
                        <button onClick={setDefaultDevice(device.id)}><DropdownItem leftIcon={setDeviceIcon(device.type)}>{device.name}</DropdownItem></button>
                    ))}
                </div>
            </CSSTransition>
        </div>

    )
}

export { Navbar, NavItem, DropdownMenu, NavButton, NavButtonPlay, NavButtonNP }