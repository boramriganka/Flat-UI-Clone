export default {
    Navbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      height: "6vh",
      backgroundColor: "#1a1a1a",
      padding: "0 1rem",
      boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    },  
    logo: {
      marginRight: "15px",
      padding: "0 13px",
      fontSize: "18px",
      fontFamily: "'Roboto', sans-serif",
      fontWeight: "500",
      height: "100%",
      display: "flex",
      alignItems: "center",
      "& a": {
        textDecoration: "none",
        color: "#f5f5f5",
        transition: "color 0.3s ease",
        "&:hover": {
          color: "#64B5F6",
        },
      },
    },
    slider: {
      width: "340px",
      margin: "0 20px",
      display: "inline-block",
      "& .rc-slider-track": {
        backgroundColor: "#64B5F6",
      },
      "& .rc-slider-rail": {
        height: "6px",
        backgroundColor: "#444",
        borderRadius: "3px",
      },
      "& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:focus, .rc-slider-handle:hover": {
        backgroundColor: "#64B5F6",
        outline: "none",
        border: "2px solid #64B5F6",
        boxShadow: "0 0 0 4px rgba(100, 181, 246, 0.2)",
        width: "16px",
        height: "16px",
        marginLeft: "-8px",
        marginTop: "-5px",
        transition: "box-shadow 0.2s ease-in-out",
      },
    },
    selectContainer: {
      marginLeft: "auto",
      marginRight: "1rem",
      "& .MuiSelect-select": {
        color: "#f5f5f5",
        fontSize: "0.9rem",
        padding: "0.5rem 1rem",
      },
      "& .MuiInput-underline:before": {
        borderBottom: "1px solid #555",
      },
      "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
        borderBottom: "2px solid #64B5F6",
      },
    },
    iconButton: {
      color: "#f5f5f5",
      marginLeft: "0.5rem",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "rgba(100, 181, 246, 0.1)",
        color: "#64B5F6",
      },
    },
  };