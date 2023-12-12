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
                    replies
                    retweets
                    text
                    __typename
                }
            }
        }
    }
`;