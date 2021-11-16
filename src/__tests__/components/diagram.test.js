import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Diagram from "../../components/diagram.component";
import { ThemeContext } from "../../hock-context/themeContext";
import themeColorList from "../../utils/themeColorList.json";

jest.mock("react-apexcharts");

const data = {
	"temperaturesForecast": [	8, 7, 6, 7, 8 ],
	"temperaturesForecastLabels": [	"21:11", "00:11", "03:11", "06:11", "09:11" ],
	"loaded": true
}

const theme = themeColorList[ 0 ];

describe("Diagram Component", () => {
	it('should render with valid theme', async () => {
		const { container } = render(
			<ThemeContext.Provider value={{ theme: "default" }}>
				<Diagram data={ data }/>
			</ThemeContext.Provider>
		);
		
		expect(container.getElementsByClassName('diagram').length).toBe(1);
	});
	
	it('should render with not valid theme', () => {
		const { container } = render(
			<ThemeContext.Provider value={{ theme: "not-exist" }}>
				<Diagram data={ data }/>
			</ThemeContext.Provider>
		);
		
		expect(container.getElementsByClassName('diagram').length).toBe(1);
	});
});