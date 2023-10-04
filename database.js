import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("mydb.db");

export const initializeSetDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS card_sets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        group_name TEXT,
        numCards INTEGER,
        personalBest REAL
      );`,
      [],
      (_, results) => {
        if (results.rowsAffected >= 0) {
          console.log("Card set table created successfully");
          // You can add code here to insert data if needed
        } else {
          console.error("Failed to create card set table");
        }
      },
      (_, error) => {
        console.error("Error creating card set table:", error);
      }
    );
  });
};

export const fetchCardSets = (callback) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM card_sets",
        [],
        (_, { rows }) => {
          const data = [];
          for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i));
          }
          callback(data);
        },
        (_, error) => {
          console.error("Error fetching card sets:", error);
        }
      );
    });
  };

  export const removeCardSet = (id, callback) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM card_sets WHERE id = ?",
        [id],
        (_, results) => {
          if (results.rowsAffected > 0) {
            console.log(`Card set with ID ${id} removed successfully`);
            // Check if a callback function is provided before invoking it
            if (callback) {
              callback();
            }
          } else {
            console.error(`Failed to remove card set with ID ${id}`);
          }
        },
        (_, error) => {
          console.error("Error removing card set:", error);
        }
      );
    });
  };

export const insertCardSet = (data, callback) => {
    const { title, group_name, numCards, personalBest } = data;
    
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO card_sets (title, group_name, numCards, personalBest) VALUES (?, ?, ?, ?)",
        [title, group_name, numCards, personalBest],
        (_, results) => {
          if (results.rowsAffected > 0) {
            console.log("Card set inserted successfully");
            // If insertion was successful, invoke the callback to notify the component
            callback();
          } else {
            console.error("Failed to insert card set");
          }
        },
        (_, error) => {
          console.error("Error inserting card set:", error);
        }
      );
    });
  };

  export const updateCardSet = (id, data, callback) => {
    const { title, group_name, numCards, personalBest } = data;
  
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE card_sets SET title = ?, group_name = ?, numCards = ?, personalBest = ? WHERE id = ?",
        [title, group_name, numCards, personalBest, id],
        (_, results) => {
          if (results.rowsAffected > 0) {
            console.log(`Card set with ID ${id} updated successfully`);
            // If update was successful, invoke the callback to notify the component
            if (callback) {
              callback();
            }
          } else {
            console.error(`Failed to update card set with ID ${id}`);
          }
        },
        (_, error) => {
          console.error("Error updating card set:", error);
        }
      );
    });
  };
  