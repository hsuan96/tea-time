import { create } from 'zustand';
import { produce } from 'immer';
import { SugarType } from '../../constants';
import {
  CreateStoreReq,
  UpdateStoreReq,
  CreateDrinkReq,
  UpdateDrinkReq,
  StoreItem,
  StoreModalData,
  DrinkModalData,
  DrinkItem,
} from '../../types';

interface State {
  stores: StoreItem[];
  fetch: (search?: string) => Promise<void>;
  storeCreate: (data: CreateStoreReq) => Promise<void>;
  storeUpdate: (data: UpdateStoreReq) => Promise<void>;
  storeDelete: (id: number) => Promise<void>;
  drinkCreate: (data: CreateDrinkReq) => Promise<void>;
  drinkUpdate: (data: UpdateDrinkReq) => Promise<void>;
  drinkDelete: (drinkId: number, storeId: number) => Promise<void>;

  storeModalVisible: boolean;
  storeModalData: StoreModalData | null;
  storeModalOpen: (data?: StoreModalData) => void;
  storeModalClose: () => void;
  storeModalUpdateData: (key: 'name' | 'sugarType', value: any) => void;

  drinkModalVisible: boolean;
  drinkModalData: DrinkModalData | null;
  drinkModalOpen: (data: DrinkModalData) => void;
  drinkModalClose: () => void;
  drinkModalUpdateData: (
    key: 'name' | 'sugar' | 'ice' | 'star' | 'comment',
    value: any,
  ) => void;

  confirmModalVisible: boolean;
  confirmModalCallback: any;
  confirmModalText: string;
  confirmModalOpen: (text: string, cb: () => Promise<void>) => void;
  confirmModalClose: () => void;
}

const useStore = create<State>((set, get) => ({
  stores: [],
  fetch: async (search) => {
    const stores = await window.db.fetch(search);
    set({ stores: stores ?? [] });
  },
  storeCreate: async (data) => {
    const newStore = await window.db.storeCreate(data);
    set(
      produce((state) => {
        state.stores.splice(0, 0, { ...newStore, drinks: [] });
      }),
    );
  },
  storeUpdate: async (data) => {
    await window.db.storeUpdate(data);
    set(
      produce((state) => {
        const store = state.stores.find((s: StoreItem) => s.id === data.id);
        store.name = data.name;
      }),
    );
  },
  storeDelete: async (id: number) => {
    await window.db.storeDelete(id);
    set(
      produce((state) => {
        const index = state.stores.findIndex((s: StoreItem) => s.id === id);
        state.stores.splice(index, 1);
      }),
    );
  },

  drinkCreate: async (data) => {
    const newDrink = await window.db.drinkCreate(data);
    set(
      produce((state) => {
        const store = state.stores.find(
          (s: StoreItem) => s.id === data.storeId,
        );
        store.drinks.push(newDrink);
      }),
    );
  },
  drinkUpdate: async (data) => {
    await window.db.drinkUpdate(data);
    set(
      produce((state) => {
        const store = state.stores.find(
          (s: StoreItem) => s.id === data.storeId,
        );
        const drink = store.drinks.find((d: DrinkItem) => d.id === data.id);
        drink.name = data.name;
        drink.comment = data.comment;
        drink.sugar = data.sugar;
        drink.ice = data.ice;
        drink.star = data.star;
      }),
    );
  },
  drinkDelete: async (drinkId, storeId) => {
    await window.db.drinkDelete(drinkId);
    set(
      produce((state) => {
        const store = state.stores.find((s: StoreItem) => s.id === storeId);
        store.drinks = store.drinks.filter(
          (drink: DrinkItem) => drink.id !== drinkId,
        );
      }),
    );
  },

  storeModalVisible: false,
  storeModalData: {
    name: '',
    sugarType: SugarType.Text,
  },
  storeModalOpen: (data) => {
    set({
      storeModalVisible: true,
      storeModalData: data
        ? {
            id: data.id,
            name: data.name,
            sugarType: data.sugarType,
          }
        : {
            id: undefined,
            name: '',
            sugarType: SugarType.Text,
          },
    });
  },
  storeModalClose: () => {
    set({
      storeModalVisible: false,
    });
  },
  storeModalUpdateData: (key, value) => {
    set(
      produce((state) => {
        state.storeModalData[key] = value;
      }),
    );
  },

  drinkModalVisible: false,
  drinkModalData: null,
  drinkModalOpen: (data) => {
    set({
      drinkModalVisible: true,
      drinkModalData: {
        storeId: data.storeId,
        storeName: data.storeName,
        storeSugarType: data.storeSugarType,
        id: data.id ?? undefined,
        name: data.name ?? '',
        comment: data.comment ?? undefined,
        sugar: data.sugar ?? null,
        ice: data.ice ?? null,
        star: data.star ?? 1,
      },
    });
  },
  drinkModalClose: () => {
    set({ drinkModalVisible: false });
  },
  drinkModalUpdateData: (key, value) => {
    set(
      produce((state) => {
        state.drinkModalData[key] = value;
      }),
    );
  },

  confirmModalVisible: false,
  confirmModalCallback: null,
  confirmModalText: '',
  confirmModalOpen: (text, callback) => {
    set({
      confirmModalVisible: true,
      confirmModalText: text,
      confirmModalCallback: callback,
    });
  },
  confirmModalClose: () => {
    set({
      confirmModalVisible: false,
      confirmModalText: '',
      confirmModalCallback: null,
    });
  },
}));

export default useStore;
