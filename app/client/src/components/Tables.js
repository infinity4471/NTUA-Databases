import React from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

function ProductTable({columnData}) {
	return (
		<div className="Grid">
		<Grid data={columnData}>
			<Column field="PAPAPA" title="LONITHAGAPO"/>
		</Grid>
		</div>
	);
}

export {ProductTable}; 
