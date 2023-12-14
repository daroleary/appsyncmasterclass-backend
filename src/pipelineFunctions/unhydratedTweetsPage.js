import { util, runtime } from '@aws-appsync/utils'

const tweetsTable = '#tweetsTable#'

export function request(ctx) {
  if (ctx.source.tweets.length === 0) {
    return runtime.earlyReturn([])
  }

  const tweetMapValues = ctx.source.tweets.map((item) => {
    return util.dynamodb.toMapValues({ 'id': item.tweetId })
  })

  return {
    operation: 'BatchGetItem',
    tables: {
      [tweetsTable]: { keys: tweetMapValues }
    }
  }
}

export const response = (ctx) => {
  return ctx.result.data[tweetsTable]
}