import 'dotenv/config'
import { handler as confirmUserSignupHandler } from '../../functions/confirmUserSignup'
import { confirmUserSignUp, signUp } from '../../auth/cognito'
import {
  getMyProfile,
  getProfile,
  editMyProfile,
  tweet,
  getTweets,
  like,
  unlike,
  getMyTimeline,
  getLikes,
  retweet,
  follow,
  getFollowers,
} from '../../client/apollo/services/auth.js'

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

export const a_user_calls_getProfile = async ({ screenName, token }) => {
  return await getProfile({ screenName, token })
}

export const a_user_calls_editMyProfile = async ({input, token}) => {
  return await editMyProfile({ input, token })
}

export const a_user_calls_tweet = async ({ text, token}) => {
  return await tweet({ text, token })
}

export const a_user_calls_getTweets = async ({ username, limit, nextToken, token }) => {
  return await getTweets({ username, limit, nextToken, token })
}

export const a_user_calls_like = async ({ tweetId, token }) => {
  return await like({ tweetId, token })
}


export const a_user_calls_unlike = async ({ tweetId, token }) => {
  return await unlike({ tweetId, token })
}

export const a_user_calls_getMyTimeline = async ({ limit, nextToken, token  }) => {
  return await getMyTimeline({ limit, nextToken, token  })
}

export const a_user_calls_getLikes = async ({ userId, limit, nextToken, token  }) => {
  return await getLikes({ userId, limit, nextToken, token  })
}

export const a_user_calls_retweet = async ({ tweetId, token }) => {
  return await retweet({ tweetId, token })
}

export const a_user_calls_follow = async ({ userId, token }) => {
  return await follow({ userId, token })
}

export const a_user_calls_getFollowers = async ({ userId, limit, nextToken, token }) => {
  return await getFollowers({ userId, limit, nextToken, token })
}