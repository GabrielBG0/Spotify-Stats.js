import React from 'react';
import Routes from './routes'
import Header from './pages/Header'
import Footer from './pages/Footer'
import './global.css'

function App() {


  return (
    <div>
      <Header />
      <Routes />
      <Footer />
    </div>
  )
}

export default App;
