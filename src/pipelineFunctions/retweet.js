/* eslint-disable @aws-appsync/no-async */
/* eslint-disable @aws-appsync/no-await */
import dynamoDB from '../storage/dynamo/index'
import ulid from 'ulid'
import { TweetTypes } from '../lib/constants'
import { getTweetById } from '../lib/tweets'

const { USERS_TABLE, TIMELINES_TABLE, TWEETS_TABLE, RETWEETS_TABLE } = process.env

const retweetFrom = async ({ id, username, tweetId, timestamp }) => {
  return {
    __typename: TweetTypes.RETWEET,
    id,
    creator: username,
    createdAt: timestamp,
    retweetOf: tweetId,
  }
}

export const handler = async (event) => {
  const { tweetId } = event.arguments
  const { username } = event.identity
  const id = ulid.ulid()
  const timestamp = new Date().toJSON()

  const originalTweet  = await getTweetById({ tweetId })
  const retweet = await retweetFrom({ id, username, tweetId: originalTweet.id, timestamp })

  const transactItems = [
    {
      Put: {
        TableName: TWEETS_TABLE,
        Item: retweet
      }
    },
    {
      Put: {
        TableName: RETWEETS_TABLE,
        Item: {
          userId: username,
          tweetId,
          createdAt: timestamp
        }
      },
      ConditionExpression: 'attribute_not_exists(tweetId)'
    },
    {
      Update: {
        TableName: TWEETS_TABLE,
        Key: {
          id: tweetId
        },
        UpdateExpression: 'ADD retweets :one',
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

  if (originalTweet.creator !== username) {
    transactItems.push({
      Put: {
        TableName: TIMELINES_TABLE,
        Item: {
          userId: username,
          tweetId: id,
          retweetOf: tweetId,
          timestamp
        }
      }
    })
  }

  await dynamoDB.transactWrite({
    TransactItems: transactItems
  })

  return retweet
}
