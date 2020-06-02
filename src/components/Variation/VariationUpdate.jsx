import React, { useState, useEffect } from 'react';
import axios from '../../axios';

const VariationUpdate = (props) => {
    const [price,setPrice] = useState("");
    const [quantity,setQuantity] = useState("");
    const [primaryImage,setPrimaryImage] = useState("");
    const [secondaryImages,setSecondaryImages] = useState([]);
    const [success,setSuccess] = useState(false);
    useEffect(() => {
        const headers = {
			Authorization: "Bearer" + props.token,
        };
        axios.get('productVariation/view/'+props.id,{ headers: headers})
            .then(response => {
                console.log(response.data);
                setPrice(response.data.price);
                setQuantity(response.data.quantityAvailable ? response.data.quantityAvailable : 0 );
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response)
                }
            })
    },[props.token,props.id])
   
    const priceChangeHandler = (e) => setPrice(e.target.value);
    const quantityChangeHandler = (e) => setQuantity(e.target.value);
    const primaryImageChangeHandler = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            setPrimaryImage(reader.result);
        }
        reader.readAsDataURL(file);
    };
    function imageUtility(file) {
        var reader = new FileReader();
        reader.onloadend = function() {
            setSecondaryImages(prevData => prevData.concat(reader.result))
        }
        reader.readAsDataURL(file);
    }
    const secondaryImagesChangeHandler = (e) => {
        var filesList = e.target.files;
        for (let i =0; i< e.target.files.length;i++) {
            imageUtility(filesList[i]);
        }
    };
    const formSubmitHandler = (e) => {
        e.preventDefault();
        const headers = {
			Authorization: "Bearer" + props.token,
        };
        const data ={
            "productId":props.id,
            "price":price,
            "quantityAvailable":quantity,
            "primaryImage":primaryImage,
            "secondaryImages":secondaryImages
        }
        axios.put('productVariation/update',data,{ headers: headers })
            .then(response => {
                console.log(response.data);
                setSuccess(true);
            })
            .catch(error => {
                setSuccess(false);
                if (error.response) {
                    console.log(error.response.data);
                }
            })
    }

    if (success) {
        return <h3>Product Variation updated</h3>
    }

    return (
        <form className="form" onSubmit={formSubmitHandler}>
            <div className="form-group row">
                <label className="col-lg-3 col-form-label form-control-label">Price</label>
                <div className="col-lg-9">
                    <input className="form-control" type="text" value={price} onChange={priceChangeHandler}  required/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-lg-3 col-form-label form-control-label">Quantity Available</label>
                <div className="col-lg-9">
                    <input className="form-control" type="text" value={quantity} onChange={quantityChangeHandler}  required/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-lg-3 col-form-label form-control-label">Primary Image</label>
                <div className="col-lg-9">
                    <input type="file" onChange={primaryImageChangeHandler} />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-lg-3 col-form-label form-control-label">More Images</label>
                <div className="col-lg-9">
                    <input type="file" onChange={secondaryImagesChangeHandler} multiple />
                </div>
            </div>
            <div className="form-group row" style={{marginLeft:"15%"}}>
                <div className="col-lg-9">
                    <button type="Submit" className="btn btn-primary" >Submit</button>
                </div>
            </div>
        </form>
    );
};

export default VariationUpdate;