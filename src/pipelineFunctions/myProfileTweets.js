import { util } from '@aws-appsync/utils'

/**
 * @see https://docs.aws.amazon.com/appsync/latest/devguide/js-resolver-reference-dynamodb.html#js-aws-appsync-resolver-reference-dynamodb-query
 */
export function request(ctx) {
  const userId = ctx.source.id
  const nextToken = ctx.arguments.nextToken || null

  return {
    operation: 'Query',
    query: {
      expression: 'creator = :userId',
      expressionValues: util.dynamodb.toMapValues({ ':userId': userId }),
    },
    index: 'byCreator',
    nextToken: nextToken,
    limit: 10,
    scanIndexForward: false,
    consistentRead: false,
    select: 'ALL_ATTRIBUTES'
  }
}

export const response = (ctx) => {
  return {
    tweets: ctx.result.items,
    nextToken: ctx.result.nextToken || null
  }
}
