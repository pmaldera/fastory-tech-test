import fetch from "node-fetch";
import {config} from "../config/config.js";

/** Gets a specific entity with a specific id
 * @param {string} entityName One of the values of the ENTITIES_NAMES enum
 * @param {number} [entityId] Entity's id
 * @returns {Promise<Object>} Entity data
 */
export async function getEntityFromRemoteAPI(entityName: string, entityId?: number): Promise<Object> { 
    let response = await fetch(`${config.api.remoteAPIUrl}/${entityName}/${entityId}`);
    if (!response.ok) {
        console.error(response);
        return [];
    }

    return <Object>response.json();
}

/** Search for object of the specified entity name
 * @param {string} entityName One of the values of the ENTITIES_NAMES enum
 * @param {string} searchQuery
 * @param {number} [pageNumber] Results page number
 * @returns {Promise<Object>} Entities data
 */
export async function searchEntityFromRemoteAPI(entityName: string, searchQuery: string, pageNumber?: number): Promise<Object> {
    let response = await fetch(`${config.api.remoteAPIUrl}/${entityName}/?search=${encodeURIComponent(searchQuery)}&page=${pageNumber||1}`);
    if (!response.ok) {
        console.error(response);
        return [];
    }

    return <Object>response.json();
}

/** Quick and dirty (I know) way of removing swapi base url to use our endpoints without efforts.
 *  In normal and professional setup, we should do it entity by entity.
 * @param {Object|Array<Object>} data Data from which we'll detect en replace swapi base url.
 * @returns {Object}
 */
export function replaceURLs(data:Object|Array<Object>): Object {
    return JSON.parse(JSON.stringify(data).split(`${config.api.remoteAPIUrl}`).join(''));
}