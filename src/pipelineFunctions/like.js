/* eslint-disable @aws-appsync/no-async */
/* eslint-disable @aws-appsync/no-await */
import dynamoDB from '../storage/dynamo/index.js'

const { LIKES_TABLE, TWEETS_TABLE, USERS_TABLE } = process.env

export const transactItemsFrom = ({ username, tweetId }) => {
  return {
    TransactItems: [
      {
        Put: {
          TableName: LIKES_TABLE,
          Item: {
            userId: username,
            tweetId: tweetId,
          },
          ConditionExpression: 'attribute_not_exists(tweetId)'
        }
      },
      {
        Update: {
          TableName: TWEETS_TABLE,
          Key: {
            id: tweetId,
          },
          UpdateExpression: 'ADD likes :one',
          ExpressionAttributeValues: {
            ':one': 1
          },
          ConditionExpression: 'attribute_exists(id)',
        }
      },
      {
        Update: {
          TableName: USERS_TABLE,
          Key: {
            id: username
          },
          UpdateExpression: 'ADD likesCount :one',
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
  const { tweetId } = event.arguments
  const transactItems = transactItemsFrom({ username, tweetId })
  console.log(`process.env: ${JSON.stringify(process.env, null, 2)}`)
  console.log(`transactItems: ${JSON.stringify(transactItems, null, 2)}`)
  await dynamoDB.transactWrite(transactItems);

  return true
}
