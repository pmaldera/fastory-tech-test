import {RouteComponentProps} from "@reach/router"
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { getIdsFromUrls } from "../../utils/Response";
import { selectPeopleWithIds } from "../people/peopleSlice";
import { getStarshipDataById, selectStarshipById } from "../starships/starshipSlice";
import { EntityInfo, EntityList } from "../common/entityCommon";
import { selectFilmsWithIds } from "../films/filmSlice";
import { loadMissingCharacters, loadMissingFilms } from "../common/loading";

interface StarshipPageProps extends RouteComponentProps {
    starshipId?: string
}

function StarshipPage(props: StarshipPageProps) {
    const dispatch = useDispatch();
    const id:number = parseInt(props.starshipId || '1');
    const starship = useAppSelector((state) => selectStarshipById(state, id))

    const charactersIds = getIdsFromUrls(starship?.pilots);
    const filmsIds = getIdsFromUrls(starship?.films);

    const characters = useAppSelector((state) => selectPeopleWithIds(state, charactersIds));
    const films = useAppSelector((state) => selectFilmsWithIds(state, filmsIds));

    const initialDataLoading = useCallback(() => {
        loadMissingFilms(filmsIds, films, dispatch);
        loadMissingCharacters(charactersIds, characters, dispatch);
    }, [starship])


    useEffect(() => {
            dispatch(getStarshipDataById({id:id}));
            initialDataLoading();
        },
        [dispatch, id, starship, initialDataLoading]
    )

    if(starship)
        return (
            <div>
                <h2>{starship.name}</h2>
                <fieldset>
                    <legend><h3>Informations</h3></legend>
                    {EntityInfo('Model', starship.model)}
                    {EntityInfo('Manufacturer', starship.manufacturer)}
                    {EntityInfo('Class', starship.starship_class)}
                    {EntityInfo('Cost (credits)', starship.cost_in_credits)}
                    {EntityInfo('Length', `${starship.length} meters`)}
                    {EntityInfo('Max atmosphering Speed', starship.max_atmosphering_speed)}
                    {EntityInfo('MGLT', starship.MGLT)}
                    {EntityInfo('Hyperdrive Rating', starship.hyperdrive_rating)}
                    {EntityInfo('Cargo capacity', `${starship.cargo_capacity} kg`)}
                    {EntityInfo('Consumables', starship.consumables)}
                </fieldset>
                <fieldset>
                    <legend><h3>Population</h3></legend>
                    {EntityInfo('Crew (number)', starship.crew)}
                    {EntityInfo('Passengers (number)', starship.passengers)}
                </fieldset>
                {EntityList(charactersIds, characters, 'people', 'Pilots')}
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

export default StarshipPage;