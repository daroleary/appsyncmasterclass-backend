import { beforeAll, expect, describe, test } from 'vitest'

import { an_authenticated_user } from '../../steps/given.js'
import { a_user_calls_getMyProfile } from '../../steps/when.js'

import Chance from 'chance'

const chance = new Chance()

describe('Given an authenticated user', () => {
  let user, profile
  beforeAll(async () => {
    user = await an_authenticated_user()
  })

  test('The user can fetch his profile with getMyProfile', async () => {
    profile = await a_user_calls_getMyProfile({ token: user.accessToken })

    expect(profile).toMatchObject({
      id: user.username,
      name: user.name,
      imageUrl: null,
      backgroundImageUrl: null,
      bio: null,
      location: null,
      website: null,
      birthdate: null,
      createdAt: expect.stringMatching(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?Z?/g),
      followersCount: 0,
      followingCount: 0,
      tweetsCount: 0,
      likesCount: 0,
    })

    const [firstName, lastName] = profile.name.split(' ')
    expect(profile.screenName).toContain(firstName)
    expect(profile.screenName).toContain(lastName)
  })
})
