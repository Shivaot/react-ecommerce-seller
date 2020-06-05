import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import VariationCard from '../../components/Variation/VariationCard';

const VariationPage = (props) => {
    const [variations,setVariations] = useState([]);
    const [images,setImages] = useState([]);
    useEffect(() => {
        const headers = {
			Authorization: "Bearer" + props.token,
        };
        axios.get('product/seller/' + props.match.params.id,{ headers: headers})
            .then(response => {
                // console.log(response.data);
                setVariations(response.data.productVarPlusImagesDTO.productVariation);
                setImages(response.data.productVarPlusImagesDTO.images)
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                }
            })
    },[props.match.params,props.token])
    if (variations.length === 0) {
        return <h3>No variations found</h3>;
    }
    return (
        <div className="container fluid" style={{marginTop: "5%",marginBottom:"5%"}}>
            {variations.map((variation,index) => (
                <VariationCard key={index} variation={variation} images={images} token={props.token}/>
            ))}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(withErrorHandler(VariationPage,axios));