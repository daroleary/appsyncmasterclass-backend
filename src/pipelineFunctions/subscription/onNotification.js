import { util } from '@aws-appsync/utils'

export function request(ctx) {
  console.log(`onNotification - request: ctx: ${JSON.stringify(ctx)}`)
  const username = ctx.identity.username
  const userId = ctx.arguments.userId

  if (username !== userId) {
    util.unauthorized()
  }

  return {}
}

export const response = (ctx) => {
  // console.log(`onNotification - response: ctx: ${JSON.stringify(ctx)}`)
  // const result = ctx.result
  // console.log(`onNotification - response: result: ${JSON.stringify(result)}`)
  // const prevResult = ctx.prev.result
  // console.log(`onNotification - response:prevResult: ${JSON.stringify(prevResult)}`)
  //
  // if (result && result.type === 'Retweeted') {
  //   console.log(`onNotification - response: result.type === 'Retweeted'`)
  //   ctx.result.__typename = 'Retweeted'
  // } else if (result && result.type === 'Liked') {
  //   console.log(`onNotification  - response: result.type === 'Liked'`)
  //   ctx.result.__typename = 'Liked'
  // }
  //
  // if (prevResult && prevResult.type === 'Retweeted') {
  //   console.log(`onNotification - response: prevResult.type === 'Retweeted'`)
  //   ctx.prev.result.__typename = 'Retweeted'
  // } else if (prevResult && prevResult.type === 'Liked') {
  //   console.log(`onNotification - response: prevResult.type === 'Liked'`)
  //   ctx.prev.result.__typename = 'Liked'
  // }
  //
  // if (result) {
  //   return ctx.result
  // }

  return ctx.prev.result
}
