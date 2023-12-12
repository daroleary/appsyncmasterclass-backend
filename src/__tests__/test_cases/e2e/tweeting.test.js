import { beforeAll, expect, describe, test } from 'vitest'

import { an_authenticated_user } from '../../steps/given.js'
import {a_user_calls_tweet } from '../../steps/when.js'

import Chance from 'chance'

const chance = new Chance()

describe('Given an authenticated user', () => {
  let user, profile
  beforeAll(async () => {
    user = await an_authenticated_user()
  })

  test('when they send a tweet', async () => {
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
        liked: false,
      })
    })
  })
})
