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
     * Fetch chunk of posts containing a given hashtag.
     *
     * @param {{ hashtag: string; cursor: number }} params
     * @returns {Promise<EDResponse>}
     */
    hashtagSearch({ hashtag, cursor }) {
        return this.#requester.get("/tt/hashtag/posts", {
            name: hashtag,
            cursor,
        });
    }

    /**
     * Fetch all the posts that Tiktok shows for a given hashtag.
     *
     * @param {{
     *     hashtag: string;
     *     days: number;
     *     remapOutput?: boolean;
     *     maxCursor?: number;
     * }} params
     * @returns {Promise<EDResponse>}
     */
    fullHashtagSearch({
        hashtag,
        days,
        remapOutput = undefined,
        maxCursor = undefined,
    }) {
        const params = filterUndefinedValues({
            name: hashtag,
            days,
            ...toSnakeCaseObject({ remapOutput, maxCursor }),
        });
        return this.#requester.get("/tt/hashtag/recent-posts", params);
    }

    /**
     * @typedef {{
     *     keyword: string;
     *     cursor: number;
     *     period: "0" | "1" | "7" | "30" | "90" | "180";
     *     sorting: "0" | "1";
     *     country?: string;
     *     matchExactly?: boolean;
     *     getAuthorStats?: boolean;
     * }} TikTokKeywordSearchParams
     */

    /**
     * Fetch posts for a given keyword from the Tiktok mobile app search video
     * bar according to filter based on time and sorting.
     *
     * @param {TikTokKeywordSearchParams} params
     * @returns {Promise<EDResponse>}
     */
    keywordSearch({
        keyword,
        cursor,
        period,
        sorting,
        country = undefined,
        matchExactly = undefined,
        getAuthorStats = undefined,
    }) {
        const params = filterUndefinedValues({
            name: keyword,
            cursor,
            period,
            sorting,
            country,
            ...toSnakeCaseObject({ matchExactly, getAuthorStats }),
        });
        return this.#requester.get("/tt/keyword/search", params);
    }

    /**
     * @typedef {{
     *     keyword: string;
     *     period: "0" | "1" | "7" | "30" | "90" | "180";
     *     sorting?: "0" | "1";
     *     country?: string;
     *     matchExactly?: boolean;
     * }} TikTokFullKeywordSearchParams
     */

    /**
     * Fetch all possible posts for a given keyword from the Tiktok mobile app search
     * video bar according to filter based on time. This API automatically manages the
     * pagination for our API keyword/search.
     *
     * @param {TikTokFullKeywordSearchParams} params
     * @returns {Promise<EDResponse>}
     */
    fullKeywordSearch({ keyword, period, sorting = undefined, country = undefined, matchExactly = undefined }) {
        const params = filterUndefinedValues({
            name: keyword,
            period,
            sorting,
            country,
            ...toSnakeCaseObject({ matchExactly }),
        });
        return this.#requester.get("/tt/keyword/full-search", params);
    }



    /**
     * Fetch user information and statistics from the username.
     *
     * @param {string} username
     * @returns {Promise<EDResponse>}
     */
    userInfoFromUsername(username) {
        return this.#requester.get("/tt/user/info", { username });
    }

    /**
     * Fetch user information and statistics from the secondary user id.
     *
     * @param {{ secUid: string; alternativeMethod?: boolean }} params
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
