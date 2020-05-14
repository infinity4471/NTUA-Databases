import React, { Component } from 'react';
import './App.css';
import { ListSelector } from './ListSelector';
import { ProductButton } from './Button';

import '@progress/kendo-theme-default/dist/all.css'

class Controller extends Component {
    constructor( props ) {
        super( props )

    }
    render() {
        return (
            <div>
                <ListSelector />
                <ListSelector />
                <ProductButton />
            </div>
        );
    }
}

export { Controller };
