import { makeStyles } from "@material-ui/core/styles"
export default makeStyles({
  
  h1: {
    marginTop: "10px",
    color: "black",
    fontSize: "25px",
    paddingBottom: "10px",
    borderBottom: "1px solid rgb(79, 98, 148)"
  },

  form: {
    maxWidth: "800px",
    margin: "0 auto"
  },
  
  p: {
    color: "#bf1650",
    textAlign: "center"
  },
  
  input: {
    display: "block",
    boxSizing: "border-box",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid black",
    padding: "10px 15px",
    marginBottom: "10px",
    fontSize: "14px"
  },
  
  label: {
    lineHeight: "2",
    textAlign: "left",
    display: "block",
    marginBottom: "13px",
    marginTop: "20px",
    color: "black",
    fontSize: "14px",
    fontWeight: "200",
  },
  
  submitButton: {
    background: "#ec5990",
    color: "black",
    textTransform: "uppercase",
    border: "none",
    marginTop: "40px",
    padding: "20px",
    fontSize: "16px",
    fontWeight: "100",
    letterSpacing: "10px",
    display: "block",
    appearance: "none",
    borderRadius: "4px",
    width: "100%",
  },

  container: {
    backgroundColor:"#2f3956",
    marginTop:"100px",
    paddingBottom:"30px",
    paddingTop:"20px",
    borderRadius:"25px",
  },
  
  dropdown:{
    width: "50%"
  }
})