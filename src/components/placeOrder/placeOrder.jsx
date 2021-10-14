import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import { useContext, useState } from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import './placeOrder.scss';
import {GetOrder,Order,SetOrder} from '../../App';
import LinearProgress from '@mui/material/LinearProgress';

export const PlaceOrder = () => {
    const validationSchema = Yup.object().shape({
        c_unique_id : Yup.string().required(),
        quantity : Yup.number().required(),
        c_name: Yup.string().required()
    })

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({resolver:yupResolver(validationSchema)})
    const order = useContext(Order);
    const setOrder = useContext(SetOrder);
    const onSubmit = (data) => {
        setOrder([...order,data]);
    }
    
    const heroku = 'https://saveo-task-back-end-ak.herokuapp.com';
    const [loading,setLoading] = useState(false);
    const [msg,setMsg] = useState("");
    const getOrder = useContext(GetOrder);
    const placeOrder = () => {
        if(order.length > 0){
            setLoading(true)
            axios.post(`${heroku}/placeorder`,order)
            .then(res=>{
                if(res.status===200){
                    try{
                        if(res.data._id.length > 0){
                            setOrder([]);
                            setMsg("Order placed successfully");
                            getOrder();
                        }
                    }catch(e){
                        console.log(e);
                    }
                    if(typeof(res.data)==="string"){
                        setMsg(res.data);
                    }
                }
            })
            .catch(res=>console.log(res))
            setLoading(false);
        }
    }
    const hideMsg = () => {
        setTimeout(() => {
            setMsg("");
        }, 1000*6);
    }
    return(
        <div className="placeOrder">
            {loading ? <LinearProgress/> : ''}
            {order.length > 0 ? (
                <div className="wrapper">
                    {order.map(e=>(
                        <ul>
                            <li> {e.c_unique_id} </li>
                            <li> {e.quantity} </li>
                            <li> {e.c_name} </li>
                        </ul>
                    ))}
                </div>
            ):''}
            <div className="form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField 
                    variant="outlined"
                    label="c_unique_id"
                    {...register("c_unique_id")}
                    />
                    {errors.c_unique_id && (<p> {errors.c_unique_id.message} </p>)}
                    <TextField 
                    variant="outlined"
                    label="quantity"
                    type="number"
                    {...register("quantity")}
                    />
                    {errors.quantity && (<p> {errors.quantity.message} </p>)}
                    <TextField 
                    variant="outlined"
                    label="c_name"
                    {...register("c_name")}
                    />
                    {errors.c_name && (<p> {errors.c_name.message} </p>)}
                    <Button 
                    type="submit" 
                    variant="outlined"
                    endIcon={<CheckIcon/>}
                    > Add </Button>
                </form>
            </div>
            <Button
            onClick={placeOrder}
            >
                Placeorder
            </Button>
            {msg.length > 0 ? msg : ''}
            {msg.length > 0 ? hideMsg() : ''}
        </div>
    )
}