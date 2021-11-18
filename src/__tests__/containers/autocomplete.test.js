import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import AutocompleteContainer from "../../containers/autocomplete.container";
import fakeLocationSuggestion from "../../utils/fakeLocationSuggestion.json";
import * as message from "../../libs/clientMessages/clientMessages";




describe("Autocomplete Container", () => {
	const messageErrorFn = jest.fn((text) => text);
	
	const waitForLoadingToFinish = (inputSearch) =>
		waitFor(() => {
			expect(inputSearch.value).toEqual("");
		}, { timeout: 200 })
	
	
	beforeAll(() => {
		jest.mock("../../libs/clientMessages/clientMessages");
		message[ "messageError" ] = (text) => messageErrorFn(text);
	});
	
	beforeEach(() => {
		const mockFetchPromise = Promise.resolve({
			json: () => Promise.resolve({ suggestions: fakeLocationSuggestion }),
			ok: () => true
		});
		
		fetch.resetMocks();
		fetch.mockImplementation(() => mockFetchPromise);
	});
	
	it('should render suggestions list', async () => {
		render(<AutocompleteContainer/>);
		
		const inputSearch = screen.getByRole("search");
		
		await waitForLoadingToFinish(inputSearch)
		
		await act(async () => {
			await fireEvent.change(inputSearch, { target: { value: "Стах" } });
		});
		
		expect(screen.getByTestId("suggestions-list")).toBeInTheDocument();
		expect(screen.queryAllByRole("listitem")).toHaveLength(2);
	});
	
	it('use the up and down keyboard buttons to select a value from the list', async () => {
		render(<AutocompleteContainer/>);
		
		const inputSearch = screen.getByRole("search");
		
		await waitForLoadingToFinish(inputSearch)
		
		await act(async () => {
			await fireEvent.change(inputSearch, { target: { value: "Стах" } });
		});
		
		const listItems = screen.queryAllByRole("listitem");
		
		expect(screen.getByTestId("suggestions-list")).toBeInTheDocument();
		expect(listItems[ 0 ]).not.toHaveClass("search__autocomplete-item--color");
		expect(listItems[ 1 ]).not.toHaveClass("search__autocomplete-item--color");
		
		userEvent.type(inputSearch, '{arrowdown}');
		expect(listItems[ 0 ]).toHaveClass("search__autocomplete-item--color");
		expect(listItems[ 1 ]).not.toHaveClass("search__autocomplete-item--color");
		
		userEvent.type(inputSearch, '{arrowdown}');
		expect(listItems[ 0 ]).not.toHaveClass("search__autocomplete-item--color");
		expect(listItems[ 1 ]).toHaveClass("search__autocomplete-item--color");
		
		userEvent.type(inputSearch, '{arrowup}');
		expect(listItems[ 0 ]).toHaveClass("search__autocomplete-item--color");
		expect(listItems[ 1 ]).not.toHaveClass("search__autocomplete-item--color");
		
		userEvent.type(inputSearch, '{arrowup}');
		expect(listItems[ 0 ]).not.toHaveClass("search__autocomplete-item--color");
		expect(listItems[ 1 ]).not.toHaveClass("search__autocomplete-item--color");
	});
	
	it('after pressing Enter, fill in the value in search input with the selected item', async () => {
		render(<AutocompleteContainer/>);
		
		const inputSearch = screen.getByRole("search");
		
		await waitForLoadingToFinish(inputSearch)
		
		await act(async () => {
			fireEvent.change(inputSearch, { target: { value: "Стах" } });
		});
		
		expect(screen.getByTestId("suggestions-list")).toBeInTheDocument();
		
		const listItems = screen.queryAllByRole("listitem");
		
		userEvent.type(inputSearch, '{arrowdown}');
		expect(listItems[ 0 ]).toHaveClass("search__autocomplete-item--color");
		expect(listItems[ 1 ]).not.toHaveClass("search__autocomplete-item--color");
		
		await act(async () => {
			userEvent.type(inputSearch, '{enter}');
		});
		
		expect(inputSearch.value).toEqual("Стаханов, Луганська область");
		
		await act(async () => {
			userEvent.click(screen.getByRole("button"));
		});
		
		expect(inputSearch.value).toEqual("");
	});
	
	it('click on list item', async () => {
		render(<AutocompleteContainer/>);
		
		const inputSearch = screen.getByRole("search");
		
		await waitForLoadingToFinish(inputSearch)
		
		await act(async () => {
			fireEvent.change(inputSearch, { target: { value: "Стах" } });
		});
		
		expect(screen.getByTestId("suggestions-list")).toBeInTheDocument();
		
		fireEvent.click(screen.queryAllByRole("listitem")[ 0 ])
		expect(screen.queryByTestId("suggestions-list")).not.toBeInTheDocument();
		
		await act(async () => {
			expect(inputSearch.value).toEqual("Стаханов, Луганська область");
		});
		
		userEvent.click(screen.getByRole("button"));
		
		await act(async () => {
			expect(inputSearch.value).toEqual("");
		});
	});
	
	it('hide list item when user click to outside component', async () => {
		
		render(<AutocompleteContainer/>);
		
		const inputSearch = screen.getByRole("search");
		
		await waitForLoadingToFinish(inputSearch)
		
		await act(async () => {
			fireEvent.change(inputSearch, { target: { value: "Стах" } });
		});
		
		expect(screen.getByTestId("suggestions-list")).toBeInTheDocument();
		expect(screen.queryByTestId("suggestions-list")).toBeInTheDocument();
		
		jest.useFakeTimers();
		
		fireEvent.focusOut(inputSearch);
		
		act(() => {
			jest.runAllTimers()
		});
		
		expect(screen.queryByTestId("suggestions-list")).not.toBeInTheDocument();
	});
	
	it('Check call error message', async () => {
		const mockFetchPromise = Promise.resolve({
			json: () => Promise.reject(new Error('Data empty')),
			ok: () => ({ status: 401 })
		});
		
		fetch.resetMocks();
		fetch.mockImplementation(() => mockFetchPromise);
		
		render(<AutocompleteContainer/>);
		
		const inputSearch = screen.getByRole("search");
		
		await waitForLoadingToFinish(inputSearch)
		
		expect(messageErrorFn).toHaveBeenCalledTimes(1);
		expect(messageErrorFn.mock.calls[0][0]).toBe("Sorry, something wrong with input autocomplete");
	});
	
	it('suggestions data is empty', async () => {
		const mockFetchPromise = Promise.resolve({
			json: () => Promise.resolve({ suggestions: [] }),
			ok: () => true
		});
		
		fetch.resetMocks();
		fetch.mockImplementation(() => mockFetchPromise);
		
		render(<AutocompleteContainer/>);
		
		const inputSearch = screen.getByRole("search");
		
		await waitForLoadingToFinish(inputSearch)
		
		await act(async () => {
			await fireEvent.change(screen.getByRole("search"), { target: { value: "Стах" } });
		});
		
		expect(screen.queryByTestId("suggestions-list")).not.toBeInTheDocument();
	});
	
	it('suggestions data without city or district or county', async () => {
		const mockFetchPromise = Promise.resolve({
			json: () => Promise.resolve({ suggestions: [
					{
						"label": "Україна, Попаснянський район, Стаханов",
						"language": "uk",
						"countryCode": "UKR",
						"locationId": "NT_TT3PspwjVyV5jqIl-hOR8D",
						"address": {
							"country": "Україна",
							"county": "Луганська область",
							"city": "Попаснянський район",
						},
						"matchLevel": "district"
					},
					{
						"label": "Россия, 614066, Пермь, Стахановская улица",
						"language": "ru",
						"countryCode": "RUS",
						"locationId": "NT_UJFhVJu4W1zMOQym878JQB",
						"address": {
							"country": "Россия",
							"state": "Приволжский федеральный округ",
							"street": "Стахановская улица",
							"postalCode": "614066"
						},
						"matchLevel": "district"
					},
					{
						"label": "Россия, 109428, Москва, Стахановская улица",
						"language": "ru",
						"countryCode": "RUS",
						"locationId": "NT_NbOGv0PokGMBL9XizcL1rC",
						"address": {
							"state": "Центральный федеральный округ",
							"city": "Москва",
							"district": "МО Рязанский",
							"street": "Стахановская улица",
							"postalCode": "109428"
						},
						"matchLevel": "district"
					},
				] }),
			ok: () => true
		});
		
		fetch.resetMocks();
		fetch.mockImplementation(() => mockFetchPromise);
		
		render(<AutocompleteContainer/>);
		
		const inputSearch = screen.getByRole("search");
		
		await waitForLoadingToFinish(inputSearch)
		
		await act(async () => {
			await fireEvent.change(screen.getByRole("search"), { target: { value: "Стах" } });
		});
		
		expect(screen.queryByTestId("suggestions-list")).toBeInTheDocument();
		expect(screen.queryAllByRole("listitem")).toHaveLength(3);
	});
})