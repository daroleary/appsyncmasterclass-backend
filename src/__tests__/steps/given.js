import Chance from 'chance'
import { confirmUserSignUp, signIn, signInWithNewConfirmedUser, signUp } from '../../auth/cognito/index.js'

const chance = new Chance()

export const a_random_user = () => {
  const firstName = chance.first({ nationality: 'en' })
  const lastName = chance.first({ nationality: 'en' })
  const suffix = chance.string({ length: 8, casing: 'lower', alpha: true, numeric: false })
  const name = `${firstName} ${lastName} ${suffix}`
  const password = chance.string({ length: 8 })
  const email = `${firstName}.${lastName}.${suffix}@bolster.com`.toLowerCase()

  return {
    name,
    password,
    email
  }
}

export const an_authenticated_user = async () => {
  const { email, name, password } = a_random_user()

  return await signInWithNewConfirmedUser({ email, name, password })
}
