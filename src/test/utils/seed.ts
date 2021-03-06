export default async (app: any) => {
  const [user, user2, userAdmin] = await Promise.all([
    app.service('users').create({ email: 'auth@user.com', name: 'John Doe' }),
    app.service('users').create({ email: 'dana@user.com', name: 'Dana Scully' }),
    app
      .service('users')
      .create({ email: 'admin@user.com', name: 'The Admin' }),
  ])
  const book = await app.service('books').create({ title: 'What to do now?' })
  return { user, user2, userAdmin, book }
}
