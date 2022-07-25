"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var playwright_1 = require("playwright");
var FetchFukkanComments = /** @class */ (function () {
    function FetchFukkanComments(bookNo, pageNo) {
        if (pageNo === void 0) { pageNo = 1; }
        this.bookNo = bookNo;
        this.pageNo = pageNo;
    }
    FetchFukkanComments.prototype.exec = function () {
        return __awaiter(this, void 0, void 0, function () {
            var browser, page, baseUrl, params, comments, fukkanComments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, playwright_1.chromium.launch()];
                    case 1:
                        browser = _a.sent();
                        return [4 /*yield*/, browser.newPage()];
                    case 2:
                        page = _a.sent();
                        baseUrl = 'https://www.fukkan.com/fk/VoteComment';
                        params = "?no=".concat(this.bookNo, "&page=").concat(this.pageNo, "&s=date");
                        return [4 /*yield*/, page.goto("".concat(baseUrl).concat(params))];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, page.locator('ul.comment_list li')];
                    case 4:
                        comments = _a.sent();
                        return [4 /*yield*/, this.setFukkanComments(comments)];
                    case 5:
                        fukkanComments = _a.sent();
                        return [4 /*yield*/, browser.close()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, fukkanComments];
                }
            });
        });
    };
    FetchFukkanComments.prototype.setFukkanComments = function (comments) {
        return __awaiter(this, void 0, void 0, function () {
            var numberOfComments, fukkanComments, i, userIdPath, userId, userName, commentDetail, postedOn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, comments.count()];
                    case 1:
                        numberOfComments = _a.sent();
                        fukkanComments = [];
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < numberOfComments)) return [3 /*break*/, 7];
                        return [4 /*yield*/, comments
                                .nth(i)
                                .locator('.comment_user a')
                                .getAttribute('href')];
                    case 3:
                        userIdPath = _a.sent();
                        userId = this.convertUserIdPathToUserId(userIdPath);
                        return [4 /*yield*/, comments
                                .nth(i)
                                .locator('.comment_user p')
                                .innerText()];
                    case 4:
                        userName = _a.sent();
                        return [4 /*yield*/, comments
                                .nth(i)
                                .locator('.comment_detail')
                                .innerText()];
                    case 5:
                        commentDetail = _a.sent();
                        postedOn = this.extractPostedOn(commentDetail);
                        fukkanComments.push({
                            userId: userId,
                            userName: userName,
                            commentDetail: commentDetail,
                            postedOn: postedOn
                        });
                        _a.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 2];
                    case 7: return [2 /*return*/, fukkanComments];
                }
            });
        });
    };
    // userIdPath: '/fk/user/?no=f98350f6a61e8245b'
    FetchFukkanComments.prototype.convertUserIdPathToUserId = function (userIdPath) {
        var params = Object.fromEntries(new URLSearchParams(userIdPath));
        return Object.values(params)[0] || '';
    };
    // commentDetail: 'ああああああ (2020/05/24)'
    FetchFukkanComments.prototype.extractPostedOn = function (commentDetail) {
        var regex = /\((\d{4}\/\d{2}\/\d{2})\)$/;
        var result = commentDetail.match(regex) || [];
        return result[1] || '';
    };
    return FetchFukkanComments;
}());
exports["default"] = FetchFukkanComments;
