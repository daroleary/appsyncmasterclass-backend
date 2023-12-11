import { expect, describe, test } from 'vitest'

import { a_random_user } from '../../steps/given.js'
import { a_user_signs_up } from '../../steps/when.js'
import { user_exists_in_UsersTable } from '../../steps/then.js'

import Chance from 'chance'

const chance = new Chance()

describe('when a user signs up', () => {
  test('should create a new user in DynamoDB', async () => {
    const { name, email, password } = a_random_user()

    const user = await a_user_signs_up({name, email, password})
    const dbUser = await user_exists_in_UsersTable(user.username)

    expect(dbUser).toMatchObject({
      id: user.username,
      name,
      createdAt: expect.stringMatching(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?Z?/g),
      followersCount: 0,
      followingCount: 0,
      tweetsCount: 0,
      likesCount: 0
    })

    const [firstName, lastName] = name.split(' ')
    expect(dbUser.screenName).toContain(firstName)
    expect(dbUser.screenName).toContain(lastName)
  })
})
