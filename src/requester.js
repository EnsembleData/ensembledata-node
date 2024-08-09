const BASE_URL = "https://ensembledata.com/apis";

export class Requester {
    /**
     * @type {string}
     * @readonly
     */
    #token;

    /** @param {{ token: string }} options */
    constructor({ token }) {
        this.#token = token;
    }

    /**
     * @param {string} path
     * @param {Record<string, any>} params
     * @param {boolean} returnTopLevelData
     * @returns {Promise<EDResponse>}
     */
    async get(path, params, returnTopLevelData = false) {
        params = { ...params, token: this.#token };
        const queryParams = new URLSearchParams(params).toString();
        return fetch(`${BASE_URL}/${path}?${queryParams}`).then((res) =>
            this.handle_response(res, returnTopLevelData),
        );
    }

    /**
     * @param {Response} response
     * @param {boolean} returnTopLevelData
     * @returns {Promise<EDResponse>}
     */
    async handle_response(response, returnTopLevelData) {
        const json = await response.json();
        const unitsCharged = Number(response.headers.get("units_charged"));

        if ("data" in json) {
            if (returnTopLevelData) {
                return new EDResponse(response.status, json, unitsCharged);
            }

            return new EDResponse(response.status, json.data, unitsCharged);
        }
        throw new EDError(response.status, json.detail, unitsCharged);
    }
}

export class EDResponse {
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
