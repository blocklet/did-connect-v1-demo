require('dotenv-flow').config();
require('express-async-errors');
const path = require('path');
const cors = require('cors');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const fallback = require('express-history-api-fallback');
const { VC_TYPE_NODE_PASSPORT } = require('@abtnode/constant');

// const Notification = require('@blocklet/sdk/service/notification');

const { name, version } = require('../package.json');
const logger = require('./libs/logger');
const { handlers, connectDidOnlyHandlers, noConnectHandlers } = require('./libs/auth');

const app = express();

app.set('trust proxy', true);
app.use(cookieParser());
app.use(express.json({ limit: '1 mb' }));
app.use(express.urlencoded({ extended: true, limit: '1 mb' }));

handlers.attach({
  app,
  action: 'connect',
  claims: {
    profile: () => ({
      fields: ['fullName'],
      description: 'abc',
    }),
  },
  onAuth: async () => { },
});

connectDidOnlyHandlers.attach({
  app,
  action: 'connect-only',
  claims: {
    profile: () => ({
      fields: ['fullName'],
      description: 'abc',
    }),
  },
  onAuth: async () => { },
});

noConnectHandlers.attach({
  app,
  action: 'no-connect',
  claims: {
    profile: () => ({
      fields: ['fullName'],
      description: 'abc',
    }),
  },
  onAuth: async () => { },
});

noConnectHandlers.attach({
  app,
  action: 'get-passport-data',
  claims: {
    profile: () => ({
      fields: ['fullName'],
      description: 'abc',
    }),
  },
  onAuth: async ({ updateSession, claims }) => {
    updateSession({
      thisIsCustomData: {
        desc: 'Customizable key and value',
        claims,
      },
    });
  },
  onConnect: async () => {
    return {
      verifiableCredential: {
        description: 'cdef',
        optional: true, // Is it mandatory to provide a passport
        item: [VC_TYPE_NODE_PASSPORT], // Specify blocklet server vc type
        // trustedIssuers: undefined, // Specify which issuer, not pass as unrestricted issuer
      },
    };
  },
});

noConnectHandlers.attach({
  app,
  action: 'force-did',
  claims: {
    profile: () => ({
      fields: ['fullName'],
      description: 'abc',
    }),
  },
  onAuth: async ({ userDid }) => {
    if (userDid !== 'z1mDA4HBF4YnES3J3qud48XTeAswDjfDTHx') {
      throw new Error('Only z1mDA4HBF4YnES3J3qud48XTeAswDjfDTHx can access this page');
    }
  },
});

const router = express.Router();
router.use('/api', require('./routes'));

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production' || process.env.ABT_NODE_SERVICE_ENV === 'production';

if (isDevelopment) {
  process.env.BLOCKLET_PORT = 3030;
}

if (isProduction) {
  app.use(cors());
  app.use(compression());

  const staticDir = path.resolve(__dirname, '../', 'build');
  app.use(express.static(staticDir, { index: 'index.html' }));
  app.use(router);
  app.use(fallback('index.html', { root: staticDir }));

  app.use((req, res) => {
    res.status(404).send('404 NOT FOUND');
  });
  app.use((err, req, res) => {
    logger.error(err.stack);
    res.status(500).send('Something broke!');
  });
} else {
  app.use(router);
}

const port = parseInt(process.env.BLOCKLET_PORT || process.env.APP_PORT, 10) || 3030;

app.listen(port, (err) => {
  if (err) throw err;
  logger.info(`> ${name} v${version} ready on ${port}`);
});
