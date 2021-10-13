import './topbar.scss';
import {Switch , Link , Route} from 'react-router-dom';
import {MedicinesComponent} from '../medicines/medicines';
import {AddMedicine} from '../addMedicine/addMedicine';
import {OrdersComponent} from '../orders/orders';
import {PlaceOrder} from '../placeOrder/placeOrder';
export const TopBar = () => {
    return(
        <>
        <ul className="topbar">
            <li><Link to='/'> Medicines </Link></li>
            <li><Link to='/addmedicine'> Add medicines </Link></li>
            <li><Link to='/placeorder'> Place order </Link></li>
            <li><Link to='/orders'> Orders </Link></li>
        </ul>
        <Switch>
            <Route exact path="/">
                <MedicinesComponent/>
            </Route>
            <Route path="/addmedicine">
                <AddMedicine />
            </Route>
            <Route path="/placeorder">
                <PlaceOrder/>
            </Route>
            <Route path="/orders">
                <OrdersComponent/>
            </Route>
        </Switch>
        </>
    )
}