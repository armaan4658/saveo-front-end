import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import {TopBar} from './components/topbar/topbar';

export const GetOrder = React.createContext(null);
export const GetMedicines = React.createContext(null);
export const MedLoading = React.createContext(null);
export const OrdLoading = React.createContext(null);
export const Medicines = React.createContext(null);
export const Orders = React.createContext(null);
export const Order = React.createContext(null);
export const SetOrder = React.createContext(null);
function App() {
  const [medicines,setMedicines] = useState([]);
  const [orders,setOrders] = useState([]);
  const [order,setOrder] = useState([]);
  const [medLoading,setMedLoading] = useState(false);
  const [ordLoading,setOrdLoading] = useState(false);

  const heroku = 'https://saveo-task-back-end-ak.herokuapp.com';
  const getMedicines = () => {
    setMedLoading(true);
    axios.get(`${heroku}/searchMedicine`)
    .then(res=>{
      if(res.status===200){
        setMedicines(res.data);
        setMedLoading(false);
      }
    })
    .catch(res=>console.log(res))
  }
  const getOrder = () => {
    setOrdLoading(true);
    axios.get(`${heroku}/getorder`)
    .then(res=>{
      if(res.status===200){
        setOrders(res.data);
        setOrdLoading(false);
      }
    })
    .catch(res=>console.log(res))
  }
  try{
    useEffect(function(){
        getMedicines();
        getOrder();
    },[])
  }catch(e){
    console.log(e);
  }
  return (
    <div className="App">
      <GetOrder.Provider value={getOrder}>
        <GetMedicines.Provider value={getMedicines}>
          <MedLoading.Provider value={medLoading}>
            <OrdLoading.Provider value={ordLoading}>
              <Medicines.Provider value={medicines}>
                <Orders.Provider value={orders}>
                  <Order.Provider value={order}>
                    <SetOrder.Provider value={setOrder}>
                      <TopBar/>
                    </SetOrder.Provider>
                  </Order.Provider>
                </Orders.Provider>
              </Medicines.Provider>
            </OrdLoading.Provider>
          </MedLoading.Provider>
        </GetMedicines.Provider>
      </GetOrder.Provider>
    </div>
  );
}

export default App;
