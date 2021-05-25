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
            // var facetToSave   = {};
            //  Object.keys(savedRange.facets).map(key => {
            //     if("tweetDate" === key){
            //         savedRange.facets[key].min  = savedRange.facets[key].filterLowerBound;
            //         savedRange.facets[key].max  = savedRange.facets[key].filterUpperBound;
            var facetToSave = {};
            var min = savedRange.facets["tweetDate"].filterLowerBound;
            var max = savedRange.facets["tweetDate"].filterUpperBound;
            Object.keys(savedRange.facets).map(function (key) {
                if ("tweetDate" === key) {
                    savedRange.facets[key].min = savedRange.facets[key].filterLowerBound;
                    savedRange.facets[key].max = savedRange.facets[key].filterUpperBound;
                    facetToSave = savedRange.facets[key];
                }
            });
            //         facetToSave= savedRange.facets[key]
            //     }
            // });
            // savedRange.facets = {}
            // savedRange.facets["tweetDate"] = facetToSave
            // console.log(facetToSave)
            dispatch(azsearchstore_1.searchParameterActions.setPage(1));
            dispatch(azsearchstore_1.facetsActions.clearFacetsSelections());
            //
            //            dispatch(facetsActions.setFacetsValues(savedRange.facets));
            dispatch(azsearchstore_1.facetsActions.setFacetRange("tweetDate", min, max));
            dispatch(azsearchstore_1.asyncActions.fetchSearchResultsFromFacet);
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