import { client, setToken } from '../../../storage/apollo';
import {
  getMyProfile as getMyProfileRq,
  editMyProfile as editMyProfileRq,
  tweet as tweetRq,
  getTweets as getTweetsRq,
  like as likeRq,
  unlike as unlikeRq,
  getMyTimeline as getMyTimelineRq,
  getLikes as getLikesRq,
} from '../requests/auth';
import { a_user_calls_getMyTimeline } from '../../../__tests__/steps/when.js'

export async function getMyProfile({ token }) {
  setToken(token)
  return getMyProfileRq({
    client: client(),
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