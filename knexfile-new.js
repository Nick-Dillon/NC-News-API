require(dotenv).config(); // THIS dotenv FILE WOULD BE A SIMPLE '.env' file created (named exactly like that) which would contain the DATABASE URL
                          // DATABASE_URL: postgres://db_user:pass@db:5432/nc_news

module.exports = {
    client:'pg',
    migrations: { directory: './db/migrations' },
    seeds: { directory: './db/seeds' },
    connection: ProcessingInstruction.env.DATABASE_URL
};