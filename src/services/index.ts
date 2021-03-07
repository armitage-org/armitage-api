import { Application } from '../declarations'
import users from './users/users.service'
import books from './books/books.service'
import booksRentals from './books_rentals/books_rentals.service'
import rentalQueue from './rental_queue/rental_queue.service'
// Don't remove this comment. It's needed to format import lines nicely.

export default function(app: Application): void {
  app.configure(users)
  app.configure(books)
  app.configure(booksRentals)
  app.configure(rentalQueue)
}
