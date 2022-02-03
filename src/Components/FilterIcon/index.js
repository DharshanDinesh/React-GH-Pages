import React, { useState } from 'react';
import '../../App.css';
import Avatar from '@mui/material/Avatar';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Modal from '../Modal';
import FilterContainer from '../../Modules/FilterContainer';
function FilterIcon({ setParams, getNewsArticles, params }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const getNews = () => {
    getNewsArticles();
    handleClose();
  };
  return (
    <>
      <div className="stickyIcon" onClick={handleOpen}>
        <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
          <FilterAltIcon />
        </Avatar>
      </div>

      <Modal open={open}>
        <FilterContainer setParams={setParams} getNewsArticles={getNews} params={params} />
      </Modal>
    </>
  );
}
export default FilterIcon;
