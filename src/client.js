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
     *     keyword: string;
     *     cursor: number;
     *     sorting: "0" | "1" | "2" | "3" | "4";
     *     filterBy: "0" | "1" | "2";
     * }} TikTokMusicSearchParams
     */

    /**
     * Fetch information about music based on a string.
     *
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
     * Fetch the videos which have a particular piece of music in the
     * background. The `music_id` can be obtained from other endpoints.
     *
     * @param {{ musicId: string; cursor: number }} params
     * @returns {Promise<EDResponse>}
     */
    musicPosts({ musicId, cursor }) {
        return this.#requester.get("/tt/music/posts", {
            music_id: musicId,
            cursor,
        });
    }

    /**
     * Fetch detailed information for a music ID.
     *
     * @param {string} musicId
     * @returns {Promise<EDResponse>}
     */
    musicDetails(musicId) {
        return this.#requester.get("/tt/music/details", { id: musicId });
    }

    /**
     * Fetch followers for a given user. Each request returns a chunk of 100
     * followers.
     *
     * @param {{ userId: string; secUid: string; cursor: number }} params
     * @returns {Promise<EDResponse>}
     */
    userFollowers({ userId, secUid, cursor }) {
        return this.#requester.get("/tt/user/followers", {
            id: userId,
            secUid,
            cursor,
        });
    }

    /**
     * Fetch followings for a given user. Each request returns a chunk of 100
     * followings.
     *
     * @param {{
     *     userId: string;
     *     secUid: string;
     *     cursor: number;
     *     pageToken: string;
     * }} params
     * @returns {Promise<EDResponse>}
     */
    userFollowings({ userId, secUid, cursor, pageToken }) {
        const params = {
            id: userId,
            secUid,
            cursor,
            ...toSnakeCaseObject({ pageToken }),
        };
        return this.#requester.get("/tt/user/followings", params);
    }

    /**
     * Fetch the list of user's liked posts (only if publicly available).
     *
     * @param {{ secUid: string; cursor: number }} params
     * @returns {Promise<EDResponse>}
     */
    userLikedPosts({ secUid, cursor }) {
        return this.#requester.get("/tt/user/liked-posts", { secUid, cursor });
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
     *     startCursor?: string;
     *     alternativeMethod?: boolean;
     * }} InstagramUserPostsParams
     */

    /**
     * Fetch user posts from the user id.
     *
     * @param {InstagramUserPostsParams} params
     * @returns {Promise<EDResponse>}
     */
    userPosts({
        userId,
        depth,
        oldestTimestamp = undefined,
        chunkSize = undefined,
        startCursor = undefined,
        alternativeMethod = undefined,
    }) {
        const params = filterUndefinedValues({
            depth,
            ...toSnakeCaseObject({
                userId,
                oldestTimestamp,
                chunkSize,
                startCursor,
                alternativeMethod,
            }),
        });
        return this.#requester.get("/instagram/user/posts", params);
    }

    /**
     * Fetch basic user information from the user id.
     *
     * @param {{ userId: number }} params
     * @returns {Promise<EDResponse>}
     */
    userBasicStats({ userId }) {
        return this.#requester.get(
            "/instagram/user/basic-info",
            toSnakeCaseObject({ userId }),
        );
    }

    /**
     * Fetch user information from the username.
     *
     * @param {{ username: string }} params
     * @returns {Promise<EDResponse>}
     */
    userInfo({ username }) {
        return this.#requester.get("/instagram/user/info", { username });
    }

    /**
     * Fetch detailed user information from the username.
     *
     * @param {{ username: string }} params
     * @returns {Promise<EDResponse>}
     */
    userDetailedInfo({ username }) {
        return this.#requester.get("/instagram/user/detailed-info", {
            username,
        });
    }

    /**
     * Fetch number of followers from a user id.
     *
     * @param {{ userId: string }} params
     * @returns {Promise<EDResponse>}
     */
    userFollowers({ userId }) {
        return this.#requester.get(
            "/instagram/user/followers",
            toSnakeCaseObject({ userId }),
        );
    }

    /**
     * @typedef {{
     *     userId: number;
     *     depth: string;
     *     includeFeedVideo?: boolean;
     *     oldestTimestamp?: number;
     *     startCursor?: string;
     *     chunkSize?: number;
     * }} InstagramUserReelsParams
     */

    /**
     * Fetch user reels from a user id.
     *
     * @param {InstagramUserReelsParams} params
     * @returns {Promise<EDResponse>}
     */
    userReels({
        userId,
        depth,
        includeFeedVideo = undefined,
        oldestTimestamp = undefined,
        startCursor = undefined,
        chunkSize = undefined,
    }) {
        const params = filterUndefinedValues({
            depth,
            ...toSnakeCaseObject({
                userId,
                includeFeedVideo,
                oldestTimestamp,
                startCursor,
                chunkSize,
            }),
        });
        return this.#requester.get("/instagram/user/reels", params);
    }

    /**
     * Fetch posts where the given user ID has been tagged.
     *
     * @param {{ userId: number; cursor?: string; chunkSize?: number }} params
     * @returns {Promise<EDResponse>}
     */
    userTaggedPosts({ userId, cursor = undefined, chunkSize = undefined }) {
        const params = filterUndefinedValues({
            cursor,
            ...toSnakeCaseObject({ userId, chunkSize }),
        });
        return this.#requester.get("/instagram/user/tagged-posts", params);
    }

    /**
     * Fetch post information and optionally comments from shortcode.
     *
     * @param {{ code: string; numComments?: boolean }} params
     * @returns {Promise<EDResponse>}
     */
    postInfoAndComments({ code, numComments = undefined }) {
        const params = filterUndefinedValues({
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
     * @returns {Promise<EDResponse>}
     */
    hashtagPosts({
        hashtag,
        cursor = undefined,
        chunkSize = undefined,
        getAuthorInfo = undefined,
        alternativeMethod = undefined,
    }) {
        const params = filterUndefinedValues({
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
     * @returns {Promise<EDResponse>}
     */
    musicPosts({ musicId, cursor = undefined }) {
        const params = filterUndefinedValues({ id: musicId, cursor });
        return this.#requester.get("/instagram/music/posts", params);
    }

    /**
     * Fetch users, places and hashtag information from text.
     *
     * @param {{ text: string }} params
     * @returns {Promise<EDResponse>}
     */
    search({ text }) {
        return this.#requester.get("/instagram/search", { text });
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
     *     startCursor?: string;
     *     period?: "overall" | "hour" | "today" | "week" | "month" | "year";
     *     sorting?: "relevance" | "time" | "views" | "rating";
     *     getAdditionalInfo?: boolean;
     * }} YoutubeKeywordSearchParams
     */

    /**
     * Fetch videos from a given keyword.
     *
     * @param {YoutubeKeywordSearchParams} params
     * @returns {Promise<EDResponse>}
     */
    keywordSeach({
        keyword,
        depth,
        startCursor = undefined,
        period = undefined,
        sorting = undefined,
        getAdditionalInfo = undefined,
    }) {
        const params = filterUndefinedValues({
            keyword,
            depth,
            period,
            sorting,
            ...toSnakeCaseObject({ startCursor, getAdditionalInfo }),
        });
        return this.#requester.get("/youtube/search", params);
    }

    /**
     * Fetch the related categories showing on Youtube search keyword.
     *
     * @param {{ keyword: string }} params
     * @returns {Promise<EDResponse>}
     */
    featuredCategoriesSearch({ keyword }) {
        return this.#requester.get("/youtube/search/featured-categories", {
            name: keyword,
        });
    }

    /**
     * Fetch videos from a given hashtag.
     *
     * @param {{ hashtag: string; depth: number; onlyShorts?: boolean }} params
     * @returns {Promise<EDResponse>}
     */
    hashtagSearch({ hashtag, depth, onlyShorts = undefined }) {
        const params = filterUndefinedValues({
            name: hashtag,
            depth,
            ...toSnakeCaseObject({ onlyShorts }),
        });
        return this.#requester.get("/youtube/hashtag/search", params);
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
     * @returns {Promise<EDResponse>}
     */
    searchKeyword({ keyword, depth, type }) {
        return this.#requester.get("/twitch/search", { keyword, depth, type });
    }

    /**
     * Fetch the number of followers for the given channel.
     *
     * @param {{ username: string }} params
     * @returns {Promise<EDResponse>}
     */
    userFollowers({ username }) {
        return this.#requester.get("/twitch/user/followers", { username });
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
     *     cursor: string;
     * }} RedditSubredditPostsParams
     */

    /**
     * Fetch posts from a subreddit.
     *
     * @param {RedditSubredditPostsParams} params
     * @returns {Promise<EDResponse>}
     */
    subredditPosts({ name, sort, period, cursor }) {
        return this.#requester.get("/reddit/subreddit/posts", {
            name,
            sort,
            period,
            cursor,
        });
    }

    /**
     * Fetch comments from a post.
     *
     * @param {{ postId: string; cursor: string }} params
     */
    postComments({ postId, cursor }) {
        return this.#requester.get("/reddit/post/comments", {
            id: postId,
            cursor,
        });
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
        this.twitch = new TwitchClient({ requester });
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
