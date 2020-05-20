import React from "react";
 
 
const datePicker = () => {
  const state = {
    startDate: new Date()
  };
 
  const handleChange = date => {
    this.setState({
      startDate: date
    });
  };
	return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
    );
}

export {datePicker};
