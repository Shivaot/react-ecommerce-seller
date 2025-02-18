import React from 'react';
import classes from './Modal.module.css';
import BackDrop from '../Backdrop/Backdrop';

const Modal = props => {
        return (
            <>
                <BackDrop style={{marginLeft: "0px"}} show={props.show} clicked={props.modalClosed}/>
                <div 
                    className={classes.Modal} 
                    style={{
                        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0',
                        padding: props.padding,
                        backgroundColor: props.color
                    }}>
                    {props.children}
                </div>
             </>
        );
    
}

export default React.memo(Modal, (prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children);   