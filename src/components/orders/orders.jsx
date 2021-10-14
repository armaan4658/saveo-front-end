import { useContext , useState} from 'react'
import {Orders , OrdLoading} from '../../App'
import './orders.scss';
import {FullScreenDialog} from './dialog';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
export const OrdersComponent = () => {
    const orders = useContext(Orders);
    const ordLoading = useContext(OrdLoading);
    const data = orders;
    const [open, setOpen] = useState(false);
    
    const heroku = 'https://saveo-task-back-end-ak.herokuapp.com';
    const [details,setDetails] = useState([]);
    const handleClickOpen = (id) => {
      axios.get(`${heroku}/getorder/${id}`)
      .then(res=>{
          if(res.status===200){
              setDetails(res.data);
          }
      })
      .catch(res=>console.log(res))
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    return(
        <div className="orders">
            <div>
                {ordLoading ? <LinearProgress/>:''}
                <h3>Order Id</h3>
                {ordLoading===false && data.length > 0 ? (
                    <ul>
                        {data.map(e=><li onClick={()=>handleClickOpen(e._id)}>{e._id}</li>)}
                    </ul>
                ): <h2>No orders</h2>}
                <FullScreenDialog open={open} handleClose={handleClose} details={details}/>
            </div>
        </div>
    )
}