import React from 'react'
import { Link } from 'react-router-dom'
import { FiHome, FiUser, FiMusic, FiRotateCcw, FiHelpCircle } from 'react-icons/fi'
import HereBar from '../../assets/HereBar.png'
import './index.css'

export default function LeftMenu(props) {
  return (
    <div className="menu">
      <MenuItens link="/" isHere={props.isHereH} inHereBar={<img src={HereBar} alt="here" />}
        icon={<FiHome height={42} width={42}
          strokeWidth={1.5} />}>Home</MenuItens>
      <MenuItens link="/topArtists" isHere={props.isHereA} inHereBar={<img src={HereBar} alt="here" />}
        icon={<FiUser height={42} width={42}
          strokeWidth={1.5} />}>Top Artists</MenuItens>
      <MenuItens link="/topSongs" isHere={props.isHereS} inHereBar={<img src={HereBar} alt="here" />}
        icon={<FiMusic height={42} width={42}
          strokeWidth={1.5} />}>Top Songs</MenuItens>
      <MenuItens link="/recentlyPlayed" isHere={props.isHereRP} inHereBar={<img src={HereBar} alt="here" />}
        icon={<FiRotateCcw height={42} width={42}
          strokeWidth={1.5} />}>Recent Tracks</MenuItens>
      <MenuItens link="/help" isHere={props.isHereHP} inHereBar={<img src={HereBar} alt="here" />}
        icon={<FiHelpCircle height={42} width={42}
          strokeWidth={1.5} />}>Help</MenuItens>
    </div>
  )
}

function MenuItens(props) {
  return (
    <Link className="left-menu-item" to={props.link}>
      <span className="is-here">{props.isHere && props.inHereBar}</span>
      {props.children}
      <span className="icon">{props.icon}</span>
    </Link>
  )
}