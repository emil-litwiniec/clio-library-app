export default (state = {}, action) => {
    switch (action.type) {
        case "QUERY":
            return {
                query: action.query
            };
        default:
            return state;
    }
};
