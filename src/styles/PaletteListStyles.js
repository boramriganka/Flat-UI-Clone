export default { 
    root: {
    backgroundColor: "#121212",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 0",
    fontFamily: "'Roboto', sans-serif",
  },
  container: {
    width: "70%",
    maxWidth: "1200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  nav: {
      display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    paddingBottom: "1.5rem",
    borderBottom: "1px solid #333",
    marginBottom: "2rem",
    },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gridGap: "1.5rem",
  },
  newPaletteButton: {
    backgroundColor: "#64B5F6", // Blue color matching our theme
    color: "white",
    fontWeight: "500",
    borderRadius: "4px",
    padding: "0.5rem 1rem",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#42A5F5", // Slightly darker blue on hover
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      transform: "translateY(-2px)",
    },
  },
  };