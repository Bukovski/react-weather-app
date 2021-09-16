import React, { useEffect, useRef, useState } from "react";


const getInitialTheme = () => {
	if (typeof window !== 'undefined' && window.localStorage) {
		const storedPrefs = window.localStorage.getItem('color-theme');
		
		if (!storedPrefs) {
			window.localStorage.setItem('color-theme', 'default');
			return 'default';
		}
		
		return storedPrefs;
	}
	
	return 'default';
};

function useComponentVisible(initialIsVisible) {
	const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
	const ref = useRef(null);
	
	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setIsComponentVisible(false);
		}
	};
	
	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	});
	
	return { ref, isComponentVisible, setIsComponentVisible };
}

const themeColorList = [
	{
		theme: "default",
		bg: "rgba(255, 255, 255, 1)",
		text: "rgba(73, 87, 88, 1)",
		primary: "rgba(31, 166, 157, 1)",
		secondary: "rgba(29, 211, 176, 1)"
	},
	{
		theme: "warm",
		bg: "rgba(245, 238, 215, 1)",
		text: "rgba(115, 106, 81, 1)",
		primary: "rgba(191, 59, 59, 1)",
		secondary: "rgba(255, 159, 41, 1)"
	},
	{
		theme: "fresh",
		bg: "rgba(241, 241, 241, 1)",
		text: "rgba(13, 82, 84, 1)",
		primary: "rgba(14, 190, 167, 1)",
		secondary: "rgba(41, 164, 160, 1)"
	},
	{
		theme: "tonic",
		bg: "rgba(253, 255, 252, 1)",
		text: "rgba(1, 22, 39, 1)",
		primary: "rgba(187, 13, 36, 1)",
		secondary: "rgba(4, 80, 142, 1)"
	},
	{
		theme: "rainy",
		bg: "rgba(228, 253, 225, 1)",
		text: "rgba(87, 87, 97, 1)",
		primary: "rgba(138, 203, 136, 1)",
		secondary: "rgba(100, 131, 129, 1)"
	}
];

const ThemeSwitcher = (props) => {
	const [ theme, setTheme ] = React.useState(getInitialTheme);
	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
	
	
	React.useEffect(() => {
		rawSetTheme(theme);
	}, [theme]);
	
	const rawSetTheme = (rawTheme) => {
		const getThemeSwitcher = document.body;
		getThemeSwitcher.setAttribute("data-theme", rawTheme);
		
		localStorage.setItem('color-theme', rawTheme);
	};
	
	
	const toggleThemeList = () => setIsComponentVisible(!isComponentVisible);
	
	const handleChangeTheme = (themeObj) => (event) => {
		if (themeObj.theme !== theme) {
			setTheme(themeObj.theme);
		}
		
		toggleThemeList();
	}
	
	return(
		<div className="theme-switcher" ref={ ref }>
			<span
				className="theme-switcher__main"
				onClick={ toggleThemeList }
			/>
			<ul className={ "theme-switcher__dropdown " + ((!isComponentVisible) ? "theme-switcher__dropdown-hide" : "") }
			>
				{ themeColorList.map(theme => {
					return <li className="theme-switcher__item">
						<span
							className="theme-switcher__toggle"
							style={{
								boxShadow: `0 0 5px ${ theme.secondary }`,
								border: `2px solid ${ theme.primary }`,
								background: theme.bg
							}}
							onClick={ handleChangeTheme(theme) }
						/>
					</li>
				}) }
			</ul>
		</div>
	)
}


export default ThemeSwitcher;