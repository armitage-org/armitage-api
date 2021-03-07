// Initializes the `rental_queue` service on path `/queue`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { RentalQueue } from './rental_queue.class'
import createModel from '../../models/rental_queue.model'
import hooks from './rental_queue.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    queue: RentalQueue & ServiceAddons<any>
  }
}

export default function(app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  }

  // Initialize our service with any options it requires
  app.use('/queue', new RentalQueue(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('queue')

  service.hooks(hooks)
}
