import { client, setToken } from '../../../storage/apollo';
import {
  getMyProfile as getMyProfileRq,
  editMyProfile as editMyProfileRq,
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