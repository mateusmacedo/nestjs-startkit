/* eslint-disable no-undef */
db = db.getSiblingDB('nestjs-startkit')
db.createUser({
  user: 'mongo',
  pwd: 'mongo',
  roles: [
    {
      role: 'dbOwner',
      db: 'nestjs-startkit'
    }
  ]
})
