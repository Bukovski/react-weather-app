import fetchDataLocation from "../../utils/fetchDataLocation";
import * as message from "../../libs/clientMessages/clientMessages";


describe("fetchDataLocation Utils", () => {
	const messageErrorFn = jest.fn((text) => text);
	
	beforeAll(() => {
		jest.mock("../../libs/clientMessages/clientMessages");
		message[ "messageError" ] = (text) => messageErrorFn(text);
	});
	
	it('should return object with latitude & longitude', async () => {
		const mockFetchPromise = Promise.resolve({
			json: () => Promise.resolve({ loc: "990,880" }),
			ok: () => true
		});
		
		fetch.resetMocks();
		fetch.mockImplementation(() => mockFetchPromise);
		
		const fetchLocation = await fetchDataLocation();
		
		expect(fetchLocation).toEqual({ latitude: '990', longitude: '880' })
	});
	
	it('should call error message', async () => {
		const mockFetchPromise = Promise.resolve({
			json: () => Promise.reject(new Error('Data empty')),
			ok: () => ({ status: 401 })
		});
		
		fetch.resetMocks();
		fetch.mockImplementation(() => mockFetchPromise);
		
		await fetchDataLocation();
		
		expect(messageErrorFn).toHaveBeenCalledTimes(1);
		expect(messageErrorFn.mock.calls[0][0]).toBe("Your location is not defined");
	});
	
})