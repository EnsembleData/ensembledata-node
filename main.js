
const BASE_URL = "https://ensembledata.com/apis";


class EDResponse {

    /**
     * @param {number} statusCode
     * @param {any} data
     * @param {number} unitsCharged
     */
    constructor(statusCode, data, unitsCharged) {

        /** @type {number} */
        this.statusCode = statusCode;

        /** @type {any} */
        this.data = data;

        /** @type {number} */
        this.unitsCharged = unitsCharged;
    }
}

class EDError extends Error {

    /**
     * @param {number} statusCode
     * @param {string} detail
     * @param {number} unitsCharged
     */
    constructor(statusCode, detail, unitsCharged) {
        super(detail);

        /** @type {string} */
        this.detail = detail;

        /** @type {number} */
        this.statusCode = statusCode;

        /** @type {number} */
        this.unitsCharged = unitsCharged;
    }

}

class Requester {

    /** 
     * @type {string}
     * @readonly
     */
    #token;


    /** @param {{ token: string }} options */
    constructor({ token }) {
        this.#token = token
    }


    /**
     * @param {string} path
     * @param {object} params
     * @returns {Promise<EDResponse>}
     */
    async get(path, params) {
        params = { ...params, token: this.#token };
        const queryParams = new URLSearchParams(params).toString();
        return fetch(`${BASE_URL}/${path}?${queryParams}`)
            .then(this.handle_response);
    }


    /**
     * @param {Response} response
     * @returns {Promise<EDResponse>}
     */
    async handle_response(response) {
        const json = await response.json();
        const unitsCharged = Number(response.headers.get("units_charged"));

        if ("data" in json) {
            return new EDResponse(response.status, json.data, unitsCharged);
        }
        throw new EDError(response.status, json.detail, unitsCharged);
    }



}


class Customer {

    /** 
     * @type {Requester}
     * @readonly
     */
    #requester;

    /** @param {{ requester: Requester }} options */
    constructor({ requester }) {
        this.#requester = requester
    }

    /** @param {string} date */
    getUsage(date) {
        return this.#requester.get("/customer/get-used-units", { date })
    }

}

class EDClient {

    /** 
     * @type {Requester}
     * @readonly
     */
    #requester;

    constructor({ token }) {
        const requester = new Requester({ token });;
        this.#requester = requester;
        this.customer = new Customer({ requester });
    }

    /**
     * @param {string} path
     * @param {object} params
     * @returns {Promise<EDResponse>}
     */
    async request(path, params) {
        return this.#requester.get(path, params);
    }

}

