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
  