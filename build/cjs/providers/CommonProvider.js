"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonProvider = void 0;
const react_1 = __importDefault(require("react"));
const AuthProvider_1 = require("./AuthProvider");
const CommonProvider = ({ children }) => (react_1.default.createElement(AuthProvider_1.AuthProvider, null, children));
exports.CommonProvider = CommonProvider;
//# sourceMappingURL=CommonProvider.js.map