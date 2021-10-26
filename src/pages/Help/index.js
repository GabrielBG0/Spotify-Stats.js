import React from 'react';
import Header from '../../components/Header'
import LeftMenu from '../../components/LeftMenu'
import { useMediaQuery } from 'react-responsive'
import './index.css'

export default function Help(props) {
  const isSmall = useMediaQuery({ query: '(max-width: 760px)' })

  return (
    <>
      {!isSmall && <div>
        <Header />
        <div className="usable-area">
          <div className="left-menu">
            <LeftMenu isHereHP={true} />
          </div>
          <div className="home">
            <h1>FAQ</h1>
            <div className="faq">
              <ul>
                <li>
                  <h3>How Popularity Works?</h3>
                  <p>The popularity statistic is calculate by the spotify algorithm.</p>
                  <p>It can be any value between 0 and 10 and the bigger it is the popular the song or artist is.</p>
                </li>
                <li>
                  <h3>Why my device isn't showing up?</h3>
                  <p>For a device to show up it need to be active.</p>
                  <p>To activate a device you need to play something on that device's Spotify.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>}
      {isSmall && <div>
        <Header />
        <div className="M-usable-area">
          <div className="M-home">
            <h1>FAQ</h1>
            <div className="faq">
              <ul>
                <li>
                  <h3>How Popularity Works?</h3>
                  <p>The popularity statistic is calculate by the spotify algorithm.</p>
                  <p>It can be any value between 0 and 100 and the bigger it is the popular the song or artist is.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}