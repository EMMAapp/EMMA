import React from 'react';
import Loading from "./Loading";
import Modal from "./Modal";

export default ({isVisible}) => {
    return <Modal isVisible={isVisible}>
        <Loading/>
    </Modal>
}
