export default {
    Palette :{ 
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#121212",
    },
    colors:{
      height:"90%",
      overflow: "hidden",
    },
    goBack:{
        width : "20%",
        // showingfullpalette true: showing all colors of pallete
        // else show only shades
        height: "50%",
        margin : "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        fontSize: "20px",
        opacity: 1,
        backgroundColor: "#333",
        transition: "background-color 0.3s ease",
        "&:hover": {
          backgroundColor: "#444",
        },
    },
    backButton: {
          position: "absolute",
          top: "50%",
          left: "50%",
        width: "120px",
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "-60px",
        marginTop: "-18px",
          outline: "none",
          background: "rgba(255,255,255,0.3)",
          fontSize: "1rem",
        color: "white",
          textTransform: "uppercase",
        border: "none",
        borderRadius: "4px",
          textDecoration: "none",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          background: "rgba(255,255,255,0.4)",
          transform: "scale(1.05)",
        }
    },
    backIcon: {
        marginRight: "0.5rem",
        fontSize: "1.2rem",
    }
  }