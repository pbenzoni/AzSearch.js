import { Template } from "hogan.js";
import * as React from "react";
export interface OwnProps {
    template: Template;
    css: {
        [key: string]: string;
    };
}
export declare const stateProps: {
    results: {}[];
    count: number;
    top: number;
    skip: number;
    template: Template;
    css: {
        [key: string]: string;
    };
};
export declare const dispatchProps: {};
export declare type PropsType = typeof stateProps & typeof dispatchProps;
export declare const ResultsContainer: React.ComponentClass<OwnProps, any>;
