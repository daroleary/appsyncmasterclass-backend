import { util } from '@aws-appsync/utils'

const tweetsTable = '#tweetsTable#'

export function request(ctx) {
  const tweetMapValues = ctx.source.timeline.map((item) => {
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