import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

function CustomModal({ open, children }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    p: 9,
  };

  return (
    <Modal open={open}>
      <Fade in={open}>
        <Box sx={style}>{children} </Box>
      </Fade>
    </Modal>
  );
}

export default CustomModal;
