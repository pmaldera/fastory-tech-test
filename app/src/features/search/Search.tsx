import {RouteComponentProps, Link, useLocation } from "@reach/router"
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import pageStyles from '../../styles/Pages.module.css';
import searchStyles from './Search.module.css';
import { useAppSelector} from '../../app/hooks';
import { SearchData, search, selectSearchData, selectSearchStatus, ISearchResponse } from "../search/searchSlice";
import { IEntity } from "../common/entityCommon";

/**
 * Search Results Component
 * @param {string} entityName 
 * @param {Array<IEntity>} entities 
 */
function searchResultList(entityName:string, entities?:Array<IEntity>) {
    return (
        <div>
            <label className={searchStyles.category}>{entityName}</label>
            {
                <ul className={searchStyles.searchResultList}>
                {
                    entities && entities.length > 0 ?
                        entities.map(entity => {
                            return <Link to={`${entity.url}`}>{entity.title || entity.name}</Link>
                        })
                    : 
                        <p className={searchStyles.noResult}>No results</p>
                }
                </ul>
            }
        </div>
    );
}

/**
 * Pagination Component
 * @param searchData 
 * @param changePage 
 * @param number 
 * @returns 
 */
function pagination(searchData: ISearchResponse, changePage: (pageNumber:string) => void, number:number) {
    const hasNextPage = (
        searchData.people?.next ||
        searchData.planets?.next ||
        searchData.species?.next ||
        searchData.starships?.next ||
        searchData.vehicles?.next ||
        searchData.films?.next
    );
    const hasPreviousPage = (
        searchData.people?.previous ||
        searchData.planets?.previous ||
        searchData.species?.previous ||
        searchData.starships?.previous ||
        searchData.vehicles?.previous ||
        searchData.films?.previous
    );

    const prevPage = () => {
        changePage((number-1).toString());
    }
    const nextPage = () => {
        changePage((number+1).toString());
    }

    return (
        <div className={searchStyles.pagination}>
            {hasPreviousPage ? <button onClick={prevPage}>Previous page</button>: ''}
            <span className={searchStyles.paginationNumber}>{number}</span>
            {hasNextPage ? <button onClick={nextPage}>Next page</button>: ''}
        </div>
    )
}

function SearchPage(props: RouteComponentProps) {
    const searchParams = new URLSearchParams(useLocation().search);
    const [formValues, setValue] = useState({
        query: searchParams.get('query') || '',
        filter: searchParams.get('filter') || 'all',
        page: searchParams.get('page') || '1'
    });
    const searchData = useAppSelector(selectSearchData);
    const searchStatus = useAppSelector(selectSearchStatus);
    const location = useLocation();
    
    const options = [
        "all",
        "people",
        "planets",
        "films",
        "starships",
        "species",
        "vehicles"
    ]

    const dispatch = useDispatch();
    const launchSearch = (data:SearchData) => {
        // Updating url then lauching search.
        let url = new URL(location.origin + location.pathname);
        if(formValues.query)
            url.searchParams.append('query', formValues.query)
        if(formValues.filter)
            url.searchParams.append('filter', formValues.filter);
        url.searchParams.append('page', formValues.page || '1');
        window.history.pushState({path: url.href}, '', url.href);

        dispatch(search(data));
    }
    
    const valueChangeHandler = (e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        setValue({...formValues, [e.target.name]: e.target.value});
    }

    // This seems ugly but  pageNumer can be give by url...
    const changePage = (pageNumber:string) => {
        setValue({...formValues, page: pageNumber})
    }

    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        launchSearch(formValues);
    }

    // To launch search on page load
    const handleLaunchSearch = useCallback(() => {
        launchSearch(formValues);
    }, [formValues.page])

    useEffect(() => {
            handleLaunchSearch();
        },
        [handleLaunchSearch]
    )
    return (
        <div className={searchStyles.searchPage}>
            <form 
                className={searchStyles.searchBar}
                onSubmit={submitHandler}
            >
                <input type="text" name="query" placeholder="Search anything" value={formValues['query']} onChange={valueChangeHandler} />
                <select className={pageStyles.capitalize} name="filter" value={formValues['filter']} onChange={valueChangeHandler}>
                    {
                        options.map(o => {
                            return <option className={pageStyles.capitalize} key={o} value={o}>{o}</option>
                        })
                    }
                </select>
                <input type="submit" value="Search"/>
            </form>
            <p>{searchStatus === 'searching' ? "Searching ..." : ''}</p>
            {pagination(searchData, changePage, parseInt(formValues.page))}
            <div className={searchStyles.searchResultsContainer}>
                {searchData.films ? searchResultList('Films', searchData.films?.results) : null}
                {searchData.people ? searchResultList('People', searchData.people?.results) : null}
                {searchData.planets ? searchResultList('Planets', searchData.planets?.results) : null}
                {searchData.species ? searchResultList('Species', searchData.species?.results) : null}
                {searchData.starships ? searchResultList('Starships', searchData.starships?.results) : null}
                {searchData.vehicles ? searchResultList('Vehicles', searchData.vehicles?.results) : null}
            </div>
        </div>
    );
}

export default SearchPage;