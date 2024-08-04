import { Requester, EDResponse } from "./requester.js";
import { filterUndefinedValues, toSnakeCaseObject } from "./utils.js";

class TikTokClient {
    /**
     * @type {Requester}
     * @readonly
     */
    #requester;

    /** @param {{ requester: Requester }} options */
    constructor({ requester }) {
        this.#requester = requester;
    }

    /**
     * @param {string} username
     * @returns {Promise<EDResponse>}
     */
    userInfoFromUsername(username) {
        return this.#requester.get("/tt/user/info", { username });
    }

    /**
     * @param {{ secUid: string, alternativeMethod?: boolean }} params
     * @returns {Promise<EDResponse>}
     */
    userInfoFromSecUid({ secUid, alternativeMethod = undefined }) {
        const params = filterUndefinedValues({
            ...toSnakeCaseObject({ alternativeMethod }),
            secUid,
        });
        return this.#requester.get("/tt/user/info-from-secuid", params);
    }
}

class CustomerClient {
    /**
     * @type {Requester}
     * @readonly
     */
    #requester;

    /** @param {{ requester: Requester }} options */
    constructor({ requester }) {
        this.#requester = requester;
    }

    /**
     * @param {string} date
     * @returns {Promise<EDResponse>}
     */
    getUsage(date) {
        return this.#requester.get("/customer/get-used-units", { date });
    }
}

export class EDClient {
    /**
     * @type {Requester}
     * @readonly
     */
    #requester;

    /** @param {{ token: string }} options */
    constructor({ token }) {
        const requester = new Requester({ token });
        this.#requester = requester;

        /** @readonly */
        this.customer = new CustomerClient({ requester });

        /** @readonly */
        this.tiktok = new TikTokClient({ requester });
    }

    /**
     * @param {string} path
     * @param {Record<string, string>} params
     * @returns {Promise<EDResponse>}
     */
    async request(path, params) {
        return this.#requester.get(path, params);
    }
}
