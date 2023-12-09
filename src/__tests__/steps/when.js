import 'dotenv/config'
import { handler } from '../../functions/confirm-user-signup.js'
import client from '../../storage/cognito/index.js'
import { AdminConfirmSignUpCommand, SignUpCommand } from '@aws-sdk/client-cognito-identity-provider'

export const we_invoke_confirmUserSignup = async (username, name, email) => {
  const context = {}
  const event = {
    version: '1',
    region: process.env.AWS_REGION,
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    userName: username,
    triggerSource: 'PostConfirmation_ConfirmSignUp',
    request: {
      userAttributes: {
        sub: username,
        'cognito:email_alias': email,
        'cognito:user_status': 'CONFIRMED',
        email_verified: 'false',
        name: name,
        email: email
      }
    },
    response: {}
  }

  await handler(event, context)
}

const signUp = async ({email, name, password}) => {
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
    const command = new SignUpCommand(params);
    const data = await client.send(command);

    return {
      sub: data.UserSub,
    };
  } catch (error) {
    console.log(`Error signing up: ${error.message}`);
    return null;
  }
};

const confirmUserSignUp = async ({ username }) => {
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

export const a_user_signs_up = async ({name, email, password}) => {
  const {sub: username } = await signUp({ email, name, password });

  await confirmUserSignUp({username})

  return {
    username,
    name,
    email
  }
}