
export default{
    Palette :{ 
      height: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    colors:{
      height:"90%",
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
        backgroundColor: "black",
        position: "relative",
        "& a":{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100px",
          height: "30px",
          display: "inline-block",
          marginLeft: "-50px",
          marginTop: "-15px",
          textAlign: "center",
          outline: "none",
          background: "rgba(255,255,255,0.3)",
          fontSize: "1rem",
          lineHeight: "30px",
          color:"white",
          textTransform: "uppercase",
          border:"none",
          textDecoration: "none",
        }
    }
  }