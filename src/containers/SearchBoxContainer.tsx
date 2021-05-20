import { Template } from "hogan.js";
import { connect } from "react-redux";
import * as React from "react";
import { Store, inputActions, suggestionsActions, asyncActions, facetsActions, searchParameterActions } from "azsearchstore";
import * as redux from "redux";
import SearchBox from "../components/SearchBox";

function getReturnType<RT>(expression: (...params: any[]) => RT): RT {
    return {} as RT;
}

export interface OwnProps {
    suggestionValueKey?: string;
    template: Template;
    css: { [key: string]: string; };
}

var savedRange = null;

const mapDispatchToProps = (dispatch: redux.Dispatch<any>) => {
    return {
        onInputChange: (input: string) => {
            dispatch(inputActions.setInput(input));
        },
        suggest: () => {
            dispatch(asyncActions.suggest);
        },
        clearSuggestions: () => {
            dispatch(suggestionsActions.clearSuggestions());
        },
        clearFacetsAndSearch: () => {
            var facetToSave = savedRange;
            facetToSave.facets = {};
             Object.keys(savedRange.facets).map(key => {
                if("tweetDate" === key){
                    facetToSave.facets[key] = savedRange.facets[key]

                }
            });
            console.log(facetToSave)
            dispatch(searchParameterActions.setPage(1));
            dispatch(facetsActions.clearFacetsSelections());
            dispatch(facetsActions.updateFacetsValues(facetToSave.facets));

            dispatch(asyncActions.fetchSearchResultsFromFacet);
        }
    };
};

function mapStateToProps(state: Store.SearchState, ownProps: OwnProps) {

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


export const stateProps = getReturnType(mapStateToProps);
export const dispatchProps = getReturnType(mapDispatchToProps);

export type PropsType = typeof stateProps & typeof dispatchProps;
type State = {};

export const SearchBoxContainer = connect(mapStateToProps, mapDispatchToProps)(SearchBox);