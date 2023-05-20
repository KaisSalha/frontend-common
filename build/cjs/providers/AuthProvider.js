"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = exports.AuthContext = void 0;
const react_1 = __importStar(require("react"));
const core_1 = require("@aws-amplify/core");
const auth_1 = require("@aws-amplify/auth");
const react_query_1 = require("@tanstack/react-query");
exports.AuthContext = (0, react_1.createContext)({
    authenticated: false,
});
const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = (0, react_1.useState)(null);
    const queryClient = (0, react_query_1.useQueryClient)();
    (0, react_1.useEffect)(() => {
        auth_1.Auth.currentAuthenticatedUser()
            .then(() => {
            setAuthenticated(true);
        })
            .catch(() => setAuthenticated(false));
        core_1.Hub.listen("auth", ({ payload: { event } }) => {
            switch (event) {
                case "signIn":
                    setAuthenticated(true);
                    break;
                case "signOut":
                    setAuthenticated(false);
                    queryClient.clear();
                    break;
                default:
                    break;
            }
        });
    }, [queryClient]);
    const value = (0, react_1.useMemo)(() => ({
        authenticated,
    }), [authenticated]);
    return (react_1.default.createElement(exports.AuthContext.Provider, { value: value }, children));
};
exports.AuthProvider = AuthProvider;
//# sourceMappingURL=AuthProvider.js.map