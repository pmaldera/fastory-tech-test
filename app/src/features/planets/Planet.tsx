import {RouteComponentProps} from "@reach/router"
import { getPlanetDataById, selectPlanetById } from "./planetSlice";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { getIdsFromUrls } from "../../utils/Response";
import { selectPeopleWithIds } from "../people/peopleSlice";
import { EntityInfo, EntityList } from "../common/entityCommon";
import { selectFilmsWithIds } from "../films/filmSlice";
import { loadMissingCharacters, loadMissingFilms } from "../common/loading";

interface PlanetPageProps extends RouteComponentProps {
    planetId?: string
}

function PlanetPage(props: PlanetPageProps) {
    const dispatch = useDispatch();
    const id:number = parseInt(props.planetId || '1');
    const planet = useAppSelector((state) => selectPlanetById(state, id))

    const charactersIds = getIdsFromUrls(planet?.residents);
    const filmsIds = getIdsFromUrls(planet?.films);

    const characters = useAppSelector((state) => selectPeopleWithIds(state, charactersIds));
    const films = useAppSelector((state) => selectFilmsWithIds(state, filmsIds));


    const initialDataLoading = useCallback(() => {
        loadMissingFilms(filmsIds, films, dispatch);
        loadMissingCharacters(charactersIds, characters, dispatch);
    }, [planet])


    useEffect(() => {
            dispatch(getPlanetDataById({id:id}));
            initialDataLoading();
        },
        [dispatch, id, planet, initialDataLoading]
    )

    if(planet)
        return (
            <div>
                <h2>{planet.name}</h2>
                <fieldset>
                    <legend><h3>Informations</h3></legend>
                    {EntityInfo('Diameter', planet.diameter)}
                    {EntityInfo('Rotation period', `${planet.rotation_period} hours`)}
                    {EntityInfo('Orbital period', `${planet.orbital_period} days`)}
                    {EntityInfo('Gravity', `${planet.gravity} G(s)`)}
                    {EntityInfo('Population', planet.population)}
                    {EntityInfo('Climate', planet.climate)}
                    {EntityInfo('Terrain', planet.terrain)}
                    {EntityInfo('Surface water', planet.surface_water)}
                </fieldset>
                {EntityList(charactersIds, characters, 'people', 'Residents')}
                {EntityList(filmsIds, films, 'films', 'Films')}
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

export default PlanetPage;