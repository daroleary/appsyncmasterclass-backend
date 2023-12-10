import {
  AdminConfirmSignUpCommand, AdminGetUserCommand,
  InitiateAuthCommand,
  SignUpCommand
} from '@aws-sdk/client-cognito-identity-provider'
import client from '../../storage/cognito/index.js'

export const signUp = async ({email, name, password}) => {
  const params = {
    ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: 'name',
        Value: name,
      },
    ],
  };

  try {
    const command = new SignUpCommand(params)
    const data = await client.send(command)

    return {
      username: data.UserSub,
    };
  } catch (error) {
    console.log(`Error signing up: ${error.message}`);
    return null;
  }
};

export const confirmUserSignUp = async ({ username }) => {
  const params = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    Username: username,
  };

  try {
    const command = new AdminConfirmSignUpCommand(params);
    return await client.send(command);
  } catch (error) {
    console.log(`Error confirming user: ${error.message}`);
    return null;
  }
};

const authenticate = async ({ params  }) => {
  try {

    const command = new InitiateAuthCommand(params);
    const user = await client.send(command);

    if (!user.AuthenticationResult) {
      console.log('Error during authentication');
      return null;
    }

    const authenticationResult = user.AuthenticationResult;

    return {
      accessToken: authenticationResult.AccessToken,
      idToken: authenticationResult.IdToken,
    };
  } catch (error) {
    console.log(`Error during authentication: ${error.message}`);
    return null;
  }
};

const findUserAttributeValue = (userAttributes, field) => {
  const attribute = userAttributes.find(attr => attr.Name === field);
  return attribute ? attribute.Value : null;
};

const userWithAttributes = ({ userAttributes, enabled, userStatus }) => ({
  name: findUserAttributeValue(userAttributes, 'name'),
  username: findUserAttributeValue(userAttributes, 'sub'),
  email: findUserAttributeValue(userAttributes, 'email'),
  emailVerified: findUserAttributeValue(userAttributes, 'email_verified') === 'true',
  enabled,
  userStatus,
});

const adminGetCognitoUserByEmail = async ({ email }) => {
  const params = {
    Username: email,
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
  };

  try {
    const command = new AdminGetUserCommand(params);
    const user = await client.send(command);
    return userWithAttributes({
      userAttributes: user.UserAttributes,
      enabled: user.Enabled,
      userStatus: user.UserStatus,
    });
  } catch (error) {
    console.log(`Error with adminGetCognitoUserByEmail: ${JSON.stringify(error, Object.getOwnPropertyNames(error))}`);
    return null;
  }
};

export const signIn = async ({ email, password }) => {
  const params = {
    ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
    AuthFlow: 'USER_PASSWORD_AUTH',
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  const auth = await authenticate({params})

  if (!auth) {
    return null;
  }

  const user = await adminGetCognitoUserByEmail({ email });
  return { ...auth, username: user.username, name: user.name, email }
};

export const signInWithNewConfirmedUser = async ({name, email, password}) => {
  const { username} = await signUp({ email, name, password })
  await confirmUserSignUp({ username })
  return await signIn({ email, password })
}