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
var eve = require("evejs");
var TransactionGenerator = (function (_super) {
    __extends(TransactionGenerator, _super);
    function TransactionGenerator(id) {
        var _this = _super.call(this, id) || this;
        _this.connect(eve.system.transports.getAll());
        return _this;
    }
    TransactionGenerator.prototype.generate = function () {
        var content = {
            from: "bob",
            to: "alice",
            message: "hello"
        };
        var transaction = {
            id: 1,
            type: "transaction",
            timestamp: new Date(),
            content: content
        };
        return transaction;
    };
    TransactionGenerator.prototype.publish = function (to) {
        var transaction = this.generate();
        this.send(to, transaction);
    };
    return TransactionGenerator;
}(eve.Agent));
exports.TransactionGenerator = TransactionGenerator;
//# sourceMappingURL=TransactionGenerator.js.map