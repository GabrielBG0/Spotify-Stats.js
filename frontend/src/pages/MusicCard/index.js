import React, { useState } from 'react'
import Modal from 'react-modal'
import './index.css'

Modal.setAppElement('#root')

export default function MusicCard(props) {
  const [isOpen, setIsOpen] = useState(false)

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(120, 120, 120, 0.75)'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px',
      background: 'var(--bg)',
      border: 'none',
    }
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeModal(e) {
    e.stopPropagation()
    setIsOpen(false)
  }


  return (
    <button className="music-card" onClick={openModal}>
      {props.children}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Music Card"
      >
        <div className="modal-card">
          <div className="card">
            <div className="card-img">
              <img src={props.track.album.images[1].url} alt="Album Cover"></img>
            </div>
            <div className="card-main-info">
              <div className="card-info">
                <ul className="info-list">
                  <li>
                    <h3>Track: </h3>{props.track.name}
                  </li>
                  <li>
                    <h3>Artist: </h3>{props.track.artists.map((artist, index) => (<span>
                      {artist.name}{index < props.track.artists.length - 1 && <span>, </span>}
                    </span>))}
                  </li>
                  <li>
                    <h3>Album: </h3>{props.track.album.name}
                  </li>
                  <li>
                    <h3>Popularity: </h3>{props.track.popularity}/100
                  </li>
                </ul>
              </div>
              <div className="card-exit">
                <button className="close-button" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </button>
  )
}