import React from "react";
import Chart from "react-apexcharts";


const Diagram = (props) => {
	const diagramOptions = {
		series: [{
			name: 'Inflation',
			data: [ 25, 32, 36, 38, 34 ]
		}],
		options: {
			chart: {
				height: 350,
				type: 'bar',
			},
			colors: "#20A69D",
			plotOptions: {
				bar: {
					dataLabels: {
						position: 'center', // top, center, bottom
					},
				}
			},
			dataLabels: {
				enabled: true,
				formatter: function (val) {
					return val + "°C";
				},
				offsetY: 10,
				style: {
					fontSize: '1.6rem',
					colors: ["#fff"]
				}
			},
			
			xaxis: {
				categories: [ "Fri", "Sat", "Sun", "Mon", "Tue" ],
				position: 'bottom',
				axisBorder: {
					show: true
				},
				axisTicks: {
					show: false
				},
				tooltip: {
					enabled: false,
				},
				labels: {
					style: {
						colors: [ "#495758" ],
						fontSize: '1.5rem'
					},
				}
			},
			
			yaxis: {
				axisBorder: {
					show: true
				},
				axisTicks: {
					show: false,
				},
				labels: {
					show: true,
					align: 'right',
					formatter: function (val) {
						return val + "°C";
					},
					style: {
						colors: [ "#495758" ],
						fontSize: '1.5rem'
					},
				}
				
			},
			
		},
	}
	
	return (<div className="diagram">
		<Chart
			type="bar"
			height={ 280 }
			options={ diagramOptions.options }
			series={diagramOptions.series}
		/>
	</div>);
}


export default Diagram;