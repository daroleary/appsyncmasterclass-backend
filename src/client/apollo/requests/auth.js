import {
  getMyProfileQuery,
  editMyProfileMutation,
  tweetMutation,
  getTweetsQuery,
  likeMutation,
  unlikeMutation,
  getMyTimelineQuery, getLikesQuery, retweetMutation, followMutation, getProfileQuery, getFollowersQuery
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

export async function getProfile({ screenName, client }) {
  try {
    const { data } = await client.query({
      query: getProfileQuery,
      variables: {
        screenName,
      },
    });

    return data.getProfile;
  } catch (error) {
    console.log('Error calling graphQL API: getProfile ', error)
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

export async function like({ tweetId, client }) {
  try {
    const { data } = await client.mutate({
      mutation: likeMutation,
      variables: {
        tweetId,
      },
    });

    return data.like;
  } catch (error) {
    console.log('Error calling graphQL API: like', error)
    return null;
  }
}

export async function unlike({ tweetId, client }) {
  try {
    const { data } = await client.mutate({
      mutation: unlikeMutation,
      variables: {
        tweetId,
      },
    });

    return data.unlike;
  } catch (error) {
    console.log('Error calling graphQL API: unlike', error)
    return null;
  }
}

export async function getMyTimeline({ limit, nextToken, client }) {
  try {
    const { data } = await client.query({
      query: getMyTimelineQuery,
      variables: {
        limit,
        nextToken,
      },
    });

    return data.getMyTimeline
  } catch (error) {
    console.log('Error calling graphQL API: unlike', error)
    return null;
  }
}

export async function getLikes({ userId, limit, nextToken, client }) {
  try {
    const { data } = await client.query({
      query: getLikesQuery,
      variables: {
        userId,
        limit,
        nextToken,
      },
    });

    return data.getLikes
  } catch (error) {
    console.log('Error calling graphQL API: getLikes', error)
    return null;
  }
}

export async function retweet({ tweetId, client }) {
  try {
    const { data } = await client.mutate({
      mutation: retweetMutation,
      variables: {
        tweetId,
      },
    });

    return data.retweet;
  } catch (error) {
    console.log('Error calling graphQL API: retweet', error)
    return null;
  }
}

export async function follow({ userId, client }) {
  try {
    const { data } = await client.mutate({
      mutation: followMutation,
      variables: {
        userId,
      },
    });

    return data.follow;
  } catch (error) {
    console.log('Error calling graphQL API: follow ', error)
    return null;
  }
}

export async function getFollowers({ userId, limit, nextToken, client }) {
  try {
    const { data } = await client.query({
      query: getFollowersQuery,
      variables: {
        userId,
        limit,
        nextToken,
      },
    });

    console.log('data: ', data);

    return data.getFollowers
  } catch (error) {
    console.log('Error calling graphQL API: getFollowers', error)
    return null;
  }
}