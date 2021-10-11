import {Link, RouteComponentProps} from "@reach/router"
import { getPeopleDataById, selectPeopleById } from "./peopleSlice";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { getIdsFromUrls } from "../../utils/Response";
import { selectStarshipsWithIds } from "../starships/starshipSlice";
import { selectVehiclesWithIds } from "../vehicles/vehiclesSlice";
import { selectSpeciesWithIds } from "../species/speciesSlice";
import { EntityInfo, EntityList } from "../common/entityCommon";
import { selectFilmsWithIds } from "../films/filmSlice";
import { getPlanetDataById, selectPlanetById } from "../planets/planetSlice";
import { loadMissingFilms, loadMissingSpecies, loadMissingStarships, loadMissingVehicles } from "../common/loading";

interface PeoplePageProps extends RouteComponentProps {
    peopleId?: string
}
function PeoplePage(props: PeoplePageProps) {
    const dispatch = useDispatch();
    const id:number = parseInt(props.peopleId || '1');
    const people = useAppSelector((state) => selectPeopleById(state, id))
    const homeworld = useAppSelector((state) => selectPlanetById(state, people?.homeworld ? getIdsFromUrls([people?.homeworld])[0] : -1));

    const filmsIds = getIdsFromUrls(people?.films);
    const starshipsIds = getIdsFromUrls(people?.starships);
    const vehiclesIds = getIdsFromUrls(people?.vehicles);
    const speciesIds = getIdsFromUrls(people?.species);

    const films = useAppSelector((state) => selectFilmsWithIds(state, filmsIds));
    const starships = useAppSelector(state => selectStarshipsWithIds(state, starshipsIds));
    const vehicles = useAppSelector(state => selectVehiclesWithIds(state, vehiclesIds));
    const species = useAppSelector(state => selectSpeciesWithIds(state, speciesIds));

    const initialDataLoading = useCallback(() => {
        loadMissingVehicles(vehiclesIds, vehicles, dispatch);
        loadMissingSpecies(speciesIds, species, dispatch);
        loadMissingStarships(starshipsIds, starships, dispatch);
        loadMissingFilms(filmsIds, films, dispatch);
    }, [people])
    
    useEffect(() => {
            dispatch(getPeopleDataById({id:id}));
            initialDataLoading();
            if(people?.homeworld)
                dispatch(getPlanetDataById({id: getIdsFromUrls([people?.homeworld])[0]}))
                
        },
        [people, id, dispatch, homeworld, initialDataLoading]
    )

    if(people)
        return (
            <div>
                <h2>{people.name}</h2>
                <fieldset>
                    <legend><h3>Physical informations</h3></legend>
                    {EntityInfo('Height', people.height)}
                    {EntityInfo('Mass', people.mass)}
                    {EntityInfo('Hair color', people.hair_color)}
                    {EntityInfo('Skin color', people.skin_color)}
                    {EntityInfo('Gender', people.gender)}
                    
                </fieldset>
                <fieldset>
                    <legend><h3>Other informations</h3></legend>
                    {EntityInfo('Birth year', people.birth_year)}
                    {homeworld ? EntityInfo('Homeworld', <Link to={`/planets/${homeworld?.id}`}>{homeworld?.name}</Link>) : ''}
                    
                </fieldset>
                {EntityList(filmsIds, films, 'films', 'Films')}
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

export default PeoplePage;