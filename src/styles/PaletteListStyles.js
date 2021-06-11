export default { 
    root: {
      backgroundColor: "blue",
      height: "120vh",
      display: "flex",
      alignItems:"flex-start",
      justifyContent:"center"
    },
    container:{
      width:"50%",
      display:"flex",
      alignItems:"flex-start",
      flexDirection:"column",
      flexWrap:"wrap"
    },
    nav:{
      display:"flex",
      width:"100%",
      justifyContent:"space-between",
      color:"white"
    },
    palettes:{
      boxSizing :"border-box",
      width:"100%",
      // 30% 5% 30% 5% 30% = 100 %
      display:"grid",
      gridTemplateColumns:"repeat(3,30%)",
      gridGap:"5%"
    }
  };