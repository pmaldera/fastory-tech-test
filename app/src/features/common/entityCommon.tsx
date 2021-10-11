import { Link } from "@reach/router";

export interface IEntity {
    id: number,
    url: string,
    created: string,
    edited: string,
    name?: string,
    title?: string
}

/**
 * Component used to print basic entity info
 * @param {string} name Name of the field
 * @param {any} value Value of the field (sometimes with the units added)
 */
export function EntityInfo(name:string, value: any) {
    return(
        <p><b>{name}</b> {value || 'Unknown'}</p>
    )
}

/**
 * Component used to print related entities.
 * Offers a button to load asynchronously, not necessary (try removing initialDataLoading from useEffet to try)
 * @param {Array<number>} ids Ids of the related entities
 * @param {Array<IEntity>} entities Related entities 
 * @param {string} entityName Entity name, used in URLs and such
 * @param {string} title Entity title shown
 * @returns 
 */
export function EntityList(ids:Array<number>, entities:Array<IEntity>, entityName:string, title:string) {
    return (
        <fieldset>
            <legend><h3>{title}</h3></legend>
            <ul>
            {
                entities.map(entity => {
                    return <li><Link to={`/${entityName}/${entity.id}`}>{entity.name || entity.title}</Link></li>
                })
            }
            </ul>
        </fieldset>
    )
}