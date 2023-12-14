/* eslint-disable @aws-appsync/no-async */
/* eslint-disable @aws-appsync/no-await */
import { util } from '@aws-appsync/utils'
import dynamoDB from '../storage/dynamo/index.js'

const { RELATIONSHIPS_TABLE, USERS_TABLE } = process.env

export const transactItemsFrom = ({ username, userId }) => {
  // TODO: need to understand why util.time is undefined
  // console.log(`createdAt: ${JSON.stringify(util.time.nowISO8601(), null, 2)}`)

  const sk = `FOLLOWS_${userId}`

  return {
    TransactItems: [
      {
        Put: {
          TableName: RELATIONSHIPS_TABLE,
          Item: {
            userId: username,
            sk: sk,
            otherUserId: userId,
            // createdAt: util.time.nowISO8601(),
          },
          ConditionExpression: 'attribute_not_exists(sk)'
        }
      },
      {
        Update: {
          TableName: USERS_TABLE,
          Key: {
            id: username
          },
          UpdateExpression: 'ADD followingCount :one',
          ExpressionAttributeValues: {
            ':one': 1
          },
          ConditionExpression: 'attribute_exists(id)'
        }
      },
      {
        Update: {
          TableName: USERS_TABLE,
          Key: {
            id: userId
          },
          UpdateExpression: 'ADD followersCount :one',
          ExpressionAttributeValues: {
            ':one': 1
          },
          ConditionExpression: 'attribute_exists(id)'
        }
      }
    ]
  }
}

export const handler = async (event) => {
  const { username } = event.identity
  const { userId } = event.arguments
  const transactItems = transactItemsFrom({ username, userId })
  await dynamoDB.transactWrite(transactItems);

  return true
}
