import path from 'path';
import { app } from 'electron';
import webpackPaths from '../../.erb/configs/webpack.paths';

class Config {
  static get isDev() {
    return process.env.NODE_ENV === 'development';
  }

  static get isDebug() {
    return (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    );
  }

  static get sql() {
    const databaseName = 'db.sqlite';
    const sqlPathDev = path.join(webpackPaths.appPath, 'sql', databaseName);
    const sqlPathProd = path.join(app.getPath('userData'), databaseName);
    const sqlPath = Config.isDev ? sqlPathDev : sqlPathProd;

    return {
      databaseName,
      path: sqlPath,
    };
  }
}

export default Config;
