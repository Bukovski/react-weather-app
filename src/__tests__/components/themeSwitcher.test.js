import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { ThemeContext } from "../../hock-context/themeContext";
import themeColorList from "../../utils/themeColorList.json";
import ThemeSwitcher from "../../components/themeSwitcher.component";


const theme = themeColorList[ 2 ];



describe("ThemeSwitcher Component", () => {
	it('should render theme list', async () => {
		const { container } = render(
			<ThemeContext.Provider value={{ theme: "dark" }}>
				<ThemeSwitcher/>
			</ThemeContext.Provider>
		);
		
		expect(screen.getAllByRole("listitem").length).toBe(5);
		
		expect(container.firstChild).toMatchSnapshot();
	});
	
	it('change theme', async () => {
		const setTheme = jest.fn();
		
		render(
			<ThemeContext.Provider value={{ theme: "dark", setTheme }}>
				<ThemeSwitcher/>
			</ThemeContext.Provider>
		);

		expect(screen.getByRole("list")).toHaveClass("theme-switcher__dropdown-hide");
		expect(setTheme).toHaveBeenCalledTimes(0);
		
		userEvent.click(screen.getByTestId("switcher-span"));
		expect(screen.getByRole("list")).not.toHaveClass("theme-switcher__dropdown-hide");
		
		userEvent.click(screen.getAllByRole("listitem")[ 1 ].querySelector("span"));
		expect(setTheme).toHaveBeenCalledTimes(1);
		expect(screen.getByRole("list")).toHaveClass("theme-switcher__dropdown-hide");
	});
	
	it("don't change the theme to the current one", async () => {
		const setTheme = jest.fn();
		
		render(
			<ThemeContext.Provider value={{ theme: "dark", setTheme }}>
				<ThemeSwitcher/>
			</ThemeContext.Provider>
		);
		
		expect(screen.getByRole("list")).toHaveClass("theme-switcher__dropdown-hide");
		expect(setTheme).toHaveBeenCalledTimes(0);
		
		userEvent.click(screen.getByTestId("switcher-span"));
		expect(screen.getByRole("list")).not.toHaveClass("theme-switcher__dropdown-hide");
		
		userEvent.click(screen.getAllByRole("listitem")[ 1 ].querySelector("span"));
		expect(setTheme).toHaveBeenCalledTimes(1);
		expect(screen.getByRole("list")).toHaveClass("theme-switcher__dropdown-hide");
		
		userEvent.click(screen.getByTestId("switcher-span"));
		expect(screen.getByRole("list")).not.toHaveClass("theme-switcher__dropdown-hide");
		
		userEvent.click(screen.getAllByRole("listitem")[ 2 ].querySelector("span"));
		expect(setTheme).toHaveBeenCalledTimes(1);
		
		expect(screen.getByRole("list")).toHaveClass("theme-switcher__dropdown-hide");
	});
});