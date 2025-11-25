import chroma from 'chroma-js' 
export default {
    ColorBox:{
      width : "20%",
      // showingfullpalette true: showing all colors of pallete
      // else show only shades
      height: props => props.showingFullColorPalette ?"25%":"50%",
      margin : "0 auto",
      display: "inline-block",
      position: "relative",
      cursor: "pointer",
      marginBottom: "-3.5px",
      fontSize: "20px",
      transition: "transform 0.2s ease-in-out",
      "&:hover": {
        transform: "scale(1.05)",
        zIndex: "5",
      },
      "&:hover button":{
        opacity: 1,
        transform: "scale(1)",
      }
    },
    copyText : {
     color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.7)" : "white",
     fontWeight: "500",
    }, 
      
    colorName: {
      color : props => chroma(props.background).luminance() <= 0.08 ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)",
      fontWeight: "500",
    },
  
    seeMore :{
      color : props => chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.7)" : "white",
      background:"rgba(255,255,255,0.3)",
      position:"absolute",
      border :"none",
      right:"0px",
      bottom:"0px",
      width:"60px",
      height:"30px",
      textAlign:"center",
      lineHeight:"30px",
      textTransform:"uppercase",
      borderTopLeftRadius: "5px",
      transition: "all 0.3s ease",
      "&:hover": {
        background: "rgba(255,255,255,0.5)",
      }
    },
    copyButton:{
      position:" absolute",
      top:" 50%",
      left:" 50%",
      width:" 100px",
      height:" 36px",
      display:" inline-block",
      marginLeft:" -50px",
      marginTop:" -18px",
      textAlign:" center",
      outline:" none",
      background:" rgba(255,255,255,0.3)",
      fontSize:" 1rem",
      lineHeight:" 36px",
      color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.7)" : "white",
      textTransform:" uppercase",
      border:"none",
      borderRadius: "4px",
      textDecoration:" none",
      opacity: 0,
      transform: "scale(0.95)",
      transition: "all 0.2s ease-in-out",
      boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      "&:hover": {
        background: "rgba(255,255,255,0.4)",
      }
    },
    boxContent:{
      position: "absolute",
      width: "100%",
      left: "0px",
      bottom: "0px",
      padding: "10px",
      color: props => chroma(props.background).luminance() <= 0.08 ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)",
      letterSpacing: "1px",
      textTransform: "uppercase",
      fontSize: "12px",
      fontWeight: "500",
    },
    copyOverlay:{
      opacity: "0",
      zIndex: "0",
      width: "100% ",
      height: "100%",
      transition: ".6s ease-in-out",
    },
    showOverlay:{
      opacity:"1",
      transform:"scale(50)",
      zIndex: "10",
      position:"absolute"
    },
    copyMsg:{
      position: "fixed",
      left: "0",
      right: "0",
      top:"0",
      bottom : "0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "4rem",
      transform: "scale(0.1)",
      color : "white",
      opacity: "0",
      textTransform: "capitalize",
      "& h1":{
        fontWeight: "500",
        textShadow: "1px 2px rgba(0,0,0,0.5)",
        background: "rgba(255,255,255,0.3)",
        width: "100%",
        textAlign: "center",
        marginBottom: "0",
        padding: "1rem",
      },
      "& p":{
        fontSize: "2rem",
        fontWeight: "300",
        marginTop: "1rem",
      }
    },
    showMessage:{
      opacity: "1",
      transform: "scale(1)",
      zIndex: "25",
      transition: "all  0.4s ease-in-out",
      transitionDelay: "0.3s ",
    }
  }
  