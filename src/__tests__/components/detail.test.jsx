import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Detail from "../../components/detail.component";


describe("Detail Component", () => {
	let data;
	
	beforeAll(() => {
		data = {
			"weatherDescription": "BROKEN CLOUDS",
			"weatherIcon": "wi wi-day-cloudy",
			"windSpeed": 2.05,
			"humidity": "59",
			"pressure": "1022"
		};
	})
	
	it('should render props', async () => {
		const { container } = render(<Detail data={ data }/>);
		
		await waitFor(() => {
			expect(screen.queryByText('59')).toBeInTheDocument();
			expect(screen.queryByText('1022')).toBeInTheDocument();
			expect(screen.queryByText('2.05')).toBeInTheDocument();
			expect(screen.queryByText('BROKEN CLOUDS')).toBeInTheDocument();
		}, { timeout: 1500 });
		
		expect(container.firstChild).toMatchSnapshot();
	});
})