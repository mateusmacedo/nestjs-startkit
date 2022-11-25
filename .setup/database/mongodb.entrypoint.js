/* eslint-disable no-undef */
db = db.getSiblingDB('jc-customers-dev')
db.createUser({
  user: 'mongo',
  pwd: 'mongo',
  roles: [
    {
      role: 'dbOwner',
      db: 'jc-customers-dev'
    }
  ]
})
