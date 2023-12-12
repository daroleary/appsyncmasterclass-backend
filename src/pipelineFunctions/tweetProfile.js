import * as ddb from '@aws-appsync/utils/dynamodb'

export function request(ctx) {
  return ddb.get({ key: { id: ctx.source.creator } })
}

export const response = (ctx) => {
  if (ctx.result) {
    let typeName = 'OtherProfile'
    if (ctx.result.id === ctx.identity.username) {
      typeName = 'MyProfile'
    }
    ctx.result.__typename = typeName
  }

  return ctx.result
}