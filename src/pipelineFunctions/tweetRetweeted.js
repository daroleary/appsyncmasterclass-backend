import * as ddb from '@aws-appsync/utils/dynamodb'

export function request(ctx) {
  return ddb.get({ key: { userId: ctx.identity.username, tweetId: ctx.source.id } })
}

export const response = (ctx) => {
  return !!ctx.result;
}