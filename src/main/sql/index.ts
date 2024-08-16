/* eslint-disable camelcase */
import { type Options, Transaction } from 'sequelize';
import { Sequelize as SequelizeTS } from 'sequelize-typescript';
import Config from '../../config';
import { delay } from '../util';

/**
 * ! Note: sequelize 在 ESM 目前僅支援事先 import，無法傳入 path 在套件內部 require models (v7 會支援)
 * @see https://github.com/sequelize/sequelize-typescript/issues/1660
 */
import * as models from './modals';

interface CustomOptions extends Options {
  keepDefaultTimezone?: boolean | undefined;
}

export const sequelize = new SequelizeTS({
  dialect: 'sqlite',
  storage: Config.sql.path,
  /**
   * @see https://github.com/sequelize/sequelize/issues/2113
   */
  retry: {
    match: [
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionTimedOutError/,
      /Deadlock/i,
    ],
    timeout: 10000,
    /**
     * backoff strategy
     * 初始 1000 ms，每次秒數重試增加 10%，最多重試 15 次 (總耗時約 28 秒)
     */
    backoffBase: 1000, // Initial backoff duration in ms. Default: 100
    backoffExponent: 1.1, // Exponent to increase backoff each try. Default: 1.1
    max: 15,
  },
  // logging: config.sql.logging ? (msg) => log.debug(msg) : () => null,
  isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
  timezone: '+00:00',
  keepDefaultTimezone: true,
  quoteIdentifiers: false,
  models: [models.DrinkModel, models.StoreModel],
} as CustomOptions);

/**
 * retry until connected
 */
export const connect: () => Promise<boolean> = async () => {
  try {
    await sequelize.authenticate();
    return true;
  } catch (err) {
    // log.warn(`connect sql failed, retry after 5 sec, ${ModernError.normalize(err)}` );
    await delay(5000);

    return connect();
  }
};

export const close = async () => {
  try {
    await sequelize.close();
  } catch (err) {
    // log.warn(`close sql error, ${ModernError.normalize(err)}`);
  }
};

const SequelizeModule = {
  sequelize,
  connect,
  close,
};

export default SequelizeModule;
