const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'build'

const database = {
  development: "larashop_typeorm",
  production: 'prod-db',
  test: 'test_larashop_typeorm'
}

module.exports = [
  {
    name: 'default',
    type: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: database[process.env.NODE_ENV],
    synchronize: false,
    logging: process.env.NODE_ENV === 'development',
    entities: [rootDir + '/entities/**/*{.ts,.js}'],
    migrations: [rootDir + '/migrations/**/*{.ts,.js}'],
    subscribers: [rootDir + '/subscribers/**/*{.ts,.js}'],
    seeds: [rootDir + '/seeds/**/*{.ts,.js}'],
    cli: {
      entitiesDir: rootDir + '/entities',
      migrationsDir: rootDir + '/migrations',
      subscribersDir: rootDir + '/subscribers',
    },
  },
  {
    name: 'test',
    type: 'sqlite',
    database: './' + database['test'] + '.sqlite',
    logging: true,
    entities: [rootDir + '/entities/**/*{.ts,.js}'],
    migrations: [rootDir + '/migrations/**/*{.ts,.js}'],
    subscribers: [rootDir + '/subscribers/**/*{.ts,.js}'],
    seeds: [rootDir + '/seeds/**/*{.ts,.js}'],
    cli: {
      entitiesDir: rootDir + '/entities',
      migrationsDir: rootDir + '/migrations',
      subscribersDir: rootDir + '/subscribers',
    },
  }
]