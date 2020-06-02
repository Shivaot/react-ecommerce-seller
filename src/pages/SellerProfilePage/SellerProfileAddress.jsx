import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';

const SellerProfileAddress = ({ token }) => {
    const [addId,setAddId] = useState("");
    const [country,setCountry] = useState("");
    const [state,setState] = useState("");
    const [city,setCity] = useState("");
    const [zipCode,setZipCode] = useState("");
    const [address,setAddress] = useState("");
    const [success,setSuccess] = useState(false);

    useEffect(() => {
        const headers = {
            'Authorization': 'Bearer' + token
        }
        axios.get('seller/profile',{ headers: headers })
            .then(response => {
                console.log(response.data.address);  
                setAddId(response.data.address.id);
                setCountry(response.data.address.country);
                setState(response.data.address.state);
                setCity(response.data.address.city);
                setZipCode(response.data.address.zipCode);
                setAddress(response.data.address.address);
            })
            .catch(error => {
                console.log(error.response);
            })
    },[token])
    const countryChangeHandler = (e) => setCountry(e.target.value);
    const stateChangeHandler = (e) => setState(e.target.value);
    const cityChangeHandler = (e) => setCity(e.target.value);
    const zipCodeChangeHandler = (e) => setZipCode(e.target.value);
    const addressChangeHandler = (e) => setAddress(e.target.value);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        setSuccess(false);
        const postData = {
            "state":state,
            "city":city,
            "zipCode":zipCode,
            "address":address,
            "country":country,
        }
        const headers = {
			Authorization: 'Bearer' + token
        }
        axios.put('/seller/profile/updateAddress/'+addId,postData,{headers: headers })
            .then(response => {
                console.log(response.data);
                setSuccess(true);
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data)
                }
            })
        setCountry("");
        setState("")
        setCity("");
        setZipCode("");
        setAddress("");
    }

    if (success) {
        return <p>Address Updated</p>
    }

    return (
     <>
         <h3>Update address</h3>
         <div className="card" style={{marginTop: "5%",width:"70%",marginLeft:"15%",boxShadow: "1px 2px 2px grey"}}>
              <div className="card-body" style={{marginRight: "15%"}}>
                    <form onSubmit={formSubmitHandler}>
                    <div className="form-group row">
                         <input className="form-control"  type="text" value={country} onChange={countryChangeHandler} placeholder="Country" required style={{marginLeft: "22%"}}/>
                   </div>
                    <div className="form-group row">
                        <input className="form-control"  type="text" value={state} onChange={stateChangeHandler} placeholder="State" required style={{marginLeft: "22%"}}/>
                    </div>
                    <div className="form-group row">
                           <input className="form-control"  type="text" value={city} onChange={cityChangeHandler} placeholder="City" required style={{marginLeft: "22%"}}/>
                     </div>
                       <div className="form-group row">
                                       <input className="form-control"  type="text" value={zipCode} onChange={zipCodeChangeHandler} placeholder="Zip Code" required style={{marginLeft: "22%"}}/>
                               </div>
                               <div className="form-group row">
                                       <input className="form-control"  type="text" value={address} onChange={addressChangeHandler} placeholder="Full Address" required style={{marginLeft: "22%"}}/>
                               </div>
                                      
                     <div className="form-group row" style={{marginLeft:"30%"}}>
                           <div className="col-lg-9">
                                 <button type="Submit" className="btn btn-primary" >Submit</button>
                           </div>
                    </div>
                    </form>
              </div>
         </div>
     </>
    );
};

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(SellerProfileAddress);