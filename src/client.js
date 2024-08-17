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
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    getUsage({ date }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            date,
        });
        return this.#requester.get("/customer/get-used-units", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ days: number }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    getUsageHistory({ days }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            days,
        });
        return this.#requester.get("/customer/get-history", params, {
            timeoutSecs: options.timeoutSecs,
        });
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
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    hashtagSearch({ hashtag, cursor = undefined }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            name: hashtag,
            cursor,
        });
        return this.#requester.get("/tt/hashtag/posts", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{
     *     hashtag: string;
     *     days: number;
     *     remapOutput?: boolean;
     *     maxCursor?: number;
     * }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    fullHashtagSearch(
        { hashtag, days, remapOutput = undefined, maxCursor = undefined },
        options = {},
    ) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            name: hashtag,
            days,
            remap_output: remapOutput,
            max_cursor: maxCursor,
        });
        return this.#requester.get("/tt/hashtag/recent-posts", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{
     *     keyword: string;
     *     cursor?: number;
     *     period: "0" | "1" | "7" | "30" | "90" | "180";
     *     sorting?: "0" | "1";
     *     country?: string;
     *     matchExactly?: boolean;
     *     getAuthorStats?: boolean;
     * }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    keywordSearch(
        {
            keyword,
            cursor = undefined,
            period,
            sorting = undefined,
            country = undefined,
            matchExactly = undefined,
            getAuthorStats = undefined,
        },
        options = {},
    ) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            name: keyword,
            cursor,
            period,
            sorting,
            country,
            match_exactly: matchExactly,
            get_author_stats: getAuthorStats,
        });
        return this.#requester.get("/tt/keyword/search", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{
     *     keyword: string;
     *     period: "0" | "1" | "7" | "30" | "90" | "180";
     *     sorting?: "0" | "1";
     *     country?: string;
     *     matchExactly?: boolean;
     * }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
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
        options = {},
    ) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            name: keyword,
            period,
            sorting,
            country,
            match_exactly: matchExactly,
        });
        return this.#requester.get("/tt/keyword/full-search", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{
     *     username: string;
     *     depth: number;
     *     cursor?: number;
     *     oldestCreatetime?: number;
     *     alternativeMethod?: boolean;
     * }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
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
        options = {},
    ) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            username,
            depth,
            start_cursor: cursor,
            oldest_createtime: oldestCreatetime,
            alternative_method: alternativeMethod,
        });
        return this.#requester.get("/tt/user/posts", params, {
            timeoutSecs: options.timeoutSecs,
            returnTopLevelData: true,
        });
    }

    /**
     * @param {{
     *     secUid: string;
     *     depth: number;
     *     cursor?: number;
     *     oldestCreatetime?: number;
     *     alternativeMethod?: boolean;
     * }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
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
        options = {},
    ) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            secUid,
            depth,
            start_cursor: cursor,
            oldest_createtime: oldestCreatetime,
            alternative_method: alternativeMethod,
        });
        return this.#requester.get("/tt/user/posts-from-secuid", params, {
            timeoutSecs: options.timeoutSecs,
            returnTopLevelData: true,
        });
    }

    /**
     * @param {{ username: string }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userInfoFromUsername({ username }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            username,
        });
        return this.#requester.get("/tt/user/info", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ secUid: string; alternativeMethod?: boolean }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userInfoFromSecuid(
        { secUid, alternativeMethod = undefined },
        options = {},
    ) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            secUid,
            alternative_method: alternativeMethod,
        });
        return this.#requester.get("/tt/user/info-from-secuid", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ keyword: string; cursor?: number }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userSearch({ keyword, cursor = undefined }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            keyword,
            cursor,
        });
        return this.#requester.get("/tt/user/search", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ url: string }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    postInfo({ url }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            url,
        });
        return this.#requester.get("/tt/post/info", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ awemeIds: string[] }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    multiPostInfo({ awemeIds }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            ids: awemeIds.join(";"),
        });
        return this.#requester.get("/tt/post/multi-info", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ awemeId: string; cursor?: number }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    postComments({ awemeId, cursor = undefined }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            aweme_id: awemeId,
            cursor,
        });
        return this.#requester.get("/tt/post/comments", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ awemeId: string; commentId: string; cursor?: number }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    postCommentReplies(
        { awemeId, commentId, cursor = undefined },
        options = {},
    ) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            aweme_id: awemeId,
            comment_id: commentId,
            cursor,
        });
        return this.#requester.get("/tt/post/comments-replies", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{
     *     keyword: string;
     *     cursor?: number;
     *     sorting?: "0" | "1" | "2" | "3" | "4";
     *     filterBy?: "0" | "1" | "2";
     * }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    musicSearch(
        {
            keyword,
            cursor = undefined,
            sorting = undefined,
            filterBy = undefined,
        },
        options = {},
    ) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            name: keyword,
            cursor,
            sorting,
            filter_by: filterBy,
        });
        return this.#requester.get("/tt/music/info", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ musicId: string; cursor?: number }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    musicPosts({ musicId, cursor = undefined }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            music_id: musicId,
            cursor,
        });
        return this.#requester.get("/tt/music/posts", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ musicId: string }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    musicDetails({ musicId }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            id: musicId,
        });
        return this.#requester.get("/tt/music/details", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ id: string; secUid: string; cursor?: number }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userFollowers({ id, secUid, cursor = undefined }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            id,
            secUid,
            cursor,
        });
        return this.#requester.get("/tt/user/followers", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{
     *     id: string;
     *     secUid: string;
     *     cursor?: number;
     *     pageToken?: string;
     * }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userFollowings(
        { id, secUid, cursor = undefined, pageToken = undefined },
        options = {},
    ) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            id,
            secUid,
            cursor,
            page_token: pageToken,
        });
        return this.#requester.get("/tt/user/followings", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ secUid: string; cursor?: number }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userLikedPosts({ secUid, cursor = undefined }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            secUid,
            cursor,
        });
        return this.#requester.get("/tt/user/liked-posts", params, {
            timeoutSecs: options.timeoutSecs,
        });
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
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
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
        options = {},
    ) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            keyword,
            depth,
            start_cursor: cursor,
            period,
            sorting,
            get_additional_info: getAdditionalInfo,
        });
        return this.#requester.get("/youtube/search", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ keyword: string }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    featuredCategoriesSearch({ keyword }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            name: keyword,
        });
        return this.#requester.get(
            "/youtube/search/featured-categories",
            params,
            { timeoutSecs: options.timeoutSecs },
        );
    }

    /**
     * @param {{ hashtag: string; depth: number; onlyShorts?: boolean }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    hashtagSearch({ hashtag, depth, onlyShorts = undefined }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            name: hashtag,
            depth,
            only_shorts: onlyShorts,
        });
        return this.#requester.get("/youtube/hashtag/search", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ channelId: string; fromUrl?: boolean }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    channelDetailedInfo({ channelId, fromUrl = undefined }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            browseId: channelId,
            from_url: fromUrl,
        });
        return this.#requester.get("/youtube/channel/detailed-info", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ channelId: string; depth: number }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    channelVideos({ channelId, depth }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            browseId: channelId,
            depth,
        });
        return this.#requester.get("/youtube/channel/videos", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ channelId: string; depth: number }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    channelShorts({ channelId, depth }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            browseId: channelId,
            depth,
        });
        return this.#requester.get("/youtube/channel/shorts", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{
     *     id: string;
     *     alternativeMethod?: boolean;
     *     getSubscribersCount?: boolean;
     * }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    videoDetails(
        { id, alternativeMethod = undefined, getSubscribersCount = undefined },
        options = {},
    ) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            id,
            alternative_method: alternativeMethod,
            get_subscribers_count: getSubscribersCount,
        });
        return this.#requester.get("/youtube/channel/get-short-stats", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ channelId: string }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    channelSubscribers({ channelId }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            browseId: channelId,
        });
        return this.#requester.get("/youtube/channel/followers", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ username: string }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    channelUsernameToId({ username }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            name: username,
        });
        return this.#requester.get("/youtube/channel/name-to-id", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ channelId: string }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    channelIdToUsername({ channelId }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            browseId: channelId,
        });
        return this.#requester.get("/youtube/channel/id-to-name", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ musicId: string; depth?: number }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    musicIdToShorts({ musicId, depth = undefined }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            id: musicId,
            depth,
        });
        return this.#requester.get("/youtube/music/id-to-shorts", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ id: string; cursor?: string }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    videoComments({ id, cursor = undefined }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            id,
            cursor,
        });
        return this.#requester.get("/youtube/video/comments", params, {
            timeoutSecs: options.timeoutSecs,
        });
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
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
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
        options = {},
    ) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            user_id: userId,
            depth,
            oldest_timestamp: oldestTimestamp,
            chunk_size: chunkSize,
            start_cursor: cursor,
            alternative_method: alternativeMethod,
        });
        return this.#requester.get("/instagram/user/posts", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ userId: number }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userBasicStats({ userId }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            user_id: userId,
        });
        return this.#requester.get("/instagram/user/basic-info", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ username: string }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userInfo({ username }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            username,
        });
        return this.#requester.get("/instagram/user/info", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ username: string }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userDetailedInfo({ username }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            username,
        });
        return this.#requester.get("/instagram/user/detailed-info", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ userId: number }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userFollowers({ userId }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            user_id: userId,
        });
        return this.#requester.get("/instagram/user/followers", params, {
            timeoutSecs: options.timeoutSecs,
        });
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
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
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
        options = {},
    ) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            user_id: userId,
            depth,
            include_feed_video: includeFeedVideo,
            oldest_timestamp: oldestTimestamp,
            start_cursor: cursor,
            chunk_size: chunkSize,
        });
        return this.#requester.get("/instagram/user/reels", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ userId: number; cursor?: string; chunkSize?: number }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userTaggedPosts(
        { userId, cursor = undefined, chunkSize = undefined },
        options = {},
    ) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            user_id: userId,
            cursor,
            chunk_size: chunkSize,
        });
        return this.#requester.get("/instagram/user/tagged-posts", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ code: string; numComments?: number }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    postInfoAndComments({ code, numComments = undefined }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            code,
            n_comments_to_fetch: numComments,
        });
        return this.#requester.get("/instagram/post/details", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{
     *     hashtag: string;
     *     cursor?: string;
     *     chunkSize?: number;
     *     getAuthorInfo?: boolean;
     *     alternativeMethod?: boolean;
     * }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
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
        options = {},
    ) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            name: hashtag,
            cursor,
            chunk_size: chunkSize,
            get_author_info: getAuthorInfo,
            alternative_method: alternativeMethod,
        });
        return this.#requester.get("/instagram/hashtag/posts", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ musicId: string; cursor?: string }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    musicPosts({ musicId, cursor = undefined }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            id: musicId,
            cursor,
        });
        return this.#requester.get("/instagram/music/posts", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ text: string }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    search({ text }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            text,
        });
        return this.#requester.get("/instagram/search", params, {
            timeoutSecs: options.timeoutSecs,
        });
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
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    keywordSearch({ keyword, depth, type }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            keyword,
            depth,
            type,
        });
        return this.#requester.get("/twitch/search", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ username: string }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userFollowers({ username }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            username,
        });
        return this.#requester.get("/twitch/user/followers", params, {
            timeoutSecs: options.timeoutSecs,
        });
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
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    subredditPosts({ name, sort, period, cursor = undefined }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            name,
            sort,
            period,
            cursor,
        });
        return this.#requester.get("/reddit/subreddit/posts", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }

    /**
     * @param {{ id: string; cursor?: string }} params
     * @param {{ extraParams?: Record<string, any>; timeoutSecs?: number }} options
     * @returns {Promise<EDResponse>}
     */
    postComments({ id, cursor = undefined }, options = {}) {
        const params = filterUndefinedValues({
            ...options.extraParams,
            id,
            cursor,
        });
        return this.#requester.get("/reddit/post/comments", params, {
            timeoutSecs: options.timeoutSecs,
        });
    }
}

export class EDClient {
    /**
     * @type {Requester}
     * @readonly
     */
    #requester;

    /**
     * @param {{
     *     token: string;
     *     timeoutSecs?: number;
     *     maxNetworkRetries?: number;
     * }} options
     */
    constructor({ token, timeoutSecs = 600, maxNetworkRetries = 3 }) {
        const requester = new Requester({
            token,
            timeoutSecs,
            maxNetworkRetries,
        });
        this.#requester = requester;

        /** @readonly */
        this.customer = new CustomerEndpoints({ requester });

        /** @readonly */
        this.tiktok = new TiktokEndpoints({ requester });

        /** @readonly */
        this.youtube = new YoutubeEndpoints({ requester });

        /** @readonly */
        this.instagram = new InstagramEndpoints({ requester });

        /** @readonly */
        this.twitch = new TwitchEndpoints({ requester });

        /** @readonly */
        this.reddit = new RedditEndpoints({ requester });
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
