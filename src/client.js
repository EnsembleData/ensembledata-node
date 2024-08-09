import { Requester } from "./requester.js";
import { filterUndefinedValues, toSnakeCaseObject } from "./utils.js";

/** @typedef {import("./requester").EDResponse} EDResponse */

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
     * Fetch all the posts that Tiktok shows for a given hashtag.
     *
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
            ...toSnakeCaseObject({ remapOutput, maxCursor }),
        });
        return this.#requester.get("/tt/hashtag/recent-posts", params);
    }

    /**
     * @typedef {{
     *     keyword: string;
     *     period: "0" | "1" | "7" | "30" | "90" | "180";
     *     cursor?: number;
     *     sorting?: "0" | "1";
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
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    keywordSearch(
        {
            keyword,
            period,
            cursor = undefined,
            sorting = undefined,
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
            ...toSnakeCaseObject({ matchExactly }),
        });
        return this.#requester.get("/tt/keyword/full-search", params);
    }

    /**
     * @typedef {{
     *     username: string;
     *     depth: number;
     *     cursor?: number;
     *     oldestCreatetime?: number;
     *     alternativeMethod?: boolean;
     * }} TikTokUserPostsFromUsernameParams
     */

    /**
     * Fetch user posts from the username.
     *
     * @param {TikTokUserPostsFromUsernameParams} params
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
            ...toSnakeCaseObject({
                startCursor: cursor,
                oldestCreatetime,
                alternativeMethod,
            }),
        });
        return this.#requester.get("/tt/user/posts", params, true);
    }

    /**
     * @typedef {{
     *     secUid: string;
     *     depth: number;
     *     cursor?: number;
     *     oldestCreatetime?: number;
     *     alternativeMethod?: boolean;
     * }} TikTokUserPostsFromSecUidParams
     */

    /**
     * Fetch user posts from the secondary user ID.
     *
     * @param {TikTokUserPostsFromSecUidParams} params
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
            ...toSnakeCaseObject({
                startCursor: cursor,
                oldestCreatetime,
                alternativeMethod,
            }),
        });
        return this.#requester.get("/tt/user/posts-from-secuid", params, true);
    }

    /**
     * Fetch user information and statistics from the username.
     *
     * @param {{ username: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    userInfoFromUsername({ username }, extraParams = {}) {
        return this.#requester.get("/tt/user/info", {
            ...extraParams,
            username,
        });
    }

    /**
     * Fetch user information and statistics from the secondary user id.
     *
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
            ...toSnakeCaseObject({ alternativeMethod }),
            secUid,
        });
        return this.#requester.get("/tt/user/info-from-secuid", params);
    }

    /**
     * Fetch list of users whose username might be related to the given keyword.
     *
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
     * Fetch post information and statistics from URL.
     *
     * @param {{ url: string }} url
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    postInfo({ url }, extraParams = {}) {
        return this.#requester.get("/tt/post/info", { ...extraParams, url });
    }

    /**
     * Fetch information for multiple post IDs passed as input parameter. The
     * endpoint can return maximum up to 100 posts together.
     *
     * @param {{ awemeIds: string[] }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    multiPostInfo({ awemeIds }, extraParams = {}) {
        return this.#requester.get("/tt/post/multi-info", {
            ...extraParams,
            ids: awemeIds.join(";"),
        });
    }

    /**
     * Fetch comments for a given post. Each request returns a chunk of 30
     * comments. The API pagination has to be managed using the cursor starting
     * from 0.
     *
     * @param {{ awemeId: string; cursor?: number }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    postComments({ awemeId, cursor = undefined }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            cursor,
            ...toSnakeCaseObject({ awemeId }),
        });
        return this.#requester.get("/tt/post/comments", params);
    }

    /**
     * Fetch the replies to a comments for a given post. Each request returns a
     * chunk of 30 replies to a comment. The API pagination has to be managed
     * manually using the cursor starting from 0.
     *
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
            cursor,
            ...toSnakeCaseObject({ awemeId, commentId }),
        });
        return this.#requester.get("/tt/post/comment-replies", params);
    }

    /**
     * @typedef {{
     *     keyword: string;
     *     cursor?: number;
     *     sorting: "0" | "1" | "2" | "3" | "4";
     *     filterBy: "0" | "1" | "2";
     * }} TikTokMusicSearchParams
     */

    /**
     * Fetch information about music based on a string.
     *
     * @param {TikTokMusicSearchParams} params
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
            ...toSnakeCaseObject({ filterBy }),
        });
        return this.#requester.get("/tt/music/info", params);
    }

    /**
     * Fetch the videos which have a particular piece of music in the
     * background. The `music_id` can be obtained from other endpoints.
     *
     * @param {{ musicId: string; cursor?: number }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    musicPosts({ musicId, cursor = undefined }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            cursor,
            ...toSnakeCaseObject({ musicId }),
        });
        return this.#requester.get("/tt/music/posts", params);
    }

    /**
     * Fetch detailed information for a music ID.
     *
     * @param {{ musicId: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    musicDetails({ musicId }, extraParams = {}) {
        const params = filterUndefinedValues({ ...extraParams, id: musicId });
        return this.#requester.get("/tt/music/details", params);
    }

    /**
     * Fetch followers for a given user. Each request returns a chunk of 100
     * followers.
     *
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
     * Fetch followings for a given user. Each request returns a chunk of 100
     * followings.
     *
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
            ...toSnakeCaseObject({ pageToken }),
        });
        return this.#requester.get("/tt/user/followings", params);
    }

    /**
     * Fetch the list of user's liked posts (only if publicly available).
     *
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

class InstagramClient {
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
     * @typedef {{
     *     userId: number;
     *     depth: number;
     *     oldestTimestamp?: number;
     *     chunkSize?: number;
     *     cursor?: string;
     *     alternativeMethod?: boolean;
     * }} InstagramUserPostsParams
     */

    /**
     * Fetch user posts from the user id.
     *
     * @param {InstagramUserPostsParams} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    userPosts({
        userId,
        depth,
        oldestTimestamp = undefined,
        chunkSize = undefined,
        cursor = undefined,
        alternativeMethod = undefined,
    }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            depth,
            ...toSnakeCaseObject({
                userId,
                oldestTimestamp,
                chunkSize,
                startCursor: cursor,
                alternativeMethod,
            }),
        });
        return this.#requester.get("/instagram/user/posts", params);
    }

    /**
     * Fetch basic user information from the user id.
     *
     * @param {{ userId: number }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    userBasicStats({ userId }, extraParams = {}) {
        const params = filterUndefinedValues({ ...extraParams, ...toSnakeCaseObject({ userId }) });
        return this.#requester.get( "/instagram/user/basic-info", params);
    }

    /**
     * Fetch user information from the username.
     *
     * @param {{ username: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    userInfo({ username }, extraParams = {}) {
        const params = filterUndefinedValues({ ...extraParams, username });
        return this.#requester.get("/instagram/user/info", params);
    }

    /**
     * Fetch detailed user information from the username.
     *
     * @param {{ username: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    userDetailedInfo({ username }, extraParams = {}) {
        const params = filterUndefinedValues({ ...extraParams, username });
        return this.#requester.get("/instagram/user/detailed-info", params);
    }

    /**
     * Fetch number of followers from a user id.
     *
     * @param {{ userId: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    userFollowers({ userId }, extraParams = {}) {
        const params = filterUndefinedValues({ ...extraParams, ...toSnakeCaseObject({ userId }) });
        return this.#requester.get( "/instagram/user/followers", params);
    }

    /**
     * @typedef {{
     *     userId: number;
     *     depth: string;
     *     includeFeedVideo?: boolean;
     *     oldestTimestamp?: number;
     *     cursor?: string;
     *     chunkSize?: number;
     * }} InstagramUserReelsParams
     */

    /**
     * Fetch user reels from a user id.
     *
     * @param {InstagramUserReelsParams} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    userReels({
        userId,
        depth,
        includeFeedVideo = undefined,
        oldestTimestamp = undefined,
        cursor = undefined,
        chunkSize = undefined,
    }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            depth,
            ...toSnakeCaseObject({
                userId,
                includeFeedVideo,
                oldestTimestamp,
                startCursor: cursor,
                chunkSize,
            }),
        });
        return this.#requester.get("/instagram/user/reels", params);
    }

    /**
     * Fetch posts where the given user ID has been tagged.
     *
     * @param {{ userId: number; cursor?: string; chunkSize?: number }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    userTaggedPosts({ userId, cursor = undefined, chunkSize = undefined }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            cursor,
            ...toSnakeCaseObject({ userId, chunkSize }),
        });
        return this.#requester.get("/instagram/user/tagged-posts", params);
    }

    /**
     * Fetch post information and optionally comments from shortcode.
     *
     * @param {{ code: string; numComments?: boolean }} params
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
     * @typedef {{
     *     hashtag: string;
     *     cursor?: string;
     *     chunkSize?: number;
     *     getAuthorInfo?: boolean;
     *     alternativeMethod?: boolean;
     * }} InstagramHashtagPostsParams
     */

    /**
     * Fetch most recent posts containing a hashtag.
     *
     * @param {InstagramHashtagPostsParams} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    hashtagPosts({
        hashtag,
        cursor = undefined,
        chunkSize = undefined,
        getAuthorInfo = undefined,
        alternativeMethod = undefined,
    }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            name: hashtag,
            cursor,
            ...toSnakeCaseObject({
                chunkSize,
                getAuthorInfo,
                alternativeMethod,
            }),
        });
        return this.#requester.get("/instagram/hashtag/posts", params);
    }

    /**
     * Fetch posts from a music id.
     *
     * @param {{ musicId: string; cursor?: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    musicPosts({ musicId, cursor = undefined }, extraParams = {}) {
        const params = filterUndefinedValues({ ...extraParams, id: musicId, cursor });
        return this.#requester.get("/instagram/music/posts", params);
    }

    /**
     * Fetch users, places and hashtag information from text.
     *
     * @param {{ text: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    search({ text }, extraParams = {}) {
        const params = filterUndefinedValues({ ...extraParams, text });
        return this.#requester.get("/instagram/search", params);
    }
}

class YoutubeClient {
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
     * @typedef {{
     *     keyword: string;
     *     depth: number;
     *     cursor?: string;
     *     period?: "overall" | "hour" | "today" | "week" | "month" | "year";
     *     sorting?: "relevance" | "time" | "views" | "rating";
     *     getAdditionalInfo?: boolean;
     * }} YoutubeKeywordSearchParams
     */

    /**
     * Fetch videos from a given keyword.
     *
     * @param {YoutubeKeywordSearchParams} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    keywordSeach({
        keyword,
        depth,
        cursor = undefined,
        period = undefined,
        sorting = undefined,
        getAdditionalInfo = undefined,
    }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            keyword,
            depth,
            period,
            sorting,
            ...toSnakeCaseObject({ startCursor: cursor, getAdditionalInfo }),
        });
        return this.#requester.get("/youtube/search", params);
    }

    /**
     * Fetch the related categories showing on Youtube search keyword.
     *
     * @param {{ keyword: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    featuredCategoriesSearch({ keyword }, extraParams = {}) {
        const params = filterUndefinedValues({ ...extraParams, name: keyword });
        return this.#requester.get("/youtube/search/featured-categories", params);
    }

    /**
     * Fetch videos from a given hashtag.
     *
     * @param {{ hashtag: string; depth: number; onlyShorts?: boolean }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    hashtagSearch({ hashtag, depth, onlyShorts = undefined }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            name: hashtag,
            depth,
            ...toSnakeCaseObject({ onlyShorts }),
        });
        return this.#requester.get("/youtube/hashtag/search", params);
    }

    /**
     * Get detailed information for a specific Youtube channel from its ID
     * (youtube.com/channel/UCX6OQ3DkcsbYNE6H8uQQuVA).
     *
     * @param {{ channelId: string; fromUrl?: boolean }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    channelDetailedInfo({ channelId, fromUrl = undefined }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            browseId: channelId,
            ...toSnakeCaseObject({ fromUrl }),
        });
        return this.#requester.get("/youtube/channel/detailed-info", params);
    }

    /**
     * Fetch videos for a given channel from its ID
     * (youtube.com/channel/UCX6OQ3DkcsbYNE6H8uQQuVA).
     *
     * @param {{ channelId: string; depth: number }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    channelVideos({ channelId, depth }, extraParams = {}) {
        const params = filterUndefinedValues({ ...extraParams, browseId: channelId, depth });
        return this.#requester.get("/youtube/channel/videos", params);
    }

    /**
     * Fetch Youtube Shorts for a given channel from its ID
     * (youtube.com/channel/UCX6OQ3DkcsbYNE6H8uQQuVA).
     *
     * @param {{ channelId: string; depth: number }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    channelShorts({ channelId, depth }, extraParams = {}) {
        const params = filterUndefinedValues({ ...extraParams, browseId: channelId, depth });
        return this.#requester.get("/youtube/channel/shorts", params);
    }

    /**
     * Fetch statistics for a Youtube Short or Video from its channel ID
     * (youtube.com/channel/UCX6OQ3DkcsbYNE6H8uQQuVA).
     *
     * @param {{
     *     id: string;
     *     alternativeMethod?: boolean;
     *     getSubscribersCount?: boolean;
     * }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    videoDetails({
        id,
        alternativeMethod = undefined,
        getSubscribersCount = undefined,
    }, extraParams = {}) {
        const params = filterUndefinedValues({
            ...extraParams,
            id,
            ...toSnakeCaseObject({ alternativeMethod, getSubscribersCount }),
        });
        return this.#requester.get("/youtube/channel/get-short-stats", params);
    }

    /**
     * Fetch the number of subscribers for a channel from its ID
     * (youtube.com/channel/UCX6OQ3DkcsbYNE6H8uQQuVA).
     *
     * @param {{ channelId: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    channelSubscribers({ channelId }, extraParams = {}) {
        const params = filterUndefinedValues({ ...extraParams, browseId: channelId });
        return this.#requester.get("/youtube/channel/followers", params);
    }

    /**
     * Get the channel ID (youtube.com/channel/UCX6OQ3DkcsbYNE6H8uQQuVA) from
     * the channel username (youtube.com/@MrBeast).
     *
     * @param {{ username: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    channelUsernameToId({ username }, extraParams = {}) {
        const params = filterUndefinedValues({ ...extraParams, name: username });
        return this.#requester.get("/youtube/channel/name-to-id", params);
    }

    /**
     * Get the channel username (youtube.com/@MrBeast) from the channel ID
     * (youtube.com/channel/UCX6OQ3DkcsbYNE6H8uQQuVA).
     *
     * @param {{ channelId: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    channelIdToUsername({ channelId }, extraParams = {}) {
        const params = filterUndefinedValues({ ...extraParams, browseId: channelId });
        return this.#requester.get("/youtube/channel/id-to-name", params);
    }

    /**
     * Get shorts using a specific music ID.
     *
     * @param {{ musicId: string; depth: number }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    musicIdToShorts({ musicId, depth }, extraParams = {}) {
        const params = filterUndefinedValues({ ...extraParams, id: musicId, depth });
        return this.#requester.get("/youtube/music/id-to-shorts", params);
    }

    /**
     * Get comments for a specific Youtube Video or Short.
     *
     * @param {{ id: string; cursor?: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    videoComments({ id, cursor = undefined }, extraParams = {}) {
        const params = filterUndefinedValues({ ...extraParams, id, cursor });
        return this.#requester.get("/youtube/video/comments", params);
    }
}

class TwitchClient {
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
     * Fetch results (videos/channels/games) from a given keyword.
     *
     * @param {{
     *     keyword: string;
     *     depth: number;
     *     type: "videos" | "channels" | "games";
     * }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    searchKeyword({ keyword, depth, type }, extraParams = {}) {
        const params = filterUndefinedValues({ ...extraParams, keyword, depth, type });
        return this.#requester.get("/twitch/search", params);
    }

    /**
     * Fetch the number of followers for the given channel.
     *
     * @param {{ username: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    userFollowers({ username }, extraParams = {}) {
        const params = filterUndefinedValues({ ...extraParams, username });
        return this.#requester.get("/twitch/user/followers", params);
    }
}

class RedditClient {
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
     * @typedef {{
     *     name: string;
     *     sort: "hot" | "new" | "top" | "rising";
     *     period: "hour" | "day" | "week" | "month" | "year" | "all";
     *     cursor?: string;
     * }} RedditSubredditPostsParams
     */

    /**
     * Fetch posts from a subreddit.
     *
     * @param {RedditSubredditPostsParams} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    subredditPosts({ name, sort, period, cursor = undefined }, extraParams = {}) {
        const params = filterUndefinedValues({ ...extraParams, name, sort, period, cursor });
        return this.#requester.get("/reddit/subreddit/posts", params);
    }

    /**
     * Fetch comments from a post.
     *
     * @param {{ id: string; cursor?: string }} params
     * @param {Record<string, any>} extraParams
     * @returns {Promise<EDResponse>}
     */
    postComments({ id, cursor = undefined }, extraParams = {}) {
        const params = filterUndefinedValues({ ...extraParams, id, cursor });
        return this.#requester.get("/reddit/post/comments", params);
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

        /** @readonly */
        this.instagram = new InstagramClient({ requester });

        /** @readonly */
        this.youtube = new YoutubeClient({ requester });

        /** @readonly */
        this.twitch = new TwitchClient({ requester });

        /** @readonly */
        this.reddit = new RedditClient({ requester });
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
