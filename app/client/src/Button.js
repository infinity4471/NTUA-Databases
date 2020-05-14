import React, { Component } from 'react';
import './App.css';
import { Button } from '@progress/kendo-react-buttons';

import '@progress/kendo-theme-default/dist/all.css'

class ProductButton extends Component {
    handleClick = () => {
        alert("Θ ΑΓΑΠΑΩ ΓΑΛΑΚΘΙΑ Θ ΑΓΑΠΑΩ ΓΑΛΑΚΘΙΑ")
        alert("ΦΙΛΑΚΙΑ ΘΤΗΝ ΚΕΦΑΛΑ ΜΟΥΤΘ ΜΟΥΤΘ ΜΟΥΤΘ")
    }
    render() {
        return (
            <div className="ClientButton">
            <Button primary={true} onClick={this.handleClick}>Πληροφορίες Πελατών</Button>
            </div>
        );
    }
}

export { ProductButton };
