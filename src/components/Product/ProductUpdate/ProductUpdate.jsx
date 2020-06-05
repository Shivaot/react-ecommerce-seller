import React,{ useState, useEffect } from 'react';
import axios from '../../../axios';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

const ProductUpdate = ({ id ,token }) => {
    const [name,setName] = useState("");
    const [desc,setDesc] = useState("");
    const [isReturnable,setIsReturnable] = useState("");
    const [isCancellable,setIsCancellable] = useState("");
    const [loading,setLoading] = useState(false);
    const [success,setSuccess] = useState(false);
    useEffect(() => {
        const headers = {
			Authorization: "Bearer" + token,
        };
        axios.get('product/view/'+id,{headers: headers})
            .then(response => {
                // console.log(response.data);
                setName(response.data.name);
                setDesc(response.data.description);
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                }
            })
    },[token,id])

    const nameChangeHandler = (e) => setName(e.target.value);
    const returnableChangeHandler = (e) => setIsReturnable(e.target.value);
    const cancellableChangeHandler = (e) => setIsCancellable(e.target.value);
    const descChangeHandler = (e) => setDesc(e.target.value);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        const headers = {
			Authorization: "Bearer" + token,
        };
        const query = `?name=${name}&desc=${desc}&isCancellable=${isCancellable}&isReturnable=${isReturnable}`;
        axios.post(`product/update/${id}${query}`,{},{ headers: headers })
        .then(response => {
            setLoading(false);
            setSuccess(true);
            setName("");
            setDesc("");
            setIsCancellable("Returnable")
            setIsReturnable("Cancellable")
            // console.log(response);
        })
        .catch(error => {
            setLoading(false);
            setSuccess(false);
            if (error.response) {
                console.log(error.response.data);
            }
        });
    }

    if (loading) {
        return <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status"><span className="sr-only">Loading...</span></div>;
    }

    if (success) {
        return <p>Product Updated</p>
    }

    return (
        <form onSubmit={formSubmitHandler}>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" placeholder={name} value={name} onChange={nameChangeHandler} required/>
            </div>
            <div className="form-group">
                <label>Description</label>
                <input type="text-area" className="form-control" placeholder={desc} value={desc} onChange={descChangeHandler} required/>
            </div>
            <select id="isReturnable" className="form-control" size="0" onChange={returnableChangeHandler}>
                <option value="default">Returnable</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select><br/>
            <select id="isCancellable" className="form-control" size="0" onChange={cancellableChangeHandler}>
                <option value="default">Cancellable</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select><br/>                     
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default withErrorHandler(ProductUpdate,axios);