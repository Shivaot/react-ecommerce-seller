import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios';
import { NavLink } from 'react-router-dom';

const SellerProfilePage = (props) => {
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [contact,setContact] = useState("");
    const [image,setImage] = useState("");
    const [gst,setGst] = useState("");
    const [companyName,setCompanyName] = useState("");
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    useEffect(() => {
        const headers = {
			Authorization: 'Bearer' + props.token
        }
		axios.get('seller/profile',{ headers: headers })
			.then(response => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setContact(response.data.companyContact);
                setImage(response.data.image);
                setGst(response.data.gst);
                setCompanyName(response.data.companyName);
			})
			.catch(error => {
                console.log(error.response.data.error);
			});
    },[props.token])

    const firstNameChangeHandler = (e) => {
        setFirstName(e.target.value)
    }

    const lastNameChangeHandler = (e) => {
        setLastName(e.target.value)
    }

    const contactChangeHandler = (e) => {
        setContact(e.target.value)
    }

    const gstChangeHandler = (e) => {
        setGst(e.target.value);
    }

    const companyNameChangeHandler = (e) => {
        setCompanyName(e.target.value);
    }

    const imageChangeHandler = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            setImage(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        const headers = {
			  Authorization: 'Bearer' + props.token
        }
        let transformedImage = image;
        if (transformedImage && transformedImage.includes('http'))  {
          transformedImage = null;
        }
        const data = {
            "firstName": firstName,
            "lastName": lastName,
            "companyContact": contact,
            "gst":gst,
            "companyName":companyName,
            "image": transformedImage
        }
        axios.patch("seller/profile",data,{ headers: headers })
            .then(response => {
                // console.log(response.data);
                setError(null);
                setLoading(false);
            })
            .catch(error => {
                console.log(error.response.data);
                setLoading(false);
                setError(error.response.data);
            })
    }

    if (loading) {
        return  <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status"><span className="sr-only">Loading...</span></div>;
    }


    return (
<div className="container" style={{marginTop: "5%"}}> 
<div className="row flex-lg-nowrap">

  <div className="col">
    <div className="row">
      <div className="col mb-3" style={{width: "50%"}}>
        <div className="card" style={{boxShadow: "1px 2px 2px grey"}} >
          <div className="card-body">
            <div className="e-profile">
            <NavLink to="/profile/updateAddress" style={{marginLeft: "70%"}}>Update Addresses</NavLink>
              <div className="row">
                <div className="col-12 col-sm-auto mb-3">
                  <div className="mx-auto" style={{width: "140px"}}>
                    <div className="d-flex justify-content-center align-items-center rounded" style={{height: "140px", backgroundColor: "rgb(233, 236, 239)"}}>
                      <img src={image} alt="string" style={{maxWidth: "100%",maxHeight: "100%"}} />
                    </div>
                  </div>
                </div>
                <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                  <div className="text-center text-sm-left mb-2 mb-sm-0">
                    <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">{firstName+" "+ lastName}</h4>
                    <div className="mt-2">
                      <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={imageChangeHandler} />
                    </div>
                  </div>

                </div>
              </div>
              <ul className="nav nav-tabs">
                <li className="nav-item"><a href="#/" className="active nav-link">Details</a></li>
              </ul>
              <div className="tab-content pt-3">
                <div className="tab-pane active">
                  <form className="form" onSubmit={formSubmitHandler}>
                    {error ? <h3 style={{textDecorationColor: "red"}}>{error}</h3> : null }
                    <div className="col" style={{marginLeft: "10%"}}>
                            <div className="form-group" style={{width:"80%"}}>
                                <label style={{marginRight: "10%"}}>First Name</label>
                                <input className="form-control" type="text" name="name" placeholder={firstName} onChange={firstNameChangeHandler} value={firstName} /> 
                            </div>
                            <div className="form-group" style={{width:"80%"}}>
                                <label style={{marginRight: "10%"}}>Last Name</label>
                                <input className="form-control" type="text" name="name" placeholder={lastName} onChange={lastNameChangeHandler} value={lastName} /> 
                            </div>
                            <div className="form-group" style={{width:"80%"}}>
                                <label style={{marginRight: "10%"}}>Contact</label>
                                <input className="form-control" type="text" name="name" placeholder={contact} onChange={contactChangeHandler} value={contact} /> 
                            </div>
                            <div className="form-group" style={{width:"80%"}}>
                                <label style={{marginRight: "10%"}}>Company Name</label>
                                <input className="form-control" type="text" name="name" placeholder={companyName} onChange={companyNameChangeHandler} value={companyName} /> 
                            </div>
                            <div className="form-group" style={{width:"80%"}}>
                                <label style={{marginRight: "10%"}}>GST</label>
                                <input className="form-control" type="text" name="name" placeholder={gst} onChange={gstChangeHandler} value={gst} /> 
                            </div>
                            
                     </div>
                    <div className="row">
                      <div className="col d-flex justify-content-center" style={{marginRight: "3%"}}>
                        <button className="btn btn-primary" type="submit">Save Changes</button>
                      </div>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</div>
</div>
    );
};

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(SellerProfilePage);