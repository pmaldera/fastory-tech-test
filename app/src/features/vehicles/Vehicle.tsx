import { RouteComponentProps } from "@reach/router"
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { getIdsFromUrls } from "../../utils/Response";
import { selectPeopleWithIds } from "../people/peopleSlice";
import { getVehicleDataById, selectVehicleById } from "../vehicles/vehiclesSlice";
import { EntityInfo, EntityList } from "../common/entityCommon";
import { selectFilmsWithIds } from "../films/filmSlice";
import { loadMissingCharacters, loadMissingFilms } from "../common/loading";

interface VehiclePageProps extends RouteComponentProps {
    vehicleId?: string
}
function VehiclePage(props: VehiclePageProps) {
    const dispatch = useDispatch();
    const id:number = parseInt(props.vehicleId || '1');
    const vehicle = useAppSelector((state) => selectVehicleById(state, id))

    const charactersIds = getIdsFromUrls(vehicle?.pilots);
    const filmsIds = getIdsFromUrls(vehicle?.films);

    const characters = useAppSelector((state) => selectPeopleWithIds(state, charactersIds));
    const films = useAppSelector((state) => selectFilmsWithIds(state, filmsIds));

    const initialDataLoading = useCallback(() => {
        loadMissingFilms(filmsIds, films, dispatch);
        loadMissingCharacters(charactersIds, characters, dispatch);
    }, [vehicle])


    useEffect(() => {
            dispatch(getVehicleDataById({id:id}));
            initialDataLoading();
        },
        [dispatch, id, vehicle, initialDataLoading]
    )

    if(vehicle)
        return (
            <div>
                <h2>{vehicle.name}</h2>
                <fieldset>
                    <legend><h3>Informations</h3></legend>
                    {EntityInfo('Model', vehicle.model)}
                    {EntityInfo('Manufacturer', vehicle.manufacturer)}
                    {EntityInfo('Class', vehicle.vehicle_class)}
                    {EntityInfo('Length', `${vehicle.length} meters`)}
                    {EntityInfo('Max atmosphering Speed', vehicle.max_atmosphering_speed)}
                    {EntityInfo('Cargo capacity', `${vehicle.cargo_capacity} kg`)}
                    {EntityInfo('Consumables', vehicle.consumables)}
                </fieldset>
                <fieldset>
                    <legend><h3>Population</h3></legend>
                    {EntityInfo('Crew (number)', vehicle.crew)}
                    {EntityInfo('Passengers (number)', vehicle.passengers)}
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

export default VehiclePage;