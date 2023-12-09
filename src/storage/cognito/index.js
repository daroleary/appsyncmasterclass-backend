import {
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider';

let options = {
  region: process.env.AWS_REGION,
};

const client = new CognitoIdentityProviderClient(options);

export default client;