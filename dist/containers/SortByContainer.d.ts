/// <reference types="react" />
import * as React from "react";
export interface OwnProps {
    fields: {
        displayName: string;
        orderbyClause: string;
    }[];
    css: {
        [key: string]: string;
    };
}
export declare const stateProps: {
    beforeFirstRequest: boolean;
    css: {
        [key: string]: string;
    };
    orderby: string;
};
export declare const dispatchProps: {
    onSortChange: (fieldName: string) => void;
};
export declare type PropsType = typeof stateProps & typeof dispatchProps & OwnProps;
export declare const SortByContainer: React.ComponentClass<OwnProps>;
