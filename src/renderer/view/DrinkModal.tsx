import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Rating from '@mui/material/Rating';

import { SugarType, sugarNumber, sugarText, iceText } from '../../constants';
import useStore from '../store';

import styles from './styles.module.css'

export default function DrinkModal() {
  const drinkModalVisible = useStore((state) => state.drinkModalVisible);
  const data = useStore((state) => state.drinkModalData);
  const updateData = useStore((state) => state.drinkModalUpdateData);
  const close = useStore((state) => state.drinkModalClose);
  const createDrink = useStore((state) => state.drinkCreate);
  const updateDrink = useStore((state) => state.drinkUpdate);
  const sugarLabels =
    data?.storeSugarType === SugarType.Number ? sugarNumber : sugarText;

  const onConfirm = async () => {
    if (!data || !data.name) return;

    if (data.id) {
      await updateDrink({
        id: data.id,
        storeId: data.storeId,
        name: data.name,
        sugar: data.sugar,
        ice: data.ice,
        star: data.star,
        comment: data.comment || null,
      });
    } else {
      await createDrink({
        storeId: data.storeId,
        name: data.name,
        sugar: data.sugar,
        ice: data.ice,
        star: data.star,
        comment: data.comment || null,
      });
    }
    close();
  };

  return (
    <Dialog open={drinkModalVisible} onClose={close}>
      <DialogTitle>
        {`${data?.id ? '更新' : '新增'}${data?.storeName ?? ''}飲料品項`}
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          <div className={styles.modal}>
            <TextField
              className={styles.mt10}
              required
              variant="outlined"
              label="飲料品項名"
              value={data?.name ?? ''}
              onChange={(e) => updateData('name', e.target.value)}
            />

            <TextField
              select
              variant="outlined"
              label="甜度"
              value={data?.sugar ?? null}
              onChange={(e) => updateData('sugar', e.target.value as SugarType)}
            >
              {Object.keys(sugarLabels).map((key) => (
                <MenuItem key={key} value={Number(key)}>
                  {sugarLabels[Number(key)]}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              variant="outlined"
              label="冰塊"
              value={data?.ice ?? null}
              onChange={(e) => updateData('ice', e.target.value as SugarType)}
            >
              {Object.keys(iceText).map((key) => (
                <MenuItem key={key} value={Number(key)}>
                  {iceText[Number(key)]}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              variant="outlined"
              label="其他註記"
              value={data?.comment ?? undefined}
              onChange={(e) => updateData('comment', e.target.value)}
            />

            <Rating
              value={data?.star ?? 1}
              onChange={(_, newValue) => {
                updateData('star', newValue);
              }}
            />
          </div>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onConfirm}>確定</Button>
      </DialogActions>
    </Dialog>
  );
}
