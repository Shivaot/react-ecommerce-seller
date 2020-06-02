import React,{ useState, useEffect } from 'react';

import Modal from '../UI/Modal/Modal';
import VariationUpdate from './VariationUpdate';
const VariationCard = (props) => {
    const [showModal,setShowModal] = useState(false);
    const [updatedId,setUpdatedId] = useState("");
    useEffect(() => {},[showModal])
    let transformedImages = props.images.reduce(function(a, e, i) {
        if (e.includes(props.variation.id))
            a.push(e);
        return a;
    }, []); 
    let primaryContent = transformedImages.filter((arr,i) => i===0).map((image,i) => (
        <img key={i} style={{maxWidth:"50%",maxHeight:"50%",boxShadow:"1px 1px 2px grey"}} src={"http://"+image} alt={`First slide}`} /> 
    )) 
    let content = transformedImages.map((image,index) => (
        <img key={index} className="" style={{maxHeight:"20%",maxWidth:"20%"}} src={"http://"+image} alt={`${index} slide}`} /> 
    ));    
    const updateClick = (id) => {
        setUpdatedId(id);   
        setShowModal(true);
    }
    const modalClosedHandler = () => setShowModal(false);

    return (
        <>
            {showModal ? <Modal show={showModal} modalClosed={modalClosedHandler}>
                    <VariationUpdate id={updatedId} token={props.token} />
            </Modal> : null}
            <div className="card" style={{marginTop:"2%",boxShadow: "1px 2px 2px grey"}}>
                <div className="card-body">
                    <button className="btn btn-primary" onClick={() => updateClick(props.variation.id)}>Edit</button>
                    <div className="row">
                        <div className="col">
                            <h5>Price : {props.variation.price}</h5>
                            <h5>Quantity : {props.variation.quantityAvailable ? props.variation.quantityAvailable : 0}</h5>
                            <label>Primary Image</label>
                            <div>{primaryContent}</div>
                        </div>
                        <div className="col">
                            <table className="table table-borderless">
                                <thead>
                                    <tr>
                                        <th scope="col">Secondary Images</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {content.map((image,index) => (
                                        <tr key={index}><td>{image}</td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VariationCard;