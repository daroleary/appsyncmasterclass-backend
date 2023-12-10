import 'dotenv/config'
import { handler } from '../../functions/confirm-user-signup.js'
import { confirmUserSignUp, signUp } from '../../auth/cognito'
import { getMyProfile } from '../../client/apollo/services/auth.js'

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

export const a_user_signs_up = async ({name, email, password}) => {
  const { username } = await signUp({ email, name, password });

  await confirmUserSignUp({username})

  return {
    username,
    name,
    email
  }
}

export const a_user_calls_getMyProfile = async (token) => {
  return await getMyProfile(token)
}