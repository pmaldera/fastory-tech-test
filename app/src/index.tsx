import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { Router } from "@reach/router";
import Login from './features/user/Login';
import Search from './features/search/Search';
import FilmPage from './features/films/Film';
import PeoplePage from './features/people/People';
import PlanetPage from './features/planets/Planet';
import StarshipPage from './features/starships/Starship';
import VehiclePage from './features/vehicles/Vehicle';
import SpeciePage from './features/species/Specie';

// Cool Hyperdrive Scene from https://codepen.io/noahblon/pen/GKflw, thanks to author.

ReactDOM.render(
    <React.StrictMode>
        <div className="scene">
            <div className="wrap">
                <div className="wall wall-right"></div>
                <div className="wall wall-left"></div>   
                <div className="wall wall-top"></div>
                <div className="wall wall-bottom"></div> 
                <div className="wall wall-back"></div>    
            </div>
            <div className="wrap">
                <div className="wall wall-right"></div>
                <div className="wall wall-left"></div>   
                <div className="wall wall-top"></div>
                <div className="wall wall-bottom"></div>   
                <div className="wall wall-back"></div>    
            </div>
        </div>
        <Provider store={store}>
            <Router id="app">
                <Login path="/" />
                <Search path="/search" />
                <FilmPage path="/films/:filmId" />
                <PeoplePage path="/people/:peopleId" />
                <PlanetPage path="/planets/:planetId" />
                <StarshipPage path="/starships/:starshipId" />
                <VehiclePage path="/vehicles/:vehicleId" />
                <SpeciePage path="/species/:specieId" />
            </Router>
        </Provider>
    </React.StrictMode>,
document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
