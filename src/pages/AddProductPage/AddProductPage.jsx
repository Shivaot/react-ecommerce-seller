import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const AddProductPage = ({ token }) => {
    const [name,setName] = useState("");
    const [brand,setBrand] = useState("");
    const [desc,setDesc] = useState("");
    const [isReturnable,setIsReturnable] = useState("");
    const [isCancellable,setIsCancellable] = useState("");
    const [selectedCategory,setSelectedCategory] = useState("");
    const [categories,setCategories] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    // const [success,setSuccess] = useState(false);

    const nameChangeHandler = (e) => setName(e.target.value);
    const brandChangeHandler = (e) => setBrand(e.target.value);
    const descChangeHandler = (e) => setDesc(e.target.value);
    const returnableChangeHandler = (e) => setIsReturnable(e.target.value);
    const cancellableChangeHandler = (e) => setIsCancellable(e.target.value);
    const categoryChangeHandler = (e) => setSelectedCategory(e.target.value);

    useEffect(() => {
        setError(false)
        const headers = {
			Authorization: "Bearer" + token,
        };
        axios.get("seller/profile/categories",{ headers: headers})
            .then(response => {
                // console.log(response.data)
                setCategories(response.data)
            })
            .catch(error=> {                
                if (error.response) {
                    console.log(error.response.data)
                }                
            })
    },[token])

    const formSubmitHandler = (e) => {
        e.preventDefault();
        setLoading("true");
        const headers = {
            Authorization: "Bearer" + token,
        };
        const query = `?name=${name}&brand=${brand}&categoryId=${selectedCategory}&isCancellable=${isCancellable}&isReturnable=${isReturnable}&desc=${desc}`
        // console.log("product/add"+query);
        // console.log(headers);
        
        axios.post("product/add" + query,{},{ headers: headers})
            .then(response => {
                setLoading(false);
                setError(null);
                // setSuccess(true);
                setBrand("");
                setName("");
                setDesc("");
                selectedCategory("");
                // console.log(response.data)
            })
            .catch(error=> {
                if (error.response) {
                    console.log(error.response.data);
                    setError(error.response.data.message);
                }
                setLoading(false);
            })
            
    }

    if (loading) {
        return <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status"><span className="sr-only">Loading...</span></div>;
    }
    
    return (
        <div className="container py-3">
        <div className="row">
            <div className="mx-auto col-sm-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="mb-0">Product Details</h4>
                            </div>
                            {error ? <p style={{color: "red"}}>{error}</p> : null}
                            {/* {success ? <p style={{color: "green"}}>Product Added</p> : null} */}
                            <div className="card-body">
                                <form className="form" onSubmit={formSubmitHandler} >
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Product Name</label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="text" value={name} onChange={nameChangeHandler} required/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Brand</label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="text" value={brand} onChange={brandChangeHandler}  required/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Description</label>
                                        <div className="col-lg-9">
                                            <textarea className="form-control" type="text" value={desc} onChange={descChangeHandler} required/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Category</label>
                                        <div className="col-lg-9">
                                            <select id="categoryId" className="form-control" size="0" onChange={categoryChangeHandler}>
                                                <option value="default">Choose</option>
                                                {categories.map(category => (
                                                    <option key={category.category.id} value={category.category.id} onChange={categoryChangeHandler}>{category.category.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Is Returnable</label>
                                        <div className="col-lg-9">
                                            <select id="isReturnable" className="form-control" size="0" onChange={returnableChangeHandler} required>
                                                <option value="default">Choose</option>
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Is Cancellable</label>
                                        <div className="col-lg-9">
                                            <select id="isCancellable" className="form-control" size="0" onChange={cancellableChangeHandler}>
                                                <option value="default">Choose</option>
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                            </select>
                                        </div>
                                    </div>
    
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label"></label>
                                        <div className="col-lg-9">
                                            <button type="Submit" className="btn btn-primary">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* <!-- /form user info --> */}
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

export default connect(mapStateToProps)(withErrorHandler(AddProductPage,axios));