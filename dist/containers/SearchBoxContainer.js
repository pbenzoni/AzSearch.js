"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var azsearchstore_1 = require("azsearchstore");
var SearchBox_1 = require("../components/SearchBox");
function getReturnType(expression) {
    return {};
}
var mapDispatchToProps = function (dispatch) {
    return {
        onInputChange: function (input) {
            dispatch(azsearchstore_1.inputActions.setInput(input));
        },
        suggest: function () {
            dispatch(azsearchstore_1.asyncActions.suggest);
        },
        clearSuggestions: function () {
            dispatch(azsearchstore_1.suggestionsActions.clearSuggestions());
        },
        clearFacetsAndSearch: function () {
            dispatch(azsearchstore_1.searchParameterActions.setPage(1));
            var urlParams = new URLSearchParams(window.location.search);
            urlParams.set("searchParams", azsearchstore_1.searchParameters);
            console.log("Searching");
            window.location.search = urlParams.toString();
            dispatch(azsearchstore_1.facetsActions.clearFacetsSelections());
            dispatch(azsearchstore_1.asyncActions.fetchSearchResults);
        }
    };
};
function mapStateToProps(state, ownProps) {
    return {
        input: state.parameters.input,
        preTag: state.parameters.suggestionsParameters.highlightPreTag,
        postTag: state.parameters.suggestionsParameters.highlightPostTag,
        suggestions: state.suggestions.suggestions,
        template: ownProps.template,
        css: ownProps.css,
        suggestionValueKey: ownProps.suggestionValueKey,
        suggesterName: state.parameters.suggestionsParameters.suggesterName
    };
}
exports.stateProps = getReturnType(mapStateToProps);
exports.dispatchProps = getReturnType(mapDispatchToProps);
exports.SearchBoxContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SearchBox_1.default);
//# sourceMappingURL=SearchBoxContainer.js.map