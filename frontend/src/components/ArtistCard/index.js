import React, { useState } from 'react'
import Modal from 'react-modal'
import './index.css'

Modal.setAppElement('#root')

export default function ArtistCard(props) {
  const [isOpen, setIsOpen] = useState(false)

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
        className="Modal"
        overlayClassName="Overlay"
        contentLabel="Music Card"
      >
        <div className="modal-card">
          <div className="card">
            <div className="card-img">
              <img src={props.artist.images[1].url} alt="Artist Img"></img>
            </div>
            <div className="card-main-info">
              <div className="card-info">
                <ul className="info-list">
                  <li>
                    <h3>Nome: </h3>{props.artist.name}
                  </li>
                  <li>
                    <h3>Genres: </h3>{props.artist.genres.map((genres, index) => (<span>
                      {genres}{index < props.artist.genres.length - 1 && <span>, </span>}
                    </span>))}
                  </li>
                  <li>
                    <h3>Followers: </h3>{props.artist.followers.total.toLocaleString('en-US')}
                  </li>
                  <li>
                    <h3>Popularity: </h3>{props.artist.popularity}
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