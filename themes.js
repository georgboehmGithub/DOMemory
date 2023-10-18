export const LIGHT_THEME = {
  tabBarActiveTintColor: "black",
  tabBarInactiveTintColor: "grey",
  background: "lavender",
  text: "#000000",
  // Other styles

  HELP: {
    container: {
      flex: 1,
      backgroundColor: "lavender",
    },
    DESCRIPTION: {
      container: {
        marginTop: 10,
        padding: 15,
      },
      title: {
        fontWeight: "bold",
        fontSize: 30,
        textDecorationLine: "underline",
        marginBottom: 5,
      },
      description: {
        fontSize: 15,
      },
    },
  },
  SETTINGS: {
    container: {
      flex: 1,
      backgroundColor: "lavender",
    },
    title: {
      fontWeight: "bold",
      fontSize: 30,
      padding: 15,
    },
  },
  SETOVERVIEW: {
    container: {
      backgroundColor: "lavender",
      flex: 1,
    },
    addSetButton: {
      backgroundColor: "white",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      marginTop: 16,
      marginBottom: 16,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      color: "black",
    },
    addSetButtonText: {
      color: "black",
      fontSize: 16,
      marginLeft: 10,
    },
    addSetButtonIcon: {
      color: "black",
    },

    SET: {
      container: {
        marginLeft: 10,
        margin: 8,
        padding: 16,
        width: "45%",
        height: 230,
        borderRadius: 10,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // For Android
      },
      title: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
      },
      groupNameText: {
        color: "grey",
        fontSize: 16,
      },
      descriptionContainer: {
        flex: 1,
      },
      descriptionText: {
        color: "black",
      },
      numCardsText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "black",
      },
      personalBestText: {
        fontSize: 14,
        color: "black",
      },
      settingIcon: {
        color: "black",
      },
    },
  },
  CARDOVERVIEW: {
    container: {
      flex: 1,
      backgroundColor: "lavender",
    },
    addButton: {
      backgroundColor: "white",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      marginTop: 16,
      marginBottom: 16,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    addButtonText: {
      color: "black",
      fontSize: 16,
      marginLeft: 10,
    },
    sessionButton: {
      backgroundColor: "white",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      marginTop: 16,
      marginBottom: 16,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    question: {
      fontSize: 14,
      color: "black",
      fontWeight: "bold",
    },
    buttonContainer: {
      flexDirection: "row",
      margin: 8,
      gap: 4,
    },
    buttonIcon: {
      color: "black",
    },
    CARD: {
      cardContainer: {
        padding: 16,
        margin: 8,
        width: "95%",
        borderRadius: 10,
        borderColor: "grey",
        alignItems: "center",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        flex: 1,
        flexDirection: "row",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: "space-between",
      },
      settingsIcon: {
        color: "black",
      },
      text: {
        color: "black",
        fontWeight: "bold",
      },
    },
  },
  SESSION: {
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "lavender",
    },
    flipButton: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "white",
      padding: 10,
      borderRadius: 30,
    },
    flipButtonIcon: {
      color: "black",
    },
    correctButton: {
      alignItems: "center",
      flex: 1,
      backgroundColor: "#32cd32",
      justifyContent: "center",
      padding: 10,
      width: 80,
      height: 80,
      borderRadius: 100,
    },
    wrongButton: {
      alignItems: "center",
      flex: 1,
      backgroundColor: "#dc143c",
      justifyContent: "center",
      padding: 10,
      width: 80,
      height: 80,
      borderRadius: 100,
    },
    progressBar: {
      color: "white",
    },
    pogText: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#ff00ff",
    },
    pogPersonalBest: {
      fontSize: 36,
      fontWeight: "bold",
      color: "purple",
      marginBottom: 30,
    },
    finishSessionButton: {
      color: "black",
    },
    text: {
      color: "black",
      fontWeight: "bold",
    },
  },
  STATS: {
    container: {
      lexDirection: "column",
      flex: 1,
      backgroundColor: "lavender",
    },
    title: {
      color: "black",
      fontWeight: "bold",
      padding: 10,
      fontSize: 20,
    },
    chartContainer: {
      backgroundColor: "white",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      paddingHorizontal: 10, // Add horizontal padding
      width: 375,
      height: 200,
      borderRadius: 10,
      backgroundColor: "white",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5, // For Android
      position: "relative", // Needed for absolute positioning of horizontal lines
    },
    dataPoint: {
      width: 20,
      marginBottom: 5,
      backgroundColor: "black",
      borderRadius: 40,
    },
  },
};

