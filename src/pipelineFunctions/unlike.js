/* eslint-disable @aws-appsync/no-async */
/* eslint-disable @aws-appsync/no-await */

// TODO: need to make the first put a delete
// TODO: need to decrement the likes count

import dynamoDB from '../storage/dynamo/index.js'

const { LIKES_TABLE, TWEETS_TABLE, USERS_TABLE } = process.env

/**
 * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_TransactWriteItems.html
 */
export const transactItemsFrom = ({ username, tweetId }) => {
  return {
    TransactItems: [
      {
        Delete: {
          TableName: LIKES_TABLE,
          Key: {
            userId: username,
            tweetId: tweetId,
          },
          ConditionExpression: 'attribute_exists(tweetId)'
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
            ':one': -1
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
            ':one': -1
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
