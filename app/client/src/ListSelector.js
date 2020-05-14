import React, { Component } from 'react';
import './App.css';
import { ComboBox } from '@progress/kendo-react-dropdowns';

import '@progress/kendo-theme-default/dist/all.css'

class ListSelector extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            data: [ "Superloni", "Superpotis" ],
            className: "loni",
            category: "του πιο όμορφου",
            selected: false,
            selected_item: undefined
        }
    }
    handleChange = (event) => {
        this.setState( {selected_item: event.target.value} )
        this.setState( {selected: true} )
    }
    render() {
        return (
            <div className={this.state.className}>
            <h1> Επιλογή {this.state.category} </h1>
            <ComboBox data={this.state.data} onChange={this.handleChange} />            
            </div>
        );
    }
}

export { ListSelector };
