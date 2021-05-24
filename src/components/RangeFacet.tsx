import * as React from "react";
import { PropsType } from "../containers/RangeFacetContainer";
import * as objAssign from "object-assign";
import { Store } from "azsearchstore";
import { defaultCss } from "../utils/css";
import { Range } from "rc-slider";
import * as Numeral from "numeral";

export type State = {};

class RangeFacet extends React.PureComponent<PropsType, State> {

    render() {
        const facet = this.props.facet as Store.RangeFacet;
        let css = objAssign({}, defaultCss, this.props.css);
        const { onRangeChange, afterRangeChange, beforeFirstRequest } = this.props;
        let lowerValue;
        let upperValue;
        let lowerLabel;
        let upperLabel;
        let minValue;
        let maxValue;

        if (!facet || beforeFirstRequest) {
            return <div></div>;
        }

        switch (facet.dataType) {
            case "number":
                lowerValue = facet.filterLowerBound as number;
                upperValue = facet.filterUpperBound as number;
                lowerLabel = Numeral(facet.filterLowerBound).format("0,0");
                upperLabel = Numeral(facet.filterUpperBound).format("0,0");
                minValue = facet.min as number;
                maxValue = facet.max as number;
                break;
            case "date":
                let lowerDate = facet.filterLowerBound as Date;
                let upperDate = facet.filterUpperBound as Date;

                lowerDate.setHours(0, 0, 0, 0);
                upperDate.setHours(23, 59, 0, 0);
                lowerValue = lowerDate.toISOString().split("T")[0];
                upperValue = upperDate.toISOString().split("T")[0];
                lowerLabel = <span> {(facet.filterLowerBound as Date).toLocaleDateString("en-US")} </span>;
                upperLabel = <span> {(facet.filterUpperBound as Date).toLocaleDateString("en-US")} </span>;
                minValue = (facet.min as Date).toISOString().split("T")[0];
                maxValue = (facet.max as Date).toISOString().split("T")[0];
                break;
        }
        let onChange = (value: number[]) => {
            const isDate = facet.dataType === "date";
            let lower = isDate ? new Date(value[0]) : value[0];
            let upper = isDate ? new Date(value[1]) : value[1];
            onRangeChange(lower, upper);
        };
        return (
            <div id="range-facet" className={css.searchFacets__rangeFacet}>
                <div className={css.searchFacets__facetHeaderContainer}>
                    <h4 className={css.searchFacets__facetHeader}>
                        <a data-toggle="collapse" className={css.searchFacets__facetHeaderLink}  >
                            <span className={css.searchFacets__facetHeaderIconOpen} aria-hidden="true"></span> {facet.key}
                        </a>
                    </h4>
                </div>
                <div className={css.searchFacets__facetControlContainer}>
                    <ul className={css.searchFacets__facetControlList}>
                        <li className={css.searchFacets__facetControl}>
                            <label htmlFor="start-date">Start:</label>
                            <input id="start-date" type="date" className={css.searchFacets__facetControlCheckbox}
                            min={minValue}
                            max={maxValue}
                            step={1}
                            value={lowerValue}/>
                            <label htmlFor="end-date">End:</label>
                            <input id="end-date" type="date" className={css.searchFacets__facetControlCheckbox}
                            min={minValue}
                            max={maxValue}
                            step={1}
                            value={upperValue}/>

                        </li>
                        <li className={css.searchFacets__facetControlRangeLabel}>
                            <span className={css.searchFacets__facetControlRangeLabelMin}>
                                {lowerLabel}
                            </span>
                            <span className={css.searchFacets__facetControlRangeLabelRange}>  <b> {" < (" + Numeral(facet.middleBucketCount).format("0,0") + ") < "} </b> </span>
                            <span className={css.searchFacets__facetControlRangeLabelMax}>
                                {upperLabel} 
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default RangeFacet;