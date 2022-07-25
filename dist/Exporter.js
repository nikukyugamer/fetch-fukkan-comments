"use strict";
exports.__esModule = true;
var format_1 = require("@fast-csv/format");
var Exporter = /** @class */ (function () {
    function Exporter(fukkanComments, outputCsvPath) {
        if (outputCsvPath === void 0) { outputCsvPath = 'fukkan_comments.csv'; }
        this.fukkanComments = fukkanComments;
        this.outputCsvPath = outputCsvPath;
    }
    Exporter.prototype.toCsv = function () {
        var headers = ['userId', 'userName', 'commentDetail', 'postedOn'];
        var rows = [];
        rows.push(headers);
        this.fukkanComments.forEach(function (comment) {
            rows.push([
                comment.userId,
                comment.userName,
                comment.commentDetail,
                comment.postedOn,
            ]);
        });
        (0, format_1.writeToPath)(this.outputCsvPath, rows)
            .on('error', function (err) { return console.error(err); })
            .on('finish', function () { return console.log('[LOG] CSV出力が完了しました。'); });
    };
    return Exporter;
}());
exports["default"] = Exporter;
