export function request(ctx) {
  const userId = ctx.source.id
  const sk = `FOLLOWS_${ctx.identity.username}`

  return {
    operation: 'GetItem',
    key: util.dynamodb.toMapValues({userId, sk}),
  };
}

export const response = (ctx) => {
  return !!ctx.result
}
