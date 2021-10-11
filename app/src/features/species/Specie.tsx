import {Link, RouteComponentProps} from "@reach/router"
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { getIdsFromUrls } from "../../utils/Response";
import { selectPeopleWithIds } from "../people/peopleSlice";
import { getSpecieDataById, selectSpecieById } from "../species/speciesSlice";
import { EntityInfo, EntityList } from "../common/entityCommon";
import { selectFilmsWithIds } from "../films/filmSlice";
import { getPlanetDataById, selectPlanetById } from "../planets/planetSlice";
import { loadMissingCharacters, loadMissingFilms } from "../common/loading";

interface SpeciePageProps extends RouteComponentProps {
    specieId?: string
}

function SpeciePage(props: SpeciePageProps) {
    const dispatch = useDispatch();
    const id:number = parseInt(props.specieId || '1');
    const specie = useAppSelector((state) => selectSpecieById(state, id))
    const homeworld = useAppSelector((state) => selectPlanetById(state, specie?.homeworld ? getIdsFromUrls([specie?.homeworld])[0] : -1));

    const charactersIds = getIdsFromUrls(specie?.people);
    const filmsIds = getIdsFromUrls(specie?.films);

    const characters = useAppSelector((state) => selectPeopleWithIds(state, charactersIds));
    const films = useAppSelector((state) => selectFilmsWithIds(state, filmsIds));

    const initialDataLoading = useCallback(() => {
        loadMissingFilms(filmsIds, films, dispatch);
        loadMissingCharacters(charactersIds, characters, dispatch);
    }, [specie])


    useEffect(() => {
            dispatch(getSpecieDataById({id:id}));
            initialDataLoading();
            if(specie?.homeworld)
                dispatch(getPlanetDataById({id: getIdsFromUrls([specie?.homeworld])[0]}))
        },
        [dispatch, id, specie, homeworld, initialDataLoading]
    )

    if(specie)
        return (
            <div>
                <h2>{specie.name}</h2>
                <fieldset>
                    <legend><h3>Physical Informations</h3></legend>
                    {EntityInfo('Average Height', `${specie.average_height} cm`)}
                    {EntityInfo('Eye colors', specie.eye_colors)}
                    {EntityInfo('Hair colors', specie.hair_colors)}
                    {EntityInfo('Skin colors', specie.skin_colors)}
                </fieldset>
                <fieldset>
                    <legend><h3>Other informations</h3></legend>
                    {EntityInfo('Average Lifespan', `${specie.average_lifespan} years`)}
                    {EntityInfo('Classification', specie.classification)}
                    {EntityInfo('Designation', specie.designation)}
                    {EntityInfo('Language', specie.language)}
                    {homeworld ? EntityInfo('Homeworld', <Link to={`/planets/${homeworld?.id}`}>{homeworld?.name}</Link>) : ''}
                </fieldset>
                {EntityList(charactersIds, characters, 'people', 'People')}
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

export default SpeciePage;