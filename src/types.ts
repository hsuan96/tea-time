import { SugarType } from './constants';

export type DrinkItem = {
  id: number;
  name: string;
  comment?: string;
  sugar?: number;
  ice?: number;
  star?: number;
};

export type StoreItem = {
  id: number;
  name: string;
  sugarType: SugarType;
  drinks: Array<DrinkItem>;
};

export type CreateStoreReq = {
  name: string;
  sugarType: SugarType;
};

export type UpdateStoreReq = {
  id: number;
  name: string;
};

export type CreateDrinkReq = {
  storeId: number;
  name: string;
  comment?: string | undefined | null;
  sugar?: number | undefined;
  ice?: number | undefined;
  star?: number | undefined;
};

export type UpdateDrinkReq = {
  storeId: number;
  id: number;
  name: string;
  comment?: string | undefined | null;
  sugar?: number | undefined;
  ice?: number | undefined;
  star?: number | undefined;
};

export type StoreModalData = {
  id?: number;
  name?: string;
  sugarType?: SugarType;
};

export type DrinkModalData = {
  storeId: number;
  storeName: string;
  storeSugarType: SugarType;
  id?: number;
  name?: string;
  comment?: string | undefined;
  sugar?: number | undefined | null;
  ice?: number | undefined | null;
  star?: number;
};
