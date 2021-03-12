"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var objAssign = require("object-assign");
var css_1 = require("../utils/css");
var rc_slider_1 = require("rc-slider");
var Numeral = require("numeral");
var RangeFacet = /** @class */ (function (_super) {
    __extends(RangeFacet, _super);
    function RangeFacet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeFacet.prototype.render = function () {
        var facet = this.props.facet;
        var css = objAssign({}, css_1.defaultCss, this.props.css);
        var _a = this.props, onRangeChange = _a.onRangeChange, afterRangeChange = _a.afterRangeChange, beforeFirstRequest = _a.beforeFirstRequest;
        var lowerValue;
        var upperValue;
        var lowerLabel;
        var upperLabel;
        var minValue;
        var maxValue;
        if (!facet || beforeFirstRequest) {
            return React.createElement("div", null);
        }
        switch (facet.dataType) {
            case "number":
                lowerValue = facet.filterLowerBound;
                upperValue = facet.filterUpperBound;
                lowerLabel = Numeral(facet.filterLowerBound).format("0.0a");
                upperLabel = Numeral(facet.filterUpperBound).format("0.0a");
                minValue = facet.min;
                maxValue = facet.max;
                break;
            case "date":
                lowerValue = facet.filterLowerBound.getTime();
                upperValue = facet.filterUpperBound.getTime();
                lowerLabel = React.createElement("span", null,
                    " ",
                    facet.filterLowerBound.toISOString(),
                    " ",
                    React.createElement("br", null),
                    " ");
                upperLabel = React.createElement("span", null,
                    " ",
                    React.createElement("br", null),
                    " ",
                    facet.filterUpperBound.toISOString(),
                    " ");
                minValue = facet.min.getTime();
                maxValue = facet.max.getTime();
                break;
        }
        var onChange = function (value) {
            var isDate = facet.dataType === "date";
            var lower = isDate ? new Date(value[0]) : value[0];
            var upper = isDate ? new Date(value[1]) : value[1];
            onRangeChange(lower, upper);
        };
        var upperBoundLabel = facet.filterUpperBound === facet.max ? " <" : "";
        return (React.createElement("div", { className: css.searchFacets__rangeFacet },
            React.createElement("div", { className: css.searchFacets__facetHeaderContainer },
                React.createElement("h4", { className: css.searchFacets__facetHeader },
                    React.createElement("a", { "data-toggle": "collapse", className: css.searchFacets__facetHeaderLink },
                        React.createElement("span", { className: css.searchFacets__facetHeaderIconOpen, "aria-hidden": "true" }),
                        " ",
                        facet.key))),
            React.createElement("div", { className: css.searchFacets__facetControlContainer },
                React.createElement("ul", { className: css.searchFacets__facetControlList },
                    React.createElement("li", { className: css.searchFacets__facetControl },
                        React.createElement(rc_slider_1.Range, { value: [lowerValue,
                                upperValue], min: minValue, max: maxValue, onChange: onChange, onAfterChange: afterRangeChange, step: 1, pushable: true, className: css.searchFacets__sliderContainer })),
                    React.createElement("li", { className: css.searchFacets__facetControlRangeLabel },
                        React.createElement("span", { className: css.searchFacets__facetControlRangeLabelMin }, lowerLabel),
                        React.createElement("span", { className: css.searchFacets__facetControlRangeLabelRange },
                            "  ",
                            React.createElement("b", null,
                                " ",
                                "< " + Numeral(facet.middleBucketCount).format("0,0") + " <",
                                " "),
                            " "),
                        React.createElement("span", { className: css.searchFacets__facetControlRangeLabelMax },
                            upperLabel,
                            " ",
                            upperBoundLabel))))));
    };
    return RangeFacet;
}(React.PureComponent));
exports.default = RangeFacet;
//# sourceMappingURL=RangeFacet.js.map