import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import Search from "../../components/search.component";


describe("Search Component", () => {
	it('should render with valid data', () => {
		const { container } = render(
			<Search textValue={ "Text from value" }>
				Text Children
			</Search>
		);
		
		expect(screen.getByText('Text Children')).toBeInTheDocument();
		expect(screen.getByRole("search")).toHaveValue("Text from value");
		
		userEvent.click(screen.getByRole("button"));
		userEvent.type(screen.getByRole("search"), 'New');
		fireEvent.focusOut(screen.getByRole("search"));
		
		expect(container.firstChild).toMatchSnapshot();
	});
	
	it('click on button', () => {
		const testData = {
			textValue: "Text from value",
			onChangeValue: jest.fn(),
			onClearField: jest.fn(),
			onKeyCatcher: jest.fn(),
			onClickButton: jest.fn()
		}
		
		render(
			<Search
				onChangeValue={ testData.onChangeValue }
				onClearField={ testData.onClearField }
				onKeyCatcher={ testData.onKeyCatcher }
				onClickButton={ testData.onClickButton }
				textValue={ "Text from value" }
			>
				Text Children
			</Search>
		);
		
		expect(testData.onClickButton).toHaveBeenCalledTimes(0);
		expect(testData.onKeyCatcher).toHaveBeenCalledTimes(0);
		expect(testData.onChangeValue).toHaveBeenCalledTimes(0);
		expect(testData.onClearField).toHaveBeenCalledTimes(0);
		
		userEvent.click(screen.getByRole("button"));
		expect(testData.onClickButton).toHaveBeenCalledTimes(1);
		
		userEvent.type(screen.getByRole("search"), 'New');
		expect(testData.onKeyCatcher).toHaveBeenCalledTimes(3);
		expect(testData.onChangeValue).toHaveBeenCalledTimes(3);
		
		fireEvent.focusOut(screen.getByRole("search"))
		expect(testData.onClearField).toHaveBeenCalledTimes(1);
	});
});