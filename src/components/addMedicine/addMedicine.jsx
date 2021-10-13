// import { Button, Grid } from '@material-ui/core';
import axios from 'axios';
import {GetMedicines} from '../../App';
import React, { useContext, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import './demo.css';
import './addMedicine.scss';

export function AddMedicine(){
  const [file,setFile] = useState(null);
  const [loading,setLoading] = useState(false);
  const onInputChange = (e) => {
      setFile(e.target.files[0]);
  }
  const heroku = 'https://saveo-task-back-end-ak.herokuapp.com';
  const [msg,setMsg] = useState("");
  const getMedicines = useContext(GetMedicines);
  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = new FormData();
    data.append('file',file);
    axios.post(`${heroku}/uploadCSV`,data,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(res=>{
        if(res.status===200){
            setLoading(false);
            setMsg(res.data);
            if(res.data==="uploaded"){
              getMedicines();
            }
        }
    })
  }
  const hideMsg = () => {
      setTimeout(() => {
          setMsg("");
      }, 1000*7);
  }
  return (
    <div className="addMedicine">
        <h2>upload CSV file</h2>
        {loading ? <LinearProgress/> : ''}
        {msg.length > 0 && msg !== "uploaded" ? msg : ''}
        {msg.length > 0 && msg === "uploaded" ? 'file uploaded successfully' : ''}
        {msg.length > 0 ? hideMsg() : ''}
        <div>
          <form method="post" action="#" id="#" onSubmit={onSubmit}>
               <div class="form-group files" style={{width:'65vw'}}>
                 {/* <label>Upload CSV File </label> */}
                 <input 
                 type="file" 
                 class="form-control" 
                 multiple=""
                 onChange={onInputChange}
                 />
               </div>
               <button type="submit" variant="contained" color="secondary">
                    Submit
                </button>
           </form>
        </div>
    </div>
  );
};