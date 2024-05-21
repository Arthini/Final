// src/components/TableListDialog.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';

const TableListDialog = ({ open, onClose, tables }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ backgroundColor: '#1976D2', color: 'white' }}>Table List</DialogTitle>
      <DialogContent>
        {tables.length === 0 ? (
          <Typography variant="body1">Empty list</Typography>
        ) : (
          <List>
            {tables.map((table, index) => (
              <div key={index}>
                <ListItem>
                  <ListItemText
                    primary={table.tableName}
                    secondary={`Columns: ${table.columns.length}`}
                  />
                </ListItem>
                {table.columns.length > 0 && (
                  <List component="div" disablePadding>
                    {table.columns.map((column, colIndex) => (
                      <ListItem key={colIndex} sx={{ pl: 4 }}>
                        <ListItemText primary={`${column.name} (${column.type})`} />
                      </ListItem>
                    ))}
                  </List>
                )}
                <Divider />
              </div>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TableListDialog;
