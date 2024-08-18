/* eslint-disable consistent-return */
import { Op } from 'sequelize';
import { DrinkModel, StoreModel } from '../sql/modals';
import {
  CreateStoreReq,
  UpdateStoreReq,
  CreateDrinkReq,
  UpdateDrinkReq,
  StoreItem,
} from '../../types';

class DbService {
  async fetch(search?: string): Promise<StoreItem[] | null> {
    try {
      if (!search) {
        const stores = await StoreModel.findAll({
          include: DrinkModel,
          order: [['createdAt', 'DESC']],
        });
        return stores.map((s) => s.toJSON());
      }

      const stores = await StoreModel.findAll({
        order: [['createdAt', 'DESC']],
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { '$drinks.name$': { [Op.like]: `%${search}%` } },
          ],
        },
        include: [
          {
            model: DrinkModel,
            required: false,
          },
        ],
      });
      return stores.map((s) => s.toJSON());
    } catch (err) {
      return null;
    }
  }

  async storeCreate(data: CreateStoreReq): Promise<StoreItem | null> {
    try {
      const store = await StoreModel.create({
        name: data.name,
        sugarType: data.sugarType,
        drinks: [],
      });
      return store.toJSON();
    } catch (err) {
      return null;
    }
  }

  async storeUpdate(data: UpdateStoreReq): Promise<Boolean | null> {
    try {
      const [count] = await StoreModel.update(
        { name: data.name },
        { where: { id: data.id } },
      );
      return count > 0;
    } catch (err) {
      return false;
    }
  }

  async storeDelete(id: number): Promise<Boolean | null> {
    try {
      const count = await StoreModel.destroy({ where: { id } });
      return count > 0;
    } catch (err) {
      return null;
    }
  }

  async drinkCreate(data: CreateDrinkReq): Promise<DrinkModel | null> {
    try {
      const drinks = await DrinkModel.create(data);
      return drinks.toJSON();
    } catch (err) {
      return null;
    }
  }

  async drinkUpdate(data: UpdateDrinkReq): Promise<Boolean | null> {
    try {
      const [count] = await DrinkModel.update(
        {
          name: data.name,
          comment: data.comment,
          sugar: data.sugar,
          ice: data.ice,
          star: data.star,
        },
        { where: { id: data.id } },
      );
      return count > 0;
    } catch (err) {
      return null;
    }
  }

  async drinkDelete(id: number): Promise<Boolean | null> {
    try {
      const count = await DrinkModel.destroy({ where: { id } });
      return count > 0;
    } catch (err) {
      return null;
    }
  }
}

const service = new DbService();
export default service;

export const dbIpcMainHandlers: { [key: string]: (...args: any[]) => any } = {
  'db:fetch': service.fetch,
  'db:storeCreate': service.storeCreate,
  'db:storeUpdate': service.storeUpdate,
  'db:storeDelete': service.storeDelete,
  'db:drinkCreate': service.drinkCreate,
  'db:drinkUpdate': service.drinkUpdate,
  'db:drinkDelete': service.drinkDelete,
};
