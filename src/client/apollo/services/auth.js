import { client, iamClient, setToken } from '../../../storage/apollo';
import {
  getMyProfile as getMyProfileRq,
  getProfile as getProfileRq,
  editMyProfile as editMyProfileRq,
  tweet as tweetRq,
  getTweet as getTweetRq,
  getTweets as getTweetsRq,
  like as likeRq,
  unlike as unlikeRq,
  getMyTimeline as getMyTimelineRq,
  getLikes as getLikesRq,
  retweet as retweetRq,
  follow as followRq,
  getFollowers as getFollowersRq,
  notifyRetweeted as notifyRetweetedRq,
} from '../requests/auth';


export async function getMyProfile({ token }) {
  setToken(token)
  return getMyProfileRq({
    client: client(),
  });
}

export async function getProfile({ screenName, token }) {
  setToken(token)
  return getProfileRq({
    client: client(),
    screenName,
  });
}

export async function editMyProfile({ input, token }) {
  setToken(token)
  return editMyProfileRq({
    client: client(),
    input,
  });
}

export async function tweet({ text, token }) {
  setToken(token)
  return tweetRq({
    client: client(),
    text,
  });
}

export async function getTweet({ tweetId, token }) {
  setToken(token)
  return getTweetRq({
    client: client(),
    tweetId,
  });
}

export async function getTweets({ username, limit, nextToken, token }) {
  setToken(token)
  return getTweetsRq({
    client: client(),
    username,
    limit,
    nextToken,
  });
}

export async function like({ tweetId, token }) {
  setToken(token)
  return likeRq({
    client: client(),
    tweetId,
  });
}

export async function unlike({ tweetId, token }) {
  setToken(token)
  return unlikeRq({
    client: client(),
    tweetId,
  });
}

export async function getMyTimeline({ limit, nextToken, token }) {
  setToken(token)
  return getMyTimelineRq({
    client: client(),
    limit,
    nextToken,
  });
}

export async function getLikes({ userId, limit, nextToken, token }) {
  setToken(token)
  return getLikesRq({
    client: client(),
    userId,
    limit,
    nextToken,
  });
}

export async function retweet({ tweetId, token }) {
  setToken(token)
  return retweetRq({
    client: client(),
    tweetId,
  });
}

export async function follow({ userId, token }) {
  setToken(token)
  return followRq({
    client: client(),
    userId,
  });
}

export async function getFollowers({ userId, limit, nextToken, token }) {
  setToken(token)
  return getFollowersRq({
    client: client(),
    userId,
    limit,
    nextToken,
  });
}

export async function notifyRetweeted({ userId, tweetId, retweetId, retweetedBy, token }) {
  setToken(token)
  return notifyRetweetedRq({
    client: client(),
    userId,
    tweetId,
    retweetId,
    retweetedBy,
  });
}

export async function notifyRetweetedByIam({ userId, tweetId, retweetId, retweetedBy, token }) {
  return notifyRetweetedRq({
    client: await iamClient(),
    userId,
    tweetId,
    retweetId,
    retweetedBy,
  });
}