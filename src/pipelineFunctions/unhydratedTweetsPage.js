import { util } from '@aws-appsync/utils'

const tweetsTable = '#tweetsTable#'

export function request(ctx) {
  if (ctx.source.tweets.length === 0) {
    return []
  }

  const tweetMapValues = ctx.source.tweets.map((item) => {
    return util.dynamodb.toMapValues({ 'id': item.tweetId })
  })

  console.log(`tweetMapValues: ${JSON.stringify(tweetMapValues, null, 2)}`)

  return {
    operation: 'BatchGetItem',
    tables: {
      [tweetsTable]: { keys: tweetMapValues }
    }
  }
}

export const response = (ctx) => {
  console.log(`ctx.result.tweetsTable: ${JSON.stringify(ctx.result.data[tweetsTable], null, 2)}`)
  return ctx.result.data[tweetsTable]
}