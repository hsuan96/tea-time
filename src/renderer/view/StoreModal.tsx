import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';

import { SugarType } from '../../constants';
import useStore from '../store';

import styles from './styles.module.css';

export default function StoreModal() {
  const visible = useStore((state) => state.storeModalVisible);
  const data = useStore((state) => state.storeModalData);
  const close = useStore((state) => state.storeModalClose);
  const update = useStore((state) => state.storeUpdate);
  const updateData = useStore((state) => state.storeModalUpdateData);
  const create = useStore((state) => state.storeCreate);

  const onConfirm = async () => {
    if (!data || !data.name || !data?.sugarType) return;

    if (data.id) {
      await update({
        id: data.id,
        name: data.name,
      });
    } else {
      await create({
        name: data.name,
        sugarType: data.sugarType,
      });
    }
    close();
  };

  return (
    <Dialog open={visible} onClose={close}>
      <DialogTitle>{`${data?.id ? '編輯' : '新增'}飲料店`}</DialogTitle>

      <DialogContent>
        <DialogContentText>
          <div className={styles.modal}>
            <TextField
              className={styles.mt10}
              variant="outlined"
              label="飲料店名"
              value={data?.name}
              onChange={(e) => updateData('name', e.target.value)}
            />
            <TextField
              select
              variant="outlined"
              label="糖分標示"
              placeholder="我愛喝手搖"
              value={data?.sugarType}
              disabled={!!data?.id}
              onChange={(e) =>
                updateData('sugarType', e.target.value as SugarType)
              }
            >
              <MenuItem value={SugarType.Text}>文字 (ex: 微糖)</MenuItem>
              <MenuItem value={SugarType.Number}>數字 (ex: 3分糖)</MenuItem>
            </TextField>
          </div>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={close}>取消</Button>
        <Button onClick={onConfirm}>確定</Button>
      </DialogActions>
    </Dialog>
  );
}
