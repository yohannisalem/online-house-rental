import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
const Private = () => {
  let history = useHistory()
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
    useEffect(() => {
      if(!localStorage.getItem("landlordToken")){
        history.push("/landlordLogin")
      }
        const fetchPrivateDate = async () => {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("landlordToken")}`,
            },
          };
    
          try {
            const { data } = await axios.get("http://localhost:5000/api/private", config);
            setPrivateData(data.data);
          } catch (error) {
            
            setError("You are not authorized please login");
          }
        };
    
        fetchPrivateDate();
      }, [history]);
      const logoutHandler=()=>{
        localStorage.removeItem("landlordToken")
        history.push("/landlordLogin")
      }
      return error ? (
        <span className="error-message">{error}</span>
      ) : (
        <div style={{marginTop:"200px"}}>
        <div>{privateData}</div>
        <button onClick={logoutHandler}>logout</button>
        </div>
      );
}

export default Private
