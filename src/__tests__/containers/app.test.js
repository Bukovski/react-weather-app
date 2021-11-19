import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ThemeContext } from "../../hock-context/themeContext";
import AppContainer from "../../containers/app.container";


describe.skip("AppContainer Container", () => {
	it('should render props', async () => {
		const setTheme = jest.fn();
		
		render(
			<ThemeContext.Provider value={{ theme: "dark", setTheme }}>
				<AppContainer />
			</ThemeContext.Provider>
		);
		
		screen.debug()
	});
})