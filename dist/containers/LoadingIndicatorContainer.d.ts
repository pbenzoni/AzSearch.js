/// <reference types="react" />
import * as React from "react";
export interface OwnProps {
}
export declare const stateProps: {
    isLoading: boolean;
};
export declare const dispatchProps: {};
export declare type PropsType = typeof stateProps & typeof dispatchProps & OwnProps;
export declare const LoadingIndicatorContainer: React.ComponentClass<OwnProps>;
