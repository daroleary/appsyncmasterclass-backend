import { expect } from 'vitest'

import dynamoDB from '../../storage/dynamo/index.js'

export const user_exists_in_UsersTable = async (id) => {
  console.log(`looking for user [${id}] in table ${process.env.USERS_TABLE}`)
  const response = await dynamoDB.get({
    TableName: process.env.USERS_TABLE,
    Key: { id }
  })

  expect(response).toBeTruthy();

  return response.Item
}
