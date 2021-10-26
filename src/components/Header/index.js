import React, { useState } from 'react'
import { Navbar, NavItem, DropdownMenu, NavButtonNP, NavButtonPlay } from './Navbar'
import { FiMenu, FiX, FiHome, FiUser, FiMusic, FiRotateCcw, FiHelpCircle } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import './index.css'

export default function Header() {
  const isSmall = useMediaQuery({ query: '(max-width: 760px)' })
  const [sidebar, setSidebar] = useState(false)

  function showSideBar() {
    setSidebar(!sidebar)
  }


  return (
    <header>
      {!isSmall && <div>
        <Navbar className="header">
          <div className="title-and-search">
            <Link to='/'>
              <h1 className="header-title">Spotify Stats</h1>
            </Link>
          </div>
          <div className="menu-butons">
            <NavButtonNP next={false} />
            <NavButtonPlay />
            <NavButtonNP next={true} />
            <NavItem icon={<FiMenu />}>
              <DropdownMenu />
            </NavItem></div>

        </Navbar>
      </div>}
      {isSmall && <div>
        <Navbar className="M-header">
          <button onClick={showSideBar} className="M-menu">
            <FiMenu />
          </button>
          <div className={sidebar ? 'M-leftMenu-Active' : 'M-leftMenu'}>
            <ul className='M-Menu-Itens'>
              <li>
                <button className='M-Menu-Close' onClick={showSideBar}>
                  <span className="M-icon"><FiX height={100} width={100}
                    strokeWidth={1.5} /></span>
                </button>
              </li>
              <li>
                <MMenuItens onClick={showSideBar} link='/' icon={<FiHome height={42} width={42}
                  strokeWidth={1.5} />}>Home</MMenuItens>
              </li>
              <li>
                <MMenuItens onClick={showSideBar} link="/topArtists" icon={<FiUser height={42} width={42}
                  strokeWidth={1.5} />}>Top Artists</MMenuItens>
              </li>
              <li>
                <MMenuItens onClick={showSideBar} link="/topSongs" icon={<FiMusic height={42} width={42}
                  strokeWidth={1.5} />}>Top Songs</MMenuItens>
              </li>
              <li>
                <MMenuItens onClick={showSideBar} link="/recentlyPlayed" icon={<FiRotateCcw height={42} width={42}
                  strokeWidth={1.5} />}>Recent Tracks</MMenuItens>
              </li>
              <li>
                <MMenuItens onClick={showSideBar} link="/help" icon={<FiHelpCircle height={42} width={42}
                  strokeWidth={1.5} />}>Help</MMenuItens>
              </li>
            </ul>
          </div>
          <div className="M-title">
            <Link to="/">
              <h1 className="M-header-title">Spotify Stats</h1>
            </Link>
          </div>
        </Navbar>
      </div>}
    </header>
  )
}


function MMenuItens(props) {
  return (
    <Link onClick={props.onClick} className='M-left-menu-item' to={props.link}>
      <span className="M-icon">{props.icon}</span>
      {props.children}
    </Link>
  )
}