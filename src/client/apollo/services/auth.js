import { client, setToken } from '../../../storage/apollo';
import {
  getMyProfile as getMyProfileRq,
  editMyProfile as editMyProfileRq,
  tweet as tweetRq,
  getTweets as getTweetsRq,
} from '../requests/auth';

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