import * as ddb from '@aws-appsync/utils/dynamodb'

export function request(ctx) {
  return ddb.get({ key: { id: ctx.source.retweetOf } })
}

export const response = (ctx) => {
  return ctx.result;
}