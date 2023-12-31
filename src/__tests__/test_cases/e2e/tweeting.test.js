import { beforeAll, expect, describe, test, it } from 'vitest'

import { an_authenticated_user } from '../../steps/given.js'
import {
  a_user_calls_tweet,
  a_user_calls_getTweets,
  a_user_calls_like,
  a_user_calls_getMyTimeline,
  a_user_calls_unlike,
  a_user_calls_getLikes,
  a_user_calls_retweet,
  a_user_calls_getTweet,
  a_user_calls_notifyRetweeted,
} from '../../steps/when.js'

import Chance from 'chance'
import { notifyRetweeted } from '../../../client/apollo/services/auth.js'

const chance = new Chance()

describe('Given an authenticated user', () => {
  let user
  beforeAll(async () => {
    user = await an_authenticated_user()
  })

  describe('when they send a tweet', async () => {
    let tweet
    let text = chance.string({ length: 16 })
    beforeAll(async () => {
      tweet = await a_user_calls_tweet({ text, token: user.accessToken })
    })

    test('Should return the new tweet from call to getTweet', async () => {
      await a_user_calls_getTweet({ tweetId: tweet.id, token: user.accessToken })

      expect(tweet).toMatchObject({
        text,
        replies: 0,
        likes: 0,
        liked: false,
        retweets: 0,
      })
    })

    test('Should return the new tweet', () => {
      expect(tweet).toMatchObject({
        text,
        replies: 0,
        likes: 0,
        liked: false,
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

    describe('When getMyTimeline is called', () => {
      let tweets, nextToken
      beforeAll(async () => {
        const result = await a_user_calls_getMyTimeline({limit: 25, token: user.accessToken })
        tweets = result.tweets
        nextToken = result.nextToken
      })

      test('should see the new tweet in the tweets array', async () => {
        expect(nextToken).toBeNull()
        expect(tweets.length).toEqual(1)
        expect(tweets[0]).toMatchObject(tweet)
      })
    })

    describe('When tweet is liked', () => {
      let tweets, nextToken
      beforeAll(async () => {
        await a_user_calls_like({tweetId: tweet.id, token: user.accessToken })
      })

      test('should see the Tweet.liked as true', async () => {
        const { tweets } = await a_user_calls_getMyTimeline({ limit: 25, token: user.accessToken })
        expect(tweets).toHaveLength(1)
        expect(tweets[0].id).toEqual(tweet.id)
        expect(tweets[0].liked).toEqual(true)
      })

      test('should see tweet when getLikes is called', async () => {
        const { tweets, nextToken } = await a_user_calls_getLikes({ userId: user.username, limit: 25, token: user.accessToken })
        expect(nextToken).toBeNull()
        expect(tweets.length).toEqual(1)
        expect(tweets[0]).toMatchObject({
          ...tweet,
          liked: true,
          likes: 1,
          profile: {
            ...tweet.profile,
            likesCount: 1
          }
        })
      })

      describe('When tweet is unliked', () => {
        beforeAll(async () => {
          await a_user_calls_unlike({tweetId: tweet.id, token: user.accessToken })
        })

        test('should see the Tweet.liked as false', async () => {
          const { tweets } = await a_user_calls_getMyTimeline({ limit: 25, token: user.accessToken })
          expect(tweets).toHaveLength(1)
          expect(tweets[0].id).toEqual(tweet.id)
          expect(tweets[0].liked).toEqual(false)
        })

        test('should not see tweet when getLikes is called', async () => {
          const likes = await a_user_calls_getLikes({ userId: user.username, limit: 25, token: user.accessToken })
          expect(likes.nextToken).toBeNull()
          expect(likes.tweets.length).toEqual(0)
        })
      })

      describe('When tweet is retweeted', () => {
        let retweet
        beforeAll(async () => {
          retweet = await a_user_calls_retweet({ tweetId: tweet.id, token: user.accessToken })
        })

        test('should see the retweet when getTweets is called', async () => {
          const { tweets } = await a_user_calls_getTweets({
            username: user.username,
            limit: 25,
            token: user.accessToken
          })

          expect(tweets).toHaveLength(2)
          expect(tweets[0].profile).toMatchObject({
            id: user.username,
            tweetsCount: 2
          })

          expect(tweets[0].retweetOf).toMatchObject({
            retweets: 1,
            retweeted: true,
          })

          expect(tweets[0].retweetOf.profile).toMatchObject({
            id: user.username,
            tweetsCount: 2
          })

          expect(tweets[1]).toMatchObject({
            retweets: 1,
            retweeted: true,
          })

          expect(tweets[1].profile).toMatchObject({
            id: user.username,
            tweetsCount: 2
          })
        })
      })
    })
  })
})
