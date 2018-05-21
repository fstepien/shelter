import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

class Chart extends Component {
  render() {
    const available =
      this.props.currentLocation.CAPACITY -
      this.props.currentLocation.OCCUPANCY;

    const chartData = {
      labels: ["Occupied", "Available"],
      datasets: [
        {
          label: "Beds",
          data: [this.props.currentLocation.OCCUPANCY, available],
          backgroundColor: ["rgba(51,51,51,0.5", "rgba(80,165,209, 0.5)"]
        }
      ]
    };

    return (
      <div className="pie-chart">
        <Pie
          data={chartData}
          width={100}
          height={50}
          options={{
            legend: {
              display: false
            }
          }}
        />
      </div>
    );
  }
}

export default Chart;
