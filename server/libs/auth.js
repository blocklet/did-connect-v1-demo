const path = require('path');
const AuthStorage = require('@arcblock/did-auth-storage-nedb');
const WalletAuthenticator = require('@blocklet/sdk/lib/wallet-authenticator');
const WalletHandlers = require('@blocklet/sdk/lib/wallet-handler');
const { types } = require('@ocap/mcrypto');
const { fromSecretKey, WalletType } = require('@ocap/wallet');
const logger = require('./logger');

const appSk = process.env.APP_SK || process.env.BLOCKLET_APP_SK;
const wallet = fromSecretKey(appSk, WalletType({ role: types.RoleType.ROLE_APPLICATION }));

const authenticator = new WalletAuthenticator();

const handlers = new WalletHandlers({
  authenticator,
  tokenGenerator: () => Date.now().toString(),
  tokenStorage: new AuthStorage({
    dbPath: path.join(process.env.BLOCKLET_DATA_DIR, 'auth1.db'),
    onload: (err) => {
      if (err) {
        logger.error(`Failed to load database from ${path.join(process.env.BLOCKLET_DATA_DIR, 'auth.db')}`, err);
      }
    },
  }),
});

const connectDidOnlyHandlers = new WalletHandlers({
  authenticator,
  tokenGenerator: () => Date.now().toString(),
  tokenStorage: new AuthStorage({
    dbPath: path.join(process.env.BLOCKLET_DATA_DIR, 'auth2.db'),
    onload: (err) => {
      if (err) {
        logger.error(`Failed to load database from ${path.join(process.env.BLOCKLET_DATA_DIR, 'auth.db')}`, err);
      }
    },
  }),
  connectedDidOnly: true,
});

const noConnectHandlers = new WalletHandlers({
  authenticator,
  tokenGenerator: () => Date.now().toString(),
  tokenStorage: new AuthStorage({
    dbPath: path.join(process.env.BLOCKLET_DATA_DIR, 'auth3.db'),
    onload: (err) => {
      if (err) {
        logger.error(`Failed to load database from ${path.join(process.env.BLOCKLET_DATA_DIR, 'auth.db')}`, err);
      }
    },
  }),
  autoConnect: false,
});

module.exports = {
  authenticator,
  handlers,
  connectDidOnlyHandlers,
  noConnectHandlers,
  wallet,
};
