import { useContext } from 'react';
import {Medicines , MedLoading} from '../../App';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import {StickyHeadTable} from './table'
import LinearProgress from '@mui/material/LinearProgress';
import { useState } from 'react';
import axios from 'axios';
import './medicines.scss'

export const MedicinesComponent = () => {
    const medicines = useContext(Medicines);
    const medLoading = useContext(MedLoading);
    const [searchData,setSearchData] = useState([]);
    const [search,setSearch] = useState("");
    const heroku = 'https://saveo-task-back-end-ak.herokuapp.com';
    const [loading,setLoading] = useState(false)
    const getSearchData = () => {
        if(search.length>0){
            setLoading(true)
            axios.get(`${heroku}/searchMedicine/${search}`)
            .then(res=>{
                if(res.status===200){
                    setSearchData(res.data);
                    setLoading(false);
                }
            })
        }
    }
    const data = search.length && searchData.length > 0 ? searchData : medicines;
    return(
        <div className="medicines">
            <div className="search-bar">
            <TextField
                label="search medicines"
                sx={{ m: 1, width: '25ch' }}
                onChange={e=>{
                    setSearch(e.target.value);
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">
                      <IconButton onClick={getSearchData}>
                        <SearchIcon/>
                      </IconButton>
                  </InputAdornment>,
                }}
            />
            </div>
            <div>
                {medLoading ? <LinearProgress/>:''}
                {loading ? <LinearProgress/>:''}
                {data.length > 0 ?<StickyHeadTable data={data}/>:''}
                {medLoading === false && data.length === 0 ? <h1>No data to display</h1> : '' }
            </div>
        </div>
    )
}