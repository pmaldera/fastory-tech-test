import { RouteComponentProps } from "@reach/router"
import { getFilmDataById, selectFilmById } from "./filmSlice";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { getIdsFromUrls } from "../../utils/Response";
import { selectPeopleWithIds } from "../people/peopleSlice";
import { selectPlanetsWithIds } from "../planets/planetSlice";
import { selectStarshipsWithIds } from "../starships/starshipSlice";
import { selectVehiclesWithIds } from "../vehicles/vehiclesSlice";
import { selectSpeciesWithIds } from "../species/speciesSlice";
import { EntityList } from "../common/entityCommon";
import { loadMissingCharacters, loadMissingPlanets, loadMissingSpecies, loadMissingStarships, loadMissingVehicles } from "../common/loading";

interface FilmPageProps extends RouteComponentProps {
    filmId?: string
}

function FilmPage(props: FilmPageProps) {
    const dispatch = useDispatch();

    // Get id from router's url or use 1
    const id:number = parseInt(props.filmId || '1');

    // Get film from store using id
    const film = useAppSelector((state) => selectFilmById(state, id))

    // Getting related entities ids from film entity
    const charactersIds = getIdsFromUrls(film?.characters);
    const planetsIds = getIdsFromUrls(film?.planets);
    const starshipsIds = getIdsFromUrls(film?.starships);
    const vehiclesIds = getIdsFromUrls(film?.vehicles);
    const speciesIds = getIdsFromUrls(film?.species);

    // Getting related entities from store
    const characters = useAppSelector(state => selectPeopleWithIds(state, charactersIds));
    const planets = useAppSelector(state => selectPlanetsWithIds(state, planetsIds));
    const starships = useAppSelector(state => selectStarshipsWithIds(state, starshipsIds));
    const vehicles = useAppSelector(state => selectVehiclesWithIds(state, vehiclesIds));
    const species = useAppSelector(state => selectSpeciesWithIds(state, speciesIds));

    // Fetching missing related entities to store
    const initialDataLoading = useCallback(() => {
        loadMissingCharacters(charactersIds, characters, dispatch);
        loadMissingPlanets(planetsIds, planets, dispatch);
        loadMissingVehicles(vehiclesIds, vehicles, dispatch);
        loadMissingSpecies(speciesIds, species, dispatch);
        loadMissingStarships(starshipsIds, starships, dispatch);
    }, [film])

    useEffect(() => {
            dispatch(getFilmDataById({id:id}));
            initialDataLoading();
        },
        [initialDataLoading]
    )

    if(film)
        return (
            <div>
                <h2>{film.title}</h2>
                <fieldset>
                    <legend><h3>Informations</h3></legend>
                    <p><b>Episode order:</b> {film.episode_id || 'Unknown'}</p>
                    <p><b>Release date:</b> {film.release_date || 'Unknown'}</p>
                    <p><b>Opening crawl:</b> {film.opening_crawl || 'Unknown'}</p>
                </fieldset>
                <fieldset>
                    <legend><h3>Team</h3></legend>
                    <p><b>Directors(s):</b> {film.director || 'Unknown'}</p>
                    <p><b>Producer(s):</b> {film.producer || 'Unknown'}</p>
                </fieldset>
                {EntityList(charactersIds, characters, 'people', 'Characters')}
                {EntityList(planetsIds, planets, 'planets', 'Planets')}
                {EntityList(starshipsIds, starships, 'starships', 'Starships')}
                {EntityList(vehiclesIds, vehicles, 'vehicles', 'Vehicles')}
                {EntityList(speciesIds, species, 'species', 'Species')}
            </div>
        );
    else {
        return (
            <div>
                Loading
            </div>
        );
    }
}

export default FilmPage;