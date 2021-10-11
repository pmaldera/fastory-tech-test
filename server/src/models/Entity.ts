/**
 * Interface shared between entities
 */
export interface IEntity {
    id: number,
    url: string,
    created: string,
    edited: string,
    name?: string,
    title?: string
}

/**
 * Interface shared between search results
 */
export interface IEntitySearchResults {
    count: number,
    next: string | null,
    previous: string | null,
    results: Array<IEntity>
}

