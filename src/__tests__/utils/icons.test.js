import Icons from "../../utils/icons";


describe("Icons Utils", () => {
	it('should return icon thunderstorm', () => {
		expect(Icons(211)).toBe("wi wi-day-thunderstorm");
	});
	
	it('should return icon storm and add "day-" prefix', () => {
		expect(Icons(200)).toBe("wi wi-day-storm-showers");
	});
	
	it('should pass if the number as string', () => {
		expect(Icons("211")).toBe("wi wi-day-thunderstorm");
		expect(Icons("962")).toBe("wi wi-cloudy-gusts");
	});
	
	it('should return default icon storm-showers', () => {
		expect(Icons()).toBe("wi wi-day-storm-showers");
	});
	
	it('icon do not exists, return default icon', () => {
		expect(Icons(5000)).toBe("wi wi-day-storm");
	});
})