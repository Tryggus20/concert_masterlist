import concertListReducer from "./concertList.reducer";


describe("testing concertList reducer", () => {
    test("testing reducer's initial state",() => {
        let action = {};
        let returnedState = concertListReducer(undefined, action)
        expect(returnedState).toEqual({"concertListReducer": []})
    });
    test("testing reducer's SET_LIST_VIEW state",() => {
        let action = {type: "SET_LIST_VIEW", payload: "1"};
        let returnedState = concertListReducer(undefined, action)
        expect(returnedState).toEqual({"concertListReducer": "1"})
    });
})