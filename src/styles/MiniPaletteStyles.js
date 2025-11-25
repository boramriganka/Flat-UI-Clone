export default {
    root: {
        backgroundColor: "#2a2a2a",
        border: "1px solid #444",
        borderRadius: "8px",
        padding: "1rem",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
            transform: "scale(1.03)",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
        },
        "&:hover $deleteIcon": {
            opacity: 1
        }
    },
    colors: {
        backgroundColor: "#333",
        height: "150px",
        width: "100%",
        borderRadius: "5px",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gridTemplateRows: "repeat(4, 1fr)",
    },
    miniColor: {
        height: "100%",
        width: "100%",
    },
    title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0.75rem 0 0 0",
        color: "#e0e0e0",
        paddingTop: "0.5rem",
        fontSize: "1rem",
    },
    emoji: {
        marginLeft: "0.5rem",
        fontSize: "1.3rem",
    },
    deleteIcon: {
        color: "#ffffff",
        backgroundColor: "#eb3d30",
        width: "20px",
        height: "20px",
        position: "absolute",
        right: "0px",
        top: "0px",
        padding: "5px",
        zIndex: 10,
        opacity: 0,
        borderBottomLeftRadius: "5px",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
            transform: "scale(1.3)"
        }
    }
};