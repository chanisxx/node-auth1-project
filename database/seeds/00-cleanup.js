const cleaner = require('knex-cleaner');

function cleanTables(knex) {
  return cleaner
  .clean(knex, {
    mode: 'truncate',
    restartIdentity: true,
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
  })
  .then(() => console.log(' All tables truncated, ready to seed'))
}



exports.seed = function(knex) {
  if (knex.client.config.client === "sqlite3") {
    /* 
      a recent version of SQLite3 broke knex-cleaner's functionality when foreign keys are enabled,
      so we're temporarily disabling foreign keys when running the seeds against SQLite3.
    */
    return knex.raw("PRAGMA foreign_keys = OFF;").then(() => cleanTables(knex));
  } else {
    return cleanTables(knex);
  }
};
