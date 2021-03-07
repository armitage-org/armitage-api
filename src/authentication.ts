/* eslint-disable require-await */
/* eslint-disable @typescript-eslint/require-await */
import { ServiceAddons } from '@feathersjs/feathers'
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication'
import { expressOauth, OAuthStrategy } from '@feathersjs/authentication-oauth'

import { Application } from './declarations'

declare module './declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService & ServiceAddons<any>
  }
}

class GoogleStrategy extends OAuthStrategy {
  async getEntityQuery(profile: any, params: any) {
    return { email: profile.email }
  }

  async getEntityData(profile: any, existing: any, params: any) {
    // const baseData = await super.getEntityData(profile, existing, params)
    // console.log({profile, existing, params})
    return { email: profile.email, name: profile.name, image: profile.picture }
  }
}

export default function(app: Application): void {
  const authentication = new AuthenticationService(app)

  authentication.register('jwt', new JWTStrategy())
  authentication.register('google', new GoogleStrategy())

  app.use('/authentication', authentication)
  app.configure(expressOauth())
}
