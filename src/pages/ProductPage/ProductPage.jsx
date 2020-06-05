import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import ProductUpdate from '../../components/Product/ProductUpdate/ProductUpdate';
import { NavLink } from 'react-router-dom';

const ProductPage = ({ token ,history}) => {
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [showModal,setShowModal] = useState(false);
    const [updateId,setUpdatedId] = useState("");
    const [deleted,setDeleted] = useState(false);
    useEffect(() => {
        setLoading(true);
        const headers = {
			Authorization: "Bearer" + token,
        };
        axios.get('product/view/all',{ headers: headers})
            .then(response => {
                console.log(response.data);
                setProducts(response.data)
                setLoading(false);
            })
            .catch(error=> {
                if (error.response) {
                    console.log(error.response.data);
                    setLoading(false);
                    setError(error.response.data);
                }
            })
    },[token,deleted,showModal]);

    const updateClick = (id) => {
        setUpdatedId(id);   
        setShowModal(true);
    }

    const modalClosedHandler = () => setShowModal(false);

    const deleteClick = (id) => {
        setDeleted(false);
        const headers = {
			Authorization: "Bearer" + token,
        };
        axios.delete('product/delete/' + id,{ headers: headers })
            .then(response => {
                setDeleted(true);
                console.log(response);
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                }
            })
    }

    const addVariationClick = (pId,catId) => {
        history.push('/product/addVariation/' + pId + "?category=" + catId);
    }

    if (loading) {
        return <Spinner />;
    }
    if (error) {
        return <h3>{error}</h3>;
    }
    if (products.length === 0) {
        return <h3>No Products found</h3>
    }
    
    return (
    <>
            {showModal ? <Modal show={showModal} modalClosed={modalClosedHandler}>
                <ProductUpdate id={updateId} token={token} />
            </Modal> : null}
            <table className="table table-hover table-responsive-lg">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Category</th>
                    <th scope="col">Active</th>
                    <th scope="col">Cancellable</th>
                    <th scope="col">Returnable</th>
                    <th scope="col">Description</th>
                    <th scope="col">Update</th>
                    <th scope="col">Variation</th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product,index) => (
                        <tr key={product.id}>
                            <th scope="row">{index}</th>
                            <td><NavLink to={`/variation/${product.id}`}>{product.name}</NavLink></td>
                            <td>{product.brand}</td>
                            <td>{product.category.name}</td>
                            <td>{product.active.toString()}</td>
                            <td>{product.cancellable.toString()}</td>
                            <td>{product.returnable.toString()}</td>
                            <td>{product.description.split(" ").pop(-1)}</td>
                            <td><button type="submit" className="btn btn-primary" onClick={() => updateClick(product.id)}>Update</button></td>
                            <td><button type="submit" className="btn btn-success" onClick={() => addVariationClick(product.id,product.category.id)}>Add</button></td>
                            <td><button type="submit" className="btn btn-danger" onClick={() => deleteClick(product.id)}>Delete</button></td>
                        </tr>
                    ))} 
                   
                </tbody>
            </table>
    </>

    );
};

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}



export default connect(mapStateToProps)(withErrorHandler(ProductPage,axios));