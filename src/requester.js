import { VERSION } from "./version.js";

const BASE_URL = "https://ensembledata.com/apis";

export class Requester {
    /**
     * @type {string}
     * @readonly
     */
    #token;

    /**
     * @type {number}
     * @readonly
     */
    #timeoutSecs;

    /**
     * @type {number}
     * @readonly
     */
    #maxNetworkRetries;

    /**
     * @param {{
     *     token: string;
     *     timeoutSecs: number;
     *     maxNetworkRetries: number;
     * }} options
     */
    constructor({ token, timeoutSecs, maxNetworkRetries }) {
        this.#token = token;
        this.#timeoutSecs = timeoutSecs;
        this.#maxNetworkRetries = maxNetworkRetries;
    }

    /**
     * @param {string} path
     * @param {Record<string, any>} params
     * @param {{ timeoutSecs?: number; returnTopLevelData?: boolean }} options
     * @returns {Promise<EDResponse>}
     */
    async get(path, params, options = {}) {
        params = { ...params, token: this.#token };
        const queryParams = new URLSearchParams(params).toString();
        const timeoutMS =
            (options.timeoutSecs === undefined
                ? this.#timeoutSecs
                : options.timeoutSecs) * 1_000;
        const returnTopLevelData = options.returnTopLevelData || false;

        for (let i = 0; i < this.#maxNetworkRetries; i++) {
            try {
                const res = await fetch(`${BASE_URL}/${path}?${queryParams}`, {
                    signal: AbortSignal.timeout(timeoutMS),
                    headers: {
                        "User-Agent": `ensembledata-node/${VERSION}`,
                    },
                });
                return this.handle_response(res, returnTopLevelData);
            } catch (/** @type {any} */ e) {
                if (e.name === "TimeoutError") {
                    throw new Error(
                        "Request to EnsembleData timed out. Contact support if this issue persists.",
                    );
                }
            }
        }

        throw new Error(
            `Failed to fetch data after ${this.#maxNetworkRetries} attempts.`,
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

export class EDError extends Error {
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
