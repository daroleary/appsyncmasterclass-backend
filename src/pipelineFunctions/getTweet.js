import { util } from '@aws-appsync/utils'

export function request(ctx) {
  const tweetId = ctx.arguments.tweetId

  return {
    operation: 'Query',
    query: {
      expression: 'id = :id',
      expressionValues: util.dynamodb.toMapValues({ ':id': tweetId }),
    },
    limit: 1,
    scanIndexForward: false,
    consistentRead: false,
    select: 'ALL_ATTRIBUTES'
  }
}

export const response = (ctx) => {
  if (!ctx.result.items.length) {
    return null
  }

  return ctx.result.items[0]
}
