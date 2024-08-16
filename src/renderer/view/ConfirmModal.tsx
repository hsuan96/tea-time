import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import useStore from '../store';

export default function DrinkModal() {
  const visible = useStore((state) => state.confirmModalVisible);
  const text = useStore((state) => state.confirmModalText);
  const callback = useStore((state) => state.confirmModalCallback);
  const close = useStore((state) => state.confirmModalClose);

  return (
    <Dialog open={visible} onClose={close}>
      <DialogTitle>再想一下</DialogTitle>

      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={close}>取消</Button>
        <Button
          onClick={() => {
            close();
            callback();
          }}
        >
          確定刪除
        </Button>
      </DialogActions>
    </Dialog>
  );
}
