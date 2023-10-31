import spotifyReducer from "./spotify.reducer";

describe("testing spotify reducer", () => {
    test("testing reducer's initial state",() => {
        let action = {};
        let returnedState = spotifyReducer(undefined, action)
        expect(returnedState).toEqual({"spotifyReducer": {}})
    });
    test("testing reducer's initial state",() => {
        let action = {type: "SET_SPOTIFY_DATA", payload: {bandName: "Shinedown"}};
        let returnedState = spotifyReducer(undefined, action)
        expect(returnedState).toEqual({"spotifyReducer": {"Shinedown": undefined}})
    });
})