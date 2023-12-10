import * as ddb from '@aws-appsync/utils/dynamodb'

export function request(ctx) {
  const myProfile = ddb.get({ key: { id: ctx.identity.username } })
  console.log(`getMyProfile: [myProfile]: ${JSON.stringify(myProfile, null, 2)}`)
  return myProfile
}

export const response = (ctx) => ctx.result