import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

class Filters extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate : new Date()
    };
    this.handleStartChange = this.handleStartChange.bind(this);
  }

  handleStartChange = (date) => {
    this.setState({
      startDate : date
    })
  }


  render() {
    return (
      <div className="filters">
          <div id="filterbox">
            <p id="title">Filtres</p>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleStartChange}
              placeholderText="Select a date"/>

          </div>
      </div>
    )
  }
}



export default Filters;
