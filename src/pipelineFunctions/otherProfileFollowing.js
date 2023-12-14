export function request(ctx) {
  const userId = ctx.identity.username
  const sk = `FOLLOWS_${ctx.source.id}`

  return {
    operation: 'GetItem',
    key: util.dynamodb.toMapValues({userId, sk}),
  };
}

export const response = (ctx) => {
  return !!ctx.result
}
