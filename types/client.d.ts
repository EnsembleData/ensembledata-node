export class EDClient {
    /**
     * @param {{
     *     token: string;
     *     timeout?: number;
     *     maxNetworkRetries?: number;
     * }} options
     */
    constructor({ token, timeout, maxNetworkRetries }: {
        token: string;
        timeout?: number;
        maxNetworkRetries?: number;
    });
    /** @readonly */
    readonly customer: CustomerEndpoints;
    /** @readonly */
    readonly tiktok: TiktokEndpoints;
    /** @readonly */
    readonly youtube: YoutubeEndpoints;
    /** @readonly */
    readonly instagram: InstagramEndpoints;
    /** @readonly */
    readonly twitch: TwitchEndpoints;
    /** @readonly */
    readonly reddit: RedditEndpoints;
    /**
     * @param {string} path
     * @param {Record<string, string>} params
     * @param {{ timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    request(path: string, params: Record<string, string>, options?: {
        timeout?: number;
    }): Promise<EDResponse>;
    #private;
}
export type EDResponse = import("./requester").EDResponse;
/** @typedef {import("./requester").EDResponse} EDResponse */
declare class CustomerEndpoints {
    /** @param {{ requester: Requester }} options */
    constructor({ requester }: {
        requester: Requester;
    });
    /**
     * @param {{ date: string }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    getUsage({ date }: {
        date: string;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ days: number }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    getUsageHistory({ days }: {
        days: number;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    #private;
}
declare class TiktokEndpoints {
    /** @param {{ requester: Requester }} options */
    constructor({ requester }: {
        requester: Requester;
    });
    /**
     * @param {{ hashtag: string; cursor?: number }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    hashtagSearch({ hashtag, cursor }: {
        hashtag: string;
        cursor?: number;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{
     *     hashtag: string;
     *     days: number;
     *     remapOutput?: boolean;
     *     maxCursor?: number;
     * }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    fullHashtagSearch({ hashtag, days, remapOutput, maxCursor }: {
        hashtag: string;
        days: number;
        remapOutput?: boolean;
        maxCursor?: number;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
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
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    keywordSearch({ keyword, cursor, period, sorting, country, matchExactly, getAuthorStats, }: {
        keyword: string;
        cursor?: number;
        period: "0" | "1" | "7" | "30" | "90" | "180";
        sorting?: "0" | "1";
        country?: string;
        matchExactly?: boolean;
        getAuthorStats?: boolean;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{
     *     keyword: string;
     *     period: "0" | "1" | "7" | "30" | "90" | "180";
     *     sorting?: "0" | "1";
     *     country?: string;
     *     matchExactly?: boolean;
     * }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    fullKeywordSearch({ keyword, period, sorting, country, matchExactly, }: {
        keyword: string;
        period: "0" | "1" | "7" | "30" | "90" | "180";
        sorting?: "0" | "1";
        country?: string;
        matchExactly?: boolean;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{
     *     username: string;
     *     depth: number;
     *     cursor?: number;
     *     oldestCreatetime?: number;
     *     alternativeMethod?: boolean;
     * }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userPostsFromUsername({ username, depth, cursor, oldestCreatetime, alternativeMethod, }: {
        username: string;
        depth: number;
        cursor?: number;
        oldestCreatetime?: number;
        alternativeMethod?: boolean;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{
     *     secUid: string;
     *     depth: number;
     *     cursor?: number;
     *     oldestCreatetime?: number;
     *     alternativeMethod?: boolean;
     * }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userPostsFromSecuid({ secUid, depth, cursor, oldestCreatetime, alternativeMethod, }: {
        secUid: string;
        depth: number;
        cursor?: number;
        oldestCreatetime?: number;
        alternativeMethod?: boolean;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ username: string }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userInfoFromUsername({ username }: {
        username: string;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ secUid: string; alternativeMethod?: boolean }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userInfoFromSecuid({ secUid, alternativeMethod }: {
        secUid: string;
        alternativeMethod?: boolean;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ keyword: string; cursor?: number }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userSearch({ keyword, cursor }: {
        keyword: string;
        cursor?: number;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ url: string }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    postInfo({ url }: {
        url: string;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ awemeIds: string[] }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    multiPostInfo({ awemeIds }: {
        awemeIds: string[];
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ awemeId: string; cursor?: number }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    postComments({ awemeId, cursor }: {
        awemeId: string;
        cursor?: number;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ awemeId: string; commentId: string; cursor?: number }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    postCommentReplies({ awemeId, commentId, cursor }: {
        awemeId: string;
        commentId: string;
        cursor?: number;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{
     *     keyword: string;
     *     cursor?: number;
     *     sorting?: "0" | "1" | "2" | "3" | "4";
     *     filterBy?: "0" | "1" | "2";
     * }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    musicSearch({ keyword, cursor, sorting, filterBy, }: {
        keyword: string;
        cursor?: number;
        sorting?: "0" | "1" | "2" | "3" | "4";
        filterBy?: "0" | "1" | "2";
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ musicId: string; cursor?: number }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    musicPosts({ musicId, cursor }: {
        musicId: string;
        cursor?: number;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ musicId: string }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    musicDetails({ musicId }: {
        musicId: string;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ id: string; secUid: string; cursor?: number }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userFollowers({ id, secUid, cursor }: {
        id: string;
        secUid: string;
        cursor?: number;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{
     *     id: string;
     *     secUid: string;
     *     cursor?: number;
     *     pageToken?: string;
     * }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userFollowings({ id, secUid, cursor, pageToken }: {
        id: string;
        secUid: string;
        cursor?: number;
        pageToken?: string;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ secUid: string; cursor?: number }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userLikedPosts({ secUid, cursor }: {
        secUid: string;
        cursor?: number;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    #private;
}
declare class YoutubeEndpoints {
    /** @param {{ requester: Requester }} options */
    constructor({ requester }: {
        requester: Requester;
    });
    /**
     * @param {{
     *     keyword: string;
     *     depth: number;
     *     cursor?: string;
     *     period?: "overall" | "hour" | "today" | "week" | "month" | "year";
     *     sorting?: "relevance" | "time" | "views" | "rating";
     *     getAdditionalInfo?: boolean;
     * }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    keywordSearch({ keyword, depth, cursor, period, sorting, getAdditionalInfo, }: {
        keyword: string;
        depth: number;
        cursor?: string;
        period?: "overall" | "hour" | "today" | "week" | "month" | "year";
        sorting?: "relevance" | "time" | "views" | "rating";
        getAdditionalInfo?: boolean;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ keyword: string }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    featuredCategoriesSearch({ keyword }: {
        keyword: string;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ hashtag: string; depth: number; onlyShorts?: boolean }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    hashtagSearch({ hashtag, depth, onlyShorts }: {
        hashtag: string;
        depth: number;
        onlyShorts?: boolean;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ channelId: string; fromUrl?: boolean }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    channelDetailedInfo({ channelId, fromUrl }: {
        channelId: string;
        fromUrl?: boolean;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ channelId: string; depth: number }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    channelVideos({ channelId, depth }: {
        channelId: string;
        depth: number;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ channelId: string; depth: number }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    channelShorts({ channelId, depth }: {
        channelId: string;
        depth: number;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{
     *     id: string;
     *     alternativeMethod?: boolean;
     *     getSubscribersCount?: boolean;
     * }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    videoDetails({ id, alternativeMethod, getSubscribersCount }: {
        id: string;
        alternativeMethod?: boolean;
        getSubscribersCount?: boolean;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ channelId: string }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    channelSubscribers({ channelId }: {
        channelId: string;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ username: string }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    channelUsernameToId({ username }: {
        username: string;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ channelId: string }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    channelIdToUsername({ channelId }: {
        channelId: string;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ musicId: string; depth?: number }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    musicIdToShorts({ musicId, depth }: {
        musicId: string;
        depth?: number;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ id: string; cursor?: string }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    videoComments({ id, cursor }: {
        id: string;
        cursor?: string;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    #private;
}
declare class InstagramEndpoints {
    /** @param {{ requester: Requester }} options */
    constructor({ requester }: {
        requester: Requester;
    });
    /**
     * @param {{
     *     userId: number;
     *     depth: number;
     *     oldestTimestamp?: number;
     *     chunkSize?: number;
     *     cursor?: string;
     *     alternativeMethod?: boolean;
     * }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userPosts({ userId, depth, oldestTimestamp, chunkSize, cursor, alternativeMethod, }: {
        userId: number;
        depth: number;
        oldestTimestamp?: number;
        chunkSize?: number;
        cursor?: string;
        alternativeMethod?: boolean;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ userId: number }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userBasicStats({ userId }: {
        userId: number;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ username: string }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userInfo({ username }: {
        username: string;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ username: string }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userDetailedInfo({ username }: {
        username: string;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ userId: number }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userFollowers({ userId }: {
        userId: number;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{
     *     userId: number;
     *     depth: number;
     *     includeFeedVideo?: boolean;
     *     oldestTimestamp?: number;
     *     cursor?: string;
     *     chunkSize?: number;
     * }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userReels({ userId, depth, includeFeedVideo, oldestTimestamp, cursor, chunkSize, }: {
        userId: number;
        depth: number;
        includeFeedVideo?: boolean;
        oldestTimestamp?: number;
        cursor?: string;
        chunkSize?: number;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ userId: number; cursor?: string; chunkSize?: number }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userTaggedPosts({ userId, cursor, chunkSize }: {
        userId: number;
        cursor?: string;
        chunkSize?: number;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ code: string; numComments?: number }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    postInfoAndComments({ code, numComments }: {
        code: string;
        numComments?: number;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{
     *     hashtag: string;
     *     cursor?: string;
     *     chunkSize?: number;
     *     getAuthorInfo?: boolean;
     *     alternativeMethod?: boolean;
     * }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    hashtagPosts({ hashtag, cursor, chunkSize, getAuthorInfo, alternativeMethod, }: {
        hashtag: string;
        cursor?: string;
        chunkSize?: number;
        getAuthorInfo?: boolean;
        alternativeMethod?: boolean;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ musicId: string; cursor?: string }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    musicPosts({ musicId, cursor }: {
        musicId: string;
        cursor?: string;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ text: string }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    search({ text }: {
        text: string;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    #private;
}
declare class TwitchEndpoints {
    /** @param {{ requester: Requester }} options */
    constructor({ requester }: {
        requester: Requester;
    });
    /**
     * @param {{
     *     keyword: string;
     *     depth: number;
     *     type: "videos" | "channels" | "games";
     * }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    keywordSearch({ keyword, depth, type }: {
        keyword: string;
        depth: number;
        type: "videos" | "channels" | "games";
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ username: string }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    userFollowers({ username }: {
        username: string;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    #private;
}
declare class RedditEndpoints {
    /** @param {{ requester: Requester }} options */
    constructor({ requester }: {
        requester: Requester;
    });
    /**
     * @param {{
     *     name: string;
     *     sort: "hot" | "new" | "top" | "rising";
     *     period: "hour" | "day" | "week" | "month" | "year" | "all";
     *     cursor?: string;
     * }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    subredditPosts({ name, sort, period, cursor }: {
        name: string;
        sort: "hot" | "new" | "top" | "rising";
        period: "hour" | "day" | "week" | "month" | "year" | "all";
        cursor?: string;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    /**
     * @param {{ id: string; cursor?: string }} params
     * @param {{ extraParams?: Record<string, any>; timeout?: number }} options
     * @returns {Promise<EDResponse>}
     */
    postComments({ id, cursor }: {
        id: string;
        cursor?: string;
    }, options?: {
        extraParams?: Record<string, any>;
        timeout?: number;
    }): Promise<EDResponse>;
    #private;
}
import { Requester } from "./requester.js";
export {};
//# sourceMappingURL=client.d.ts.map