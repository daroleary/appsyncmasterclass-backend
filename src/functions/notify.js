/* eslint-disable @aws-appsync/no-async */
/* eslint-disable @aws-appsync/no-await */
import { unmarshall } from '@aws-sdk/util-dynamodb'
import ulid from 'ulid'
import { TweetTypes } from '../lib/constants'
import { getTweetById } from '../lib/tweets'
import { notifyRetweetedByIam  } from '../client/apollo/services/auth'

async function notifyRetweetFrom(tweet) {
  const retweetOf = await getTweetById({tweetId:  tweet.retweetOf})
  if (!retweetOf) {
    console.log(`notifyRetweetFrom - retweetOf not found: ${JSON.stringify(tweet, null, 2)}`)
    return
  }
  console.log(`notifyRetweetFrom - tweet: ${JSON.stringify(tweet, null, 2)}`)
  console.log(`notifyRetweetFrom - retweetOf: ${JSON.stringify(retweetOf, null, 2)}`)
  const response = await notifyRetweetedByIam({
    id: ulid.ulid(),
    userId: retweetOf.creator,
    tweetId: tweet.retweetOf,
    retweetId: tweet.id,
    retweetedBy: tweet.creator,
  })
  console.log(`notifyRetweetFrom - response: ${JSON.stringify(response, null, 2)}`)
  return response
}

export async function handler(event) {
  for (const record of event.Records) {
    if (record.eventName === 'INSERT') {
      const tweet = unmarshall(record.dynamodb.NewImage);
      switch (tweet.__typename) {
        case TweetTypes.RETWEET:
          await notifyRetweetFrom(tweet)
          break
      }
    }
  }
}