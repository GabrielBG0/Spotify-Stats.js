import React from 'react';
import Routes from './routes'
import Footer from './components/Footer'
import './global.css'

function App() {


  return (
    <div className="page-container">
      <div className="content-wrap">
        <Routes />
      </div>
      <Footer />
    </div>
  )
}

export default App;
