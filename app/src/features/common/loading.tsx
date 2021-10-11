import { Dispatch } from "react";
import { Film, People, Planet, Specie, Starship, Vehicle } from "../../app/models";
import { getFilmDataById } from "../films/filmSlice";
import { getPeopleDataById } from "../people/peopleSlice";
import { getPlanetDataById } from "../planets/planetSlice";
import { getSpecieDataById } from "../species/speciesSlice";
import { getStarshipDataById } from "../starships/starshipSlice";
import { getVehicleDataById } from "../vehicles/vehiclesSlice";

export const loadMissingCharacters = (charactersIds: Array<number>, characters: Array<People>, dispatch:Dispatch<any>) => {
        for(const id of charactersIds) {
            if(characters.find(c => c.id === id) === undefined)
                dispatch(getPeopleDataById({id:id}));
        }
}

export const loadMissingPlanets = (planetsIds: Array<number>, planets: Array<Planet>, dispatch:Dispatch<any>) => {
    for(const id of planetsIds) {
        if(planets.find(p => p.id === id) === undefined)
            dispatch(getPlanetDataById({id:id}));
    }
}

export const loadMissingVehicles = (vehiclesIds: Array<number>, vehicles: Array<Vehicle>, dispatch:Dispatch<any>) => {
    for(const id of vehiclesIds) {
        if(vehicles.find(p => p.id === id) === undefined)
            dispatch(getVehicleDataById({id:id}));
    }
}

export const loadMissingSpecies = (speciesIds: Array<number>, species: Array<Specie>, dispatch: Dispatch<any>) => {
    for(const id of speciesIds) {
        if(species.find(p => p.id === id) === undefined)
            dispatch(getSpecieDataById({id:id}));
    }
}

export const loadMissingStarships = (starshipsIds: Array<number>, starships: Array<Starship>, dispatch: Dispatch<any>) => {
        for(const id of starshipsIds) {
            if(starships.find(p => p.id === id) === undefined)
                dispatch(getStarshipDataById({id:id}));
        }
}

export const loadMissingFilms = (filmsIds: Array<number>, films:Array<Film>, dispatch: Dispatch<any>) => {
    for(const id of filmsIds) {
        if(films.find(c => c.id === id) === undefined)
            dispatch(getFilmDataById({id:id}));
    }
}


