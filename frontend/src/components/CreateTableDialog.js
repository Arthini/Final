import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  MenuItem,
  Typography,
  Grid,
  Snackbar,
  SnackbarContent
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'; // Import Axios

const columnTypes = ['int', 'Varchar', 'float', 'set','binary', 'boolean', 'char', 'date', 
'datetime', 'decimal', 'double', 'enum', 'numeric', 'real', 'year'];

const CreateTableDialog = ({ open, onClose, onSubmit, tableData }) => {
  const [tableName, setTableName] = useState({
    id:'',
    name:''
  });
  const [columns, setColumns] = useState([{ name: '', type: '' }]);
  const [errorOpen, setErrorOpen] = useState(false);

  useEffect(() => {
    if (open) {
      if (tableData) {
        setTableName(tableData.tableName);
        setColumns(tableData.columns);
      } else {
        setTableName('');
        setColumns([{ name: '', type: '' }]);
      }
    }
  }, [open, tableData]);

  const handleAddColumn = () => {
    setColumns([...columns, { name: '', type: '' }]);
  };

  const handleColumnChange = (index, key, value) => {
    const newColumns = [...columns];
    newColumns[index][key] = value;
    setColumns(newColumns);
  };

  const handleDeleteColumn = (index) => {
    setColumns(columns.filter((_, colIndex) => colIndex !== index));
  };

  const handleOk = () => {
    if (!tableName || columns.some(column => !column.name || !column.type)) {
      setErrorOpen(true);
    } else {
      const tableData = { tableName, columns };
      axios.post('http://localhost:3307/api/tables', tableData) // Send a POST request to create table endpoint
        .then(response => {
          onSubmit(tableData); // Trigger the onSubmit function to update the state with the new table data
          onClose(); // Close the dialog after successfully creating the table
        })
        .catch(error => {
          console.error("There was an error creating the table!", error);
        });
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleCloseError = () => {
    setErrorOpen(false);
  };
function handleSubmit(e){
  e.preventDefault()
  axios.post('./api/tables',tableData)
  .then((res)=>{
    console.log(res)
  })
  .catch((err)=>console.log(err))
}
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" onSubmit={handleSubmit}>
      <DialogTitle sx={{ backgroundColor: '#1976D2',color:'white'}}>{tableData ? 'Edit Table' : 'Create Table'}</DialogTitle>
      <DialogContent>
      <Typography variant="h6" sx={{padding:'20px 0 0 0'}}>Table</Typography>
        <TextField
          label="Table Name"
          fullWidth
          margin="normal"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          required
        />
        <Typography variant="h6">Columns</Typography>
        {columns.map((column, index) => (
          <Grid container spacing={2} key={index} alignItems="center">
            <Grid item xs={6}>
              <TextField
                label="Column Name"
                fullWidth
                margin="normal"
                value={column.name}
                onChange={(e) => handleColumnChange(index, 'name', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="Column Type"
                fullWidth
                margin="normal"
                select
                value={column.type}
                onChange={(e) => handleColumnChange(index, 'type', e.target.value)}
                required
              >
                {columnTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={1}>
              {index > 0 && (
                <IconButton color="primary" onClick={() => handleDeleteColumn(index)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
        ))}
        <Button color="primary" onClick={handleAddColumn}>
          <AddIcon />Add
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleOk}>OK</Button>
      </DialogActions>
      <Snackbar
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        open={errorOpen}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <SnackbarContent
          message="Please enter values in all fields."
        />
      </Snackbar>
    </Dialog>
  );
};

export default CreateTableDialog;
