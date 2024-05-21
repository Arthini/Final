
//edittable.js
import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@mui/material';

const EditTableDialog = ({ open, onClose, tableData }) => {
  const handleCancel = () => {
    onClose();
  };

  const handleSave = () => {
    // Add logic to save the edited table data
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Table</DialogTitle>
      <DialogContent>
        {/* Display the form fields for editing the table data */}
        {/* You can use the same CreateTableDialog component for editing */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTableDialog;
