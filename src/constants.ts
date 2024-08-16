export enum DbActions {
  fetch = 'fetch',
  createStore = 'store:create',
  updateStore = 'store:update',
  deleteStore = 'store:delete',
  createDrink = 'drink:create',
  updateDrink = 'drink:update',
  deleteDrink = 'drink:delete',
}

export enum SugarType {
  Text = 'text',
  Number = 'number',
}

export const sugarText: Record<number, string> = {
  0: '無糖',
  1: '微微糖',
  2: '微糖',
  3: '半糖',
  4: '少糖',
  5: '全糖',
};

export const sugarNumber: Record<number, string> = {
  0: '無糖',
  1: '1分糖',
  2: '2分糖',
  3: '3分糖',
  4: '5分糖',
  5: '7分糖',
  6: '9分糖',
  7: '全糖',
};

export const iceText: Record<number, string> = {
  0: '正常',
  1: '少冰',
  2: '微冰',
  3: '去冰',
  4: '完全去冰',
  5: '常溫',
  6: '溫',
  7: '熱',
};
