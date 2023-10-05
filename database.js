import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("mydb.db");

/**
 * Card set operations
 */
export const initializeSetDatabase = (callback) => {
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
          callback()
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

export const updateCardSetNumCards = (cardSetId) => {
    // Fetch the current numCards value for the card set
    fetchCardsBySet(cardSetId, (cards) => {
      if (cards && cards.length >= 0) {
        const updatedNumCards = cards.length;
        // Update the numCards value in the card sets table
        db.transaction((tx) => {
          tx.executeSql(
            "UPDATE card_sets SET numCards = ? WHERE id = ?",
            [updatedNumCards, cardSetId],
            (_, results) => {
              if (results.rowsAffected > 0) {
                console.log(`Updated numCards for card set with ID ${cardSetId}`);
              } else {
                console.error(`Failed to update numCards for card set with ID ${cardSetId}`);
              }
            },
            (_, error) => {
              console.error("Error updating numCards for card set:", error);
            }
          );
        });
      }
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
    const { title, group_name } = data;
    
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO card_sets (title, group_name, numCards, personalBest) VALUES (?, ?, 0, 0)",
        [title, group_name],
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
  

/**
 * Card operations
 */
export const initializeCardDatabase = (callback) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS cards (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          question TEXT,
          answer TEXT,
          card_set_id INTEGER,
          FOREIGN KEY (card_set_id) REFERENCES card_sets (id) ON DELETE CASCADE
        );`,
        [],
        (_, results) => {
          if (results.rowsAffected >= 0) {
            console.log("Card table created successfully");            
            callback();
          } else {
            console.error("Failed to create card table");
          }
        },
        (_, error) => {
          console.error("Error creating card table:", error);
        }
      );
    });
  };

export const insertCard = (id, data, callback) => {
const { question, answer } = data;
db.transaction((tx) => {
    tx.executeSql(
    "INSERT INTO cards (question, answer, card_set_id) VALUES (?, ?, ?)",
    [question, answer, id],
    (_, results) => {
        if (results.rowsAffected > 0) {
        console.log("Card inserted successfully");
        // Update numCards value in the associated card set
        updateCardSetNumCards(id);
        callback();
        } else {
        console.error("Failed to insert card");
        }
    },
    (_, error) => {
        console.error("Error inserting card:", error);
    }
    );
});
};

export const fetchCardsBySet = (cardSetId, callback) => {
db.transaction((tx) => {
    tx.executeSql(
        "SELECT * FROM cards WHERE card_set_id = ?",
        [cardSetId],
    (_, { rows }) => {
        const data = [];
        for (let i = 0; i < rows.length; i++) {
        data.push(rows.item(i));
        }
        callback(data);
    },
    (_, error) => {
        console.error("Error fetching cards for card set:", error);
    }
    );
});
};

export const removeCard = (setId, cardId, callback) => {
db.transaction((tx) => {
    tx.executeSql(
    "DELETE FROM cards WHERE id = ?",
    [cardId],
    (_, results) => {
        if (results.rowsAffected > 0) {
        console.log(`Card with ID ${cardId} removed successfully`);
        // Update numCards value in the associated card set
        updateCardSetNumCards(setId, -1); // Increment by 1
        callback();
        } else {
        console.error(`Failed to remove card with ID ${cardId}`);
        }
    },
    (_, error) => {
        console.error("Error removing card:", error);
    }
    );
});
};

export const updateCard = (id, data, callback) => {
const { question, answer } = data;

db.transaction((tx) => {
    tx.executeSql(
    "UPDATE cards SET question = ?, answer = ? WHERE id = ?",
    [question, answer, id],
    (_, results) => {
        if (results.rowsAffected > 0) {
        console.log(`Card with ID ${id} updated successfully`);
        callback();
        } else {
        console.error(`Failed to update card with ID ${id}`);
        }
    },
    (_, error) => {
        console.error("Error updating card:", error);
    }
    );
});
};
  
  