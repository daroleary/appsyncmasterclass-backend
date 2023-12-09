import 'dotenv/config'
import { handler } from '../../functions/confirm-user-signup.js'

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
