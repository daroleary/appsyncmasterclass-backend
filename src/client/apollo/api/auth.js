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
            text
            createdAt
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
                    text
                    __typename
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
                    text
                    __typename
                }
            }
        }
    }
`;