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
    beforeFirstRequest: boolean;
    css: {
        [key: string]: string;
    };
};
export declare const dispatchProps: {
    onRangeChange: (lowerBound: number | Date, upperBound: number | Date) => void;
    afterRangeChange: () => void;
};
export declare type PropsType = typeof stateProps & typeof dispatchProps & OwnProps;
export declare const RangeFacetContainer: React.ComponentClass<OwnProps, any>;
