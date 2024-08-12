export class Requester {
    /** @param {{ token: string }} options */
    constructor({ token }: {
        token: string;
    });
    /**
     * @param {string} path
     * @param {Record<string, any>} params
     * @param {boolean} returnTopLevelData
     * @returns {Promise<EDResponse>}
     */
    get(path: string, params: Record<string, any>, returnTopLevelData?: boolean): Promise<EDResponse>;
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
//# sourceMappingURL=requester.d.ts.map