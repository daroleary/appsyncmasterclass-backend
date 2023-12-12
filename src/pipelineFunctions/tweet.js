/* eslint-disable @aws-appsync/no-async */
/* eslint-disable @aws-appsync/no-await */
import dynamoDB from '../storage/dynamo/index.js'
import ulid from 'ulid'
import { TweetTypes } from '../lib/constants.js'

const { USERS_TABLE, TIMELINES_TABLE, TWEETS_TABLE } = process.env

const tweetFrom = async ({ id, username, text, timestamp }) => {
  return {
    __typename: TweetTypes.TWEET,
    id,
    text,
    creator: username,
    createdAt: timestamp,
    replies: 0,
    likes: 0,
    retweets: 0,
  }
}

export const handler = async (event) => {
  const { text } = event.arguments
  const { username } = event.identity
  const id = ulid.ulid()
  const timestamp = new Date().toJSON()

  const tweet = await tweetFrom({ id, username, text, timestamp })

  console.log(`Saving tweet: ${JSON.stringify(tweet, null, 2)}`)

  await dynamoDB.transactWrite({
    TransactItems: [
      {
        Put: {
          TableName: TWEETS_TABLE,
          Item: tweet
        }
      },
      {
        Put: {
          TableName: TIMELINES_TABLE,
          Item: {
            userId: username,
            tweetId: id,
            timestamp
          }
        }
      },
      {
        Update: {
          TableName: USERS_TABLE,
          Key: {
            id: username
          },
          UpdateExpression: 'ADD tweetsCount :one',
          ExpressionAttributeValues: {
            ':one': 1
          },
          ConditionExpression: 'attribute_exists(id)'
        }
      }
    ]
  })

  return tweet
}
