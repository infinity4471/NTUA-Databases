import React from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import  '@progress/kendo-theme-default/dist/all.css';

function ClientTable({columnData}) {
	return (
		<div className="Grid">
		<Grid data={columnData}>
		<Column field="Name" title="Customer Name" />
		<Column field="Date_Of_Birth" title="Customer Name" />
		<Column field="Points" title="Customer Name" />
		<Column field="Family_Members" title="Customer Name" />
		<Column field="Card_Number" title="Customer Name" />
		<Column field="Phone_Number" title="Customer Name" />
		<Column field="Street" title="Customer Name" />
		<Column field="Street_Number" title="Customer Name" />
		<Column field="Postal_Code" title="Customer Name" />
		<Column field="City" title="Customer Name" />
		<Column field="Pet" title="Customer Name" />
		<Column field="Address" title="Customer Name" />
		</Grid>
		</div>
	);
}

export {ClientTable}; 
