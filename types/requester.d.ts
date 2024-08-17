export class Requester {
    /**
     * @param {{
     *     token: string;
     *     timeoutSecs: number;
     *     maxNetworkRetries: number;
     * }} options
     */
    constructor({ token, timeoutSecs, maxNetworkRetries }: {
        token: string;
        timeoutSecs: number;
        maxNetworkRetries: number;
    });
    /**
     * @param {string} path
     * @param {Record<string, any>} params
     * @param {{ timeoutSecs?: number; returnTopLevelData?: boolean }} options
     * @returns {Promise<EDResponse>}
     */
    get(path: string, params: Record<string, any>, options?: {
        timeoutSecs?: number;
        returnTopLevelData?: boolean;
    }): Promise<EDResponse>;
    /**
     * @param {Response} response
     * @param {boolean} returnTopLevelData
     * @returns {Promise<EDResponse>}
     */
    handle_response(response: Response, returnTopLevelData: boolean): Promise<EDResponse>;
    #private;
}
export class EDResponse {
    /**
     * @param {number} statusCode
     * @param {any} data
     * @param {number} unitsCharged
     */
    constructor(statusCode: number, data: any, unitsCharged: number);
    /** @type {number} */
    statusCode: number;
    /** @type {any} */
    data: any;
    /** @type {number} */
    unitsCharged: number;
}
export class EDError extends Error {
    /**
     * @param {number} statusCode
     * @param {string} detail
     * @param {number} unitsCharged
     */
    constructor(statusCode: number, detail: string, unitsCharged: number);
    /** @type {string} */
    detail: string;
    /** @type {number} */
    statusCode: number;
    /** @type {number} */
    unitsCharged: number;
}
//# sourceMappingURL=requester.d.ts.map