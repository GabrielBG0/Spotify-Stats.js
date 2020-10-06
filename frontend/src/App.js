import React, { useState } from 'react';
import Home from './pages/Home'
import { Navbar, NavItem, DropdownMenu } from './pages/Navbar'
import { MdDetails, MdFastForward, MdFastRewind } from 'react-icons/md'
import './global.css'

function App() {


  return (
    <div>
      <Navbar>
        <NavItem icon={<MdFastRewind />} />
        <NavItem icon={<MdFastForward />} />
        <NavItem icon={<MdDetails />}>
          <DropdownMenu>

          </DropdownMenu>
        </NavItem>
      </Navbar>
    </div>
  )
}

export default App;