export const DARK_THEME = {
  tabBarActiveTintColor: "white",
  tabBarInactiveTintColor: "wheat",
  background: "midnightblue",
  text: "#FFFFFF",
  // Other styles
  // Help page
  HELP: {
    container: {
      flex: 1,
      backgroundColor: "midnightblue",
    },
    DESCRIPTION: {
      container: {
        marginTop: 10,
        padding: 15,
      },
      title: {
        fontWeight: "bold",
        fontSize: 30,
        textDecorationLine: "underline",
        marginBottom: 5,
        color: "white",
      },
      description: {
        fontSize: 15,
        color: "white",
      },
    },
  },
  SETTINGS: {
    container: {
      flex: 1,
      backgroundColor: "midnightblue",
    },
    title: {
      fontWeight: "bold",
      fontSize: 30,
      padding: 15,
      color: "white",
    },
  },
  SETOVERVIEW: {
    container: {
      backgroundColor: "midnightblue",
      flex: 1,
    },
    addSetButton: {
      backgroundColor: "mediumslateblue",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      marginTop: 16,
      marginBottom: 16,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    addSetButtonText: {
      color: "white",
      fontSize: 16,
      marginLeft: 10,
    },
    addSetButtonIcon: {
      color: "white",
    },

    SET: {
      container: {
        marginLeft: 10,
        margin: 8,
        padding: 16,
        width: "45%",
        height: 250,
        borderRadius: 10,
        backgroundColor: "mediumslateblue",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // For Android
      },
      title: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
      },
      groupNameText: {
        color: "wheat",
        fontSize: 16,
      },
      descriptionContainer: {
        flex: 1,
      },
      descriptionText: {
        color: "white",
      },
      numCardsText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
      },
      personalBestText: {
        fontSize: 14,
        color: "white",
      },
      settingIcon: {
        color: "white",
      },
    },
  },
  CARDOVERVIEW: {
    container: {
      flex: 1,
      backgroundColor: "midnightblue",
    },
    addButton: {
      backgroundColor: "mediumslateblue",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      marginTop: 16,
      marginBottom: 16,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    addButtonText: {
      color: "white",
      fontSize: 16,
      marginLeft: 10,
    },
    sessionButton: {
      backgroundColor: "mediumslateblue",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      marginTop: 16,
      marginBottom: 16,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    question: {
      fontSize: 14,
      color: "white",
      fontWeight: "bold",
    },
    buttonContainer: {
      flexDirection: "row",
      margin: 8,
      gap: 4,
    },
    buttonIcon: {
      color: "white",
    },
    CARD: {
      cardContainer: {
        padding: 16,
        margin: 8,
        width: "95%",
        borderRadius: 10,
        borderColor: "grey",
        alignItems: "center",
        backgroundColor: "mediumslateblue",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        flex: 1,
        flexDirection: "row",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: "space-between",
      },
      settingsIcon: {
        color: "white",
      },
      text: {
        color: "white",
        fontWeight: "bold",
      },
    },
  },
  SESSION: {
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "midnightblue",
    },
    flipButton: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "wheat",
      padding: 10,
      borderRadius: 30,
    },
    flipButtonIcon: {
      color: "black",
    },
    correctButton: {
      alignItems: "center",
      flex: 1,
      backgroundColor: "#32cd32",
      justifyContent: "center",
      padding: 10,
      width: 80,
      height: 80,
      borderRadius: 100,
    },
    wrongButton: {
      alignItems: "center",
      flex: 1,
      backgroundColor: "#dc143c",
      justifyContent: "center",
      padding: 10,
      width: 80,
      height: 80,
      borderRadius: 100,
    },
    progressBar: {
      color: "wheat",
    },
    pogText: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#ff00ff",
    },
    pogPersonalBest: {
      fontSize: 36,
      fontWeight: "bold",
      color: "purple",
      marginBottom: 30,
    },
    finishSessionButton: {
      color: "white",
    },
    text: {
      color: "white",
      fontWeight: "bold",
    },
  },
  STATS: {
    container: {
      lexDirection: "column",
      flex: 1,
      backgroundColor: "midnightblue",
    },
    title: {
      color: "white",
      fontWeight: "bold",
      padding: 10,
      fontSize: 20,
    },
    chartContainer: {
      backgroundColor: "mediumslateblue",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      paddingHorizontal: 10, // Add horizontal padding
      width: 375,
      height: 200,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5, // For Android
      position: "relative", // Needed for absolute positioning of horizontal lines
    },
    dataPoint: {
      width: 20,
      marginBottom: 5,
      backgroundColor: "white",
      borderRadius: 40,
    },
  },
};
