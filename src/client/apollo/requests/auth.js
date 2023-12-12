import {
  getMyProfileQuery,
  editMyProfileMutation,
  tweetMutation,
  getTweetsQuery,
} from '../api/auth'

export async function getMyProfile({ client }) {
  try {
    const { data } = await client.query({
      query: getMyProfileQuery,
      variables: {},
    });

    return data.getMyProfile;
  } catch (error) {
    console.log('Error calling graphQL API: getMyProfile ', error)
    return null;
  }
}

export async function editMyProfile({ input, client }) {
  try {
    const { data } = await client.mutate({
      mutation: editMyProfileMutation,
      variables: {
        input,
      },
    });

    return data.editMyProfile;
  } catch (error) {
    console.log('Error calling graphQL API: editMyProfile', error)
    return null;
  }
}

export async function tweet({ text, client }) {
  try {
    const { data } = await client.mutate({
      mutation: tweetMutation,
      variables: {
        text,
      },
    });

    return data.tweet;
  } catch (error) {
    console.log('Error calling graphQL API: tweet', error)
    return null;
  }
}

  export async function getTweets({ username, limit, nextToken, client }) {
    try {
      const { data } = await client.query({
        query: getTweetsQuery,
        variables: {
          userId: username,
          limit,
          nextToken,
        },
      });

      return data.getTweets;
    } catch (error) {
      console.log('Error calling graphQL API: getTweets', error)
      return null;
    }
  }