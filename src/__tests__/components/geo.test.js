import React from 'react';
import { render, screen } from '@testing-library/react';
import Geo from "../../components/geo.component";


describe("Geo Component", () => {
	it('should render with valid data', () => {
		const data = {
			"cityName": "Stakhanov",
			"date": "Sun, November 07"
		}
		const { container } = render(<Geo data={ data }/>);
		
		expect(screen.getByText('Stakhanov')).toBeInTheDocument();
		expect(screen.getByText('Sun, November 07')).toBeInTheDocument();
		
		expect(container.firstChild).toMatchSnapshot();
	});
});