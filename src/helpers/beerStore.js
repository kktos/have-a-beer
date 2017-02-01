import { queryParameters, fetchJson } from '../util/fetch';

const BEER_ENDPOINT= "https://api.punkapi.com/v2";
const BEER_RESOURCE= "beers";
const MAX_PER_PAGE= 20;

/*
    REST intf for the Punk api
    - allows to load a chunk of beers (for pagination)
    - allows to load a single beer (for details)
    - manage a "hash" cache for chunks and singletons
 */
class BeerStore {

    constructor() {
        this._pages= {};
        this._beers= {};
    }

    getPage(page) {
        // return the cached page if already loaded
        if(this._pages[page])
            return Promise.resolve(this._pages[page]);

        // build the QS and the URL
        const query= {
            page: page,
            per_page: MAX_PER_PAGE
        };
        const url= `${BEER_ENDPOINT}/${BEER_RESOURCE}?${queryParameters(query)}`;

        // call the API then store the result in both caches, chunks and singletons
        return fetchJson(url)
                .then(response=> {
                    this._pages[page]= response.json;
                    response.json.forEach(row=>{ this._beers[row.id]= row });
                    return response.json;
                });

    }

    getByID(id) {
        // return the cached beer if already loaded (either from a chunks or individualy)
        if(this._beers[id])
            return Promise.resolve(this._beers[id]);

        // call the API then store the result in singleton cache
        const url= `${BEER_ENDPOINT}/${BEER_RESOURCE}/${id}`;
        return fetchJson(url)
                .then(response=> {
                    this._beers[id]= response.json[0];
                    return this._beers[id];
                });
    }

}

// set our global store -- surely a better way to do it can be achieved with flux/redux
global.app.set('BeerStore', new BeerStore());