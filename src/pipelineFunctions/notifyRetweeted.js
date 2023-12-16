import { util } from '@aws-appsync/utils';

/**
 * @see https://docs.aws.amazon.com/appsync/latest/devguide/js-resolver-reference-dynamodb.html#js-aws-appsync-resolver-reference-dynamodb-putitem
 * @param ctx
 */
export function request(ctx) {
  const { id, userId, tweetId, retweetedBy, retweetId } = ctx.arguments;

  console.log(`notifyRetweeted - request: ctx: ${JSON.stringify(ctx)}`)

  return {
    operation: 'PutItem',
    key: util.dynamodb.toMapValues({id, userId}),
    attributeValues: util.dynamodb.toMapValues({
      tweetId,
      retweetedBy,
      retweetId,
      type: 'Retweeted',
      __typename: 'Retweeted',
      createdAt: util.time.nowISO8601(),
    }),
  };
}

export function response(ctx) {
  const { error, result } = ctx;
  console.log(`notifyRetweeted - response: ctx: ${JSON.stringify(ctx)}`)
  if (error) {
    util.appendError(error.message, error.type);
  }
  return result
}