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
     * Fetch all possible posts for a given keyword from the Tiktok mobile app
     * search video bar according to filter based on time. This API
     * automatically manages the pagination for our API keyword/search.
     *
     * @param {TikTokFullKeywordSearchParams} params
     * @returns {Promise<EDResponse>}
     */
    fullKeywordSearch({
        keyword,
        period,
        sorting = undefined,
        country = undefined,
        matchExactly = undefined,
    }) {
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
     * @typedef {{
     *     username: string;
     *     depth: number;
     *     startCursor?: number;
     *     oldestCreatetime?: number;
     *     alternativeMethod?: boolean;
     * }} TikTokUserPostsFromUsernameParams
     */

    /**
     * Fetch user posts from the username.
     *
     * @param {TikTokUserPostsFromUsernameParams} params
     * @returns {Promise<EDResponse>}
     */
    userPostsFromUsername({
        username,
        depth,
        startCursor = undefined,
        oldestCreatetime = undefined,
        alternativeMethod = undefined,
    }) {
        const params = filterUndefinedValues({
            username,
            depth,
            ...toSnakeCaseObject({
                startCursor,
                oldestCreatetime,
                alternativeMethod,
            }),
        });
        return this.#requester.get("/tt/user/posts", params);
    }

    /**
     * @typedef {{
     *     secUid: string;
     *     depth: number;
     *     startCursor?: number;
     *     oldestCreatetime?: number;
     *     alternativeMethod?: boolean;
     * }} TikTokUserPostsFromSecUidParams
     */

    /**
     * Fetch user posts from the secondary user ID.
     *
     * @param {TikTokUserPostsFromSecUidParams} params
     * @returns {Promise<EDResponse>}
     */
    userPostsFromSecUid({
        secUid,
        depth,
        startCursor = undefined,
        oldestCreatetime = undefined,
        alternativeMethod = undefined,
    }) {
        const params = filterUndefinedValues({
            secUid,
            depth,
            ...toSnakeCaseObject({
                startCursor,
                oldestCreatetime,
                alternativeMethod,
            }),
        });
        return this.#requester.get("/tt/user/posts-from-secuid", params);
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

    /**
     * Fetch list of users whose username might be related to the given keyword.
     *
     * @param {{ keyword: string; cursor: number }} params
     * @returns {Promise<EDResponse>}
     */
    userSearch({ keyword, cursor }) {
        return this.#requester.get("/tt/user/search", { keyword, cursor });
    }

    /**
     * Fetch post information and statistics from URL.
     *
     * @param {string} url
     * @returns {Promise<EDResponse>}
     */
    postInfo(url) {
        return this.#requester.get("/tt/post/info", { url });
    }

    /**
     * Fetch information for multiple post IDs passed as input parameter. The
     * endpoint can return maximum up to 100 posts together.
     *
     * @param {string[]} postIds
     * @returns {Promise<EDResponse>}
     */
    multiPostInfo(postIds) {
        return this.#requester.get("/tt/post/multi-info", {
            ids: postIds.join(";"),
        });
    }

    /**
     * Fetch comments for a given post. Each request returns a chunk of 30
     * comments. The API pagination has to be managed using the cursor starting
     * from 0.
     *
     * @param {{ postId: string; cursor: number }} params
     * @returns {Promise<EDResponse>}
     */
    postComments({ postId, cursor }) {
        return this.#requester.get("/tt/post/comments", {
            aweme_id: postId,
            cursor,
        });
    }

    /**
     * Fetch the replies to a comments for a given post. Each request returns a
     * chunk of 30 replies to a comment. The API pagination has to be managed
     * manually using the cursor starting from 0.
     *
     * @param {{ postId: string; commentId: string; cursor: number }} params
     * @returns {Promise<EDResponse>}
     */
    postCommentReplies({ postId, commentId, cursor }) {
        return this.#requester.get("/tt/post/comment-replies", {
            aweme_id: postId,
            comment_id: commentId,
            cursor,
        });
    }

    /**
     * @typedef {{
     *    keyword: string;
     *    cursor: number;
     *    sorting: "0" | "1" | "2" | "3" | "4";
     *    filterBy: "0" | "1" | "2";
     * }} TikTokMusicSearchParams
     */

    /**
     * Fetch information about music based on a string.
     * @param {TikTokMusicSearchParams} params
     * @returns {Promise<EDResponse>}
     */
    musicSearch({ keyword, cursor, sorting, filterBy }) {
        return this.#requester.get("/tt/music/info", {
            name: keyword,
            cursor,
            sorting,
            filter_by: filterBy,
        });
    }

    /**
     * Fetch the videos which have a particular piece of music in the background.
     * The `music_id` can be obtained from other endpoints.
     *
     * @param {{ musicId: string; cursor: number }} params
     * @returns {Promise<EDResponse>}
     */
    musicPosts({ musicId, cursor }) {
        return this.#requester.get("/tt/music/posts", { music_id: musicId, cursor });
    }

    /**
     * Fetch detailed information for a music ID.
     * @param {string} musicId
     * @returns {Promise<EDResponse>}
     */
    musicDetails(musicId) {
        return this.#requester.get("/tt/music/details", { id: musicId });
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
