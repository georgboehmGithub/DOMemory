import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("mydb.db");

/**
 * Card set operations
 */
export const initializeSetDatabase = (callback) => {
  db.transaction((tx) => {
    // Create the card_sets and personal_bests tables
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS card_sets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                group_name TEXT,
                numCards INTEGER,
                personalBest REAL,
                description TEXT
              );`,
      [],
      (_, results) => {
        if (results.rowsAffected >= 0) {
          // After creating the card_sets table, create the personal_bests table
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS personal_bests (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    card_set_id INTEGER,
                    personal_best REAL,
                    FOREIGN KEY (card_set_id) REFERENCES card_sets (id) ON DELETE CASCADE
                  );`,
            [],
            (_, pbResults) => {
              if (pbResults.rowsAffected >= 0) {
                callback();
              } else {
                console.error("Failed to create personal bests table");
              }
            },
            (_, pbError) => {
              console.error("Error creating personal bests table:", pbError);
            }
          );
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

export const fetchCardSetById = (id, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM card_sets WHERE id = ?",
      [id],
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
            } else {
              console.error(
                `Failed to update numCards for card set with ID ${cardSetId}`
              );
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

export const updatePersonalBest = (cardSetId, newPersonalBest, callback) => {
  db.transaction((tx) => {
    // Update the personalBest field in the card_sets table
    tx.executeSql(
      "UPDATE card_sets SET personalBest = ? WHERE id = ?",
      [newPersonalBest, cardSetId],
      (_, results) => {
        if (results.rowsAffected > 0) {
          // Create a new entry in the personal_bests table
          tx.executeSql(
            "INSERT INTO personal_bests (card_set_id, personal_best) VALUES (?, ?)",
            [cardSetId, newPersonalBest],
            (_, pbResults) => {
              if (pbResults.rowsAffected > 0) {
                if (callback) {
                  callback();
                }
              } else {
                console.error(
                  `Failed to insert personal best for card set with ID ${cardSetId}`
                );
              }
            },
            (_, pbError) => {
              console.error("Error inserting personal best:", pbError);
            }
          );
        } else {
          console.error(
            `Failed to update personal best for card set with ID ${cardSetId}`
          );
        }
      },
      (_, error) => {
        console.error("Error updating personal best for card set:", error);
      }
    );
  });
};

export const resetSetProgress = (cardSetId, callback) => {
  db.transaction((tx) => {
    // Delete all existing entries for the given cardSetId in personal_bests
    tx.executeSql(
      "DELETE FROM personal_bests WHERE card_set_id = ?",
      [cardSetId],
      (_, deleteResults) => {
        if (deleteResults.rowsAffected >= 0) {
          // Insert a new entry in the personal_bests table with a personal best of 0
          tx.executeSql(
            "INSERT INTO personal_bests (card_set_id, personal_best) VALUES (?, 0)",
            [cardSetId],
            (_, pbResults) => {
              if (pbResults.rowsAffected > 0) {
                if (callback) {
                  callback();
                }
              } else {
                console.error(
                  `Failed to reset progress for card set with ID ${cardSetId}`
                );
              }
            },
            (_, pbError) => {
              console.error("Error inserting personal best:", pbError);
            }
          );
        } else {
          console.error(
            `Failed to reset progress for card set with ID ${cardSetId}`
          );
        }
      },
      (_, deleteError) => {
        console.error("Error deleting personal bests:", deleteError);
      }
    );
  });
};

export const fetchPersonalBests = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM personal_bests",
      [],
      (_, { rows }) => {
        const personalBests = [];
        for (let i = 0; i < rows.length; i++) {
          personalBests.push(rows.item(i));
        }
        callback(personalBests);
      },
      (_, error) => {
        console.error("Error fetching personal bests:", error);
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
          // Delete all related entries in personal_bests for the same card set ID
          tx.executeSql(
            "DELETE FROM personal_bests WHERE card_set_id = ?",
            [id],
            (_, pbResults) => {
              if (pbResults.rowsAffected >= 0) {
                if (callback) {
                  callback();
                }
              } else {
                console.error(
                  `Failed to remove personal bests for card set with ID ${id}`
                );
              }
            },
            (_, pbError) => {
              console.error("Error removing personal bests:", pbError);
            }
          );
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
  const { title, group_name, description } = data;

  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO card_sets (title, group_name, numCards, personalBest, description) VALUES (?, ?, 0, 0, ?)",
      [title, group_name, description],
      (_, results) => {
        if (results.rowsAffected > 0) {
          // Insert an initial personal best record with a value of 0
          const cardSetId = results.insertId;
          tx.executeSql(
            "INSERT INTO personal_bests (card_set_id, personal_best) VALUES (?, 0)",
            [cardSetId],
            (_, pbResults) => {
              // If insertion was successful, invoke the callback to notify the component
              callback();
            },
            (_, pbError) => {
              console.error("Failed to insert personal best record:", pbError);
            }
          );
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
  const { title, group_name, numCards, personalBest, description } = data;

  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE card_sets SET title = ?, group_name = ?, numCards = ?, personalBest = ?, description = ? WHERE id = ?",
      [title, group_name, numCards, personalBest, description, id],
      (_, results) => {
        if (results.rowsAffected > 0) {
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
    // Create the cards table
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
          callback();
        } else {
          console.error("Failed to create cards table");
        }
      },
      (_, error) => {
        console.error("Error creating cards table:", error);
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
