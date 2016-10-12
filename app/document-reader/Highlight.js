"use strict";
var Highlight = (function () {
    function Highlight(id, R, G, B, A) {
        this.id = id;
        this.R = R;
        this.G = G;
        this.B = B;
        this.A = A;
    }
    Highlight.prototype.getStyle = function () {
        var backgroundColor;
        var borderColor;
        var borderWidth;
        borderColor = "rgba(" + this.R + "," + this.G + "," + this.B + ",1";
        backgroundColor = "rgba(" + this.R + "," + this.G + "," + this.B + "," + this.A + ")";
        borderWidth = 1;
        if (this.hover) {
            backgroundColor = "rgba(" + this.R + "," + this.G + "," + this.B + "," + this.A * 3 / 2 + ")";
        }
        if (this.auto) {
            borderWidth = 7;
        }
        return {
            "backgroundColor": backgroundColor,
            "borderColor": borderColor,
            "borderWidth": borderWidth,
        };
    };
    Highlight.prototype.getColor = function () {
        return "rgba(" + this.R + "," + this.G + "," + this.B + "," + this.A + ")";
    };
    return Highlight;
}());
exports.Highlight = Highlight;
//# sourceMappingURL=highlight.js.map