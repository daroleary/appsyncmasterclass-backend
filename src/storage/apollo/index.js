import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import { defaultProvider } from "@aws-sdk/credential-provider-node";

const url = process.env.APPSYNC_ENDPOINT_URL;
const region = process.env.AWS_REGION;
let jwtToken = null;

const createLinkFrom = (auth) => {

  const httpLink = new HttpLink({ uri: url });

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

const iamClient = () => {
  const credentials = defaultProvider();
  const auth = {
    credentials: async () => credentials, // Required when you use IAM-based auth.
  };

  const link = createLinkFrom(auth);

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
};

export { client, iamClient, setToken, token };