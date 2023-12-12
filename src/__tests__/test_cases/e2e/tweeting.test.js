import { beforeAll, expect, describe, test, it } from 'vitest'

import { an_authenticated_user } from '../../steps/given.js'
import { a_user_calls_tweet, a_user_calls_getTweets } from '../../steps/when.js'

import Chance from 'chance'

const chance = new Chance()

describe('Given an authenticated user', () => {
  let user, profile
  beforeAll(async () => {
    user = await an_authenticated_user()
  })

  describe('when they send a tweet', async () => {
    let tweet
    let text = chance.string({ length: 16 })
    beforeAll(async () => {
      tweet = await a_user_calls_tweet({ text, token: user.accessToken })
    })

    test('Should return the new tweet', () => {
      expect(tweet).toMatchObject({
        text,
        replies: 0,
        likes: 0,
        retweets: 0,
      })
    })

    describe('When getTweets is called', () => {
      let tweets, nextToken
      beforeAll(async () => {
        const result = await a_user_calls_getTweets({
          username: user.username,
          limit: 25,
          token: user.accessToken
        })
        tweets = result.tweets
        nextToken = result.nextToken
      })

      test('should see the new tweet in the tweets array', () => {
        expect(nextToken).toBeNull()
        expect(tweets.length).toEqual(1)
        expect(tweets[0]).toMatchObject(tweet)
      })
    })
  })
})
