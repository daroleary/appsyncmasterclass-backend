import { client, setToken } from '../../../storage/apollo';
import { getMyProfile as getMyProfileRq } from '../requests/auth';

export async function getMyProfile({ token }) {
  setToken(token)
  return getMyProfileRq({
    client: client(),
  });
}