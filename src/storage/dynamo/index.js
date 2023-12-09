import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'

let options = {
  region: process.env.AWS_REGION
}

const translateConfig = {
  marshallOptions: {
    removeUndefinedValues: true
  },
  unmarshallOptions: {}
}

const dynamoDB = DynamoDBDocument.from(new DynamoDB(options), translateConfig)

export default dynamoDB
