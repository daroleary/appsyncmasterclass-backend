import { expect, describe, test } from 'vitest'

import { a_random_user } from '../../steps/given.js'
import { we_invoke_confirmUserSignup } from '../../steps/when.js'
import { user_exists_in_UsersTable } from '../../steps/then.js'

import Chance from 'chance'

const chance = new Chance()

describe('when confirmUserSignup is called', () => {
  test('should create a new user in DynamoDB', async () => {
    const { name, email } = a_random_user()
    const username = chance.guid()

    await we_invoke_confirmUserSignup(username, name, email)

    const dbUser = await user_exists_in_UsersTable(username)

    expect(dbUser).toMatchObject({
      id: username,
      name,
      createdAt: expect.stringMatching(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?Z?/g),
      followersCount: 0,
      followingCount: 0,
      tweetsCount: 0,
      likesCounts: 0
    })

    const [firstName, lastName] = name.split(' ')
    expect(dbUser.screenName).toContain(firstName)
    expect(dbUser.screenName).toContain(lastName)
  })
})
