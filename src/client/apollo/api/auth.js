import { gql } from 'graphql-tag';

export const getMyProfileQuery = gql`
    query getMyProfile {
        getMyProfile {
            id
            screenName
            location
            name
            birthdate
            bio
            website
            imageUrl
            backgroundImageUrl
            followingCount
            followersCount
            likesCount
            tweetsCount
            tweets {
                nextToken
                tweets {
                    ... on Tweet {
                        id
                        likes
                        text
                    }
                }
            }
            createdAt
        }
    }
`;

export const getProfileQuery = gql`
    query getProfile($screenName: String!) {
        getProfile(screenName: $screenName) {
            id
            screenName
            location
            name
            birthdate
            bio
            website
            imageUrl
            backgroundImageUrl
            following
            followedBy
            followingCount
            followersCount
            likesCount
            tweetsCount
            tweets {
                nextToken
                tweets {
                    ... on Tweet {
                        id
                        likes
                        text
                    }
                }
            }
            createdAt
        }
    }
`;

export const editMyProfileMutation = gql`
    mutation editMyProfile($input: ProfileInput!) {
        editMyProfile(newProfile: $input) {
            id
            screenName
            location
            name
            birthdate
            bio
            website
            imageUrl
            backgroundImageUrl
            followingCount
            followersCount
            likesCount
            tweetsCount
            tweets {
                nextToken
                tweets {
                    ... on Tweet {
                        id
                        likes
                        text
                    }
                }
            }
            createdAt
        }
    }
`;

export const tweetMutation = gql`
    mutation tweet($text: String!) {
        tweet(text: $text) {
            createdAt
            id
            likes
            liked
            replies
            retweets
            retweeted
            text
            createdAt
        }
    }
`;

export const getTweetQuery = gql`
    query getTweet($tweetId: ID!) {
        getTweet(tweetId: $tweetId) {
            createdAt
            id
            profile {
                id
                name
                screenName
                __typename
                ... on MyProfile {
                    id
                    name
                    tweetsCount
                    followersCount
                    followingCount
                }
                ... on OtherProfile {
                    id
                    name
                    tweetsCount
                    followersCount
                    followingCount
                }
            }
            ... on Tweet {
                id
                likes
                liked
                replies
                retweets
                retweeted
                text
                __typename
            }
            ... on Retweet {
                id
                createdAt
                profile {
                    id
                    name
                    screenName
                }
                retweetOf {
                    profile {
                        id
                        name
                        screenName
                        tweetsCount
                    }
                    ... on Tweet {
                        id
                        likes
                        liked
                        replies
                        retweets
                        retweeted
                        text
                        __typename
                    }
                }
            }        
        }
    }
`;

export const getTweetsQuery = gql`
    query getTweets($userId: ID!, $limit: Int!, $nextToken: String) {
        getTweets(userId: $userId, limit: $limit, nextToken: $nextToken) {
            nextToken
            __typename
            tweets {
                createdAt
                id
                profile {
                    id
                    name
                    screenName
                    __typename
                    ... on MyProfile {
                        id
                        name
                        tweetsCount
                        followersCount
                        followingCount
                    }
                    ... on OtherProfile {
                        id
                        name
                        tweetsCount
                        followersCount
                        followingCount
                    }
                }
                ... on Tweet {
                    id
                    likes
                    liked
                    replies
                    retweets
                    retweeted
                    text
                    __typename
                }
                ... on Retweet {
                    id
                    createdAt
                    profile {
                        id
                        name
                        screenName
                    }
                    retweetOf {
                        profile {
                            id
                            name
                            screenName
                            tweetsCount
                        }
                        ... on Tweet {
                            id
                            likes
                            liked
                            replies
                            retweets
                            retweeted
                            text
                            __typename
                        }
                    }
                }
            }
        }
    }
`;

export const likeMutation = gql`
    mutation like($tweetId: ID!) {
        like(tweetId: $tweetId)
    }
`;

export const unlikeMutation = gql`
    mutation unlike($tweetId: ID!) {
        unlike(tweetId: $tweetId)
    }
`;

export const getMyTimelineQuery = gql`
    query getMyTimeline($limit: Int!, $nextToken: String) {
        getMyTimeline(limit: $limit, nextToken: $nextToken) {
            nextToken
            __typename
            tweets {
                createdAt
                id
                profile {
                    id
                    name
                    screenName
                    __typename
                    ... on MyProfile {
                        id
                        name
                        followersCount
                        followingCount
                    }
                    ... on OtherProfile {
                        id
                        name
                        followersCount
                        followingCount
                    }
                }
                ... on Tweet {
                    id
                    likes
                    liked
                    replies
                    retweets
                    retweeted
                    text
                    __typename
                }
            }
        }
    }
`;

export const getLikesQuery = gql`
    query getLikes($userId: ID!, $limit: Int!, $nextToken: String) {
        getLikes(userId: $userId, limit: $limit, nextToken: $nextToken) {
            nextToken
            __typename
            tweets {
                createdAt
                id
                profile {
                    id
                    name
                    screenName
                    __typename
                    ... on MyProfile {
                        id
                        name
                        likesCount
                        followersCount
                        followingCount
                    }
                    ... on OtherProfile {
                        id
                        name
                        likesCount
                        followersCount
                        followingCount
                    }
                }
                ... on Tweet {
                    id
                    likes
                    liked
                    replies
                    retweets
                    retweeted
                    text
                    __typename
                }
            }
        }
    }
`;

export const retweetMutation = gql`
    mutation retweet($tweetId: ID!) {
        retweet(tweetId: $tweetId) {
            createdAt
            id
            profile {
                id
                name
                screenName
            }
            retweetOf {
                profile {
                    id
                    name
                    screenName
                    tweetsCount
                }
                ... on Tweet {
                    id
                    likes
                    liked
                    replies
                    retweets
                    retweeted
                    text
#                    __typename
                }
            }
        }
    }
`;

export const followMutation = gql`
    mutation follow($userId: ID!) {
        follow(userId: $userId)
    }
`;

export const getFollowersQuery = gql`
    query getFollowers($userId: ID!, $limit: Int!, $nextToken: String) {
        getFollowers(userId: $userId, limit: $limit, nextToken: $nextToken) {
            nextToken
            __typename
            profiles {
                id
                name
                screenName
                __typename
                ... on MyProfile {
                    id
                    name
                    likesCount
                    followersCount
                    followingCount
                }
                ... on OtherProfile {
                    id
                    name
                    likesCount
                    followersCount
                    followingCount
                }
            }
        }
    }
`;

export const notifyRetweetedMutation = gql`
    mutation notifyRetweeted(
        $id: ID!
        $userId: ID!
        $tweetId: ID!
        $retweetedBy: ID!
        $retweetId: ID!
    ) {
        notifyRetweeted(
            id: $id
            userId: $userId
            tweetId: $tweetId
            retweetedBy: $retweetedBy
            retweetId: $retweetId
        ) {
            __typename
            ... on Retweeted {
                id
                type
                userId
                tweetId
                retweetedBy
                retweetId
                createdAt
            }
        }
    }
`;