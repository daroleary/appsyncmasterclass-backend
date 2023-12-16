import * as ddb from '@aws-appsync/utils/dynamodb'
import dynamoDB from '../storage/dynamo/index.js'

const { TWEETS_TABLE } = process.env

export const getTweetById = async ({ tweetId }) => {
  const response = await dynamoDB.get({
    TableName: TWEETS_TABLE,
    Key: {
      id: tweetId
    }
  })
  return response.Item
}