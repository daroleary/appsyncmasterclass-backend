import * as ddb from '@aws-appsync/utils/dynamodb'

export function request(ctx) {
  return ddb.get({ key: { id: ctx.identity.username } })
}

export const response = (ctx) => ctx.result