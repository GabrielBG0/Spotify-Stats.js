import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import TopArtists from './pages/Tops/TopArtists'
import TopSongs from './pages/Tops/TopSongs'
import Home from './pages/Home'
import CodeGetter from './pages/CodeGetter'
import AccessDenied from './pages/AccessDenied'
import RecentlyPlayedTracks from './pages/RecentlyPlayedTracks'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path='/code/' component={CodeGetter} />
                <Route path="/topArtists" component={TopArtists} />
                <Route path='/accessDenied' component={AccessDenied} />
                <Route path="/topSongs" component={TopSongs} />
                <Route path='/RecentlyPlayed' component={RecentlyPlayedTracks} />
            </Switch>
        </BrowserRouter>
    )
}