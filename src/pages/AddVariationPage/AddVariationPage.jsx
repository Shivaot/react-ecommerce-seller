import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios';

const AddVariationPage = (props) => {
    const [price,setPrice] = useState("");
    const [quantity,setQuantity] = useState("");
    const [primaryImage,setPrimaryImage] = useState("");
    const [secondaryImages,setSecondaryImages] = useState([]);
    const [categories,setCategories] = useState([]);
    const [filedValuesSet,setFiledValuesSet] = useState([]);
    const [postFiledValuesSet,setPostFiledValuesSet] = useState({});
    const [catId] = useState(props.location.search.split("=").pop(-1));
    const [selectValue,setSelectValue] = useState("");
    const [success,setSuccess] = useState(false);

    useEffect(() => {
        const headers = {
			Authorization: "Bearer" + props.token,
        };
        axios.get('/seller/profile/categories',{ headers: headers})
            .then(response => {
                console.log(response.data);
                setCategories(response.data);
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                }
            })
    },[props.token])

    useEffect(() => {
        categories.filter(category => category.category.id.toString() === catId).forEach(category => {
            if (category.filedValuesSet.length !== 0) {
                console.log(category.filedValuesSet);
                setFiledValuesSet(category.filedValuesSet);
            }
        })
    },[categories,catId])


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
    var metadata = {};
    const selectChangeHandler = (e) => {
        console.log(e.target.name,e.target.value); // Size - small , Fabric-Cotton  
        setSelectValue(e.target.value);
        var obj = {};
        obj[e.target.name] = [e.target.value.toString()];
        Object.assign(metadata,obj)
        setPostFiledValuesSet({...postFiledValuesSet,...metadata})
    }
    
    const formSubmitHandler = (e) => {
        e.preventDefault();
        const data = {
            "productId":props.match.params.id,
            "price":price,
            "quantityAvailable":quantity,
            "filedIdValues":postFiledValuesSet,
            "primaryImage":primaryImage,
            "secondaryImages":secondaryImages
        }
        const headers = {
			Authorization: "Bearer" + props.token,
        };
        axios.post('productVariation/add',data,{ headers: headers })
            .then(response => {
                console.log(response);
                setSuccess(true);
            })
            .catch(error => {
                setSuccess(false);
                if (error.response) {
                    console.log(error.response.data);
                }
            });
        setPrice("");
        setQuantity("");
        setPrimaryImage("");
        setSecondaryImages([]);    
         
    }
  
    return (
        <div className="container py-3">
        <div className="row">
            <div className="mx-auto col-sm-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="mb-0">Product Variation Details</h4>
                            </div>
                            {success ? <h3>Added</h3>: null}
                            <div className="card-body">
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
                                            <input type="file" onChange={primaryImageChangeHandler} required/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">More Images</label>
                                        <div className="col-lg-9">
                                            <input type="file" onChange={secondaryImagesChangeHandler} multiple/>
                                        </div>
                                    </div>
                                  
                                    <div className="form-group row" > 
                                        <div className="col-lg-9" style={{marginLeft: "10%"}}>
                                            {filedValuesSet.map(fl => (
                                            <div key={Math.random()}>
                                                    <label className="col-lg-3 col-form-label form-control-label">{Object.keys(fl)}</label>
                                                   <div>
                                                        <select className="form-control" size="0" style={{marginLeft: "10%"}} name={Object.keys(fl)} value={selectValue} onChange={selectChangeHandler} required>
                                                        <option value="default">Choose</option>
                                                        {Object.values(fl).map(v => (
                                                            v.split(",").map((el,i) => (
                                                                <option key={i} >{el}</option>
                                                            ))
                                                        ))}
                                                        </select>
                                                   </div>
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                   
    
                                    <div className="form-group row" style={{marginLeft:"15%"}}>
                                        <div className="col-lg-9">
                                            <button type="Submit" className="btn btn-primary" >Submit</button>
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

export default connect(mapStateToProps)(withErrorHandler(AddVariationPage,axios));