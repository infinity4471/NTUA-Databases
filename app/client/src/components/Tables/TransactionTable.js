import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import {TablePaginationActions} from './TablePagination';

const TransactionTable = (data) => {
	let rows = Object.values( data )[ 0 ];
	console.log( rows );
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [page, setPage] = React.useState(0);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		if( parseInt( event.target.value, 10 ) >= rows.length ) {
			setRowsPerPage( rows.length )
		} else {
			setRowsPerPage(parseInt(event.target.value, 10));
		}
		setPage(0);
	};

	let emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
	return (
		<TableContainer component={Paper} style={{width: 500}}>

		<TablePagination
		rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
		colSpan={3}
		count={rows.length}
		rowsPerPage={rowsPerPage}
		page={page}
		SelectProps={{
			inputProps: { 'aria-label': 'rows per page' },
				native: true,
		}}
		onChangePage={handleChangePage}
		onChangeRowsPerPage={handleChangeRowsPerPage}
		ActionsComponent={TablePaginationActions}
		/>
		<Table className="Table" aria-label="simple table" style={{width: 500}}>

		<TableHead>
		<TableRow>
		<TableCell align="left">Amount</TableCell>
		<TableCell align="left">Date-Time</TableCell>
		<TableCell align="left">Payment Method</TableCell>
		</TableRow>
		</TableHead>
		<TableBody>
		{(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((dict) => (
			<TableRow key={dict.Total_amount}>
			<TableCell component="th" scope="row">
			{dict.Total_amount}
			</TableCell>
			<TableCell align="left">{dict.Date_Time}</TableCell>
			<TableCell align="left">{dict.Payment_method}</TableCell>
			</TableRow>
		))}
		{emptyRows > 0 && (
			<TableRow style={{ height: 53 * emptyRows }}>
			<TableCell colSpan={6} />
			</TableRow>
		)}

		</TableBody>
		</Table>
		</TableContainer>
	);
}

export {TransactionTable};

