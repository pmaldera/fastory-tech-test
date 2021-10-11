
/**
 * Response from server
 */
export interface IResponse {
    error?: string,
    message: string,
}

/**
 * Quick and dirty way to get ids from entities urls.
 * Used to get ids to fetch or get entities from store.
 * @param {Array<string>}urls 
 * @returns 
 */
export function getIdsFromUrls(urls?:Array<string>):Array<number> {
    if(urls) {
        let numbers:Array<number> = [];
        for(const url of urls) {
            try {
                const tempArray = url.split('/');
                numbers.push(parseInt(tempArray[tempArray.length-2]));
            } catch(e) {
                console.error(e);
            }
        }
        return numbers;
    } else {
        return [];
    }
}