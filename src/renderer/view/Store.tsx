import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';

import useStore from '../store';
import { SugarType, sugarText, sugarNumber, iceText } from '../../constants';
import Icon from '../../assets/dots';
import { StoreItem, DrinkItem } from '../../types';

import styles from './styles.module.css';

interface Props {
  data: StoreItem;
}

export default function Store(props: Props) {
  const { data } = props;
  const [storeEl, setStoreEl] = useState<HTMLButtonElement | null>(null);
  const [drinkEl, setDrinkEl] = useState<HTMLButtonElement | null>(null);
  const [drinkData, setDrinkData] = useState<DrinkItem | null>(null);
  const storeDelete = useStore((state) => state.storeDelete);
  const drinkDelete = useStore((state) => state.drinkDelete);
  const drinkModalOpen = useStore((state) => state.drinkModalOpen);
  const storeModalOpen = useStore((state) => state.storeModalOpen);
  const confirmModalOpen = useStore((state) => state.confirmModalOpen);

  const openStorePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setStoreEl(event.currentTarget);
  };
  const closeStorePopover = () => {
    setStoreEl(null);
  };
  const openDrinkPopover = (
    event: React.MouseEvent<HTMLButtonElement>,
    drink: any,
  ) => {
    setDrinkEl(event.currentTarget);
    setDrinkData(drink);
  };
  const closeDrinkPopover = () => {
    setDrinkEl(null);
  };

  const metaTxt = (sugar: number, ice: number) => {
    const sText = data.sugarType === SugarType.Text ? sugarText : sugarNumber;
    return [sText[sugar], iceText[ice]].filter((t) => !!t).join('，') || '-';
  };

  return (
    <>
      {/* Store Name */}
      <div className={styles.store_titleBox}>
        <div className={styles.store_title}>{data.name}</div>
        <Button
          className={`${styles.shadow} ${styles.btn} ${styles.createDrinkBtn}`}
          onClick={() =>
            drinkModalOpen({
              storeId: data.id,
              storeName: data.name,
              storeSugarType: data.sugarType,
            })
          }
        >
          <div className={styles.text}>+ 飲料</div>
        </Button>
        <Button
          className={`${styles.btn} ${styles.store_moreActionBtn}`}
          onClick={openStorePopover}
        >
          <Icon />
        </Button>
      </div>

      {/* Drinks Grid */}
      <div className={styles.drink_box}>
        {data.drinks.map((drink: DrinkItem) => (
          <div key={drink.id} className={styles.drink_card}>
            <div className={styles.drink_card_header}>
              <div className={styles.drink_card_title}>{drink.name}</div>
              <Button
                className={`${styles.btn} ${styles.drink_card_heard_btn}`}
                onClick={(e) => openDrinkPopover(e, drink)}
              >
                <Icon />
              </Button>
            </div>

            <div className={styles.drink_card_meta}>
              <div className={styles.drink_card_meta_txt}>
                {metaTxt(drink?.sugar ?? 0, drink?.ice ?? 0)}
              </div>
              <div>{'★'.repeat(drink?.star ?? 0)}</div>
            </div>

            {drink.comment ? (
              <div className={styles.drink_card_comment}>{drink.comment}</div>
            ) : (
              <div />
            )}
          </div>
        ))}
      </div>

      {/* Store Popover */}
      <Popover
        open={!!storeEl}
        anchorEl={storeEl}
        onClose={closeStorePopover}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className={styles.popover}>
          <Button
            onClick={() => {
              closeStorePopover();
              storeModalOpen({
                id: data.id,
                name: data.name,
                sugarType: data.sugarType,
              });
            }}
          >
            編輯店名
          </Button>
          <Button
            onClick={() => {
              closeStorePopover();
              confirmModalOpen(`確定要刪除飲料店 ${data.name} 嗎？`, () =>
                storeDelete(data.id),
              );
            }}
          >
            刪除飲料店
          </Button>
        </div>
      </Popover>

      {/* Drink Popover */}
      <Popover
        open={!!drinkEl}
        anchorEl={drinkEl}
        onClose={closeDrinkPopover}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {drinkData ? (
          <div className={styles.popover}>
            <Button
              onClick={() => {
                closeDrinkPopover();
                drinkModalOpen({
                  storeId: data.id,
                  storeName: data.name,
                  storeSugarType: data.sugarType,
                  id: drinkData.id,
                  name: drinkData.name,
                  comment: drinkData.comment,
                  sugar: drinkData.sugar,
                  ice: drinkData.ice,
                  star: drinkData.star,
                });
              }}
            >
              編輯品項
            </Button>
            {}
            <Button
              onClick={() => {
                closeDrinkPopover();
                confirmModalOpen(`確定要刪除品項 ${drinkData.name} 嗎？`, () =>
                  drinkDelete(drinkData.id, data.id),
                );
              }}
            >
              刪除品項
            </Button>
          </div>
        ) : (
          <div />
        )}
      </Popover>
    </>
  );
}
