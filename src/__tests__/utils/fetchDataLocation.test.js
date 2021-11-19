import fetchDataLocation from "../../utils/fetchDataLocation";
import * as message from "../../libs/clientMessages/clientMessages";


describe("fetchDataLocation Utils", () => {
	const messageErrorFn = jest.fn((text) => text);
	
	beforeAll(() => {
		jest.mock("../../libs/clientMessages/clientMessages");
		message[ "messageError" ] = (text) => messageErrorFn(text);
	});
	
	afterAll(() => {
		jest.clearAllMocks();
	});
	
	it('should return object with latitude & longitude', async () => {
		const mockFetchLocation = Promise.resolve({
			json: () => Promise.resolve({ loc: "38.6435,48.5682" }),
			ok: () => true
		});
		
		fetch.resetMocks();
		fetch.mockImplementation(() => mockFetchLocation);
		
		const fetchLocation = await fetchDataLocation();
		
		expect(fetchLocation).toEqual({ latitude: '38.6435', longitude: '48.5682' })
	});
	
	it('should call error message', async () => {
		const mockFetchLocation = Promise.resolve({
			json: () => Promise.reject(new Error('Data empty')),
			ok: () => ({ status: 401 })
		});
		
		fetch.resetMocks();
		fetch.mockImplementation(() => mockFetchLocation);
		
		await fetchDataLocation();
		
		expect(messageErrorFn).toHaveBeenCalledTimes(1);
		expect(messageErrorFn.mock.calls[0][0]).toBe("Your location is not defined");
	});
	
})