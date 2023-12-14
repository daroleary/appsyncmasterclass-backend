import { beforeAll, expect, describe, test } from 'vitest'

import { an_authenticated_user } from '../../steps/given.js'
import { a_user_calls_getMyProfile, a_user_calls_editMyProfile } from '../../steps/when.js'

import Chance from 'chance'

const chance = new Chance()

describe('Given an authenticated user', () => {
  let user, profile
  beforeAll(async () => {
    user = await an_authenticated_user()
  })

  test('The user can fetch their profile with getMyProfile', async () => {
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
      tweets: {
        nextToken: null,
        tweets: []
      },
    })

    const [firstName, lastName] = profile.name.split(' ')
    expect(profile.screenName).toContain(firstName)
    expect(profile.screenName).toContain(lastName)
  })

  test('The user can edit his profile with editMyProfile', async () => {
    const newName = chance.first()
    const input = {
      name: newName
    }
    const newProfile = await a_user_calls_editMyProfile({ input, token: user.accessToken })

    expect(newProfile).toMatchObject({
      ...profile,
      name: newName
    })
  })
})
