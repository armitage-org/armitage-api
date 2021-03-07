// Initializes the `books_rentals` service on path `/rentals`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { BooksRentals } from './books_rentals.class'
import createModel from '../../models/books_rentals.model'
import hooks from './books_rentals.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    rentals: BooksRentals & ServiceAddons<any>
  }
}

export default function(app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  }

  // Initialize our service with any options it requires
  app.use('/rentals', new BooksRentals(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('rentals')

  service.hooks(hooks)
}
