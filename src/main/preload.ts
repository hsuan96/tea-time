// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import {
  CreateStoreReq,
  UpdateStoreReq,
  CreateDrinkReq,
  UpdateDrinkReq,
} from '../types';

export type Channels = 'ipc-example';
export type ElectronHandler = typeof electronHandler;
export type DbHandler = typeof dbIpcRenderHandlers;

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

export const dbIpcRenderHandlers = {
  fetch: (payload?: string) => ipcRenderer.invoke('db:fetch', payload),
  storeCreate: (payload: CreateStoreReq) =>
    ipcRenderer.invoke('db:storeCreate', payload),
  storeUpdate: (payload: UpdateStoreReq) =>
    ipcRenderer.invoke('db:storeUpdate', payload),
  storeDelete: (payload: number) =>
    ipcRenderer.invoke('db:storeDelete', payload),
  drinkCreate: (payload: CreateDrinkReq) =>
    ipcRenderer.invoke('db:drinkCreate', payload),
  drinkUpdate: (payload: UpdateDrinkReq) =>
    ipcRenderer.invoke('db:drinkUpdate', payload),
  drinkDelete: (payload: number) =>
    ipcRenderer.invoke('db:drinkDelete', payload),
};

contextBridge.exposeInMainWorld('electron', electronHandler);
contextBridge.exposeInMainWorld('db', dbIpcRenderHandlers);
