import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Paper, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import CreateTableDialog from './components/CreateTableDialog';
import AddColumnDialog from './components/AddColumnDialog';
import TableListDialog from './components/TableListDialog';
import Header from './components/Header';
import Footer from './components/Footer';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const App = () => {
  const [openCreateTableDialog, setOpenCreateTableDialog] = useState(false);
  const [openAddColumnDialog, setOpenAddColumnDialog] = useState(false);
  const [openTableListDialog, setOpenTableListDialog] = useState(false);
  const [tables, setTables] = useState([]);
  const [selectedTableIndex, setSelectedTableIndex] = useState(null);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = () => {
    fetch('http://localhost:3307/api/tables')
      .then(response => response.json())
      .then(data => setTables(data))
      .catch(error => console.error("Error fetching tables:", error));
  };

  const handleOpenCreateTableDialog = () => {
    setOpenCreateTableDialog(true);
  };

  const handleCloseCreateTableDialog = () => {
    setOpenCreateTableDialog(false);
    setSelectedTableIndex(null);
  };

  const handleSubmitCreateTableDialog = (tableData) => {
    if (selectedTableIndex !== null) {
      const updatedTables = [...tables];
      updatedTables[selectedTableIndex] = tableData;
      setTables(updatedTables);
    } else {
      setTables([...tables, tableData]);
    }
    handleCloseCreateTableDialog();
  };

  const handleOpenEditTableDialog = (tableIndex) => {
    setSelectedTableIndex(tableIndex);
    setOpenCreateTableDialog(true);
  };

  const handleOpenAddColumnDialog = (tableIndex) => {
    setSelectedTableIndex(tableIndex);
    setOpenAddColumnDialog(true);
  };

  const handleCloseAddColumnDialog = () => {
    setOpenAddColumnDialog(false);
  };

  const handleSubmitAddColumnDialog = (columnData) => {
    const updatedTables = [...tables];
    updatedTables[selectedTableIndex].columns.push(columnData);
    setTables(updatedTables);
    handleCloseAddColumnDialog();
  };

  const handleDeleteTable = (tableIndex) => {
    const updatedTables = tables.filter((_, index) => index !== tableIndex);
    setTables(updatedTables);
  };

  const handleOpenTableListDialog = () => {
    setOpenTableListDialog(true);
  };

  const handleCloseTableListDialog = () => {
    setOpenTableListDialog(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header onOpenCreateTable={handleOpenCreateTableDialog} onOpenTableList={handleOpenTableListDialog} />
      <Container component="main" sx={{ mt: 8, mb: 2, flexGrow: 1 }}>
        <Grid container spacing={3}>
          {tables.map((table, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead style={{ backgroundColor: getTableHeaderColor(index) }}>
                    <TableRow>
                      <TableCell colSpan={3}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span>{table.tableName}</span>
                          <div>
                            <IconButton onClick={() => handleOpenEditTableDialog(index)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleOpenAddColumnDialog(index)}>
                              <AddIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteTable(index)}>
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {table.columns.map((column, colIndex) => (
                      <TableRow key={colIndex}>
                        <TableCell>{column.name}</TableCell>
                        <TableCell>{column.type}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          ))}
        </Grid>
      </Container>
      <CreateTableDialog open={openCreateTableDialog} onClose={handleCloseCreateTableDialog} onSubmit={handleSubmitCreateTableDialog} tableData={selectedTableIndex !== null ? tables[selectedTableIndex] : null} />
      <AddColumnDialog open={openAddColumnDialog} onClose={handleCloseAddColumnDialog} onSubmit={handleSubmitAddColumnDialog} />
      <TableListDialog open={openTableListDialog} onClose={handleCloseTableListDialog} tables={tables} />
      <Footer />
    </Box>
  );
};

const getTableHeaderColor = (index) => {
  const colors = ['#FFC0CB', '#87CEEB', '#98FB98', '#FFA07A', '#20B2AA', '#FFD700']; // Define your colors here
  return colors[index % colors.length];
};

export default App;
