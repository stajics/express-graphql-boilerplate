const config = require('./config');
require('./config/connection.config');
require('./server/models');
require('./config/passport');
const { logger } = require('./config/logger.config');

global.logger = logger;

const server = require('./config/apollo.config');
let app = require('./config/express.config');

server.applyMiddleware({ app });

const port = process.env.PORT || config.PORT;

// Start server
app = app.listen({ port }, () => {
  logger.info(`🚀 ${process.env.APP_NAME} running on port ${port}.`);
});

// Expose app
module.exports.expressApp = app;
module.exports.server = server;
