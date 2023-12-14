import { util } from '@aws-appsync/utils'

export function request(ctx) {
  const screenName = ctx.arguments.screenName

  return {
    operation: 'Query',
    query: {
      expression: 'screenName = :screenName',
      expressionValues: util.dynamodb.toMapValues({ ':screenName': screenName }),
    },
    index: 'byScreenName',
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
