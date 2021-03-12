import * as React from "react";
import { Store } from "azsearchstore";
export interface OwnProps {
    facet: string;
    css: {
        [key: string]: string;
    };
}
export declare const stateProps: {
    facet: Store.Facet;
};
export declare const dispatchProps: {
    toggleFacet: (value: string) => void;
};
export declare type PropsType = typeof stateProps & typeof dispatchProps & OwnProps;
export declare const CheckboxFacetContainer: React.ComponentClass<OwnProps, any>;
