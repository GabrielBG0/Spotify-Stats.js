import React, { useEffect, useState } from 'react'
import { Navbar, NavItem, DropdownMenu, NavButtonNP, NavButtonPlay } from './Navbar'
import { FiMenu } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import './index.css'

export default function Header() {
  const isSmall = useMediaQuery({ query: '(max-width: 760px)' })
  return (
    <>
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
          <div className="M-title">
            <Link to="/">
              <h1 className="M-header-title">Spotify Stats</h1>
            </Link>
          </div>
          <div className="M-menu">
            <FiMenu />
          </div>
        </Navbar>
      </div>}
    </>
  )
}