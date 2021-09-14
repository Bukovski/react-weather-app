import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";


const Diagram = (props) => {
	const { temperaturesForecast, temperaturesForecastLabels, loaded } = props.data;
	
	const [ colorBg, setColorBg ] = useState("#fff");
	const [ colorText, setColorText ] = useState("#495758");
	const [ colorPrimary, setColorPrimary ] = useState("#1fa69d");
	const [ colorSecondary, setColorSecondary] = useState("rgba(29, 211, 176, 1)");
	
	
	useEffect(() => {
		// read data-theme styles variables from body :root
		const getLinkOnBody = document.body;
		const getCssVarContainer = getComputedStyle(getLinkOnBody);

		setColorBg(getCssVarContainer.getPropertyValue('--color-bg'));
		setColorText(getCssVarContainer.getPropertyValue('--color-text'));
		setColorPrimary(getCssVarContainer.getPropertyValue('--color-primary'));
		setColorSecondary(getCssVarContainer.getPropertyValue('--color-secondary'));
	}, [ loaded ]);
	
	
	const diagramOptions = {
		series: [{
			name: 'Inflation',
			data: [ ...temperaturesForecast ]
		}],
		options: {
			chart: {
				height: 350,
				type: 'bar',
			},
			colors: colorPrimary,
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
					colors: [ colorBg ]
				}
			},
			
			xaxis: {
				categories: [ ...temperaturesForecastLabels ],
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
						colors: colorText,
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
						colors: colorText,
						fontSize: '1.5rem'
					},
				}
			},
		},
	}
	
	return (<div className="diagram">
		<Chart
			type="bar"
			// height={ 280 }
			options={ diagramOptions.options }
			series={diagramOptions.series}
		/>
	</div>);
}


export default Diagram;