// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 8082; 

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'web' 
});



// Route to create a new table
app.post('/api/tables', (req, res) => {
  
    const { tableName, columns } = req.body;
    db.query('INSERT INTO tables (name) VALUES (?)', [tableName], (err, result) => {
        if (err) {
            res.status(500).send('Error creating table');
            return;
        }
        const tableId = result.insertId;
        columns.forEach(column => {
            db.query('INSERT INTO columns (table_id, name, type) VALUES (?, ?, ?)', [tableId, column.name, column.type], (err, result) => {
                if (err) {
                    console.error('Error inserting column:', err);
                    return;
                }
            });
        });
        res.status(200).send('Table created successfully');
    });
});

// Route to get all tables
app.get('/api/tables', (req, res) => {
    db.query('SELECT * FROM tables', (err, tables) => {
        if (err) {
            res.status(500).send('Error fetching tables');
            return;
        }
        const tablesWithColumns = [];
        tables.forEach(table => {
            db.query('SELECT * FROM columns WHERE table_id = ?', [table.id], (err, columns) => {
                if (err) {
                    console.error('Error fetching columns:', err);
                    return;
                }
                tablesWithColumns.push({ ...table, columns });
                if (tablesWithColumns.length === tables.length) {
                    res.status(200).json(tablesWithColumns);
                }
            });
        });
    });
});

// Route to update a table
app.put('/api/tables/:id', (req, res) => {
  const tableId = req.params.id;
  const { tableName, columns } = req.body;
  
  // Update the table name
  db.query('UPDATE tables SET name = ? WHERE id = ?', [tableName, tableId], (err, result) => {
      if (err) {
          res.status(500).send('Error updating table');
          return;
      }

      // Update the columns
      columns.forEach(column => {
          db.query('UPDATE columns SET name = ?, type = ? WHERE id = ?', [column.name, column.type, column.id], (err, result) => {
              if (err) {
                  console.error('Error updating column:', err);
                  return;
              }
          });
      });
      
      res.status(200).send('Table updated successfully');
  });
});


// Route to delete a table
app.delete('/api/tables/:id', (req, res) => {
  const tableId = req.params.id;
  console.log(tableId)
  // Delete the table
  db.query('DELETE FROM tables WHERE id = ?', [tableId], (err, result) => {
      if (err) {
          res.status(500).send('Error deleting table');
          return;
      }
      else{
       res.send(result);
      }

      // Delete the associated columns
      db.query('DELETE FROM columns WHERE table_id = ?', [tableId], (err, result) => {
          if (err) {
              console.error('Error deleting columns:', err);
              return;
          }

          res.status(200).send('Table and associated columns deleted successfully');
          console.log("Delete reached")
      });
  });
});


app.listen(8082, () => {
    console.log(`Server running on port ${port}`);
});
