import { util } from '@aws-appsync/utils'

/**
 * @see https://docs.aws.amazon.com/appsync/latest/devguide/js-resolver-reference-dynamodb.html#js-aws-appsync-resolver-reference-dynamodb-query
 */
function queryByUserId(userId, nextToken, limit) {
  if (limit > 25) {
    util.appendError("max limit is 25")
  }

  return {
    operation: 'Query',
    query: {
      expression: 'userId = :userId',
      expressionValues: util.dynamodb.toMapValues({ ':userId': userId }),
    },
    nextToken: nextToken,
    limit: limit,
    scanIndexForward: false,
    consistentRead: false,
    select: 'ALL_ATTRIBUTES'
  };
}

export function request(ctx) {
  const userId = ctx.identity.username
  const limit = ctx.arguments.limit
  const nextToken = ctx.arguments.nextToken || null
  return queryByUserId(userId, nextToken, limit)
}

export const response = (ctx) => {
  return {
    timeline: ctx.result.items,
    nextToken: ctx.result.nextToken
  }
}
