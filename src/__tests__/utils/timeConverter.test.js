import { dateFromTimestamp, timeFromTimestamp } from "../../utils/timeConverter";


describe("timeConverter Utils", () => {
	it('dateFromTimestamp', () => {
		expect(dateFromTimestamp(1636551748950)).toBe("Tue, April 06")
	});
	
	it('timeFromTimestamp', () => {
		expect(timeFromTimestamp(1636551748950)).toBe("07:04")
	});
});