import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import useStore from '../store';
import Store from './Store';
import StoreModal from './StoreModal';
import DrinkModal from './DrinkModal';
import ConfirmModal from './ConfirmModal';

import styles from './styles.module.css';

export default function Root() {
  const [searchInput, setSearchInput] = useState('');

  const stores = useStore((state) => state.stores);
  const fetch = useStore((state) => state.fetch);
  const storeModalOpen = useStore((state) => state.storeModalOpen);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const onSearch = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      await fetch(searchInput || undefined);
    }
  };

  return (
    <>
      {/* Search Bar */}
      <Box className={styles.root_box}>
        <>
          <TextField
            placeholder="輸入店名或飲料..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={onSearch}
            size="small"
            className={styles.shadow}
            sx={{
              flex: 1,
              '.MuiInputBase-input': { color: '#333' },
              '& fieldset': { border: 'none' },
              '& ::placeholder': { fontSize: 'small' },
            }}
          />
          <Button className={styles.shadow} onClick={() => storeModalOpen()}>
            <div className={styles.text}>+ 新增飲料店</div>
          </Button>
        </>
      </Box>

      {/* Store List */}
      <div className={styles.p10}>
        {stores.map((store: any) => (
          <div key={`${store.id}-${store.name}`}>
            <Store data={store} />
          </div>
        ))}
      </div>

      {/* Modals */}
      <StoreModal />
      <DrinkModal />
      <ConfirmModal />
    </>
  );
}
