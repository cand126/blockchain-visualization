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
var Miner = (function (_super) {
    __extends(Miner, _super);
    function Miner(id) {
        var _this = _super.call(this, id) || this;
        _this.connect(eve.system.transports.getAll());
        return _this;
    }
    Miner.prototype.publish = function (to) {
    };
    Miner.prototype.receive = function (from, message) {
        console.log(from + " said: " + JSON.stringify(message));
    };
    return Miner;
}(eve.Agent));
exports.Miner = Miner;
//# sourceMappingURL=Miner.js.map