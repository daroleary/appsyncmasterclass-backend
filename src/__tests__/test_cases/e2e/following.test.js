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
  a_user_calls_getMyProfile,
  a_user_calls_follow,
  a_user_calls_getProfile,
  a_user_calls_getFollowers,
} from '../../steps/when.js'

import Chance from 'chance'

const chance = new Chance()

describe('Given authenticated users, A and B', () => {
  let userA, userB, userAsProfile, userBsProfile
  let userBsTweet1, userBsTweet2
  beforeAll(async () => {
    userA = await an_authenticated_user()
    userB = await an_authenticated_user()
    userAsProfile = await a_user_calls_getMyProfile({ token: userA.accessToken })
    userBsProfile = await a_user_calls_getMyProfile({ token: userB.accessToken })
    userBsTweet1 = await a_user_calls_tweet({ text: chance.paragraph(), token: userB.accessToken })
    userBsTweet2 = await a_user_calls_tweet({ text: chance.paragraph(), token: userB.accessToken })
  })

  describe("When user A follows user B", async () => {
    beforeAll(async () => {
      await a_user_calls_follow({ userId: userB.username, token: userA.accessToken })
    })

    test("User A should see following as true when viewing user B's profile", async () => {
      const { following, followedBy } = await a_user_calls_getProfile({ screenName: userBsProfile.screenName, token: userA.accessToken })

      expect(following).toBe(true)
      expect(followedBy).toBe(false)
    })

    test("User B should see followedBy as true when viewing user A's profile", async () => {
      const { following, followedBy } = await a_user_calls_getProfile({ screenName: userAsProfile.screenName, token: userB.accessToken })

      expect(following).toBe(false)
      expect(followedBy).toBe(true)
    })

    // test("User A should see himself in user B's list of followers", async () => {
    //   const { profiles } = await a_user_calls_getFollowers({ userId: userB.username, limit: 25, token: userA.accessToken })
    //
    //   expect(profiles).toHaveLength(1)
    //   expect(profiles[0]).toMatchObject({
    //     id: userA.username
    //   })
    //   expect(profiles[0]).not.toHaveProperty('following')
    //   expect(profiles[0]).not.toHaveProperty('followedBy')
    // })
  })

  describe("When user B follows user A back", async () => {
    beforeAll(async () => {
      await a_user_calls_follow({ userId: userA.username, token: userB.accessToken })
    })

    test("User A should see both following and followedBy as true when viewing user B's profile", async () => {
      const { following, followedBy } = await a_user_calls_getProfile({ screenName: userBsProfile.screenName, token: userA.accessToken })

      expect(following).toBe(true)
      expect(followedBy).toBe(true)
    })

    test("User B should see both following and followedBy as true when viewing user A's profile", async () => {
      const { following, followedBy } = await a_user_calls_getProfile({ screenName: userAsProfile.screenName, token: userB.accessToken })

      expect(following).toBe(true)
      expect(followedBy).toBe(true)
    })
  })
})