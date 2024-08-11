import { Requester } from "./requester.js";
import { filterUndefinedValues } from "./utils.js";

/** @typedef {import("./requester").EDResponse} EDResponse */

class CustomerEndpoints {
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
     * @param {{ date: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    getUsage({ date }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            date,
        });
        return this.#requester.get("/customer/get-used-units", params);
    }

    /**
     * @param {{ days: number }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    getUsageHistory({ days }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            days,
        });
        return this.#requester.get("/customer/get-history", params);
    }
}

class TiktokEndpoints {
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
     * @param {{ hashtag: string; cursor?: number }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    hashtagSearch({ hashtag, cursor = undefined }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            name: hashtag,
            cursor,
        });
        return this.#requester.get("/tt/hashtag/posts", params);
    }

    /**
     * @param {{
     *     hashtag: string;
     *     days: number;
     *     remapOutput?: boolean;
     *     maxCursor?: number;
     * }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    fullHashtagSearch(
        { hashtag, days, remapOutput = undefined, maxCursor = undefined },
        extraParams = {},
    ) {
        const params = filterUndefinedValues({
            ...extraParams,
            name: hashtag,
            days,
            remap_output: remapOutput,
            max_cursor: maxCursor,
        });
        return this.#requester.get("/tt/hashtag/recent-posts", params);
    }

    /**
     * @param {{
     *     keyword: string;
     *     cursor?: number;
     *     period: "0" | "1" | "7" | "30" | "90" | "180";
     *     sorting: "0" | "1";
     *     country?: string;
     *     matchExactly?: boolean;
     *     getAuthorStats?: boolean;
     * }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    keywordSearch(
        {
            keyword,
            cursor = undefined,
            period,
            sorting,
            country = undefined,
            matchExactly = undefined,
            getAuthorStats = undefined,
        },
        extraParams = {},
    ) {
        const params = filterUndefinedValues({
            ...extraParams,
            name: keyword,
            cursor,
            period,
            sorting,
            country,
            match_exactly: matchExactly,
            get_author_stats: getAuthorStats,
        });
        return this.#requester.get("/tt/keyword/search", params);
    }

    /**
     * @param {{
     *     keyword: string;
     *     period: "0" | "1" | "7" | "30" | "90" | "180";
     *     sorting?: "0" | "1";
     *     country?: string;
     *     matchExactly?: boolean;
     * }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    fullKeywordSearch(
        {
            keyword,
            period,
            sorting = undefined,
            country = undefined,
            matchExactly = undefined,
        },
        extraParams = {},
    ) {
        const params = filterUndefinedValues({
            ...extraParams,
            name: keyword,
            period,
            sorting,
            country,
            match_exactly: matchExactly,
        });
        return this.#requester.get("/tt/keyword/full-search", params);
    }

    /**
     * @param {{
     *     username: string;
     *     depth: number;
     *     cursor?: number;
     *     oldestCreatetime?: number;
     *     alternativeMethod?: boolean;
     * }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    userPostsFromUsername(
        {
            username,
            depth,
            cursor = undefined,
            oldestCreatetime = undefined,
            alternativeMethod = undefined,
        },
        extraParams = {},
    ) {
        const params = filterUndefinedValues({
            ...extraParams,
            username,
            depth,
            start_cursor: cursor,
            oldest_createtime: oldestCreatetime,
            alternative_method: alternativeMethod,
        });
        return this.#requester.get("/tt/user/posts", params);
    }

    /**
     * @param {{
     *     secUid: string;
     *     depth: number;
     *     cursor?: number;
     *     oldestCreatetime?: number;
     *     alternativeMethod?: boolean;
     * }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    userPostsFromSecuid(
        {
            secUid,
            depth,
            cursor = undefined,
            oldestCreatetime = undefined,
            alternativeMethod = undefined,
        },
        extraParams = {},
    ) {
        const params = filterUndefinedValues({
            ...extraParams,
            secUid,
            depth,
            start_cursor: cursor,
            oldest_createtime: oldestCreatetime,
            alternative_method: alternativeMethod,
        });
        return this.#requester.get("/tt/user/posts-from-secuid", params);
    }

    /**
     * @param {{ username: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    userInfoFromUsername({ username }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            username,
        });
        return this.#requester.get("/tt/user/info", params);
    }

    /**
     * @param {{ secUid: string; alternativeMethod?: boolean }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    userInfoFromSecuid(
        { secUid, alternativeMethod = undefined },
        extraParams = {},
    ) {
        const params = filterUndefinedValues({
            ...extraParams,
            secUid,
            alternative_method: alternativeMethod,
        });
        return this.#requester.get("/tt/user/info-from-secuid", params);
    }

    /**
     * @param {{ keyword: string; cursor?: number }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    userSearch({ keyword, cursor = undefined }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            keyword,
            cursor,
        });
        return this.#requester.get("/tt/user/search", params);
    }

    /**
     * @param {{ url: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    postInfo({ url }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            url,
        });
        return this.#requester.get("/tt/post/info", params);
    }

    /**
     * @param {{ awemeIds: string[] }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    multiPostInfo({ awemeIds }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            ids: awemeIds.join(";"),
        });
        return this.#requester.get("/tt/post/multi-info", params);
    }

    /**
     * @param {{ awemeId: string; cursor?: number }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    postComments({ awemeId, cursor = undefined }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            aweme_id: awemeId,
            cursor,
        });
        return this.#requester.get("/tt/post/comments", params);
    }

    /**
     * @param {{ awemeId: string; commentId: string; cursor?: number }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    postCommentReplies(
        { awemeId, commentId, cursor = undefined },
        extraParams = {},
    ) {
        const params = filterUndefinedValues({
            ...extraParams,
            aweme_id: awemeId,
            comment_id: commentId,
            cursor,
        });
        return this.#requester.get("/tt/post/comments-replies", params);
    }

    /**
     * @param {{
     *     keyword: string;
     *     cursor?: number;
     *     sorting: "0" | "1" | "2" | "3" | "4";
     *     filterBy: "0" | "1" | "2";
     * }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    musicSearch(
        { keyword, cursor = undefined, sorting, filterBy },
        extraParams = {},
    ) {
        const params = filterUndefinedValues({
            ...extraParams,
            name: keyword,
            cursor,
            sorting,
            filter_by: filterBy,
        });
        return this.#requester.get("/tt/music/info", params);
    }

    /**
     * @param {{ musicId: string; cursor?: number }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    musicPosts({ musicId, cursor = undefined }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            music_id: musicId,
            cursor,
        });
        return this.#requester.get("/tt/music/posts", params);
    }

    /**
     * @param {{ musicId: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    musicDetails({ musicId }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            id: musicId,
        });
        return this.#requester.get("/tt/music/details", params);
    }

    /**
     * @param {{ id: string; secUid: string; cursor?: number }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    userFollowers({ id, secUid, cursor = undefined }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            id,
            secUid,
            cursor,
        });
        return this.#requester.get("/tt/user/followers", params);
    }

    /**
     * @param {{
     *     id: string;
     *     secUid: string;
     *     cursor?: number;
     *     pageToken?: string;
     * }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    userFollowings(
        { id, secUid, cursor = undefined, pageToken = undefined },
        extraParams = {},
    ) {
        const params = filterUndefinedValues({
            ...extraParams,
            id,
            secUid,
            cursor,
            page_token: pageToken,
        });
        return this.#requester.get("/tt/user/followings", params);
    }

    /**
     * @param {{ secUid: string; cursor?: number }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    userLikedPosts({ secUid, cursor = undefined }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            secUid,
            cursor,
        });
        return this.#requester.get("/tt/user/liked-posts", params);
    }
}

class YoutubeEndpoints {
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
     * @param {{
     *     keyword: string;
     *     depth: number;
     *     cursor?: string;
     *     period?: "overall" | "hour" | "today" | "week" | "month" | "year";
     *     sorting?: "relevance" | "time" | "views" | "rating";
     *     getAdditionalInfo?: boolean;
     * }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    keywordSearch(
        {
            keyword,
            depth,
            cursor = undefined,
            period = undefined,
            sorting = undefined,
            getAdditionalInfo = undefined,
        },
        extraParams = {},
    ) {
        const params = filterUndefinedValues({
            ...extraParams,
            keyword,
            depth,
            start_cursor: cursor,
            period,
            sorting,
            get_additional_info: getAdditionalInfo,
        });
        return this.#requester.get("/youtube/search", params);
    }

    /**
     * @param {{ keyword: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    featuredCategoriesSearch({ keyword }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            name: keyword,
        });
        return this.#requester.get(
            "/youtube/search/featured-categories",
            params,
        );
    }

    /**
     * @param {{ hashtag: string; depth: number; onlyShorts?: boolean }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    hashtagSearch(
        { hashtag, depth, onlyShorts = undefined },
        extraParams = {},
    ) {
        const params = filterUndefinedValues({
            ...extraParams,
            name: hashtag,
            depth,
            only_shorts: onlyShorts,
        });
        return this.#requester.get("/youtube/hashtag/search", params);
    }

    /**
     * @param {{ channelId: string; fromUrl?: boolean }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    channelDetailedInfo({ channelId, fromUrl = undefined }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            browseId: channelId,
            from_url: fromUrl,
        });
        return this.#requester.get("/youtube/channel/detailed-info", params);
    }

    /**
     * @param {{ channelId: string; depth: number }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    channelVideos({ channelId, depth }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            browseId: channelId,
            depth,
        });
        return this.#requester.get("/youtube/channel/videos", params);
    }

    /**
     * @param {{ channelId: string; depth: number }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    channelShorts({ channelId, depth }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            browseId: channelId,
            depth,
        });
        return this.#requester.get("/youtube/channel/shorts", params);
    }

    /**
     * @param {{
     *     id: string;
     *     alternativeMethod?: boolean;
     *     getSubscribersCount?: boolean;
     * }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    videoDetails(
        { id, alternativeMethod = undefined, getSubscribersCount = undefined },
        extraParams = {},
    ) {
        const params = filterUndefinedValues({
            ...extraParams,
            id,
            alternative_method: alternativeMethod,
            get_subscribers_count: getSubscribersCount,
        });
        return this.#requester.get("/youtube/channel/get-short-stats", params);
    }

    /**
     * @param {{ channelId: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    channelSubscribers({ channelId }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            browseId: channelId,
        });
        return this.#requester.get("/youtube/channel/followers", params);
    }

    /**
     * @param {{ username: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    channelUsernameToId({ username }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            name: username,
        });
        return this.#requester.get("/youtube/channel/name-to-id", params);
    }

    /**
     * @param {{ channelId: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    channelIdToUsername({ channelId }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            browseId: channelId,
        });
        return this.#requester.get("/youtube/channel/id-to-name", params);
    }

    /**
     * @param {{ musicId: string; depth?: number }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    musicIdToShorts({ musicId, depth = undefined }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            id: musicId,
            depth,
        });
        return this.#requester.get("/youtube/music/id-to-shorts", params);
    }

    /**
     * @param {{ id: string; cursor?: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    videoComments({ id, cursor = undefined }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            id,
            cursor,
        });
        return this.#requester.get("/youtube/video/comments", params);
    }
}

class InstagramEndpoints {
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
     * @param {{
     *     userId: number;
     *     depth: number;
     *     oldestTimestamp?: number;
     *     chunkSize?: number;
     *     cursor?: string;
     *     alternativeMethod?: boolean;
     * }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    userPosts(
        {
            userId,
            depth,
            oldestTimestamp = undefined,
            chunkSize = undefined,
            cursor = undefined,
            alternativeMethod = undefined,
        },
        extraParams = {},
    ) {
        const params = filterUndefinedValues({
            ...extraParams,
            user_id: userId,
            depth,
            oldest_timestamp: oldestTimestamp,
            chunk_size: chunkSize,
            start_cursor: cursor,
            alternative_method: alternativeMethod,
        });
        return this.#requester.get("/instagram/user/posts", params);
    }

    /**
     * @param {{ userId: number }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    userBasicStats({ userId }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            user_id: userId,
        });
        return this.#requester.get("/instagram/user/basic-info", params);
    }

    /**
     * @param {{ username: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    userInfo({ username }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            username,
        });
        return this.#requester.get("/instagram/user/info", params);
    }

    /**
     * @param {{ username: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    userDetailedInfo({ username }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            username,
        });
        return this.#requester.get("/instagram/user/detailed-info", params);
    }

    /**
     * @param {{ userId: number }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    userFollowers({ userId }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            user_id: userId,
        });
        return this.#requester.get("/instagram/user/followers", params);
    }

    /**
     * @param {{
     *     userId: number;
     *     depth: number;
     *     includeFeedVideo?: boolean;
     *     oldestTimestamp?: number;
     *     cursor?: string;
     *     chunkSize?: number;
     * }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    userReels(
        {
            userId,
            depth,
            includeFeedVideo = undefined,
            oldestTimestamp = undefined,
            cursor = undefined,
            chunkSize = undefined,
        },
        extraParams = {},
    ) {
        const params = filterUndefinedValues({
            ...extraParams,
            user_id: userId,
            depth,
            include_feed_video: includeFeedVideo,
            oldest_timestamp: oldestTimestamp,
            start_cursor: cursor,
            chunk_size: chunkSize,
        });
        return this.#requester.get("/instagram/user/reels", params);
    }

    /**
     * @param {{ userId: number; cursor?: string; chunkSize?: number }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    userTaggedPosts(
        { userId, cursor = undefined, chunkSize = undefined },
        extraParams = {},
    ) {
        const params = filterUndefinedValues({
            ...extraParams,
            user_id: userId,
            cursor,
            chunk_size: chunkSize,
        });
        return this.#requester.get("/instagram/user/tagged-posts", params);
    }

    /**
     * @param {{ code: string; numComments?: number }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    postInfoAndComments({ code, numComments = undefined }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            code,
            n_comments_to_fetch: numComments,
        });
        return this.#requester.get("/instagram/post/details", params);
    }

    /**
     * @param {{
     *     hashtag: string;
     *     cursor?: string;
     *     chunkSize?: number;
     *     getAuthorInfo?: boolean;
     *     alternativeMethod?: boolean;
     * }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    hashtagPosts(
        {
            hashtag,
            cursor = undefined,
            chunkSize = undefined,
            getAuthorInfo = undefined,
            alternativeMethod = undefined,
        },
        extraParams = {},
    ) {
        const params = filterUndefinedValues({
            ...extraParams,
            name: hashtag,
            cursor,
            chunk_size: chunkSize,
            get_author_info: getAuthorInfo,
            alternative_method: alternativeMethod,
        });
        return this.#requester.get("/instagram/hashtag/posts", params);
    }

    /**
     * @param {{ musicId: string; cursor?: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    musicPosts({ musicId, cursor = undefined }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            id: musicId,
            cursor,
        });
        return this.#requester.get("/instagram/music/posts", params);
    }

    /**
     * @param {{ text: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    search({ text }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            text,
        });
        return this.#requester.get("/instagram/search", params);
    }
}

class TwitchEndpoints {
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
     * @param {{
     *     keyword: string;
     *     depth: number;
     *     type: "videos" | "channels" | "games";
     * }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    keywordSearch({ keyword, depth, type }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            keyword,
            depth,
            type,
        });
        return this.#requester.get("/twitch/search", params);
    }

    /**
     * @param {{ username: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    userFollowers({ username }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            username,
        });
        return this.#requester.get("/twitch/user/followers", params);
    }
}

class RedditEndpoints {
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
     * @param {{
     *     name: string;
     *     sort: "hot" | "new" | "top" | "rising";
     *     period: "hour" | "day" | "week" | "month" | "year" | "all";
     *     cursor?: string;
     * }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    subredditPosts(
        { name, sort, period, cursor = undefined },
        extraParams = {},
    ) {
        const params = filterUndefinedValues({
            ...extraParams,
            name,
            sort,
            period,
            cursor,
        });
        return this.#requester.get("/reddit/subreddit/posts", params);
    }

    /**
     * @param {{ id: string; cursor?: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    postComments({ id, cursor = undefined }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            id,
            cursor,
        });
        return this.#requester.get("/reddit/post/comments", params);
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
        this.customer = new CustomerEndpoints({ requester });

        /** @readonly */
        this.customer = new TiktokEndpoints({ requester });

        /** @readonly */
        this.customer = new YoutubeEndpoints({ requester });

        /** @readonly */
        this.customer = new InstagramEndpoints({ requester });

        /** @readonly */
        this.customer = new TwitchEndpoints({ requester });

        /** @readonly */
        this.customer = new RedditEndpoints({ requester });
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
