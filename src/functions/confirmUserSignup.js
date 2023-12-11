import Chance from 'chance'

import dynamoDB from '../storage/dynamo/index.js'
import client from '../storage/cognito/index.js'
import { AdminUpdateUserAttributesCommand } from '@aws-sdk/client-cognito-identity-provider'

const chance = new Chance()
const { USERS_TABLE } = process.env

const verifyUserEmail = async (event) => {
  const params = {
    UserPoolId: event.userPoolId,
    Username: event.userName,
    UserAttributes: [
      {
        Name: 'email',
        Value: event.request.userAttributes.email,
      },
      {
        Name: 'email_verified',
        Value: 'true',
      },
    ],
  };

  const command = new AdminUpdateUserAttributesCommand(params);

  try {
    await client.send(command);
    event.request.userAttributes.email_verified = 'true';
  } catch (error) {
    console.log(`Error verifying email automatically: ${error.message}`);
    return null;
  }
}

export const handler = async (event) => {
  if (event.triggerSource === 'PostConfirmation_ConfirmSignUp') {

    if (event.request.userAttributes && event.request.userAttributes.email_verified !== 'true') {
      await verifyUserEmail(event)
    }

    const name = event.request.userAttributes['name']
    const suffix = chance.string({ length: 8, casing: 'upper', alpha: true, numeric: true })
    const screenName = `${name.replace(/[^a-zA-Z0-9]/g, '')}${suffix}`
    const user = {
      id: event.userName,
      name,
      screenName,
      createdAt: new Date().toJSON(),
      followersCount: 0,
      followingCount: 0,
      tweetsCount: 0,
      likesCount: 0
    }

    await dynamoDB.put({
      TableName: USERS_TABLE,
      Item: user,
      ConditionExpression: 'attribute_not_exists(id)'
    })

    return event
  } else {
    return event
  }
}
