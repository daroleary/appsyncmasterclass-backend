import 'dotenv/config'
import { handler as confirmUserSignupHandler } from '../../functions/confirmUserSignup'
import { confirmUserSignUp, signUp } from '../../auth/cognito'
import { getMyProfile, editMyProfile, tweet } from '../../client/apollo/services/auth.js'

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

  await confirmUserSignupHandler(event, context)
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

export const a_user_calls_getMyProfile = async ({ token }) => {
  return await getMyProfile({ token })
}

export const a_user_calls_editMyProfile = async ({input, token}) => {
  return await editMyProfile({ input, token })
}

export const a_user_calls_tweet = async ({ text, token}) => {
  return await tweet({ text, token })
}