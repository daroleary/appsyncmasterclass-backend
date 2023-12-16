import fetch from 'cross-fetch'
import { createAuthLink } from 'aws-appsync-auth-link'
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link'
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client/core'
import { fromEnv } from '@aws-sdk/credential-providers'
import { AUTH_TYPE } from 'aws-appsync-auth-link/lib/index'

const url = 'https://utnk5p3dmzhybiqk5iiovual7u.appsync-api.us-east-1.amazonaws.com/graphql' // TODO: why does this not work? process.env.APPSYNC_ENDPOINT_URL
const region = process.env.AWS_REGION
let jwtToken = null;

const createLinkFrom = (auth) => {

  const httpLink = new HttpLink({ uri: url, fetch });

  return ApolloLink.from([
    createAuthLink({ url, region, auth }),
    createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
  ]);
};

const setToken = (newToken) => {
  jwtToken = newToken;
};

const token = () => {
  return jwtToken
};

const client = () => {
  const auth = {
    type: 'AMAZON_COGNITO_USER_POOLS',
    jwtToken: () => token(),
  };

  const link = createLinkFrom(auth);

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
};

const iamClient = async () => {
  const credentials = await fromEnv()().then(c => c)
  const auth = {
    type: AUTH_TYPE.AWS_IAM,
    credentials: credentials
  };
  console.log(`iamClient - auth: ${JSON.stringify(auth, null, 2)}`)

  const httpLink = new HttpLink({ uri: url, fetch });

  const link = ApolloLink.from([
    createAuthLink({ url, region, auth }),
    httpLink,
  ]);

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  })

  // const link = createLinkFrom(auth)
  //
  // return new ApolloClient({
  //   link,
  //   cache: new InMemoryCache(),
  // })
  return client
}

export { client, iamClient, setToken, token }