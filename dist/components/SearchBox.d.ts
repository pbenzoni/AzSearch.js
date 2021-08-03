import * as React from "react";
import { PropsType } from "../containers/SearchBoxContainer";
export declare type State = {};
declare class SearchBox extends React.PureComponent<PropsType, State> {
    onInputChange(changeEvent: React.ChangeEvent<HTMLInputElement>, newValue: any): void;
    handleKeyDown(evt: any): void;
    getSuggestionValue(suggestion: any): any;
    renderInputComponent(inputProps: any): JSX.Element;
    renderSuggestion(suggestion: any): JSX.Element;
    render(): JSX.Element;
}
export default SearchBox;
