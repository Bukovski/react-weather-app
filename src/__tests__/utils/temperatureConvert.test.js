import { kelvinToC } from "../../utils/temperatureConvert";


describe("kelvinToC Utils", () => {
	it('convert Kelvin to Celsius', () => {
		expect(kelvinToC(0)).toBe(-273);
		expect(kelvinToC(283.15)).toBe(10);
		expect(kelvinToC(256.15)).toBe(-17);
		expect(kelvinToC(256)).toBe(-17);
		expect(kelvinToC(-1)).toBe(-274);
	});
	
	it('should pass if the number as string', () => {
		expect(kelvinToC("0")).toBe(-273);
		expect(kelvinToC("283.15")).toBe(10);
		expect(kelvinToC("256")).toBe(-17);
		expect(kelvinToC("-1")).toBe(-274);
	});
});