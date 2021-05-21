"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var azsearchstore_1 = require("azsearchstore");
var SearchBox_1 = require("../components/SearchBox");
function getReturnType(expression) {
    return {};
}
var savedRange = null;
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
            var facetToSave = {};
            var filterLowerBound = null;
            var filterUpperBound = null;
            Object.keys(savedRange.facets).map(function (key) {
                if ("tweetDate" === key) {
                    filterLowerBound = savedRange.facets[key].filterLowerBound;
                    filterUpperBound = savedRange.facets[key].filterUpperBound;
                    facetToSave = savedRange.facets[key];
                }
            });
            // console.log(facetToSave)
            dispatch(azsearchstore_1.searchParameterActions.setPage(1));
            dispatch(azsearchstore_1.facetsActions.clearFacetsSelections());
            dispatch(azsearchstore_1.asyncActions.fetchSearchResults);
            if (filterLowerBound != null) {
                dispatch(azsearchstore_1.facetsActions.setFacetRange("tweetDate", filterLowerBound, filterUpperBound));
                dispatch(azsearchstore_1.facetsActions.setFacetsValues(facetToSave));
                dispatch(azsearchstore_1.asyncActions.fetchSearchResults);
            }
        }
    };
};
function mapStateToProps(state, ownProps) {
    savedRange = state.facets || null;
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