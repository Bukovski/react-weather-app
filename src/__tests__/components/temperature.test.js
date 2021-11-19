import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Temperature from "../../components/temperature.component";



describe("Temperature Component", () => {
	it('should render props', async () => {
		const data = {
			"actualTemperature": "7",
			"maxTemperature": 8,
			"minTemperature": 10
		}
		const { container } = render(<Temperature data={ data }/>)
		
		await waitFor(() => {
			expect(screen.queryByText('7')).toBeInTheDocument();
			expect(screen.queryByText('8')).toBeInTheDocument();
			expect(screen.queryByText('10')).toBeInTheDocument();
		}, { timeout: 1500 });
		
		expect(container.firstChild).toMatchSnapshot();
	});
});