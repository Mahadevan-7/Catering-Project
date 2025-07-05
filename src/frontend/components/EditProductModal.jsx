import React, { useState, useEffect } from 'react';
import { Modal, TextField, Typography, Box, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
const EditProductModal = ({ open, handleClose, product, onSave }) => {
  const [editedProduct, setEditedProduct] = React.useState(product || {});

  React.useEffect(() => {
    if (product) setEditedProduct(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  const handleSubmit = () => {
    onSave(editedProduct);
    handleClose();
  };

  if (!product) return null;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <TextField
          name="title"
          label="Title"
          fullWidth
          value={editedProduct.title || ''}
          onChange={handleChange}
        />
        <TextField
          name="description"
          label="Description"
          fullWidth
          multiline
          minRows={2}
          value={editedProduct.description || ''}
          onChange={handleChange}
        />
        <TextField
          name="image"
          label="Image URL"
          fullWidth
          value={editedProduct.image || ''}
          onChange={handleChange}
        />
        <TextField
          name="price"
          label="Price"
          type="number"
          fullWidth
          value={editedProduct.price || ''}
          onChange={handleChange}
          inputProps={{ min: 0 }}
        />
        <TextField
          name="category"
          label="Category"
          fullWidth
          value={editedProduct.category || ''}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button className='edit-product-buttons-cancel' onClick={handleClose}>Cancel</Button>
        <Button className='edit-product-buttons-save' variant="contained" onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
export default EditProductModal;
