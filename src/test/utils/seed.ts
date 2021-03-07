export default async (app: any) => {
  const [user, user2] = await Promise.all([
    app.service('users').create({ email: 'auth@user.com' }),
    app.service('users').create({ email: 'auth2@user.com' }),
  ])
  const book = await app.service('books').create({ title: 'What to do now?' })
  return { user, user2, book }
}
