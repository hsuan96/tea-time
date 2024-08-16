import { ElectronHandler, DbHandler } from './main/preload';

declare global {
  interface Window {
    electron: ElectronHandler;
    db: DbHandler;
  }
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
