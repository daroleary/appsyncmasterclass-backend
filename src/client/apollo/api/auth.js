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