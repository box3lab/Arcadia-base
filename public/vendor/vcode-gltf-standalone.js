// Auto-extracted vcode-gltf-standalone from box3lab.js
// Exposes: window.exportVCodeToGltf(hash) -> Promise<{hash, fileName, gltfText, summary}>
// Do not edit manually - regenerate with: node extract-vcode-gltf.js

var __create = Object.create
  , __defProp = Object.defineProperty
  , __getOwnPropDesc = Object.getOwnPropertyDescriptor
  , __getOwnPropNames = Object.getOwnPropertyNames
  , __getProtoOf = Object.getPrototypeOf
  , __hasOwnProp = Object.prototype.hasOwnProperty
  , __commonJS = (a, e) => function() {
    return e || (0,
    a[__getOwnPropNames(a)[0]])((e = {
        exports: {}
    }).exports, e),
    e.exports
}
  , __copyProps = (a, e, n, c) => {
    if (e && typeof e == "object" || typeof e == "function")
        for (let d of __getOwnPropNames(e))
            !__hasOwnProp.call(a, d) && d !== n && __defProp(a, d, {
                get: () => e[d],
                enumerable: !(c = __getOwnPropDesc(e, d)) || c.enumerable
            });
    return a
}
  , __toESM = (a, e, n) => (n = a != null ? __create(__getProtoOf(a)) : {},
__copyProps(!a || !a.__esModule ? __defProp(n, "default", {
    value: a,
    enumerable: !0
}) : n, a))
  , require_common = __commonJS({
    "src/utils/vcode-gltf-standalone/node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/common.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.RANDOM = a.EPSILON = a.ARRAY_TYPE = a.ANGLE_ORDER = void 0,
        a.equals = b,
        a.round = n,
        a.setMatrixArrayType = c,
        a.toDegree = m,
        a.toRadian = u;
        var e = a.EPSILON = 1e-6;
        a.ARRAY_TYPE = typeof Float32Array < "u" ? Float32Array : Array,
        a.RANDOM = Math.random,
        a.ANGLE_ORDER = "zyx";
        function n(v) {
            return v >= 0 ? Math.round(v) : v % .5 === 0 ? Math.floor(v) : Math.round(v)
        }
        function c(v) {
            a.ARRAY_TYPE = v
        }
        var d = Math.PI / 180
          , l = 180 / Math.PI;
        function u(v) {
            return v * d
        }
        function m(v) {
            return v * l
        }
        function b(v, _) {
            var T = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e;
            return Math.abs(v - _) <= T * Math.max(1, Math.abs(v), Math.abs(_))
        }
    }
})
  , require_mat2 = __commonJS({
    "src/utils/vcode-gltf-standalone/node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/mat2.js"(a) {
        function e(f) {
            "@babel/helpers - typeof";
            return e = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(y) {
                return typeof y
            }
            : function(y) {
                return y && typeof Symbol == "function" && y.constructor === Symbol && y !== Symbol.prototype ? "symbol" : typeof y
            }
            ,
            e(f)
        }
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.LDU = Z,
        a.add = H,
        a.adjoint = C,
        a.clone = l,
        a.copy = u,
        a.create = d,
        a.determinant = K,
        a.equals = re,
        a.exactEquals = ae,
        a.frob = Y,
        a.fromRotation = k,
        a.fromScaling = V,
        a.fromValues = b,
        a.identity = m,
        a.invert = T,
        a.mul = void 0,
        a.multiply = I,
        a.multiplyScalar = z,
        a.multiplyScalarAndAdd = B,
        a.rotate = O,
        a.scale = q,
        a.set = v,
        a.str = $,
        a.sub = void 0,
        a.subtract = J,
        a.transpose = _;
        var n = c(require_common());
        function c(f, y) {
            if (typeof WeakMap == "function")
                var X = new WeakMap
                  , N = new WeakMap;
            return (c = function(D, F) {
                if (!F && D && D.__esModule)
                    return D;
                var M, E, U = {
                    __proto__: null,
                    default: D
                };
                if (D === null || e(D) != "object" && typeof D != "function")
                    return U;
                if (M = F ? N : X) {
                    if (M.has(D))
                        return M.get(D);
                    M.set(D, U)
                }
                for (var Q in D)
                    Q !== "default" && {}.hasOwnProperty.call(D, Q) && ((E = (M = Object.defineProperty) && Object.getOwnPropertyDescriptor(D, Q)) && (E.get || E.set) ? M(U, Q, E) : U[Q] = D[Q]);
                return U
            }
            )(f, y)
        }
        function d() {
            var f = new n.ARRAY_TYPE(4);
            return n.ARRAY_TYPE != Float32Array && (f[1] = 0,
            f[2] = 0),
            f[0] = 1,
            f[3] = 1,
            f
        }
        function l(f) {
            var y = new n.ARRAY_TYPE(4);
            return y[0] = f[0],
            y[1] = f[1],
            y[2] = f[2],
            y[3] = f[3],
            y
        }
        function u(f, y) {
            return f[0] = y[0],
            f[1] = y[1],
            f[2] = y[2],
            f[3] = y[3],
            f
        }
        function m(f) {
            return f[0] = 1,
            f[1] = 0,
            f[2] = 0,
            f[3] = 1,
            f
        }
        function b(f, y, X, N) {
            var R = new n.ARRAY_TYPE(4);
            return R[0] = f,
            R[1] = y,
            R[2] = X,
            R[3] = N,
            R
        }
        function v(f, y, X, N, R) {
            return f[0] = y,
            f[1] = X,
            f[2] = N,
            f[3] = R,
            f
        }
        function _(f, y) {
            if (f === y) {
                var X = y[1];
                f[1] = y[2],
                f[2] = X
            } else
                f[0] = y[0],
                f[1] = y[2],
                f[2] = y[1],
                f[3] = y[3];
            return f
        }
        function T(f, y) {
            var X = y[0]
              , N = y[1]
              , R = y[2]
              , D = y[3]
              , F = X * D - R * N;
            return F ? (F = 1 / F,
            f[0] = D * F,
            f[1] = -N * F,
            f[2] = -R * F,
            f[3] = X * F,
            f) : null
        }
        function C(f, y) {
            var X = y[0];
            return f[0] = y[3],
            f[1] = -y[1],
            f[2] = -y[2],
            f[3] = X,
            f
        }
        function K(f) {
            return f[0] * f[3] - f[2] * f[1]
        }
        function I(f, y, X) {
            var N = y[0]
              , R = y[1]
              , D = y[2]
              , F = y[3]
              , M = X[0]
              , E = X[1]
              , U = X[2]
              , Q = X[3];
            return f[0] = N * M + D * E,
            f[1] = R * M + F * E,
            f[2] = N * U + D * Q,
            f[3] = R * U + F * Q,
            f
        }
        function O(f, y, X) {
            var N = y[0]
              , R = y[1]
              , D = y[2]
              , F = y[3]
              , M = Math.sin(X)
              , E = Math.cos(X);
            return f[0] = N * E + D * M,
            f[1] = R * E + F * M,
            f[2] = N * -M + D * E,
            f[3] = R * -M + F * E,
            f
        }
        function q(f, y, X) {
            var N = y[0]
              , R = y[1]
              , D = y[2]
              , F = y[3]
              , M = X[0]
              , E = X[1];
            return f[0] = N * M,
            f[1] = R * M,
            f[2] = D * E,
            f[3] = F * E,
            f
        }
        function k(f, y) {
            var X = Math.sin(y)
              , N = Math.cos(y);
            return f[0] = N,
            f[1] = X,
            f[2] = -X,
            f[3] = N,
            f
        }
        function V(f, y) {
            return f[0] = y[0],
            f[1] = 0,
            f[2] = 0,
            f[3] = y[1],
            f
        }
        function $(f) {
            return "mat2(" + f[0] + ", " + f[1] + ", " + f[2] + ", " + f[3] + ")"
        }
        function Y(f) {
            return Math.sqrt(f[0] * f[0] + f[1] * f[1] + f[2] * f[2] + f[3] * f[3])
        }
        function Z(f, y, X, N) {
            return f[2] = N[2] / N[0],
            X[0] = N[0],
            X[1] = N[1],
            X[3] = N[3] - f[2] * X[1],
            [f, y, X]
        }
        function H(f, y, X) {
            return f[0] = y[0] + X[0],
            f[1] = y[1] + X[1],
            f[2] = y[2] + X[2],
            f[3] = y[3] + X[3],
            f
        }
        function J(f, y, X) {
            return f[0] = y[0] - X[0],
            f[1] = y[1] - X[1],
            f[2] = y[2] - X[2],
            f[3] = y[3] - X[3],
            f
        }
        function ae(f, y) {
            return f[0] === y[0] && f[1] === y[1] && f[2] === y[2] && f[3] === y[3]
        }
        function re(f, y) {
            var X = f[0]
              , N = f[1]
              , R = f[2]
              , D = f[3]
              , F = y[0]
              , M = y[1]
              , E = y[2]
              , U = y[3];
            return Math.abs(X - F) <= n.EPSILON * Math.max(1, Math.abs(X), Math.abs(F)) && Math.abs(N - M) <= n.EPSILON * Math.max(1, Math.abs(N), Math.abs(M)) && Math.abs(R - E) <= n.EPSILON * Math.max(1, Math.abs(R), Math.abs(E)) && Math.abs(D - U) <= n.EPSILON * Math.max(1, Math.abs(D), Math.abs(U))
        }
        function z(f, y, X) {
            return f[0] = y[0] * X,
            f[1] = y[1] * X,
            f[2] = y[2] * X,
            f[3] = y[3] * X,
            f
        }
        function B(f, y, X, N) {
            return f[0] = y[0] + X[0] * N,
            f[1] = y[1] + X[1] * N,
            f[2] = y[2] + X[2] * N,
            f[3] = y[3] + X[3] * N,
            f
        }
        a.mul = I,
        a.sub = J
    }
})
  , require_mat2d = __commonJS({
    "src/utils/vcode-gltf-standalone/node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/mat2d.js"(a) {
        function e(B) {
            "@babel/helpers - typeof";
            return e = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(f) {
                return typeof f
            }
            : function(f) {
                return f && typeof Symbol == "function" && f.constructor === Symbol && f !== Symbol.prototype ? "symbol" : typeof f
            }
            ,
            e(B)
        }
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.add = Z,
        a.clone = l,
        a.copy = u,
        a.create = d,
        a.determinant = T,
        a.equals = z,
        a.exactEquals = re,
        a.frob = Y,
        a.fromRotation = q,
        a.fromScaling = k,
        a.fromTranslation = V,
        a.fromValues = b,
        a.identity = m,
        a.invert = _,
        a.mul = void 0,
        a.multiply = C,
        a.multiplyScalar = J,
        a.multiplyScalarAndAdd = ae,
        a.rotate = K,
        a.scale = I,
        a.set = v,
        a.str = $,
        a.sub = void 0,
        a.subtract = H,
        a.translate = O;
        var n = c(require_common());
        function c(B, f) {
            if (typeof WeakMap == "function")
                var y = new WeakMap
                  , X = new WeakMap;
            return (c = function(R, D) {
                if (!D && R && R.__esModule)
                    return R;
                var F, M, E = {
                    __proto__: null,
                    default: R
                };
                if (R === null || e(R) != "object" && typeof R != "function")
                    return E;
                if (F = D ? X : y) {
                    if (F.has(R))
                        return F.get(R);
                    F.set(R, E)
                }
                for (var U in R)
                    U !== "default" && {}.hasOwnProperty.call(R, U) && ((M = (F = Object.defineProperty) && Object.getOwnPropertyDescriptor(R, U)) && (M.get || M.set) ? F(E, U, M) : E[U] = R[U]);
                return E
            }
            )(B, f)
        }
        function d() {
            var B = new n.ARRAY_TYPE(6);
            return n.ARRAY_TYPE != Float32Array && (B[1] = 0,
            B[2] = 0,
            B[4] = 0,
            B[5] = 0),
            B[0] = 1,
            B[3] = 1,
            B
        }
        function l(B) {
            var f = new n.ARRAY_TYPE(6);
            return f[0] = B[0],
            f[1] = B[1],
            f[2] = B[2],
            f[3] = B[3],
            f[4] = B[4],
            f[5] = B[5],
            f
        }
        function u(B, f) {
            return B[0] = f[0],
            B[1] = f[1],
            B[2] = f[2],
            B[3] = f[3],
            B[4] = f[4],
            B[5] = f[5],
            B
        }
        function m(B) {
            return B[0] = 1,
            B[1] = 0,
            B[2] = 0,
            B[3] = 1,
            B[4] = 0,
            B[5] = 0,
            B
        }
        function b(B, f, y, X, N, R) {
            var D = new n.ARRAY_TYPE(6);
            return D[0] = B,
            D[1] = f,
            D[2] = y,
            D[3] = X,
            D[4] = N,
            D[5] = R,
            D
        }
        function v(B, f, y, X, N, R, D) {
            return B[0] = f,
            B[1] = y,
            B[2] = X,
            B[3] = N,
            B[4] = R,
            B[5] = D,
            B
        }
        function _(B, f) {
            var y = f[0]
              , X = f[1]
              , N = f[2]
              , R = f[3]
              , D = f[4]
              , F = f[5]
              , M = y * R - X * N;
            return M ? (M = 1 / M,
            B[0] = R * M,
            B[1] = -X * M,
            B[2] = -N * M,
            B[3] = y * M,
            B[4] = (N * F - R * D) * M,
            B[5] = (X * D - y * F) * M,
            B) : null
        }
        function T(B) {
            return B[0] * B[3] - B[1] * B[2]
        }
        function C(B, f, y) {
            var X = f[0]
              , N = f[1]
              , R = f[2]
              , D = f[3]
              , F = f[4]
              , M = f[5]
              , E = y[0]
              , U = y[1]
              , Q = y[2]
              , ie = y[3]
              , te = y[4]
              , oe = y[5];
            return B[0] = X * E + R * U,
            B[1] = N * E + D * U,
            B[2] = X * Q + R * ie,
            B[3] = N * Q + D * ie,
            B[4] = X * te + R * oe + F,
            B[5] = N * te + D * oe + M,
            B
        }
        function K(B, f, y) {
            var X = f[0]
              , N = f[1]
              , R = f[2]
              , D = f[3]
              , F = f[4]
              , M = f[5]
              , E = Math.sin(y)
              , U = Math.cos(y);
            return B[0] = X * U + R * E,
            B[1] = N * U + D * E,
            B[2] = X * -E + R * U,
            B[3] = N * -E + D * U,
            B[4] = F,
            B[5] = M,
            B
        }
        function I(B, f, y) {
            var X = f[0]
              , N = f[1]
              , R = f[2]
              , D = f[3]
              , F = f[4]
              , M = f[5]
              , E = y[0]
              , U = y[1];
            return B[0] = X * E,
            B[1] = N * E,
            B[2] = R * U,
            B[3] = D * U,
            B[4] = F,
            B[5] = M,
            B
        }
        function O(B, f, y) {
            var X = f[0]
              , N = f[1]
              , R = f[2]
              , D = f[3]
              , F = f[4]
              , M = f[5]
              , E = y[0]
              , U = y[1];
            return B[0] = X,
            B[1] = N,
            B[2] = R,
            B[3] = D,
            B[4] = X * E + R * U + F,
            B[5] = N * E + D * U + M,
            B
        }
        function q(B, f) {
            var y = Math.sin(f)
              , X = Math.cos(f);
            return B[0] = X,
            B[1] = y,
            B[2] = -y,
            B[3] = X,
            B[4] = 0,
            B[5] = 0,
            B
        }
        function k(B, f) {
            return B[0] = f[0],
            B[1] = 0,
            B[2] = 0,
            B[3] = f[1],
            B[4] = 0,
            B[5] = 0,
            B
        }
        function V(B, f) {
            return B[0] = 1,
            B[1] = 0,
            B[2] = 0,
            B[3] = 1,
            B[4] = f[0],
            B[5] = f[1],
            B
        }
        function $(B) {
            return "mat2d(" + B[0] + ", " + B[1] + ", " + B[2] + ", " + B[3] + ", " + B[4] + ", " + B[5] + ")"
        }
        function Y(B) {
            return Math.sqrt(B[0] * B[0] + B[1] * B[1] + B[2] * B[2] + B[3] * B[3] + B[4] * B[4] + B[5] * B[5] + 1)
        }
        function Z(B, f, y) {
            return B[0] = f[0] + y[0],
            B[1] = f[1] + y[1],
            B[2] = f[2] + y[2],
            B[3] = f[3] + y[3],
            B[4] = f[4] + y[4],
            B[5] = f[5] + y[5],
            B
        }
        function H(B, f, y) {
            return B[0] = f[0] - y[0],
            B[1] = f[1] - y[1],
            B[2] = f[2] - y[2],
            B[3] = f[3] - y[3],
            B[4] = f[4] - y[4],
            B[5] = f[5] - y[5],
            B
        }
        function J(B, f, y) {
            return B[0] = f[0] * y,
            B[1] = f[1] * y,
            B[2] = f[2] * y,
            B[3] = f[3] * y,
            B[4] = f[4] * y,
            B[5] = f[5] * y,
            B
        }
        function ae(B, f, y, X) {
            return B[0] = f[0] + y[0] * X,
            B[1] = f[1] + y[1] * X,
            B[2] = f[2] + y[2] * X,
            B[3] = f[3] + y[3] * X,
            B[4] = f[4] + y[4] * X,
            B[5] = f[5] + y[5] * X,
            B
        }
        function re(B, f) {
            return B[0] === f[0] && B[1] === f[1] && B[2] === f[2] && B[3] === f[3] && B[4] === f[4] && B[5] === f[5]
        }
        function z(B, f) {
            var y = B[0]
              , X = B[1]
              , N = B[2]
              , R = B[3]
              , D = B[4]
              , F = B[5]
              , M = f[0]
              , E = f[1]
              , U = f[2]
              , Q = f[3]
              , ie = f[4]
              , te = f[5];
            return Math.abs(y - M) <= n.EPSILON * Math.max(1, Math.abs(y), Math.abs(M)) && Math.abs(X - E) <= n.EPSILON * Math.max(1, Math.abs(X), Math.abs(E)) && Math.abs(N - U) <= n.EPSILON * Math.max(1, Math.abs(N), Math.abs(U)) && Math.abs(R - Q) <= n.EPSILON * Math.max(1, Math.abs(R), Math.abs(Q)) && Math.abs(D - ie) <= n.EPSILON * Math.max(1, Math.abs(D), Math.abs(ie)) && Math.abs(F - te) <= n.EPSILON * Math.max(1, Math.abs(F), Math.abs(te))
        }
        a.mul = C,
        a.sub = H
    }
})
  , require_mat3 = __commonJS({
    "src/utils/vcode-gltf-standalone/node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/mat3.js"(a) {
        function e(F) {
            "@babel/helpers - typeof";
            return e = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(M) {
                return typeof M
            }
            : function(M) {
                return M && typeof Symbol == "function" && M.constructor === Symbol && M !== Symbol.prototype ? "symbol" : typeof M
            }
            ,
            e(F)
        }
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.add = f,
        a.adjoint = K,
        a.clone = u,
        a.copy = m,
        a.create = d,
        a.determinant = I,
        a.equals = D,
        a.exactEquals = R,
        a.frob = B,
        a.fromMat2d = H,
        a.fromMat4 = l,
        a.fromQuat = J,
        a.fromRotation = Y,
        a.fromScaling = Z,
        a.fromTranslation = $,
        a.fromValues = b,
        a.identity = _,
        a.invert = C,
        a.mul = void 0,
        a.multiply = O,
        a.multiplyScalar = X,
        a.multiplyScalarAndAdd = N,
        a.normalFromMat4 = ae,
        a.projection = re,
        a.rotate = k,
        a.scale = V,
        a.set = v,
        a.str = z,
        a.sub = void 0,
        a.subtract = y,
        a.translate = q,
        a.transpose = T;
        var n = c(require_common());
        function c(F, M) {
            if (typeof WeakMap == "function")
                var E = new WeakMap
                  , U = new WeakMap;
            return (c = function(ie, te) {
                if (!te && ie && ie.__esModule)
                    return ie;
                var oe, he, j = {
                    __proto__: null,
                    default: ie
                };
                if (ie === null || e(ie) != "object" && typeof ie != "function")
                    return j;
                if (oe = te ? U : E) {
                    if (oe.has(ie))
                        return oe.get(ie);
                    oe.set(ie, j)
                }
                for (var se in ie)
                    se !== "default" && {}.hasOwnProperty.call(ie, se) && ((he = (oe = Object.defineProperty) && Object.getOwnPropertyDescriptor(ie, se)) && (he.get || he.set) ? oe(j, se, he) : j[se] = ie[se]);
                return j
            }
            )(F, M)
        }
        function d() {
            var F = new n.ARRAY_TYPE(9);
            return n.ARRAY_TYPE != Float32Array && (F[1] = 0,
            F[2] = 0,
            F[3] = 0,
            F[5] = 0,
            F[6] = 0,
            F[7] = 0),
            F[0] = 1,
            F[4] = 1,
            F[8] = 1,
            F
        }
        function l(F, M) {
            return F[0] = M[0],
            F[1] = M[1],
            F[2] = M[2],
            F[3] = M[4],
            F[4] = M[5],
            F[5] = M[6],
            F[6] = M[8],
            F[7] = M[9],
            F[8] = M[10],
            F
        }
        function u(F) {
            var M = new n.ARRAY_TYPE(9);
            return M[0] = F[0],
            M[1] = F[1],
            M[2] = F[2],
            M[3] = F[3],
            M[4] = F[4],
            M[5] = F[5],
            M[6] = F[6],
            M[7] = F[7],
            M[8] = F[8],
            M
        }
        function m(F, M) {
            return F[0] = M[0],
            F[1] = M[1],
            F[2] = M[2],
            F[3] = M[3],
            F[4] = M[4],
            F[5] = M[5],
            F[6] = M[6],
            F[7] = M[7],
            F[8] = M[8],
            F
        }
        function b(F, M, E, U, Q, ie, te, oe, he) {
            var j = new n.ARRAY_TYPE(9);
            return j[0] = F,
            j[1] = M,
            j[2] = E,
            j[3] = U,
            j[4] = Q,
            j[5] = ie,
            j[6] = te,
            j[7] = oe,
            j[8] = he,
            j
        }
        function v(F, M, E, U, Q, ie, te, oe, he, j) {
            return F[0] = M,
            F[1] = E,
            F[2] = U,
            F[3] = Q,
            F[4] = ie,
            F[5] = te,
            F[6] = oe,
            F[7] = he,
            F[8] = j,
            F
        }
        function _(F) {
            return F[0] = 1,
            F[1] = 0,
            F[2] = 0,
            F[3] = 0,
            F[4] = 1,
            F[5] = 0,
            F[6] = 0,
            F[7] = 0,
            F[8] = 1,
            F
        }
        function T(F, M) {
            if (F === M) {
                var E = M[1]
                  , U = M[2]
                  , Q = M[5];
                F[1] = M[3],
                F[2] = M[6],
                F[3] = E,
                F[5] = M[7],
                F[6] = U,
                F[7] = Q
            } else
                F[0] = M[0],
                F[1] = M[3],
                F[2] = M[6],
                F[3] = M[1],
                F[4] = M[4],
                F[5] = M[7],
                F[6] = M[2],
                F[7] = M[5],
                F[8] = M[8];
            return F
        }
        function C(F, M) {
            var E = M[0]
              , U = M[1]
              , Q = M[2]
              , ie = M[3]
              , te = M[4]
              , oe = M[5]
              , he = M[6]
              , j = M[7]
              , se = M[8]
              , ue = se * te - oe * j
              , _e = -se * ie + oe * he
              , Xe = j * ie - te * he
              , pe = E * ue + U * _e + Q * Xe;
            return pe ? (pe = 1 / pe,
            F[0] = ue * pe,
            F[1] = (-se * U + Q * j) * pe,
            F[2] = (oe * U - Q * te) * pe,
            F[3] = _e * pe,
            F[4] = (se * E - Q * he) * pe,
            F[5] = (-oe * E + Q * ie) * pe,
            F[6] = Xe * pe,
            F[7] = (-j * E + U * he) * pe,
            F[8] = (te * E - U * ie) * pe,
            F) : null
        }
        function K(F, M) {
            var E = M[0]
              , U = M[1]
              , Q = M[2]
              , ie = M[3]
              , te = M[4]
              , oe = M[5]
              , he = M[6]
              , j = M[7]
              , se = M[8];
            return F[0] = te * se - oe * j,
            F[1] = Q * j - U * se,
            F[2] = U * oe - Q * te,
            F[3] = oe * he - ie * se,
            F[4] = E * se - Q * he,
            F[5] = Q * ie - E * oe,
            F[6] = ie * j - te * he,
            F[7] = U * he - E * j,
            F[8] = E * te - U * ie,
            F
        }
        function I(F) {
            var M = F[0]
              , E = F[1]
              , U = F[2]
              , Q = F[3]
              , ie = F[4]
              , te = F[5]
              , oe = F[6]
              , he = F[7]
              , j = F[8];
            return M * (j * ie - te * he) + E * (-j * Q + te * oe) + U * (he * Q - ie * oe)
        }
        function O(F, M, E) {
            var U = M[0]
              , Q = M[1]
              , ie = M[2]
              , te = M[3]
              , oe = M[4]
              , he = M[5]
              , j = M[6]
              , se = M[7]
              , ue = M[8]
              , _e = E[0]
              , Xe = E[1]
              , pe = E[2]
              , ye = E[3]
              , ce = E[4]
              , Be = E[5]
              , ne = E[6]
              , be = E[7]
              , ve = E[8];
            return F[0] = _e * U + Xe * te + pe * j,
            F[1] = _e * Q + Xe * oe + pe * se,
            F[2] = _e * ie + Xe * he + pe * ue,
            F[3] = ye * U + ce * te + Be * j,
            F[4] = ye * Q + ce * oe + Be * se,
            F[5] = ye * ie + ce * he + Be * ue,
            F[6] = ne * U + be * te + ve * j,
            F[7] = ne * Q + be * oe + ve * se,
            F[8] = ne * ie + be * he + ve * ue,
            F
        }
        function q(F, M, E) {
            var U = M[0]
              , Q = M[1]
              , ie = M[2]
              , te = M[3]
              , oe = M[4]
              , he = M[5]
              , j = M[6]
              , se = M[7]
              , ue = M[8]
              , _e = E[0]
              , Xe = E[1];
            return F[0] = U,
            F[1] = Q,
            F[2] = ie,
            F[3] = te,
            F[4] = oe,
            F[5] = he,
            F[6] = _e * U + Xe * te + j,
            F[7] = _e * Q + Xe * oe + se,
            F[8] = _e * ie + Xe * he + ue,
            F
        }
        function k(F, M, E) {
            var U = M[0]
              , Q = M[1]
              , ie = M[2]
              , te = M[3]
              , oe = M[4]
              , he = M[5]
              , j = M[6]
              , se = M[7]
              , ue = M[8]
              , _e = Math.sin(E)
              , Xe = Math.cos(E);
            return F[0] = Xe * U + _e * te,
            F[1] = Xe * Q + _e * oe,
            F[2] = Xe * ie + _e * he,
            F[3] = Xe * te - _e * U,
            F[4] = Xe * oe - _e * Q,
            F[5] = Xe * he - _e * ie,
            F[6] = j,
            F[7] = se,
            F[8] = ue,
            F
        }
        function V(F, M, E) {
            var U = E[0]
              , Q = E[1];
            return F[0] = U * M[0],
            F[1] = U * M[1],
            F[2] = U * M[2],
            F[3] = Q * M[3],
            F[4] = Q * M[4],
            F[5] = Q * M[5],
            F[6] = M[6],
            F[7] = M[7],
            F[8] = M[8],
            F
        }
        function $(F, M) {
            return F[0] = 1,
            F[1] = 0,
            F[2] = 0,
            F[3] = 0,
            F[4] = 1,
            F[5] = 0,
            F[6] = M[0],
            F[7] = M[1],
            F[8] = 1,
            F
        }
        function Y(F, M) {
            var E = Math.sin(M)
              , U = Math.cos(M);
            return F[0] = U,
            F[1] = E,
            F[2] = 0,
            F[3] = -E,
            F[4] = U,
            F[5] = 0,
            F[6] = 0,
            F[7] = 0,
            F[8] = 1,
            F
        }
        function Z(F, M) {
            return F[0] = M[0],
            F[1] = 0,
            F[2] = 0,
            F[3] = 0,
            F[4] = M[1],
            F[5] = 0,
            F[6] = 0,
            F[7] = 0,
            F[8] = 1,
            F
        }
        function H(F, M) {
            return F[0] = M[0],
            F[1] = M[1],
            F[2] = 0,
            F[3] = M[2],
            F[4] = M[3],
            F[5] = 0,
            F[6] = M[4],
            F[7] = M[5],
            F[8] = 1,
            F
        }
        function J(F, M) {
            var E = M[0]
              , U = M[1]
              , Q = M[2]
              , ie = M[3]
              , te = E + E
              , oe = U + U
              , he = Q + Q
              , j = E * te
              , se = U * te
              , ue = U * oe
              , _e = Q * te
              , Xe = Q * oe
              , pe = Q * he
              , ye = ie * te
              , ce = ie * oe
              , Be = ie * he;
            return F[0] = 1 - ue - pe,
            F[3] = se - Be,
            F[6] = _e + ce,
            F[1] = se + Be,
            F[4] = 1 - j - pe,
            F[7] = Xe - ye,
            F[2] = _e - ce,
            F[5] = Xe + ye,
            F[8] = 1 - j - ue,
            F
        }
        function ae(F, M) {
            var E = M[0]
              , U = M[1]
              , Q = M[2]
              , ie = M[3]
              , te = M[4]
              , oe = M[5]
              , he = M[6]
              , j = M[7]
              , se = M[8]
              , ue = M[9]
              , _e = M[10]
              , Xe = M[11]
              , pe = M[12]
              , ye = M[13]
              , ce = M[14]
              , Be = M[15]
              , ne = E * oe - U * te
              , be = E * he - Q * te
              , ve = E * j - ie * te
              , Se = U * he - Q * oe
              , Ke = U * j - ie * oe
              , le = Q * j - ie * he
              , de = se * ye - ue * pe
              , Te = se * ce - _e * pe
              , Re = se * Be - Xe * pe
              , De = ue * ce - _e * ye
              , Ge = ue * Be - Xe * ye
              , it = _e * Be - Xe * ce
              , at = ne * it - be * Ge + ve * De + Se * Re - Ke * Te + le * de;
            return at ? (at = 1 / at,
            F[0] = (oe * it - he * Ge + j * De) * at,
            F[1] = (he * Re - te * it - j * Te) * at,
            F[2] = (te * Ge - oe * Re + j * de) * at,
            F[3] = (Q * Ge - U * it - ie * De) * at,
            F[4] = (E * it - Q * Re + ie * Te) * at,
            F[5] = (U * Re - E * Ge - ie * de) * at,
            F[6] = (ye * le - ce * Ke + Be * Se) * at,
            F[7] = (ce * ve - pe * le - Be * be) * at,
            F[8] = (pe * Ke - ye * ve + Be * ne) * at,
            F) : null
        }
        function re(F, M, E) {
            return F[0] = 2 / M,
            F[1] = 0,
            F[2] = 0,
            F[3] = 0,
            F[4] = -2 / E,
            F[5] = 0,
            F[6] = -1,
            F[7] = 1,
            F[8] = 1,
            F
        }
        function z(F) {
            return "mat3(" + F[0] + ", " + F[1] + ", " + F[2] + ", " + F[3] + ", " + F[4] + ", " + F[5] + ", " + F[6] + ", " + F[7] + ", " + F[8] + ")"
        }
        function B(F) {
            return Math.sqrt(F[0] * F[0] + F[1] * F[1] + F[2] * F[2] + F[3] * F[3] + F[4] * F[4] + F[5] * F[5] + F[6] * F[6] + F[7] * F[7] + F[8] * F[8])
        }
        function f(F, M, E) {
            return F[0] = M[0] + E[0],
            F[1] = M[1] + E[1],
            F[2] = M[2] + E[2],
            F[3] = M[3] + E[3],
            F[4] = M[4] + E[4],
            F[5] = M[5] + E[5],
            F[6] = M[6] + E[6],
            F[7] = M[7] + E[7],
            F[8] = M[8] + E[8],
            F
        }
        function y(F, M, E) {
            return F[0] = M[0] - E[0],
            F[1] = M[1] - E[1],
            F[2] = M[2] - E[2],
            F[3] = M[3] - E[3],
            F[4] = M[4] - E[4],
            F[5] = M[5] - E[5],
            F[6] = M[6] - E[6],
            F[7] = M[7] - E[7],
            F[8] = M[8] - E[8],
            F
        }
        function X(F, M, E) {
            return F[0] = M[0] * E,
            F[1] = M[1] * E,
            F[2] = M[2] * E,
            F[3] = M[3] * E,
            F[4] = M[4] * E,
            F[5] = M[5] * E,
            F[6] = M[6] * E,
            F[7] = M[7] * E,
            F[8] = M[8] * E,
            F
        }
        function N(F, M, E, U) {
            return F[0] = M[0] + E[0] * U,
            F[1] = M[1] + E[1] * U,
            F[2] = M[2] + E[2] * U,
            F[3] = M[3] + E[3] * U,
            F[4] = M[4] + E[4] * U,
            F[5] = M[5] + E[5] * U,
            F[6] = M[6] + E[6] * U,
            F[7] = M[7] + E[7] * U,
            F[8] = M[8] + E[8] * U,
            F
        }
        function R(F, M) {
            return F[0] === M[0] && F[1] === M[1] && F[2] === M[2] && F[3] === M[3] && F[4] === M[4] && F[5] === M[5] && F[6] === M[6] && F[7] === M[7] && F[8] === M[8]
        }
        function D(F, M) {
            var E = F[0]
              , U = F[1]
              , Q = F[2]
              , ie = F[3]
              , te = F[4]
              , oe = F[5]
              , he = F[6]
              , j = F[7]
              , se = F[8]
              , ue = M[0]
              , _e = M[1]
              , Xe = M[2]
              , pe = M[3]
              , ye = M[4]
              , ce = M[5]
              , Be = M[6]
              , ne = M[7]
              , be = M[8];
            return Math.abs(E - ue) <= n.EPSILON * Math.max(1, Math.abs(E), Math.abs(ue)) && Math.abs(U - _e) <= n.EPSILON * Math.max(1, Math.abs(U), Math.abs(_e)) && Math.abs(Q - Xe) <= n.EPSILON * Math.max(1, Math.abs(Q), Math.abs(Xe)) && Math.abs(ie - pe) <= n.EPSILON * Math.max(1, Math.abs(ie), Math.abs(pe)) && Math.abs(te - ye) <= n.EPSILON * Math.max(1, Math.abs(te), Math.abs(ye)) && Math.abs(oe - ce) <= n.EPSILON * Math.max(1, Math.abs(oe), Math.abs(ce)) && Math.abs(he - Be) <= n.EPSILON * Math.max(1, Math.abs(he), Math.abs(Be)) && Math.abs(j - ne) <= n.EPSILON * Math.max(1, Math.abs(j), Math.abs(ne)) && Math.abs(se - be) <= n.EPSILON * Math.max(1, Math.abs(se), Math.abs(be))
        }
        a.mul = O,
        a.sub = y
    }
})
  , require_mat4 = __commonJS({
    "src/utils/vcode-gltf-standalone/node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/mat4.js"(a) {
        function e(ne) {
            "@babel/helpers - typeof";
            return e = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(be) {
                return typeof be
            }
            : function(be) {
                return be && typeof Symbol == "function" && be.constructor === Symbol && be !== Symbol.prototype ? "symbol" : typeof be
            }
            ,
            e(ne)
        }
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.add = _e,
        a.adjoint = C,
        a.clone = l,
        a.copy = u,
        a.create = d,
        a.decompose = R,
        a.determinant = K,
        a.equals = Be,
        a.exactEquals = ce,
        a.frob = ue,
        a.fromQuat = M,
        a.fromQuat2 = f,
        a.fromRotation = J,
        a.fromRotationTranslation = B,
        a.fromRotationTranslationScale = D,
        a.fromRotationTranslationScaleOrigin = F,
        a.fromScaling = H,
        a.fromTranslation = Z,
        a.fromValues = m,
        a.fromXRotation = ae,
        a.fromYRotation = re,
        a.fromZRotation = z,
        a.frustum = E,
        a.getRotation = N,
        a.getScaling = X,
        a.getTranslation = y,
        a.identity = v,
        a.invert = T,
        a.lookAt = he,
        a.mul = void 0,
        a.multiply = I,
        a.multiplyScalar = pe,
        a.multiplyScalarAndAdd = ye,
        a.ortho = void 0,
        a.orthoNO = te,
        a.orthoZO = oe,
        a.perspective = void 0,
        a.perspectiveFromFieldOfView = ie,
        a.perspectiveNO = U,
        a.perspectiveZO = Q,
        a.rotate = k,
        a.rotateX = V,
        a.rotateY = $,
        a.rotateZ = Y,
        a.scale = q,
        a.set = b,
        a.str = se,
        a.sub = void 0,
        a.subtract = Xe,
        a.targetTo = j,
        a.translate = O,
        a.transpose = _;
        var n = c(require_common());
        function c(ne, be) {
            if (typeof WeakMap == "function")
                var ve = new WeakMap
                  , Se = new WeakMap;
            return (c = function(le, de) {
                if (!de && le && le.__esModule)
                    return le;
                var Te, Re, De = {
                    __proto__: null,
                    default: le
                };
                if (le === null || e(le) != "object" && typeof le != "function")
                    return De;
                if (Te = de ? Se : ve) {
                    if (Te.has(le))
                        return Te.get(le);
                    Te.set(le, De)
                }
                for (var Ge in le)
                    Ge !== "default" && {}.hasOwnProperty.call(le, Ge) && ((Re = (Te = Object.defineProperty) && Object.getOwnPropertyDescriptor(le, Ge)) && (Re.get || Re.set) ? Te(De, Ge, Re) : De[Ge] = le[Ge]);
                return De
            }
            )(ne, be)
        }
        function d() {
            var ne = new n.ARRAY_TYPE(16);
            return n.ARRAY_TYPE != Float32Array && (ne[1] = 0,
            ne[2] = 0,
            ne[3] = 0,
            ne[4] = 0,
            ne[6] = 0,
            ne[7] = 0,
            ne[8] = 0,
            ne[9] = 0,
            ne[11] = 0,
            ne[12] = 0,
            ne[13] = 0,
            ne[14] = 0),
            ne[0] = 1,
            ne[5] = 1,
            ne[10] = 1,
            ne[15] = 1,
            ne
        }
        function l(ne) {
            var be = new n.ARRAY_TYPE(16);
            return be[0] = ne[0],
            be[1] = ne[1],
            be[2] = ne[2],
            be[3] = ne[3],
            be[4] = ne[4],
            be[5] = ne[5],
            be[6] = ne[6],
            be[7] = ne[7],
            be[8] = ne[8],
            be[9] = ne[9],
            be[10] = ne[10],
            be[11] = ne[11],
            be[12] = ne[12],
            be[13] = ne[13],
            be[14] = ne[14],
            be[15] = ne[15],
            be
        }
        function u(ne, be) {
            return ne[0] = be[0],
            ne[1] = be[1],
            ne[2] = be[2],
            ne[3] = be[3],
            ne[4] = be[4],
            ne[5] = be[5],
            ne[6] = be[6],
            ne[7] = be[7],
            ne[8] = be[8],
            ne[9] = be[9],
            ne[10] = be[10],
            ne[11] = be[11],
            ne[12] = be[12],
            ne[13] = be[13],
            ne[14] = be[14],
            ne[15] = be[15],
            ne
        }
        function m(ne, be, ve, Se, Ke, le, de, Te, Re, De, Ge, it, at, wt, Ve, Ee) {
            var xe = new n.ARRAY_TYPE(16);
            return xe[0] = ne,
            xe[1] = be,
            xe[2] = ve,
            xe[3] = Se,
            xe[4] = Ke,
            xe[5] = le,
            xe[6] = de,
            xe[7] = Te,
            xe[8] = Re,
            xe[9] = De,
            xe[10] = Ge,
            xe[11] = it,
            xe[12] = at,
            xe[13] = wt,
            xe[14] = Ve,
            xe[15] = Ee,
            xe
        }
        function b(ne, be, ve, Se, Ke, le, de, Te, Re, De, Ge, it, at, wt, Ve, Ee, xe) {
            return ne[0] = be,
            ne[1] = ve,
            ne[2] = Se,
            ne[3] = Ke,
            ne[4] = le,
            ne[5] = de,
            ne[6] = Te,
            ne[7] = Re,
            ne[8] = De,
            ne[9] = Ge,
            ne[10] = it,
            ne[11] = at,
            ne[12] = wt,
            ne[13] = Ve,
            ne[14] = Ee,
            ne[15] = xe,
            ne
        }
        function v(ne) {
            return ne[0] = 1,
            ne[1] = 0,
            ne[2] = 0,
            ne[3] = 0,
            ne[4] = 0,
            ne[5] = 1,
            ne[6] = 0,
            ne[7] = 0,
            ne[8] = 0,
            ne[9] = 0,
            ne[10] = 1,
            ne[11] = 0,
            ne[12] = 0,
            ne[13] = 0,
            ne[14] = 0,
            ne[15] = 1,
            ne
        }
        function _(ne, be) {
            if (ne === be) {
                var ve = be[1]
                  , Se = be[2]
                  , Ke = be[3]
                  , le = be[6]
                  , de = be[7]
                  , Te = be[11];
                ne[1] = be[4],
                ne[2] = be[8],
                ne[3] = be[12],
                ne[4] = ve,
                ne[6] = be[9],
                ne[7] = be[13],
                ne[8] = Se,
                ne[9] = le,
                ne[11] = be[14],
                ne[12] = Ke,
                ne[13] = de,
                ne[14] = Te
            } else
                ne[0] = be[0],
                ne[1] = be[4],
                ne[2] = be[8],
                ne[3] = be[12],
                ne[4] = be[1],
                ne[5] = be[5],
                ne[6] = be[9],
                ne[7] = be[13],
                ne[8] = be[2],
                ne[9] = be[6],
                ne[10] = be[10],
                ne[11] = be[14],
                ne[12] = be[3],
                ne[13] = be[7],
                ne[14] = be[11],
                ne[15] = be[15];
            return ne
        }
        function T(ne, be) {
            var ve = be[0]
              , Se = be[1]
              , Ke = be[2]
              , le = be[3]
              , de = be[4]
              , Te = be[5]
              , Re = be[6]
              , De = be[7]
              , Ge = be[8]
              , it = be[9]
              , at = be[10]
              , wt = be[11]
              , Ve = be[12]
              , Ee = be[13]
              , xe = be[14]
              , $e = be[15]
              , nt = ve * Te - Se * de
              , rt = ve * Re - Ke * de
              , me = ve * De - le * de
              , Le = Se * Re - Ke * Te
              , ct = Se * De - le * Te
              , He = Ke * De - le * Re
              , Je = Ge * Ee - it * Ve
              , ht = Ge * xe - at * Ve
              , Fe = Ge * $e - wt * Ve
              , Tt = it * xe - at * Ee
              , vt = it * $e - wt * Ee
              , Oe = at * $e - wt * xe
              , _t = nt * Oe - rt * vt + me * Tt + Le * Fe - ct * ht + He * Je;
            return _t ? (_t = 1 / _t,
            ne[0] = (Te * Oe - Re * vt + De * Tt) * _t,
            ne[1] = (Ke * vt - Se * Oe - le * Tt) * _t,
            ne[2] = (Ee * He - xe * ct + $e * Le) * _t,
            ne[3] = (at * ct - it * He - wt * Le) * _t,
            ne[4] = (Re * Fe - de * Oe - De * ht) * _t,
            ne[5] = (ve * Oe - Ke * Fe + le * ht) * _t,
            ne[6] = (xe * me - Ve * He - $e * rt) * _t,
            ne[7] = (Ge * He - at * me + wt * rt) * _t,
            ne[8] = (de * vt - Te * Fe + De * Je) * _t,
            ne[9] = (Se * Fe - ve * vt - le * Je) * _t,
            ne[10] = (Ve * ct - Ee * me + $e * nt) * _t,
            ne[11] = (it * me - Ge * ct - wt * nt) * _t,
            ne[12] = (Te * ht - de * Tt - Re * Je) * _t,
            ne[13] = (ve * Tt - Se * ht + Ke * Je) * _t,
            ne[14] = (Ee * rt - Ve * Le - xe * nt) * _t,
            ne[15] = (Ge * Le - it * rt + at * nt) * _t,
            ne) : null
        }
        function C(ne, be) {
            var ve = be[0]
              , Se = be[1]
              , Ke = be[2]
              , le = be[3]
              , de = be[4]
              , Te = be[5]
              , Re = be[6]
              , De = be[7]
              , Ge = be[8]
              , it = be[9]
              , at = be[10]
              , wt = be[11]
              , Ve = be[12]
              , Ee = be[13]
              , xe = be[14]
              , $e = be[15]
              , nt = ve * Te - Se * de
              , rt = ve * Re - Ke * de
              , me = ve * De - le * de
              , Le = Se * Re - Ke * Te
              , ct = Se * De - le * Te
              , He = Ke * De - le * Re
              , Je = Ge * Ee - it * Ve
              , ht = Ge * xe - at * Ve
              , Fe = Ge * $e - wt * Ve
              , Tt = it * xe - at * Ee
              , vt = it * $e - wt * Ee
              , Oe = at * $e - wt * xe;
            return ne[0] = Te * Oe - Re * vt + De * Tt,
            ne[1] = Ke * vt - Se * Oe - le * Tt,
            ne[2] = Ee * He - xe * ct + $e * Le,
            ne[3] = at * ct - it * He - wt * Le,
            ne[4] = Re * Fe - de * Oe - De * ht,
            ne[5] = ve * Oe - Ke * Fe + le * ht,
            ne[6] = xe * me - Ve * He - $e * rt,
            ne[7] = Ge * He - at * me + wt * rt,
            ne[8] = de * vt - Te * Fe + De * Je,
            ne[9] = Se * Fe - ve * vt - le * Je,
            ne[10] = Ve * ct - Ee * me + $e * nt,
            ne[11] = it * me - Ge * ct - wt * nt,
            ne[12] = Te * ht - de * Tt - Re * Je,
            ne[13] = ve * Tt - Se * ht + Ke * Je,
            ne[14] = Ee * rt - Ve * Le - xe * nt,
            ne[15] = Ge * Le - it * rt + at * nt,
            ne
        }
        function K(ne) {
            var be = ne[0]
              , ve = ne[1]
              , Se = ne[2]
              , Ke = ne[3]
              , le = ne[4]
              , de = ne[5]
              , Te = ne[6]
              , Re = ne[7]
              , De = ne[8]
              , Ge = ne[9]
              , it = ne[10]
              , at = ne[11]
              , wt = ne[12]
              , Ve = ne[13]
              , Ee = ne[14]
              , xe = ne[15]
              , $e = be * de - ve * le
              , nt = be * Te - Se * le
              , rt = ve * Te - Se * de
              , me = De * Ve - Ge * wt
              , Le = De * Ee - it * wt
              , ct = Ge * Ee - it * Ve
              , He = be * ct - ve * Le + Se * me
              , Je = le * ct - de * Le + Te * me
              , ht = De * rt - Ge * nt + it * $e
              , Fe = wt * rt - Ve * nt + Ee * $e;
            return Re * He - Ke * Je + xe * ht - at * Fe
        }
        function I(ne, be, ve) {
            var Se = be[0]
              , Ke = be[1]
              , le = be[2]
              , de = be[3]
              , Te = be[4]
              , Re = be[5]
              , De = be[6]
              , Ge = be[7]
              , it = be[8]
              , at = be[9]
              , wt = be[10]
              , Ve = be[11]
              , Ee = be[12]
              , xe = be[13]
              , $e = be[14]
              , nt = be[15]
              , rt = ve[0]
              , me = ve[1]
              , Le = ve[2]
              , ct = ve[3];
            return ne[0] = rt * Se + me * Te + Le * it + ct * Ee,
            ne[1] = rt * Ke + me * Re + Le * at + ct * xe,
            ne[2] = rt * le + me * De + Le * wt + ct * $e,
            ne[3] = rt * de + me * Ge + Le * Ve + ct * nt,
            rt = ve[4],
            me = ve[5],
            Le = ve[6],
            ct = ve[7],
            ne[4] = rt * Se + me * Te + Le * it + ct * Ee,
            ne[5] = rt * Ke + me * Re + Le * at + ct * xe,
            ne[6] = rt * le + me * De + Le * wt + ct * $e,
            ne[7] = rt * de + me * Ge + Le * Ve + ct * nt,
            rt = ve[8],
            me = ve[9],
            Le = ve[10],
            ct = ve[11],
            ne[8] = rt * Se + me * Te + Le * it + ct * Ee,
            ne[9] = rt * Ke + me * Re + Le * at + ct * xe,
            ne[10] = rt * le + me * De + Le * wt + ct * $e,
            ne[11] = rt * de + me * Ge + Le * Ve + ct * nt,
            rt = ve[12],
            me = ve[13],
            Le = ve[14],
            ct = ve[15],
            ne[12] = rt * Se + me * Te + Le * it + ct * Ee,
            ne[13] = rt * Ke + me * Re + Le * at + ct * xe,
            ne[14] = rt * le + me * De + Le * wt + ct * $e,
            ne[15] = rt * de + me * Ge + Le * Ve + ct * nt,
            ne
        }
        function O(ne, be, ve) {
            var Se = ve[0], Ke = ve[1], le = ve[2], de, Te, Re, De, Ge, it, at, wt, Ve, Ee, xe, $e;
            return be === ne ? (ne[12] = be[0] * Se + be[4] * Ke + be[8] * le + be[12],
            ne[13] = be[1] * Se + be[5] * Ke + be[9] * le + be[13],
            ne[14] = be[2] * Se + be[6] * Ke + be[10] * le + be[14],
            ne[15] = be[3] * Se + be[7] * Ke + be[11] * le + be[15]) : (de = be[0],
            Te = be[1],
            Re = be[2],
            De = be[3],
            Ge = be[4],
            it = be[5],
            at = be[6],
            wt = be[7],
            Ve = be[8],
            Ee = be[9],
            xe = be[10],
            $e = be[11],
            ne[0] = de,
            ne[1] = Te,
            ne[2] = Re,
            ne[3] = De,
            ne[4] = Ge,
            ne[5] = it,
            ne[6] = at,
            ne[7] = wt,
            ne[8] = Ve,
            ne[9] = Ee,
            ne[10] = xe,
            ne[11] = $e,
            ne[12] = de * Se + Ge * Ke + Ve * le + be[12],
            ne[13] = Te * Se + it * Ke + Ee * le + be[13],
            ne[14] = Re * Se + at * Ke + xe * le + be[14],
            ne[15] = De * Se + wt * Ke + $e * le + be[15]),
            ne
        }
        function q(ne, be, ve) {
            var Se = ve[0]
              , Ke = ve[1]
              , le = ve[2];
            return ne[0] = be[0] * Se,
            ne[1] = be[1] * Se,
            ne[2] = be[2] * Se,
            ne[3] = be[3] * Se,
            ne[4] = be[4] * Ke,
            ne[5] = be[5] * Ke,
            ne[6] = be[6] * Ke,
            ne[7] = be[7] * Ke,
            ne[8] = be[8] * le,
            ne[9] = be[9] * le,
            ne[10] = be[10] * le,
            ne[11] = be[11] * le,
            ne[12] = be[12],
            ne[13] = be[13],
            ne[14] = be[14],
            ne[15] = be[15],
            ne
        }
        function k(ne, be, ve, Se) {
            var Ke = Se[0], le = Se[1], de = Se[2], Te = Math.sqrt(Ke * Ke + le * le + de * de), Re, De, Ge, it, at, wt, Ve, Ee, xe, $e, nt, rt, me, Le, ct, He, Je, ht, Fe, Tt, vt, Oe, _t, Ut;
            return Te < n.EPSILON ? null : (Te = 1 / Te,
            Ke *= Te,
            le *= Te,
            de *= Te,
            Re = Math.sin(ve),
            De = Math.cos(ve),
            Ge = 1 - De,
            it = be[0],
            at = be[1],
            wt = be[2],
            Ve = be[3],
            Ee = be[4],
            xe = be[5],
            $e = be[6],
            nt = be[7],
            rt = be[8],
            me = be[9],
            Le = be[10],
            ct = be[11],
            He = Ke * Ke * Ge + De,
            Je = le * Ke * Ge + de * Re,
            ht = de * Ke * Ge - le * Re,
            Fe = Ke * le * Ge - de * Re,
            Tt = le * le * Ge + De,
            vt = de * le * Ge + Ke * Re,
            Oe = Ke * de * Ge + le * Re,
            _t = le * de * Ge - Ke * Re,
            Ut = de * de * Ge + De,
            ne[0] = it * He + Ee * Je + rt * ht,
            ne[1] = at * He + xe * Je + me * ht,
            ne[2] = wt * He + $e * Je + Le * ht,
            ne[3] = Ve * He + nt * Je + ct * ht,
            ne[4] = it * Fe + Ee * Tt + rt * vt,
            ne[5] = at * Fe + xe * Tt + me * vt,
            ne[6] = wt * Fe + $e * Tt + Le * vt,
            ne[7] = Ve * Fe + nt * Tt + ct * vt,
            ne[8] = it * Oe + Ee * _t + rt * Ut,
            ne[9] = at * Oe + xe * _t + me * Ut,
            ne[10] = wt * Oe + $e * _t + Le * Ut,
            ne[11] = Ve * Oe + nt * _t + ct * Ut,
            be !== ne && (ne[12] = be[12],
            ne[13] = be[13],
            ne[14] = be[14],
            ne[15] = be[15]),
            ne)
        }
        function V(ne, be, ve) {
            var Se = Math.sin(ve)
              , Ke = Math.cos(ve)
              , le = be[4]
              , de = be[5]
              , Te = be[6]
              , Re = be[7]
              , De = be[8]
              , Ge = be[9]
              , it = be[10]
              , at = be[11];
            return be !== ne && (ne[0] = be[0],
            ne[1] = be[1],
            ne[2] = be[2],
            ne[3] = be[3],
            ne[12] = be[12],
            ne[13] = be[13],
            ne[14] = be[14],
            ne[15] = be[15]),
            ne[4] = le * Ke + De * Se,
            ne[5] = de * Ke + Ge * Se,
            ne[6] = Te * Ke + it * Se,
            ne[7] = Re * Ke + at * Se,
            ne[8] = De * Ke - le * Se,
            ne[9] = Ge * Ke - de * Se,
            ne[10] = it * Ke - Te * Se,
            ne[11] = at * Ke - Re * Se,
            ne
        }
        function $(ne, be, ve) {
            var Se = Math.sin(ve)
              , Ke = Math.cos(ve)
              , le = be[0]
              , de = be[1]
              , Te = be[2]
              , Re = be[3]
              , De = be[8]
              , Ge = be[9]
              , it = be[10]
              , at = be[11];
            return be !== ne && (ne[4] = be[4],
            ne[5] = be[5],
            ne[6] = be[6],
            ne[7] = be[7],
            ne[12] = be[12],
            ne[13] = be[13],
            ne[14] = be[14],
            ne[15] = be[15]),
            ne[0] = le * Ke - De * Se,
            ne[1] = de * Ke - Ge * Se,
            ne[2] = Te * Ke - it * Se,
            ne[3] = Re * Ke - at * Se,
            ne[8] = le * Se + De * Ke,
            ne[9] = de * Se + Ge * Ke,
            ne[10] = Te * Se + it * Ke,
            ne[11] = Re * Se + at * Ke,
            ne
        }
        function Y(ne, be, ve) {
            var Se = Math.sin(ve)
              , Ke = Math.cos(ve)
              , le = be[0]
              , de = be[1]
              , Te = be[2]
              , Re = be[3]
              , De = be[4]
              , Ge = be[5]
              , it = be[6]
              , at = be[7];
            return be !== ne && (ne[8] = be[8],
            ne[9] = be[9],
            ne[10] = be[10],
            ne[11] = be[11],
            ne[12] = be[12],
            ne[13] = be[13],
            ne[14] = be[14],
            ne[15] = be[15]),
            ne[0] = le * Ke + De * Se,
            ne[1] = de * Ke + Ge * Se,
            ne[2] = Te * Ke + it * Se,
            ne[3] = Re * Ke + at * Se,
            ne[4] = De * Ke - le * Se,
            ne[5] = Ge * Ke - de * Se,
            ne[6] = it * Ke - Te * Se,
            ne[7] = at * Ke - Re * Se,
            ne
        }
        function Z(ne, be) {
            return ne[0] = 1,
            ne[1] = 0,
            ne[2] = 0,
            ne[3] = 0,
            ne[4] = 0,
            ne[5] = 1,
            ne[6] = 0,
            ne[7] = 0,
            ne[8] = 0,
            ne[9] = 0,
            ne[10] = 1,
            ne[11] = 0,
            ne[12] = be[0],
            ne[13] = be[1],
            ne[14] = be[2],
            ne[15] = 1,
            ne
        }
        function H(ne, be) {
            return ne[0] = be[0],
            ne[1] = 0,
            ne[2] = 0,
            ne[3] = 0,
            ne[4] = 0,
            ne[5] = be[1],
            ne[6] = 0,
            ne[7] = 0,
            ne[8] = 0,
            ne[9] = 0,
            ne[10] = be[2],
            ne[11] = 0,
            ne[12] = 0,
            ne[13] = 0,
            ne[14] = 0,
            ne[15] = 1,
            ne
        }
        function J(ne, be, ve) {
            var Se = ve[0], Ke = ve[1], le = ve[2], de = Math.sqrt(Se * Se + Ke * Ke + le * le), Te, Re, De;
            return de < n.EPSILON ? null : (de = 1 / de,
            Se *= de,
            Ke *= de,
            le *= de,
            Te = Math.sin(be),
            Re = Math.cos(be),
            De = 1 - Re,
            ne[0] = Se * Se * De + Re,
            ne[1] = Ke * Se * De + le * Te,
            ne[2] = le * Se * De - Ke * Te,
            ne[3] = 0,
            ne[4] = Se * Ke * De - le * Te,
            ne[5] = Ke * Ke * De + Re,
            ne[6] = le * Ke * De + Se * Te,
            ne[7] = 0,
            ne[8] = Se * le * De + Ke * Te,
            ne[9] = Ke * le * De - Se * Te,
            ne[10] = le * le * De + Re,
            ne[11] = 0,
            ne[12] = 0,
            ne[13] = 0,
            ne[14] = 0,
            ne[15] = 1,
            ne)
        }
        function ae(ne, be) {
            var ve = Math.sin(be)
              , Se = Math.cos(be);
            return ne[0] = 1,
            ne[1] = 0,
            ne[2] = 0,
            ne[3] = 0,
            ne[4] = 0,
            ne[5] = Se,
            ne[6] = ve,
            ne[7] = 0,
            ne[8] = 0,
            ne[9] = -ve,
            ne[10] = Se,
            ne[11] = 0,
            ne[12] = 0,
            ne[13] = 0,
            ne[14] = 0,
            ne[15] = 1,
            ne
        }
        function re(ne, be) {
            var ve = Math.sin(be)
              , Se = Math.cos(be);
            return ne[0] = Se,
            ne[1] = 0,
            ne[2] = -ve,
            ne[3] = 0,
            ne[4] = 0,
            ne[5] = 1,
            ne[6] = 0,
            ne[7] = 0,
            ne[8] = ve,
            ne[9] = 0,
            ne[10] = Se,
            ne[11] = 0,
            ne[12] = 0,
            ne[13] = 0,
            ne[14] = 0,
            ne[15] = 1,
            ne
        }
        function z(ne, be) {
            var ve = Math.sin(be)
              , Se = Math.cos(be);
            return ne[0] = Se,
            ne[1] = ve,
            ne[2] = 0,
            ne[3] = 0,
            ne[4] = -ve,
            ne[5] = Se,
            ne[6] = 0,
            ne[7] = 0,
            ne[8] = 0,
            ne[9] = 0,
            ne[10] = 1,
            ne[11] = 0,
            ne[12] = 0,
            ne[13] = 0,
            ne[14] = 0,
            ne[15] = 1,
            ne
        }
        function B(ne, be, ve) {
            var Se = be[0]
              , Ke = be[1]
              , le = be[2]
              , de = be[3]
              , Te = Se + Se
              , Re = Ke + Ke
              , De = le + le
              , Ge = Se * Te
              , it = Se * Re
              , at = Se * De
              , wt = Ke * Re
              , Ve = Ke * De
              , Ee = le * De
              , xe = de * Te
              , $e = de * Re
              , nt = de * De;
            return ne[0] = 1 - (wt + Ee),
            ne[1] = it + nt,
            ne[2] = at - $e,
            ne[3] = 0,
            ne[4] = it - nt,
            ne[5] = 1 - (Ge + Ee),
            ne[6] = Ve + xe,
            ne[7] = 0,
            ne[8] = at + $e,
            ne[9] = Ve - xe,
            ne[10] = 1 - (Ge + wt),
            ne[11] = 0,
            ne[12] = ve[0],
            ne[13] = ve[1],
            ne[14] = ve[2],
            ne[15] = 1,
            ne
        }
        function f(ne, be) {
            var ve = new n.ARRAY_TYPE(3)
              , Se = -be[0]
              , Ke = -be[1]
              , le = -be[2]
              , de = be[3]
              , Te = be[4]
              , Re = be[5]
              , De = be[6]
              , Ge = be[7]
              , it = Se * Se + Ke * Ke + le * le + de * de;
            return it > 0 ? (ve[0] = (Te * de + Ge * Se + Re * le - De * Ke) * 2 / it,
            ve[1] = (Re * de + Ge * Ke + De * Se - Te * le) * 2 / it,
            ve[2] = (De * de + Ge * le + Te * Ke - Re * Se) * 2 / it) : (ve[0] = (Te * de + Ge * Se + Re * le - De * Ke) * 2,
            ve[1] = (Re * de + Ge * Ke + De * Se - Te * le) * 2,
            ve[2] = (De * de + Ge * le + Te * Ke - Re * Se) * 2),
            B(ne, be, ve),
            ne
        }
        function y(ne, be) {
            return ne[0] = be[12],
            ne[1] = be[13],
            ne[2] = be[14],
            ne
        }
        function X(ne, be) {
            var ve = be[0]
              , Se = be[1]
              , Ke = be[2]
              , le = be[4]
              , de = be[5]
              , Te = be[6]
              , Re = be[8]
              , De = be[9]
              , Ge = be[10];
            return ne[0] = Math.sqrt(ve * ve + Se * Se + Ke * Ke),
            ne[1] = Math.sqrt(le * le + de * de + Te * Te),
            ne[2] = Math.sqrt(Re * Re + De * De + Ge * Ge),
            ne
        }
        function N(ne, be) {
            var ve = new n.ARRAY_TYPE(3);
            X(ve, be);
            var Se = 1 / ve[0]
              , Ke = 1 / ve[1]
              , le = 1 / ve[2]
              , de = be[0] * Se
              , Te = be[1] * Ke
              , Re = be[2] * le
              , De = be[4] * Se
              , Ge = be[5] * Ke
              , it = be[6] * le
              , at = be[8] * Se
              , wt = be[9] * Ke
              , Ve = be[10] * le
              , Ee = de + Ge + Ve
              , xe = 0;
            return Ee > 0 ? (xe = Math.sqrt(Ee + 1) * 2,
            ne[3] = .25 * xe,
            ne[0] = (it - wt) / xe,
            ne[1] = (at - Re) / xe,
            ne[2] = (Te - De) / xe) : de > Ge && de > Ve ? (xe = Math.sqrt(1 + de - Ge - Ve) * 2,
            ne[3] = (it - wt) / xe,
            ne[0] = .25 * xe,
            ne[1] = (Te + De) / xe,
            ne[2] = (at + Re) / xe) : Ge > Ve ? (xe = Math.sqrt(1 + Ge - de - Ve) * 2,
            ne[3] = (at - Re) / xe,
            ne[0] = (Te + De) / xe,
            ne[1] = .25 * xe,
            ne[2] = (it + wt) / xe) : (xe = Math.sqrt(1 + Ve - de - Ge) * 2,
            ne[3] = (Te - De) / xe,
            ne[0] = (at + Re) / xe,
            ne[1] = (it + wt) / xe,
            ne[2] = .25 * xe),
            ne
        }
        function R(ne, be, ve, Se) {
            be[0] = Se[12],
            be[1] = Se[13],
            be[2] = Se[14];
            var Ke = Se[0]
              , le = Se[1]
              , de = Se[2]
              , Te = Se[4]
              , Re = Se[5]
              , De = Se[6]
              , Ge = Se[8]
              , it = Se[9]
              , at = Se[10];
            ve[0] = Math.sqrt(Ke * Ke + le * le + de * de),
            ve[1] = Math.sqrt(Te * Te + Re * Re + De * De),
            ve[2] = Math.sqrt(Ge * Ge + it * it + at * at);
            var wt = 1 / ve[0]
              , Ve = 1 / ve[1]
              , Ee = 1 / ve[2]
              , xe = Ke * wt
              , $e = le * Ve
              , nt = de * Ee
              , rt = Te * wt
              , me = Re * Ve
              , Le = De * Ee
              , ct = Ge * wt
              , He = it * Ve
              , Je = at * Ee
              , ht = xe + me + Je
              , Fe = 0;
            return ht > 0 ? (Fe = Math.sqrt(ht + 1) * 2,
            ne[3] = .25 * Fe,
            ne[0] = (Le - He) / Fe,
            ne[1] = (ct - nt) / Fe,
            ne[2] = ($e - rt) / Fe) : xe > me && xe > Je ? (Fe = Math.sqrt(1 + xe - me - Je) * 2,
            ne[3] = (Le - He) / Fe,
            ne[0] = .25 * Fe,
            ne[1] = ($e + rt) / Fe,
            ne[2] = (ct + nt) / Fe) : me > Je ? (Fe = Math.sqrt(1 + me - xe - Je) * 2,
            ne[3] = (ct - nt) / Fe,
            ne[0] = ($e + rt) / Fe,
            ne[1] = .25 * Fe,
            ne[2] = (Le + He) / Fe) : (Fe = Math.sqrt(1 + Je - xe - me) * 2,
            ne[3] = ($e - rt) / Fe,
            ne[0] = (ct + nt) / Fe,
            ne[1] = (Le + He) / Fe,
            ne[2] = .25 * Fe),
            ne
        }
        function D(ne, be, ve, Se) {
            var Ke = be[0]
              , le = be[1]
              , de = be[2]
              , Te = be[3]
              , Re = Ke + Ke
              , De = le + le
              , Ge = de + de
              , it = Ke * Re
              , at = Ke * De
              , wt = Ke * Ge
              , Ve = le * De
              , Ee = le * Ge
              , xe = de * Ge
              , $e = Te * Re
              , nt = Te * De
              , rt = Te * Ge
              , me = Se[0]
              , Le = Se[1]
              , ct = Se[2];
            return ne[0] = (1 - (Ve + xe)) * me,
            ne[1] = (at + rt) * me,
            ne[2] = (wt - nt) * me,
            ne[3] = 0,
            ne[4] = (at - rt) * Le,
            ne[5] = (1 - (it + xe)) * Le,
            ne[6] = (Ee + $e) * Le,
            ne[7] = 0,
            ne[8] = (wt + nt) * ct,
            ne[9] = (Ee - $e) * ct,
            ne[10] = (1 - (it + Ve)) * ct,
            ne[11] = 0,
            ne[12] = ve[0],
            ne[13] = ve[1],
            ne[14] = ve[2],
            ne[15] = 1,
            ne
        }
        function F(ne, be, ve, Se, Ke) {
            var le = be[0]
              , de = be[1]
              , Te = be[2]
              , Re = be[3]
              , De = le + le
              , Ge = de + de
              , it = Te + Te
              , at = le * De
              , wt = le * Ge
              , Ve = le * it
              , Ee = de * Ge
              , xe = de * it
              , $e = Te * it
              , nt = Re * De
              , rt = Re * Ge
              , me = Re * it
              , Le = Se[0]
              , ct = Se[1]
              , He = Se[2]
              , Je = Ke[0]
              , ht = Ke[1]
              , Fe = Ke[2]
              , Tt = (1 - (Ee + $e)) * Le
              , vt = (wt + me) * Le
              , Oe = (Ve - rt) * Le
              , _t = (wt - me) * ct
              , Ut = (1 - (at + $e)) * ct
              , Ie = (xe + nt) * ct
              , Ne = (Ve + rt) * He
              , Ue = (xe - nt) * He
              , ot = (1 - (at + Ee)) * He;
            return ne[0] = Tt,
            ne[1] = vt,
            ne[2] = Oe,
            ne[3] = 0,
            ne[4] = _t,
            ne[5] = Ut,
            ne[6] = Ie,
            ne[7] = 0,
            ne[8] = Ne,
            ne[9] = Ue,
            ne[10] = ot,
            ne[11] = 0,
            ne[12] = ve[0] + Je - (Tt * Je + _t * ht + Ne * Fe),
            ne[13] = ve[1] + ht - (vt * Je + Ut * ht + Ue * Fe),
            ne[14] = ve[2] + Fe - (Oe * Je + Ie * ht + ot * Fe),
            ne[15] = 1,
            ne
        }
        function M(ne, be) {
            var ve = be[0]
              , Se = be[1]
              , Ke = be[2]
              , le = be[3]
              , de = ve + ve
              , Te = Se + Se
              , Re = Ke + Ke
              , De = ve * de
              , Ge = Se * de
              , it = Se * Te
              , at = Ke * de
              , wt = Ke * Te
              , Ve = Ke * Re
              , Ee = le * de
              , xe = le * Te
              , $e = le * Re;
            return ne[0] = 1 - it - Ve,
            ne[1] = Ge + $e,
            ne[2] = at - xe,
            ne[3] = 0,
            ne[4] = Ge - $e,
            ne[5] = 1 - De - Ve,
            ne[6] = wt + Ee,
            ne[7] = 0,
            ne[8] = at + xe,
            ne[9] = wt - Ee,
            ne[10] = 1 - De - it,
            ne[11] = 0,
            ne[12] = 0,
            ne[13] = 0,
            ne[14] = 0,
            ne[15] = 1,
            ne
        }
        function E(ne, be, ve, Se, Ke, le, de) {
            var Te = 1 / (ve - be)
              , Re = 1 / (Ke - Se)
              , De = 1 / (le - de);
            return ne[0] = le * 2 * Te,
            ne[1] = 0,
            ne[2] = 0,
            ne[3] = 0,
            ne[4] = 0,
            ne[5] = le * 2 * Re,
            ne[6] = 0,
            ne[7] = 0,
            ne[8] = (ve + be) * Te,
            ne[9] = (Ke + Se) * Re,
            ne[10] = (de + le) * De,
            ne[11] = -1,
            ne[12] = 0,
            ne[13] = 0,
            ne[14] = de * le * 2 * De,
            ne[15] = 0,
            ne
        }
        function U(ne, be, ve, Se, Ke) {
            var le = 1 / Math.tan(be / 2);
            if (ne[0] = le / ve,
            ne[1] = 0,
            ne[2] = 0,
            ne[3] = 0,
            ne[4] = 0,
            ne[5] = le,
            ne[6] = 0,
            ne[7] = 0,
            ne[8] = 0,
            ne[9] = 0,
            ne[11] = -1,
            ne[12] = 0,
            ne[13] = 0,
            ne[15] = 0,
            Ke != null && Ke !== 1 / 0) {
                var de = 1 / (Se - Ke);
                ne[10] = (Ke + Se) * de,
                ne[14] = 2 * Ke * Se * de
            } else
                ne[10] = -1,
                ne[14] = -2 * Se;
            return ne
        }
        a.perspective = U;
        function Q(ne, be, ve, Se, Ke) {
            var le = 1 / Math.tan(be / 2);
            if (ne[0] = le / ve,
            ne[1] = 0,
            ne[2] = 0,
            ne[3] = 0,
            ne[4] = 0,
            ne[5] = le,
            ne[6] = 0,
            ne[7] = 0,
            ne[8] = 0,
            ne[9] = 0,
            ne[11] = -1,
            ne[12] = 0,
            ne[13] = 0,
            ne[15] = 0,
            Ke != null && Ke !== 1 / 0) {
                var de = 1 / (Se - Ke);
                ne[10] = Ke * de,
                ne[14] = Ke * Se * de
            } else
                ne[10] = -1,
                ne[14] = -Se;
            return ne
        }
        function ie(ne, be, ve, Se) {
            var Ke = Math.tan(be.upDegrees * Math.PI / 180)
              , le = Math.tan(be.downDegrees * Math.PI / 180)
              , de = Math.tan(be.leftDegrees * Math.PI / 180)
              , Te = Math.tan(be.rightDegrees * Math.PI / 180)
              , Re = 2 / (de + Te)
              , De = 2 / (Ke + le);
            return ne[0] = Re,
            ne[1] = 0,
            ne[2] = 0,
            ne[3] = 0,
            ne[4] = 0,
            ne[5] = De,
            ne[6] = 0,
            ne[7] = 0,
            ne[8] = -((de - Te) * Re * .5),
            ne[9] = (Ke - le) * De * .5,
            ne[10] = Se / (ve - Se),
            ne[11] = -1,
            ne[12] = 0,
            ne[13] = 0,
            ne[14] = Se * ve / (ve - Se),
            ne[15] = 0,
            ne
        }
        function te(ne, be, ve, Se, Ke, le, de) {
            var Te = 1 / (be - ve)
              , Re = 1 / (Se - Ke)
              , De = 1 / (le - de);
            return ne[0] = -2 * Te,
            ne[1] = 0,
            ne[2] = 0,
            ne[3] = 0,
            ne[4] = 0,
            ne[5] = -2 * Re,
            ne[6] = 0,
            ne[7] = 0,
            ne[8] = 0,
            ne[9] = 0,
            ne[10] = 2 * De,
            ne[11] = 0,
            ne[12] = (be + ve) * Te,
            ne[13] = (Ke + Se) * Re,
            ne[14] = (de + le) * De,
            ne[15] = 1,
            ne
        }
        a.ortho = te;
        function oe(ne, be, ve, Se, Ke, le, de) {
            var Te = 1 / (be - ve)
              , Re = 1 / (Se - Ke)
              , De = 1 / (le - de);
            return ne[0] = -2 * Te,
            ne[1] = 0,
            ne[2] = 0,
            ne[3] = 0,
            ne[4] = 0,
            ne[5] = -2 * Re,
            ne[6] = 0,
            ne[7] = 0,
            ne[8] = 0,
            ne[9] = 0,
            ne[10] = De,
            ne[11] = 0,
            ne[12] = (be + ve) * Te,
            ne[13] = (Ke + Se) * Re,
            ne[14] = le * De,
            ne[15] = 1,
            ne
        }
        function he(ne, be, ve, Se) {
            var Ke, le, de, Te, Re, De, Ge, it, at, wt, Ve = be[0], Ee = be[1], xe = be[2], $e = Se[0], nt = Se[1], rt = Se[2], me = ve[0], Le = ve[1], ct = ve[2];
            return Math.abs(Ve - me) < n.EPSILON && Math.abs(Ee - Le) < n.EPSILON && Math.abs(xe - ct) < n.EPSILON ? v(ne) : (Ge = Ve - me,
            it = Ee - Le,
            at = xe - ct,
            wt = 1 / Math.sqrt(Ge * Ge + it * it + at * at),
            Ge *= wt,
            it *= wt,
            at *= wt,
            Ke = nt * at - rt * it,
            le = rt * Ge - $e * at,
            de = $e * it - nt * Ge,
            wt = Math.sqrt(Ke * Ke + le * le + de * de),
            wt ? (wt = 1 / wt,
            Ke *= wt,
            le *= wt,
            de *= wt) : (Ke = 0,
            le = 0,
            de = 0),
            Te = it * de - at * le,
            Re = at * Ke - Ge * de,
            De = Ge * le - it * Ke,
            wt = Math.sqrt(Te * Te + Re * Re + De * De),
            wt ? (wt = 1 / wt,
            Te *= wt,
            Re *= wt,
            De *= wt) : (Te = 0,
            Re = 0,
            De = 0),
            ne[0] = Ke,
            ne[1] = Te,
            ne[2] = Ge,
            ne[3] = 0,
            ne[4] = le,
            ne[5] = Re,
            ne[6] = it,
            ne[7] = 0,
            ne[8] = de,
            ne[9] = De,
            ne[10] = at,
            ne[11] = 0,
            ne[12] = -(Ke * Ve + le * Ee + de * xe),
            ne[13] = -(Te * Ve + Re * Ee + De * xe),
            ne[14] = -(Ge * Ve + it * Ee + at * xe),
            ne[15] = 1,
            ne)
        }
        function j(ne, be, ve, Se) {
            var Ke = be[0]
              , le = be[1]
              , de = be[2]
              , Te = Se[0]
              , Re = Se[1]
              , De = Se[2]
              , Ge = Ke - ve[0]
              , it = le - ve[1]
              , at = de - ve[2]
              , wt = Ge * Ge + it * it + at * at;
            wt > 0 && (wt = 1 / Math.sqrt(wt),
            Ge *= wt,
            it *= wt,
            at *= wt);
            var Ve = Re * at - De * it
              , Ee = De * Ge - Te * at
              , xe = Te * it - Re * Ge;
            return wt = Ve * Ve + Ee * Ee + xe * xe,
            wt > 0 && (wt = 1 / Math.sqrt(wt),
            Ve *= wt,
            Ee *= wt,
            xe *= wt),
            ne[0] = Ve,
            ne[1] = Ee,
            ne[2] = xe,
            ne[3] = 0,
            ne[4] = it * xe - at * Ee,
            ne[5] = at * Ve - Ge * xe,
            ne[6] = Ge * Ee - it * Ve,
            ne[7] = 0,
            ne[8] = Ge,
            ne[9] = it,
            ne[10] = at,
            ne[11] = 0,
            ne[12] = Ke,
            ne[13] = le,
            ne[14] = de,
            ne[15] = 1,
            ne
        }
        function se(ne) {
            return "mat4(" + ne[0] + ", " + ne[1] + ", " + ne[2] + ", " + ne[3] + ", " + ne[4] + ", " + ne[5] + ", " + ne[6] + ", " + ne[7] + ", " + ne[8] + ", " + ne[9] + ", " + ne[10] + ", " + ne[11] + ", " + ne[12] + ", " + ne[13] + ", " + ne[14] + ", " + ne[15] + ")"
        }
        function ue(ne) {
            return Math.sqrt(ne[0] * ne[0] + ne[1] * ne[1] + ne[2] * ne[2] + ne[3] * ne[3] + ne[4] * ne[4] + ne[5] * ne[5] + ne[6] * ne[6] + ne[7] * ne[7] + ne[8] * ne[8] + ne[9] * ne[9] + ne[10] * ne[10] + ne[11] * ne[11] + ne[12] * ne[12] + ne[13] * ne[13] + ne[14] * ne[14] + ne[15] * ne[15])
        }
        function _e(ne, be, ve) {
            return ne[0] = be[0] + ve[0],
            ne[1] = be[1] + ve[1],
            ne[2] = be[2] + ve[2],
            ne[3] = be[3] + ve[3],
            ne[4] = be[4] + ve[4],
            ne[5] = be[5] + ve[5],
            ne[6] = be[6] + ve[6],
            ne[7] = be[7] + ve[7],
            ne[8] = be[8] + ve[8],
            ne[9] = be[9] + ve[9],
            ne[10] = be[10] + ve[10],
            ne[11] = be[11] + ve[11],
            ne[12] = be[12] + ve[12],
            ne[13] = be[13] + ve[13],
            ne[14] = be[14] + ve[14],
            ne[15] = be[15] + ve[15],
            ne
        }
        function Xe(ne, be, ve) {
            return ne[0] = be[0] - ve[0],
            ne[1] = be[1] - ve[1],
            ne[2] = be[2] - ve[2],
            ne[3] = be[3] - ve[3],
            ne[4] = be[4] - ve[4],
            ne[5] = be[5] - ve[5],
            ne[6] = be[6] - ve[6],
            ne[7] = be[7] - ve[7],
            ne[8] = be[8] - ve[8],
            ne[9] = be[9] - ve[9],
            ne[10] = be[10] - ve[10],
            ne[11] = be[11] - ve[11],
            ne[12] = be[12] - ve[12],
            ne[13] = be[13] - ve[13],
            ne[14] = be[14] - ve[14],
            ne[15] = be[15] - ve[15],
            ne
        }
        function pe(ne, be, ve) {
            return ne[0] = be[0] * ve,
            ne[1] = be[1] * ve,
            ne[2] = be[2] * ve,
            ne[3] = be[3] * ve,
            ne[4] = be[4] * ve,
            ne[5] = be[5] * ve,
            ne[6] = be[6] * ve,
            ne[7] = be[7] * ve,
            ne[8] = be[8] * ve,
            ne[9] = be[9] * ve,
            ne[10] = be[10] * ve,
            ne[11] = be[11] * ve,
            ne[12] = be[12] * ve,
            ne[13] = be[13] * ve,
            ne[14] = be[14] * ve,
            ne[15] = be[15] * ve,
            ne
        }
        function ye(ne, be, ve, Se) {
            return ne[0] = be[0] + ve[0] * Se,
            ne[1] = be[1] + ve[1] * Se,
            ne[2] = be[2] + ve[2] * Se,
            ne[3] = be[3] + ve[3] * Se,
            ne[4] = be[4] + ve[4] * Se,
            ne[5] = be[5] + ve[5] * Se,
            ne[6] = be[6] + ve[6] * Se,
            ne[7] = be[7] + ve[7] * Se,
            ne[8] = be[8] + ve[8] * Se,
            ne[9] = be[9] + ve[9] * Se,
            ne[10] = be[10] + ve[10] * Se,
            ne[11] = be[11] + ve[11] * Se,
            ne[12] = be[12] + ve[12] * Se,
            ne[13] = be[13] + ve[13] * Se,
            ne[14] = be[14] + ve[14] * Se,
            ne[15] = be[15] + ve[15] * Se,
            ne
        }
        function ce(ne, be) {
            return ne[0] === be[0] && ne[1] === be[1] && ne[2] === be[2] && ne[3] === be[3] && ne[4] === be[4] && ne[5] === be[5] && ne[6] === be[6] && ne[7] === be[7] && ne[8] === be[8] && ne[9] === be[9] && ne[10] === be[10] && ne[11] === be[11] && ne[12] === be[12] && ne[13] === be[13] && ne[14] === be[14] && ne[15] === be[15]
        }
        function Be(ne, be) {
            var ve = ne[0]
              , Se = ne[1]
              , Ke = ne[2]
              , le = ne[3]
              , de = ne[4]
              , Te = ne[5]
              , Re = ne[6]
              , De = ne[7]
              , Ge = ne[8]
              , it = ne[9]
              , at = ne[10]
              , wt = ne[11]
              , Ve = ne[12]
              , Ee = ne[13]
              , xe = ne[14]
              , $e = ne[15]
              , nt = be[0]
              , rt = be[1]
              , me = be[2]
              , Le = be[3]
              , ct = be[4]
              , He = be[5]
              , Je = be[6]
              , ht = be[7]
              , Fe = be[8]
              , Tt = be[9]
              , vt = be[10]
              , Oe = be[11]
              , _t = be[12]
              , Ut = be[13]
              , Ie = be[14]
              , Ne = be[15];
            return Math.abs(ve - nt) <= n.EPSILON * Math.max(1, Math.abs(ve), Math.abs(nt)) && Math.abs(Se - rt) <= n.EPSILON * Math.max(1, Math.abs(Se), Math.abs(rt)) && Math.abs(Ke - me) <= n.EPSILON * Math.max(1, Math.abs(Ke), Math.abs(me)) && Math.abs(le - Le) <= n.EPSILON * Math.max(1, Math.abs(le), Math.abs(Le)) && Math.abs(de - ct) <= n.EPSILON * Math.max(1, Math.abs(de), Math.abs(ct)) && Math.abs(Te - He) <= n.EPSILON * Math.max(1, Math.abs(Te), Math.abs(He)) && Math.abs(Re - Je) <= n.EPSILON * Math.max(1, Math.abs(Re), Math.abs(Je)) && Math.abs(De - ht) <= n.EPSILON * Math.max(1, Math.abs(De), Math.abs(ht)) && Math.abs(Ge - Fe) <= n.EPSILON * Math.max(1, Math.abs(Ge), Math.abs(Fe)) && Math.abs(it - Tt) <= n.EPSILON * Math.max(1, Math.abs(it), Math.abs(Tt)) && Math.abs(at - vt) <= n.EPSILON * Math.max(1, Math.abs(at), Math.abs(vt)) && Math.abs(wt - Oe) <= n.EPSILON * Math.max(1, Math.abs(wt), Math.abs(Oe)) && Math.abs(Ve - _t) <= n.EPSILON * Math.max(1, Math.abs(Ve), Math.abs(_t)) && Math.abs(Ee - Ut) <= n.EPSILON * Math.max(1, Math.abs(Ee), Math.abs(Ut)) && Math.abs(xe - Ie) <= n.EPSILON * Math.max(1, Math.abs(xe), Math.abs(Ie)) && Math.abs($e - Ne) <= n.EPSILON * Math.max(1, Math.abs($e), Math.abs(Ne))
        }
        a.mul = I,
        a.sub = Xe
    }
})
  , require_vec3 = __commonJS({
    "src/utils/vcode-gltf-standalone/node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/vec3.js"(a) {
        function e(ue) {
            "@babel/helpers - typeof";
            return e = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(_e) {
                return typeof _e
            }
            : function(_e) {
                return _e && typeof Symbol == "function" && _e.constructor === Symbol && _e !== Symbol.prototype ? "symbol" : typeof _e
            }
            ,
            e(ue)
        }
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.add = _,
        a.angle = te,
        a.bezier = R,
        a.ceil = I,
        a.clone = l,
        a.copy = b,
        a.create = d,
        a.cross = f,
        a.dist = void 0,
        a.distance = Z,
        a.div = void 0,
        a.divide = K,
        a.dot = B,
        a.equals = se,
        a.exactEquals = j,
        a.floor = O,
        a.forEach = void 0,
        a.fromValues = m,
        a.hermite = N,
        a.inverse = re,
        a.len = void 0,
        a.length = u,
        a.lerp = y,
        a.max = k,
        a.min = q,
        a.mul = void 0,
        a.multiply = C,
        a.negate = ae,
        a.normalize = z,
        a.random = D,
        a.rotateX = U,
        a.rotateY = Q,
        a.rotateZ = ie,
        a.round = V,
        a.scale = $,
        a.scaleAndAdd = Y,
        a.set = v,
        a.slerp = X,
        a.sqrLen = a.sqrDist = void 0,
        a.squaredDistance = H,
        a.squaredLength = J,
        a.str = he,
        a.sub = void 0,
        a.subtract = T,
        a.transformMat3 = M,
        a.transformMat4 = F,
        a.transformQuat = E,
        a.zero = oe;
        var n = c(require_common());
        function c(ue, _e) {
            if (typeof WeakMap == "function")
                var Xe = new WeakMap
                  , pe = new WeakMap;
            return (c = function(ce, Be) {
                if (!Be && ce && ce.__esModule)
                    return ce;
                var ne, be, ve = {
                    __proto__: null,
                    default: ce
                };
                if (ce === null || e(ce) != "object" && typeof ce != "function")
                    return ve;
                if (ne = Be ? pe : Xe) {
                    if (ne.has(ce))
                        return ne.get(ce);
                    ne.set(ce, ve)
                }
                for (var Se in ce)
                    Se !== "default" && {}.hasOwnProperty.call(ce, Se) && ((be = (ne = Object.defineProperty) && Object.getOwnPropertyDescriptor(ce, Se)) && (be.get || be.set) ? ne(ve, Se, be) : ve[Se] = ce[Se]);
                return ve
            }
            )(ue, _e)
        }
        function d() {
            var ue = new n.ARRAY_TYPE(3);
            return n.ARRAY_TYPE != Float32Array && (ue[0] = 0,
            ue[1] = 0,
            ue[2] = 0),
            ue
        }
        function l(ue) {
            var _e = new n.ARRAY_TYPE(3);
            return _e[0] = ue[0],
            _e[1] = ue[1],
            _e[2] = ue[2],
            _e
        }
        function u(ue) {
            var _e = ue[0]
              , Xe = ue[1]
              , pe = ue[2];
            return Math.sqrt(_e * _e + Xe * Xe + pe * pe)
        }
        function m(ue, _e, Xe) {
            var pe = new n.ARRAY_TYPE(3);
            return pe[0] = ue,
            pe[1] = _e,
            pe[2] = Xe,
            pe
        }
        function b(ue, _e) {
            return ue[0] = _e[0],
            ue[1] = _e[1],
            ue[2] = _e[2],
            ue
        }
        function v(ue, _e, Xe, pe) {
            return ue[0] = _e,
            ue[1] = Xe,
            ue[2] = pe,
            ue
        }
        function _(ue, _e, Xe) {
            return ue[0] = _e[0] + Xe[0],
            ue[1] = _e[1] + Xe[1],
            ue[2] = _e[2] + Xe[2],
            ue
        }
        function T(ue, _e, Xe) {
            return ue[0] = _e[0] - Xe[0],
            ue[1] = _e[1] - Xe[1],
            ue[2] = _e[2] - Xe[2],
            ue
        }
        function C(ue, _e, Xe) {
            return ue[0] = _e[0] * Xe[0],
            ue[1] = _e[1] * Xe[1],
            ue[2] = _e[2] * Xe[2],
            ue
        }
        function K(ue, _e, Xe) {
            return ue[0] = _e[0] / Xe[0],
            ue[1] = _e[1] / Xe[1],
            ue[2] = _e[2] / Xe[2],
            ue
        }
        function I(ue, _e) {
            return ue[0] = Math.ceil(_e[0]),
            ue[1] = Math.ceil(_e[1]),
            ue[2] = Math.ceil(_e[2]),
            ue
        }
        function O(ue, _e) {
            return ue[0] = Math.floor(_e[0]),
            ue[1] = Math.floor(_e[1]),
            ue[2] = Math.floor(_e[2]),
            ue
        }
        function q(ue, _e, Xe) {
            return ue[0] = Math.min(_e[0], Xe[0]),
            ue[1] = Math.min(_e[1], Xe[1]),
            ue[2] = Math.min(_e[2], Xe[2]),
            ue
        }
        function k(ue, _e, Xe) {
            return ue[0] = Math.max(_e[0], Xe[0]),
            ue[1] = Math.max(_e[1], Xe[1]),
            ue[2] = Math.max(_e[2], Xe[2]),
            ue
        }
        function V(ue, _e) {
            return ue[0] = n.round(_e[0]),
            ue[1] = n.round(_e[1]),
            ue[2] = n.round(_e[2]),
            ue
        }
        function $(ue, _e, Xe) {
            return ue[0] = _e[0] * Xe,
            ue[1] = _e[1] * Xe,
            ue[2] = _e[2] * Xe,
            ue
        }
        function Y(ue, _e, Xe, pe) {
            return ue[0] = _e[0] + Xe[0] * pe,
            ue[1] = _e[1] + Xe[1] * pe,
            ue[2] = _e[2] + Xe[2] * pe,
            ue
        }
        function Z(ue, _e) {
            var Xe = _e[0] - ue[0]
              , pe = _e[1] - ue[1]
              , ye = _e[2] - ue[2];
            return Math.sqrt(Xe * Xe + pe * pe + ye * ye)
        }
        function H(ue, _e) {
            var Xe = _e[0] - ue[0]
              , pe = _e[1] - ue[1]
              , ye = _e[2] - ue[2];
            return Xe * Xe + pe * pe + ye * ye
        }
        function J(ue) {
            var _e = ue[0]
              , Xe = ue[1]
              , pe = ue[2];
            return _e * _e + Xe * Xe + pe * pe
        }
        function ae(ue, _e) {
            return ue[0] = -_e[0],
            ue[1] = -_e[1],
            ue[2] = -_e[2],
            ue
        }
        function re(ue, _e) {
            return ue[0] = 1 / _e[0],
            ue[1] = 1 / _e[1],
            ue[2] = 1 / _e[2],
            ue
        }
        function z(ue, _e) {
            var Xe = _e[0]
              , pe = _e[1]
              , ye = _e[2]
              , ce = Xe * Xe + pe * pe + ye * ye;
            return ce > 0 && (ce = 1 / Math.sqrt(ce)),
            ue[0] = _e[0] * ce,
            ue[1] = _e[1] * ce,
            ue[2] = _e[2] * ce,
            ue
        }
        function B(ue, _e) {
            return ue[0] * _e[0] + ue[1] * _e[1] + ue[2] * _e[2]
        }
        function f(ue, _e, Xe) {
            var pe = _e[0]
              , ye = _e[1]
              , ce = _e[2]
              , Be = Xe[0]
              , ne = Xe[1]
              , be = Xe[2];
            return ue[0] = ye * be - ce * ne,
            ue[1] = ce * Be - pe * be,
            ue[2] = pe * ne - ye * Be,
            ue
        }
        function y(ue, _e, Xe, pe) {
            var ye = _e[0]
              , ce = _e[1]
              , Be = _e[2];
            return ue[0] = ye + pe * (Xe[0] - ye),
            ue[1] = ce + pe * (Xe[1] - ce),
            ue[2] = Be + pe * (Xe[2] - Be),
            ue
        }
        function X(ue, _e, Xe, pe) {
            var ye = Math.acos(Math.min(Math.max(B(_e, Xe), -1), 1))
              , ce = Math.sin(ye)
              , Be = Math.sin((1 - pe) * ye) / ce
              , ne = Math.sin(pe * ye) / ce;
            return ue[0] = Be * _e[0] + ne * Xe[0],
            ue[1] = Be * _e[1] + ne * Xe[1],
            ue[2] = Be * _e[2] + ne * Xe[2],
            ue
        }
        function N(ue, _e, Xe, pe, ye, ce) {
            var Be = ce * ce
              , ne = Be * (2 * ce - 3) + 1
              , be = Be * (ce - 2) + ce
              , ve = Be * (ce - 1)
              , Se = Be * (3 - 2 * ce);
            return ue[0] = _e[0] * ne + Xe[0] * be + pe[0] * ve + ye[0] * Se,
            ue[1] = _e[1] * ne + Xe[1] * be + pe[1] * ve + ye[1] * Se,
            ue[2] = _e[2] * ne + Xe[2] * be + pe[2] * ve + ye[2] * Se,
            ue
        }
        function R(ue, _e, Xe, pe, ye, ce) {
            var Be = 1 - ce
              , ne = Be * Be
              , be = ce * ce
              , ve = ne * Be
              , Se = 3 * ce * ne
              , Ke = 3 * be * Be
              , le = be * ce;
            return ue[0] = _e[0] * ve + Xe[0] * Se + pe[0] * Ke + ye[0] * le,
            ue[1] = _e[1] * ve + Xe[1] * Se + pe[1] * Ke + ye[1] * le,
            ue[2] = _e[2] * ve + Xe[2] * Se + pe[2] * Ke + ye[2] * le,
            ue
        }
        function D(ue, _e) {
            _e = _e === void 0 ? 1 : _e;
            var Xe = n.RANDOM() * 2 * Math.PI
              , pe = n.RANDOM() * 2 - 1
              , ye = Math.sqrt(1 - pe * pe) * _e;
            return ue[0] = Math.cos(Xe) * ye,
            ue[1] = Math.sin(Xe) * ye,
            ue[2] = pe * _e,
            ue
        }
        function F(ue, _e, Xe) {
            var pe = _e[0]
              , ye = _e[1]
              , ce = _e[2]
              , Be = Xe[3] * pe + Xe[7] * ye + Xe[11] * ce + Xe[15];
            return Be = Be || 1,
            ue[0] = (Xe[0] * pe + Xe[4] * ye + Xe[8] * ce + Xe[12]) / Be,
            ue[1] = (Xe[1] * pe + Xe[5] * ye + Xe[9] * ce + Xe[13]) / Be,
            ue[2] = (Xe[2] * pe + Xe[6] * ye + Xe[10] * ce + Xe[14]) / Be,
            ue
        }
        function M(ue, _e, Xe) {
            var pe = _e[0]
              , ye = _e[1]
              , ce = _e[2];
            return ue[0] = pe * Xe[0] + ye * Xe[3] + ce * Xe[6],
            ue[1] = pe * Xe[1] + ye * Xe[4] + ce * Xe[7],
            ue[2] = pe * Xe[2] + ye * Xe[5] + ce * Xe[8],
            ue
        }
        function E(ue, _e, Xe) {
            var pe = Xe[0]
              , ye = Xe[1]
              , ce = Xe[2]
              , Be = Xe[3]
              , ne = _e[0]
              , be = _e[1]
              , ve = _e[2]
              , Se = ye * ve - ce * be
              , Ke = ce * ne - pe * ve
              , le = pe * be - ye * ne;
            return Se = Se + Se,
            Ke = Ke + Ke,
            le = le + le,
            ue[0] = ne + Be * Se + ye * le - ce * Ke,
            ue[1] = be + Be * Ke + ce * Se - pe * le,
            ue[2] = ve + Be * le + pe * Ke - ye * Se,
            ue
        }
        function U(ue, _e, Xe, pe) {
            var ye = []
              , ce = [];
            return ye[0] = _e[0] - Xe[0],
            ye[1] = _e[1] - Xe[1],
            ye[2] = _e[2] - Xe[2],
            ce[0] = ye[0],
            ce[1] = ye[1] * Math.cos(pe) - ye[2] * Math.sin(pe),
            ce[2] = ye[1] * Math.sin(pe) + ye[2] * Math.cos(pe),
            ue[0] = ce[0] + Xe[0],
            ue[1] = ce[1] + Xe[1],
            ue[2] = ce[2] + Xe[2],
            ue
        }
        function Q(ue, _e, Xe, pe) {
            var ye = []
              , ce = [];
            return ye[0] = _e[0] - Xe[0],
            ye[1] = _e[1] - Xe[1],
            ye[2] = _e[2] - Xe[2],
            ce[0] = ye[2] * Math.sin(pe) + ye[0] * Math.cos(pe),
            ce[1] = ye[1],
            ce[2] = ye[2] * Math.cos(pe) - ye[0] * Math.sin(pe),
            ue[0] = ce[0] + Xe[0],
            ue[1] = ce[1] + Xe[1],
            ue[2] = ce[2] + Xe[2],
            ue
        }
        function ie(ue, _e, Xe, pe) {
            var ye = []
              , ce = [];
            return ye[0] = _e[0] - Xe[0],
            ye[1] = _e[1] - Xe[1],
            ye[2] = _e[2] - Xe[2],
            ce[0] = ye[0] * Math.cos(pe) - ye[1] * Math.sin(pe),
            ce[1] = ye[0] * Math.sin(pe) + ye[1] * Math.cos(pe),
            ce[2] = ye[2],
            ue[0] = ce[0] + Xe[0],
            ue[1] = ce[1] + Xe[1],
            ue[2] = ce[2] + Xe[2],
            ue
        }
        function te(ue, _e) {
            var Xe = ue[0]
              , pe = ue[1]
              , ye = ue[2]
              , ce = _e[0]
              , Be = _e[1]
              , ne = _e[2]
              , be = Math.sqrt((Xe * Xe + pe * pe + ye * ye) * (ce * ce + Be * Be + ne * ne))
              , ve = be && B(ue, _e) / be;
            return Math.acos(Math.min(Math.max(ve, -1), 1))
        }
        function oe(ue) {
            return ue[0] = 0,
            ue[1] = 0,
            ue[2] = 0,
            ue
        }
        function he(ue) {
            return "vec3(" + ue[0] + ", " + ue[1] + ", " + ue[2] + ")"
        }
        function j(ue, _e) {
            return ue[0] === _e[0] && ue[1] === _e[1] && ue[2] === _e[2]
        }
        function se(ue, _e) {
            var Xe = ue[0]
              , pe = ue[1]
              , ye = ue[2]
              , ce = _e[0]
              , Be = _e[1]
              , ne = _e[2];
            return Math.abs(Xe - ce) <= n.EPSILON * Math.max(1, Math.abs(Xe), Math.abs(ce)) && Math.abs(pe - Be) <= n.EPSILON * Math.max(1, Math.abs(pe), Math.abs(Be)) && Math.abs(ye - ne) <= n.EPSILON * Math.max(1, Math.abs(ye), Math.abs(ne))
        }
        a.sub = T,
        a.mul = C,
        a.div = K,
        a.dist = Z,
        a.sqrDist = H,
        a.len = u,
        a.sqrLen = J,
        a.forEach = function() {
            var ue = d();
            return function(_e, Xe, pe, ye, ce, Be) {
                var ne, be;
                for (Xe || (Xe = 3),
                pe || (pe = 0),
                ye ? be = Math.min(ye * Xe + pe, _e.length) : be = _e.length,
                ne = pe; ne < be; ne += Xe)
                    ue[0] = _e[ne],
                    ue[1] = _e[ne + 1],
                    ue[2] = _e[ne + 2],
                    ce(ue, ue, Be),
                    _e[ne] = ue[0],
                    _e[ne + 1] = ue[1],
                    _e[ne + 2] = ue[2];
                return _e
            }
        }()
    }
})
  , require_vec4 = __commonJS({
    "src/utils/vcode-gltf-standalone/node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/vec4.js"(a) {
        function e(U) {
            "@babel/helpers - typeof";
            return e = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(Q) {
                return typeof Q
            }
            : function(Q) {
                return Q && typeof Symbol == "function" && Q.constructor === Symbol && Q !== Symbol.prototype ? "symbol" : typeof Q
            }
            ,
            e(U)
        }
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.add = v,
        a.ceil = K,
        a.clone = l,
        a.copy = m,
        a.create = d,
        a.cross = f,
        a.dist = void 0,
        a.distance = Y,
        a.div = void 0,
        a.divide = C,
        a.dot = B,
        a.equals = E,
        a.exactEquals = M,
        a.floor = I,
        a.forEach = void 0,
        a.fromValues = u,
        a.inverse = re,
        a.len = void 0,
        a.length = H,
        a.lerp = y,
        a.max = q,
        a.min = O,
        a.mul = void 0,
        a.multiply = T,
        a.negate = ae,
        a.normalize = z,
        a.random = X,
        a.round = k,
        a.scale = V,
        a.scaleAndAdd = $,
        a.set = b,
        a.sqrLen = a.sqrDist = void 0,
        a.squaredDistance = Z,
        a.squaredLength = J,
        a.str = F,
        a.sub = void 0,
        a.subtract = _,
        a.transformMat4 = N,
        a.transformQuat = R,
        a.zero = D;
        var n = c(require_common());
        function c(U, Q) {
            if (typeof WeakMap == "function")
                var ie = new WeakMap
                  , te = new WeakMap;
            return (c = function(he, j) {
                if (!j && he && he.__esModule)
                    return he;
                var se, ue, _e = {
                    __proto__: null,
                    default: he
                };
                if (he === null || e(he) != "object" && typeof he != "function")
                    return _e;
                if (se = j ? te : ie) {
                    if (se.has(he))
                        return se.get(he);
                    se.set(he, _e)
                }
                for (var Xe in he)
                    Xe !== "default" && {}.hasOwnProperty.call(he, Xe) && ((ue = (se = Object.defineProperty) && Object.getOwnPropertyDescriptor(he, Xe)) && (ue.get || ue.set) ? se(_e, Xe, ue) : _e[Xe] = he[Xe]);
                return _e
            }
            )(U, Q)
        }
        function d() {
            var U = new n.ARRAY_TYPE(4);
            return n.ARRAY_TYPE != Float32Array && (U[0] = 0,
            U[1] = 0,
            U[2] = 0,
            U[3] = 0),
            U
        }
        function l(U) {
            var Q = new n.ARRAY_TYPE(4);
            return Q[0] = U[0],
            Q[1] = U[1],
            Q[2] = U[2],
            Q[3] = U[3],
            Q
        }
        function u(U, Q, ie, te) {
            var oe = new n.ARRAY_TYPE(4);
            return oe[0] = U,
            oe[1] = Q,
            oe[2] = ie,
            oe[3] = te,
            oe
        }
        function m(U, Q) {
            return U[0] = Q[0],
            U[1] = Q[1],
            U[2] = Q[2],
            U[3] = Q[3],
            U
        }
        function b(U, Q, ie, te, oe) {
            return U[0] = Q,
            U[1] = ie,
            U[2] = te,
            U[3] = oe,
            U
        }
        function v(U, Q, ie) {
            return U[0] = Q[0] + ie[0],
            U[1] = Q[1] + ie[1],
            U[2] = Q[2] + ie[2],
            U[3] = Q[3] + ie[3],
            U
        }
        function _(U, Q, ie) {
            return U[0] = Q[0] - ie[0],
            U[1] = Q[1] - ie[1],
            U[2] = Q[2] - ie[2],
            U[3] = Q[3] - ie[3],
            U
        }
        function T(U, Q, ie) {
            return U[0] = Q[0] * ie[0],
            U[1] = Q[1] * ie[1],
            U[2] = Q[2] * ie[2],
            U[3] = Q[3] * ie[3],
            U
        }
        function C(U, Q, ie) {
            return U[0] = Q[0] / ie[0],
            U[1] = Q[1] / ie[1],
            U[2] = Q[2] / ie[2],
            U[3] = Q[3] / ie[3],
            U
        }
        function K(U, Q) {
            return U[0] = Math.ceil(Q[0]),
            U[1] = Math.ceil(Q[1]),
            U[2] = Math.ceil(Q[2]),
            U[3] = Math.ceil(Q[3]),
            U
        }
        function I(U, Q) {
            return U[0] = Math.floor(Q[0]),
            U[1] = Math.floor(Q[1]),
            U[2] = Math.floor(Q[2]),
            U[3] = Math.floor(Q[3]),
            U
        }
        function O(U, Q, ie) {
            return U[0] = Math.min(Q[0], ie[0]),
            U[1] = Math.min(Q[1], ie[1]),
            U[2] = Math.min(Q[2], ie[2]),
            U[3] = Math.min(Q[3], ie[3]),
            U
        }
        function q(U, Q, ie) {
            return U[0] = Math.max(Q[0], ie[0]),
            U[1] = Math.max(Q[1], ie[1]),
            U[2] = Math.max(Q[2], ie[2]),
            U[3] = Math.max(Q[3], ie[3]),
            U
        }
        function k(U, Q) {
            return U[0] = n.round(Q[0]),
            U[1] = n.round(Q[1]),
            U[2] = n.round(Q[2]),
            U[3] = n.round(Q[3]),
            U
        }
        function V(U, Q, ie) {
            return U[0] = Q[0] * ie,
            U[1] = Q[1] * ie,
            U[2] = Q[2] * ie,
            U[3] = Q[3] * ie,
            U
        }
        function $(U, Q, ie, te) {
            return U[0] = Q[0] + ie[0] * te,
            U[1] = Q[1] + ie[1] * te,
            U[2] = Q[2] + ie[2] * te,
            U[3] = Q[3] + ie[3] * te,
            U
        }
        function Y(U, Q) {
            var ie = Q[0] - U[0]
              , te = Q[1] - U[1]
              , oe = Q[2] - U[2]
              , he = Q[3] - U[3];
            return Math.sqrt(ie * ie + te * te + oe * oe + he * he)
        }
        function Z(U, Q) {
            var ie = Q[0] - U[0]
              , te = Q[1] - U[1]
              , oe = Q[2] - U[2]
              , he = Q[3] - U[3];
            return ie * ie + te * te + oe * oe + he * he
        }
        function H(U) {
            var Q = U[0]
              , ie = U[1]
              , te = U[2]
              , oe = U[3];
            return Math.sqrt(Q * Q + ie * ie + te * te + oe * oe)
        }
        function J(U) {
            var Q = U[0]
              , ie = U[1]
              , te = U[2]
              , oe = U[3];
            return Q * Q + ie * ie + te * te + oe * oe
        }
        function ae(U, Q) {
            return U[0] = -Q[0],
            U[1] = -Q[1],
            U[2] = -Q[2],
            U[3] = -Q[3],
            U
        }
        function re(U, Q) {
            return U[0] = 1 / Q[0],
            U[1] = 1 / Q[1],
            U[2] = 1 / Q[2],
            U[3] = 1 / Q[3],
            U
        }
        function z(U, Q) {
            var ie = Q[0]
              , te = Q[1]
              , oe = Q[2]
              , he = Q[3]
              , j = ie * ie + te * te + oe * oe + he * he;
            return j > 0 && (j = 1 / Math.sqrt(j)),
            U[0] = ie * j,
            U[1] = te * j,
            U[2] = oe * j,
            U[3] = he * j,
            U
        }
        function B(U, Q) {
            return U[0] * Q[0] + U[1] * Q[1] + U[2] * Q[2] + U[3] * Q[3]
        }
        function f(U, Q, ie, te) {
            var oe = ie[0] * te[1] - ie[1] * te[0]
              , he = ie[0] * te[2] - ie[2] * te[0]
              , j = ie[0] * te[3] - ie[3] * te[0]
              , se = ie[1] * te[2] - ie[2] * te[1]
              , ue = ie[1] * te[3] - ie[3] * te[1]
              , _e = ie[2] * te[3] - ie[3] * te[2]
              , Xe = Q[0]
              , pe = Q[1]
              , ye = Q[2]
              , ce = Q[3];
            return U[0] = pe * _e - ye * ue + ce * se,
            U[1] = -(Xe * _e) + ye * j - ce * he,
            U[2] = Xe * ue - pe * j + ce * oe,
            U[3] = -(Xe * se) + pe * he - ye * oe,
            U
        }
        function y(U, Q, ie, te) {
            var oe = Q[0]
              , he = Q[1]
              , j = Q[2]
              , se = Q[3];
            return U[0] = oe + te * (ie[0] - oe),
            U[1] = he + te * (ie[1] - he),
            U[2] = j + te * (ie[2] - j),
            U[3] = se + te * (ie[3] - se),
            U
        }
        function X(U, Q) {
            Q = Q === void 0 ? 1 : Q;
            var ie, te, oe, he, j, se, ue;
            ue = n.RANDOM(),
            ie = ue * 2 - 1,
            te = (4 * n.RANDOM() - 2) * Math.sqrt(ue * -ue + ue),
            j = ie * ie + te * te,
            ue = n.RANDOM(),
            oe = ue * 2 - 1,
            he = (4 * n.RANDOM() - 2) * Math.sqrt(ue * -ue + ue),
            se = oe * oe + he * he;
            var _e = Math.sqrt((1 - j) / se);
            return U[0] = Q * ie,
            U[1] = Q * te,
            U[2] = Q * oe * _e,
            U[3] = Q * he * _e,
            U
        }
        function N(U, Q, ie) {
            var te = Q[0]
              , oe = Q[1]
              , he = Q[2]
              , j = Q[3];
            return U[0] = ie[0] * te + ie[4] * oe + ie[8] * he + ie[12] * j,
            U[1] = ie[1] * te + ie[5] * oe + ie[9] * he + ie[13] * j,
            U[2] = ie[2] * te + ie[6] * oe + ie[10] * he + ie[14] * j,
            U[3] = ie[3] * te + ie[7] * oe + ie[11] * he + ie[15] * j,
            U
        }
        function R(U, Q, ie) {
            var te = ie[0]
              , oe = ie[1]
              , he = ie[2]
              , j = ie[3]
              , se = Q[0]
              , ue = Q[1]
              , _e = Q[2]
              , Xe = oe * _e - he * ue
              , pe = he * se - te * _e
              , ye = te * ue - oe * se;
            return Xe = Xe + Xe,
            pe = pe + pe,
            ye = ye + ye,
            U[0] = se + j * Xe + oe * ye - he * pe,
            U[1] = ue + j * pe + he * Xe - te * ye,
            U[2] = _e + j * ye + te * pe - oe * Xe,
            U[3] = Q[3],
            U
        }
        function D(U) {
            return U[0] = 0,
            U[1] = 0,
            U[2] = 0,
            U[3] = 0,
            U
        }
        function F(U) {
            return "vec4(" + U[0] + ", " + U[1] + ", " + U[2] + ", " + U[3] + ")"
        }
        function M(U, Q) {
            return U[0] === Q[0] && U[1] === Q[1] && U[2] === Q[2] && U[3] === Q[3]
        }
        function E(U, Q) {
            var ie = U[0]
              , te = U[1]
              , oe = U[2]
              , he = U[3]
              , j = Q[0]
              , se = Q[1]
              , ue = Q[2]
              , _e = Q[3];
            return Math.abs(ie - j) <= n.EPSILON * Math.max(1, Math.abs(ie), Math.abs(j)) && Math.abs(te - se) <= n.EPSILON * Math.max(1, Math.abs(te), Math.abs(se)) && Math.abs(oe - ue) <= n.EPSILON * Math.max(1, Math.abs(oe), Math.abs(ue)) && Math.abs(he - _e) <= n.EPSILON * Math.max(1, Math.abs(he), Math.abs(_e))
        }
        a.sub = _,
        a.mul = T,
        a.div = C,
        a.dist = Y,
        a.sqrDist = Z,
        a.len = H,
        a.sqrLen = J,
        a.forEach = function() {
            var U = d();
            return function(Q, ie, te, oe, he, j) {
                var se, ue;
                for (ie || (ie = 4),
                te || (te = 0),
                oe ? ue = Math.min(oe * ie + te, Q.length) : ue = Q.length,
                se = te; se < ue; se += ie)
                    U[0] = Q[se],
                    U[1] = Q[se + 1],
                    U[2] = Q[se + 2],
                    U[3] = Q[se + 3],
                    he(U, U, j),
                    Q[se] = U[0],
                    Q[se + 1] = U[1],
                    Q[se + 2] = U[2],
                    Q[se + 3] = U[3];
                return Q
            }
        }()
    }
})
  , require_quat = __commonJS({
    "src/utils/vcode-gltf-standalone/node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/quat.js"(a) {
        function e(D) {
            "@babel/helpers - typeof";
            return e = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(F) {
                return typeof F
            }
            : function(F) {
                return F && typeof Symbol == "function" && F.constructor === Symbol && F !== Symbol.prototype ? "symbol" : typeof F
            }
            ,
            e(D)
        }
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.add = void 0,
        a.calculateW = q,
        a.clone = void 0,
        a.conjugate = J,
        a.copy = void 0,
        a.create = m,
        a.dot = void 0,
        a.equals = R,
        a.exactEquals = void 0,
        a.exp = k,
        a.fromEuler = re,
        a.fromMat3 = ae,
        a.fromValues = void 0,
        a.getAngle = T,
        a.getAxisAngle = _,
        a.identity = b,
        a.invert = H,
        a.lerp = a.length = a.len = void 0,
        a.ln = V,
        a.mul = void 0,
        a.multiply = C,
        a.normalize = void 0,
        a.pow = $,
        a.random = Z,
        a.rotateX = K,
        a.rotateY = I,
        a.rotateZ = O,
        a.setAxes = a.set = a.scale = a.rotationTo = void 0,
        a.setAxisAngle = v,
        a.slerp = Y,
        a.squaredLength = a.sqrLen = a.sqlerp = void 0,
        a.str = z;
        var n = u(require_common())
          , c = u(require_mat3())
          , d = u(require_vec3())
          , l = u(require_vec4());
        function u(D, F) {
            if (typeof WeakMap == "function")
                var M = new WeakMap
                  , E = new WeakMap;
            return (u = function(Q, ie) {
                if (!ie && Q && Q.__esModule)
                    return Q;
                var te, oe, he = {
                    __proto__: null,
                    default: Q
                };
                if (Q === null || e(Q) != "object" && typeof Q != "function")
                    return he;
                if (te = ie ? E : M) {
                    if (te.has(Q))
                        return te.get(Q);
                    te.set(Q, he)
                }
                for (var j in Q)
                    j !== "default" && {}.hasOwnProperty.call(Q, j) && ((oe = (te = Object.defineProperty) && Object.getOwnPropertyDescriptor(Q, j)) && (oe.get || oe.set) ? te(he, j, oe) : he[j] = Q[j]);
                return he
            }
            )(D, F)
        }
        function m() {
            var D = new n.ARRAY_TYPE(4);
            return n.ARRAY_TYPE != Float32Array && (D[0] = 0,
            D[1] = 0,
            D[2] = 0),
            D[3] = 1,
            D
        }
        function b(D) {
            return D[0] = 0,
            D[1] = 0,
            D[2] = 0,
            D[3] = 1,
            D
        }
        function v(D, F, M) {
            M = M * .5;
            var E = Math.sin(M);
            return D[0] = E * F[0],
            D[1] = E * F[1],
            D[2] = E * F[2],
            D[3] = Math.cos(M),
            D
        }
        function _(D, F) {
            var M = Math.acos(F[3]) * 2
              , E = Math.sin(M / 2);
            return E > n.EPSILON ? (D[0] = F[0] / E,
            D[1] = F[1] / E,
            D[2] = F[2] / E) : (D[0] = 1,
            D[1] = 0,
            D[2] = 0),
            M
        }
        function T(D, F) {
            var M = f(D, F);
            return Math.acos(2 * M * M - 1)
        }
        function C(D, F, M) {
            var E = F[0]
              , U = F[1]
              , Q = F[2]
              , ie = F[3]
              , te = M[0]
              , oe = M[1]
              , he = M[2]
              , j = M[3];
            return D[0] = E * j + ie * te + U * he - Q * oe,
            D[1] = U * j + ie * oe + Q * te - E * he,
            D[2] = Q * j + ie * he + E * oe - U * te,
            D[3] = ie * j - E * te - U * oe - Q * he,
            D
        }
        function K(D, F, M) {
            M *= .5;
            var E = F[0]
              , U = F[1]
              , Q = F[2]
              , ie = F[3]
              , te = Math.sin(M)
              , oe = Math.cos(M);
            return D[0] = E * oe + ie * te,
            D[1] = U * oe + Q * te,
            D[2] = Q * oe - U * te,
            D[3] = ie * oe - E * te,
            D
        }
        function I(D, F, M) {
            M *= .5;
            var E = F[0]
              , U = F[1]
              , Q = F[2]
              , ie = F[3]
              , te = Math.sin(M)
              , oe = Math.cos(M);
            return D[0] = E * oe - Q * te,
            D[1] = U * oe + ie * te,
            D[2] = Q * oe + E * te,
            D[3] = ie * oe - U * te,
            D
        }
        function O(D, F, M) {
            M *= .5;
            var E = F[0]
              , U = F[1]
              , Q = F[2]
              , ie = F[3]
              , te = Math.sin(M)
              , oe = Math.cos(M);
            return D[0] = E * oe + U * te,
            D[1] = U * oe - E * te,
            D[2] = Q * oe + ie * te,
            D[3] = ie * oe - Q * te,
            D
        }
        function q(D, F) {
            var M = F[0]
              , E = F[1]
              , U = F[2];
            return D[0] = M,
            D[1] = E,
            D[2] = U,
            D[3] = Math.sqrt(Math.abs(1 - M * M - E * E - U * U)),
            D
        }
        function k(D, F) {
            var M = F[0]
              , E = F[1]
              , U = F[2]
              , Q = F[3]
              , ie = Math.sqrt(M * M + E * E + U * U)
              , te = Math.exp(Q)
              , oe = ie > 0 ? te * Math.sin(ie) / ie : 0;
            return D[0] = M * oe,
            D[1] = E * oe,
            D[2] = U * oe,
            D[3] = te * Math.cos(ie),
            D
        }
        function V(D, F) {
            var M = F[0]
              , E = F[1]
              , U = F[2]
              , Q = F[3]
              , ie = Math.sqrt(M * M + E * E + U * U)
              , te = ie > 0 ? Math.atan2(ie, Q) / ie : 0;
            return D[0] = M * te,
            D[1] = E * te,
            D[2] = U * te,
            D[3] = .5 * Math.log(M * M + E * E + U * U + Q * Q),
            D
        }
        function $(D, F, M) {
            return V(D, F),
            B(D, D, M),
            k(D, D),
            D
        }
        function Y(D, F, M, E) {
            var U = F[0], Q = F[1], ie = F[2], te = F[3], oe = M[0], he = M[1], j = M[2], se = M[3], ue, _e, Xe, pe, ye;
            return _e = U * oe + Q * he + ie * j + te * se,
            _e < 0 && (_e = -_e,
            oe = -oe,
            he = -he,
            j = -j,
            se = -se),
            1 - _e > n.EPSILON ? (ue = Math.acos(_e),
            Xe = Math.sin(ue),
            pe = Math.sin((1 - E) * ue) / Xe,
            ye = Math.sin(E * ue) / Xe) : (pe = 1 - E,
            ye = E),
            D[0] = pe * U + ye * oe,
            D[1] = pe * Q + ye * he,
            D[2] = pe * ie + ye * j,
            D[3] = pe * te + ye * se,
            D
        }
        function Z(D) {
            var F = n.RANDOM()
              , M = n.RANDOM()
              , E = n.RANDOM()
              , U = Math.sqrt(1 - F)
              , Q = Math.sqrt(F);
            return D[0] = U * Math.sin(2 * Math.PI * M),
            D[1] = U * Math.cos(2 * Math.PI * M),
            D[2] = Q * Math.sin(2 * Math.PI * E),
            D[3] = Q * Math.cos(2 * Math.PI * E),
            D
        }
        function H(D, F) {
            var M = F[0]
              , E = F[1]
              , U = F[2]
              , Q = F[3]
              , ie = M * M + E * E + U * U + Q * Q
              , te = ie ? 1 / ie : 0;
            return D[0] = -M * te,
            D[1] = -E * te,
            D[2] = -U * te,
            D[3] = Q * te,
            D
        }
        function J(D, F) {
            return D[0] = -F[0],
            D[1] = -F[1],
            D[2] = -F[2],
            D[3] = F[3],
            D
        }
        function ae(D, F) {
            var M = F[0] + F[4] + F[8], E;
            if (M > 0)
                E = Math.sqrt(M + 1),
                D[3] = .5 * E,
                E = .5 / E,
                D[0] = (F[5] - F[7]) * E,
                D[1] = (F[6] - F[2]) * E,
                D[2] = (F[1] - F[3]) * E;
            else {
                var U = 0;
                F[4] > F[0] && (U = 1),
                F[8] > F[U * 3 + U] && (U = 2);
                var Q = (U + 1) % 3
                  , ie = (U + 2) % 3;
                E = Math.sqrt(F[U * 3 + U] - F[Q * 3 + Q] - F[ie * 3 + ie] + 1),
                D[U] = .5 * E,
                E = .5 / E,
                D[3] = (F[Q * 3 + ie] - F[ie * 3 + Q]) * E,
                D[Q] = (F[Q * 3 + U] + F[U * 3 + Q]) * E,
                D[ie] = (F[ie * 3 + U] + F[U * 3 + ie]) * E
            }
            return D
        }
        function re(D, F, M, E) {
            var U = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : n.ANGLE_ORDER
              , Q = Math.PI / 360;
            F *= Q,
            E *= Q,
            M *= Q;
            var ie = Math.sin(F)
              , te = Math.cos(F)
              , oe = Math.sin(M)
              , he = Math.cos(M)
              , j = Math.sin(E)
              , se = Math.cos(E);
            switch (U) {
            case "xyz":
                D[0] = ie * he * se + te * oe * j,
                D[1] = te * oe * se - ie * he * j,
                D[2] = te * he * j + ie * oe * se,
                D[3] = te * he * se - ie * oe * j;
                break;
            case "xzy":
                D[0] = ie * he * se - te * oe * j,
                D[1] = te * oe * se - ie * he * j,
                D[2] = te * he * j + ie * oe * se,
                D[3] = te * he * se + ie * oe * j;
                break;
            case "yxz":
                D[0] = ie * he * se + te * oe * j,
                D[1] = te * oe * se - ie * he * j,
                D[2] = te * he * j - ie * oe * se,
                D[3] = te * he * se + ie * oe * j;
                break;
            case "yzx":
                D[0] = ie * he * se + te * oe * j,
                D[1] = te * oe * se + ie * he * j,
                D[2] = te * he * j - ie * oe * se,
                D[3] = te * he * se - ie * oe * j;
                break;
            case "zxy":
                D[0] = ie * he * se - te * oe * j,
                D[1] = te * oe * se + ie * he * j,
                D[2] = te * he * j + ie * oe * se,
                D[3] = te * he * se - ie * oe * j;
                break;
            case "zyx":
                D[0] = ie * he * se - te * oe * j,
                D[1] = te * oe * se + ie * he * j,
                D[2] = te * he * j - ie * oe * se,
                D[3] = te * he * se + ie * oe * j;
                break;
            default:
                throw new Error("Unknown angle order " + U)
            }
            return D
        }
        function z(D) {
            return "quat(" + D[0] + ", " + D[1] + ", " + D[2] + ", " + D[3] + ")"
        }
        a.clone = l.clone,
        a.fromValues = l.fromValues,
        a.copy = l.copy,
        a.set = l.set,
        a.add = l.add,
        a.mul = C;
        var B = a.scale = l.scale
          , f = a.dot = l.dot;
        a.lerp = l.lerp;
        var y = a.length = l.length;
        a.len = y;
        var X = a.squaredLength = l.squaredLength;
        a.sqrLen = X;
        var N = a.normalize = l.normalize;
        a.exactEquals = l.exactEquals;
        function R(D, F) {
            return Math.abs(l.dot(D, F)) >= 1 - n.EPSILON
        }
        a.rotationTo = function() {
            var D = d.create()
              , F = d.fromValues(1, 0, 0)
              , M = d.fromValues(0, 1, 0);
            return function(E, U, Q) {
                var ie = d.dot(U, Q);
                return ie < -.999999 ? (d.cross(D, F, U),
                d.len(D) < 1e-6 && d.cross(D, M, U),
                d.normalize(D, D),
                v(E, D, Math.PI),
                E) : ie > .999999 ? (E[0] = 0,
                E[1] = 0,
                E[2] = 0,
                E[3] = 1,
                E) : (d.cross(D, U, Q),
                E[0] = D[0],
                E[1] = D[1],
                E[2] = D[2],
                E[3] = 1 + ie,
                N(E, E))
            }
        }(),
        a.sqlerp = function() {
            var D = m()
              , F = m();
            return function(M, E, U, Q, ie, te) {
                return Y(D, E, ie, te),
                Y(F, U, Q, te),
                Y(M, D, F, 2 * te * (1 - te)),
                M
            }
        }(),
        a.setAxes = function() {
            var D = c.create();
            return function(F, M, E, U) {
                return D[0] = E[0],
                D[3] = E[1],
                D[6] = E[2],
                D[1] = U[0],
                D[4] = U[1],
                D[7] = U[2],
                D[2] = -M[0],
                D[5] = -M[1],
                D[8] = -M[2],
                N(F, ae(F, D))
            }
        }()
    }
})
  , require_quat2 = __commonJS({
    "src/utils/vcode-gltf-standalone/node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/quat2.js"(a) {
        function e(te) {
            "@babel/helpers - typeof";
            return e = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(oe) {
                return typeof oe
            }
            : function(oe) {
                return oe && typeof Symbol == "function" && oe.constructor === Symbol && oe !== Symbol.prototype ? "symbol" : typeof oe
            }
            ,
            e(te)
        }
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.add = B,
        a.clone = m,
        a.conjugate = D,
        a.copy = I,
        a.create = u,
        a.dot = void 0,
        a.equals = ie,
        a.exactEquals = Q,
        a.fromMat4 = K,
        a.fromRotation = C,
        a.fromRotationTranslation = _,
        a.fromRotationTranslationValues = v,
        a.fromTranslation = T,
        a.fromValues = b,
        a.getDual = k,
        a.getReal = void 0,
        a.getTranslation = $,
        a.identity = O,
        a.invert = R,
        a.length = a.len = void 0,
        a.lerp = N,
        a.mul = void 0,
        a.multiply = f,
        a.normalize = E,
        a.rotateAroundAxis = z,
        a.rotateByQuatAppend = ae,
        a.rotateByQuatPrepend = re,
        a.rotateX = Z,
        a.rotateY = H,
        a.rotateZ = J,
        a.scale = y,
        a.set = q,
        a.setDual = V,
        a.squaredLength = a.sqrLen = a.setReal = void 0,
        a.str = U,
        a.translate = Y;
        var n = l(require_common())
          , c = l(require_quat())
          , d = l(require_mat4());
        function l(te, oe) {
            if (typeof WeakMap == "function")
                var he = new WeakMap
                  , j = new WeakMap;
            return (l = function(ue, _e) {
                if (!_e && ue && ue.__esModule)
                    return ue;
                var Xe, pe, ye = {
                    __proto__: null,
                    default: ue
                };
                if (ue === null || e(ue) != "object" && typeof ue != "function")
                    return ye;
                if (Xe = _e ? j : he) {
                    if (Xe.has(ue))
                        return Xe.get(ue);
                    Xe.set(ue, ye)
                }
                for (var ce in ue)
                    ce !== "default" && {}.hasOwnProperty.call(ue, ce) && ((pe = (Xe = Object.defineProperty) && Object.getOwnPropertyDescriptor(ue, ce)) && (pe.get || pe.set) ? Xe(ye, ce, pe) : ye[ce] = ue[ce]);
                return ye
            }
            )(te, oe)
        }
        function u() {
            var te = new n.ARRAY_TYPE(8);
            return n.ARRAY_TYPE != Float32Array && (te[0] = 0,
            te[1] = 0,
            te[2] = 0,
            te[4] = 0,
            te[5] = 0,
            te[6] = 0,
            te[7] = 0),
            te[3] = 1,
            te
        }
        function m(te) {
            var oe = new n.ARRAY_TYPE(8);
            return oe[0] = te[0],
            oe[1] = te[1],
            oe[2] = te[2],
            oe[3] = te[3],
            oe[4] = te[4],
            oe[5] = te[5],
            oe[6] = te[6],
            oe[7] = te[7],
            oe
        }
        function b(te, oe, he, j, se, ue, _e, Xe) {
            var pe = new n.ARRAY_TYPE(8);
            return pe[0] = te,
            pe[1] = oe,
            pe[2] = he,
            pe[3] = j,
            pe[4] = se,
            pe[5] = ue,
            pe[6] = _e,
            pe[7] = Xe,
            pe
        }
        function v(te, oe, he, j, se, ue, _e) {
            var Xe = new n.ARRAY_TYPE(8);
            Xe[0] = te,
            Xe[1] = oe,
            Xe[2] = he,
            Xe[3] = j;
            var pe = se * .5
              , ye = ue * .5
              , ce = _e * .5;
            return Xe[4] = pe * j + ye * he - ce * oe,
            Xe[5] = ye * j + ce * te - pe * he,
            Xe[6] = ce * j + pe * oe - ye * te,
            Xe[7] = -pe * te - ye * oe - ce * he,
            Xe
        }
        function _(te, oe, he) {
            var j = he[0] * .5
              , se = he[1] * .5
              , ue = he[2] * .5
              , _e = oe[0]
              , Xe = oe[1]
              , pe = oe[2]
              , ye = oe[3];
            return te[0] = _e,
            te[1] = Xe,
            te[2] = pe,
            te[3] = ye,
            te[4] = j * ye + se * pe - ue * Xe,
            te[5] = se * ye + ue * _e - j * pe,
            te[6] = ue * ye + j * Xe - se * _e,
            te[7] = -j * _e - se * Xe - ue * pe,
            te
        }
        function T(te, oe) {
            return te[0] = 0,
            te[1] = 0,
            te[2] = 0,
            te[3] = 1,
            te[4] = oe[0] * .5,
            te[5] = oe[1] * .5,
            te[6] = oe[2] * .5,
            te[7] = 0,
            te
        }
        function C(te, oe) {
            return te[0] = oe[0],
            te[1] = oe[1],
            te[2] = oe[2],
            te[3] = oe[3],
            te[4] = 0,
            te[5] = 0,
            te[6] = 0,
            te[7] = 0,
            te
        }
        function K(te, oe) {
            var he = c.create();
            d.getRotation(he, oe);
            var j = new n.ARRAY_TYPE(3);
            return d.getTranslation(j, oe),
            _(te, he, j),
            te
        }
        function I(te, oe) {
            return te[0] = oe[0],
            te[1] = oe[1],
            te[2] = oe[2],
            te[3] = oe[3],
            te[4] = oe[4],
            te[5] = oe[5],
            te[6] = oe[6],
            te[7] = oe[7],
            te
        }
        function O(te) {
            return te[0] = 0,
            te[1] = 0,
            te[2] = 0,
            te[3] = 1,
            te[4] = 0,
            te[5] = 0,
            te[6] = 0,
            te[7] = 0,
            te
        }
        function q(te, oe, he, j, se, ue, _e, Xe, pe) {
            return te[0] = oe,
            te[1] = he,
            te[2] = j,
            te[3] = se,
            te[4] = ue,
            te[5] = _e,
            te[6] = Xe,
            te[7] = pe,
            te
        }
        a.getReal = c.copy;
        function k(te, oe) {
            return te[0] = oe[4],
            te[1] = oe[5],
            te[2] = oe[6],
            te[3] = oe[7],
            te
        }
        a.setReal = c.copy;
        function V(te, oe) {
            return te[4] = oe[0],
            te[5] = oe[1],
            te[6] = oe[2],
            te[7] = oe[3],
            te
        }
        function $(te, oe) {
            var he = oe[4]
              , j = oe[5]
              , se = oe[6]
              , ue = oe[7]
              , _e = -oe[0]
              , Xe = -oe[1]
              , pe = -oe[2]
              , ye = oe[3];
            return te[0] = (he * ye + ue * _e + j * pe - se * Xe) * 2,
            te[1] = (j * ye + ue * Xe + se * _e - he * pe) * 2,
            te[2] = (se * ye + ue * pe + he * Xe - j * _e) * 2,
            te
        }
        function Y(te, oe, he) {
            var j = oe[0]
              , se = oe[1]
              , ue = oe[2]
              , _e = oe[3]
              , Xe = he[0] * .5
              , pe = he[1] * .5
              , ye = he[2] * .5
              , ce = oe[4]
              , Be = oe[5]
              , ne = oe[6]
              , be = oe[7];
            return te[0] = j,
            te[1] = se,
            te[2] = ue,
            te[3] = _e,
            te[4] = _e * Xe + se * ye - ue * pe + ce,
            te[5] = _e * pe + ue * Xe - j * ye + Be,
            te[6] = _e * ye + j * pe - se * Xe + ne,
            te[7] = -j * Xe - se * pe - ue * ye + be,
            te
        }
        function Z(te, oe, he) {
            var j = -oe[0]
              , se = -oe[1]
              , ue = -oe[2]
              , _e = oe[3]
              , Xe = oe[4]
              , pe = oe[5]
              , ye = oe[6]
              , ce = oe[7]
              , Be = Xe * _e + ce * j + pe * ue - ye * se
              , ne = pe * _e + ce * se + ye * j - Xe * ue
              , be = ye * _e + ce * ue + Xe * se - pe * j
              , ve = ce * _e - Xe * j - pe * se - ye * ue;
            return c.rotateX(te, oe, he),
            j = te[0],
            se = te[1],
            ue = te[2],
            _e = te[3],
            te[4] = Be * _e + ve * j + ne * ue - be * se,
            te[5] = ne * _e + ve * se + be * j - Be * ue,
            te[6] = be * _e + ve * ue + Be * se - ne * j,
            te[7] = ve * _e - Be * j - ne * se - be * ue,
            te
        }
        function H(te, oe, he) {
            var j = -oe[0]
              , se = -oe[1]
              , ue = -oe[2]
              , _e = oe[3]
              , Xe = oe[4]
              , pe = oe[5]
              , ye = oe[6]
              , ce = oe[7]
              , Be = Xe * _e + ce * j + pe * ue - ye * se
              , ne = pe * _e + ce * se + ye * j - Xe * ue
              , be = ye * _e + ce * ue + Xe * se - pe * j
              , ve = ce * _e - Xe * j - pe * se - ye * ue;
            return c.rotateY(te, oe, he),
            j = te[0],
            se = te[1],
            ue = te[2],
            _e = te[3],
            te[4] = Be * _e + ve * j + ne * ue - be * se,
            te[5] = ne * _e + ve * se + be * j - Be * ue,
            te[6] = be * _e + ve * ue + Be * se - ne * j,
            te[7] = ve * _e - Be * j - ne * se - be * ue,
            te
        }
        function J(te, oe, he) {
            var j = -oe[0]
              , se = -oe[1]
              , ue = -oe[2]
              , _e = oe[3]
              , Xe = oe[4]
              , pe = oe[5]
              , ye = oe[6]
              , ce = oe[7]
              , Be = Xe * _e + ce * j + pe * ue - ye * se
              , ne = pe * _e + ce * se + ye * j - Xe * ue
              , be = ye * _e + ce * ue + Xe * se - pe * j
              , ve = ce * _e - Xe * j - pe * se - ye * ue;
            return c.rotateZ(te, oe, he),
            j = te[0],
            se = te[1],
            ue = te[2],
            _e = te[3],
            te[4] = Be * _e + ve * j + ne * ue - be * se,
            te[5] = ne * _e + ve * se + be * j - Be * ue,
            te[6] = be * _e + ve * ue + Be * se - ne * j,
            te[7] = ve * _e - Be * j - ne * se - be * ue,
            te
        }
        function ae(te, oe, he) {
            var j = he[0]
              , se = he[1]
              , ue = he[2]
              , _e = he[3]
              , Xe = oe[0]
              , pe = oe[1]
              , ye = oe[2]
              , ce = oe[3];
            return te[0] = Xe * _e + ce * j + pe * ue - ye * se,
            te[1] = pe * _e + ce * se + ye * j - Xe * ue,
            te[2] = ye * _e + ce * ue + Xe * se - pe * j,
            te[3] = ce * _e - Xe * j - pe * se - ye * ue,
            Xe = oe[4],
            pe = oe[5],
            ye = oe[6],
            ce = oe[7],
            te[4] = Xe * _e + ce * j + pe * ue - ye * se,
            te[5] = pe * _e + ce * se + ye * j - Xe * ue,
            te[6] = ye * _e + ce * ue + Xe * se - pe * j,
            te[7] = ce * _e - Xe * j - pe * se - ye * ue,
            te
        }
        function re(te, oe, he) {
            var j = oe[0]
              , se = oe[1]
              , ue = oe[2]
              , _e = oe[3]
              , Xe = he[0]
              , pe = he[1]
              , ye = he[2]
              , ce = he[3];
            return te[0] = j * ce + _e * Xe + se * ye - ue * pe,
            te[1] = se * ce + _e * pe + ue * Xe - j * ye,
            te[2] = ue * ce + _e * ye + j * pe - se * Xe,
            te[3] = _e * ce - j * Xe - se * pe - ue * ye,
            Xe = he[4],
            pe = he[5],
            ye = he[6],
            ce = he[7],
            te[4] = j * ce + _e * Xe + se * ye - ue * pe,
            te[5] = se * ce + _e * pe + ue * Xe - j * ye,
            te[6] = ue * ce + _e * ye + j * pe - se * Xe,
            te[7] = _e * ce - j * Xe - se * pe - ue * ye,
            te
        }
        function z(te, oe, he, j) {
            if (Math.abs(j) < n.EPSILON)
                return I(te, oe);
            var se = Math.sqrt(he[0] * he[0] + he[1] * he[1] + he[2] * he[2]);
            j = j * .5;
            var ue = Math.sin(j)
              , _e = ue * he[0] / se
              , Xe = ue * he[1] / se
              , pe = ue * he[2] / se
              , ye = Math.cos(j)
              , ce = oe[0]
              , Be = oe[1]
              , ne = oe[2]
              , be = oe[3];
            te[0] = ce * ye + be * _e + Be * pe - ne * Xe,
            te[1] = Be * ye + be * Xe + ne * _e - ce * pe,
            te[2] = ne * ye + be * pe + ce * Xe - Be * _e,
            te[3] = be * ye - ce * _e - Be * Xe - ne * pe;
            var ve = oe[4]
              , Se = oe[5]
              , Ke = oe[6]
              , le = oe[7];
            return te[4] = ve * ye + le * _e + Se * pe - Ke * Xe,
            te[5] = Se * ye + le * Xe + Ke * _e - ve * pe,
            te[6] = Ke * ye + le * pe + ve * Xe - Se * _e,
            te[7] = le * ye - ve * _e - Se * Xe - Ke * pe,
            te
        }
        function B(te, oe, he) {
            return te[0] = oe[0] + he[0],
            te[1] = oe[1] + he[1],
            te[2] = oe[2] + he[2],
            te[3] = oe[3] + he[3],
            te[4] = oe[4] + he[4],
            te[5] = oe[5] + he[5],
            te[6] = oe[6] + he[6],
            te[7] = oe[7] + he[7],
            te
        }
        function f(te, oe, he) {
            var j = oe[0]
              , se = oe[1]
              , ue = oe[2]
              , _e = oe[3]
              , Xe = he[4]
              , pe = he[5]
              , ye = he[6]
              , ce = he[7]
              , Be = oe[4]
              , ne = oe[5]
              , be = oe[6]
              , ve = oe[7]
              , Se = he[0]
              , Ke = he[1]
              , le = he[2]
              , de = he[3];
            return te[0] = j * de + _e * Se + se * le - ue * Ke,
            te[1] = se * de + _e * Ke + ue * Se - j * le,
            te[2] = ue * de + _e * le + j * Ke - se * Se,
            te[3] = _e * de - j * Se - se * Ke - ue * le,
            te[4] = j * ce + _e * Xe + se * ye - ue * pe + Be * de + ve * Se + ne * le - be * Ke,
            te[5] = se * ce + _e * pe + ue * Xe - j * ye + ne * de + ve * Ke + be * Se - Be * le,
            te[6] = ue * ce + _e * ye + j * pe - se * Xe + be * de + ve * le + Be * Ke - ne * Se,
            te[7] = _e * ce - j * Xe - se * pe - ue * ye + ve * de - Be * Se - ne * Ke - be * le,
            te
        }
        a.mul = f;
        function y(te, oe, he) {
            return te[0] = oe[0] * he,
            te[1] = oe[1] * he,
            te[2] = oe[2] * he,
            te[3] = oe[3] * he,
            te[4] = oe[4] * he,
            te[5] = oe[5] * he,
            te[6] = oe[6] * he,
            te[7] = oe[7] * he,
            te
        }
        var X = a.dot = c.dot;
        function N(te, oe, he, j) {
            var se = 1 - j;
            return X(oe, he) < 0 && (j = -j),
            te[0] = oe[0] * se + he[0] * j,
            te[1] = oe[1] * se + he[1] * j,
            te[2] = oe[2] * se + he[2] * j,
            te[3] = oe[3] * se + he[3] * j,
            te[4] = oe[4] * se + he[4] * j,
            te[5] = oe[5] * se + he[5] * j,
            te[6] = oe[6] * se + he[6] * j,
            te[7] = oe[7] * se + he[7] * j,
            te
        }
        function R(te, oe) {
            var he = M(oe);
            return te[0] = -oe[0] / he,
            te[1] = -oe[1] / he,
            te[2] = -oe[2] / he,
            te[3] = oe[3] / he,
            te[4] = -oe[4] / he,
            te[5] = -oe[5] / he,
            te[6] = -oe[6] / he,
            te[7] = oe[7] / he,
            te
        }
        function D(te, oe) {
            return te[0] = -oe[0],
            te[1] = -oe[1],
            te[2] = -oe[2],
            te[3] = oe[3],
            te[4] = -oe[4],
            te[5] = -oe[5],
            te[6] = -oe[6],
            te[7] = oe[7],
            te
        }
        var F = a.length = c.length;
        a.len = F;
        var M = a.squaredLength = c.squaredLength;
        a.sqrLen = M;
        function E(te, oe) {
            var he = M(oe);
            if (he > 0) {
                he = Math.sqrt(he);
                var j = oe[0] / he
                  , se = oe[1] / he
                  , ue = oe[2] / he
                  , _e = oe[3] / he
                  , Xe = oe[4]
                  , pe = oe[5]
                  , ye = oe[6]
                  , ce = oe[7]
                  , Be = j * Xe + se * pe + ue * ye + _e * ce;
                te[0] = j,
                te[1] = se,
                te[2] = ue,
                te[3] = _e,
                te[4] = (Xe - j * Be) / he,
                te[5] = (pe - se * Be) / he,
                te[6] = (ye - ue * Be) / he,
                te[7] = (ce - _e * Be) / he
            }
            return te
        }
        function U(te) {
            return "quat2(" + te[0] + ", " + te[1] + ", " + te[2] + ", " + te[3] + ", " + te[4] + ", " + te[5] + ", " + te[6] + ", " + te[7] + ")"
        }
        function Q(te, oe) {
            return te[0] === oe[0] && te[1] === oe[1] && te[2] === oe[2] && te[3] === oe[3] && te[4] === oe[4] && te[5] === oe[5] && te[6] === oe[6] && te[7] === oe[7]
        }
        function ie(te, oe) {
            var he = te[0]
              , j = te[1]
              , se = te[2]
              , ue = te[3]
              , _e = te[4]
              , Xe = te[5]
              , pe = te[6]
              , ye = te[7]
              , ce = oe[0]
              , Be = oe[1]
              , ne = oe[2]
              , be = oe[3]
              , ve = oe[4]
              , Se = oe[5]
              , Ke = oe[6]
              , le = oe[7];
            return Math.abs(he - ce) <= n.EPSILON * Math.max(1, Math.abs(he), Math.abs(ce)) && Math.abs(j - Be) <= n.EPSILON * Math.max(1, Math.abs(j), Math.abs(Be)) && Math.abs(se - ne) <= n.EPSILON * Math.max(1, Math.abs(se), Math.abs(ne)) && Math.abs(ue - be) <= n.EPSILON * Math.max(1, Math.abs(ue), Math.abs(be)) && Math.abs(_e - ve) <= n.EPSILON * Math.max(1, Math.abs(_e), Math.abs(ve)) && Math.abs(Xe - Se) <= n.EPSILON * Math.max(1, Math.abs(Xe), Math.abs(Se)) && Math.abs(pe - Ke) <= n.EPSILON * Math.max(1, Math.abs(pe), Math.abs(Ke)) && Math.abs(ye - le) <= n.EPSILON * Math.max(1, Math.abs(ye), Math.abs(le))
        }
    }
})
  , require_vec2 = __commonJS({
    "src/utils/vcode-gltf-standalone/node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/vec2.js"(a) {
        function e(he) {
            "@babel/helpers - typeof";
            return e = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(j) {
                return typeof j
            }
            : function(j) {
                return j && typeof Symbol == "function" && j.constructor === Symbol && j !== Symbol.prototype ? "symbol" : typeof j
            }
            ,
            e(he)
        }
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.add = v,
        a.angle = E,
        a.ceil = K,
        a.clone = l,
        a.copy = m,
        a.create = d,
        a.cross = f,
        a.dist = void 0,
        a.distance = Y,
        a.div = void 0,
        a.divide = C,
        a.dot = B,
        a.equals = oe,
        a.exactEquals = te,
        a.floor = I,
        a.forEach = void 0,
        a.fromValues = u,
        a.inverse = re,
        a.len = void 0,
        a.length = H,
        a.lerp = y,
        a.max = q,
        a.min = O,
        a.mul = void 0,
        a.multiply = T,
        a.negate = ae,
        a.normalize = z,
        a.random = X,
        a.rotate = M,
        a.round = k,
        a.scale = V,
        a.scaleAndAdd = $,
        a.set = b,
        a.signedAngle = U,
        a.sqrLen = a.sqrDist = void 0,
        a.squaredDistance = Z,
        a.squaredLength = J,
        a.str = ie,
        a.sub = void 0,
        a.subtract = _,
        a.transformMat2 = N,
        a.transformMat2d = R,
        a.transformMat3 = D,
        a.transformMat4 = F,
        a.zero = Q;
        var n = c(require_common());
        function c(he, j) {
            if (typeof WeakMap == "function")
                var se = new WeakMap
                  , ue = new WeakMap;
            return (c = function(Xe, pe) {
                if (!pe && Xe && Xe.__esModule)
                    return Xe;
                var ye, ce, Be = {
                    __proto__: null,
                    default: Xe
                };
                if (Xe === null || e(Xe) != "object" && typeof Xe != "function")
                    return Be;
                if (ye = pe ? ue : se) {
                    if (ye.has(Xe))
                        return ye.get(Xe);
                    ye.set(Xe, Be)
                }
                for (var ne in Xe)
                    ne !== "default" && {}.hasOwnProperty.call(Xe, ne) && ((ce = (ye = Object.defineProperty) && Object.getOwnPropertyDescriptor(Xe, ne)) && (ce.get || ce.set) ? ye(Be, ne, ce) : Be[ne] = Xe[ne]);
                return Be
            }
            )(he, j)
        }
        function d() {
            var he = new n.ARRAY_TYPE(2);
            return n.ARRAY_TYPE != Float32Array && (he[0] = 0,
            he[1] = 0),
            he
        }
        function l(he) {
            var j = new n.ARRAY_TYPE(2);
            return j[0] = he[0],
            j[1] = he[1],
            j
        }
        function u(he, j) {
            var se = new n.ARRAY_TYPE(2);
            return se[0] = he,
            se[1] = j,
            se
        }
        function m(he, j) {
            return he[0] = j[0],
            he[1] = j[1],
            he
        }
        function b(he, j, se) {
            return he[0] = j,
            he[1] = se,
            he
        }
        function v(he, j, se) {
            return he[0] = j[0] + se[0],
            he[1] = j[1] + se[1],
            he
        }
        function _(he, j, se) {
            return he[0] = j[0] - se[0],
            he[1] = j[1] - se[1],
            he
        }
        function T(he, j, se) {
            return he[0] = j[0] * se[0],
            he[1] = j[1] * se[1],
            he
        }
        function C(he, j, se) {
            return he[0] = j[0] / se[0],
            he[1] = j[1] / se[1],
            he
        }
        function K(he, j) {
            return he[0] = Math.ceil(j[0]),
            he[1] = Math.ceil(j[1]),
            he
        }
        function I(he, j) {
            return he[0] = Math.floor(j[0]),
            he[1] = Math.floor(j[1]),
            he
        }
        function O(he, j, se) {
            return he[0] = Math.min(j[0], se[0]),
            he[1] = Math.min(j[1], se[1]),
            he
        }
        function q(he, j, se) {
            return he[0] = Math.max(j[0], se[0]),
            he[1] = Math.max(j[1], se[1]),
            he
        }
        function k(he, j) {
            return he[0] = n.round(j[0]),
            he[1] = n.round(j[1]),
            he
        }
        function V(he, j, se) {
            return he[0] = j[0] * se,
            he[1] = j[1] * se,
            he
        }
        function $(he, j, se, ue) {
            return he[0] = j[0] + se[0] * ue,
            he[1] = j[1] + se[1] * ue,
            he
        }
        function Y(he, j) {
            var se = j[0] - he[0]
              , ue = j[1] - he[1];
            return Math.sqrt(se * se + ue * ue)
        }
        function Z(he, j) {
            var se = j[0] - he[0]
              , ue = j[1] - he[1];
            return se * se + ue * ue
        }
        function H(he) {
            var j = he[0]
              , se = he[1];
            return Math.sqrt(j * j + se * se)
        }
        function J(he) {
            var j = he[0]
              , se = he[1];
            return j * j + se * se
        }
        function ae(he, j) {
            return he[0] = -j[0],
            he[1] = -j[1],
            he
        }
        function re(he, j) {
            return he[0] = 1 / j[0],
            he[1] = 1 / j[1],
            he
        }
        function z(he, j) {
            var se = j[0]
              , ue = j[1]
              , _e = se * se + ue * ue;
            return _e > 0 && (_e = 1 / Math.sqrt(_e)),
            he[0] = j[0] * _e,
            he[1] = j[1] * _e,
            he
        }
        function B(he, j) {
            return he[0] * j[0] + he[1] * j[1]
        }
        function f(he, j, se) {
            var ue = j[0] * se[1] - j[1] * se[0];
            return he[0] = he[1] = 0,
            he[2] = ue,
            he
        }
        function y(he, j, se, ue) {
            var _e = j[0]
              , Xe = j[1];
            return he[0] = _e + ue * (se[0] - _e),
            he[1] = Xe + ue * (se[1] - Xe),
            he
        }
        function X(he, j) {
            j = j === void 0 ? 1 : j;
            var se = n.RANDOM() * 2 * Math.PI;
            return he[0] = Math.cos(se) * j,
            he[1] = Math.sin(se) * j,
            he
        }
        function N(he, j, se) {
            var ue = j[0]
              , _e = j[1];
            return he[0] = se[0] * ue + se[2] * _e,
            he[1] = se[1] * ue + se[3] * _e,
            he
        }
        function R(he, j, se) {
            var ue = j[0]
              , _e = j[1];
            return he[0] = se[0] * ue + se[2] * _e + se[4],
            he[1] = se[1] * ue + se[3] * _e + se[5],
            he
        }
        function D(he, j, se) {
            var ue = j[0]
              , _e = j[1];
            return he[0] = se[0] * ue + se[3] * _e + se[6],
            he[1] = se[1] * ue + se[4] * _e + se[7],
            he
        }
        function F(he, j, se) {
            var ue = j[0]
              , _e = j[1];
            return he[0] = se[0] * ue + se[4] * _e + se[12],
            he[1] = se[1] * ue + se[5] * _e + se[13],
            he
        }
        function M(he, j, se, ue) {
            var _e = j[0] - se[0]
              , Xe = j[1] - se[1]
              , pe = Math.sin(ue)
              , ye = Math.cos(ue);
            return he[0] = _e * ye - Xe * pe + se[0],
            he[1] = _e * pe + Xe * ye + se[1],
            he
        }
        function E(he, j) {
            var se = he[0]
              , ue = he[1]
              , _e = j[0]
              , Xe = j[1];
            return Math.abs(Math.atan2(ue * _e - se * Xe, se * _e + ue * Xe))
        }
        function U(he, j) {
            var se = he[0]
              , ue = he[1]
              , _e = j[0]
              , Xe = j[1];
            return Math.atan2(se * Xe - ue * _e, se * _e + ue * Xe)
        }
        function Q(he) {
            return he[0] = 0,
            he[1] = 0,
            he
        }
        function ie(he) {
            return "vec2(" + he[0] + ", " + he[1] + ")"
        }
        function te(he, j) {
            return he[0] === j[0] && he[1] === j[1]
        }
        function oe(he, j) {
            var se = he[0]
              , ue = he[1]
              , _e = j[0]
              , Xe = j[1];
            return Math.abs(se - _e) <= n.EPSILON * Math.max(1, Math.abs(se), Math.abs(_e)) && Math.abs(ue - Xe) <= n.EPSILON * Math.max(1, Math.abs(ue), Math.abs(Xe))
        }
        a.len = H,
        a.sub = _,
        a.mul = T,
        a.div = C,
        a.dist = Y,
        a.sqrDist = Z,
        a.sqrLen = J,
        a.forEach = function() {
            var he = d();
            return function(j, se, ue, _e, Xe, pe) {
                var ye, ce;
                for (se || (se = 2),
                ue || (ue = 0),
                _e ? ce = Math.min(_e * se + ue, j.length) : ce = j.length,
                ye = ue; ye < ce; ye += se)
                    he[0] = j[ye],
                    he[1] = j[ye + 1],
                    Xe(he, he, pe),
                    j[ye] = he[0],
                    j[ye + 1] = he[1];
                return j
            }
        }()
    }
})
  , require_cjs = __commonJS({
    "src/utils/vcode-gltf-standalone/node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/index.js"(a) {
        function e(K) {
            "@babel/helpers - typeof";
            return e = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(I) {
                return typeof I
            }
            : function(I) {
                return I && typeof Symbol == "function" && I.constructor === Symbol && I !== Symbol.prototype ? "symbol" : typeof I
            }
            ,
            e(K)
        }
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.vec4 = a.vec3 = a.vec2 = a.quat2 = a.quat = a.mat4 = a.mat3 = a.mat2d = a.mat2 = a.glMatrix = void 0;
        var n = C(require_common());
        a.glMatrix = n;
        var c = C(require_mat2());
        a.mat2 = c;
        var d = C(require_mat2d());
        a.mat2d = d;
        var l = C(require_mat3());
        a.mat3 = l;
        var u = C(require_mat4());
        a.mat4 = u;
        var m = C(require_quat());
        a.quat = m;
        var b = C(require_quat2());
        a.quat2 = b;
        var v = C(require_vec2());
        a.vec2 = v;
        var _ = C(require_vec3());
        a.vec3 = _;
        var T = C(require_vec4());
        a.vec4 = T;
        function C(K, I) {
            if (typeof WeakMap == "function")
                var O = new WeakMap
                  , q = new WeakMap;
            return (C = function(V, $) {
                if (!$ && V && V.__esModule)
                    return V;
                var Y, Z, H = {
                    __proto__: null,
                    default: V
                };
                if (V === null || e(V) != "object" && typeof V != "function")
                    return H;
                if (Y = $ ? q : O) {
                    if (Y.has(V))
                        return Y.get(V);
                    Y.set(V, H)
                }
                for (var J in V)
                    J !== "default" && {}.hasOwnProperty.call(V, J) && ((Z = (Y = Object.defineProperty) && Object.getOwnPropertyDescriptor(V, J)) && (Z.get || Z.set) ? Y(H, J, Z) : H[J] = V[J]);
                return H
            }
            )(K, I)
        }
    }
})
  , require_void = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/void.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuVoid = void 0;
        var e = class {
            constructor() {
                this.identity = void 0,
                this.muType = "void",
                this.json = {
                    type: "void"
                }
            }
            alloc() {}
            free(n) {}
            equal(n, c) {
                return !0
            }
            clone(n) {}
            assign(n, c) {}
            diff(n, c, d) {
                return !1
            }
            patch(n, c) {}
            toJSON(n) {
                return null
            }
            fromJSON(n) {}
        }
        ;
        a.MuVoid = e
    }
})
  , require_boolean = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/boolean.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuBoolean = void 0;
        var e = class {
            constructor(n) {
                this.muType = "boolean",
                this.identity = !!n,
                this.json = {
                    type: "boolean",
                    identity: this.identity
                }
            }
            alloc() {
                return this.identity
            }
            free(n) {}
            equal(n, c) {
                return n === c
            }
            clone(n) {
                return n
            }
            assign(n, c) {
                return c
            }
            diff(n, c, d) {
                return n !== c ? (d.grow(1),
                d.writeUint8(c ? 1 : 0),
                !0) : !1
            }
            patch(n, c) {
                const d = c.readUint8();
                if (d > 1)
                    throw new Error("invalid value for boolean");
                return !!d
            }
            toJSON(n) {
                return n
            }
            fromJSON(n) {
                return typeof n == "boolean" ? n : this.identity
            }
        }
        ;
        a.MuBoolean = e
    }
})
  , require_string = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/_string.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuString = void 0;
        var e = class {
            constructor(n, c) {
                this.identity = n,
                this.muType = c,
                this.json = {
                    type: c,
                    identity: n
                }
            }
            alloc() {
                return this.identity
            }
            free(n) {}
            equal(n, c) {
                return n === c
            }
            clone(n) {
                return n
            }
            assign(n, c) {
                return c
            }
            toJSON(n) {
                return n
            }
            fromJSON(n) {
                return typeof n == "string" ? n : this.identity
            }
        }
        ;
        a.MuString = e
    }
})
  , require_ascii = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/ascii.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuASCII = void 0;
        var e = require_string()
          , n = class extends e.MuString {
            constructor(c) {
                super(c || "", "ascii")
            }
            diff(c, d, l) {
                return c !== d ? (l.grow(5 + d.length),
                l.writeVarint(d.length),
                l.writeASCII(d),
                !0) : !1
            }
            patch(c, d) {
                return d.readASCII(d.readVarint())
            }
        }
        ;
        a.MuASCII = n
    }
})
  , require_fixed_ascii = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/fixed-ascii.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuFixedASCII = void 0;
        var e = require_string()
          , n = class extends e.MuString {
            constructor(c) {
                const d = typeof c == "number" ? new Array(c + 1).join(" ") : c;
                super(d, "fixed-ascii"),
                this.length = d.length
            }
            diff(c, d, l) {
                return c !== d ? (l.grow(this.length),
                l.writeASCII(d),
                !0) : !1
            }
            patch(c, d) {
                return d.readASCII(this.length)
            }
        }
        ;
        a.MuFixedASCII = n
    }
})
  , require_utf8 = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/utf8.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuUTF8 = void 0;
        var e = require_string()
          , n = class extends e.MuString {
            constructor(c) {
                super(c || "", "utf8")
            }
            diff(c, d, l) {
                return c !== d ? (l.writeString(d),
                !0) : !1
            }
            patch(c, d) {
                return d.readString()
            }
        }
        ;
        a.MuUTF8 = n
    }
})
  , require_number = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/_number.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuNumber = a.ranges = void 0;
        function e(...c) {
            return c
        }
        a.ranges = {
            float32: e(-34028234663852886e22, 34028234663852886e22),
            float64: e(-17976931348623157e292, 17976931348623157e292),
            int8: e(-128, 127),
            int16: e(-32768, 32767),
            int32: e(-2147483648, 2147483647),
            uint8: e(0, 255),
            uint16: e(0, 65535),
            uint32: e(0, 4294967295),
            varint: e(0, 4294967295),
            rvarint: e(0, 4294967295)
        };
        var n = class {
            constructor(c, d) {
                const l = c === c ? c || 0 : NaN
                  , u = a.ranges[d];
                if (l !== 1 / 0 && l !== -1 / 0 && l === l) {
                    if (l < u[0] || l > u[1])
                        throw new RangeError(`${l} is out of range of ${d}`)
                } else if (d !== "float32" && d !== "float64")
                    throw new RangeError(`${l} is out of range of ${d}`);
                this.identity = l,
                this.muType = d,
                this.json = {
                    type: d,
                    identity: l
                }
            }
            alloc() {
                return this.identity
            }
            free(c) {}
            equal(c, d) {
                return c === d
            }
            clone(c) {
                return c
            }
            assign(c, d) {
                return d
            }
            toJSON(c) {
                return c
            }
            fromJSON(c) {
                return typeof c == "number" ? c : this.identity
            }
        }
        ;
        a.MuNumber = n
    }
})
  , require_float32 = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/float32.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuFloat32 = void 0;
        var e = require_number()
          , n = class extends e.MuNumber {
            constructor(c) {
                super(c, "float32")
            }
            diff(c, d, l) {
                return c !== d ? (l.grow(4),
                l.writeFloat32(d),
                !0) : !1
            }
            patch(c, d) {
                return d.readFloat32()
            }
        }
        ;
        a.MuFloat32 = n
    }
})
  , require_float64 = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/float64.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuFloat64 = void 0;
        var e = require_number()
          , n = class extends e.MuNumber {
            constructor(c) {
                super(c, "float64")
            }
            diff(c, d, l) {
                return c !== d ? (l.grow(8),
                l.writeFloat64(d),
                !0) : !1
            }
            patch(c, d) {
                return d.readFloat64()
            }
        }
        ;
        a.MuFloat64 = n
    }
})
  , require_int8 = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/int8.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuInt8 = void 0;
        var e = require_number()
          , n = class extends e.MuNumber {
            constructor(c) {
                super(c, "int8")
            }
            diff(c, d, l) {
                return c !== d ? (l.grow(1),
                l.writeInt8(d),
                !0) : !1
            }
            patch(c, d) {
                return d.readInt8()
            }
        }
        ;
        a.MuInt8 = n
    }
})
  , require_int16 = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/int16.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuInt16 = void 0;
        var e = require_number()
          , n = class extends e.MuNumber {
            constructor(c) {
                super(c, "int16")
            }
            diff(c, d, l) {
                return c !== d ? (l.grow(2),
                l.writeInt16(d),
                !0) : !1
            }
            patch(c, d) {
                return d.readInt16()
            }
        }
        ;
        a.MuInt16 = n
    }
})
  , require_int32 = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/int32.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuInt32 = void 0;
        var e = require_number()
          , n = class extends e.MuNumber {
            constructor(c) {
                super(c, "int32")
            }
            diff(c, d, l) {
                return c !== d ? (l.grow(4),
                l.writeInt32(d),
                !0) : !1
            }
            patch(c, d) {
                return d.readInt32()
            }
        }
        ;
        a.MuInt32 = n
    }
})
  , require_uint8 = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/uint8.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuUint8 = void 0;
        var e = require_number()
          , n = class extends e.MuNumber {
            constructor(c) {
                super(c, "uint8")
            }
            diff(c, d, l) {
                return c !== d ? (l.grow(1),
                l.writeUint8(d),
                !0) : !1
            }
            patch(c, d) {
                return d.readUint8()
            }
        }
        ;
        a.MuUint8 = n
    }
})
  , require_uint16 = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/uint16.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuUint16 = void 0;
        var e = require_number()
          , n = class extends e.MuNumber {
            constructor(c) {
                super(c, "uint16")
            }
            diff(c, d, l) {
                return c !== d ? (l.grow(2),
                l.writeUint16(d),
                !0) : !1
            }
            patch(c, d) {
                return d.readUint16()
            }
        }
        ;
        a.MuUint16 = n
    }
})
  , require_uint32 = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/uint32.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuUint32 = void 0;
        var e = require_number()
          , n = class extends e.MuNumber {
            constructor(c) {
                super(c, "uint32")
            }
            diff(c, d, l) {
                return c !== d ? (l.grow(4),
                l.writeUint32(d),
                !0) : !1
            }
            patch(c, d) {
                return d.readUint32()
            }
        }
        ;
        a.MuUint32 = n
    }
})
  , require_varint = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/varint.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuVarint = void 0;
        var e = require_number()
          , n = class extends e.MuNumber {
            constructor(c) {
                super(c, "varint")
            }
            diff(c, d, l) {
                return c !== d ? (l.grow(5),
                l.writeVarint(d),
                !0) : !1
            }
            patch(c, d) {
                return d.readVarint()
            }
        }
        ;
        a.MuVarint = n
    }
})
  , require_rvarint = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/rvarint.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuRelativeVarint = void 0;
        var e = require_number()
          , n = 2863311530
          , c = class extends e.MuNumber {
            constructor(d) {
                super(d, "rvarint")
            }
            diff(d, l, u) {
                return d !== l ? (u.grow(5),
                u.writeVarint(n + (l - d) ^ n),
                !0) : !1
            }
            patch(d, l) {
                const u = (n ^ l.readVarint()) - n >> 0;
                return d + u
            }
        }
        ;
        a.MuRelativeVarint = c
    }
})
  , require_quantized_float = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/quantized-float.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuQuantizedFloat = void 0;
        var e = 2863311530;
        function n(d) {
            const l = d.readVarint();
            return (e ^ l) - e >> 0
        }
        var c = class {
            constructor(d, l) {
                this.precision = d,
                this.invPrecision = 1,
                this.identity = 0,
                this.muData = {
                    type: "quantized-float",
                    precision: 0,
                    identity: 0
                },
                this.muType = "quantized-float",
                this.invPrecision = 1 / this.precision,
                l && (this.identity = this.precision * (this.invPrecision * l >> 0)),
                this.json = this.muData = {
                    type: "quantized-float",
                    precision: this.precision,
                    identity: this.identity
                }
            }
            assign(d, l) {
                return (this.invPrecision * l >> 0) * this.precision
            }
            clone(d) {
                return (this.invPrecision * d >> 0) * this.precision
            }
            alloc() {
                return this.identity
            }
            free() {}
            toJSON(d) {
                return this.precision * (this.invPrecision * d >> 0)
            }
            fromJSON(d) {
                return typeof d == "number" ? this.clone(d) : this.identity
            }
            equal(d, l) {
                const u = this.invPrecision;
                return u * d >> 0 === u * l >> 0
            }
            diff(d, l, u) {
                const m = this.invPrecision
                  , b = m * d >> 0
                  , v = m * l >> 0;
                return b === v ? !1 : (u.grow(5),
                u.writeVarint((e + (v - b) ^ e) >>> 0),
                !0)
            }
            patch(d, l) {
                const u = this.invPrecision * d >> 0
                  , m = n(l);
                return (u + m) * this.precision
            }
        }
        ;
        a.MuQuantizedFloat = c
    }
})
  , require_is_primitive = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/is-primitive.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.isMuPrimitiveType = n;
        var e = ["ascii", "boolean", "fixed-ascii", "float32", "float64", "int8", "int16", "int32", "uint8", "uint16", "uint32", "utf8", "void"];
        function n(c) {
            return e.indexOf(c) > -1
        }
    }
})
  , require_array = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/array.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuArray = void 0;
        var e = require_is_primitive();
        function n(C, K) {
            const I = K.length
              , O = C.length
              , q = Math.min(O, I);
            for (let k = 0; k < q; ++k)
                C[k] = K[k];
            for (let k = O; k < I; ++k)
                C.push(K[k]);
            return C.length = I,
            C
        }
        function c(C) {
            return this.allocCount += 1,
            C.slice()
        }
        function d(C, K) {
            const I = C.length
              , O = K.length;
            if (I !== O)
                return !1;
            for (let q = 0; q < I; ++q)
                if (C[q] !== K[q])
                    return !1;
            return !0
        }
        function l(C) {
            return C.slice()
        }
        function u(C) {
            return function(K, I) {
                const O = I.length
                  , q = K.length
                  , k = Math.min(q, O);
                for (let V = 0; V < k; ++V)
                    K[V] = C.assign(K[V], I[V]);
                for (let V = q; V < O; ++V)
                    K.push(C.clone(I[V]));
                for (let V = O; V < q; ++V)
                    C.free(K[V]);
                return K.length = O,
                K
            }
        }
        function m(C) {
            return function(K) {
                this.allocCount += 1;
                const I = K.slice();
                for (let O = 0; O < I.length; ++O)
                    I[O] = C.clone(I[O]);
                return I
            }
        }
        function b(C) {
            return function(K) {
                this.freeCount += 1;
                for (let I = 0; I < K.length; ++I)
                    C.free(K[I]);
                K.length = 0
            }
        }
        function v(C) {
            return function(K, I) {
                const O = K.length
                  , q = I.length;
                if (O !== q)
                    return !1;
                for (let k = 0; k < O; ++k)
                    if (!C.equal(K[k], I[k]))
                        return !1;
                return !0
            }
        }
        function _(C) {
            return function(K) {
                const I = new Array(K.length);
                for (let O = 0; O < K.length; ++O)
                    I[O] = C.toJSON(K[O]);
                return I
            }
        }
        var T = class {
            stats() {
                return {
                    allocCount: this.allocCount,
                    freeCount: this.freeCount,
                    poolSize: 0
                }
            }
            constructor(C, K, I) {
                if (this.muType = "array",
                this.allocCount = 0,
                this.freeCount = 0,
                this.muData = C,
                this.capacity = K,
                I) {
                    const O = this.identity = I.slice();
                    for (let q = 0; q < O.length; ++q)
                        O[q] = C.clone(O[q])
                } else
                    this.identity = [];
                this.json = {
                    type: "array",
                    valueType: C.json,
                    identity: JSON.stringify(this.identity)
                },
                (0,
                e.isMuPrimitiveType)(C.muType) ? (this.assign = n,
                this.clone = c,
                this.free = function(O) {
                    this.freeCount += 1,
                    O.length = 0
                }
                ,
                this.equal = d,
                this.toJSON = l) : (this.assign = u(C),
                this.clone = m(C),
                this.free = b(C),
                this.equal = v(C),
                this.toJSON = _(C))
            }
            alloc() {
                return this.allocCount += 1,
                []
            }
            diff(C, K, I) {
                const O = K.length
                  , q = Math.ceil(O / 8);
                I.grow(4 + q);
                const k = I.offset;
                I.writeVarint(O);
                let V = I.offset;
                I.offset += q;
                let $ = 0
                  , Y = 0;
                const Z = C.length
                  , H = this.muData;
                for (let J = 0; J < Math.min(Z, O); ++J)
                    H.diff(C[J], K[J], I) && ($ |= 1 << (J & 7),
                    ++Y),
                    (J & 7) === 7 && (I.writeUint8At(V++, $),
                    $ = 0);
                for (let J = Z; J < O; ++J)
                    H.diff(H.identity, K[J], I) && ($ |= 1 << (J & 7),
                    ++Y),
                    (J & 7) === 7 && (I.writeUint8At(V++, $),
                    $ = 0);
                return O & 7 && I.writeUint8At(V, $),
                Y > 0 || Z !== O ? !0 : (I.offset = k,
                !1)
            }
            patch(C, K) {
                const I = K.readVarint();
                if (I > this.capacity)
                    throw new RangeError(`target length ${I} exceeds capacity ${this.capacity}`);
                const O = C.length
                  , q = Math.min(O, I)
                  , k = Math.ceil(I / 8);
                let V = K.offset;
                K.offset += k,
                this.allocCount += 1;
                const $ = C.slice()
                  , Y = this.muData;
                $.length = q;
                let Z = 0;
                for (let H = 0; H < q; ++H) {
                    const J = H & 7;
                    J || (Z = K.readUint8At(V++)),
                    1 << J & Z ? $[H] = Y.patch(C[H], K) : $[H] = Y.clone(C[H])
                }
                for (let H = O; H < I; ++H) {
                    const J = H & 7;
                    J || (Z = K.readUint8At(V++)),
                    1 << J & Z ? $.push(Y.patch(Y.identity, K)) : $.push(Y.clone(Y.identity))
                }
                return $
            }
            fromJSON(C) {
                if (Array.isArray(C)) {
                    const K = new Array(C.length)
                      , I = this.muData;
                    for (let O = 0; O < C.length; ++O)
                        K[O] = I.fromJSON(C[O]);
                    return this.allocCount += 1,
                    K
                }
                return this.clone(this.identity)
            }
        }
        ;
        a.MuArray = T
    }
})
  , require_option = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/option.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuOption = void 0;
        var e;
        (function(c) {
            c[c.BECAME_UNDEFINED = 0] = "BECAME_UNDEFINED",
            c[c.BECAME_IDENTITY = 1] = "BECAME_IDENTITY",
            c[c.BECAME_DEFINED = 2] = "BECAME_DEFINED",
            c[c.STAYED_DEFINED = 3] = "STAYED_DEFINED"
        }
        )(e || (e = {}));
        var n = class {
            constructor(c, d, l=!1) {
                this.muType = "option",
                this.muData = c,
                l ? this.identity = void 0 : this.identity = d !== void 0 ? c.clone(d) : c.clone(c.identity),
                this.json = {
                    type: "option",
                    valueType: c.json,
                    identity: JSON.stringify(this.identity)
                }
            }
            alloc() {
                return this.muData.alloc()
            }
            free(c) {
                c !== void 0 && this.muData.free(c)
            }
            equal(c, d) {
                return c === void 0 && d === void 0 ? !0 : c !== void 0 && d === void 0 || c === void 0 && d !== void 0 ? !1 : this.muData.equal(c, d)
            }
            clone(c) {
                if (c !== void 0)
                    return this.muData.clone(c)
            }
            assign(c, d) {
                return c !== void 0 && d !== void 0 ? this.muData.assign(c, d) : d
            }
            diff(c, d, l) {
                return c === void 0 && d === void 0 ? !1 : c === void 0 && d !== void 0 ? (l.grow(1),
                this.muData.equal(this.muData.identity, d) ? (l.writeUint8(e.BECAME_IDENTITY),
                !0) : (l.writeUint8(e.BECAME_DEFINED),
                this.muData.diff(this.muData.identity, d, l),
                !0)) : c !== void 0 && d === void 0 ? (l.grow(1),
                l.writeUint8(e.BECAME_UNDEFINED),
                !0) : this.muData.equal(c, d) ? !1 : (l.grow(1),
                l.writeUint8(e.STAYED_DEFINED),
                this.muData.diff(c, d, l),
                !0)
            }
            patch(c, d) {
                const l = d.readUint8();
                if (e[l] === void 0)
                    throw new Error("Panic in muOption, invalid TypeDiff");
                if (l != e.BECAME_UNDEFINED) {
                    if (l == e.BECAME_DEFINED)
                        return this.muData.patch(this.muData.identity, d);
                    if (l === e.BECAME_IDENTITY)
                        return this.muData.clone(this.muData.identity);
                    if (l !== e.STAYED_DEFINED || c === void 0)
                        throw new Error("Panic in muOption, invariants broken");
                    return this.muData.patch(c, d)
                }
            }
            toJSON(c) {
                if (c !== void 0)
                    return this.muData.toJSON(c)
            }
            fromJSON(c) {
                if (c !== void 0)
                    return this.muData.fromJSON(c)
            }
        }
        ;
        a.MuOption = n
    }
})
  , require_sorted_array = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/sorted-array.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuSortedArray = void 0;
        var e = require_array();
        function n(l, u) {
            return l < u ? -1 : l > u ? 1 : 0
        }
        var c;
        (function(l) {
            l[l.NONE = -1] = "NONE",
            l[l.SKIP = 0] = "SKIP",
            l[l.PATCH = 1] = "PATCH",
            l[l.INSERT = 2] = "INSERT",
            l[l.INSERT_IDENTITY = 3] = "INSERT_IDENTITY",
            l[l.COPY = 4] = "COPY"
        }
        )(c || (c = {}));
        var d = class {
            stats() {
                return this._arraySchema.stats()
            }
            constructor(l, u, m, b) {
                this.muType = "sorted-array",
                this.muData = l,
                this.capacity = u,
                this.compare = m || n;
                const v = this._arraySchema = new e.MuArray(l,u,b);
                this.identity = v.identity.sort(this.compare),
                this.json = {
                    type: "sorted-array",
                    valueType: l.json,
                    identity: JSON.stringify(this.identity)
                },
                this.alloc = v.alloc,
                this.free = v.free,
                this.equal = v.equal,
                this.clone = v.clone,
                this.assign = v.assign,
                this.toJSON = v.toJSON,
                this.fromJSON = v.fromJSON
            }
            diff(l, u, m) {
                if (l.length === 0 && u.length === 0)
                    return !1;
                const b = this.muData
                  , v = this.compare;
                m.grow(8);
                const _ = m.offset;
                let T = _
                  , C = 0
                  , K = c.NONE;
                m.offset += 4;
                let I = 0;
                function O() {
                    C > 0 && (m.writeUint32At(T, C << 3 | K),
                    I++),
                    m.grow(4),
                    T = m.offset,
                    m.offset += 4
                }
                let q = 0
                  , k = 0;
                for (; q < l.length && k < u.length; ) {
                    const V = l[q]
                      , $ = u[k]
                      , Y = v(V, $);
                    if (Y < 0)
                        K !== c.SKIP ? (O(),
                        C = 1,
                        K = c.SKIP) : C++,
                        q++;
                    else if (0 < Y) {
                        if (K === c.INSERT)
                            b.diff(b.identity, $, m) ? C++ : (O(),
                            K = c.INSERT_IDENTITY,
                            C = 1);
                        else if (K === c.INSERT_IDENTITY) {
                            const Z = m.offset;
                            m.grow(4),
                            m.offset += 4,
                            b.diff(b.identity, $, m) ? (O(),
                            m.offset -= 4,
                            T = Z,
                            K = c.INSERT,
                            C = 1) : (m.offset -= 4,
                            C += 1)
                        } else
                            O(),
                            C = 1,
                            b.diff(b.identity, $, m) ? K = c.INSERT : K = c.INSERT_IDENTITY;
                        k++
                    } else {
                        if (K === c.PATCH)
                            b.diff(V, $, m) ? C++ : (O(),
                            K = c.COPY,
                            C = 1);
                        else if (K === c.COPY) {
                            const Z = m.offset;
                            m.grow(4),
                            m.offset += 4,
                            b.diff(V, $, m) ? (O(),
                            m.offset -= 4,
                            T = Z,
                            K = c.PATCH,
                            C = 1) : (m.offset -= 4,
                            C += 1)
                        } else
                            O(),
                            C = 1,
                            b.diff(V, $, m) ? K = c.PATCH : K = c.COPY;
                        q++,
                        k++
                    }
                }
                for (q < l.length && (K !== c.SKIP ? (O(),
                C = l.length - q,
                K = c.SKIP) : C += l.length - q,
                q++); k < u.length; ) {
                    const V = u[k];
                    if (K === c.INSERT)
                        b.diff(b.identity, V, m) ? C++ : (O(),
                        K = c.INSERT_IDENTITY,
                        C = 1);
                    else if (K === c.INSERT_IDENTITY) {
                        const $ = m.offset;
                        m.grow(4),
                        m.offset += 4,
                        b.diff(b.identity, V, m) ? (O(),
                        m.offset -= 4,
                        T = $,
                        K = c.INSERT,
                        C = 1) : (m.offset -= 4,
                        C += 1)
                    } else
                        O(),
                        C = 1,
                        b.diff(b.identity, V, m) ? K = c.INSERT : K = c.INSERT_IDENTITY;
                    k++
                }
                return I === 0 && K === c.COPY && C === l.length ? (m.offset = _,
                !1) : (K !== c.SKIP && O(),
                m.offset -= 4,
                m.writeUint32At(_, I),
                !0)
            }
            patch(l, u) {
                this._arraySchema.allocCount += 1;
                const m = this.muData
                  , b = this.alloc()
                  , v = u.readUint32();
                let _ = 0
                  , T = 0;
                for (let C = 0; C < v; ++C) {
                    const K = u.readUint32()
                      , I = K >> 3;
                    if (T += I,
                    T > this.capacity)
                        throw new RangeError(`target length exceeds capacity ${this.capacity}`);
                    switch (K & 7) {
                    case c.INSERT_IDENTITY:
                        for (let q = 0; q < I; ++q)
                            b.push(m.clone(m.identity));
                        break;
                    case c.INSERT:
                        for (let q = 0; q < I; ++q)
                            b.push(m.patch(m.identity, u));
                        break;
                    case c.PATCH:
                        for (let q = 0; q < I; ++q)
                            b.push(m.patch(l[_++], u));
                        break;
                    case c.COPY:
                        for (let q = 0; q < I; ++q)
                            b.push(m.clone(l[_++]));
                        break;
                    case c.SKIP:
                        _ += I;
                        break
                    }
                }
                return b
            }
        }
        ;
        a.MuSortedArray = d
    }
})
  , require_struct = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/struct.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuStruct = void 0;
        var e = {
            boolean: 0,
            uint8: 1,
            uint16: 2,
            uint32: 4,
            int8: 1,
            int16: 2,
            int32: 4,
            float32: 4,
            float64: 8,
            varint: 5,
            rvarint: 5,
            "quantized-float": 5
        }
          , n = {
            boolean: "readUint8",
            float32: "readFloat32",
            float64: "readFloat64",
            int8: "readInt8",
            int16: "readInt16",
            int32: "readInt32",
            uint8: "readUint8",
            uint16: "readUint16",
            uint32: "readUint32",
            utf8: "readString",
            varint: "readVarint"
        }
          , c = {
            boolean: "writeUint8",
            float32: "writeFloat32",
            float64: "writeFloat64",
            int8: "writeInt8",
            int16: "writeInt16",
            int32: "writeInt32",
            uint8: "writeUint8",
            uint16: "writeUint16",
            uint32: "writeUint32",
            utf8: "writeString",
            varint: "writeVarint"
        }
          , d = Object.keys(e)
          , l = class {
            constructor(u) {
                this.muType = "struct";
                const m = Object.keys(u).sort( (R, D) => {
                    const F = d.indexOf(u[R].muType);
                    return d.indexOf(u[D].muType) - F || (R < D ? -1 : D < R ? 1 : 0)
                }
                )
                  , b = m.map(R => u[R])
                  , v = {
                    type: "struct",
                    subTypes: {}
                };
                m.forEach(R => {
                    v.subTypes[R] = u[R].json
                }
                );
                const _ = []
                  , T = [];
                let C = 0;
                function K() {
                    return "_v" + ++C
                }
                function I(R) {
                    for (let F = 0; F < T.length; ++F)
                        if (T[F] === R)
                            return _[F];
                    const D = K();
                    return _.push(D),
                    T.push(R),
                    D
                }
                const O = m.map(I)
                  , q = b.map(I);
                function k() {
                    const R = []
                      , D = [];
                    return {
                        vars: R,
                        body: D,
                        toString() {
                            return (R.length > 0 ? `var ${R.join()};` : "") + D.join("")
                        },
                        def(F) {
                            const M = K();
                            return R.push(M),
                            F != null && D.push(`${M}=${F};`),
                            M
                        },
                        append(...F) {
                            D.push.apply(D, F)
                        }
                    }
                }
                const V = k()
                  , $ = k();
                function Y(R, D) {
                    const F = k()
                      , M = F.toString;
                    return F.toString = function() {
                        return `function ${R}(${D.join()}){${M()}}`
                    }
                    ,
                    F
                }
                const Z = {
                    alloc: Y("alloc", []),
                    free: Y("free", ["s"]),
                    equal: Y("equal", ["a", "b"]),
                    clone: Y("clone", ["s"]),
                    assign: Y("assign", ["d", "s"]),
                    diff: Y("diff", ["b", "t", "s"]),
                    patch: Y("patch", ["b", "s"]),
                    toJSON: Y("toJSON", ["s"]),
                    fromJSON: Y("fromJSON", ["j"]),
                    stats: Y("stats", [])
                }
                  , H = V.def("-1")
                  , J = V.def("0")
                  , ae = V.def("[]");
                V.append("function MuStruct(){"),
                O.forEach( (R, D) => {
                    const F = b[D];
                    switch (F.muType) {
                    case "boolean":
                    case "int8":
                    case "int16":
                    case "int32":
                    case "uint8":
                    case "uint16":
                    case "uint32":
                    case "varint":
                    case "rvarint":
                        V.append(`this[${R}]=${F.identity};`);
                        break;
                    case "float32":
                    case "float64":
                    case "quantized-float":
                        V.append(`this[${R}]=0.5;this[${R}]=${F.identity};`);
                        break;
                    case "ascii":
                    case "fixed-ascii":
                    case "utf8":
                        V.append(`this[${R}]=${I(F.identity)};`);
                        break;
                    default:
                        V.append(`this[${R}]=null;`)
                    }
                }
                ),
                V.append(`}function _alloc(){++${H};if(${ae}.length>0){return ${ae}.pop()}return new MuStruct()}`);
                const re = V.def("_alloc()");
                O.forEach( (R, D) => {
                    const F = b[D];
                    switch (F.muType) {
                    case "ascii":
                    case "fixed-ascii":
                    case "utf8":
                    case "boolean":
                    case "float32":
                    case "float64":
                    case "int8":
                    case "int16":
                    case "int32":
                    case "uint8":
                    case "uint16":
                    case "uint32":
                    case "varint":
                    case "rvarint":
                    case "quantized-float":
                        break;
                    default:
                        V.append(`${re}[${R}]=${q[D]}.clone(${I(F.identity)});`);
                        break
                    }
                }
                ),
                Z.alloc.append("var s=_alloc();"),
                O.forEach( (R, D) => {
                    switch (b[D].muType) {
                    case "ascii":
                    case "fixed-ascii":
                    case "utf8":
                    case "boolean":
                    case "float32":
                    case "float64":
                    case "int8":
                    case "int16":
                    case "int32":
                    case "uint8":
                    case "uint16":
                    case "uint32":
                    case "varint":
                    case "rvarint":
                    case "quantized-float":
                        break;
                    default:
                        Z.alloc.append(`s[${R}]=${q[D]}.alloc();`);
                        break
                    }
                }
                ),
                Z.alloc.append("return s;"),
                Z.free.append(`${ae}.push(s);`),
                O.forEach( (R, D) => {
                    switch (b[D].muType) {
                    case "ascii":
                    case "fixed-ascii":
                    case "utf8":
                    case "boolean":
                    case "float32":
                    case "float64":
                    case "int8":
                    case "int16":
                    case "int32":
                    case "uint8":
                    case "uint16":
                    case "uint32":
                    case "varint":
                    case "rvarint":
                    case "quantized-float":
                        break;
                    default:
                        Z.free.append(`${q[D]}.free(s[${R}]);`);
                        break
                    }
                }
                ),
                Z.free.append(`++${J};`),
                O.forEach( (R, D) => {
                    const F = b[D];
                    switch (F.muType) {
                    case "ascii":
                    case "fixed-ascii":
                    case "utf8":
                    case "boolean":
                    case "float32":
                    case "float64":
                    case "int8":
                    case "int16":
                    case "int32":
                    case "uint8":
                    case "uint16":
                    case "uint32":
                    case "varint":
                    case "rvarint":
                        Z.equal.append(`if(a[${R}]!==b[${R}]){return false}`);
                        break;
                    case "quantized-float":
                        Z.equal.append(`if(((${F.invPrecision}*a[${R}])>>0)!==((${F.invPrecision}*b[${R}])>>0)){return false}`);
                        break;
                    default:
                        Z.equal.append(`if(!${q[D]}.equal(a[${R}],b[${R}])){return false}`)
                    }
                }
                ),
                Z.equal.append("return true;"),
                Z.clone.append("var c=_alloc();"),
                O.forEach( (R, D) => {
                    const F = b[D];
                    switch (F.muType) {
                    case "ascii":
                    case "fixed-ascii":
                    case "utf8":
                    case "boolean":
                    case "float32":
                    case "float64":
                    case "int8":
                    case "int16":
                    case "int32":
                    case "uint8":
                    case "uint16":
                    case "uint32":
                    case "varint":
                    case "rvarint":
                        Z.clone.append(`c[${R}]=s[${R}];`);
                        break;
                    case "quantized-float":
                        Z.clone.append(`c[${R}]=((${F.invPrecision}*s[${R}])>>0)*${F.precision};`);
                        break;
                    default:
                        Z.clone.append(`c[${R}]=${q[D]}.clone(s[${R}]);`);
                        break
                    }
                }
                ),
                Z.clone.append("return c;"),
                O.forEach( (R, D) => {
                    const F = b[D];
                    switch (F.muType) {
                    case "ascii":
                    case "fixed-ascii":
                    case "utf8":
                    case "boolean":
                    case "float32":
                    case "float64":
                    case "int8":
                    case "int16":
                    case "int32":
                    case "uint8":
                    case "uint16":
                    case "uint32":
                    case "varint":
                    case "rvarint":
                        Z.assign.append(`d[${R}]=s[${R}];`);
                        break;
                    case "quantized-float":
                        Z.assign.append(`d[${R}]=((${F.invPrecision}*s[${R}])>>0)*${F.precision};`);
                        break;
                    default:
                        Z.assign.append(`d[${R}]=${q[D]}.assign(d[${R}],s[${R}]);`)
                    }
                }
                ),
                Z.assign.append("return d;");
                const z = m.length
                  , B = Math.ceil(z / 8);
                let f = B;
                for (let R = 0; R < b.length; ++R) {
                    const D = b[R].muType;
                    D in e && (f += e[D])
                }
                Z.diff.append(`var head=s.offset;var tr=0;var np=0;s.grow(${f});s.offset+=${B};`),
                O.forEach( (R, D) => {
                    const F = b[D].muType;
                    switch (F) {
                    case "boolean":
                        Z.diff.append(`if(b[${R}]!==t[${R}]){++np;tr|=${1 << (D & 7)}}`);
                        break;
                    case "float32":
                    case "float64":
                    case "int8":
                    case "int16":
                    case "int32":
                    case "uint8":
                    case "uint16":
                    case "uint32":
                    case "varint":
                    case "utf8":
                        Z.diff.append(`if(b[${R}]!==t[${R}]){s.${c[F]}(t[${R}]);++np;tr|=${1 << (D & 7)}}`);
                        break;
                    case "rvarint":
                        Z.diff.append(`if(b[${R}]!==t[${R}]){s.writeVarint(0xAAAAAAAA+(t[${R}]-b[${R}])^0xAAAAAAAA);++np;tr|=${1 << (D & 7)}}`);
                        break;
                    case "ascii":
                        Z.diff.append(`if(b[${R}]!==t[${R}]){s.grow(5+t[${R}].length);s.writeVarint(t[${R}].length);s.writeASCII(t[${R}]);++np;tr|=${1 << (D & 7)}}`);
                        break;
                    case "quantized-float":
                        const M = Z.diff.def(`(${b[D].invPrecision}*b[${R}])>>0`)
                          , E = Z.diff.def(`(${b[D].invPrecision}*t[${R}])>>0`);
                        Z.diff.append(`if(${M}!==${E}){s.writeVarint((0xAAAAAAAA+(${E}-${M})^0xAAAAAAAA)>>>0);++np;tr|=${1 << (D & 7)};}`);
                        break;
                    default:
                        Z.diff.append(`if(${q[D]}.diff(b[${R}],t[${R}],s)){++np;tr|=${1 << (D & 7)}}`)
                    }
                    (D & 7) === 7 && Z.diff.append(`s.writeUint8At(head+${D >> 3},tr);tr=0;`)
                }
                ),
                z & 7 && Z.diff.append(`s.writeUint8At(head+${B - 1},tr);`),
                Z.diff.append("if(np){return true}else{s.offset=head;return false}"),
                Z.patch.append(`var t=_alloc(b);var head=s.offset;var tr=0;s.offset+=${B};`),
                O.forEach( (R, D) => {
                    D & 7 || Z.patch.append(`tr=s.readUint8At(head+${D >> 3});`);
                    const F = b[D]
                      , M = F.muType;
                    switch (Z.patch.append(`;t[${R}]=(tr&${1 << (D & 7)})?`),
                    M) {
                    case "boolean":
                        Z.patch.append(`!b[${R}]:b[${R}];`);
                        break;
                    case "float32":
                    case "float64":
                    case "int8":
                    case "int16":
                    case "int32":
                    case "uint8":
                    case "uint16":
                    case "uint32":
                    case "utf8":
                    case "varint":
                        Z.patch.append(`s.${n[M]}():b[${R}];`);
                        break;
                    case "rvarint":
                        Z.patch.append(`b[${R}]+((0xAAAAAAAA^s.readVarint())-0xAAAAAAAA>>0):b[${R}];`);
                        break;
                    case "ascii":
                        Z.patch.append(`s.readASCII(s.readVarint()):b[${R}];`);
                        break;
                    case "quantized-float":
                        Z.patch.append(`(((${F.invPrecision}*b[${R}])>>0)+(((0xAAAAAAAA^s.readVarint())-0xAAAAAAAA)>>0))*${F.precision}:b[${R}];`);
                        break;
                    default:
                        Z.patch.append(`${q[D]}.patch(b[${R}],s):${q[D]}.clone(b[${R}]);`)
                    }
                }
                ),
                Z.patch.append("return t;"),
                Z.toJSON.append("var j={};"),
                O.forEach( (R, D) => {
                    Z.toJSON.append(`j[${R}]=${q[D]}.toJSON(s[${R}]);`)
                }
                ),
                Z.toJSON.append("return j;"),
                Z.fromJSON.append("var s=_alloc();"),
                Z.fromJSON.append("if(Object.prototype.toString.call(j)==='[object Object]'){"),
                O.forEach( (R, D) => {
                    Z.fromJSON.append(`s[${R}]=${q[D]}.fromJSON(j[${R}]);`)
                }
                ),
                Z.fromJSON.append("}"),
                Z.fromJSON.append("return s;"),
                Z.stats.append(`return {allocCount:${H},freeCount:${J},poolSize:${ae}.length};`);
                const y = V.def("{}");
                O.forEach( (R, D) => {
                    V.append(`${y}[${R}]=${q[D]};`)
                }
                ),
                $.append(`return {identity:${re},muData:${y},pool:${ae},`),
                Object.keys(Z).forEach(R => {
                    V.append(Z[R].toString()),
                    $.append(`${R}:${R},`)
                }
                ),
                $.append("}"),
                V.append($.toString()),
                _.push(V.toString());
                const N = Function.apply(null, _).apply(null, T);
                this.json = v,
                this.muData = N.muData,
                this.identity = N.identity,
                this.pool = N.pool,
                this.alloc = N.alloc,
                this.free = N.free,
                this.equal = N.equal,
                this.clone = N.clone,
                this.assign = N.assign,
                this.diff = N.diff,
                this.patch = N.patch,
                this.toJSON = N.toJSON,
                this.fromJSON = N.fromJSON,
                this.stats = N.stats
            }
        }
        ;
        a.MuStruct = l
    }
})
  , require_union = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/union.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuUnion = void 0;
        var e = class {
            constructor(n, c) {
                this.muType = "union",
                this.muData = n,
                this._types = Object.keys(n).sort(),
                c ? this.identity = {
                    type: c,
                    data: n[c].identity
                } : this.identity = {
                    type: "",
                    data: void 0
                };
                const d = {};
                Object.keys(n).forEach(l => {
                    d[l] = n[l].json
                }
                ),
                this.json = {
                    type: "union",
                    identity: this.identity.type,
                    data: d
                }
            }
            alloc() {
                const n = this.identity.type;
                return {
                    type: n,
                    data: n ? this.muData[n].clone(this.identity.data) : void 0
                }
            }
            free(n) {
                const c = this.muData[n.type];
                c && c.free(n.data)
            }
            equal(n, c) {
                return n.type !== c.type ? !1 : n.type === "" ? !0 : this.muData[n.type].equal(n.data, c.data)
            }
            clone(n) {
                const c = n.type;
                return {
                    type: c,
                    data: c ? this.muData[c].clone(n.data) : void 0
                }
            }
            assign(n, c) {
                const d = n.type
                  , l = c.type
                  , u = this.muData;
                return n.type = c.type,
                n.type !== d ? (u[d] && u[d].free(n.data),
                l ? u[l] && (n.data = u[l].clone(c.data)) : n.data = void 0,
                n) : (u[d] && (n.data = u[d].assign(n.data, c.data)),
                n)
            }
            diff(n, c, d) {
                d.grow(8);
                const l = d.offset;
                ++d.offset;
                let u = 0;
                const m = this.muData[c.type];
                return n.type === c.type ? m.diff(n.data, c.data, d) && (u = 1) : (d.writeUint8(this._types.indexOf(c.type)),
                m.diff(m.identity, c.data, d) ? u = 2 : u = 4),
                u ? (d.writeUint8At(l, u),
                !0) : (d.offset = l,
                !1)
            }
            patch(n, c) {
                const d = this.clone(n)
                  , l = c.readUint8();
                if (l === 1)
                    d.data = this.muData[d.type].patch(d.data, c);
                else {
                    d.type = this._types[c.readUint8()];
                    const u = this.muData[d.type];
                    if (l === 2)
                        d.data = u.patch(u.identity, c);
                    else if (l === 4)
                        d.data = u.clone(u.identity);
                    else
                        throw new Error(`invalid opcode ${l}`)
                }
                return d
            }
            toJSON(n) {
                return {
                    type: n.type,
                    data: this.muData[n.type].toJSON(n.data)
                }
            }
            fromJSON(n) {
                if (typeof n == "object" && n) {
                    const c = n.type;
                    if (typeof c == "string" && c in this.muData)
                        return {
                            type: c,
                            data: this.muData[c].fromJSON(n.data)
                        }
                }
                return this.clone(this.identity)
            }
        }
        ;
        a.MuUnion = e
    }
})
  , require_bytes = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/bytes.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuBytes = void 0;
        var e = class {
            constructor(n) {
                this.muType = "bytes",
                this.pool = {},
                n ? this.identity = n.slice() : this.identity = new Uint8Array(1),
                this.json = {
                    type: "bytes",
                    identity: `[${Array.prototype.slice.call(this.identity).join()}]`
                }
            }
            _allocBytes(n) {
                return this.pool[n] && this.pool[n].pop() || new Uint8Array(n)
            }
            alloc() {
                return this._allocBytes(this.identity.length)
            }
            free(n) {
                const c = n.length;
                this.pool[c] || (this.pool[c] = []),
                this.pool[c].push(n)
            }
            equal(n, c) {
                if (n.length !== c.length)
                    return !1;
                for (let d = n.length - 1; d >= 0; --d)
                    if (n[d] !== c[d])
                        return !1;
                return !0
            }
            clone(n) {
                const c = this._allocBytes(n.length);
                return c.set(n),
                c
            }
            assign(n, c) {
                if (n.length !== c.length)
                    throw new Error("dst and src are of different lengths");
                return n.set(c),
                n
            }
            diff(n, c, d) {
                const l = c.length;
                return d.grow(5 + l),
                d.writeVarint(l),
                d.buffer.uint8.set(c, d.offset),
                d.offset += l,
                !0
            }
            patch(n, c) {
                const d = c.readVarint()
                  , l = this._allocBytes(d)
                  , u = c.buffer.uint8.subarray(c.offset, c.offset += d);
                return l.set(u),
                l
            }
            toJSON(n) {
                const c = new Array(n.length);
                for (let d = 0; d < c.length; ++d)
                    c[d] = n[d];
                return c
            }
            fromJSON(n) {
                if (Array.isArray(n)) {
                    const c = this._allocBytes(n.length);
                    return c.set(n),
                    c
                }
                return this.clone(this.identity)
            }
        }
        ;
        a.MuBytes = e
    }
})
  , require_dictionary = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/dictionary.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuDictionary = void 0;
        var e = require_is_primitive();
        function n(l, u) {
            const m = Object.keys(l)
              , b = Object.keys(u);
            for (let v = 0; v < m.length; ++v) {
                const _ = m[v];
                _ in u || delete l[_]
            }
            for (let v = 0; v < b.length; ++v) {
                const _ = b[v];
                l[_] = u[_]
            }
            return l
        }
        function c(l) {
            return (u, m) => {
                const b = Object.keys(u)
                  , v = Object.keys(m);
                for (let _ = 0; _ < b.length; ++_) {
                    const T = b[_];
                    T in m || (l.free(u[T]),
                    delete u[T])
                }
                for (let _ = 0; _ < v.length; ++_) {
                    const T = v[_];
                    T in u ? u[T] = l.assign(u[T], m[T]) : u[T] = l.clone(m[T])
                }
                return u
            }
        }
        var d = class {
            stats() {
                return {
                    allocCount: this.allocCount,
                    freeCount: this.freeCount,
                    poolSize: 0
                }
            }
            constructor(l, u, m) {
                if (this.muType = "dictionary",
                this._isPrimitive = !1,
                this.allocCount = 0,
                this.freeCount = 0,
                this.muData = l,
                this.capacity = u,
                this.identity = {},
                m) {
                    const b = Object.keys(m);
                    for (let v = 0; v < b.length; ++v) {
                        const _ = b[v];
                        this.identity[_] = l.clone(m[_])
                    }
                }
                this.json = {
                    type: "dictionary",
                    valueType: l.json,
                    identity: JSON.stringify(this.identity)
                },
                this._isPrimitive = (0,
                e.isMuPrimitiveType)(l.muType),
                this._isPrimitive ? this.assign = n : this.assign = c(l)
            }
            alloc() {
                return this.allocCount += 1,
                {}
            }
            free(l) {
                if (this.freeCount += 1,
                !this._isPrimitive) {
                    const u = Object.keys(l)
                      , m = this.muData;
                    for (let b = 0; b < u.length; ++b)
                        m.free(l[u[b]])
                }
            }
            equal(l, u) {
                const m = Object.keys(l)
                  , b = Object.keys(u);
                if (m.length !== b.length)
                    return !1;
                for (let _ = m.length - 1; _ >= 0; --_)
                    if (!(m[_]in u))
                        return !1;
                const v = this.muData;
                for (let _ = 0; _ < m.length; ++_) {
                    const T = m[_];
                    if (!v.equal(l[T], u[T]))
                        return !1
                }
                return !0
            }
            clone(l) {
                if (this.allocCount += 1,
                this._isPrimitive)
                    return Object.assign({}, l);
                {
                    const u = {}
                      , m = Object.keys(l)
                      , b = this.muData;
                    for (let v = 0; v < m.length; ++v) {
                        const _ = m[v];
                        u[_] = b.clone(l[_])
                    }
                    return u
                }
            }
            diff(l, u, m) {
                let b = 0
                  , v = 0
                  , _ = 0;
                m.grow(12);
                const T = m.offset;
                m.offset += 12;
                const C = Object.keys(l).sort();
                m.grow(5 * C.length);
                for (let $ = 0; $ < C.length; ++$)
                    C[$]in u || (++b,
                    m.writeVarint($));
                const K = Object.keys(u)
                  , I = this.muData
                  , O = [];
                for (let $ = 0; $ < K.length; ++$) {
                    const Y = K[$];
                    if (Y in l) {
                        const Z = m.offset;
                        m.grow(5),
                        m.writeVarint(C.indexOf(Y)),
                        I.diff(l[Y], u[Y], m) ? ++v : m.offset = Z
                    } else
                        O.push(Y)
                }
                _ = O.length;
                const q = Math.ceil(_ / 8);
                m.grow(q);
                let k = m.offset;
                m.offset += q;
                let V = 0;
                for (let $ = 0; $ < _; ++$) {
                    const Y = O[$];
                    m.writeString(Y),
                    I.diff(I.identity, u[Y], m) && (V |= 1 << ($ & 7)),
                    ($ & 7) === 7 && (m.writeUint8At(k++, V),
                    V = 0)
                }
                return _ & 7 && m.writeUint8At(k, V),
                b > 0 || v > 0 || _ > 0 ? (m.writeUint32At(T, b),
                m.writeUint32At(T + 4, v),
                m.writeUint32At(T + 8, _),
                !0) : (m.offset = T,
                !1)
            }
            patch(l, u) {
                const m = u.readUint32()
                  , b = u.readUint32()
                  , v = u.readUint32()
                  , _ = Object.keys(l).sort()
                  , T = _.length - m + v;
                if (T > this.capacity)
                    throw new Error(`number of target props ${T} exceeds capacity ${this.capacity}`);
                const C = {}
                  , K = this.muData
                  , I = {};
                for (let V = 0; V < m; ++V)
                    I[_[u.readVarint()]] = !0;
                for (let V = 0; V < _.length; ++V) {
                    const $ = _[V];
                    I[$] || (C[$] = K.clone(l[$]))
                }
                for (let V = 0; V < b; ++V) {
                    const $ = u.readVarint()
                      , Y = _[$];
                    if (!Y)
                        throw new Error("invalid index of key");
                    C[Y] = K.patch(l[Y], u)
                }
                const O = v / 8 | 0
                  , q = Math.ceil(v / 8);
                let k = u.offset;
                u.offset += q;
                for (let V = 0; V < O; ++V) {
                    const $ = u.readUint8At(k++);
                    for (let Y = 0; Y < 8; ++Y)
                        C[u.readString()] = $ & 1 << Y ? K.patch(K.identity, u) : K.clone(K.identity)
                }
                if (v & 7) {
                    const V = u.readUint8At(k);
                    for (let $ = 0; $ < (v & 7); ++$)
                        C[u.readString()] = V & 1 << $ ? K.patch(K.identity, u) : K.clone(K.identity)
                }
                return this.allocCount += 1,
                C
            }
            toJSON(l) {
                const u = {}
                  , m = Object.keys(l)
                  , b = this.muData;
                for (let v = 0; v < m.length; ++v) {
                    const _ = m[v];
                    u[_] = b.toJSON(l[_])
                }
                return u
            }
            fromJSON(l) {
                if (this.allocCount += 1,
                Object.prototype.toString.call(l) === "[object Object]") {
                    const u = {}
                      , m = Object.keys(l)
                      , b = this.muData;
                    for (let v = 0; v < m.length; ++v) {
                        const _ = m[v];
                        u[_] = b.fromJSON(l[_])
                    }
                    return u
                }
                return this.clone(this.identity)
            }
        }
        ;
        a.MuDictionary = d
    }
})
  , require_vector = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/vector.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuVector = void 0;
        var e = {
            float32: Float32Array,
            float64: Float64Array,
            int8: Int8Array,
            int16: Int16Array,
            int32: Int32Array,
            uint8: Uint8Array,
            uint16: Uint16Array,
            uint32: Uint32Array
        }
          , n = class {
            stats() {
                return {
                    allocCount: this.allocCount,
                    freeCount: this.freeCount,
                    poolSize: this.pool.length
                }
            }
            constructor(c, d) {
                this.muType = "vector",
                this.allocCount = 0,
                this.freeCount = 0,
                this.pool = [],
                this.muData = c,
                this.dimension = d,
                this.TypedArray = e[c.muType],
                this.identity = new this.TypedArray(d);
                for (let l = 0; l < d; ++l)
                    this.identity[l] = c.identity;
                this.json = {
                    type: "vector",
                    valueType: c.json,
                    dimension: d
                },
                this.__b = new this.TypedArray(d),
                this.__t = new this.TypedArray(d),
                this._b = new Uint8Array(this.__b.buffer),
                this._t = new Uint8Array(this.__t.buffer)
            }
            alloc() {
                return this.allocCount++,
                this.pool.pop() || new this.TypedArray(this.dimension)
            }
            free(c) {
                this.freeCount++,
                this.pool.push(c)
            }
            equal(c, d) {
                if (!(c instanceof this.TypedArray) || !(d instanceof this.TypedArray) || c.length !== d.length)
                    return !1;
                for (let l = c.length - 1; l >= 0; --l)
                    if (c[l] !== d[l])
                        return !1;
                return !0
            }
            clone(c) {
                const d = this.alloc();
                return d.set(c),
                d
            }
            assign(c, d) {
                return c.set(d),
                c
            }
            diff(c, d, l) {
                this.__b.set(c),
                this.__t.set(d);
                const u = this.identity.byteLength;
                l.grow(Math.ceil(u * 9 / 8));
                const m = l.offset;
                let b = m;
                l.offset += Math.ceil(u / 8);
                let v = 0
                  , _ = 0;
                for (let T = 0; T < u; ++T)
                    this._b[T] !== this._t[T] && (l.writeUint8(this._t[T]),
                    v |= 1 << (T & 7),
                    ++_),
                    (T & 7) === 7 && (l.writeUint8At(b++, v),
                    v = 0);
                return _ === 0 ? (l.offset = m,
                !1) : (u & 7 && l.writeUint8At(b, v),
                !0)
            }
            patch(c, d) {
                const l = d.offset
                  , u = this.dimension * this.identity.BYTES_PER_ELEMENT
                  , m = Math.floor(u / 8)
                  , b = Math.ceil(u / 8);
                d.offset = l + b,
                this.__b.set(c);
                for (let v = 0; v < m; ++v) {
                    const _ = v * 8
                      , T = d.readUint8At(l + v);
                    for (let C = 0; C < 8; ++C)
                        T & 1 << C && (this._b[_ + C] = d.readUint8())
                }
                if (u & 7) {
                    const v = m * 8
                      , _ = d.readUint8At(l + m)
                      , T = u & 7;
                    for (let C = 0; C < T; ++C)
                        _ & 1 << C && (this._b[v + C] = d.readUint8())
                }
                return this.clone(this.__b)
            }
            toJSON(c) {
                const d = new Array(c.length);
                for (let l = 0; l < d.length; ++l)
                    d[l] = c[l];
                return d
            }
            fromJSON(c) {
                if (Array.isArray(c)) {
                    const d = this.alloc();
                    for (let l = 0; l < d.length; ++l)
                        d[l] = this.muData.fromJSON(c[l]);
                    return d
                }
                return this.clone(this.identity)
            }
        }
        ;
        a.MuVector = n
    }
})
  , require_date = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/date.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuDate = void 0;
        var e = class {
            constructor(n) {
                this.muType = "date",
                this.identity = new Date(0),
                n && this.identity.setTime(n.getTime()),
                this.json = {
                    type: "date",
                    identity: this.identity.toISOString()
                }
            }
            alloc() {
                return new Date
            }
            free(n) {}
            equal(n, c) {
                return n.getTime() === c.getTime()
            }
            clone(n) {
                const c = this.alloc();
                return c.setTime(n.getTime()),
                c
            }
            assign(n, c) {
                return n.setTime(c.getTime()),
                n
            }
            diff(n, c, d) {
                const l = n.getTime()
                  , u = c.getTime();
                return l !== u ? (d.grow(10),
                d.writeVarint(u % 268435456),
                d.writeVarint(u / 268435456 | 0),
                !0) : !1
            }
            patch(n, c) {
                const d = this.alloc()
                  , l = c.readVarint()
                  , u = c.readVarint();
                return d.setTime(l + 268435456 * u),
                d
            }
            toJSON(n) {
                return n.toISOString()
            }
            fromJSON(n) {
                return typeof n == "string" ? new Date(n) : this.clone(this.identity)
            }
        }
        ;
        a.MuDate = e
    }
})
  , require_json = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/json.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuJSON = a.deepClone = a.deepEqual = void 0;
        function e(d, l) {
            if (d === l)
                return !0;
            if (d && l && typeof d == "object" && typeof l == "object") {
                const u = Array.isArray(d)
                  , m = Array.isArray(l);
                if (u !== m)
                    return !1;
                if (u) {
                    const v = d.length;
                    if (v !== l.length)
                        return !1;
                    for (let _ = v - 1; _ >= 0; --_)
                        if (!e(d[_], l[_]))
                            return !1;
                    return !0
                }
                const b = Object.keys(d);
                if (b.length !== Object.keys(l).length)
                    return !1;
                for (let v = 0; v < b.length; ++v) {
                    const _ = b[v];
                    if (!l.hasOwnProperty(_) || !e(d[_], l[_]))
                        return !1
                }
                return !0
            }
            return d !== d && l !== l
        }
        function n(d) {
            if (typeof d != "object" || d === null)
                return d;
            const l = Array.isArray(d) ? [] : {};
            if (Array.isArray(l)) {
                l.length = d.length;
                for (let u = 0; u < d.length; ++u)
                    l[u] = n(d[u])
            } else {
                const u = Object.keys(d);
                for (let m = 0; m < u.length; ++m) {
                    const b = u[m];
                    l[b] = n(d[b])
                }
            }
            return l
        }
        a.deepEqual = e,
        a.deepClone = n;
        var c = class {
            constructor(d) {
                this.muType = "json",
                this.identity = d && n(d),
                this.identity = this.identity || {},
                this.json = {
                    type: "json",
                    identity: this.identity
                }
            }
            alloc() {
                return {}
            }
            free() {}
            equal(d, l) {
                return (0,
                a.deepEqual)(d, l)
            }
            clone(d) {
                return (0,
                a.deepClone)(d)
            }
            assign(d, l) {
                if (Array.isArray(d) && Array.isArray(l)) {
                    d.length = l.length;
                    for (let b = 0; b < d.length; ++b)
                        d[b] = (0,
                        a.deepClone)(l[b]);
                    return d
                }
                const u = Object.keys(d);
                for (let b = 0; b < u.length; ++b) {
                    const v = u[b];
                    v in l || delete d[v]
                }
                const m = Object.keys(l);
                for (let b = 0; b < m.length; ++b) {
                    const v = m[b];
                    d[v] = (0,
                    a.deepClone)(l[v])
                }
                return d
            }
            diff(d, l, u) {
                const m = JSON.stringify(l);
                return u.writeString(m),
                !0
            }
            patch(d, l) {
                return JSON.parse(l.readString())
            }
            toJSON(d) {
                return d
            }
            fromJSON(d) {
                return typeof d == "object" && d ? d : this.clone(this.identity)
            }
        }
        ;
        a.MuJSON = c
    }
})
  , require_schema = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/schema/index.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuJSON = a.MuDate = a.MuDictionary = a.MuVector = a.MuBytes = a.MuUnion = a.MuStruct = a.MuSortedArray = a.MuOption = a.MuArray = a.MuQuantizedFloat = a.MuRelativeVarint = a.MuVarint = a.MuUint32 = a.MuUint16 = a.MuUint8 = a.MuInt32 = a.MuInt16 = a.MuInt8 = a.MuFloat64 = a.MuFloat32 = a.MuUTF8 = a.MuFixedASCII = a.MuASCII = a.MuBoolean = a.MuVoid = void 0;
        var e = require_void();
        Object.defineProperty(a, "MuVoid", {
            enumerable: !0,
            get: function() {
                return e.MuVoid
            }
        });
        var n = require_boolean();
        Object.defineProperty(a, "MuBoolean", {
            enumerable: !0,
            get: function() {
                return n.MuBoolean
            }
        });
        var c = require_ascii();
        Object.defineProperty(a, "MuASCII", {
            enumerable: !0,
            get: function() {
                return c.MuASCII
            }
        });
        var d = require_fixed_ascii();
        Object.defineProperty(a, "MuFixedASCII", {
            enumerable: !0,
            get: function() {
                return d.MuFixedASCII
            }
        });
        var l = require_utf8();
        Object.defineProperty(a, "MuUTF8", {
            enumerable: !0,
            get: function() {
                return l.MuUTF8
            }
        });
        var u = require_float32();
        Object.defineProperty(a, "MuFloat32", {
            enumerable: !0,
            get: function() {
                return u.MuFloat32
            }
        });
        var m = require_float64();
        Object.defineProperty(a, "MuFloat64", {
            enumerable: !0,
            get: function() {
                return m.MuFloat64
            }
        });
        var b = require_int8();
        Object.defineProperty(a, "MuInt8", {
            enumerable: !0,
            get: function() {
                return b.MuInt8
            }
        });
        var v = require_int16();
        Object.defineProperty(a, "MuInt16", {
            enumerable: !0,
            get: function() {
                return v.MuInt16
            }
        });
        var _ = require_int32();
        Object.defineProperty(a, "MuInt32", {
            enumerable: !0,
            get: function() {
                return _.MuInt32
            }
        });
        var T = require_uint8();
        Object.defineProperty(a, "MuUint8", {
            enumerable: !0,
            get: function() {
                return T.MuUint8
            }
        });
        var C = require_uint16();
        Object.defineProperty(a, "MuUint16", {
            enumerable: !0,
            get: function() {
                return C.MuUint16
            }
        });
        var K = require_uint32();
        Object.defineProperty(a, "MuUint32", {
            enumerable: !0,
            get: function() {
                return K.MuUint32
            }
        });
        var I = require_varint();
        Object.defineProperty(a, "MuVarint", {
            enumerable: !0,
            get: function() {
                return I.MuVarint
            }
        });
        var O = require_rvarint();
        Object.defineProperty(a, "MuRelativeVarint", {
            enumerable: !0,
            get: function() {
                return O.MuRelativeVarint
            }
        });
        var q = require_quantized_float();
        Object.defineProperty(a, "MuQuantizedFloat", {
            enumerable: !0,
            get: function() {
                return q.MuQuantizedFloat
            }
        });
        var k = require_array();
        Object.defineProperty(a, "MuArray", {
            enumerable: !0,
            get: function() {
                return k.MuArray
            }
        });
        var V = require_option();
        Object.defineProperty(a, "MuOption", {
            enumerable: !0,
            get: function() {
                return V.MuOption
            }
        });
        var $ = require_sorted_array();
        Object.defineProperty(a, "MuSortedArray", {
            enumerable: !0,
            get: function() {
                return $.MuSortedArray
            }
        });
        var Y = require_struct();
        Object.defineProperty(a, "MuStruct", {
            enumerable: !0,
            get: function() {
                return Y.MuStruct
            }
        });
        var Z = require_union();
        Object.defineProperty(a, "MuUnion", {
            enumerable: !0,
            get: function() {
                return Z.MuUnion
            }
        });
        var H = require_bytes();
        Object.defineProperty(a, "MuBytes", {
            enumerable: !0,
            get: function() {
                return H.MuBytes
            }
        });
        var J = require_dictionary();
        Object.defineProperty(a, "MuDictionary", {
            enumerable: !0,
            get: function() {
                return J.MuDictionary
            }
        });
        var ae = require_vector();
        Object.defineProperty(a, "MuVector", {
            enumerable: !0,
            get: function() {
                return ae.MuVector
            }
        });
        var re = require_date();
        Object.defineProperty(a, "MuDate", {
            enumerable: !0,
            get: function() {
                return re.MuDate
            }
        });
        var z = require_json();
        Object.defineProperty(a, "MuJSON", {
            enumerable: !0,
            get: function() {
                return z.MuJSON
            }
        })
    }
})
  , require_schema2 = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mesher/schema.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MeshDataSchema = a.MeshTextureSchema = void 0;
        var e = require_schema();
        a.MeshTextureSchema = new e.MuStruct({
            palette: new e.MuArray(new e.MuUint32,1 / 0),
            data: new e.MuArray(new e.MuVarint,1 / 0),
            width: new e.MuVarint
        }),
        a.MeshDataSchema = new e.MuArray(new e.MuStruct({
            vertices: new e.MuArray(new e.MuVarint,1 / 0),
            sizes: new e.MuArray(new e.MuVarint,1 / 0),
            uvs: new e.MuArray(new e.MuVarint,1 / 0),
            uvFlags: new e.MuArray(new e.MuUint8,1 / 0)
        }),6)
    }
})
  , require_texture = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mesher/texture.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.Texture = void 0,
        a.optimizeTexture = d,
        a.scaleTexture = l,
        a.packTexture = u,
        a.textureNodeToTexture = b,
        a.packTextures = v,
        a.flipTexture = _,
        a.rotateTexture = T,
        a.extendTextureEdge = C;
        var e = class If {
            constructor(I) {
                this.texture = I,
                this.x = 0,
                this.y = 0,
                this.width = 0,
                this.height = 0,
                this.rotation = 0,
                this.id = If.count++,
                I ? (this.width = I.width,
                this.height = I.height) : this.children = []
            }
        }
        ;
        e.count = 0;
        function n(K, I) {
            return K % I ? n(I, K % I) : I
        }
        var c = class {
            constructor(K, I, O) {
                this.width = K,
                this.height = I,
                this.data = O || Array(K * I).fill(0)
            }
            set(K, I, O) {
                this.data[I * this.width + K] = O
            }
            get(K, I) {
                return this.data[I * this.width + K]
            }
        }
        ;
        a.Texture = c;
        function d(K, I=!1) {
            let O = 0
              , q = 0;
            for (let Y = 0; Y < K.height; Y++) {
                let Z = 1;
                for (let H = 1; H <= K.width; H++)
                    H < K.width && K.get(H, Y) === K.get(H - 1, Y) ? Z++ : (O = n(O, Z),
                    Z = 1)
            }
            for (let Y = 0; Y < K.width; Y++) {
                let Z = 1;
                for (let H = 1; H <= K.height; H++)
                    H < K.height && K.get(Y, H) === K.get(Y, H - 1) ? Z++ : (q = n(q, Z),
                    Z = 1)
            }
            if (O === 0 && (O = 1),
            q === 0 && (q = 1),
            O == 1 && q == 1 && !I)
                return K;
            const k = new c(K.width / O + (I ? 2 : 0),K.height / q + (I ? 2 : 0));
            let V = I ? k.width + 1 : 0;
            const $ = I ? 2 : 0;
            for (let Y = 0; Y < K.data.length; Y++)
                k.data[V++] = K.data[Y],
                Y += O - 1,
                Y % K.width === K.width - 1 && (Y += K.width * (q - 1),
                V += $);
            if (I) {
                for (let Y = 0; Y < k.width; Y++)
                    k.data[Y] = k.data[Y + k.width],
                    k.data[k.data.length - 1 - Y] = k.data[k.data.length - 1 - Y - k.width];
                for (let Y = 0; Y < k.height; Y++)
                    k.data[Y * k.width] = k.data[Y * k.width + 1],
                    k.data[Y * k.width + k.width - 1] = k.data[Y * k.width + k.width - 2]
            }
            return k
        }
        function l(K, I=1, O=1) {
            const q = new c(K.width * I,K.height * O);
            let k = 0;
            for (let V = 0; V < K.data.length; V++) {
                for (let $ = 0; $ < I; $++)
                    q.data[k++] = K.data[V];
                if (V % K.width === K.width - 1)
                    for (let $ = 0; $ < O - 1; $++)
                        for (let Y = 0; Y < K.width * I; Y++)
                            q.data[k] = q.data[k - K.width * I],
                            k++
            }
            return q
        }
        function u(K, I, O) {
            if (Math.max(K.width, K.height) < Math.max(I.width, I.height))
                return u(I, K, O);
            const q = K.width < K.height;
            I.rotation = I.width < I.height === q ? 0 : 1,
            I.x = q ? K.width : 0,
            I.y = q ? 0 : K.height;
            const k = K.width + (q ? I.rotation ? I.height : I.width : 0)
              , V = K.height + (q ? 0 : I.rotation ? I.width : I.height)
              , $ = new e;
            $.width = k,
            $.height = V,
            $.children.push(K, I);
            const Y = I.rotation ? I.height : I.width
              , Z = I.rotation ? I.width : I.height;
            return q ? I.y + Z < V && O.push({
                node: $,
                x: I.x,
                y: Z,
                width: Y,
                height: V - Z,
                minWH: Math.min(Y, V - Z),
                maxWH: Math.max(Y, V - Z)
            }) : I.x + Y < k && O.push({
                node: $,
                x: Y,
                y: I.y,
                width: k - Y,
                height: Z,
                minWH: Math.min(k - Y, Z),
                maxWH: Math.max(k - Y, Z)
            }),
            $
        }
        function m(K, I, O) {
            const [q] = I.splice(O, 1);
            let {width: k, height: V} = K;
            (K.width > q.width || K.height > q.height) && (k = K.height,
            V = K.width,
            K.rotation = 1),
            K.x = q.x,
            K.y = q.y,
            q.node.children.push(K);
            const $ = (q.width - k) * q.height
              , Y = q.width * (q.height - V);
            if ($ > Y) {
                const Z = q.width - k
                  , H = q.height;
                if (I.push({
                    node: q.node,
                    x: q.x + k,
                    y: q.y,
                    width: Z,
                    height: H,
                    minWH: Math.min(Z, H),
                    maxWH: Math.max(Z, H)
                }),
                Y > 0) {
                    const J = k
                      , ae = q.height - V;
                    I.push({
                        node: q.node,
                        x: q.x,
                        y: q.y + V,
                        width: J,
                        height: ae,
                        minWH: Math.min(J, ae),
                        maxWH: Math.max(J, ae)
                    })
                }
            } else if (Y > $) {
                const Z = q.width
                  , H = q.height - V;
                if (I.push({
                    node: q.node,
                    x: q.x,
                    y: q.y + V,
                    width: Z,
                    height: H,
                    minWH: Math.min(Z, H),
                    maxWH: Math.max(Z, H)
                }),
                $ > 0) {
                    const J = q.width - k
                      , ae = V;
                    I.push({
                        node: q.node,
                        x: q.x + k,
                        y: q.y,
                        width: J,
                        height: ae,
                        minWH: Math.min(J, ae),
                        maxWH: Math.max(J, ae)
                    })
                }
            }
        }
        function b(K) {
            const I = new c(K.width,K.height)
              , O = new Map;
            function q(k, V, $, Y) {
                if (k.texture) {
                    for (let Z = 0; Z < k.texture.width; Z++)
                        for (let H = 0; H < k.texture.height; H++)
                            I.set(V + (Y ? k.texture.height - 1 - H : Z), $ + (Y ? Z : H), k.texture.get(Z, H));
                    O.set(k.texture, {
                        x: V,
                        y: $,
                        rotation: Y,
                        width: Y ? k.texture.height : k.texture.width,
                        height: Y ? k.texture.width : k.texture.height
                    }),
                    delete k.texture
                } else
                    for (const Z of k.children)
                        q(Z, V + (Y ? Z.y : Z.x), $ + (Y ? Z.x : Z.y), Y ^ Z.rotation)
            }
            return q(K, K.x, K.y, K.rotation),
            {
                texture: I,
                positions: O
            }
        }
        function v(K) {
            const I = K.map(k => new e(k)).sort( (k, V) => {
                const $ = k.width * k.height
                  , Y = V.width * V.height;
                if ($ === Y) {
                    const Z = Math.max(k.width, k.height)
                      , H = Math.max(V.width, V.height);
                    return Z === H ? Math.min(V.width, V.height) - Math.min(k.width, k.height) : H - Z
                }
                return Y - $
            }
            );
            let O = I[0];
            const q = [];
            for (let k = 1; k < I.length; k++) {
                const V = I[k]
                  , $ = Math.min(V.width, V.height)
                  , Y = Math.max(V.width, V.height);
                let Z = -1;
                for (let H = 0; H < q.length; H++) {
                    const J = q[H];
                    if (J.minWH >= $ && J.maxWH >= Y)
                        if (Z === -1)
                            Z = H;
                        else {
                            const ae = q[Z];
                            J.width * J.height < ae.width * ae.height && (Z = H)
                        }
                }
                Z !== -1 ? m(V, q, Z) : O = u(O, V, q)
            }
            return {
                texture: O,
                wastes: q.reduce( (k, V) => k + V.width * V.height, 0)
            }
        }
        function _(K) {
            const I = new c(K.height,K.width);
            for (let O = 0; O < K.width; O++)
                for (let q = 0; q < K.height; q++)
                    I.set(q, O, K.get(O, q));
            return I
        }
        function T(K) {
            const I = new c(K.height,K.width);
            for (let O = 0; O < K.width; O++)
                for (let q = 0; q < K.height; q++)
                    I.set(q, O, K.get(K.width - 1 - O, q));
            return I
        }
        function C(K) {
            const I = new c(K.width + 2,K.height + 2);
            for (let O = 0; O < I.width; O++)
                for (let q = 0; q < I.height; q++)
                    I.set(O, q, K.get(Math.min(Math.max(0, O - 1), K.width - 1), Math.min(Math.max(0, q - 1), K.height - 1)));
            return I
        }
    }
})
  , require_murmur3 = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mesher/murmur3.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.murmur3 = c;
        var e = new Uint32Array(2);
        function n() {
            e[1] = Math.imul(e[1], 3432918353),
            e[1] = e[1] << 15 | e[1] >>> 17,
            e[1] = Math.imul(e[1], 461845907),
            e[0] ^= e[1]
        }
        function c(d, l, u=0, m=0) {
            const {width: b, height: v, data: _} = d
              , C = [[K => _[K], K => _[b * (v - 1) + Math.floor(K / v) - K % v * b], K => _[b * v - 1 - K], K => _[b - 1 - Math.floor(K / v) + K % v * b]], [K => _[Math.floor(K / v) + K % v * b], K => _[b * (v - 1 - Math.floor(K / b)) + K % b], K => _[b * v - Math.floor(K / v) - 1 - K % v * b], K => _[Math.floor(K / b + 1) * b - 1 - K % b]]][u][m];
            e[0] = l;
            for (let K = 0, I = _.length >> 2; I > 0; I--)
                e[1] = C(K++) | C(K++) << 8 | C(K++) << 16 | C(K++) << 24,
                n(),
                e[0] = e[0] << 13 | e[0] >>> 19,
                e[0] = Math.imul(e[0], 5) + 3864292196;
            e[1] = 0;
            for (let K = _.length - 1, I = _.length & 3; I > 0; I--)
                e[1] <<= 8,
                e[1] |= C(K--);
            return n(),
            e[0] ^= _.length,
            e[0] ^= e[0] >>> 16,
            e[0] = Math.imul(e[0], 2246822507),
            e[0] ^= e[0] >>> 13,
            e[0] = Math.imul(e[0], 3266489909),
            e[0] ^= e[0] >>> 16,
            e[0]
        }
    }
})
  , require_mesher = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mesher/index.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.Mesher = void 0,
        a.voxelToRectangles = m,
        a.getTexture = b,
        a.textureToMeshTexture = v,
        a.rectanglesToMeshData = _,
        a.voxelsToMeshes = C,
        a.unpackTextureData = K,
        a.unpackMeshData = I,
        a.getVertexCount = O;
        var e = require_texture()
          , n = require_murmur3()
          , c = require_schema2();
        function d(q, k) {
            let V;
            const $ = [q.width.toString(36), q.height.toString(36)];
            for (let Y = 0; Y < 2; Y++)
                for (let Z = 0; Z < 4; Z++) {
                    const H = Y ^ Z & 1
                      , J = `${$[H]}_${$[1 - H]}_` + (0,
                    n.murmur3)(q, 123456, Y, Z).toString(36) + (0,
                    n.murmur3)(q, 452362, Y, Z).toString(36) + (0,
                    n.murmur3)(q, 7456443, Y, Z).toString(36) + (0,
                    n.murmur3)(q, 143525, Y, Z).toString(36);
                    if (V || (V = J),
                    k.has(J))
                        return {
                            hash: J,
                            flipped: Y !== 0,
                            rotation: Z,
                            existed: !0
                        }
                }
            return {
                hash: V,
                flipped: !1,
                rotation: 0,
                existed: !1
            }
        }
        function l(q, k, V, $, Y, Z, H, J, ae, re=!0, z=!1, B=!1) {
            const f = Array(3);
            H.forEach( (M, E) => f[M] = E);
            const y = H.map(M => Y[M])
              , X = H.map(M => Z[M])
              , N = J & 1 ? X[2] - 1 : 0
              , R = J & 1 ? -1 : X[2]
              , D = J & 1 ? -1 : 1;
            function F(...M) {
                return {
                    x: M[f[0]],
                    y: M[f[1]],
                    z: M[f[2]]
                }
            }
            for (let M = N; M !== R; M += D) {
                const E = [];
                for (let U = 0; U <= X[1]; U++) {
                    const Q = [];
                    let ie = -1;
                    for (let oe = 0; oe <= X[0] && U < X[1]; oe++) {
                        const he = oe * y[0] + U * y[1] + M * y[2] + $
                          , j = oe * y[0] + U * y[1] + (M - D) * y[2] + $;
                        oe < X[0] && ae(he) && (M === N || V[j] === 0) ? ie === -1 && (ie = oe) : ie !== -1 && (Q.push({
                            row: U,
                            start: ie,
                            width: oe - ie
                        }),
                        ie = -1)
                    }
                    let te = 0;
                    for (let oe = 0; oe < E.length; oe++) {
                        let he = !0;
                        const j = E[oe];
                        let se = 0;
                        for (let ue = 0; ue < Q.length && U < X[1]; ue++) {
                            const _e = Q[ue];
                            j.start === _e.start && j.width === _e.width ? he = !1 : Q[se++] = Q[ue]
                        }
                        if (Q.length = se,
                        he) {
                            const ue = U - j.row
                              , _e = new e.Texture(j.width,ue);
                            for (let be = 0; be < _e.width; be++)
                                for (let ve = 0; ve < _e.height; ve++) {
                                    const Se = j.start + be
                                      , Ke = j.row + ve;
                                    _e.set(be, ve, V[Se * y[0] + Ke * y[1] + M * y[2]])
                                }
                            const Xe = J & 1
                              , pe = re ? (0,
                            e.optimizeTexture)(_e, z) : z ? (0,
                            e.extendTextureEdge)(_e) : _e
                              , {existed: ye, flipped: ce, rotation: Be, hash: ne} = d(pe, k);
                            ye || k.set(ne, pe),
                            q.push(Object.assign(Object.assign({}, F(j.start, +j.row, B ? 0 : Xe + M)), {
                                width: j.width,
                                height: ue,
                                texture: {
                                    hash: ne,
                                    rotation: Be,
                                    flipped: ce
                                }
                            }))
                        } else
                            E[te++] = E[oe]
                    }
                    for (let oe = 0; oe < Q.length; oe++)
                        E[te++] = Q[oe];
                    E.length = te
                }
            }
        }
        function u(q, k, V) {
            const {shape: [$,Y,Z], stride: [H,J,ae], offset: re, data: z} = q
              , B = k.slice();
            for (; B.length > 0; ) {
                const f = B.pop()
                  , y = B.pop()
                  , X = B.pop()
                  , N = X * H + y * J + f * ae + re;
                X < 0 || y < 0 || f < 0 || X >= $ || y >= Y || f >= Z || V.has(N) || z[re + N] || (V.add(N),
                B.push(X + 1, y, f),
                B.push(X - 1, y, f),
                B.push(X, y + 1, f),
                B.push(X, y - 1, f),
                B.push(X, y, f + 1),
                B.push(X, y, f - 1))
            }
        }
        function m(q, k, V=!0, $=!1, Y=!1, Z=3) {
            const H = Z === 0 || Z === 1 || Z === 2
              , {data: J, offset: ae, stride: re, shape: z} = q;
            let B = [[1, 2, 0], [1, 2, 0], [0, 2, 1], [0, 2, 1], [0, 1, 2], [0, 1, 2]]
              , f = 0;
            H && (B = B.slice(Z * 2, Z * 2 + 2),
            f = Z * 2);
            const y = Y ? ( () => {
                const N = new Set
                  , [R,D,F] = z;
                for (let M = 0; M < R; M++) {
                    for (let E = 0; E < D; E++)
                        u(q, [M, E, 0], N),
                        u(q, [M, E, F - 1], N);
                    for (let E = 0; E < F; E++)
                        u(q, [M, 0, E], N),
                        u(q, [M, D - 1, E], N)
                }
                for (let M = 0; M < F; M++)
                    for (let E = 0; E < D; E++)
                        u(q, [0, E, M], N),
                        u(q, [R - 1, E, M], N);
                return M => !N.has(M)
            }
            )() : N => J[N] !== 0
              , X = [[], [], [], [], [], []];
            for (let N = 0; N < B.length; N++)
                l(X[N + f], k, J, ae, re, z, B[N], N + f, y, V, $, H);
            return X
        }
        function b(q) {
            const {texture: k} = (0,
            e.packTextures)(Array.from(q.values()));
            return (0,
            e.textureNodeToTexture)(k)
        }
        async function v(q, k, V=Array(k.length).fill(0)) {
            const $ = c.MeshTextureSchema.alloc()
              , Y = $.palette;
            if (typeof k[0] == "number")
                for (let Z = 0; Z < k.length; Z++)
                    Y.push(k[Z] << 8 | V[Z] & 255);
            else
                for (let Z = 0; Z < k.length; Z++) {
                    const [H,J,ae] = k[Z];
                    Y.push(H << 24 | J << 16 | ae << 8 | V[Z] & 255)
                }
            return $.data = q.data,
            $.width = q.width,
            $
        }
        function _(q, k, V, $=!1) {
            const Y = c.MeshDataSchema.alloc()
              , Z = $ ? 1 : 0;
            for (let H = 0; H < 6; H++)
                Y.push({
                    vertices: [],
                    uvs: [],
                    sizes: [],
                    uvFlags: []
                });
            for (let H = 0; H < q.length; H++)
                for (let J = 0; J < q[H].length; J++) {
                    const ae = q[H][J]
                      , re = V.get(k.get(ae.texture.hash))
                      , z = re.x + Z
                      , B = re.y + Z
                      , f = re.x + re.width - Z
                      , y = re.y + re.height - Z;
                    Y[H].vertices.push(ae.x, ae.y, ae.z),
                    Y[H].sizes.push(ae.width, ae.height),
                    Y[H].uvs.push(z, B, f, y);
                    const X = ae.texture.rotation + (ae.texture.flipped ? 4 - re.rotation : re.rotation) & 3 | ae.texture.flipped << 2
                      , {uvFlags: N} = Y[H];
                    J & 1 ? N[J >> 1] |= X : N[J >> 1] = X << 4
                }
            return Y
        }
        var T = class {
            constructor(q=!0, k=!1, V=!1) {
                this.compress = q,
                this.extendEdge = k,
                this.surfaceOnly = V,
                this.textureMap = new Map,
                this.models = [],
                this.textureCache = null
            }
            addModel(q, k=3) {
                this.models.push(m(q, this.textureMap, this.compress, this.extendEdge, this.surfaceOnly, k)),
                this.textureCache = null
            }
            getTextureData() {
                return this.textureCache || (this.textureCache = b(this.textureMap)),
                this.textureCache
            }
            getMeshes(q=this.extendEdge) {
                const {positions: k} = this.getTextureData();
                return this.models.map(V => _(V, this.textureMap, k, q))
            }
            getMesh(q, k=this.extendEdge) {
                const {positions: V} = this.getTextureData();
                return _(this.models[q], this.textureMap, V, k)
            }
            getTexture(q, k) {
                return v(this.getTextureData().texture, q, k)
            }
        }
        ;
        a.Mesher = T;
        async function C(q, k, V, $=!0, Y=!0) {
            const Z = new T($,Y,!1);
            for (const H of q)
                Z.addModel(H);
            return {
                meshes: Z.getMeshes(),
                texture: await Z.getTexture(k, V)
            }
        }
        function K(q, k) {
            const {data: V, palette: $} = q
              , Y = new Uint8Array(V.length * k.length);
            for (let Z = 0; Z < V.length; Z++) {
                const H = Z * k.length
                  , J = $[V[Z]];
                for (let ae = 0; ae < k.length; ae++)
                    Y[H + ae] = J >> k[ae] & 255
            }
            return Y
        }
        function I(q, k=Uint8Array, V=Uint16Array) {
            let $ = 0;
            for (let R = 0; R < 6; R++)
                $ += q[R].sizes.length / 2;
            const Y = new k($ * 4 * 4)
              , Z = new V($ * 4 * 2);
            let H = 0;
            const J = [1, 0, 0, 1, 1, 0];
            function ae(R, D, F, M, E, U) {
                const Q = H++ ^ J[M];
                Y[Q * 4 + 0] = R,
                Y[Q * 4 + 1] = D,
                Y[Q * 4 + 2] = F,
                Y[Q * 4 + 3] = M,
                Z[Q * 2 + 0] = E,
                Z[Q * 2 + 1] = U
            }
            const re = [[0, 1, 2, 3], [1, 3, 0, 2], [3, 2, 1, 0], [2, 0, 3, 1], [0, 2, 1, 3], [2, 3, 0, 1], [3, 1, 2, 0], [1, 0, 3, 2]];
            let z = 1 / 0
              , B = 1 / 0
              , f = 1 / 0
              , y = -1 / 0
              , X = -1 / 0
              , N = -1 / 0;
            for (let R = 0; R < 6; R++) {
                const D = q[R]
                  , F = D.vertices.length / 3;
                for (let M = 0; M < F; M++) {
                    const E = D.vertices[M * 3 + 0]
                      , U = D.vertices[M * 3 + 1]
                      , Q = D.vertices[M * 3 + 2]
                      , ie = D.sizes[M * 2 + 0]
                      , te = D.sizes[M * 2 + 1]
                      , oe = D.uvs[M * 4 + 0]
                      , he = D.uvs[M * 4 + 1]
                      , j = D.uvs[M * 4 + 2]
                      , se = D.uvs[M * 4 + 3]
                      , ue = E + (R >= 2 ? ie : 0)
                      , _e = U + (R <= 1 ? ie : R >= 4 ? te : 0)
                      , Xe = Q + (R <= 3 ? te : 0)
                      , pe = M
                      , ye = pe & 1 ? D.uvFlags[pe >> 1] & 15 : D.uvFlags[pe >> 1] >> 4
                      , ce = [[oe, he], [j, he], [oe, se], [j, se]];
                    z = Math.min(z, E),
                    y = Math.max(y, ue),
                    B = Math.min(B, U),
                    X = Math.max(X, _e),
                    f = Math.min(f, Q),
                    N = Math.max(N, Xe);
                    const Be = re[ye];
                    R <= 1 ? (ae(E, U, Q, R, ...ce[Be[0]]),
                    ae(E, _e, Q, R, ...ce[Be[1]]),
                    ae(E, U, Xe, R, ...ce[Be[2]]),
                    ae(E, _e, Xe, R, ...ce[Be[3]])) : R <= 3 ? (ae(E, U, Q, R, ...ce[Be[0]]),
                    ae(ue, U, Q, R, ...ce[Be[1]]),
                    ae(E, U, Xe, R, ...ce[Be[2]]),
                    ae(ue, U, Xe, R, ...ce[Be[3]])) : (ae(E, U, Q, R, ...ce[Be[0]]),
                    ae(ue, U, Q, R, ...ce[Be[1]]),
                    ae(E, _e, Q, R, ...ce[Be[2]]),
                    ae(ue, _e, Q, R, ...ce[Be[3]]))
                }
            }
            return {
                meshData: Y,
                uvData: Z,
                count: $ * 6,
                lox: z,
                loy: B,
                loz: f,
                hix: y,
                hiy: X,
                hiz: N
            }
        }
        function O(q) {
            return q.reduce( (V, $) => V + $.length, 0) * 6
        }
    }
})
  , require_voxa_project = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/voxa-project/index.js"(a) {
        var e = require_schema2()
          , n = require_mesher()
          , c = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global$1 < "u" ? global$1 : typeof self < "u" ? self : {};
        function d(W) {
            if (Object.prototype.hasOwnProperty.call(W, "__esModule"))
                return W;
            var ee = W.default;
            if (typeof ee == "function") {
                var ge = function Pe() {
                    return this instanceof Pe ? Reflect.construct(ee, arguments, this.constructor) : ee.apply(this, arguments)
                };
                ge.prototype = ee.prototype
            } else
                ge = {};
            return Object.defineProperty(ge, "__esModule", {
                value: !0
            }),
            Object.keys(W).forEach(function(Pe) {
                var Ce = Object.getOwnPropertyDescriptor(W, Pe);
                Object.defineProperty(ge, Pe, Ce.get ? Ce : {
                    enumerable: !0,
                    get: function() {
                        return W[Pe]
                    }
                })
            }),
            ge
        }
        var l = {}, u = {}, m;
        function b() {
            if (m)
                return u;
            m = 1,
            Object.defineProperty(u, "__esModule", {
                value: !0
            }),
            u.MuVoid = void 0;
            class W {
                constructor() {
                    this.identity = void 0,
                    this.muType = "void",
                    this.json = {
                        type: "void"
                    }
                }
                alloc() {}
                free(ge) {}
                equal(ge, Pe) {
                    return !0
                }
                clone(ge) {}
                assign(ge, Pe) {}
                diff(ge, Pe, Ce) {
                    return !1
                }
                patch(ge, Pe) {}
                toJSON(ge) {
                    return null
                }
                fromJSON(ge) {}
            }
            return u.MuVoid = W,
            u
        }
        var v = {}, _;
        function T() {
            if (_)
                return v;
            _ = 1,
            Object.defineProperty(v, "__esModule", {
                value: !0
            }),
            v.MuBoolean = void 0;
            class W {
                constructor(ge) {
                    this.muType = "boolean",
                    this.identity = !!ge,
                    this.json = {
                        type: "boolean",
                        identity: this.identity
                    }
                }
                alloc() {
                    return this.identity
                }
                free(ge) {}
                equal(ge, Pe) {
                    return ge === Pe
                }
                clone(ge) {
                    return ge
                }
                assign(ge, Pe) {
                    return Pe
                }
                diff(ge, Pe, Ce) {
                    return ge !== Pe ? (Ce.grow(1),
                    Ce.writeUint8(Pe ? 1 : 0),
                    !0) : !1
                }
                patch(ge, Pe) {
                    const Ce = Pe.readUint8();
                    if (Ce > 1)
                        throw new Error("invalid value for boolean");
                    return !!Ce
                }
                toJSON(ge) {
                    return ge
                }
                fromJSON(ge) {
                    return typeof ge == "boolean" ? ge : this.identity
                }
            }
            return v.MuBoolean = W,
            v
        }
        var C = {}, K = {}, I;
        function O() {
            if (I)
                return K;
            I = 1,
            Object.defineProperty(K, "__esModule", {
                value: !0
            }),
            K.MuString = void 0;
            class W {
                constructor(ge, Pe) {
                    this.identity = ge,
                    this.muType = Pe,
                    this.json = {
                        type: Pe,
                        identity: ge
                    }
                }
                alloc() {
                    return this.identity
                }
                free(ge) {}
                equal(ge, Pe) {
                    return ge === Pe
                }
                clone(ge) {
                    return ge
                }
                assign(ge, Pe) {
                    return Pe
                }
                toJSON(ge) {
                    return ge
                }
                fromJSON(ge) {
                    return typeof ge == "string" ? ge : this.identity
                }
            }
            return K.MuString = W,
            K
        }
        var q;
        function k() {
            if (q)
                return C;
            q = 1,
            Object.defineProperty(C, "__esModule", {
                value: !0
            }),
            C.MuASCII = void 0;
            const W = O();
            class ee extends W.MuString {
                constructor(Pe) {
                    super(Pe || "", "ascii")
                }
                diff(Pe, Ce, ke) {
                    return Pe !== Ce ? (ke.grow(5 + Ce.length),
                    ke.writeVarint(Ce.length),
                    ke.writeASCII(Ce),
                    !0) : !1
                }
                patch(Pe, Ce) {
                    return Ce.readASCII(Ce.readVarint())
                }
            }
            return C.MuASCII = ee,
            C
        }
        var V = {}, $;
        function Y() {
            if ($)
                return V;
            $ = 1,
            Object.defineProperty(V, "__esModule", {
                value: !0
            }),
            V.MuFixedASCII = void 0;
            const W = O();
            class ee extends W.MuString {
                constructor(Pe) {
                    const Ce = typeof Pe == "number" ? new Array(Pe + 1).join(" ") : Pe;
                    super(Ce, "fixed-ascii"),
                    this.length = Ce.length
                }
                diff(Pe, Ce, ke) {
                    return Pe !== Ce ? (ke.grow(this.length),
                    ke.writeASCII(Ce),
                    !0) : !1
                }
                patch(Pe, Ce) {
                    return Ce.readASCII(this.length)
                }
            }
            return V.MuFixedASCII = ee,
            V
        }
        var Z = {}, H;
        function J() {
            if (H)
                return Z;
            H = 1,
            Object.defineProperty(Z, "__esModule", {
                value: !0
            }),
            Z.MuUTF8 = void 0;
            const W = O();
            class ee extends W.MuString {
                constructor(Pe) {
                    super(Pe || "", "utf8")
                }
                diff(Pe, Ce, ke) {
                    return Pe !== Ce ? (ke.writeString(Ce),
                    !0) : !1
                }
                patch(Pe, Ce) {
                    return Ce.readString()
                }
            }
            return Z.MuUTF8 = ee,
            Z
        }
        var ae = {}, re = {}, z;
        function B() {
            return z || (z = 1,
            function(W) {
                Object.defineProperty(W, "__esModule", {
                    value: !0
                }),
                W.MuNumber = W.ranges = void 0;
                function ee(...Pe) {
                    return Pe
                }
                W.ranges = {
                    float32: ee(-34028234663852886e22, 34028234663852886e22),
                    float64: ee(-17976931348623157e292, 17976931348623157e292),
                    int8: ee(-128, 127),
                    int16: ee(-32768, 32767),
                    int32: ee(-2147483648, 2147483647),
                    uint8: ee(0, 255),
                    uint16: ee(0, 65535),
                    uint32: ee(0, 4294967295),
                    varint: ee(0, 4294967295),
                    rvarint: ee(0, 4294967295)
                };
                class ge {
                    constructor(Ce, ke) {
                        const ze = Ce === Ce ? Ce || 0 : NaN
                          , Qe = W.ranges[ke];
                        if (ze !== 1 / 0 && ze !== -1 / 0 && ze === ze) {
                            if (ze < Qe[0] || ze > Qe[1])
                                throw new RangeError(`${ze} is out of range of ${ke}`)
                        } else if (ke !== "float32" && ke !== "float64")
                            throw new RangeError(`${ze} is out of range of ${ke}`);
                        this.identity = ze,
                        this.muType = ke,
                        this.json = {
                            type: ke,
                            identity: ze
                        }
                    }
                    alloc() {
                        return this.identity
                    }
                    free(Ce) {}
                    equal(Ce, ke) {
                        return Ce === ke
                    }
                    clone(Ce) {
                        return Ce
                    }
                    assign(Ce, ke) {
                        return ke
                    }
                    toJSON(Ce) {
                        return Ce
                    }
                    fromJSON(Ce) {
                        return typeof Ce == "number" ? Ce : this.identity
                    }
                }
                W.MuNumber = ge
            }(re)),
            re
        }
        var f;
        function y() {
            if (f)
                return ae;
            f = 1,
            Object.defineProperty(ae, "__esModule", {
                value: !0
            }),
            ae.MuFloat32 = void 0;
            const W = B();
            class ee extends W.MuNumber {
                constructor(Pe) {
                    super(Pe, "float32")
                }
                diff(Pe, Ce, ke) {
                    return Pe !== Ce ? (ke.grow(4),
                    ke.writeFloat32(Ce),
                    !0) : !1
                }
                patch(Pe, Ce) {
                    return Ce.readFloat32()
                }
            }
            return ae.MuFloat32 = ee,
            ae
        }
        var X = {}, N;
        function R() {
            if (N)
                return X;
            N = 1,
            Object.defineProperty(X, "__esModule", {
                value: !0
            }),
            X.MuFloat64 = void 0;
            const W = B();
            class ee extends W.MuNumber {
                constructor(Pe) {
                    super(Pe, "float64")
                }
                diff(Pe, Ce, ke) {
                    return Pe !== Ce ? (ke.grow(8),
                    ke.writeFloat64(Ce),
                    !0) : !1
                }
                patch(Pe, Ce) {
                    return Ce.readFloat64()
                }
            }
            return X.MuFloat64 = ee,
            X
        }
        var D = {}, F;
        function M() {
            if (F)
                return D;
            F = 1,
            Object.defineProperty(D, "__esModule", {
                value: !0
            }),
            D.MuInt8 = void 0;
            const W = B();
            class ee extends W.MuNumber {
                constructor(Pe) {
                    super(Pe, "int8")
                }
                diff(Pe, Ce, ke) {
                    return Pe !== Ce ? (ke.grow(1),
                    ke.writeInt8(Ce),
                    !0) : !1
                }
                patch(Pe, Ce) {
                    return Ce.readInt8()
                }
            }
            return D.MuInt8 = ee,
            D
        }
        var E = {}, U;
        function Q() {
            if (U)
                return E;
            U = 1,
            Object.defineProperty(E, "__esModule", {
                value: !0
            }),
            E.MuInt16 = void 0;
            const W = B();
            class ee extends W.MuNumber {
                constructor(Pe) {
                    super(Pe, "int16")
                }
                diff(Pe, Ce, ke) {
                    return Pe !== Ce ? (ke.grow(2),
                    ke.writeInt16(Ce),
                    !0) : !1
                }
                patch(Pe, Ce) {
                    return Ce.readInt16()
                }
            }
            return E.MuInt16 = ee,
            E
        }
        var ie = {}, te;
        function oe() {
            if (te)
                return ie;
            te = 1,
            Object.defineProperty(ie, "__esModule", {
                value: !0
            }),
            ie.MuInt32 = void 0;
            const W = B();
            class ee extends W.MuNumber {
                constructor(Pe) {
                    super(Pe, "int32")
                }
                diff(Pe, Ce, ke) {
                    return Pe !== Ce ? (ke.grow(4),
                    ke.writeInt32(Ce),
                    !0) : !1
                }
                patch(Pe, Ce) {
                    return Ce.readInt32()
                }
            }
            return ie.MuInt32 = ee,
            ie
        }
        var he = {}, j;
        function se() {
            if (j)
                return he;
            j = 1,
            Object.defineProperty(he, "__esModule", {
                value: !0
            }),
            he.MuUint8 = void 0;
            const W = B();
            class ee extends W.MuNumber {
                constructor(Pe) {
                    super(Pe, "uint8")
                }
                diff(Pe, Ce, ke) {
                    return Pe !== Ce ? (ke.grow(1),
                    ke.writeUint8(Ce),
                    !0) : !1
                }
                patch(Pe, Ce) {
                    return Ce.readUint8()
                }
            }
            return he.MuUint8 = ee,
            he
        }
        var ue = {}, _e;
        function Xe() {
            if (_e)
                return ue;
            _e = 1,
            Object.defineProperty(ue, "__esModule", {
                value: !0
            }),
            ue.MuUint16 = void 0;
            const W = B();
            class ee extends W.MuNumber {
                constructor(Pe) {
                    super(Pe, "uint16")
                }
                diff(Pe, Ce, ke) {
                    return Pe !== Ce ? (ke.grow(2),
                    ke.writeUint16(Ce),
                    !0) : !1
                }
                patch(Pe, Ce) {
                    return Ce.readUint16()
                }
            }
            return ue.MuUint16 = ee,
            ue
        }
        var pe = {}, ye;
        function ce() {
            if (ye)
                return pe;
            ye = 1,
            Object.defineProperty(pe, "__esModule", {
                value: !0
            }),
            pe.MuUint32 = void 0;
            const W = B();
            class ee extends W.MuNumber {
                constructor(Pe) {
                    super(Pe, "uint32")
                }
                diff(Pe, Ce, ke) {
                    return Pe !== Ce ? (ke.grow(4),
                    ke.writeUint32(Ce),
                    !0) : !1
                }
                patch(Pe, Ce) {
                    return Ce.readUint32()
                }
            }
            return pe.MuUint32 = ee,
            pe
        }
        var Be = {}, ne;
        function be() {
            if (ne)
                return Be;
            ne = 1,
            Object.defineProperty(Be, "__esModule", {
                value: !0
            }),
            Be.MuVarint = void 0;
            const W = B();
            class ee extends W.MuNumber {
                constructor(Pe) {
                    super(Pe, "varint")
                }
                diff(Pe, Ce, ke) {
                    return Pe !== Ce ? (ke.grow(5),
                    ke.writeVarint(Ce),
                    !0) : !1
                }
                patch(Pe, Ce) {
                    return Ce.readVarint()
                }
            }
            return Be.MuVarint = ee,
            Be
        }
        var ve = {}, Se;
        function Ke() {
            if (Se)
                return ve;
            Se = 1,
            Object.defineProperty(ve, "__esModule", {
                value: !0
            }),
            ve.MuRelativeVarint = void 0;
            const W = B()
              , ee = 2863311530;
            class ge extends W.MuNumber {
                constructor(Ce) {
                    super(Ce, "rvarint")
                }
                diff(Ce, ke, ze) {
                    return Ce !== ke ? (ze.grow(5),
                    ze.writeVarint(ee + (ke - Ce) ^ ee),
                    !0) : !1
                }
                patch(Ce, ke) {
                    const ze = (ee ^ ke.readVarint()) - ee >> 0;
                    return Ce + ze
                }
            }
            return ve.MuRelativeVarint = ge,
            ve
        }
        var le = {}, de;
        function Te() {
            if (de)
                return le;
            de = 1,
            Object.defineProperty(le, "__esModule", {
                value: !0
            }),
            le.MuQuantizedFloat = void 0;
            const W = 2863311530;
            function ee(Pe) {
                const Ce = Pe.readVarint();
                return (W ^ Ce) - W >> 0
            }
            class ge {
                constructor(Ce, ke) {
                    this.precision = Ce,
                    this.invPrecision = 1,
                    this.identity = 0,
                    this.muData = {
                        type: "quantized-float",
                        precision: 0,
                        identity: 0
                    },
                    this.muType = "quantized-float",
                    this.invPrecision = 1 / this.precision,
                    ke && (this.identity = this.precision * (this.invPrecision * ke >> 0)),
                    this.json = this.muData = {
                        type: "quantized-float",
                        precision: this.precision,
                        identity: this.identity
                    }
                }
                assign(Ce, ke) {
                    return (this.invPrecision * ke >> 0) * this.precision
                }
                clone(Ce) {
                    return (this.invPrecision * Ce >> 0) * this.precision
                }
                alloc() {
                    return this.identity
                }
                free() {}
                toJSON(Ce) {
                    return this.precision * (this.invPrecision * Ce >> 0)
                }
                fromJSON(Ce) {
                    return typeof Ce == "number" ? this.clone(Ce) : this.identity
                }
                equal(Ce, ke) {
                    const ze = this.invPrecision;
                    return ze * Ce >> 0 === ze * ke >> 0
                }
                diff(Ce, ke, ze) {
                    const Qe = this.invPrecision
                      , st = Qe * Ce >> 0
                      , ft = Qe * ke >> 0;
                    return st === ft ? !1 : (ze.grow(5),
                    ze.writeVarint((W + (ft - st) ^ W) >>> 0),
                    !0)
                }
                patch(Ce, ke) {
                    const ze = this.invPrecision * Ce >> 0
                      , Qe = ee(ke);
                    return (ze + Qe) * this.precision
                }
            }
            return le.MuQuantizedFloat = ge,
            le
        }
        var Re = {}, De = {}, Ge;
        function it() {
            if (Ge)
                return De;
            Ge = 1,
            Object.defineProperty(De, "__esModule", {
                value: !0
            }),
            De.isMuPrimitiveType = ee;
            const W = ["ascii", "boolean", "fixed-ascii", "float32", "float64", "int8", "int16", "int32", "uint8", "uint16", "uint32", "utf8", "void"];
            function ee(ge) {
                return W.indexOf(ge) > -1
            }
            return De
        }
        var at;
        function wt() {
            if (at)
                return Re;
            at = 1,
            Object.defineProperty(Re, "__esModule", {
                value: !0
            }),
            Re.MuArray = void 0;
            const W = it();
            function ee(Ot, Nt) {
                const Mt = Nt.length
                  , Gt = Ot.length
                  , rr = Math.min(Gt, Mt);
                for (let Zt = 0; Zt < rr; ++Zt)
                    Ot[Zt] = Nt[Zt];
                for (let Zt = Gt; Zt < Mt; ++Zt)
                    Ot.push(Nt[Zt]);
                return Ot.length = Mt,
                Ot
            }
            function ge(Ot) {
                return this.allocCount += 1,
                Ot.slice()
            }
            function Pe(Ot, Nt) {
                const Mt = Ot.length
                  , Gt = Nt.length;
                if (Mt !== Gt)
                    return !1;
                for (let rr = 0; rr < Mt; ++rr)
                    if (Ot[rr] !== Nt[rr])
                        return !1;
                return !0
            }
            function Ce(Ot) {
                return Ot.slice()
            }
            function ke(Ot) {
                return function(Nt, Mt) {
                    const Gt = Mt.length
                      , rr = Nt.length
                      , Zt = Math.min(rr, Gt);
                    for (let ur = 0; ur < Zt; ++ur)
                        Nt[ur] = Ot.assign(Nt[ur], Mt[ur]);
                    for (let ur = rr; ur < Gt; ++ur)
                        Nt.push(Ot.clone(Mt[ur]));
                    for (let ur = Gt; ur < rr; ++ur)
                        Ot.free(Nt[ur]);
                    return Nt.length = Gt,
                    Nt
                }
            }
            function ze(Ot) {
                return function(Nt) {
                    this.allocCount += 1;
                    const Mt = Nt.slice();
                    for (let Gt = 0; Gt < Mt.length; ++Gt)
                        Mt[Gt] = Ot.clone(Mt[Gt]);
                    return Mt
                }
            }
            function Qe(Ot) {
                return function(Nt) {
                    this.freeCount += 1;
                    for (let Mt = 0; Mt < Nt.length; ++Mt)
                        Ot.free(Nt[Mt]);
                    Nt.length = 0
                }
            }
            function st(Ot) {
                return function(Nt, Mt) {
                    const Gt = Nt.length
                      , rr = Mt.length;
                    if (Gt !== rr)
                        return !1;
                    for (let Zt = 0; Zt < Gt; ++Zt)
                        if (!Ot.equal(Nt[Zt], Mt[Zt]))
                            return !1;
                    return !0
                }
            }
            function ft(Ot) {
                return function(Nt) {
                    const Mt = new Array(Nt.length);
                    for (let Gt = 0; Gt < Nt.length; ++Gt)
                        Mt[Gt] = Ot.toJSON(Nt[Gt]);
                    return Mt
                }
            }
            class Xt {
                stats() {
                    return {
                        allocCount: this.allocCount,
                        freeCount: this.freeCount,
                        poolSize: 0
                    }
                }
                constructor(Nt, Mt, Gt) {
                    if (this.muType = "array",
                    this.allocCount = 0,
                    this.freeCount = 0,
                    this.muData = Nt,
                    this.capacity = Mt,
                    Gt) {
                        const rr = this.identity = Gt.slice();
                        for (let Zt = 0; Zt < rr.length; ++Zt)
                            rr[Zt] = Nt.clone(rr[Zt])
                    } else
                        this.identity = [];
                    this.json = {
                        type: "array",
                        valueType: Nt.json,
                        identity: JSON.stringify(this.identity)
                    },
                    (0,
                    W.isMuPrimitiveType)(Nt.muType) ? (this.assign = ee,
                    this.clone = ge,
                    this.free = function(rr) {
                        this.freeCount += 1,
                        rr.length = 0
                    }
                    ,
                    this.equal = Pe,
                    this.toJSON = Ce) : (this.assign = ke(Nt),
                    this.clone = ze(Nt),
                    this.free = Qe(Nt),
                    this.equal = st(Nt),
                    this.toJSON = ft(Nt))
                }
                alloc() {
                    return this.allocCount += 1,
                    []
                }
                diff(Nt, Mt, Gt) {
                    const rr = Mt.length
                      , Zt = Math.ceil(rr / 8);
                    Gt.grow(4 + Zt);
                    const ur = Gt.offset;
                    Gt.writeVarint(rr);
                    let ar = Gt.offset;
                    Gt.offset += Zt;
                    let gr = 0
                      , yr = 0;
                    const vr = Nt.length
                      , Kr = this.muData;
                    for (let Yr = 0; Yr < Math.min(vr, rr); ++Yr)
                        Kr.diff(Nt[Yr], Mt[Yr], Gt) && (gr |= 1 << (Yr & 7),
                        ++yr),
                        (Yr & 7) === 7 && (Gt.writeUint8At(ar++, gr),
                        gr = 0);
                    for (let Yr = vr; Yr < rr; ++Yr)
                        Kr.diff(Kr.identity, Mt[Yr], Gt) && (gr |= 1 << (Yr & 7),
                        ++yr),
                        (Yr & 7) === 7 && (Gt.writeUint8At(ar++, gr),
                        gr = 0);
                    return rr & 7 && Gt.writeUint8At(ar, gr),
                    yr > 0 || vr !== rr ? !0 : (Gt.offset = ur,
                    !1)
                }
                patch(Nt, Mt) {
                    const Gt = Mt.readVarint();
                    if (Gt > this.capacity)
                        throw new RangeError(`target length ${Gt} exceeds capacity ${this.capacity}`);
                    const rr = Nt.length
                      , Zt = Math.min(rr, Gt)
                      , ur = Math.ceil(Gt / 8);
                    let ar = Mt.offset;
                    Mt.offset += ur,
                    this.allocCount += 1;
                    const gr = Nt.slice()
                      , yr = this.muData;
                    gr.length = Zt;
                    let vr = 0;
                    for (let Kr = 0; Kr < Zt; ++Kr) {
                        const Yr = Kr & 7;
                        Yr || (vr = Mt.readUint8At(ar++)),
                        1 << Yr & vr ? gr[Kr] = yr.patch(Nt[Kr], Mt) : gr[Kr] = yr.clone(Nt[Kr])
                    }
                    for (let Kr = rr; Kr < Gt; ++Kr) {
                        const Yr = Kr & 7;
                        Yr || (vr = Mt.readUint8At(ar++)),
                        1 << Yr & vr ? gr.push(yr.patch(yr.identity, Mt)) : gr.push(yr.clone(yr.identity))
                    }
                    return gr
                }
                fromJSON(Nt) {
                    if (Array.isArray(Nt)) {
                        const Mt = new Array(Nt.length)
                          , Gt = this.muData;
                        for (let rr = 0; rr < Nt.length; ++rr)
                            Mt[rr] = Gt.fromJSON(Nt[rr]);
                        return this.allocCount += 1,
                        Mt
                    }
                    return this.clone(this.identity)
                }
            }
            return Re.MuArray = Xt,
            Re
        }
        var Ve = {}, Ee;
        function xe() {
            if (Ee)
                return Ve;
            Ee = 1,
            Object.defineProperty(Ve, "__esModule", {
                value: !0
            }),
            Ve.MuOption = void 0;
            var W;
            (function(ge) {
                ge[ge.BECAME_UNDEFINED = 0] = "BECAME_UNDEFINED",
                ge[ge.BECAME_IDENTITY = 1] = "BECAME_IDENTITY",
                ge[ge.BECAME_DEFINED = 2] = "BECAME_DEFINED",
                ge[ge.STAYED_DEFINED = 3] = "STAYED_DEFINED"
            }
            )(W || (W = {}));
            class ee {
                constructor(Pe, Ce, ke=!1) {
                    this.muType = "option",
                    this.muData = Pe,
                    ke ? this.identity = void 0 : this.identity = Ce !== void 0 ? Pe.clone(Ce) : Pe.clone(Pe.identity),
                    this.json = {
                        type: "option",
                        valueType: Pe.json,
                        identity: JSON.stringify(this.identity)
                    }
                }
                alloc() {
                    return this.muData.alloc()
                }
                free(Pe) {
                    Pe !== void 0 && this.muData.free(Pe)
                }
                equal(Pe, Ce) {
                    return Pe === void 0 && Ce === void 0 ? !0 : Pe !== void 0 && Ce === void 0 || Pe === void 0 && Ce !== void 0 ? !1 : this.muData.equal(Pe, Ce)
                }
                clone(Pe) {
                    if (Pe !== void 0)
                        return this.muData.clone(Pe)
                }
                assign(Pe, Ce) {
                    return Pe !== void 0 && Ce !== void 0 ? this.muData.assign(Pe, Ce) : Ce
                }
                diff(Pe, Ce, ke) {
                    return Pe === void 0 && Ce === void 0 ? !1 : Pe === void 0 && Ce !== void 0 ? (ke.grow(1),
                    this.muData.equal(this.muData.identity, Ce) ? (ke.writeUint8(W.BECAME_IDENTITY),
                    !0) : (ke.writeUint8(W.BECAME_DEFINED),
                    this.muData.diff(this.muData.identity, Ce, ke),
                    !0)) : Pe !== void 0 && Ce === void 0 ? (ke.grow(1),
                    ke.writeUint8(W.BECAME_UNDEFINED),
                    !0) : this.muData.equal(Pe, Ce) ? !1 : (ke.grow(1),
                    ke.writeUint8(W.STAYED_DEFINED),
                    this.muData.diff(Pe, Ce, ke),
                    !0)
                }
                patch(Pe, Ce) {
                    const ke = Ce.readUint8();
                    if (W[ke] === void 0)
                        throw new Error("Panic in muOption, invalid TypeDiff");
                    if (ke != W.BECAME_UNDEFINED) {
                        if (ke == W.BECAME_DEFINED)
                            return this.muData.patch(this.muData.identity, Ce);
                        if (ke === W.BECAME_IDENTITY)
                            return this.muData.clone(this.muData.identity);
                        if (ke !== W.STAYED_DEFINED || Pe === void 0)
                            throw new Error("Panic in muOption, invariants broken");
                        return this.muData.patch(Pe, Ce)
                    }
                }
                toJSON(Pe) {
                    if (Pe !== void 0)
                        return this.muData.toJSON(Pe)
                }
                fromJSON(Pe) {
                    if (Pe !== void 0)
                        return this.muData.fromJSON(Pe)
                }
            }
            return Ve.MuOption = ee,
            Ve
        }
        var $e = {}, nt;
        function rt() {
            if (nt)
                return $e;
            nt = 1,
            Object.defineProperty($e, "__esModule", {
                value: !0
            }),
            $e.MuSortedArray = void 0;
            const W = wt();
            function ee(Ce, ke) {
                return Ce < ke ? -1 : Ce > ke ? 1 : 0
            }
            var ge;
            (function(Ce) {
                Ce[Ce.NONE = -1] = "NONE",
                Ce[Ce.SKIP = 0] = "SKIP",
                Ce[Ce.PATCH = 1] = "PATCH",
                Ce[Ce.INSERT = 2] = "INSERT",
                Ce[Ce.INSERT_IDENTITY = 3] = "INSERT_IDENTITY",
                Ce[Ce.COPY = 4] = "COPY"
            }
            )(ge || (ge = {}));
            class Pe {
                stats() {
                    return this._arraySchema.stats()
                }
                constructor(ke, ze, Qe, st) {
                    this.muType = "sorted-array",
                    this.muData = ke,
                    this.capacity = ze,
                    this.compare = Qe || ee;
                    const ft = this._arraySchema = new W.MuArray(ke,ze,st);
                    this.identity = ft.identity.sort(this.compare),
                    this.json = {
                        type: "sorted-array",
                        valueType: ke.json,
                        identity: JSON.stringify(this.identity)
                    },
                    this.alloc = ft.alloc,
                    this.free = ft.free,
                    this.equal = ft.equal,
                    this.clone = ft.clone,
                    this.assign = ft.assign,
                    this.toJSON = ft.toJSON,
                    this.fromJSON = ft.fromJSON
                }
                diff(ke, ze, Qe) {
                    if (ke.length === 0 && ze.length === 0)
                        return !1;
                    const st = this.muData
                      , ft = this.compare;
                    Qe.grow(8);
                    const Xt = Qe.offset;
                    let Ot = Xt
                      , Nt = 0
                      , Mt = ge.NONE;
                    Qe.offset += 4;
                    let Gt = 0;
                    function rr() {
                        Nt > 0 && (Qe.writeUint32At(Ot, Nt << 3 | Mt),
                        Gt++),
                        Qe.grow(4),
                        Ot = Qe.offset,
                        Qe.offset += 4
                    }
                    let Zt = 0
                      , ur = 0;
                    for (; Zt < ke.length && ur < ze.length; ) {
                        const ar = ke[Zt]
                          , gr = ze[ur]
                          , yr = ft(ar, gr);
                        if (yr < 0)
                            Mt !== ge.SKIP ? (rr(),
                            Nt = 1,
                            Mt = ge.SKIP) : Nt++,
                            Zt++;
                        else if (0 < yr) {
                            if (Mt === ge.INSERT)
                                st.diff(st.identity, gr, Qe) ? Nt++ : (rr(),
                                Mt = ge.INSERT_IDENTITY,
                                Nt = 1);
                            else if (Mt === ge.INSERT_IDENTITY) {
                                const vr = Qe.offset;
                                Qe.grow(4),
                                Qe.offset += 4,
                                st.diff(st.identity, gr, Qe) ? (rr(),
                                Qe.offset -= 4,
                                Ot = vr,
                                Mt = ge.INSERT,
                                Nt = 1) : (Qe.offset -= 4,
                                Nt += 1)
                            } else
                                rr(),
                                Nt = 1,
                                st.diff(st.identity, gr, Qe) ? Mt = ge.INSERT : Mt = ge.INSERT_IDENTITY;
                            ur++
                        } else {
                            if (Mt === ge.PATCH)
                                st.diff(ar, gr, Qe) ? Nt++ : (rr(),
                                Mt = ge.COPY,
                                Nt = 1);
                            else if (Mt === ge.COPY) {
                                const vr = Qe.offset;
                                Qe.grow(4),
                                Qe.offset += 4,
                                st.diff(ar, gr, Qe) ? (rr(),
                                Qe.offset -= 4,
                                Ot = vr,
                                Mt = ge.PATCH,
                                Nt = 1) : (Qe.offset -= 4,
                                Nt += 1)
                            } else
                                rr(),
                                Nt = 1,
                                st.diff(ar, gr, Qe) ? Mt = ge.PATCH : Mt = ge.COPY;
                            Zt++,
                            ur++
                        }
                    }
                    for (Zt < ke.length && (Mt !== ge.SKIP ? (rr(),
                    Nt = ke.length - Zt,
                    Mt = ge.SKIP) : Nt += ke.length - Zt,
                    Zt++); ur < ze.length; ) {
                        const ar = ze[ur];
                        if (Mt === ge.INSERT)
                            st.diff(st.identity, ar, Qe) ? Nt++ : (rr(),
                            Mt = ge.INSERT_IDENTITY,
                            Nt = 1);
                        else if (Mt === ge.INSERT_IDENTITY) {
                            const gr = Qe.offset;
                            Qe.grow(4),
                            Qe.offset += 4,
                            st.diff(st.identity, ar, Qe) ? (rr(),
                            Qe.offset -= 4,
                            Ot = gr,
                            Mt = ge.INSERT,
                            Nt = 1) : (Qe.offset -= 4,
                            Nt += 1)
                        } else
                            rr(),
                            Nt = 1,
                            st.diff(st.identity, ar, Qe) ? Mt = ge.INSERT : Mt = ge.INSERT_IDENTITY;
                        ur++
                    }
                    return Gt === 0 && Mt === ge.COPY && Nt === ke.length ? (Qe.offset = Xt,
                    !1) : (Mt !== ge.SKIP && rr(),
                    Qe.offset -= 4,
                    Qe.writeUint32At(Xt, Gt),
                    !0)
                }
                patch(ke, ze) {
                    this._arraySchema.allocCount += 1;
                    const Qe = this.muData
                      , st = this.alloc()
                      , ft = ze.readUint32();
                    let Xt = 0
                      , Ot = 0;
                    for (let Nt = 0; Nt < ft; ++Nt) {
                        const Mt = ze.readUint32()
                          , Gt = Mt >> 3;
                        if (Ot += Gt,
                        Ot > this.capacity)
                            throw new RangeError(`target length exceeds capacity ${this.capacity}`);
                        switch (Mt & 7) {
                        case ge.INSERT_IDENTITY:
                            for (let Zt = 0; Zt < Gt; ++Zt)
                                st.push(Qe.clone(Qe.identity));
                            break;
                        case ge.INSERT:
                            for (let Zt = 0; Zt < Gt; ++Zt)
                                st.push(Qe.patch(Qe.identity, ze));
                            break;
                        case ge.PATCH:
                            for (let Zt = 0; Zt < Gt; ++Zt)
                                st.push(Qe.patch(ke[Xt++], ze));
                            break;
                        case ge.COPY:
                            for (let Zt = 0; Zt < Gt; ++Zt)
                                st.push(Qe.clone(ke[Xt++]));
                            break;
                        case ge.SKIP:
                            Xt += Gt;
                            break
                        }
                    }
                    return st
                }
            }
            return $e.MuSortedArray = Pe,
            $e
        }
        var me = {}, Le;
        function ct() {
            if (Le)
                return me;
            Le = 1,
            Object.defineProperty(me, "__esModule", {
                value: !0
            }),
            me.MuStruct = void 0;
            const W = {
                boolean: 0,
                uint8: 1,
                uint16: 2,
                uint32: 4,
                int8: 1,
                int16: 2,
                int32: 4,
                float32: 4,
                float64: 8,
                varint: 5,
                rvarint: 5,
                "quantized-float": 5
            }
              , ee = {
                boolean: "readUint8",
                float32: "readFloat32",
                float64: "readFloat64",
                int8: "readInt8",
                int16: "readInt16",
                int32: "readInt32",
                uint8: "readUint8",
                uint16: "readUint16",
                uint32: "readUint32",
                utf8: "readString",
                varint: "readVarint"
            }
              , ge = {
                boolean: "writeUint8",
                float32: "writeFloat32",
                float64: "writeFloat64",
                int8: "writeInt8",
                int16: "writeInt16",
                int32: "writeInt32",
                uint8: "writeUint8",
                uint16: "writeUint16",
                uint32: "writeUint32",
                utf8: "writeString",
                varint: "writeVarint"
            }
              , Pe = Object.keys(W);
            class Ce {
                constructor(ze) {
                    this.muType = "struct";
                    const Qe = Object.keys(ze).sort( (Ht, sr) => {
                        const Ar = Pe.indexOf(ze[Ht].muType);
                        return Pe.indexOf(ze[sr].muType) - Ar || (Ht < sr ? -1 : sr < Ht ? 1 : 0)
                    }
                    )
                      , st = Qe.map(Ht => ze[Ht])
                      , ft = {
                        type: "struct",
                        subTypes: {}
                    };
                    Qe.forEach(Ht => {
                        ft.subTypes[Ht] = ze[Ht].json
                    }
                    );
                    const Xt = []
                      , Ot = [];
                    let Nt = 0;
                    function Mt() {
                        return "_v" + ++Nt
                    }
                    function Gt(Ht) {
                        for (let Ar = 0; Ar < Ot.length; ++Ar)
                            if (Ot[Ar] === Ht)
                                return Xt[Ar];
                        const sr = Mt();
                        return Xt.push(sr),
                        Ot.push(Ht),
                        sr
                    }
                    const rr = Qe.map(Gt)
                      , Zt = st.map(Gt);
                    function ur() {
                        const Ht = []
                          , sr = [];
                        return {
                            vars: Ht,
                            body: sr,
                            toString() {
                                return (Ht.length > 0 ? `var ${Ht.join()};` : "") + sr.join("")
                            },
                            def(Ar) {
                                const Mr = Mt();
                                return Ht.push(Mr),
                                Ar != null && sr.push(`${Mr}=${Ar};`),
                                Mr
                            },
                            append(...Ar) {
                                sr.push.apply(sr, Ar)
                            }
                        }
                    }
                    const ar = ur()
                      , gr = ur();
                    function yr(Ht, sr) {
                        const Ar = ur()
                          , Mr = Ar.toString;
                        return Ar.toString = function() {
                            return `function ${Ht}(${sr.join()}){${Mr()}}`
                        }
                        ,
                        Ar
                    }
                    const vr = {
                        alloc: yr("alloc", []),
                        free: yr("free", ["s"]),
                        equal: yr("equal", ["a", "b"]),
                        clone: yr("clone", ["s"]),
                        assign: yr("assign", ["d", "s"]),
                        diff: yr("diff", ["b", "t", "s"]),
                        patch: yr("patch", ["b", "s"]),
                        toJSON: yr("toJSON", ["s"]),
                        fromJSON: yr("fromJSON", ["j"]),
                        stats: yr("stats", [])
                    }
                      , Kr = ar.def("-1")
                      , Yr = ar.def("0")
                      , Qr = ar.def("[]");
                    ar.append("function MuStruct(){"),
                    rr.forEach( (Ht, sr) => {
                        const Ar = st[sr];
                        switch (Ar.muType) {
                        case "boolean":
                        case "int8":
                        case "int16":
                        case "int32":
                        case "uint8":
                        case "uint16":
                        case "uint32":
                        case "varint":
                        case "rvarint":
                            ar.append(`this[${Ht}]=${Ar.identity};`);
                            break;
                        case "float32":
                        case "float64":
                        case "quantized-float":
                            ar.append(`this[${Ht}]=0.5;this[${Ht}]=${Ar.identity};`);
                            break;
                        case "ascii":
                        case "fixed-ascii":
                        case "utf8":
                            ar.append(`this[${Ht}]=${Gt(Ar.identity)};`);
                            break;
                        default:
                            ar.append(`this[${Ht}]=null;`)
                        }
                    }
                    ),
                    ar.append(`}function _alloc(){++${Kr};if(${Qr}.length>0){return ${Qr}.pop()}return new MuStruct()}`);
                    const tn = ar.def("_alloc()");
                    rr.forEach( (Ht, sr) => {
                        const Ar = st[sr];
                        switch (Ar.muType) {
                        case "ascii":
                        case "fixed-ascii":
                        case "utf8":
                        case "boolean":
                        case "float32":
                        case "float64":
                        case "int8":
                        case "int16":
                        case "int32":
                        case "uint8":
                        case "uint16":
                        case "uint32":
                        case "varint":
                        case "rvarint":
                        case "quantized-float":
                            break;
                        default:
                            ar.append(`${tn}[${Ht}]=${Zt[sr]}.clone(${Gt(Ar.identity)});`);
                            break
                        }
                    }
                    ),
                    vr.alloc.append("var s=_alloc();"),
                    rr.forEach( (Ht, sr) => {
                        switch (st[sr].muType) {
                        case "ascii":
                        case "fixed-ascii":
                        case "utf8":
                        case "boolean":
                        case "float32":
                        case "float64":
                        case "int8":
                        case "int16":
                        case "int32":
                        case "uint8":
                        case "uint16":
                        case "uint32":
                        case "varint":
                        case "rvarint":
                        case "quantized-float":
                            break;
                        default:
                            vr.alloc.append(`s[${Ht}]=${Zt[sr]}.alloc();`);
                            break
                        }
                    }
                    ),
                    vr.alloc.append("return s;"),
                    vr.free.append(`${Qr}.push(s);`),
                    rr.forEach( (Ht, sr) => {
                        switch (st[sr].muType) {
                        case "ascii":
                        case "fixed-ascii":
                        case "utf8":
                        case "boolean":
                        case "float32":
                        case "float64":
                        case "int8":
                        case "int16":
                        case "int32":
                        case "uint8":
                        case "uint16":
                        case "uint32":
                        case "varint":
                        case "rvarint":
                        case "quantized-float":
                            break;
                        default:
                            vr.free.append(`${Zt[sr]}.free(s[${Ht}]);`);
                            break
                        }
                    }
                    ),
                    vr.free.append(`++${Yr};`),
                    rr.forEach( (Ht, sr) => {
                        const Ar = st[sr];
                        switch (Ar.muType) {
                        case "ascii":
                        case "fixed-ascii":
                        case "utf8":
                        case "boolean":
                        case "float32":
                        case "float64":
                        case "int8":
                        case "int16":
                        case "int32":
                        case "uint8":
                        case "uint16":
                        case "uint32":
                        case "varint":
                        case "rvarint":
                            vr.equal.append(`if(a[${Ht}]!==b[${Ht}]){return false}`);
                            break;
                        case "quantized-float":
                            vr.equal.append(`if(((${Ar.invPrecision}*a[${Ht}])>>0)!==((${Ar.invPrecision}*b[${Ht}])>>0)){return false}`);
                            break;
                        default:
                            vr.equal.append(`if(!${Zt[sr]}.equal(a[${Ht}],b[${Ht}])){return false}`)
                        }
                    }
                    ),
                    vr.equal.append("return true;"),
                    vr.clone.append("var c=_alloc();"),
                    rr.forEach( (Ht, sr) => {
                        const Ar = st[sr];
                        switch (Ar.muType) {
                        case "ascii":
                        case "fixed-ascii":
                        case "utf8":
                        case "boolean":
                        case "float32":
                        case "float64":
                        case "int8":
                        case "int16":
                        case "int32":
                        case "uint8":
                        case "uint16":
                        case "uint32":
                        case "varint":
                        case "rvarint":
                            vr.clone.append(`c[${Ht}]=s[${Ht}];`);
                            break;
                        case "quantized-float":
                            vr.clone.append(`c[${Ht}]=((${Ar.invPrecision}*s[${Ht}])>>0)*${Ar.precision};`);
                            break;
                        default:
                            vr.clone.append(`c[${Ht}]=${Zt[sr]}.clone(s[${Ht}]);`);
                            break
                        }
                    }
                    ),
                    vr.clone.append("return c;"),
                    rr.forEach( (Ht, sr) => {
                        const Ar = st[sr];
                        switch (Ar.muType) {
                        case "ascii":
                        case "fixed-ascii":
                        case "utf8":
                        case "boolean":
                        case "float32":
                        case "float64":
                        case "int8":
                        case "int16":
                        case "int32":
                        case "uint8":
                        case "uint16":
                        case "uint32":
                        case "varint":
                        case "rvarint":
                            vr.assign.append(`d[${Ht}]=s[${Ht}];`);
                            break;
                        case "quantized-float":
                            vr.assign.append(`d[${Ht}]=((${Ar.invPrecision}*s[${Ht}])>>0)*${Ar.precision};`);
                            break;
                        default:
                            vr.assign.append(`d[${Ht}]=${Zt[sr]}.assign(d[${Ht}],s[${Ht}]);`)
                        }
                    }
                    ),
                    vr.assign.append("return d;");
                    const rn = Qe.length
                      , An = Math.ceil(rn / 8);
                    let Xn = An;
                    for (let Ht = 0; Ht < st.length; ++Ht) {
                        const sr = st[Ht].muType;
                        sr in W && (Xn += W[sr])
                    }
                    vr.diff.append(`var head=s.offset;var tr=0;var np=0;s.grow(${Xn});s.offset+=${An};`),
                    rr.forEach( (Ht, sr) => {
                        const Ar = st[sr].muType;
                        switch (Ar) {
                        case "boolean":
                            vr.diff.append(`if(b[${Ht}]!==t[${Ht}]){++np;tr|=${1 << (sr & 7)}}`);
                            break;
                        case "float32":
                        case "float64":
                        case "int8":
                        case "int16":
                        case "int32":
                        case "uint8":
                        case "uint16":
                        case "uint32":
                        case "varint":
                        case "utf8":
                            vr.diff.append(`if(b[${Ht}]!==t[${Ht}]){s.${ge[Ar]}(t[${Ht}]);++np;tr|=${1 << (sr & 7)}}`);
                            break;
                        case "rvarint":
                            vr.diff.append(`if(b[${Ht}]!==t[${Ht}]){s.writeVarint(0xAAAAAAAA+(t[${Ht}]-b[${Ht}])^0xAAAAAAAA);++np;tr|=${1 << (sr & 7)}}`);
                            break;
                        case "ascii":
                            vr.diff.append(`if(b[${Ht}]!==t[${Ht}]){s.grow(5+t[${Ht}].length);s.writeVarint(t[${Ht}].length);s.writeASCII(t[${Ht}]);++np;tr|=${1 << (sr & 7)}}`);
                            break;
                        case "quantized-float":
                            const Mr = vr.diff.def(`(${st[sr].invPrecision}*b[${Ht}])>>0`)
                              , Dr = vr.diff.def(`(${st[sr].invPrecision}*t[${Ht}])>>0`);
                            vr.diff.append(`if(${Mr}!==${Dr}){s.writeVarint((0xAAAAAAAA+(${Dr}-${Mr})^0xAAAAAAAA)>>>0);++np;tr|=${1 << (sr & 7)};}`);
                            break;
                        default:
                            vr.diff.append(`if(${Zt[sr]}.diff(b[${Ht}],t[${Ht}],s)){++np;tr|=${1 << (sr & 7)}}`)
                        }
                        (sr & 7) === 7 && vr.diff.append(`s.writeUint8At(head+${sr >> 3},tr);tr=0;`)
                    }
                    ),
                    rn & 7 && vr.diff.append(`s.writeUint8At(head+${An - 1},tr);`),
                    vr.diff.append("if(np){return true}else{s.offset=head;return false}"),
                    vr.patch.append(`var t=_alloc(b);var head=s.offset;var tr=0;s.offset+=${An};`),
                    rr.forEach( (Ht, sr) => {
                        sr & 7 || vr.patch.append(`tr=s.readUint8At(head+${sr >> 3});`);
                        const Ar = st[sr]
                          , Mr = Ar.muType;
                        switch (vr.patch.append(`;t[${Ht}]=(tr&${1 << (sr & 7)})?`),
                        Mr) {
                        case "boolean":
                            vr.patch.append(`!b[${Ht}]:b[${Ht}];`);
                            break;
                        case "float32":
                        case "float64":
                        case "int8":
                        case "int16":
                        case "int32":
                        case "uint8":
                        case "uint16":
                        case "uint32":
                        case "utf8":
                        case "varint":
                            vr.patch.append(`s.${ee[Mr]}():b[${Ht}];`);
                            break;
                        case "rvarint":
                            vr.patch.append(`b[${Ht}]+((0xAAAAAAAA^s.readVarint())-0xAAAAAAAA>>0):b[${Ht}];`);
                            break;
                        case "ascii":
                            vr.patch.append(`s.readASCII(s.readVarint()):b[${Ht}];`);
                            break;
                        case "quantized-float":
                            vr.patch.append(`(((${Ar.invPrecision}*b[${Ht}])>>0)+(((0xAAAAAAAA^s.readVarint())-0xAAAAAAAA)>>0))*${Ar.precision}:b[${Ht}];`);
                            break;
                        default:
                            vr.patch.append(`${Zt[sr]}.patch(b[${Ht}],s):${Zt[sr]}.clone(b[${Ht}]);`)
                        }
                    }
                    ),
                    vr.patch.append("return t;"),
                    vr.toJSON.append("var j={};"),
                    rr.forEach( (Ht, sr) => {
                        vr.toJSON.append(`j[${Ht}]=${Zt[sr]}.toJSON(s[${Ht}]);`)
                    }
                    ),
                    vr.toJSON.append("return j;"),
                    vr.fromJSON.append("var s=_alloc();"),
                    vr.fromJSON.append("if(Object.prototype.toString.call(j)==='[object Object]'){"),
                    rr.forEach( (Ht, sr) => {
                        vr.fromJSON.append(`s[${Ht}]=${Zt[sr]}.fromJSON(j[${Ht}]);`)
                    }
                    ),
                    vr.fromJSON.append("}"),
                    vr.fromJSON.append("return s;"),
                    vr.stats.append(`return {allocCount:${Kr},freeCount:${Yr},poolSize:${Qr}.length};`);
                    const Dn = ar.def("{}");
                    rr.forEach( (Ht, sr) => {
                        ar.append(`${Dn}[${Ht}]=${Zt[sr]};`)
                    }
                    ),
                    gr.append(`return {identity:${tn},muData:${Dn},pool:${Qr},`),
                    Object.keys(vr).forEach(Ht => {
                        ar.append(vr[Ht].toString()),
                        gr.append(`${Ht}:${Ht},`)
                    }
                    ),
                    gr.append("}"),
                    ar.append(gr.toString()),
                    Xt.push(ar.toString());
                    const ir = Function.apply(null, Xt).apply(null, Ot);
                    this.json = ft,
                    this.muData = ir.muData,
                    this.identity = ir.identity,
                    this.pool = ir.pool,
                    this.alloc = ir.alloc,
                    this.free = ir.free,
                    this.equal = ir.equal,
                    this.clone = ir.clone,
                    this.assign = ir.assign,
                    this.diff = ir.diff,
                    this.patch = ir.patch,
                    this.toJSON = ir.toJSON,
                    this.fromJSON = ir.fromJSON,
                    this.stats = ir.stats
                }
            }
            return me.MuStruct = Ce,
            me
        }
        var He = {}, Je;
        function ht() {
            if (Je)
                return He;
            Je = 1,
            Object.defineProperty(He, "__esModule", {
                value: !0
            }),
            He.MuUnion = void 0;
            class W {
                constructor(ge, Pe) {
                    this.muType = "union",
                    this.muData = ge,
                    this._types = Object.keys(ge).sort(),
                    Pe ? this.identity = {
                        type: Pe,
                        data: ge[Pe].identity
                    } : this.identity = {
                        type: "",
                        data: void 0
                    };
                    const Ce = {};
                    Object.keys(ge).forEach(ke => {
                        Ce[ke] = ge[ke].json
                    }
                    ),
                    this.json = {
                        type: "union",
                        identity: this.identity.type,
                        data: Ce
                    }
                }
                alloc() {
                    const ge = this.identity.type;
                    return {
                        type: ge,
                        data: ge ? this.muData[ge].clone(this.identity.data) : void 0
                    }
                }
                free(ge) {
                    const Pe = this.muData[ge.type];
                    Pe && Pe.free(ge.data)
                }
                equal(ge, Pe) {
                    return ge.type !== Pe.type ? !1 : ge.type === "" ? !0 : this.muData[ge.type].equal(ge.data, Pe.data)
                }
                clone(ge) {
                    const Pe = ge.type;
                    return {
                        type: Pe,
                        data: Pe ? this.muData[Pe].clone(ge.data) : void 0
                    }
                }
                assign(ge, Pe) {
                    const Ce = ge.type
                      , ke = Pe.type
                      , ze = this.muData;
                    return ge.type = Pe.type,
                    ge.type !== Ce ? (ze[Ce] && ze[Ce].free(ge.data),
                    ke ? ze[ke] && (ge.data = ze[ke].clone(Pe.data)) : ge.data = void 0,
                    ge) : (ze[Ce] && (ge.data = ze[Ce].assign(ge.data, Pe.data)),
                    ge)
                }
                diff(ge, Pe, Ce) {
                    Ce.grow(8);
                    const ke = Ce.offset;
                    ++Ce.offset;
                    let ze = 0;
                    const Qe = this.muData[Pe.type];
                    return ge.type === Pe.type ? Qe.diff(ge.data, Pe.data, Ce) && (ze = 1) : (Ce.writeUint8(this._types.indexOf(Pe.type)),
                    Qe.diff(Qe.identity, Pe.data, Ce) ? ze = 2 : ze = 4),
                    ze ? (Ce.writeUint8At(ke, ze),
                    !0) : (Ce.offset = ke,
                    !1)
                }
                patch(ge, Pe) {
                    const Ce = this.clone(ge)
                      , ke = Pe.readUint8();
                    if (ke === 1)
                        Ce.data = this.muData[Ce.type].patch(Ce.data, Pe);
                    else {
                        Ce.type = this._types[Pe.readUint8()];
                        const ze = this.muData[Ce.type];
                        if (ke === 2)
                            Ce.data = ze.patch(ze.identity, Pe);
                        else if (ke === 4)
                            Ce.data = ze.clone(ze.identity);
                        else
                            throw new Error(`invalid opcode ${ke}`)
                    }
                    return Ce
                }
                toJSON(ge) {
                    return {
                        type: ge.type,
                        data: this.muData[ge.type].toJSON(ge.data)
                    }
                }
                fromJSON(ge) {
                    if (typeof ge == "object" && ge) {
                        const Pe = ge.type;
                        if (typeof Pe == "string" && Pe in this.muData)
                            return {
                                type: Pe,
                                data: this.muData[Pe].fromJSON(ge.data)
                            }
                    }
                    return this.clone(this.identity)
                }
            }
            return He.MuUnion = W,
            He
        }
        var Fe = {}, Tt;
        function vt() {
            if (Tt)
                return Fe;
            Tt = 1,
            Object.defineProperty(Fe, "__esModule", {
                value: !0
            }),
            Fe.MuBytes = void 0;
            class W {
                constructor(ge) {
                    this.muType = "bytes",
                    this.pool = {},
                    ge ? this.identity = ge.slice() : this.identity = new Uint8Array(1),
                    this.json = {
                        type: "bytes",
                        identity: `[${Array.prototype.slice.call(this.identity).join()}]`
                    }
                }
                _allocBytes(ge) {
                    return this.pool[ge] && this.pool[ge].pop() || new Uint8Array(ge)
                }
                alloc() {
                    return this._allocBytes(this.identity.length)
                }
                free(ge) {
                    const Pe = ge.length;
                    this.pool[Pe] || (this.pool[Pe] = []),
                    this.pool[Pe].push(ge)
                }
                equal(ge, Pe) {
                    if (ge.length !== Pe.length)
                        return !1;
                    for (let Ce = ge.length - 1; Ce >= 0; --Ce)
                        if (ge[Ce] !== Pe[Ce])
                            return !1;
                    return !0
                }
                clone(ge) {
                    const Pe = this._allocBytes(ge.length);
                    return Pe.set(ge),
                    Pe
                }
                assign(ge, Pe) {
                    if (ge.length !== Pe.length)
                        throw new Error("dst and src are of different lengths");
                    return ge.set(Pe),
                    ge
                }
                diff(ge, Pe, Ce) {
                    const ke = Pe.length;
                    return Ce.grow(5 + ke),
                    Ce.writeVarint(ke),
                    Ce.buffer.uint8.set(Pe, Ce.offset),
                    Ce.offset += ke,
                    !0
                }
                patch(ge, Pe) {
                    const Ce = Pe.readVarint()
                      , ke = this._allocBytes(Ce)
                      , ze = Pe.buffer.uint8.subarray(Pe.offset, Pe.offset += Ce);
                    return ke.set(ze),
                    ke
                }
                toJSON(ge) {
                    const Pe = new Array(ge.length);
                    for (let Ce = 0; Ce < Pe.length; ++Ce)
                        Pe[Ce] = ge[Ce];
                    return Pe
                }
                fromJSON(ge) {
                    if (Array.isArray(ge)) {
                        const Pe = this._allocBytes(ge.length);
                        return Pe.set(ge),
                        Pe
                    }
                    return this.clone(this.identity)
                }
            }
            return Fe.MuBytes = W,
            Fe
        }
        var Oe = {}, _t;
        function Ut() {
            if (_t)
                return Oe;
            _t = 1,
            Object.defineProperty(Oe, "__esModule", {
                value: !0
            }),
            Oe.MuDictionary = void 0;
            const W = it();
            function ee(Ce, ke) {
                const ze = Object.keys(Ce)
                  , Qe = Object.keys(ke);
                for (let st = 0; st < ze.length; ++st) {
                    const ft = ze[st];
                    ft in ke || delete Ce[ft]
                }
                for (let st = 0; st < Qe.length; ++st) {
                    const ft = Qe[st];
                    Ce[ft] = ke[ft]
                }
                return Ce
            }
            function ge(Ce) {
                return (ke, ze) => {
                    const Qe = Object.keys(ke)
                      , st = Object.keys(ze);
                    for (let ft = 0; ft < Qe.length; ++ft) {
                        const Xt = Qe[ft];
                        Xt in ze || (Ce.free(ke[Xt]),
                        delete ke[Xt])
                    }
                    for (let ft = 0; ft < st.length; ++ft) {
                        const Xt = st[ft];
                        Xt in ke ? ke[Xt] = Ce.assign(ke[Xt], ze[Xt]) : ke[Xt] = Ce.clone(ze[Xt])
                    }
                    return ke
                }
            }
            class Pe {
                stats() {
                    return {
                        allocCount: this.allocCount,
                        freeCount: this.freeCount,
                        poolSize: 0
                    }
                }
                constructor(ke, ze, Qe) {
                    if (this.muType = "dictionary",
                    this._isPrimitive = !1,
                    this.allocCount = 0,
                    this.freeCount = 0,
                    this.muData = ke,
                    this.capacity = ze,
                    this.identity = {},
                    Qe) {
                        const st = Object.keys(Qe);
                        for (let ft = 0; ft < st.length; ++ft) {
                            const Xt = st[ft];
                            this.identity[Xt] = ke.clone(Qe[Xt])
                        }
                    }
                    this.json = {
                        type: "dictionary",
                        valueType: ke.json,
                        identity: JSON.stringify(this.identity)
                    },
                    this._isPrimitive = (0,
                    W.isMuPrimitiveType)(ke.muType),
                    this._isPrimitive ? this.assign = ee : this.assign = ge(ke)
                }
                alloc() {
                    return this.allocCount += 1,
                    {}
                }
                free(ke) {
                    if (this.freeCount += 1,
                    !this._isPrimitive) {
                        const ze = Object.keys(ke)
                          , Qe = this.muData;
                        for (let st = 0; st < ze.length; ++st)
                            Qe.free(ke[ze[st]])
                    }
                }
                equal(ke, ze) {
                    const Qe = Object.keys(ke)
                      , st = Object.keys(ze);
                    if (Qe.length !== st.length)
                        return !1;
                    for (let Xt = Qe.length - 1; Xt >= 0; --Xt)
                        if (!(Qe[Xt]in ze))
                            return !1;
                    const ft = this.muData;
                    for (let Xt = 0; Xt < Qe.length; ++Xt) {
                        const Ot = Qe[Xt];
                        if (!ft.equal(ke[Ot], ze[Ot]))
                            return !1
                    }
                    return !0
                }
                clone(ke) {
                    if (this.allocCount += 1,
                    this._isPrimitive)
                        return Object.assign({}, ke);
                    {
                        const ze = {}
                          , Qe = Object.keys(ke)
                          , st = this.muData;
                        for (let ft = 0; ft < Qe.length; ++ft) {
                            const Xt = Qe[ft];
                            ze[Xt] = st.clone(ke[Xt])
                        }
                        return ze
                    }
                }
                diff(ke, ze, Qe) {
                    let st = 0
                      , ft = 0
                      , Xt = 0;
                    Qe.grow(12);
                    const Ot = Qe.offset;
                    Qe.offset += 12;
                    const Nt = Object.keys(ke).sort();
                    Qe.grow(5 * Nt.length);
                    for (let gr = 0; gr < Nt.length; ++gr)
                        Nt[gr]in ze || (++st,
                        Qe.writeVarint(gr));
                    const Mt = Object.keys(ze)
                      , Gt = this.muData
                      , rr = [];
                    for (let gr = 0; gr < Mt.length; ++gr) {
                        const yr = Mt[gr];
                        if (yr in ke) {
                            const vr = Qe.offset;
                            Qe.grow(5),
                            Qe.writeVarint(Nt.indexOf(yr)),
                            Gt.diff(ke[yr], ze[yr], Qe) ? ++ft : Qe.offset = vr
                        } else
                            rr.push(yr)
                    }
                    Xt = rr.length;
                    const Zt = Math.ceil(Xt / 8);
                    Qe.grow(Zt);
                    let ur = Qe.offset;
                    Qe.offset += Zt;
                    let ar = 0;
                    for (let gr = 0; gr < Xt; ++gr) {
                        const yr = rr[gr];
                        Qe.writeString(yr),
                        Gt.diff(Gt.identity, ze[yr], Qe) && (ar |= 1 << (gr & 7)),
                        (gr & 7) === 7 && (Qe.writeUint8At(ur++, ar),
                        ar = 0)
                    }
                    return Xt & 7 && Qe.writeUint8At(ur, ar),
                    st > 0 || ft > 0 || Xt > 0 ? (Qe.writeUint32At(Ot, st),
                    Qe.writeUint32At(Ot + 4, ft),
                    Qe.writeUint32At(Ot + 8, Xt),
                    !0) : (Qe.offset = Ot,
                    !1)
                }
                patch(ke, ze) {
                    const Qe = ze.readUint32()
                      , st = ze.readUint32()
                      , ft = ze.readUint32()
                      , Xt = Object.keys(ke).sort()
                      , Ot = Xt.length - Qe + ft;
                    if (Ot > this.capacity)
                        throw new Error(`number of target props ${Ot} exceeds capacity ${this.capacity}`);
                    const Nt = {}
                      , Mt = this.muData
                      , Gt = {};
                    for (let ar = 0; ar < Qe; ++ar)
                        Gt[Xt[ze.readVarint()]] = !0;
                    for (let ar = 0; ar < Xt.length; ++ar) {
                        const gr = Xt[ar];
                        Gt[gr] || (Nt[gr] = Mt.clone(ke[gr]))
                    }
                    for (let ar = 0; ar < st; ++ar) {
                        const gr = ze.readVarint()
                          , yr = Xt[gr];
                        if (!yr)
                            throw new Error("invalid index of key");
                        Nt[yr] = Mt.patch(ke[yr], ze)
                    }
                    const rr = ft / 8 | 0
                      , Zt = Math.ceil(ft / 8);
                    let ur = ze.offset;
                    ze.offset += Zt;
                    for (let ar = 0; ar < rr; ++ar) {
                        const gr = ze.readUint8At(ur++);
                        for (let yr = 0; yr < 8; ++yr)
                            Nt[ze.readString()] = gr & 1 << yr ? Mt.patch(Mt.identity, ze) : Mt.clone(Mt.identity)
                    }
                    if (ft & 7) {
                        const ar = ze.readUint8At(ur);
                        for (let gr = 0; gr < (ft & 7); ++gr)
                            Nt[ze.readString()] = ar & 1 << gr ? Mt.patch(Mt.identity, ze) : Mt.clone(Mt.identity)
                    }
                    return this.allocCount += 1,
                    Nt
                }
                toJSON(ke) {
                    const ze = {}
                      , Qe = Object.keys(ke)
                      , st = this.muData;
                    for (let ft = 0; ft < Qe.length; ++ft) {
                        const Xt = Qe[ft];
                        ze[Xt] = st.toJSON(ke[Xt])
                    }
                    return ze
                }
                fromJSON(ke) {
                    if (this.allocCount += 1,
                    Object.prototype.toString.call(ke) === "[object Object]") {
                        const ze = {}
                          , Qe = Object.keys(ke)
                          , st = this.muData;
                        for (let ft = 0; ft < Qe.length; ++ft) {
                            const Xt = Qe[ft];
                            ze[Xt] = st.fromJSON(ke[Xt])
                        }
                        return ze
                    }
                    return this.clone(this.identity)
                }
            }
            return Oe.MuDictionary = Pe,
            Oe
        }
        var Ie = {}, Ne;
        function Ue() {
            if (Ne)
                return Ie;
            Ne = 1,
            Object.defineProperty(Ie, "__esModule", {
                value: !0
            }),
            Ie.MuVector = void 0;
            const W = {
                float32: Float32Array,
                float64: Float64Array,
                int8: Int8Array,
                int16: Int16Array,
                int32: Int32Array,
                uint8: Uint8Array,
                uint16: Uint16Array,
                uint32: Uint32Array
            };
            class ee {
                stats() {
                    return {
                        allocCount: this.allocCount,
                        freeCount: this.freeCount,
                        poolSize: this.pool.length
                    }
                }
                constructor(Pe, Ce) {
                    this.muType = "vector",
                    this.allocCount = 0,
                    this.freeCount = 0,
                    this.pool = [],
                    this.muData = Pe,
                    this.dimension = Ce,
                    this.TypedArray = W[Pe.muType],
                    this.identity = new this.TypedArray(Ce);
                    for (let ke = 0; ke < Ce; ++ke)
                        this.identity[ke] = Pe.identity;
                    this.json = {
                        type: "vector",
                        valueType: Pe.json,
                        dimension: Ce
                    },
                    this.__b = new this.TypedArray(Ce),
                    this.__t = new this.TypedArray(Ce),
                    this._b = new Uint8Array(this.__b.buffer),
                    this._t = new Uint8Array(this.__t.buffer)
                }
                alloc() {
                    return this.allocCount++,
                    this.pool.pop() || new this.TypedArray(this.dimension)
                }
                free(Pe) {
                    this.freeCount++,
                    this.pool.push(Pe)
                }
                equal(Pe, Ce) {
                    if (!(Pe instanceof this.TypedArray) || !(Ce instanceof this.TypedArray) || Pe.length !== Ce.length)
                        return !1;
                    for (let ke = Pe.length - 1; ke >= 0; --ke)
                        if (Pe[ke] !== Ce[ke])
                            return !1;
                    return !0
                }
                clone(Pe) {
                    const Ce = this.alloc();
                    return Ce.set(Pe),
                    Ce
                }
                assign(Pe, Ce) {
                    return Pe.set(Ce),
                    Pe
                }
                diff(Pe, Ce, ke) {
                    this.__b.set(Pe),
                    this.__t.set(Ce);
                    const ze = this.identity.byteLength;
                    ke.grow(Math.ceil(ze * 9 / 8));
                    const Qe = ke.offset;
                    let st = Qe;
                    ke.offset += Math.ceil(ze / 8);
                    let ft = 0
                      , Xt = 0;
                    for (let Ot = 0; Ot < ze; ++Ot)
                        this._b[Ot] !== this._t[Ot] && (ke.writeUint8(this._t[Ot]),
                        ft |= 1 << (Ot & 7),
                        ++Xt),
                        (Ot & 7) === 7 && (ke.writeUint8At(st++, ft),
                        ft = 0);
                    return Xt === 0 ? (ke.offset = Qe,
                    !1) : (ze & 7 && ke.writeUint8At(st, ft),
                    !0)
                }
                patch(Pe, Ce) {
                    const ke = Ce.offset
                      , ze = this.dimension * this.identity.BYTES_PER_ELEMENT
                      , Qe = Math.floor(ze / 8)
                      , st = Math.ceil(ze / 8);
                    Ce.offset = ke + st,
                    this.__b.set(Pe);
                    for (let ft = 0; ft < Qe; ++ft) {
                        const Xt = ft * 8
                          , Ot = Ce.readUint8At(ke + ft);
                        for (let Nt = 0; Nt < 8; ++Nt)
                            Ot & 1 << Nt && (this._b[Xt + Nt] = Ce.readUint8())
                    }
                    if (ze & 7) {
                        const ft = Qe * 8
                          , Xt = Ce.readUint8At(ke + Qe)
                          , Ot = ze & 7;
                        for (let Nt = 0; Nt < Ot; ++Nt)
                            Xt & 1 << Nt && (this._b[ft + Nt] = Ce.readUint8())
                    }
                    return this.clone(this.__b)
                }
                toJSON(Pe) {
                    const Ce = new Array(Pe.length);
                    for (let ke = 0; ke < Ce.length; ++ke)
                        Ce[ke] = Pe[ke];
                    return Ce
                }
                fromJSON(Pe) {
                    if (Array.isArray(Pe)) {
                        const Ce = this.alloc();
                        for (let ke = 0; ke < Ce.length; ++ke)
                            Ce[ke] = this.muData.fromJSON(Pe[ke]);
                        return Ce
                    }
                    return this.clone(this.identity)
                }
            }
            return Ie.MuVector = ee,
            Ie
        }
        var ot = {}, gt;
        function qt() {
            if (gt)
                return ot;
            gt = 1,
            Object.defineProperty(ot, "__esModule", {
                value: !0
            }),
            ot.MuDate = void 0;
            class W {
                constructor(ge) {
                    this.muType = "date",
                    this.identity = new Date(0),
                    ge && this.identity.setTime(ge.getTime()),
                    this.json = {
                        type: "date",
                        identity: this.identity.toISOString()
                    }
                }
                alloc() {
                    return new Date
                }
                free(ge) {}
                equal(ge, Pe) {
                    return ge.getTime() === Pe.getTime()
                }
                clone(ge) {
                    const Pe = this.alloc();
                    return Pe.setTime(ge.getTime()),
                    Pe
                }
                assign(ge, Pe) {
                    return ge.setTime(Pe.getTime()),
                    ge
                }
                diff(ge, Pe, Ce) {
                    const ke = ge.getTime()
                      , ze = Pe.getTime();
                    return ke !== ze ? (Ce.grow(10),
                    Ce.writeVarint(ze % 268435456),
                    Ce.writeVarint(ze / 268435456 | 0),
                    !0) : !1
                }
                patch(ge, Pe) {
                    const Ce = this.alloc()
                      , ke = Pe.readVarint()
                      , ze = Pe.readVarint();
                    return Ce.setTime(ke + 268435456 * ze),
                    Ce
                }
                toJSON(ge) {
                    return ge.toISOString()
                }
                fromJSON(ge) {
                    return typeof ge == "string" ? new Date(ge) : this.clone(this.identity)
                }
            }
            return ot.MuDate = W,
            ot
        }
        var It = {}, cr;
        function kr() {
            return cr || (cr = 1,
            function(W) {
                Object.defineProperty(W, "__esModule", {
                    value: !0
                }),
                W.MuJSON = W.deepClone = W.deepEqual = void 0;
                function ee(Ce, ke) {
                    if (Ce === ke)
                        return !0;
                    if (Ce && ke && typeof Ce == "object" && typeof ke == "object") {
                        const ze = Array.isArray(Ce)
                          , Qe = Array.isArray(ke);
                        if (ze !== Qe)
                            return !1;
                        if (ze) {
                            const ft = Ce.length;
                            if (ft !== ke.length)
                                return !1;
                            for (let Xt = ft - 1; Xt >= 0; --Xt)
                                if (!ee(Ce[Xt], ke[Xt]))
                                    return !1;
                            return !0
                        }
                        const st = Object.keys(Ce);
                        if (st.length !== Object.keys(ke).length)
                            return !1;
                        for (let ft = 0; ft < st.length; ++ft) {
                            const Xt = st[ft];
                            if (!ke.hasOwnProperty(Xt) || !ee(Ce[Xt], ke[Xt]))
                                return !1
                        }
                        return !0
                    }
                    return Ce !== Ce && ke !== ke
                }
                function ge(Ce) {
                    if (typeof Ce != "object" || Ce === null)
                        return Ce;
                    const ke = Array.isArray(Ce) ? [] : {};
                    if (Array.isArray(ke)) {
                        ke.length = Ce.length;
                        for (let ze = 0; ze < Ce.length; ++ze)
                            ke[ze] = ge(Ce[ze])
                    } else {
                        const ze = Object.keys(Ce);
                        for (let Qe = 0; Qe < ze.length; ++Qe) {
                            const st = ze[Qe];
                            ke[st] = ge(Ce[st])
                        }
                    }
                    return ke
                }
                W.deepEqual = ee,
                W.deepClone = ge;
                class Pe {
                    constructor(ke) {
                        this.muType = "json",
                        this.identity = ke && ge(ke),
                        this.identity = this.identity || {},
                        this.json = {
                            type: "json",
                            identity: this.identity
                        }
                    }
                    alloc() {
                        return {}
                    }
                    free() {}
                    equal(ke, ze) {
                        return (0,
                        W.deepEqual)(ke, ze)
                    }
                    clone(ke) {
                        return (0,
                        W.deepClone)(ke)
                    }
                    assign(ke, ze) {
                        if (Array.isArray(ke) && Array.isArray(ze)) {
                            ke.length = ze.length;
                            for (let ft = 0; ft < ke.length; ++ft)
                                ke[ft] = (0,
                                W.deepClone)(ze[ft]);
                            return ke
                        }
                        const Qe = Object.keys(ke);
                        for (let ft = 0; ft < Qe.length; ++ft) {
                            const Xt = Qe[ft];
                            Xt in ze || delete ke[Xt]
                        }
                        const st = Object.keys(ze);
                        for (let ft = 0; ft < st.length; ++ft) {
                            const Xt = st[ft];
                            ke[Xt] = (0,
                            W.deepClone)(ze[Xt])
                        }
                        return ke
                    }
                    diff(ke, ze, Qe) {
                        const st = JSON.stringify(ze);
                        return Qe.writeString(st),
                        !0
                    }
                    patch(ke, ze) {
                        return JSON.parse(ze.readString())
                    }
                    toJSON(ke) {
                        return ke
                    }
                    fromJSON(ke) {
                        return typeof ke == "object" && ke ? ke : this.clone(this.identity)
                    }
                }
                W.MuJSON = Pe
            }(It)),
            It
        }
        var Bt;
        function jt() {
            return Bt || (Bt = 1,
            function(W) {
                Object.defineProperty(W, "__esModule", {
                    value: !0
                }),
                W.MuJSON = W.MuDate = W.MuDictionary = W.MuVector = W.MuBytes = W.MuUnion = W.MuStruct = W.MuSortedArray = W.MuOption = W.MuArray = W.MuQuantizedFloat = W.MuRelativeVarint = W.MuVarint = W.MuUint32 = W.MuUint16 = W.MuUint8 = W.MuInt32 = W.MuInt16 = W.MuInt8 = W.MuFloat64 = W.MuFloat32 = W.MuUTF8 = W.MuFixedASCII = W.MuASCII = W.MuBoolean = W.MuVoid = void 0;
                const ee = b();
                Object.defineProperty(W, "MuVoid", {
                    enumerable: !0,
                    get: function() {
                        return ee.MuVoid
                    }
                });
                const ge = T();
                Object.defineProperty(W, "MuBoolean", {
                    enumerable: !0,
                    get: function() {
                        return ge.MuBoolean
                    }
                });
                const Pe = k();
                Object.defineProperty(W, "MuASCII", {
                    enumerable: !0,
                    get: function() {
                        return Pe.MuASCII
                    }
                });
                const Ce = Y();
                Object.defineProperty(W, "MuFixedASCII", {
                    enumerable: !0,
                    get: function() {
                        return Ce.MuFixedASCII
                    }
                });
                const ke = J();
                Object.defineProperty(W, "MuUTF8", {
                    enumerable: !0,
                    get: function() {
                        return ke.MuUTF8
                    }
                });
                const ze = y();
                Object.defineProperty(W, "MuFloat32", {
                    enumerable: !0,
                    get: function() {
                        return ze.MuFloat32
                    }
                });
                const Qe = R();
                Object.defineProperty(W, "MuFloat64", {
                    enumerable: !0,
                    get: function() {
                        return Qe.MuFloat64
                    }
                });
                const st = M();
                Object.defineProperty(W, "MuInt8", {
                    enumerable: !0,
                    get: function() {
                        return st.MuInt8
                    }
                });
                const ft = Q();
                Object.defineProperty(W, "MuInt16", {
                    enumerable: !0,
                    get: function() {
                        return ft.MuInt16
                    }
                });
                const Xt = oe();
                Object.defineProperty(W, "MuInt32", {
                    enumerable: !0,
                    get: function() {
                        return Xt.MuInt32
                    }
                });
                const Ot = se();
                Object.defineProperty(W, "MuUint8", {
                    enumerable: !0,
                    get: function() {
                        return Ot.MuUint8
                    }
                });
                const Nt = Xe();
                Object.defineProperty(W, "MuUint16", {
                    enumerable: !0,
                    get: function() {
                        return Nt.MuUint16
                    }
                });
                const Mt = ce();
                Object.defineProperty(W, "MuUint32", {
                    enumerable: !0,
                    get: function() {
                        return Mt.MuUint32
                    }
                });
                const Gt = be();
                Object.defineProperty(W, "MuVarint", {
                    enumerable: !0,
                    get: function() {
                        return Gt.MuVarint
                    }
                });
                const rr = Ke();
                Object.defineProperty(W, "MuRelativeVarint", {
                    enumerable: !0,
                    get: function() {
                        return rr.MuRelativeVarint
                    }
                });
                const Zt = Te();
                Object.defineProperty(W, "MuQuantizedFloat", {
                    enumerable: !0,
                    get: function() {
                        return Zt.MuQuantizedFloat
                    }
                });
                const ur = wt();
                Object.defineProperty(W, "MuArray", {
                    enumerable: !0,
                    get: function() {
                        return ur.MuArray
                    }
                });
                const ar = xe();
                Object.defineProperty(W, "MuOption", {
                    enumerable: !0,
                    get: function() {
                        return ar.MuOption
                    }
                });
                const gr = rt();
                Object.defineProperty(W, "MuSortedArray", {
                    enumerable: !0,
                    get: function() {
                        return gr.MuSortedArray
                    }
                });
                const yr = ct();
                Object.defineProperty(W, "MuStruct", {
                    enumerable: !0,
                    get: function() {
                        return yr.MuStruct
                    }
                });
                const vr = ht();
                Object.defineProperty(W, "MuUnion", {
                    enumerable: !0,
                    get: function() {
                        return vr.MuUnion
                    }
                });
                const Kr = vt();
                Object.defineProperty(W, "MuBytes", {
                    enumerable: !0,
                    get: function() {
                        return Kr.MuBytes
                    }
                });
                const Yr = Ut();
                Object.defineProperty(W, "MuDictionary", {
                    enumerable: !0,
                    get: function() {
                        return Yr.MuDictionary
                    }
                });
                const Qr = Ue();
                Object.defineProperty(W, "MuVector", {
                    enumerable: !0,
                    get: function() {
                        return Qr.MuVector
                    }
                });
                const tn = qt();
                Object.defineProperty(W, "MuDate", {
                    enumerable: !0,
                    get: function() {
                        return tn.MuDate
                    }
                });
                const rn = kr();
                Object.defineProperty(W, "MuJSON", {
                    enumerable: !0,
                    get: function() {
                        return rn.MuJSON
                    }
                })
            }(l)),
            l
        }
        var bt = jt()
          , $t = new bt.MuVector(new bt.MuFloat32,3)
          , _r = new bt.MuVector(new bt.MuFloat32,4)
          , jr = new bt.MuVector(new bt.MuUint8,3)
          , Gr = new bt.MuVector(new bt.MuUint16,3)
          , on = new bt.MuVector(new bt.MuFloat32,16)
          , en = new bt.MuVector(new bt.MuFloat32,9)
          , un = new bt.MuArray(new bt.MuFloat32,1 / 0)
          , ln = new bt.MuArray(_r,1 / 0)
          , Rt = new bt.MuArray($t,1 / 0)
          , or = new bt.MuArray(new bt.MuFloat32,1 / 0);
        a.ProjectNodeType = void 0,
        function(W) {
            W[W.Root = 0] = "Root",
            W[W.SkinPart = 1] = "SkinPart",
            W[W.Group = 2] = "Group",
            W[W.Bone = 3] = "Bone"
        }(a.ProjectNodeType || (a.ProjectNodeType = {})),
        a.VoxelDimension = void 0,
        function(W) {
            W[W.YZ = 0] = "YZ",
            W[W.XZ = 1] = "XZ",
            W[W.XY = 2] = "XY",
            W[W.XYZ = 3] = "XYZ"
        }(a.VoxelDimension || (a.VoxelDimension = {})),
        a.HitBoxMode = void 0,
        function(W) {
            W[W.Default = 0] = "Default",
            W[W.Custom = 1] = "Custom"
        }(a.HitBoxMode || (a.HitBoxMode = {})),
        a.ChannelNodePath = void 0,
        function(W) {
            W.Rotation = "rotation",
            W.Translation = "translation",
            W.Alpha = "alpha",
            W.Scale = "scale"
        }(a.ChannelNodePath || (a.ChannelNodePath = {})),
        a.ProjectInterpolationType = void 0,
        function(W) {
            W.Step = "STEP",
            W.Linear = "LINEAR",
            W.EaseInSine = "EASE_IN_SINE",
            W.EaseOutSine = "EASE_OUT_SINE",
            W.EaseInOutSine = "EASE_IN_OUT_SINE"
        }(a.ProjectInterpolationType || (a.ProjectInterpolationType = {}));
        function dr(W, ee) {
            switch (W) {
            case a.ProjectInterpolationType.EaseInSine:
                return 1 - Math.cos(ee * Math.PI / 2);
            case a.ProjectInterpolationType.EaseOutSine:
                return Math.sin(ee * Math.PI / 2);
            case a.ProjectInterpolationType.EaseInOutSine:
                return -(Math.cos(Math.PI * ee) - 1) / 2;
            case a.ProjectInterpolationType.Step:
                return ee === 1 ? 1 : 0;
            case a.ProjectInterpolationType.Linear:
                return ee;
            default:
                return ee
            }
        }
        function lr(W, ee, ge) {
            return (1 - ge) * W + ge * ee
        }
        var er = new bt.MuUnion({
            rotation: ln,
            translation: Rt,
            alpha: or,
            scale: Rt
        })
          , Xr = new bt.MuStruct({
            input: un,
            output: er,
            interpolation: new bt.MuASCII(a.ProjectInterpolationType.Linear)
        });
        function Tr(W, ee) {
            var ge = {};
            for (var Pe in W)
                Object.prototype.hasOwnProperty.call(W, Pe) && ee.indexOf(Pe) < 0 && (ge[Pe] = W[Pe]);
            if (W != null && typeof Object.getOwnPropertySymbols == "function")
                for (var Ce = 0, Pe = Object.getOwnPropertySymbols(W); Ce < Pe.length; Ce++)
                    ee.indexOf(Pe[Ce]) < 0 && Object.prototype.propertyIsEnumerable.call(W, Pe[Ce]) && (ge[Pe[Ce]] = W[Pe[Ce]]);
            return ge
        }
        function Br(W, ee, ge, Pe) {
            function Ce(ke) {
                return ke instanceof ge ? ke : new ge(function(ze) {
                    ze(ke)
                }
                )
            }
            return new (ge || (ge = Promise))(function(ke, ze) {
                function Qe(Xt) {
                    try {
                        ft(Pe.next(Xt))
                    } catch (Ot) {
                        ze(Ot)
                    }
                }
                function st(Xt) {
                    try {
                        ft(Pe.throw(Xt))
                    } catch (Ot) {
                        ze(Ot)
                    }
                }
                function ft(Xt) {
                    Xt.done ? ke(Xt.value) : Ce(Xt.value).then(Qe, st)
                }
                ft((Pe = Pe.apply(W, [])).next())
            }
            )
        }
        var pr = {}, Er = {}, Rr;
        function Ir() {
            if (Rr)
                return Er;
            Rr = 1,
            Object.defineProperty(Er, "__esModule", {
                value: !0
            }),
            Er.encode = ee,
            Er.decode = Pe;
            function W(Ce) {
                let ke;
                const ze = Ce.length;
                let Qe;
                const st = [];
                for (let ft = 0; ft < ze; ++ft) {
                    if (ke = Ce.charCodeAt(ft),
                    ke > 55295 && ke < 57344) {
                        if (!Qe) {
                            if (ke > 56319) {
                                st.push(239, 191, 189);
                                continue
                            } else if (ft + 1 === ze) {
                                st.push(239, 191, 189);
                                continue
                            }
                            Qe = ke;
                            continue
                        }
                        if (ke < 56320) {
                            st.push(239, 191, 189),
                            Qe = ke;
                            continue
                        }
                        ke = (Qe - 55296 << 10 | ke - 56320) + 65536
                    } else
                        Qe && st.push(239, 191, 189);
                    if (Qe = void 0,
                    ke < 128)
                        st.push(ke);
                    else if (ke < 2048)
                        st.push(ke >> 6 | 192, ke & 63 | 128);
                    else if (ke < 65536)
                        st.push(ke >> 12 | 224, ke >> 6 & 63 | 128, ke & 63 | 128);
                    else if (ke < 1114112)
                        st.push(ke >> 18 | 240, ke >> 12 & 63 | 128, ke >> 6 & 63 | 128, ke & 63 | 128);
                    else
                        throw new Error("mudb/stream: invalid code point")
                }
                return st
            }
            function ee(Ce) {
                return new Uint8Array(W(Ce))
            }
            function ge(Ce) {
                const ze = Ce.length;
                if (ze <= 4096)
                    return String.fromCharCode.apply(String, Ce);
                let Qe = ""
                  , st = 0;
                for (; st < ze; )
                    Qe += String.fromCharCode.apply(String, Ce.slice(st, st += 4096));
                return Qe
            }
            function Pe(Ce) {
                const {byteLength: ke} = Ce
                  , ze = [];
                let Qe = 0;
                for (; Qe < ke; ) {
                    const st = Ce[Qe];
                    let ft, Xt = st > 239 ? 4 : st > 223 ? 3 : st > 191 ? 2 : 1;
                    if (Qe + Xt <= ke) {
                        let Ot, Nt, Mt, Gt;
                        switch (Xt) {
                        case 1:
                            st < 128 && (ft = st);
                            break;
                        case 2:
                            Ot = Ce[Qe + 1],
                            (Ot & 192) === 128 && (Gt = (st & 31) << 6 | Ot & 63,
                            Gt > 127 && (ft = Gt));
                            break;
                        case 3:
                            Ot = Ce[Qe + 1],
                            Nt = Ce[Qe + 2],
                            (Ot & 192) === 128 && (Nt & 192) === 128 && (Gt = (st & 15) << 12 | (Ot & 63) << 6 | Nt & 63,
                            Gt > 2047 && (Gt < 55296 || Gt > 57343) && (ft = Gt));
                            break;
                        case 4:
                            Ot = Ce[Qe + 1],
                            Nt = Ce[Qe + 2],
                            Mt = Ce[Qe + 3],
                            (Ot & 192) === 128 && (Nt & 192) === 128 && (Mt & 192) === 128 && (Gt = (st & 15) << 18 | (Ot & 63) << 12 | (Nt & 63) << 6 | Mt & 63,
                            Gt > 65535 && Gt < 1114112 && (ft = Gt))
                        }
                    }
                    ft == null ? (ft = 65533,
                    Xt = 1) : ft > 65535 && (ft -= 65536,
                    ze.push(ft >>> 10 & 1023 | 55296),
                    ft = 56320 | ft & 1023),
                    ze.push(ft),
                    Qe += Xt
                }
                return ge(ze)
            }
            return Er
        }
        var Vr;
        function mt() {
            return Vr || (Vr = 1,
            function(W) {
                Object.defineProperty(W, "__esModule", {
                    value: !0
                }),
                W.MuReadStream = W.MuWriteStream = W.MuBuffer = W.decodeUTF8 = W.encodeUTF8 = void 0,
                W.allocBuffer = ke,
                W.freeBuffer = ze;
                const ee = typeof self == "object" && self.Object == Object && self || typeof c == "object" && c.Object == Object && c;
                if (typeof ee == "object" && "TextEncoder"in ee) {
                    const Xt = new TextEncoder;
                    W.encodeUTF8 = Nt => Xt.encode(Nt);
                    const Ot = new TextDecoder;
                    W.decodeUTF8 = Nt => Ot.decode(Nt)
                } else {
                    const Xt = Ir();
                    W.encodeUTF8 = Xt.encode,
                    W.decodeUTF8 = Xt.decode
                }
                function ge(Xt) {
                    let Ot = Xt - 1
                      , Nt = Ot > 65535 ? 16 : 0;
                    Ot >>>= Nt;
                    let Mt = Ot > 255 ? 8 : 0;
                    return Ot >>>= Mt,
                    Nt |= Mt,
                    Mt = Ot > 15 ? 4 : 0,
                    Ot >>>= Mt,
                    Nt |= Mt,
                    Mt = Ot > 3 ? 2 : 0,
                    Ot >>>= Mt,
                    Nt |= Mt,
                    (Nt | Ot >> 1) + 1
                }
                class Pe {
                    constructor(Ot) {
                        this.buffer = Ot,
                        this.dataView = new DataView(Ot),
                        this.uint8 = new Uint8Array(Ot)
                    }
                }
                W.MuBuffer = Pe;
                const Ce = new Array(31);
                for (let Xt = 0; Xt < 31; ++Xt)
                    Ce[Xt] = [];
                function ke(Xt) {
                    if (Xt > 1073741824 || Xt < 0)
                        throw new RangeError(`size out of range: ${Xt}`);
                    Xt = Math.max(2, Xt | 0);
                    const Ot = ge(Xt);
                    return Ce[Ot].pop() || new Pe(new ArrayBuffer(1 << Ot))
                }
                function ze(Xt) {
                    Xt.uint8.length > 0 && Ce[ge(Xt.uint8.length)].push(Xt)
                }
                const Qe = !0;
                class st {
                    constructor(Ot) {
                        this.buffer = ke(Ot),
                        this.offset = 0
                    }
                    bytes() {
                        return this.buffer.uint8.subarray(0, this.offset)
                    }
                    destroy() {
                        ze(this.buffer)
                    }
                    grow(Ot) {
                        const Nt = this.offset + Ot
                          , Mt = this.buffer.uint8;
                        if (Mt.length < Nt) {
                            const Gt = ke(Nt);
                            Gt.uint8.set(Mt),
                            ze(this.buffer),
                            this.buffer = Gt
                        }
                    }
                    writeInt8(Ot) {
                        this.buffer.dataView.setInt8(this.offset, Ot),
                        this.offset += 1
                    }
                    writeInt16(Ot) {
                        this.buffer.dataView.setInt16(this.offset, Ot, Qe),
                        this.offset += 2
                    }
                    writeInt32(Ot) {
                        this.buffer.dataView.setInt32(this.offset, Ot, Qe),
                        this.offset += 4
                    }
                    writeUint8(Ot) {
                        this.buffer.dataView.setUint8(this.offset, Ot),
                        this.offset += 1
                    }
                    writeUint16(Ot) {
                        this.buffer.dataView.setUint16(this.offset, Ot, Qe),
                        this.offset += 2
                    }
                    writeUint32(Ot) {
                        this.buffer.dataView.setUint32(this.offset, Ot, Qe),
                        this.offset += 4
                    }
                    writeFloat32(Ot) {
                        this.buffer.dataView.setFloat32(this.offset, Ot, Qe),
                        this.offset += 4
                    }
                    writeFloat64(Ot) {
                        this.buffer.dataView.setFloat64(this.offset, Ot, Qe),
                        this.offset += 8
                    }
                    writeVarint(Ot) {
                        const Nt = Ot >>> 0
                          , Mt = this.buffer.uint8;
                        let Gt = this.offset;
                        Nt < 128 ? Mt[Gt++] = Nt : Nt < 16384 ? (Mt[Gt++] = Nt & 127 | 128,
                        Mt[Gt++] = Nt >>> 7) : Nt < 2097152 ? (Mt[Gt++] = Nt & 127 | 128,
                        Mt[Gt++] = Nt >> 7 & 127 | 128,
                        Mt[Gt++] = Nt >>> 14) : Nt < 268435456 ? (Mt[Gt++] = Nt & 127 | 128,
                        Mt[Gt++] = Nt >> 7 & 127 | 128,
                        Mt[Gt++] = Nt >> 14 & 127 | 128,
                        Mt[Gt++] = Nt >>> 21) : (Mt[Gt++] = Nt & 127 | 128,
                        Mt[Gt++] = Nt >> 7 & 127 | 128,
                        Mt[Gt++] = Nt >> 14 & 127 | 128,
                        Mt[Gt++] = Nt >> 21 & 127 | 128,
                        Mt[Gt++] = Nt >>> 28),
                        this.offset = Gt
                    }
                    writeASCII(Ot) {
                        const Nt = this.buffer.uint8;
                        let Mt = this.offset;
                        for (let Gt = 0; Gt < Ot.length; ++Gt)
                            Nt[Mt++] = Ot.charCodeAt(Gt);
                        this.offset = Mt
                    }
                    writeString(Ot) {
                        const Nt = (0,
                        W.encodeUTF8)(Ot);
                        this.grow(5 + Nt.length),
                        this.writeVarint(Nt.length),
                        this.buffer.uint8.set(Nt, this.offset),
                        this.offset += Nt.length
                    }
                    writeUint8At(Ot, Nt) {
                        this.buffer.dataView.setUint8(Ot, Nt)
                    }
                    writeUint32At(Ot, Nt) {
                        this.buffer.dataView.setUint32(Ot, Nt, Qe)
                    }
                }
                W.MuWriteStream = st;
                class ft {
                    constructor(Ot) {
                        this.buffer = new Pe(Ot.buffer),
                        this.offset = Ot.byteOffset,
                        this.length = Ot.byteLength + Ot.byteOffset
                    }
                    bytes() {
                        return this.buffer.uint8.subarray(this.offset, this.length)
                    }
                    checkBounds() {
                        if (this.offset > this.length)
                            throw new Error("out of bounds")
                    }
                    readInt8() {
                        const Ot = this.offset;
                        return this.offset += 1,
                        this.checkBounds(),
                        this.buffer.dataView.getInt8(Ot)
                    }
                    readInt16() {
                        const Ot = this.offset;
                        return this.offset += 2,
                        this.checkBounds(),
                        this.buffer.dataView.getInt16(Ot, Qe)
                    }
                    readInt32() {
                        const Ot = this.offset;
                        return this.offset += 4,
                        this.checkBounds(),
                        this.buffer.dataView.getInt32(Ot, Qe)
                    }
                    readUint8() {
                        const Ot = this.offset;
                        return this.offset += 1,
                        this.checkBounds(),
                        this.buffer.dataView.getUint8(Ot)
                    }
                    readUint16() {
                        const Ot = this.offset;
                        return this.offset += 2,
                        this.checkBounds(),
                        this.buffer.dataView.getUint16(Ot, Qe)
                    }
                    readUint32() {
                        const Ot = this.offset;
                        return this.offset += 4,
                        this.checkBounds(),
                        this.buffer.dataView.getUint32(Ot, Qe)
                    }
                    readFloat32() {
                        const Ot = this.offset;
                        return this.offset += 4,
                        this.checkBounds(),
                        this.buffer.dataView.getFloat32(Ot, Qe)
                    }
                    readFloat64() {
                        const Ot = this.offset;
                        return this.offset += 8,
                        this.checkBounds(),
                        this.buffer.dataView.getFloat64(Ot, Qe)
                    }
                    readVarint() {
                        const Ot = this.buffer.uint8;
                        let Nt = this.offset;
                        const Mt = Ot[Nt++];
                        if (Mt < 128)
                            return this.offset = Nt,
                            this.checkBounds(),
                            Mt;
                        const Gt = Ot[Nt++];
                        if (Gt < 128)
                            return this.offset = Nt,
                            this.checkBounds(),
                            Mt & 127 | Gt << 7;
                        const rr = Ot[Nt++];
                        if (rr < 128)
                            return this.offset = Nt,
                            this.checkBounds(),
                            Mt & 127 | (Gt & 127) << 7 | rr << 14;
                        const Zt = Ot[Nt++];
                        if (Zt < 128)
                            return this.offset = Nt,
                            this.checkBounds(),
                            Mt & 127 | (Gt & 127) << 7 | (rr & 127) << 14 | Zt << 21;
                        const ur = Ot[Nt++];
                        return this.offset = Nt,
                        this.checkBounds(),
                        (Mt & 127) + ((Gt & 127) << 7) + ((rr & 127) << 14) + ((Zt & 127) << 21) + ur * (1 << 28)
                    }
                    readASCII(Ot) {
                        const Nt = this.offset;
                        this.offset += Ot,
                        this.checkBounds();
                        let Mt = "";
                        for (let Gt = Nt; Gt < this.offset; ++Gt)
                            Mt += String.fromCharCode(this.buffer.uint8[Gt]);
                        return Mt
                    }
                    readString() {
                        const Ot = this.readVarint()
                          , Nt = this.offset;
                        this.offset += Ot,
                        this.checkBounds();
                        const Mt = this.buffer.uint8.subarray(Nt, this.offset);
                        return (0,
                        W.decodeUTF8)(Mt)
                    }
                    readUint8At(Ot) {
                        return this.buffer.dataView.getUint8(Ot)
                    }
                }
                W.MuReadStream = ft
            }(pr)),
            pr
        }
        var yt = mt()
          , Dt = new bt.MuArray(new bt.MuUint8,1 / 0)
          , Jt = new bt.MuStruct({
            bounds: $t,
            meshes: new bt.MuDictionary(Dt,1 / 0)
        })
          , Pr = Object.freeze({
            __proto__: null,
            MeshSchema: Dt,
            ModelDataV1Schema: Jt
        })
          , Or = new bt.MuStruct({
            mesh: new bt.MuInt32(-1),
            rotation: _r,
            translation: $t,
            children: new bt.MuArray(new bt.MuVarint,1 / 0),
            alpha: new bt.MuFloat32(1)
        })
          , Nr = new bt.MuArray(Or,1 / 0)
          , qr = new bt.MuStruct({
            version: new bt.MuVarint(2),
            bounds: $t,
            nodes: Nr,
            meshes: new bt.MuArray(Dt,1 / 0)
        })
          , Yn = Object.freeze({
            __proto__: null,
            MeshSchema: Dt,
            ModelDataV2Schema: qr,
            ModelNodeSchema: Or,
            ModelNodesSchema: Nr
        })
          , On = new bt.MuStruct({
            version: new bt.MuVarint(3),
            bounds: $t,
            nodes: Nr,
            texture: e.MeshTextureSchema,
            meshes: new bt.MuArray(e.MeshDataSchema,1 / 0)
        })
          , ei = Object.freeze({
            __proto__: null,
            MeshDataSchema: e.MeshDataSchema,
            MeshTextureSchema: e.MeshTextureSchema,
            ModelDataV3Schema: On,
            ModelNodeSchema: Or,
            ModelNodesSchema: Nr
        })
          , Pn = new bt.MuStruct({
            version: new bt.MuVarint(4),
            nodes: Nr,
            texture: e.MeshTextureSchema,
            meshes: new bt.MuArray(e.MeshDataSchema,1 / 0)
        })
          , Wn = Object.freeze({
            __proto__: null,
            MeshDataSchema: e.MeshDataSchema,
            MeshTextureSchema: e.MeshTextureSchema,
            ModelDataV4Schema: Pn,
            ModelNodeSchema: Or,
            ModelNodesSchema: Nr
        })
          , Hn = new bt.MuStruct({
            sampler: new bt.MuVarint,
            target: new bt.MuStruct({
                node: new bt.MuVarint,
                path: new bt.MuASCII
            })
        })
          , Tn = new bt.MuStruct({
            id: new bt.MuASCII,
            name: new bt.MuUTF8,
            channels: new bt.MuArray(Hn,1 / 0),
            samplers: new bt.MuArray(Xr,1 / 0)
        })
          , Fn = new bt.MuStruct({
            version: new bt.MuVarint(5),
            nodes: Nr,
            texture: e.MeshTextureSchema,
            meshes: new bt.MuArray(e.MeshDataSchema,1 / 0),
            animations: new bt.MuArray(Tn,1 / 0)
        })
          , _i = Object.freeze({
            __proto__: null,
            AnimationSchema: Tn,
            ChannelSchema: Hn,
            MeshDataSchema: e.MeshDataSchema,
            MeshTextureSchema: e.MeshTextureSchema,
            ModelDataV5Schema: Fn,
            ModelNodeSchema: Or,
            ModelNodesSchema: Nr
        })
          , nn = new bt.MuStruct({
            sampler: new bt.MuVarint,
            target: new bt.MuStruct({
                node: new bt.MuVarint,
                path: new bt.MuASCII
            })
        })
          , wi = new bt.MuStruct({
            id: new bt.MuASCII,
            name: new bt.MuUTF8,
            channels: new bt.MuArray(nn,1 / 0),
            samplers: new bt.MuArray(Xr,1 / 0)
        })
          , ai = new bt.MuStruct({
            mesh: new bt.MuInt32(-1),
            rotation: _r,
            translation: $t,
            scale: $t,
            children: new bt.MuArray(new bt.MuVarint,1 / 0),
            alpha: new bt.MuFloat32(1)
        })
          , Mn = new bt.MuArray(ai,1 / 0)
          , Ai = new bt.MuStruct({
            version: new bt.MuVarint(6),
            nodes: Mn,
            texture: e.MeshTextureSchema,
            meshes: new bt.MuArray(e.MeshDataSchema,1 / 0),
            animations: new bt.MuArray(wi,1 / 0)
        })
          , mi = Object.freeze({
            __proto__: null,
            AnimationSchema: wi,
            ChannelSchema: nn,
            MeshDataSchema: e.MeshDataSchema,
            MeshTextureSchema: e.MeshTextureSchema,
            ModelDataV6Schema: Ai,
            ModelNodeSchema: ai,
            ModelNodesSchema: Mn
        })
          , yi = new bt.MuStruct({
            sampler: new bt.MuVarint,
            target: new bt.MuStruct({
                node: new bt.MuVarint,
                path: new bt.MuASCII
            })
        })
          , vi = new bt.MuStruct({
            id: new bt.MuASCII,
            name: new bt.MuUTF8,
            channels: new bt.MuArray(yi,1 / 0),
            samplers: new bt.MuArray(Xr,1 / 0)
        })
          , Hr = new bt.MuStruct({
            mesh: new bt.MuInt32(-1),
            rotation: _r,
            translation: $t,
            scale: $t,
            parentScaleMat3: en,
            children: new bt.MuArray(new bt.MuVarint,1 / 0),
            alpha: new bt.MuFloat32(1)
        })
          , an = new bt.MuArray(Hr,1 / 0)
          , Cn = new bt.MuStruct({
            version: new bt.MuVarint(7),
            nodes: an,
            texture: e.MeshTextureSchema,
            meshes: new bt.MuArray(e.MeshDataSchema,1 / 0),
            animations: new bt.MuArray(vi,1 / 0)
        })
          , Gn = Object.freeze({
            __proto__: null,
            AnimationSchema: vi,
            ChannelSchema: yi,
            MeshDataSchema: e.MeshDataSchema,
            MeshTextureSchema: e.MeshTextureSchema,
            ModelDataV7Schema: Cn,
            ModelNodeSchema: Hr,
            ModelNodesSchema: an
        })
          , ti = 7
          , Si = {
            1: Jt,
            2: qr,
            3: On,
            4: Pn,
            5: Fn,
            6: Ai,
            7: Cn
        }
          , fa = 256
          , ha = new Array(fa)
          , ao = new Array(fa);
        for (let W = 0; W < fa; ++W)
            ha[W] = ao[W] = 0;
        var Po = 4
          , yo = 3
          , So = Po * yo
          , Zi = [];
        function Wi(W) {
            return W * 8 >>> 0
        }
        var oo = Wi(0)
          , is = Wi(1)
          , as = Wi(2)
          , pa = Wi(3);
        function Vi(W, ee, ge, Pe) {
            return (W << oo >>> 0 | ee << is >>> 0 | ge << as >>> 0 | Pe << pa >>> 0) >>> 0
        }
        var Wa = [0 << pa >>> 0, 153 << pa >>> 0, 204 << pa >>> 0, 255 << pa >>> 0];
        function os(W) {
            if (W.readInt32() !== -11)
                return null;
            const ge = W.readVarint()
              , Pe = W.readVarint()
              , Ce = W.readVarint();
            for (let st = 0; st < Pe; st++) {
                const ft = W.readUint8()
                  , Xt = W.readUint8()
                  , Ot = W.readUint8()
                  , Nt = W.readUint8()
                  , Mt = W.readUint8()
                  , Gt = W.readUint8()
                  , rr = W.readUint8();
                ha[ft] = Vi(Xt, Ot, Nt, 0),
                ao[ft] = Vi(Mt, Gt, rr, ft)
            }
            Zi.length = 0;
            for (let st = 0; st < Ce; ) {
                const ft = W.readUint8()
                  , Xt = W.readVarint();
                st += 2;
                for (let Ot = 0; Ot < Xt; Ot++) {
                    const Nt = W.readUint8()
                      , Mt = W.readVarint();
                    st += 2,
                    Zi.push(ft, Nt, Mt)
                }
            }
            const ke = ge * Po * yo
              , ze = new Uint32Array(ke);
            let Qe = 0;
            for (let st = 0; st < Zi.length; st += 3) {
                const ft = Zi[st]
                  , Xt = Zi[st + 1]
                  , Ot = Zi[st + 2]
                  , Nt = !(ft & 1)
                  , Mt = ft >> 1
                  , Gt = (Mt + 2) % 3
                  , rr = (Mt + 1) % 3
                  , Zt = Wi(Mt)
                  , ur = Wi(Gt)
                  , ar = Wi(rr)
                  , gr = Xt << Zt >>> 0
                  , yr = ft << pa >>> 0;
                for (let vr = 0; vr < Ot; ++vr) {
                    const Kr = W.readUint8() << ur >>> 0
                      , Yr = W.readUint8() << ar >>> 0
                      , Qr = W.readUint8() << ur >>> 0
                      , tn = W.readUint8() << ar >>> 0
                      , rn = W.readUint8()
                      , An = W.readUint8()
                      , Xn = (ha[rn] | yr) >>> 0
                      , Dn = ao[rn];
                    ze[Qe + 1] = Xn,
                    ze[Qe + 2] = Dn,
                    ze[Qe + 4] = Xn,
                    ze[Qe + 5] = Dn,
                    ze[Qe + 7] = Xn,
                    ze[Qe + 8] = Dn,
                    ze[Qe + 10] = Xn,
                    ze[Qe + 11] = Dn;
                    const vn = Wa[An & 3]
                      , ir = Wa[An >> 2 & 3]
                      , Ht = Wa[An >> 4 & 3]
                      , sr = Wa[An >> 6]
                      , Ar = (Kr | Yr | gr | vn) >>> 0
                      , Mr = (Kr | tn | gr | sr) >>> 0
                      , Dr = (Qr | Yr | gr | ir) >>> 0
                      , Cr = (Qr | tn | gr | Ht) >>> 0
                      , Lr = vn + Ht
                      , gn = ir + sr
                      , $r = (Lr - gn || Math.max(vn, Ht) - Math.max(ir, sr)) < 0
                      , _n = $r - 1 >>> 0
                      , zr = _n & Ar | ~_n & Mr
                      , Fr = _n & Cr | ~_n & Dr
                      , pn = Ar ^ Mr ^ zr
                      , xn = Cr ^ Dr ^ Fr
                      , si = Nt ^ $r;
                    ze[Qe] = zr,
                    ze[Qe + (3 << si)] = pn,
                    ze[Qe + (3 << (1 ^ si))] = xn,
                    ze[Qe + 9] = Fr,
                    Qe += So
                }
            }
            return new Uint8Array(ze.buffer)
        }
        var Eo = W => Br(void 0, void 0, void 0, function*() {
            const ee = Object.keys(W.meshes)[0]
              , ge = Or.clone(Or.identity);
            ge.children = [1],
            ge.rotation[3] = 1;
            const Pe = Or.clone(Or.identity);
            Pe.mesh = 0,
            Pe.rotation[3] = 1;
            const Ce = $t.clone(W.bounds)
              , ke = [];
            if (!$t.equal(W.bounds, $t.fromJSON([0, 0, 0]))) {
                Ce[0]++,
                Ce[1]++,
                Ce[2]++;
                const ze = W.meshes[ee]
                  , Qe = os(new yt.MuReadStream(new Uint8Array(ze)));
                if (Qe) {
                    const st = [1 / 0, 1 / 0, 1 / 0];
                    for (let ft = 0; ft < Qe.length; ft += 12) {
                        const Xt = Qe[ft]
                          , Ot = Qe[ft + 1]
                          , Nt = Qe[ft + 2];
                        st[0] = Math.min(Xt, st[0]),
                        st[1] = Math.min(Ot, st[1]),
                        st[2] = Math.min(Nt, st[2])
                    }
                    Pe.translation[0] = -st[0],
                    Pe.translation[1] = -st[1],
                    Pe.translation[2] = -st[2]
                }
                ke.push(ze)
            }
            return {
                version: 2,
                bounds: Ce,
                nodes: [ge, Pe],
                meshes: ke
            }
        });
        function ss(W) {
            const ee = new yt.MuReadStream(W);
            if (ee.readInt32() !== -11)
                return;
            const Pe = ee.readVarint()
              , Ce = Pe * 6
              , ke = new Uint8Array(Ce)
              , ze = ee.readVarint()
              , Qe = ee.readVarint()
              , st = []
              , ft = {};
            for (let Xt = 0; Xt < ze; Xt++) {
                const Ot = ee.readUint8()
                  , Nt = ee.readUint8()
                  , Mt = ee.readUint8()
                  , Gt = ee.readUint8()
                  , rr = ee.readUint8()
                  , Zt = ee.readUint8()
                  , ur = ee.readUint8();
                ft[Ot] = {
                    rgb: [Nt, Mt, Gt],
                    pbr: [rr, Zt, ur]
                }
            }
            for (let Xt = 0; Xt < Qe / 2; Xt++)
                st.push(ee.readUint8()),
                st.push(ee.readVarint());
            for (let Xt = 0; Xt < Ce; Xt++)
                ke[Xt] = ee.readUint8();
            return {
                data: ke,
                sliceInfo: st,
                material: ft,
                surfaceCount: Pe
            }
        }
        var Ki = {}
          , dn = 1e-6
          , Un = typeof Float32Array < "u" ? Float32Array : Array
          , Oi = Math.random;
        function Ao(W) {
            Un = W
        }
        var cs = Math.PI / 180;
        function ls(W) {
            return W * cs
        }
        function us(W, ee) {
            return Math.abs(W - ee) <= dn * Math.max(1, Math.abs(W), Math.abs(ee))
        }
        Math.hypot || (Math.hypot = function() {
            for (var W = 0, ee = arguments.length; ee--; )
                W += arguments[ee] * arguments[ee];
            return Math.sqrt(W)
        }
        );
        var ds = Object.freeze({
            __proto__: null,
            get ARRAY_TYPE() {
                return Un
            },
            EPSILON: dn,
            RANDOM: Oi,
            equals: us,
            setMatrixArrayType: Ao,
            toRadian: ls
        });
        function fs() {
            var W = new Un(4);
            return Un != Float32Array && (W[1] = 0,
            W[2] = 0),
            W[0] = 1,
            W[3] = 1,
            W
        }
        function Xo(W) {
            var ee = new Un(4);
            return ee[0] = W[0],
            ee[1] = W[1],
            ee[2] = W[2],
            ee[3] = W[3],
            ee
        }
        function To(W, ee) {
            return W[0] = ee[0],
            W[1] = ee[1],
            W[2] = ee[2],
            W[3] = ee[3],
            W
        }
        function hs(W) {
            return W[0] = 1,
            W[1] = 0,
            W[2] = 0,
            W[3] = 1,
            W
        }
        function _a(W, ee, ge, Pe) {
            var Ce = new Un(4);
            return Ce[0] = W,
            Ce[1] = ee,
            Ce[2] = ge,
            Ce[3] = Pe,
            Ce
        }
        function ms(W, ee, ge, Pe, Ce) {
            return W[0] = ee,
            W[1] = ge,
            W[2] = Pe,
            W[3] = Ce,
            W
        }
        function va(W, ee) {
            if (W === ee) {
                var ge = ee[1];
                W[1] = ee[2],
                W[2] = ge
            } else
                W[0] = ee[0],
                W[1] = ee[2],
                W[2] = ee[1],
                W[3] = ee[3];
            return W
        }
        function ps(W, ee) {
            var ge = ee[0]
              , Pe = ee[1]
              , Ce = ee[2]
              , ke = ee[3]
              , ze = ge * ke - Ce * Pe;
            return ze ? (ze = 1 / ze,
            W[0] = ke * ze,
            W[1] = -Pe * ze,
            W[2] = -Ce * ze,
            W[3] = ge * ze,
            W) : null
        }
        function qa(W, ee) {
            var ge = ee[0];
            return W[0] = ee[3],
            W[1] = -ee[1],
            W[2] = -ee[2],
            W[3] = ge,
            W
        }
        function xi(W) {
            return W[0] * W[3] - W[2] * W[1]
        }
        function Me(W, ee, ge) {
            var Pe = ee[0]
              , Ce = ee[1]
              , ke = ee[2]
              , ze = ee[3]
              , Qe = ge[0]
              , st = ge[1]
              , ft = ge[2]
              , Xt = ge[3];
            return W[0] = Pe * Qe + ke * st,
            W[1] = Ce * Qe + ze * st,
            W[2] = Pe * ft + ke * Xt,
            W[3] = Ce * ft + ze * Xt,
            W
        }
        function Ae(W, ee, ge) {
            var Pe = ee[0]
              , Ce = ee[1]
              , ke = ee[2]
              , ze = ee[3]
              , Qe = Math.sin(ge)
              , st = Math.cos(ge);
            return W[0] = Pe * st + ke * Qe,
            W[1] = Ce * st + ze * Qe,
            W[2] = Pe * -Qe + ke * st,
            W[3] = Ce * -Qe + ze * st,
            W
        }
        function Ye(W, ee, ge) {
            var Pe = ee[0]
              , Ce = ee[1]
              , ke = ee[2]
              , ze = ee[3]
              , Qe = ge[0]
              , st = ge[1];
            return W[0] = Pe * Qe,
            W[1] = Ce * Qe,
            W[2] = ke * st,
            W[3] = ze * st,
            W
        }
        function We(W, ee) {
            var ge = Math.sin(ee)
              , Pe = Math.cos(ee);
            return W[0] = Pe,
            W[1] = ge,
            W[2] = -ge,
            W[3] = Pe,
            W
        }
        function ut(W, ee) {
            return W[0] = ee[0],
            W[1] = 0,
            W[2] = 0,
            W[3] = ee[1],
            W
        }
        function Kt(W) {
            return "mat2(" + W[0] + ", " + W[1] + ", " + W[2] + ", " + W[3] + ")"
        }
        function Vt(W) {
            return Math.hypot(W[0], W[1], W[2], W[3])
        }
        function nr(W, ee, ge, Pe) {
            return W[2] = Pe[2] / Pe[0],
            ge[0] = Pe[0],
            ge[1] = Pe[1],
            ge[3] = Pe[3] - W[2] * ge[1],
            [W, ee, ge]
        }
        function fr(W, ee, ge) {
            return W[0] = ee[0] + ge[0],
            W[1] = ee[1] + ge[1],
            W[2] = ee[2] + ge[2],
            W[3] = ee[3] + ge[3],
            W
        }
        function xr(W, ee, ge) {
            return W[0] = ee[0] - ge[0],
            W[1] = ee[1] - ge[1],
            W[2] = ee[2] - ge[2],
            W[3] = ee[3] - ge[3],
            W
        }
        function wr(W, ee) {
            return W[0] === ee[0] && W[1] === ee[1] && W[2] === ee[2] && W[3] === ee[3]
        }
        function Sr(W, ee) {
            var ge = W[0]
              , Pe = W[1]
              , Ce = W[2]
              , ke = W[3]
              , ze = ee[0]
              , Qe = ee[1]
              , st = ee[2]
              , ft = ee[3];
            return Math.abs(ge - ze) <= dn * Math.max(1, Math.abs(ge), Math.abs(ze)) && Math.abs(Pe - Qe) <= dn * Math.max(1, Math.abs(Pe), Math.abs(Qe)) && Math.abs(Ce - st) <= dn * Math.max(1, Math.abs(Ce), Math.abs(st)) && Math.abs(ke - ft) <= dn * Math.max(1, Math.abs(ke), Math.abs(ft))
        }
        function Jr(W, ee, ge) {
            return W[0] = ee[0] * ge,
            W[1] = ee[1] * ge,
            W[2] = ee[2] * ge,
            W[3] = ee[3] * ge,
            W
        }
        function hn(W, ee, ge, Pe) {
            return W[0] = ee[0] + ge[0] * Pe,
            W[1] = ee[1] + ge[1] * Pe,
            W[2] = ee[2] + ge[2] * Pe,
            W[3] = ee[3] + ge[3] * Pe,
            W
        }
        var yn = Me
          , Nn = xr
          , Kn = Object.freeze({
            __proto__: null,
            LDU: nr,
            add: fr,
            adjoint: qa,
            clone: Xo,
            copy: To,
            create: fs,
            determinant: xi,
            equals: Sr,
            exactEquals: wr,
            frob: Vt,
            fromRotation: We,
            fromScaling: ut,
            fromValues: _a,
            identity: hs,
            invert: ps,
            mul: yn,
            multiply: Me,
            multiplyScalar: Jr,
            multiplyScalarAndAdd: hn,
            rotate: Ae,
            scale: Ye,
            set: ms,
            str: Kt,
            sub: Nn,
            subtract: xr,
            transpose: va
        });
        function mn() {
            var W = new Un(6);
            return Un != Float32Array && (W[1] = 0,
            W[2] = 0,
            W[4] = 0,
            W[5] = 0),
            W[0] = 1,
            W[3] = 1,
            W
        }
        function fn(W) {
            var ee = new Un(6);
            return ee[0] = W[0],
            ee[1] = W[1],
            ee[2] = W[2],
            ee[3] = W[3],
            ee[4] = W[4],
            ee[5] = W[5],
            ee
        }
        function Rn(W, ee) {
            return W[0] = ee[0],
            W[1] = ee[1],
            W[2] = ee[2],
            W[3] = ee[3],
            W[4] = ee[4],
            W[5] = ee[5],
            W
        }
        function ci(W) {
            return W[0] = 1,
            W[1] = 0,
            W[2] = 0,
            W[3] = 1,
            W[4] = 0,
            W[5] = 0,
            W
        }
        function pi(W, ee, ge, Pe, Ce, ke) {
            var ze = new Un(6);
            return ze[0] = W,
            ze[1] = ee,
            ze[2] = ge,
            ze[3] = Pe,
            ze[4] = Ce,
            ze[5] = ke,
            ze
        }
        function Qn(W, ee, ge, Pe, Ce, ke, ze) {
            return W[0] = ee,
            W[1] = ge,
            W[2] = Pe,
            W[3] = Ce,
            W[4] = ke,
            W[5] = ze,
            W
        }
        function En(W, ee) {
            var ge = ee[0]
              , Pe = ee[1]
              , Ce = ee[2]
              , ke = ee[3]
              , ze = ee[4]
              , Qe = ee[5]
              , st = ge * ke - Pe * Ce;
            return st ? (st = 1 / st,
            W[0] = ke * st,
            W[1] = -Pe * st,
            W[2] = -Ce * st,
            W[3] = ge * st,
            W[4] = (Ce * Qe - ke * ze) * st,
            W[5] = (Pe * ze - ge * Qe) * st,
            W) : null
        }
        function Jn(W) {
            return W[0] * W[3] - W[1] * W[2]
        }
        function Ti(W, ee, ge) {
            var Pe = ee[0]
              , Ce = ee[1]
              , ke = ee[2]
              , ze = ee[3]
              , Qe = ee[4]
              , st = ee[5]
              , ft = ge[0]
              , Xt = ge[1]
              , Ot = ge[2]
              , Nt = ge[3]
              , Mt = ge[4]
              , Gt = ge[5];
            return W[0] = Pe * ft + ke * Xt,
            W[1] = Ce * ft + ze * Xt,
            W[2] = Pe * Ot + ke * Nt,
            W[3] = Ce * Ot + ze * Nt,
            W[4] = Pe * Mt + ke * Gt + Qe,
            W[5] = Ce * Mt + ze * Gt + st,
            W
        }
        function Mi(W, ee, ge) {
            var Pe = ee[0]
              , Ce = ee[1]
              , ke = ee[2]
              , ze = ee[3]
              , Qe = ee[4]
              , st = ee[5]
              , ft = Math.sin(ge)
              , Xt = Math.cos(ge);
            return W[0] = Pe * Xt + ke * ft,
            W[1] = Ce * Xt + ze * ft,
            W[2] = Pe * -ft + ke * Xt,
            W[3] = Ce * -ft + ze * Xt,
            W[4] = Qe,
            W[5] = st,
            W
        }
        function Ka(W, ee, ge) {
            var Pe = ee[0]
              , Ce = ee[1]
              , ke = ee[2]
              , ze = ee[3]
              , Qe = ee[4]
              , st = ee[5]
              , ft = ge[0]
              , Xt = ge[1];
            return W[0] = Pe * ft,
            W[1] = Ce * ft,
            W[2] = ke * Xt,
            W[3] = ze * Xt,
            W[4] = Qe,
            W[5] = st,
            W
        }
        function Ii(W, ee, ge) {
            var Pe = ee[0]
              , Ce = ee[1]
              , ke = ee[2]
              , ze = ee[3]
              , Qe = ee[4]
              , st = ee[5]
              , ft = ge[0]
              , Xt = ge[1];
            return W[0] = Pe,
            W[1] = Ce,
            W[2] = ke,
            W[3] = ze,
            W[4] = Pe * ft + ke * Xt + Qe,
            W[5] = Ce * ft + ze * Xt + st,
            W
        }
        function sa(W, ee) {
            var ge = Math.sin(ee)
              , Pe = Math.cos(ee);
            return W[0] = Pe,
            W[1] = ge,
            W[2] = -ge,
            W[3] = Pe,
            W[4] = 0,
            W[5] = 0,
            W
        }
        function Co(W, ee) {
            return W[0] = ee[0],
            W[1] = 0,
            W[2] = 0,
            W[3] = ee[1],
            W[4] = 0,
            W[5] = 0,
            W
        }
        function xa(W, ee) {
            return W[0] = 1,
            W[1] = 0,
            W[2] = 0,
            W[3] = 1,
            W[4] = ee[0],
            W[5] = ee[1],
            W
        }
        function gs(W) {
            return "mat2d(" + W[0] + ", " + W[1] + ", " + W[2] + ", " + W[3] + ", " + W[4] + ", " + W[5] + ")"
        }
        function _s(W) {
            return Math.hypot(W[0], W[1], W[2], W[3], W[4], W[5], 1)
        }
        function Al(W, ee, ge) {
            return W[0] = ee[0] + ge[0],
            W[1] = ee[1] + ge[1],
            W[2] = ee[2] + ge[2],
            W[3] = ee[3] + ge[3],
            W[4] = ee[4] + ge[4],
            W[5] = ee[5] + ge[5],
            W
        }
        function zs(W, ee, ge) {
            return W[0] = ee[0] - ge[0],
            W[1] = ee[1] - ge[1],
            W[2] = ee[2] - ge[2],
            W[3] = ee[3] - ge[3],
            W[4] = ee[4] - ge[4],
            W[5] = ee[5] - ge[5],
            W
        }
        function Hs(W, ee, ge) {
            return W[0] = ee[0] * ge,
            W[1] = ee[1] * ge,
            W[2] = ee[2] * ge,
            W[3] = ee[3] * ge,
            W[4] = ee[4] * ge,
            W[5] = ee[5] * ge,
            W
        }
        function Xl(W, ee, ge, Pe) {
            return W[0] = ee[0] + ge[0] * Pe,
            W[1] = ee[1] + ge[1] * Pe,
            W[2] = ee[2] + ge[2] * Pe,
            W[3] = ee[3] + ge[3] * Pe,
            W[4] = ee[4] + ge[4] * Pe,
            W[5] = ee[5] + ge[5] * Pe,
            W
        }
        function Zs(W, ee) {
            return W[0] === ee[0] && W[1] === ee[1] && W[2] === ee[2] && W[3] === ee[3] && W[4] === ee[4] && W[5] === ee[5]
        }
        function Qs(W, ee) {
            var ge = W[0]
              , Pe = W[1]
              , Ce = W[2]
              , ke = W[3]
              , ze = W[4]
              , Qe = W[5]
              , st = ee[0]
              , ft = ee[1]
              , Xt = ee[2]
              , Ot = ee[3]
              , Nt = ee[4]
              , Mt = ee[5];
            return Math.abs(ge - st) <= dn * Math.max(1, Math.abs(ge), Math.abs(st)) && Math.abs(Pe - ft) <= dn * Math.max(1, Math.abs(Pe), Math.abs(ft)) && Math.abs(Ce - Xt) <= dn * Math.max(1, Math.abs(Ce), Math.abs(Xt)) && Math.abs(ke - Ot) <= dn * Math.max(1, Math.abs(ke), Math.abs(Ot)) && Math.abs(ze - Nt) <= dn * Math.max(1, Math.abs(ze), Math.abs(Nt)) && Math.abs(Qe - Mt) <= dn * Math.max(1, Math.abs(Qe), Math.abs(Mt))
        }
        var Tl = Ti
          , Cl = zs
          , wl = Object.freeze({
            __proto__: null,
            add: Al,
            clone: fn,
            copy: Rn,
            create: mn,
            determinant: Jn,
            equals: Qs,
            exactEquals: Zs,
            frob: _s,
            fromRotation: sa,
            fromScaling: Co,
            fromTranslation: xa,
            fromValues: pi,
            identity: ci,
            invert: En,
            mul: Tl,
            multiply: Ti,
            multiplyScalar: Hs,
            multiplyScalarAndAdd: Xl,
            rotate: Mi,
            scale: Ka,
            set: Qn,
            str: gs,
            sub: Cl,
            subtract: zs,
            translate: Ii
        });
        function Js() {
            var W = new Un(9);
            return Un != Float32Array && (W[1] = 0,
            W[2] = 0,
            W[3] = 0,
            W[5] = 0,
            W[6] = 0,
            W[7] = 0),
            W[0] = 1,
            W[4] = 1,
            W[8] = 1,
            W
        }
        function Kl(W, ee) {
            return W[0] = ee[0],
            W[1] = ee[1],
            W[2] = ee[2],
            W[3] = ee[4],
            W[4] = ee[5],
            W[5] = ee[6],
            W[6] = ee[8],
            W[7] = ee[9],
            W[8] = ee[10],
            W
        }
        function xl(W) {
            var ee = new Un(9);
            return ee[0] = W[0],
            ee[1] = W[1],
            ee[2] = W[2],
            ee[3] = W[3],
            ee[4] = W[4],
            ee[5] = W[5],
            ee[6] = W[6],
            ee[7] = W[7],
            ee[8] = W[8],
            ee
        }
        function Nl(W, ee) {
            return W[0] = ee[0],
            W[1] = ee[1],
            W[2] = ee[2],
            W[3] = ee[3],
            W[4] = ee[4],
            W[5] = ee[5],
            W[6] = ee[6],
            W[7] = ee[7],
            W[8] = ee[8],
            W
        }
        function Rl(W, ee, ge, Pe, Ce, ke, ze, Qe, st) {
            var ft = new Un(9);
            return ft[0] = W,
            ft[1] = ee,
            ft[2] = ge,
            ft[3] = Pe,
            ft[4] = Ce,
            ft[5] = ke,
            ft[6] = ze,
            ft[7] = Qe,
            ft[8] = st,
            ft
        }
        function Ol(W, ee, ge, Pe, Ce, ke, ze, Qe, st, ft) {
            return W[0] = ee,
            W[1] = ge,
            W[2] = Pe,
            W[3] = Ce,
            W[4] = ke,
            W[5] = ze,
            W[6] = Qe,
            W[7] = st,
            W[8] = ft,
            W
        }
        function Ml(W) {
            return W[0] = 1,
            W[1] = 0,
            W[2] = 0,
            W[3] = 0,
            W[4] = 1,
            W[5] = 0,
            W[6] = 0,
            W[7] = 0,
            W[8] = 1,
            W
        }
        function tc(W, ee) {
            if (W === ee) {
                var ge = ee[1]
                  , Pe = ee[2]
                  , Ce = ee[5];
                W[1] = ee[3],
                W[2] = ee[6],
                W[3] = ge,
                W[5] = ee[7],
                W[6] = Pe,
                W[7] = Ce
            } else
                W[0] = ee[0],
                W[1] = ee[3],
                W[2] = ee[6],
                W[3] = ee[1],
                W[4] = ee[4],
                W[5] = ee[7],
                W[6] = ee[2],
                W[7] = ee[5],
                W[8] = ee[8];
            return W
        }
        function Il(W, ee) {
            var ge = ee[0]
              , Pe = ee[1]
              , Ce = ee[2]
              , ke = ee[3]
              , ze = ee[4]
              , Qe = ee[5]
              , st = ee[6]
              , ft = ee[7]
              , Xt = ee[8]
              , Ot = Xt * ze - Qe * ft
              , Nt = -Xt * ke + Qe * st
              , Mt = ft * ke - ze * st
              , Gt = ge * Ot + Pe * Nt + Ce * Mt;
            return Gt ? (Gt = 1 / Gt,
            W[0] = Ot * Gt,
            W[1] = (-Xt * Pe + Ce * ft) * Gt,
            W[2] = (Qe * Pe - Ce * ze) * Gt,
            W[3] = Nt * Gt,
            W[4] = (Xt * ge - Ce * st) * Gt,
            W[5] = (-Qe * ge + Ce * ke) * Gt,
            W[6] = Mt * Gt,
            W[7] = (-ft * ge + Pe * st) * Gt,
            W[8] = (ze * ge - Pe * ke) * Gt,
            W) : null
        }
        function Bl(W, ee) {
            var ge = ee[0]
              , Pe = ee[1]
              , Ce = ee[2]
              , ke = ee[3]
              , ze = ee[4]
              , Qe = ee[5]
              , st = ee[6]
              , ft = ee[7]
              , Xt = ee[8];
            return W[0] = ze * Xt - Qe * ft,
            W[1] = Ce * ft - Pe * Xt,
            W[2] = Pe * Qe - Ce * ze,
            W[3] = Qe * st - ke * Xt,
            W[4] = ge * Xt - Ce * st,
            W[5] = Ce * ke - ge * Qe,
            W[6] = ke * ft - ze * st,
            W[7] = Pe * st - ge * ft,
            W[8] = ge * ze - Pe * ke,
            W
        }
        function Dl(W) {
            var ee = W[0]
              , ge = W[1]
              , Pe = W[2]
              , Ce = W[3]
              , ke = W[4]
              , ze = W[5]
              , Qe = W[6]
              , st = W[7]
              , ft = W[8];
            return ee * (ft * ke - ze * st) + ge * (-ft * Ce + ze * Qe) + Pe * (st * Ce - ke * Qe)
        }
        function rc(W, ee, ge) {
            var Pe = ee[0]
              , Ce = ee[1]
              , ke = ee[2]
              , ze = ee[3]
              , Qe = ee[4]
              , st = ee[5]
              , ft = ee[6]
              , Xt = ee[7]
              , Ot = ee[8]
              , Nt = ge[0]
              , Mt = ge[1]
              , Gt = ge[2]
              , rr = ge[3]
              , Zt = ge[4]
              , ur = ge[5]
              , ar = ge[6]
              , gr = ge[7]
              , yr = ge[8];
            return W[0] = Nt * Pe + Mt * ze + Gt * ft,
            W[1] = Nt * Ce + Mt * Qe + Gt * Xt,
            W[2] = Nt * ke + Mt * st + Gt * Ot,
            W[3] = rr * Pe + Zt * ze + ur * ft,
            W[4] = rr * Ce + Zt * Qe + ur * Xt,
            W[5] = rr * ke + Zt * st + ur * Ot,
            W[6] = ar * Pe + gr * ze + yr * ft,
            W[7] = ar * Ce + gr * Qe + yr * Xt,
            W[8] = ar * ke + gr * st + yr * Ot,
            W
        }
        function Qi(W, ee, ge) {
            var Pe = ee[0]
              , Ce = ee[1]
              , ke = ee[2]
              , ze = ee[3]
              , Qe = ee[4]
              , st = ee[5]
              , ft = ee[6]
              , Xt = ee[7]
              , Ot = ee[8]
              , Nt = ge[0]
              , Mt = ge[1];
            return W[0] = Pe,
            W[1] = Ce,
            W[2] = ke,
            W[3] = ze,
            W[4] = Qe,
            W[5] = st,
            W[6] = Nt * Pe + Mt * ze + ft,
            W[7] = Nt * Ce + Mt * Qe + Xt,
            W[8] = Nt * ke + Mt * st + Ot,
            W
        }
        function ba(W, ee, ge) {
            var Pe = ee[0]
              , Ce = ee[1]
              , ke = ee[2]
              , ze = ee[3]
              , Qe = ee[4]
              , st = ee[5]
              , ft = ee[6]
              , Xt = ee[7]
              , Ot = ee[8]
              , Nt = Math.sin(ge)
              , Mt = Math.cos(ge);
            return W[0] = Mt * Pe + Nt * ze,
            W[1] = Mt * Ce + Nt * Qe,
            W[2] = Mt * ke + Nt * st,
            W[3] = Mt * ze - Nt * Pe,
            W[4] = Mt * Qe - Nt * Ce,
            W[5] = Mt * st - Nt * ke,
            W[6] = ft,
            W[7] = Xt,
            W[8] = Ot,
            W
        }
        function wo(W, ee, ge) {
            var Pe = ge[0]
              , Ce = ge[1];
            return W[0] = Pe * ee[0],
            W[1] = Pe * ee[1],
            W[2] = Pe * ee[2],
            W[3] = Ce * ee[3],
            W[4] = Ce * ee[4],
            W[5] = Ce * ee[5],
            W[6] = ee[6],
            W[7] = ee[7],
            W[8] = ee[8],
            W
        }
        function kl(W, ee) {
            return W[0] = 1,
            W[1] = 0,
            W[2] = 0,
            W[3] = 0,
            W[4] = 1,
            W[5] = 0,
            W[6] = ee[0],
            W[7] = ee[1],
            W[8] = 1,
            W
        }
        function Ll(W, ee) {
            var ge = Math.sin(ee)
              , Pe = Math.cos(ee);
            return W[0] = Pe,
            W[1] = ge,
            W[2] = 0,
            W[3] = -ge,
            W[4] = Pe,
            W[5] = 0,
            W[6] = 0,
            W[7] = 0,
            W[8] = 1,
            W
        }
        function Ul(W, ee) {
            return W[0] = ee[0],
            W[1] = 0,
            W[2] = 0,
            W[3] = 0,
            W[4] = ee[1],
            W[5] = 0,
            W[6] = 0,
            W[7] = 0,
            W[8] = 1,
            W
        }
        function Fl(W, ee) {
            return W[0] = ee[0],
            W[1] = ee[1],
            W[2] = 0,
            W[3] = ee[2],
            W[4] = ee[3],
            W[5] = 0,
            W[6] = ee[4],
            W[7] = ee[5],
            W[8] = 1,
            W
        }
        function Wl(W, ee) {
            var ge = ee[0]
              , Pe = ee[1]
              , Ce = ee[2]
              , ke = ee[3]
              , ze = ge + ge
              , Qe = Pe + Pe
              , st = Ce + Ce
              , ft = ge * ze
              , Xt = Pe * ze
              , Ot = Pe * Qe
              , Nt = Ce * ze
              , Mt = Ce * Qe
              , Gt = Ce * st
              , rr = ke * ze
              , Zt = ke * Qe
              , ur = ke * st;
            return W[0] = 1 - Ot - Gt,
            W[3] = Xt - ur,
            W[6] = Nt + Zt,
            W[1] = Xt + ur,
            W[4] = 1 - ft - Gt,
            W[7] = Mt - rr,
            W[2] = Nt - Zt,
            W[5] = Mt + rr,
            W[8] = 1 - ft - Ot,
            W
        }
        function ql(W, ee) {
            var ge = ee[0]
              , Pe = ee[1]
              , Ce = ee[2]
              , ke = ee[3]
              , ze = ee[4]
              , Qe = ee[5]
              , st = ee[6]
              , ft = ee[7]
              , Xt = ee[8]
              , Ot = ee[9]
              , Nt = ee[10]
              , Mt = ee[11]
              , Gt = ee[12]
              , rr = ee[13]
              , Zt = ee[14]
              , ur = ee[15]
              , ar = ge * Qe - Pe * ze
              , gr = ge * st - Ce * ze
              , yr = ge * ft - ke * ze
              , vr = Pe * st - Ce * Qe
              , Kr = Pe * ft - ke * Qe
              , Yr = Ce * ft - ke * st
              , Qr = Xt * rr - Ot * Gt
              , tn = Xt * Zt - Nt * Gt
              , rn = Xt * ur - Mt * Gt
              , An = Ot * Zt - Nt * rr
              , Xn = Ot * ur - Mt * rr
              , Dn = Nt * ur - Mt * Zt
              , vn = ar * Dn - gr * Xn + yr * An + vr * rn - Kr * tn + Yr * Qr;
            return vn ? (vn = 1 / vn,
            W[0] = (Qe * Dn - st * Xn + ft * An) * vn,
            W[1] = (st * rn - ze * Dn - ft * tn) * vn,
            W[2] = (ze * Xn - Qe * rn + ft * Qr) * vn,
            W[3] = (Ce * Xn - Pe * Dn - ke * An) * vn,
            W[4] = (ge * Dn - Ce * rn + ke * tn) * vn,
            W[5] = (Pe * rn - ge * Xn - ke * Qr) * vn,
            W[6] = (rr * Yr - Zt * Kr + ur * vr) * vn,
            W[7] = (Zt * yr - Gt * Yr - ur * gr) * vn,
            W[8] = (Gt * Kr - rr * yr + ur * ar) * vn,
            W) : null
        }
        function Vl(W, ee, ge) {
            return W[0] = 2 / ee,
            W[1] = 0,
            W[2] = 0,
            W[3] = 0,
            W[4] = -2 / ge,
            W[5] = 0,
            W[6] = -1,
            W[7] = 1,
            W[8] = 1,
            W
        }
        function $l(W) {
            return "mat3(" + W[0] + ", " + W[1] + ", " + W[2] + ", " + W[3] + ", " + W[4] + ", " + W[5] + ", " + W[6] + ", " + W[7] + ", " + W[8] + ")"
        }
        function Yl(W) {
            return Math.hypot(W[0], W[1], W[2], W[3], W[4], W[5], W[6], W[7], W[8])
        }
        function Gl(W, ee, ge) {
            return W[0] = ee[0] + ge[0],
            W[1] = ee[1] + ge[1],
            W[2] = ee[2] + ge[2],
            W[3] = ee[3] + ge[3],
            W[4] = ee[4] + ge[4],
            W[5] = ee[5] + ge[5],
            W[6] = ee[6] + ge[6],
            W[7] = ee[7] + ge[7],
            W[8] = ee[8] + ge[8],
            W
        }
        function nc(W, ee, ge) {
            return W[0] = ee[0] - ge[0],
            W[1] = ee[1] - ge[1],
            W[2] = ee[2] - ge[2],
            W[3] = ee[3] - ge[3],
            W[4] = ee[4] - ge[4],
            W[5] = ee[5] - ge[5],
            W[6] = ee[6] - ge[6],
            W[7] = ee[7] - ge[7],
            W[8] = ee[8] - ge[8],
            W
        }
        function hf(W, ee, ge) {
            return W[0] = ee[0] * ge,
            W[1] = ee[1] * ge,
            W[2] = ee[2] * ge,
            W[3] = ee[3] * ge,
            W[4] = ee[4] * ge,
            W[5] = ee[5] * ge,
            W[6] = ee[6] * ge,
            W[7] = ee[7] * ge,
            W[8] = ee[8] * ge,
            W
        }
        function zl(W, ee, ge, Pe) {
            return W[0] = ee[0] + ge[0] * Pe,
            W[1] = ee[1] + ge[1] * Pe,
            W[2] = ee[2] + ge[2] * Pe,
            W[3] = ee[3] + ge[3] * Pe,
            W[4] = ee[4] + ge[4] * Pe,
            W[5] = ee[5] + ge[5] * Pe,
            W[6] = ee[6] + ge[6] * Pe,
            W[7] = ee[7] + ge[7] * Pe,
            W[8] = ee[8] + ge[8] * Pe,
            W
        }
        function Hl(W, ee) {
            return W[0] === ee[0] && W[1] === ee[1] && W[2] === ee[2] && W[3] === ee[3] && W[4] === ee[4] && W[5] === ee[5] && W[6] === ee[6] && W[7] === ee[7] && W[8] === ee[8]
        }
        function jl(W, ee) {
            var ge = W[0]
              , Pe = W[1]
              , Ce = W[2]
              , ke = W[3]
              , ze = W[4]
              , Qe = W[5]
              , st = W[6]
              , ft = W[7]
              , Xt = W[8]
              , Ot = ee[0]
              , Nt = ee[1]
              , Mt = ee[2]
              , Gt = ee[3]
              , rr = ee[4]
              , Zt = ee[5]
              , ur = ee[6]
              , ar = ee[7]
              , gr = ee[8];
            return Math.abs(ge - Ot) <= dn * Math.max(1, Math.abs(ge), Math.abs(Ot)) && Math.abs(Pe - Nt) <= dn * Math.max(1, Math.abs(Pe), Math.abs(Nt)) && Math.abs(Ce - Mt) <= dn * Math.max(1, Math.abs(Ce), Math.abs(Mt)) && Math.abs(ke - Gt) <= dn * Math.max(1, Math.abs(ke), Math.abs(Gt)) && Math.abs(ze - rr) <= dn * Math.max(1, Math.abs(ze), Math.abs(rr)) && Math.abs(Qe - Zt) <= dn * Math.max(1, Math.abs(Qe), Math.abs(Zt)) && Math.abs(st - ur) <= dn * Math.max(1, Math.abs(st), Math.abs(ur)) && Math.abs(ft - ar) <= dn * Math.max(1, Math.abs(ft), Math.abs(ar)) && Math.abs(Xt - gr) <= dn * Math.max(1, Math.abs(Xt), Math.abs(gr))
        }
        var Zl = rc
          , Ql = nc
          , Jl = Object.freeze({
            __proto__: null,
            add: Gl,
            adjoint: Bl,
            clone: xl,
            copy: Nl,
            create: Js,
            determinant: Dl,
            equals: jl,
            exactEquals: Hl,
            frob: Yl,
            fromMat2d: Fl,
            fromMat4: Kl,
            fromQuat: Wl,
            fromRotation: Ll,
            fromScaling: Ul,
            fromTranslation: kl,
            fromValues: Rl,
            identity: Ml,
            invert: Il,
            mul: Zl,
            multiply: rc,
            multiplyScalar: hf,
            multiplyScalarAndAdd: zl,
            normalFromMat4: ql,
            projection: Vl,
            rotate: ba,
            scale: wo,
            set: Ol,
            str: $l,
            sub: Ql,
            subtract: nc,
            translate: Qi,
            transpose: tc
        });
        function eu() {
            var W = new Un(16);
            return Un != Float32Array && (W[1] = 0,
            W[2] = 0,
            W[3] = 0,
            W[4] = 0,
            W[6] = 0,
            W[7] = 0,
            W[8] = 0,
            W[9] = 0,
            W[11] = 0,
            W[12] = 0,
            W[13] = 0,
            W[14] = 0),
            W[0] = 1,
            W[5] = 1,
            W[10] = 1,
            W[15] = 1,
            W
        }
        function tu(W) {
            var ee = new Un(16);
            return ee[0] = W[0],
            ee[1] = W[1],
            ee[2] = W[2],
            ee[3] = W[3],
            ee[4] = W[4],
            ee[5] = W[5],
            ee[6] = W[6],
            ee[7] = W[7],
            ee[8] = W[8],
            ee[9] = W[9],
            ee[10] = W[10],
            ee[11] = W[11],
            ee[12] = W[12],
            ee[13] = W[13],
            ee[14] = W[14],
            ee[15] = W[15],
            ee
        }
        function ic(W, ee) {
            return W[0] = ee[0],
            W[1] = ee[1],
            W[2] = ee[2],
            W[3] = ee[3],
            W[4] = ee[4],
            W[5] = ee[5],
            W[6] = ee[6],
            W[7] = ee[7],
            W[8] = ee[8],
            W[9] = ee[9],
            W[10] = ee[10],
            W[11] = ee[11],
            W[12] = ee[12],
            W[13] = ee[13],
            W[14] = ee[14],
            W[15] = ee[15],
            W
        }
        function ru(W, ee, ge, Pe, Ce, ke, ze, Qe, st, ft, Xt, Ot, Nt, Mt, Gt, rr) {
            var Zt = new Un(16);
            return Zt[0] = W,
            Zt[1] = ee,
            Zt[2] = ge,
            Zt[3] = Pe,
            Zt[4] = Ce,
            Zt[5] = ke,
            Zt[6] = ze,
            Zt[7] = Qe,
            Zt[8] = st,
            Zt[9] = ft,
            Zt[10] = Xt,
            Zt[11] = Ot,
            Zt[12] = Nt,
            Zt[13] = Mt,
            Zt[14] = Gt,
            Zt[15] = rr,
            Zt
        }
        function nu(W, ee, ge, Pe, Ce, ke, ze, Qe, st, ft, Xt, Ot, Nt, Mt, Gt, rr, Zt) {
            return W[0] = ee,
            W[1] = ge,
            W[2] = Pe,
            W[3] = Ce,
            W[4] = ke,
            W[5] = ze,
            W[6] = Qe,
            W[7] = st,
            W[8] = ft,
            W[9] = Xt,
            W[10] = Ot,
            W[11] = Nt,
            W[12] = Mt,
            W[13] = Gt,
            W[14] = rr,
            W[15] = Zt,
            W
        }
        function ac(W) {
            return W[0] = 1,
            W[1] = 0,
            W[2] = 0,
            W[3] = 0,
            W[4] = 0,
            W[5] = 1,
            W[6] = 0,
            W[7] = 0,
            W[8] = 0,
            W[9] = 0,
            W[10] = 1,
            W[11] = 0,
            W[12] = 0,
            W[13] = 0,
            W[14] = 0,
            W[15] = 1,
            W
        }
        function iu(W, ee) {
            if (W === ee) {
                var ge = ee[1]
                  , Pe = ee[2]
                  , Ce = ee[3]
                  , ke = ee[6]
                  , ze = ee[7]
                  , Qe = ee[11];
                W[1] = ee[4],
                W[2] = ee[8],
                W[3] = ee[12],
                W[4] = ge,
                W[6] = ee[9],
                W[7] = ee[13],
                W[8] = Pe,
                W[9] = ke,
                W[11] = ee[14],
                W[12] = Ce,
                W[13] = ze,
                W[14] = Qe
            } else
                W[0] = ee[0],
                W[1] = ee[4],
                W[2] = ee[8],
                W[3] = ee[12],
                W[4] = ee[1],
                W[5] = ee[5],
                W[6] = ee[9],
                W[7] = ee[13],
                W[8] = ee[2],
                W[9] = ee[6],
                W[10] = ee[10],
                W[11] = ee[14],
                W[12] = ee[3],
                W[13] = ee[7],
                W[14] = ee[11],
                W[15] = ee[15];
            return W
        }
        function au(W, ee) {
            var ge = ee[0]
              , Pe = ee[1]
              , Ce = ee[2]
              , ke = ee[3]
              , ze = ee[4]
              , Qe = ee[5]
              , st = ee[6]
              , ft = ee[7]
              , Xt = ee[8]
              , Ot = ee[9]
              , Nt = ee[10]
              , Mt = ee[11]
              , Gt = ee[12]
              , rr = ee[13]
              , Zt = ee[14]
              , ur = ee[15]
              , ar = ge * Qe - Pe * ze
              , gr = ge * st - Ce * ze
              , yr = ge * ft - ke * ze
              , vr = Pe * st - Ce * Qe
              , Kr = Pe * ft - ke * Qe
              , Yr = Ce * ft - ke * st
              , Qr = Xt * rr - Ot * Gt
              , tn = Xt * Zt - Nt * Gt
              , rn = Xt * ur - Mt * Gt
              , An = Ot * Zt - Nt * rr
              , Xn = Ot * ur - Mt * rr
              , Dn = Nt * ur - Mt * Zt
              , vn = ar * Dn - gr * Xn + yr * An + vr * rn - Kr * tn + Yr * Qr;
            return vn ? (vn = 1 / vn,
            W[0] = (Qe * Dn - st * Xn + ft * An) * vn,
            W[1] = (Ce * Xn - Pe * Dn - ke * An) * vn,
            W[2] = (rr * Yr - Zt * Kr + ur * vr) * vn,
            W[3] = (Nt * Kr - Ot * Yr - Mt * vr) * vn,
            W[4] = (st * rn - ze * Dn - ft * tn) * vn,
            W[5] = (ge * Dn - Ce * rn + ke * tn) * vn,
            W[6] = (Zt * yr - Gt * Yr - ur * gr) * vn,
            W[7] = (Xt * Yr - Nt * yr + Mt * gr) * vn,
            W[8] = (ze * Xn - Qe * rn + ft * Qr) * vn,
            W[9] = (Pe * rn - ge * Xn - ke * Qr) * vn,
            W[10] = (Gt * Kr - rr * yr + ur * ar) * vn,
            W[11] = (Ot * yr - Xt * Kr - Mt * ar) * vn,
            W[12] = (Qe * tn - ze * An - st * Qr) * vn,
            W[13] = (ge * An - Pe * tn + Ce * Qr) * vn,
            W[14] = (rr * gr - Gt * vr - Zt * ar) * vn,
            W[15] = (Xt * vr - Ot * gr + Nt * ar) * vn,
            W) : null
        }
        function ou(W, ee) {
            var ge = ee[0]
              , Pe = ee[1]
              , Ce = ee[2]
              , ke = ee[3]
              , ze = ee[4]
              , Qe = ee[5]
              , st = ee[6]
              , ft = ee[7]
              , Xt = ee[8]
              , Ot = ee[9]
              , Nt = ee[10]
              , Mt = ee[11]
              , Gt = ee[12]
              , rr = ee[13]
              , Zt = ee[14]
              , ur = ee[15];
            return W[0] = Qe * (Nt * ur - Mt * Zt) - Ot * (st * ur - ft * Zt) + rr * (st * Mt - ft * Nt),
            W[1] = -(Pe * (Nt * ur - Mt * Zt) - Ot * (Ce * ur - ke * Zt) + rr * (Ce * Mt - ke * Nt)),
            W[2] = Pe * (st * ur - ft * Zt) - Qe * (Ce * ur - ke * Zt) + rr * (Ce * ft - ke * st),
            W[3] = -(Pe * (st * Mt - ft * Nt) - Qe * (Ce * Mt - ke * Nt) + Ot * (Ce * ft - ke * st)),
            W[4] = -(ze * (Nt * ur - Mt * Zt) - Xt * (st * ur - ft * Zt) + Gt * (st * Mt - ft * Nt)),
            W[5] = ge * (Nt * ur - Mt * Zt) - Xt * (Ce * ur - ke * Zt) + Gt * (Ce * Mt - ke * Nt),
            W[6] = -(ge * (st * ur - ft * Zt) - ze * (Ce * ur - ke * Zt) + Gt * (Ce * ft - ke * st)),
            W[7] = ge * (st * Mt - ft * Nt) - ze * (Ce * Mt - ke * Nt) + Xt * (Ce * ft - ke * st),
            W[8] = ze * (Ot * ur - Mt * rr) - Xt * (Qe * ur - ft * rr) + Gt * (Qe * Mt - ft * Ot),
            W[9] = -(ge * (Ot * ur - Mt * rr) - Xt * (Pe * ur - ke * rr) + Gt * (Pe * Mt - ke * Ot)),
            W[10] = ge * (Qe * ur - ft * rr) - ze * (Pe * ur - ke * rr) + Gt * (Pe * ft - ke * Qe),
            W[11] = -(ge * (Qe * Mt - ft * Ot) - ze * (Pe * Mt - ke * Ot) + Xt * (Pe * ft - ke * Qe)),
            W[12] = -(ze * (Ot * Zt - Nt * rr) - Xt * (Qe * Zt - st * rr) + Gt * (Qe * Nt - st * Ot)),
            W[13] = ge * (Ot * Zt - Nt * rr) - Xt * (Pe * Zt - Ce * rr) + Gt * (Pe * Nt - Ce * Ot),
            W[14] = -(ge * (Qe * Zt - st * rr) - ze * (Pe * Zt - Ce * rr) + Gt * (Pe * st - Ce * Qe)),
            W[15] = ge * (Qe * Nt - st * Ot) - ze * (Pe * Nt - Ce * Ot) + Xt * (Pe * st - Ce * Qe),
            W
        }
        function su(W) {
            var ee = W[0]
              , ge = W[1]
              , Pe = W[2]
              , Ce = W[3]
              , ke = W[4]
              , ze = W[5]
              , Qe = W[6]
              , st = W[7]
              , ft = W[8]
              , Xt = W[9]
              , Ot = W[10]
              , Nt = W[11]
              , Mt = W[12]
              , Gt = W[13]
              , rr = W[14]
              , Zt = W[15]
              , ur = ee * ze - ge * ke
              , ar = ee * Qe - Pe * ke
              , gr = ee * st - Ce * ke
              , yr = ge * Qe - Pe * ze
              , vr = ge * st - Ce * ze
              , Kr = Pe * st - Ce * Qe
              , Yr = ft * Gt - Xt * Mt
              , Qr = ft * rr - Ot * Mt
              , tn = ft * Zt - Nt * Mt
              , rn = Xt * rr - Ot * Gt
              , An = Xt * Zt - Nt * Gt
              , Xn = Ot * Zt - Nt * rr;
            return ur * Xn - ar * An + gr * rn + yr * tn - vr * Qr + Kr * Yr
        }
        function oc(W, ee, ge) {
            var Pe = ee[0]
              , Ce = ee[1]
              , ke = ee[2]
              , ze = ee[3]
              , Qe = ee[4]
              , st = ee[5]
              , ft = ee[6]
              , Xt = ee[7]
              , Ot = ee[8]
              , Nt = ee[9]
              , Mt = ee[10]
              , Gt = ee[11]
              , rr = ee[12]
              , Zt = ee[13]
              , ur = ee[14]
              , ar = ee[15]
              , gr = ge[0]
              , yr = ge[1]
              , vr = ge[2]
              , Kr = ge[3];
            return W[0] = gr * Pe + yr * Qe + vr * Ot + Kr * rr,
            W[1] = gr * Ce + yr * st + vr * Nt + Kr * Zt,
            W[2] = gr * ke + yr * ft + vr * Mt + Kr * ur,
            W[3] = gr * ze + yr * Xt + vr * Gt + Kr * ar,
            gr = ge[4],
            yr = ge[5],
            vr = ge[6],
            Kr = ge[7],
            W[4] = gr * Pe + yr * Qe + vr * Ot + Kr * rr,
            W[5] = gr * Ce + yr * st + vr * Nt + Kr * Zt,
            W[6] = gr * ke + yr * ft + vr * Mt + Kr * ur,
            W[7] = gr * ze + yr * Xt + vr * Gt + Kr * ar,
            gr = ge[8],
            yr = ge[9],
            vr = ge[10],
            Kr = ge[11],
            W[8] = gr * Pe + yr * Qe + vr * Ot + Kr * rr,
            W[9] = gr * Ce + yr * st + vr * Nt + Kr * Zt,
            W[10] = gr * ke + yr * ft + vr * Mt + Kr * ur,
            W[11] = gr * ze + yr * Xt + vr * Gt + Kr * ar,
            gr = ge[12],
            yr = ge[13],
            vr = ge[14],
            Kr = ge[15],
            W[12] = gr * Pe + yr * Qe + vr * Ot + Kr * rr,
            W[13] = gr * Ce + yr * st + vr * Nt + Kr * Zt,
            W[14] = gr * ke + yr * ft + vr * Mt + Kr * ur,
            W[15] = gr * ze + yr * Xt + vr * Gt + Kr * ar,
            W
        }
        function cu(W, ee, ge) {
            var Pe = ge[0], Ce = ge[1], ke = ge[2], ze, Qe, st, ft, Xt, Ot, Nt, Mt, Gt, rr, Zt, ur;
            return ee === W ? (W[12] = ee[0] * Pe + ee[4] * Ce + ee[8] * ke + ee[12],
            W[13] = ee[1] * Pe + ee[5] * Ce + ee[9] * ke + ee[13],
            W[14] = ee[2] * Pe + ee[6] * Ce + ee[10] * ke + ee[14],
            W[15] = ee[3] * Pe + ee[7] * Ce + ee[11] * ke + ee[15]) : (ze = ee[0],
            Qe = ee[1],
            st = ee[2],
            ft = ee[3],
            Xt = ee[4],
            Ot = ee[5],
            Nt = ee[6],
            Mt = ee[7],
            Gt = ee[8],
            rr = ee[9],
            Zt = ee[10],
            ur = ee[11],
            W[0] = ze,
            W[1] = Qe,
            W[2] = st,
            W[3] = ft,
            W[4] = Xt,
            W[5] = Ot,
            W[6] = Nt,
            W[7] = Mt,
            W[8] = Gt,
            W[9] = rr,
            W[10] = Zt,
            W[11] = ur,
            W[12] = ze * Pe + Xt * Ce + Gt * ke + ee[12],
            W[13] = Qe * Pe + Ot * Ce + rr * ke + ee[13],
            W[14] = st * Pe + Nt * Ce + Zt * ke + ee[14],
            W[15] = ft * Pe + Mt * Ce + ur * ke + ee[15]),
            W
        }
        function lu(W, ee, ge) {
            var Pe = ge[0]
              , Ce = ge[1]
              , ke = ge[2];
            return W[0] = ee[0] * Pe,
            W[1] = ee[1] * Pe,
            W[2] = ee[2] * Pe,
            W[3] = ee[3] * Pe,
            W[4] = ee[4] * Ce,
            W[5] = ee[5] * Ce,
            W[6] = ee[6] * Ce,
            W[7] = ee[7] * Ce,
            W[8] = ee[8] * ke,
            W[9] = ee[9] * ke,
            W[10] = ee[10] * ke,
            W[11] = ee[11] * ke,
            W[12] = ee[12],
            W[13] = ee[13],
            W[14] = ee[14],
            W[15] = ee[15],
            W
        }
        function uu(W, ee, ge, Pe) {
            var Ce = Pe[0], ke = Pe[1], ze = Pe[2], Qe = Math.hypot(Ce, ke, ze), st, ft, Xt, Ot, Nt, Mt, Gt, rr, Zt, ur, ar, gr, yr, vr, Kr, Yr, Qr, tn, rn, An, Xn, Dn, vn, ir;
            return Qe < dn ? null : (Qe = 1 / Qe,
            Ce *= Qe,
            ke *= Qe,
            ze *= Qe,
            st = Math.sin(ge),
            ft = Math.cos(ge),
            Xt = 1 - ft,
            Ot = ee[0],
            Nt = ee[1],
            Mt = ee[2],
            Gt = ee[3],
            rr = ee[4],
            Zt = ee[5],
            ur = ee[6],
            ar = ee[7],
            gr = ee[8],
            yr = ee[9],
            vr = ee[10],
            Kr = ee[11],
            Yr = Ce * Ce * Xt + ft,
            Qr = ke * Ce * Xt + ze * st,
            tn = ze * Ce * Xt - ke * st,
            rn = Ce * ke * Xt - ze * st,
            An = ke * ke * Xt + ft,
            Xn = ze * ke * Xt + Ce * st,
            Dn = Ce * ze * Xt + ke * st,
            vn = ke * ze * Xt - Ce * st,
            ir = ze * ze * Xt + ft,
            W[0] = Ot * Yr + rr * Qr + gr * tn,
            W[1] = Nt * Yr + Zt * Qr + yr * tn,
            W[2] = Mt * Yr + ur * Qr + vr * tn,
            W[3] = Gt * Yr + ar * Qr + Kr * tn,
            W[4] = Ot * rn + rr * An + gr * Xn,
            W[5] = Nt * rn + Zt * An + yr * Xn,
            W[6] = Mt * rn + ur * An + vr * Xn,
            W[7] = Gt * rn + ar * An + Kr * Xn,
            W[8] = Ot * Dn + rr * vn + gr * ir,
            W[9] = Nt * Dn + Zt * vn + yr * ir,
            W[10] = Mt * Dn + ur * vn + vr * ir,
            W[11] = Gt * Dn + ar * vn + Kr * ir,
            ee !== W && (W[12] = ee[12],
            W[13] = ee[13],
            W[14] = ee[14],
            W[15] = ee[15]),
            W)
        }
        function du(W, ee, ge) {
            var Pe = Math.sin(ge)
              , Ce = Math.cos(ge)
              , ke = ee[4]
              , ze = ee[5]
              , Qe = ee[6]
              , st = ee[7]
              , ft = ee[8]
              , Xt = ee[9]
              , Ot = ee[10]
              , Nt = ee[11];
            return ee !== W && (W[0] = ee[0],
            W[1] = ee[1],
            W[2] = ee[2],
            W[3] = ee[3],
            W[12] = ee[12],
            W[13] = ee[13],
            W[14] = ee[14],
            W[15] = ee[15]),
            W[4] = ke * Ce + ft * Pe,
            W[5] = ze * Ce + Xt * Pe,
            W[6] = Qe * Ce + Ot * Pe,
            W[7] = st * Ce + Nt * Pe,
            W[8] = ft * Ce - ke * Pe,
            W[9] = Xt * Ce - ze * Pe,
            W[10] = Ot * Ce - Qe * Pe,
            W[11] = Nt * Ce - st * Pe,
            W
        }
        function In(W, ee, ge) {
            var Pe = Math.sin(ge)
              , Ce = Math.cos(ge)
              , ke = ee[0]
              , ze = ee[1]
              , Qe = ee[2]
              , st = ee[3]
              , ft = ee[8]
              , Xt = ee[9]
              , Ot = ee[10]
              , Nt = ee[11];
            return ee !== W && (W[4] = ee[4],
            W[5] = ee[5],
            W[6] = ee[6],
            W[7] = ee[7],
            W[12] = ee[12],
            W[13] = ee[13],
            W[14] = ee[14],
            W[15] = ee[15]),
            W[0] = ke * Ce - ft * Pe,
            W[1] = ze * Ce - Xt * Pe,
            W[2] = Qe * Ce - Ot * Pe,
            W[3] = st * Ce - Nt * Pe,
            W[8] = ke * Pe + ft * Ce,
            W[9] = ze * Pe + Xt * Ce,
            W[10] = Qe * Pe + Ot * Ce,
            W[11] = st * Pe + Nt * Ce,
            W
        }
        function Ko(W, ee, ge) {
            var Pe = Math.sin(ge)
              , Ce = Math.cos(ge)
              , ke = ee[0]
              , ze = ee[1]
              , Qe = ee[2]
              , st = ee[3]
              , ft = ee[4]
              , Xt = ee[5]
              , Ot = ee[6]
              , Nt = ee[7];
            return ee !== W && (W[8] = ee[8],
            W[9] = ee[9],
            W[10] = ee[10],
            W[11] = ee[11],
            W[12] = ee[12],
            W[13] = ee[13],
            W[14] = ee[14],
            W[15] = ee[15]),
            W[0] = ke * Ce + ft * Pe,
            W[1] = ze * Ce + Xt * Pe,
            W[2] = Qe * Ce + Ot * Pe,
            W[3] = st * Ce + Nt * Pe,
            W[4] = ft * Ce - ke * Pe,
            W[5] = Xt * Ce - ze * Pe,
            W[6] = Ot * Ce - Qe * Pe,
            W[7] = Nt * Ce - st * Pe,
            W
        }
        function fu(W, ee) {
            return W[0] = 1,
            W[1] = 0,
            W[2] = 0,
            W[3] = 0,
            W[4] = 0,
            W[5] = 1,
            W[6] = 0,
            W[7] = 0,
            W[8] = 0,
            W[9] = 0,
            W[10] = 1,
            W[11] = 0,
            W[12] = ee[0],
            W[13] = ee[1],
            W[14] = ee[2],
            W[15] = 1,
            W
        }
        function vs(W, ee) {
            return W[0] = ee[0],
            W[1] = 0,
            W[2] = 0,
            W[3] = 0,
            W[4] = 0,
            W[5] = ee[1],
            W[6] = 0,
            W[7] = 0,
            W[8] = 0,
            W[9] = 0,
            W[10] = ee[2],
            W[11] = 0,
            W[12] = 0,
            W[13] = 0,
            W[14] = 0,
            W[15] = 1,
            W
        }
        function sc(W, ee, ge) {
            var Pe = ge[0], Ce = ge[1], ke = ge[2], ze = Math.hypot(Pe, Ce, ke), Qe, st, ft;
            return ze < dn ? null : (ze = 1 / ze,
            Pe *= ze,
            Ce *= ze,
            ke *= ze,
            Qe = Math.sin(ee),
            st = Math.cos(ee),
            ft = 1 - st,
            W[0] = Pe * Pe * ft + st,
            W[1] = Ce * Pe * ft + ke * Qe,
            W[2] = ke * Pe * ft - Ce * Qe,
            W[3] = 0,
            W[4] = Pe * Ce * ft - ke * Qe,
            W[5] = Ce * Ce * ft + st,
            W[6] = ke * Ce * ft + Pe * Qe,
            W[7] = 0,
            W[8] = Pe * ke * ft + Ce * Qe,
            W[9] = Ce * ke * ft - Pe * Qe,
            W[10] = ke * ke * ft + st,
            W[11] = 0,
            W[12] = 0,
            W[13] = 0,
            W[14] = 0,
            W[15] = 1,
            W)
        }
        function xo(W, ee) {
            var ge = Math.sin(ee)
              , Pe = Math.cos(ee);
            return W[0] = 1,
            W[1] = 0,
            W[2] = 0,
            W[3] = 0,
            W[4] = 0,
            W[5] = Pe,
            W[6] = ge,
            W[7] = 0,
            W[8] = 0,
            W[9] = -ge,
            W[10] = Pe,
            W[11] = 0,
            W[12] = 0,
            W[13] = 0,
            W[14] = 0,
            W[15] = 1,
            W
        }
        function Va(W, ee) {
            var ge = Math.sin(ee)
              , Pe = Math.cos(ee);
            return W[0] = Pe,
            W[1] = 0,
            W[2] = -ge,
            W[3] = 0,
            W[4] = 0,
            W[5] = 1,
            W[6] = 0,
            W[7] = 0,
            W[8] = ge,
            W[9] = 0,
            W[10] = Pe,
            W[11] = 0,
            W[12] = 0,
            W[13] = 0,
            W[14] = 0,
            W[15] = 1,
            W
        }
        function No(W, ee) {
            var ge = Math.sin(ee)
              , Pe = Math.cos(ee);
            return W[0] = Pe,
            W[1] = ge,
            W[2] = 0,
            W[3] = 0,
            W[4] = -ge,
            W[5] = Pe,
            W[6] = 0,
            W[7] = 0,
            W[8] = 0,
            W[9] = 0,
            W[10] = 1,
            W[11] = 0,
            W[12] = 0,
            W[13] = 0,
            W[14] = 0,
            W[15] = 1,
            W
        }
        function bs(W, ee, ge) {
            var Pe = ee[0]
              , Ce = ee[1]
              , ke = ee[2]
              , ze = ee[3]
              , Qe = Pe + Pe
              , st = Ce + Ce
              , ft = ke + ke
              , Xt = Pe * Qe
              , Ot = Pe * st
              , Nt = Pe * ft
              , Mt = Ce * st
              , Gt = Ce * ft
              , rr = ke * ft
              , Zt = ze * Qe
              , ur = ze * st
              , ar = ze * ft;
            return W[0] = 1 - (Mt + rr),
            W[1] = Ot + ar,
            W[2] = Nt - ur,
            W[3] = 0,
            W[4] = Ot - ar,
            W[5] = 1 - (Xt + rr),
            W[6] = Gt + Zt,
            W[7] = 0,
            W[8] = Nt + ur,
            W[9] = Gt - Zt,
            W[10] = 1 - (Xt + Mt),
            W[11] = 0,
            W[12] = ge[0],
            W[13] = ge[1],
            W[14] = ge[2],
            W[15] = 1,
            W
        }
        function so(W, ee) {
            var ge = new Un(3)
              , Pe = -ee[0]
              , Ce = -ee[1]
              , ke = -ee[2]
              , ze = ee[3]
              , Qe = ee[4]
              , st = ee[5]
              , ft = ee[6]
              , Xt = ee[7]
              , Ot = Pe * Pe + Ce * Ce + ke * ke + ze * ze;
            return Ot > 0 ? (ge[0] = (Qe * ze + Xt * Pe + st * ke - ft * Ce) * 2 / Ot,
            ge[1] = (st * ze + Xt * Ce + ft * Pe - Qe * ke) * 2 / Ot,
            ge[2] = (ft * ze + Xt * ke + Qe * Ce - st * Pe) * 2 / Ot) : (ge[0] = (Qe * ze + Xt * Pe + st * ke - ft * Ce) * 2,
            ge[1] = (st * ze + Xt * Ce + ft * Pe - Qe * ke) * 2,
            ge[2] = (ft * ze + Xt * ke + Qe * Ce - st * Pe) * 2),
            bs(W, ee, ge),
            W
        }
        function Ro(W, ee) {
            return W[0] = ee[12],
            W[1] = ee[13],
            W[2] = ee[14],
            W
        }
        function Oo(W, ee) {
            var ge = ee[0]
              , Pe = ee[1]
              , Ce = ee[2]
              , ke = ee[4]
              , ze = ee[5]
              , Qe = ee[6]
              , st = ee[8]
              , ft = ee[9]
              , Xt = ee[10];
            return W[0] = Math.hypot(ge, Pe, Ce),
            W[1] = Math.hypot(ke, ze, Qe),
            W[2] = Math.hypot(st, ft, Xt),
            W
        }
        function cc(W, ee) {
            var ge = new Un(3);
            Oo(ge, ee);
            var Pe = 1 / ge[0]
              , Ce = 1 / ge[1]
              , ke = 1 / ge[2]
              , ze = ee[0] * Pe
              , Qe = ee[1] * Ce
              , st = ee[2] * ke
              , ft = ee[4] * Pe
              , Xt = ee[5] * Ce
              , Ot = ee[6] * ke
              , Nt = ee[8] * Pe
              , Mt = ee[9] * Ce
              , Gt = ee[10] * ke
              , rr = ze + Xt + Gt
              , Zt = 0;
            return rr > 0 ? (Zt = Math.sqrt(rr + 1) * 2,
            W[3] = .25 * Zt,
            W[0] = (Ot - Mt) / Zt,
            W[1] = (Nt - st) / Zt,
            W[2] = (Qe - ft) / Zt) : ze > Xt && ze > Gt ? (Zt = Math.sqrt(1 + ze - Xt - Gt) * 2,
            W[3] = (Ot - Mt) / Zt,
            W[0] = .25 * Zt,
            W[1] = (Qe + ft) / Zt,
            W[2] = (Nt + st) / Zt) : Xt > Gt ? (Zt = Math.sqrt(1 + Xt - ze - Gt) * 2,
            W[3] = (Nt - st) / Zt,
            W[0] = (Qe + ft) / Zt,
            W[1] = .25 * Zt,
            W[2] = (Ot + Mt) / Zt) : (Zt = Math.sqrt(1 + Gt - ze - Xt) * 2,
            W[3] = (Qe - ft) / Zt,
            W[0] = (Nt + st) / Zt,
            W[1] = (Ot + Mt) / Zt,
            W[2] = .25 * Zt),
            W
        }
        function hu(W, ee, ge, Pe) {
            var Ce = ee[0]
              , ke = ee[1]
              , ze = ee[2]
              , Qe = ee[3]
              , st = Ce + Ce
              , ft = ke + ke
              , Xt = ze + ze
              , Ot = Ce * st
              , Nt = Ce * ft
              , Mt = Ce * Xt
              , Gt = ke * ft
              , rr = ke * Xt
              , Zt = ze * Xt
              , ur = Qe * st
              , ar = Qe * ft
              , gr = Qe * Xt
              , yr = Pe[0]
              , vr = Pe[1]
              , Kr = Pe[2];
            return W[0] = (1 - (Gt + Zt)) * yr,
            W[1] = (Nt + gr) * yr,
            W[2] = (Mt - ar) * yr,
            W[3] = 0,
            W[4] = (Nt - gr) * vr,
            W[5] = (1 - (Ot + Zt)) * vr,
            W[6] = (rr + ur) * vr,
            W[7] = 0,
            W[8] = (Mt + ar) * Kr,
            W[9] = (rr - ur) * Kr,
            W[10] = (1 - (Ot + Gt)) * Kr,
            W[11] = 0,
            W[12] = ge[0],
            W[13] = ge[1],
            W[14] = ge[2],
            W[15] = 1,
            W
        }
        function Pa(W, ee, ge, Pe, Ce) {
            var ke = ee[0]
              , ze = ee[1]
              , Qe = ee[2]
              , st = ee[3]
              , ft = ke + ke
              , Xt = ze + ze
              , Ot = Qe + Qe
              , Nt = ke * ft
              , Mt = ke * Xt
              , Gt = ke * Ot
              , rr = ze * Xt
              , Zt = ze * Ot
              , ur = Qe * Ot
              , ar = st * ft
              , gr = st * Xt
              , yr = st * Ot
              , vr = Pe[0]
              , Kr = Pe[1]
              , Yr = Pe[2]
              , Qr = Ce[0]
              , tn = Ce[1]
              , rn = Ce[2]
              , An = (1 - (rr + ur)) * vr
              , Xn = (Mt + yr) * vr
              , Dn = (Gt - gr) * vr
              , vn = (Mt - yr) * Kr
              , ir = (1 - (Nt + ur)) * Kr
              , Ht = (Zt + ar) * Kr
              , sr = (Gt + gr) * Yr
              , Ar = (Zt - ar) * Yr
              , Mr = (1 - (Nt + rr)) * Yr;
            return W[0] = An,
            W[1] = Xn,
            W[2] = Dn,
            W[3] = 0,
            W[4] = vn,
            W[5] = ir,
            W[6] = Ht,
            W[7] = 0,
            W[8] = sr,
            W[9] = Ar,
            W[10] = Mr,
            W[11] = 0,
            W[12] = ge[0] + Qr - (An * Qr + vn * tn + sr * rn),
            W[13] = ge[1] + tn - (Xn * Qr + ir * tn + Ar * rn),
            W[14] = ge[2] + rn - (Dn * Qr + Ht * tn + Mr * rn),
            W[15] = 1,
            W
        }
        function $a(W, ee) {
            var ge = ee[0]
              , Pe = ee[1]
              , Ce = ee[2]
              , ke = ee[3]
              , ze = ge + ge
              , Qe = Pe + Pe
              , st = Ce + Ce
              , ft = ge * ze
              , Xt = Pe * ze
              , Ot = Pe * Qe
              , Nt = Ce * ze
              , Mt = Ce * Qe
              , Gt = Ce * st
              , rr = ke * ze
              , Zt = ke * Qe
              , ur = ke * st;
            return W[0] = 1 - Ot - Gt,
            W[1] = Xt + ur,
            W[2] = Nt - Zt,
            W[3] = 0,
            W[4] = Xt - ur,
            W[5] = 1 - ft - Gt,
            W[6] = Mt + rr,
            W[7] = 0,
            W[8] = Nt + Zt,
            W[9] = Mt - rr,
            W[10] = 1 - ft - Ot,
            W[11] = 0,
            W[12] = 0,
            W[13] = 0,
            W[14] = 0,
            W[15] = 1,
            W
        }
        function Ps(W, ee, ge, Pe, Ce, ke, ze) {
            var Qe = 1 / (ge - ee)
              , st = 1 / (Ce - Pe)
              , ft = 1 / (ke - ze);
            return W[0] = ke * 2 * Qe,
            W[1] = 0,
            W[2] = 0,
            W[3] = 0,
            W[4] = 0,
            W[5] = ke * 2 * st,
            W[6] = 0,
            W[7] = 0,
            W[8] = (ge + ee) * Qe,
            W[9] = (Ce + Pe) * st,
            W[10] = (ze + ke) * ft,
            W[11] = -1,
            W[12] = 0,
            W[13] = 0,
            W[14] = ze * ke * 2 * ft,
            W[15] = 0,
            W
        }
        function lc(W, ee, ge, Pe, Ce) {
            var ke = 1 / Math.tan(ee / 2), ze;
            return W[0] = ke / ge,
            W[1] = 0,
            W[2] = 0,
            W[3] = 0,
            W[4] = 0,
            W[5] = ke,
            W[6] = 0,
            W[7] = 0,
            W[8] = 0,
            W[9] = 0,
            W[11] = -1,
            W[12] = 0,
            W[13] = 0,
            W[15] = 0,
            Ce != null && Ce !== 1 / 0 ? (ze = 1 / (Pe - Ce),
            W[10] = (Ce + Pe) * ze,
            W[14] = 2 * Ce * Pe * ze) : (W[10] = -1,
            W[14] = -2 * Pe),
            W
        }
        var mu = lc;
        function pu(W, ee, ge, Pe, Ce) {
            var ke = 1 / Math.tan(ee / 2), ze;
            return W[0] = ke / ge,
            W[1] = 0,
            W[2] = 0,
            W[3] = 0,
            W[4] = 0,
            W[5] = ke,
            W[6] = 0,
            W[7] = 0,
            W[8] = 0,
            W[9] = 0,
            W[11] = -1,
            W[12] = 0,
            W[13] = 0,
            W[15] = 0,
            Ce != null && Ce !== 1 / 0 ? (ze = 1 / (Pe - Ce),
            W[10] = Ce * ze,
            W[14] = Ce * Pe * ze) : (W[10] = -1,
            W[14] = -Pe),
            W
        }
        function gu(W, ee, ge, Pe) {
            var Ce = Math.tan(ee.upDegrees * Math.PI / 180)
              , ke = Math.tan(ee.downDegrees * Math.PI / 180)
              , ze = Math.tan(ee.leftDegrees * Math.PI / 180)
              , Qe = Math.tan(ee.rightDegrees * Math.PI / 180)
              , st = 2 / (ze + Qe)
              , ft = 2 / (Ce + ke);
            return W[0] = st,
            W[1] = 0,
            W[2] = 0,
            W[3] = 0,
            W[4] = 0,
            W[5] = ft,
            W[6] = 0,
            W[7] = 0,
            W[8] = -((ze - Qe) * st * .5),
            W[9] = (Ce - ke) * ft * .5,
            W[10] = Pe / (ge - Pe),
            W[11] = -1,
            W[12] = 0,
            W[13] = 0,
            W[14] = Pe * ge / (ge - Pe),
            W[15] = 0,
            W
        }
        function ys(W, ee, ge, Pe, Ce, ke, ze) {
            var Qe = 1 / (ee - ge)
              , st = 1 / (Pe - Ce)
              , ft = 1 / (ke - ze);
            return W[0] = -2 * Qe,
            W[1] = 0,
            W[2] = 0,
            W[3] = 0,
            W[4] = 0,
            W[5] = -2 * st,
            W[6] = 0,
            W[7] = 0,
            W[8] = 0,
            W[9] = 0,
            W[10] = 2 * ft,
            W[11] = 0,
            W[12] = (ee + ge) * Qe,
            W[13] = (Ce + Pe) * st,
            W[14] = (ze + ke) * ft,
            W[15] = 1,
            W
        }
        var _u = ys;
        function vu(W, ee, ge, Pe, Ce, ke, ze) {
            var Qe = 1 / (ee - ge)
              , st = 1 / (Pe - Ce)
              , ft = 1 / (ke - ze);
            return W[0] = -2 * Qe,
            W[1] = 0,
            W[2] = 0,
            W[3] = 0,
            W[4] = 0,
            W[5] = -2 * st,
            W[6] = 0,
            W[7] = 0,
            W[8] = 0,
            W[9] = 0,
            W[10] = ft,
            W[11] = 0,
            W[12] = (ee + ge) * Qe,
            W[13] = (Ce + Pe) * st,
            W[14] = ke * ft,
            W[15] = 1,
            W
        }
        function Na(W, ee, ge, Pe) {
            var Ce, ke, ze, Qe, st, ft, Xt, Ot, Nt, Mt, Gt = ee[0], rr = ee[1], Zt = ee[2], ur = Pe[0], ar = Pe[1], gr = Pe[2], yr = ge[0], vr = ge[1], Kr = ge[2];
            return Math.abs(Gt - yr) < dn && Math.abs(rr - vr) < dn && Math.abs(Zt - Kr) < dn ? ac(W) : (Xt = Gt - yr,
            Ot = rr - vr,
            Nt = Zt - Kr,
            Mt = 1 / Math.hypot(Xt, Ot, Nt),
            Xt *= Mt,
            Ot *= Mt,
            Nt *= Mt,
            Ce = ar * Nt - gr * Ot,
            ke = gr * Xt - ur * Nt,
            ze = ur * Ot - ar * Xt,
            Mt = Math.hypot(Ce, ke, ze),
            Mt ? (Mt = 1 / Mt,
            Ce *= Mt,
            ke *= Mt,
            ze *= Mt) : (Ce = 0,
            ke = 0,
            ze = 0),
            Qe = Ot * ze - Nt * ke,
            st = Nt * Ce - Xt * ze,
            ft = Xt * ke - Ot * Ce,
            Mt = Math.hypot(Qe, st, ft),
            Mt ? (Mt = 1 / Mt,
            Qe *= Mt,
            st *= Mt,
            ft *= Mt) : (Qe = 0,
            st = 0,
            ft = 0),
            W[0] = Ce,
            W[1] = Qe,
            W[2] = Xt,
            W[3] = 0,
            W[4] = ke,
            W[5] = st,
            W[6] = Ot,
            W[7] = 0,
            W[8] = ze,
            W[9] = ft,
            W[10] = Nt,
            W[11] = 0,
            W[12] = -(Ce * Gt + ke * rr + ze * Zt),
            W[13] = -(Qe * Gt + st * rr + ft * Zt),
            W[14] = -(Xt * Gt + Ot * rr + Nt * Zt),
            W[15] = 1,
            W)
        }
        function Zr(W, ee, ge, Pe) {
            var Ce = ee[0]
              , ke = ee[1]
              , ze = ee[2]
              , Qe = Pe[0]
              , st = Pe[1]
              , ft = Pe[2]
              , Xt = Ce - ge[0]
              , Ot = ke - ge[1]
              , Nt = ze - ge[2]
              , Mt = Xt * Xt + Ot * Ot + Nt * Nt;
            Mt > 0 && (Mt = 1 / Math.sqrt(Mt),
            Xt *= Mt,
            Ot *= Mt,
            Nt *= Mt);
            var Gt = st * Nt - ft * Ot
              , rr = ft * Xt - Qe * Nt
              , Zt = Qe * Ot - st * Xt;
            return Mt = Gt * Gt + rr * rr + Zt * Zt,
            Mt > 0 && (Mt = 1 / Math.sqrt(Mt),
            Gt *= Mt,
            rr *= Mt,
            Zt *= Mt),
            W[0] = Gt,
            W[1] = rr,
            W[2] = Zt,
            W[3] = 0,
            W[4] = Ot * Zt - Nt * rr,
            W[5] = Nt * Gt - Xt * Zt,
            W[6] = Xt * rr - Ot * Gt,
            W[7] = 0,
            W[8] = Xt,
            W[9] = Ot,
            W[10] = Nt,
            W[11] = 0,
            W[12] = Ce,
            W[13] = ke,
            W[14] = ze,
            W[15] = 1,
            W
        }
        function Mo(W) {
            return "mat4(" + W[0] + ", " + W[1] + ", " + W[2] + ", " + W[3] + ", " + W[4] + ", " + W[5] + ", " + W[6] + ", " + W[7] + ", " + W[8] + ", " + W[9] + ", " + W[10] + ", " + W[11] + ", " + W[12] + ", " + W[13] + ", " + W[14] + ", " + W[15] + ")"
        }
        function Ra(W) {
            return Math.hypot(W[0], W[1], W[2], W[3], W[4], W[5], W[6], W[7], W[8], W[9], W[10], W[11], W[12], W[13], W[14], W[15])
        }
        function bu(W, ee, ge) {
            return W[0] = ee[0] + ge[0],
            W[1] = ee[1] + ge[1],
            W[2] = ee[2] + ge[2],
            W[3] = ee[3] + ge[3],
            W[4] = ee[4] + ge[4],
            W[5] = ee[5] + ge[5],
            W[6] = ee[6] + ge[6],
            W[7] = ee[7] + ge[7],
            W[8] = ee[8] + ge[8],
            W[9] = ee[9] + ge[9],
            W[10] = ee[10] + ge[10],
            W[11] = ee[11] + ge[11],
            W[12] = ee[12] + ge[12],
            W[13] = ee[13] + ge[13],
            W[14] = ee[14] + ge[14],
            W[15] = ee[15] + ge[15],
            W
        }
        function Ss(W, ee, ge) {
            return W[0] = ee[0] - ge[0],
            W[1] = ee[1] - ge[1],
            W[2] = ee[2] - ge[2],
            W[3] = ee[3] - ge[3],
            W[4] = ee[4] - ge[4],
            W[5] = ee[5] - ge[5],
            W[6] = ee[6] - ge[6],
            W[7] = ee[7] - ge[7],
            W[8] = ee[8] - ge[8],
            W[9] = ee[9] - ge[9],
            W[10] = ee[10] - ge[10],
            W[11] = ee[11] - ge[11],
            W[12] = ee[12] - ge[12],
            W[13] = ee[13] - ge[13],
            W[14] = ee[14] - ge[14],
            W[15] = ee[15] - ge[15],
            W
        }
        function Pu(W, ee, ge) {
            return W[0] = ee[0] * ge,
            W[1] = ee[1] * ge,
            W[2] = ee[2] * ge,
            W[3] = ee[3] * ge,
            W[4] = ee[4] * ge,
            W[5] = ee[5] * ge,
            W[6] = ee[6] * ge,
            W[7] = ee[7] * ge,
            W[8] = ee[8] * ge,
            W[9] = ee[9] * ge,
            W[10] = ee[10] * ge,
            W[11] = ee[11] * ge,
            W[12] = ee[12] * ge,
            W[13] = ee[13] * ge,
            W[14] = ee[14] * ge,
            W[15] = ee[15] * ge,
            W
        }
        function co(W, ee, ge, Pe) {
            return W[0] = ee[0] + ge[0] * Pe,
            W[1] = ee[1] + ge[1] * Pe,
            W[2] = ee[2] + ge[2] * Pe,
            W[3] = ee[3] + ge[3] * Pe,
            W[4] = ee[4] + ge[4] * Pe,
            W[5] = ee[5] + ge[5] * Pe,
            W[6] = ee[6] + ge[6] * Pe,
            W[7] = ee[7] + ge[7] * Pe,
            W[8] = ee[8] + ge[8] * Pe,
            W[9] = ee[9] + ge[9] * Pe,
            W[10] = ee[10] + ge[10] * Pe,
            W[11] = ee[11] + ge[11] * Pe,
            W[12] = ee[12] + ge[12] * Pe,
            W[13] = ee[13] + ge[13] * Pe,
            W[14] = ee[14] + ge[14] * Pe,
            W[15] = ee[15] + ge[15] * Pe,
            W
        }
        function yu(W, ee) {
            return W[0] === ee[0] && W[1] === ee[1] && W[2] === ee[2] && W[3] === ee[3] && W[4] === ee[4] && W[5] === ee[5] && W[6] === ee[6] && W[7] === ee[7] && W[8] === ee[8] && W[9] === ee[9] && W[10] === ee[10] && W[11] === ee[11] && W[12] === ee[12] && W[13] === ee[13] && W[14] === ee[14] && W[15] === ee[15]
        }
        function uc(W, ee) {
            var ge = W[0]
              , Pe = W[1]
              , Ce = W[2]
              , ke = W[3]
              , ze = W[4]
              , Qe = W[5]
              , st = W[6]
              , ft = W[7]
              , Xt = W[8]
              , Ot = W[9]
              , Nt = W[10]
              , Mt = W[11]
              , Gt = W[12]
              , rr = W[13]
              , Zt = W[14]
              , ur = W[15]
              , ar = ee[0]
              , gr = ee[1]
              , yr = ee[2]
              , vr = ee[3]
              , Kr = ee[4]
              , Yr = ee[5]
              , Qr = ee[6]
              , tn = ee[7]
              , rn = ee[8]
              , An = ee[9]
              , Xn = ee[10]
              , Dn = ee[11]
              , vn = ee[12]
              , ir = ee[13]
              , Ht = ee[14]
              , sr = ee[15];
            return Math.abs(ge - ar) <= dn * Math.max(1, Math.abs(ge), Math.abs(ar)) && Math.abs(Pe - gr) <= dn * Math.max(1, Math.abs(Pe), Math.abs(gr)) && Math.abs(Ce - yr) <= dn * Math.max(1, Math.abs(Ce), Math.abs(yr)) && Math.abs(ke - vr) <= dn * Math.max(1, Math.abs(ke), Math.abs(vr)) && Math.abs(ze - Kr) <= dn * Math.max(1, Math.abs(ze), Math.abs(Kr)) && Math.abs(Qe - Yr) <= dn * Math.max(1, Math.abs(Qe), Math.abs(Yr)) && Math.abs(st - Qr) <= dn * Math.max(1, Math.abs(st), Math.abs(Qr)) && Math.abs(ft - tn) <= dn * Math.max(1, Math.abs(ft), Math.abs(tn)) && Math.abs(Xt - rn) <= dn * Math.max(1, Math.abs(Xt), Math.abs(rn)) && Math.abs(Ot - An) <= dn * Math.max(1, Math.abs(Ot), Math.abs(An)) && Math.abs(Nt - Xn) <= dn * Math.max(1, Math.abs(Nt), Math.abs(Xn)) && Math.abs(Mt - Dn) <= dn * Math.max(1, Math.abs(Mt), Math.abs(Dn)) && Math.abs(Gt - vn) <= dn * Math.max(1, Math.abs(Gt), Math.abs(vn)) && Math.abs(rr - ir) <= dn * Math.max(1, Math.abs(rr), Math.abs(ir)) && Math.abs(Zt - Ht) <= dn * Math.max(1, Math.abs(Zt), Math.abs(Ht)) && Math.abs(ur - sr) <= dn * Math.max(1, Math.abs(ur), Math.abs(sr))
        }
        var dc = oc
          , fc = Ss
          , Su = Object.freeze({
            __proto__: null,
            add: bu,
            adjoint: ou,
            clone: tu,
            copy: ic,
            create: eu,
            determinant: su,
            equals: uc,
            exactEquals: yu,
            frob: Ra,
            fromQuat: $a,
            fromQuat2: so,
            fromRotation: sc,
            fromRotationTranslation: bs,
            fromRotationTranslationScale: hu,
            fromRotationTranslationScaleOrigin: Pa,
            fromScaling: vs,
            fromTranslation: fu,
            fromValues: ru,
            fromXRotation: xo,
            fromYRotation: Va,
            fromZRotation: No,
            frustum: Ps,
            getRotation: cc,
            getScaling: Oo,
            getTranslation: Ro,
            identity: ac,
            invert: au,
            lookAt: Na,
            mul: dc,
            multiply: oc,
            multiplyScalar: Pu,
            multiplyScalarAndAdd: co,
            ortho: _u,
            orthoNO: ys,
            orthoZO: vu,
            perspective: mu,
            perspectiveFromFieldOfView: gu,
            perspectiveNO: lc,
            perspectiveZO: pu,
            rotate: uu,
            rotateX: du,
            rotateY: In,
            rotateZ: Ko,
            scale: lu,
            set: nu,
            str: Mo,
            sub: fc,
            subtract: Ss,
            targetTo: Zr,
            translate: cu,
            transpose: iu
        });
        function Es() {
            var W = new Un(3);
            return Un != Float32Array && (W[0] = 0,
            W[1] = 0,
            W[2] = 0),
            W
        }
        function Eu(W) {
            var ee = new Un(3);
            return ee[0] = W[0],
            ee[1] = W[1],
            ee[2] = W[2],
            ee
        }
        function hc(W) {
            var ee = W[0]
              , ge = W[1]
              , Pe = W[2];
            return Math.hypot(ee, ge, Pe)
        }
        function As(W, ee, ge) {
            var Pe = new Un(3);
            return Pe[0] = W,
            Pe[1] = ee,
            Pe[2] = ge,
            Pe
        }
        function mc(W, ee) {
            return W[0] = ee[0],
            W[1] = ee[1],
            W[2] = ee[2],
            W
        }
        function Au(W, ee, ge, Pe) {
            return W[0] = ee,
            W[1] = ge,
            W[2] = Pe,
            W
        }
        function Xu(W, ee, ge) {
            return W[0] = ee[0] + ge[0],
            W[1] = ee[1] + ge[1],
            W[2] = ee[2] + ge[2],
            W
        }
        function pc(W, ee, ge) {
            return W[0] = ee[0] - ge[0],
            W[1] = ee[1] - ge[1],
            W[2] = ee[2] - ge[2],
            W
        }
        function gc(W, ee, ge) {
            return W[0] = ee[0] * ge[0],
            W[1] = ee[1] * ge[1],
            W[2] = ee[2] * ge[2],
            W
        }
        function _c(W, ee, ge) {
            return W[0] = ee[0] / ge[0],
            W[1] = ee[1] / ge[1],
            W[2] = ee[2] / ge[2],
            W
        }
        function vc(W, ee) {
            return W[0] = Math.ceil(ee[0]),
            W[1] = Math.ceil(ee[1]),
            W[2] = Math.ceil(ee[2]),
            W
        }
        function Tu(W, ee) {
            return W[0] = Math.floor(ee[0]),
            W[1] = Math.floor(ee[1]),
            W[2] = Math.floor(ee[2]),
            W
        }
        function Cu(W, ee, ge) {
            return W[0] = Math.min(ee[0], ge[0]),
            W[1] = Math.min(ee[1], ge[1]),
            W[2] = Math.min(ee[2], ge[2]),
            W
        }
        function wu(W, ee, ge) {
            return W[0] = Math.max(ee[0], ge[0]),
            W[1] = Math.max(ee[1], ge[1]),
            W[2] = Math.max(ee[2], ge[2]),
            W
        }
        function Ku(W, ee) {
            return W[0] = Math.round(ee[0]),
            W[1] = Math.round(ee[1]),
            W[2] = Math.round(ee[2]),
            W
        }
        function bc(W, ee, ge) {
            return W[0] = ee[0] * ge,
            W[1] = ee[1] * ge,
            W[2] = ee[2] * ge,
            W
        }
        function Ni(W, ee, ge, Pe) {
            return W[0] = ee[0] + ge[0] * Pe,
            W[1] = ee[1] + ge[1] * Pe,
            W[2] = ee[2] + ge[2] * Pe,
            W
        }
        function Pc(W, ee) {
            var ge = ee[0] - W[0]
              , Pe = ee[1] - W[1]
              , Ce = ee[2] - W[2];
            return Math.hypot(ge, Pe, Ce)
        }
        function yc(W, ee) {
            var ge = ee[0] - W[0]
              , Pe = ee[1] - W[1]
              , Ce = ee[2] - W[2];
            return ge * ge + Pe * Pe + Ce * Ce
        }
        function Sc(W) {
            var ee = W[0]
              , ge = W[1]
              , Pe = W[2];
            return ee * ee + ge * ge + Pe * Pe
        }
        function xu(W, ee) {
            return W[0] = -ee[0],
            W[1] = -ee[1],
            W[2] = -ee[2],
            W
        }
        function Nu(W, ee) {
            return W[0] = 1 / ee[0],
            W[1] = 1 / ee[1],
            W[2] = 1 / ee[2],
            W
        }
        function Ec(W, ee) {
            var ge = ee[0]
              , Pe = ee[1]
              , Ce = ee[2]
              , ke = ge * ge + Pe * Pe + Ce * Ce;
            return ke > 0 && (ke = 1 / Math.sqrt(ke)),
            W[0] = ee[0] * ke,
            W[1] = ee[1] * ke,
            W[2] = ee[2] * ke,
            W
        }
        function Xs(W, ee) {
            return W[0] * ee[0] + W[1] * ee[1] + W[2] * ee[2]
        }
        function Io(W, ee, ge) {
            var Pe = ee[0]
              , Ce = ee[1]
              , ke = ee[2]
              , ze = ge[0]
              , Qe = ge[1]
              , st = ge[2];
            return W[0] = Ce * st - ke * Qe,
            W[1] = ke * ze - Pe * st,
            W[2] = Pe * Qe - Ce * ze,
            W
        }
        function ya(W, ee, ge, Pe) {
            var Ce = ee[0]
              , ke = ee[1]
              , ze = ee[2];
            return W[0] = Ce + Pe * (ge[0] - Ce),
            W[1] = ke + Pe * (ge[1] - ke),
            W[2] = ze + Pe * (ge[2] - ze),
            W
        }
        function Ru(W, ee, ge, Pe, Ce, ke) {
            var ze = ke * ke
              , Qe = ze * (2 * ke - 3) + 1
              , st = ze * (ke - 2) + ke
              , ft = ze * (ke - 1)
              , Xt = ze * (3 - 2 * ke);
            return W[0] = ee[0] * Qe + ge[0] * st + Pe[0] * ft + Ce[0] * Xt,
            W[1] = ee[1] * Qe + ge[1] * st + Pe[1] * ft + Ce[1] * Xt,
            W[2] = ee[2] * Qe + ge[2] * st + Pe[2] * ft + Ce[2] * Xt,
            W
        }
        function Ac(W, ee, ge, Pe, Ce, ke) {
            var ze = 1 - ke
              , Qe = ze * ze
              , st = ke * ke
              , ft = Qe * ze
              , Xt = 3 * ke * Qe
              , Ot = 3 * st * ze
              , Nt = st * ke;
            return W[0] = ee[0] * ft + ge[0] * Xt + Pe[0] * Ot + Ce[0] * Nt,
            W[1] = ee[1] * ft + ge[1] * Xt + Pe[1] * Ot + Ce[1] * Nt,
            W[2] = ee[2] * ft + ge[2] * Xt + Pe[2] * Ot + Ce[2] * Nt,
            W
        }
        function Ts(W, ee) {
            ee = ee || 1;
            var ge = Oi() * 2 * Math.PI
              , Pe = Oi() * 2 - 1
              , Ce = Math.sqrt(1 - Pe * Pe) * ee;
            return W[0] = Math.cos(ge) * Ce,
            W[1] = Math.sin(ge) * Ce,
            W[2] = Pe * ee,
            W
        }
        function li(W, ee, ge) {
            var Pe = ee[0]
              , Ce = ee[1]
              , ke = ee[2]
              , ze = ge[3] * Pe + ge[7] * Ce + ge[11] * ke + ge[15];
            return ze = ze || 1,
            W[0] = (ge[0] * Pe + ge[4] * Ce + ge[8] * ke + ge[12]) / ze,
            W[1] = (ge[1] * Pe + ge[5] * Ce + ge[9] * ke + ge[13]) / ze,
            W[2] = (ge[2] * Pe + ge[6] * Ce + ge[10] * ke + ge[14]) / ze,
            W
        }
        function Sa(W, ee, ge) {
            var Pe = ee[0]
              , Ce = ee[1]
              , ke = ee[2];
            return W[0] = Pe * ge[0] + Ce * ge[3] + ke * ge[6],
            W[1] = Pe * ge[1] + Ce * ge[4] + ke * ge[7],
            W[2] = Pe * ge[2] + Ce * ge[5] + ke * ge[8],
            W
        }
        function Cs(W, ee, ge) {
            var Pe = ge[0]
              , Ce = ge[1]
              , ke = ge[2]
              , ze = ge[3]
              , Qe = ee[0]
              , st = ee[1]
              , ft = ee[2]
              , Xt = Ce * ft - ke * st
              , Ot = ke * Qe - Pe * ft
              , Nt = Pe * st - Ce * Qe
              , Mt = Ce * Nt - ke * Ot
              , Gt = ke * Xt - Pe * Nt
              , rr = Pe * Ot - Ce * Xt
              , Zt = ze * 2;
            return Xt *= Zt,
            Ot *= Zt,
            Nt *= Zt,
            Mt *= 2,
            Gt *= 2,
            rr *= 2,
            W[0] = Qe + Xt + Mt,
            W[1] = st + Ot + Gt,
            W[2] = ft + Nt + rr,
            W
        }
        function Ou(W, ee, ge, Pe) {
            var Ce = []
              , ke = [];
            return Ce[0] = ee[0] - ge[0],
            Ce[1] = ee[1] - ge[1],
            Ce[2] = ee[2] - ge[2],
            ke[0] = Ce[0],
            ke[1] = Ce[1] * Math.cos(Pe) - Ce[2] * Math.sin(Pe),
            ke[2] = Ce[1] * Math.sin(Pe) + Ce[2] * Math.cos(Pe),
            W[0] = ke[0] + ge[0],
            W[1] = ke[1] + ge[1],
            W[2] = ke[2] + ge[2],
            W
        }
        function Bo(W, ee, ge, Pe) {
            var Ce = []
              , ke = [];
            return Ce[0] = ee[0] - ge[0],
            Ce[1] = ee[1] - ge[1],
            Ce[2] = ee[2] - ge[2],
            ke[0] = Ce[2] * Math.sin(Pe) + Ce[0] * Math.cos(Pe),
            ke[1] = Ce[1],
            ke[2] = Ce[2] * Math.cos(Pe) - Ce[0] * Math.sin(Pe),
            W[0] = ke[0] + ge[0],
            W[1] = ke[1] + ge[1],
            W[2] = ke[2] + ge[2],
            W
        }
        function Do(W, ee, ge, Pe) {
            var Ce = []
              , ke = [];
            return Ce[0] = ee[0] - ge[0],
            Ce[1] = ee[1] - ge[1],
            Ce[2] = ee[2] - ge[2],
            ke[0] = Ce[0] * Math.cos(Pe) - Ce[1] * Math.sin(Pe),
            ke[1] = Ce[0] * Math.sin(Pe) + Ce[1] * Math.cos(Pe),
            ke[2] = Ce[2],
            W[0] = ke[0] + ge[0],
            W[1] = ke[1] + ge[1],
            W[2] = ke[2] + ge[2],
            W
        }
        function ko(W, ee) {
            var ge = W[0]
              , Pe = W[1]
              , Ce = W[2]
              , ke = ee[0]
              , ze = ee[1]
              , Qe = ee[2]
              , st = Math.sqrt(ge * ge + Pe * Pe + Ce * Ce)
              , ft = Math.sqrt(ke * ke + ze * ze + Qe * Qe)
              , Xt = st * ft
              , Ot = Xt && Xs(W, ee) / Xt;
            return Math.acos(Math.min(Math.max(Ot, -1), 1))
        }
        function jn(W) {
            return W[0] = 0,
            W[1] = 0,
            W[2] = 0,
            W
        }
        function Mu(W) {
            return "vec3(" + W[0] + ", " + W[1] + ", " + W[2] + ")"
        }
        function Ea(W, ee) {
            return W[0] === ee[0] && W[1] === ee[1] && W[2] === ee[2]
        }
        function Iu(W, ee) {
            var ge = W[0]
              , Pe = W[1]
              , Ce = W[2]
              , ke = ee[0]
              , ze = ee[1]
              , Qe = ee[2];
            return Math.abs(ge - ke) <= dn * Math.max(1, Math.abs(ge), Math.abs(ke)) && Math.abs(Pe - ze) <= dn * Math.max(1, Math.abs(Pe), Math.abs(ze)) && Math.abs(Ce - Qe) <= dn * Math.max(1, Math.abs(Ce), Math.abs(Qe))
        }
        var Bu = pc
          , Du = gc
          , Lo = _c
          , $i = Pc
          , Xc = yc
          , Oa = hc
          , Tc = Sc
          , ku = function() {
            var W = Es();
            return function(ee, ge, Pe, Ce, ke, ze) {
                var Qe, st;
                for (ge || (ge = 3),
                Pe || (Pe = 0),
                Ce ? st = Math.min(Ce * ge + Pe, ee.length) : st = ee.length,
                Qe = Pe; Qe < st; Qe += ge)
                    W[0] = ee[Qe],
                    W[1] = ee[Qe + 1],
                    W[2] = ee[Qe + 2],
                    ke(W, W, ze),
                    ee[Qe] = W[0],
                    ee[Qe + 1] = W[1],
                    ee[Qe + 2] = W[2];
                return ee
            }
        }()
          , Uo = Object.freeze({
            __proto__: null,
            add: Xu,
            angle: ko,
            bezier: Ac,
            ceil: vc,
            clone: Eu,
            copy: mc,
            create: Es,
            cross: Io,
            dist: $i,
            distance: Pc,
            div: Lo,
            divide: _c,
            dot: Xs,
            equals: Iu,
            exactEquals: Ea,
            floor: Tu,
            forEach: ku,
            fromValues: As,
            hermite: Ru,
            inverse: Nu,
            len: Oa,
            length: hc,
            lerp: ya,
            max: wu,
            min: Cu,
            mul: Du,
            multiply: gc,
            negate: xu,
            normalize: Ec,
            random: Ts,
            rotateX: Ou,
            rotateY: Bo,
            rotateZ: Do,
            round: Ku,
            scale: bc,
            scaleAndAdd: Ni,
            set: Au,
            sqrDist: Xc,
            sqrLen: Tc,
            squaredDistance: yc,
            squaredLength: Sc,
            str: Mu,
            sub: Bu,
            subtract: pc,
            transformMat3: Sa,
            transformMat4: li,
            transformQuat: Cs,
            zero: jn
        });
        function lo() {
            var W = new Un(4);
            return Un != Float32Array && (W[0] = 0,
            W[1] = 0,
            W[2] = 0,
            W[3] = 0),
            W
        }
        function Aa(W) {
            var ee = new Un(4);
            return ee[0] = W[0],
            ee[1] = W[1],
            ee[2] = W[2],
            ee[3] = W[3],
            ee
        }
        function Cc(W, ee, ge, Pe) {
            var Ce = new Un(4);
            return Ce[0] = W,
            Ce[1] = ee,
            Ce[2] = ge,
            Ce[3] = Pe,
            Ce
        }
        function uo(W, ee) {
            return W[0] = ee[0],
            W[1] = ee[1],
            W[2] = ee[2],
            W[3] = ee[3],
            W
        }
        function Ya(W, ee, ge, Pe, Ce) {
            return W[0] = ee,
            W[1] = ge,
            W[2] = Pe,
            W[3] = Ce,
            W
        }
        function wc(W, ee, ge) {
            return W[0] = ee[0] + ge[0],
            W[1] = ee[1] + ge[1],
            W[2] = ee[2] + ge[2],
            W[3] = ee[3] + ge[3],
            W
        }
        function Kc(W, ee, ge) {
            return W[0] = ee[0] - ge[0],
            W[1] = ee[1] - ge[1],
            W[2] = ee[2] - ge[2],
            W[3] = ee[3] - ge[3],
            W
        }
        function xc(W, ee, ge) {
            return W[0] = ee[0] * ge[0],
            W[1] = ee[1] * ge[1],
            W[2] = ee[2] * ge[2],
            W[3] = ee[3] * ge[3],
            W
        }
        function ws(W, ee, ge) {
            return W[0] = ee[0] / ge[0],
            W[1] = ee[1] / ge[1],
            W[2] = ee[2] / ge[2],
            W[3] = ee[3] / ge[3],
            W
        }
        function Lu(W, ee) {
            return W[0] = Math.ceil(ee[0]),
            W[1] = Math.ceil(ee[1]),
            W[2] = Math.ceil(ee[2]),
            W[3] = Math.ceil(ee[3]),
            W
        }
        function Uu(W, ee) {
            return W[0] = Math.floor(ee[0]),
            W[1] = Math.floor(ee[1]),
            W[2] = Math.floor(ee[2]),
            W[3] = Math.floor(ee[3]),
            W
        }
        function Fu(W, ee, ge) {
            return W[0] = Math.min(ee[0], ge[0]),
            W[1] = Math.min(ee[1], ge[1]),
            W[2] = Math.min(ee[2], ge[2]),
            W[3] = Math.min(ee[3], ge[3]),
            W
        }
        function Wu(W, ee, ge) {
            return W[0] = Math.max(ee[0], ge[0]),
            W[1] = Math.max(ee[1], ge[1]),
            W[2] = Math.max(ee[2], ge[2]),
            W[3] = Math.max(ee[3], ge[3]),
            W
        }
        function qu(W, ee) {
            return W[0] = Math.round(ee[0]),
            W[1] = Math.round(ee[1]),
            W[2] = Math.round(ee[2]),
            W[3] = Math.round(ee[3]),
            W
        }
        function Nc(W, ee, ge) {
            return W[0] = ee[0] * ge,
            W[1] = ee[1] * ge,
            W[2] = ee[2] * ge,
            W[3] = ee[3] * ge,
            W
        }
        function Vu(W, ee, ge, Pe) {
            return W[0] = ee[0] + ge[0] * Pe,
            W[1] = ee[1] + ge[1] * Pe,
            W[2] = ee[2] + ge[2] * Pe,
            W[3] = ee[3] + ge[3] * Pe,
            W
        }
        function Rc(W, ee) {
            var ge = ee[0] - W[0]
              , Pe = ee[1] - W[1]
              , Ce = ee[2] - W[2]
              , ke = ee[3] - W[3];
            return Math.hypot(ge, Pe, Ce, ke)
        }
        function Oc(W, ee) {
            var ge = ee[0] - W[0]
              , Pe = ee[1] - W[1]
              , Ce = ee[2] - W[2]
              , ke = ee[3] - W[3];
            return ge * ge + Pe * Pe + Ce * Ce + ke * ke
        }
        function Ks(W) {
            var ee = W[0]
              , ge = W[1]
              , Pe = W[2]
              , Ce = W[3];
            return Math.hypot(ee, ge, Pe, Ce)
        }
        function xs(W) {
            var ee = W[0]
              , ge = W[1]
              , Pe = W[2]
              , Ce = W[3];
            return ee * ee + ge * ge + Pe * Pe + Ce * Ce
        }
        function Fo(W, ee) {
            return W[0] = -ee[0],
            W[1] = -ee[1],
            W[2] = -ee[2],
            W[3] = -ee[3],
            W
        }
        function Ns(W, ee) {
            return W[0] = 1 / ee[0],
            W[1] = 1 / ee[1],
            W[2] = 1 / ee[2],
            W[3] = 1 / ee[3],
            W
        }
        function fo(W, ee) {
            var ge = ee[0]
              , Pe = ee[1]
              , Ce = ee[2]
              , ke = ee[3]
              , ze = ge * ge + Pe * Pe + Ce * Ce + ke * ke;
            return ze > 0 && (ze = 1 / Math.sqrt(ze)),
            W[0] = ge * ze,
            W[1] = Pe * ze,
            W[2] = Ce * ze,
            W[3] = ke * ze,
            W
        }
        function Rs(W, ee) {
            return W[0] * ee[0] + W[1] * ee[1] + W[2] * ee[2] + W[3] * ee[3]
        }
        function $u(W, ee, ge, Pe) {
            var Ce = ge[0] * Pe[1] - ge[1] * Pe[0]
              , ke = ge[0] * Pe[2] - ge[2] * Pe[0]
              , ze = ge[0] * Pe[3] - ge[3] * Pe[0]
              , Qe = ge[1] * Pe[2] - ge[2] * Pe[1]
              , st = ge[1] * Pe[3] - ge[3] * Pe[1]
              , ft = ge[2] * Pe[3] - ge[3] * Pe[2]
              , Xt = ee[0]
              , Ot = ee[1]
              , Nt = ee[2]
              , Mt = ee[3];
            return W[0] = Ot * ft - Nt * st + Mt * Qe,
            W[1] = -(Xt * ft) + Nt * ze - Mt * ke,
            W[2] = Xt * st - Ot * ze + Mt * Ce,
            W[3] = -(Xt * Qe) + Ot * ke - Nt * Ce,
            W
        }
        function ho(W, ee, ge, Pe) {
            var Ce = ee[0]
              , ke = ee[1]
              , ze = ee[2]
              , Qe = ee[3];
            return W[0] = Ce + Pe * (ge[0] - Ce),
            W[1] = ke + Pe * (ge[1] - ke),
            W[2] = ze + Pe * (ge[2] - ze),
            W[3] = Qe + Pe * (ge[3] - Qe),
            W
        }
        function Bi(W, ee) {
            ee = ee || 1;
            var ge, Pe, Ce, ke, ze, Qe;
            do
                ge = Oi() * 2 - 1,
                Pe = Oi() * 2 - 1,
                ze = ge * ge + Pe * Pe;
            while (ze >= 1);
            do
                Ce = Oi() * 2 - 1,
                ke = Oi() * 2 - 1,
                Qe = Ce * Ce + ke * ke;
            while (Qe >= 1);
            var st = Math.sqrt((1 - ze) / Qe);
            return W[0] = ee * ge,
            W[1] = ee * Pe,
            W[2] = ee * Ce * st,
            W[3] = ee * ke * st,
            W
        }
        function ca(W, ee, ge) {
            var Pe = ee[0]
              , Ce = ee[1]
              , ke = ee[2]
              , ze = ee[3];
            return W[0] = ge[0] * Pe + ge[4] * Ce + ge[8] * ke + ge[12] * ze,
            W[1] = ge[1] * Pe + ge[5] * Ce + ge[9] * ke + ge[13] * ze,
            W[2] = ge[2] * Pe + ge[6] * Ce + ge[10] * ke + ge[14] * ze,
            W[3] = ge[3] * Pe + ge[7] * Ce + ge[11] * ke + ge[15] * ze,
            W
        }
        function Os(W, ee, ge) {
            var Pe = ee[0]
              , Ce = ee[1]
              , ke = ee[2]
              , ze = ge[0]
              , Qe = ge[1]
              , st = ge[2]
              , ft = ge[3]
              , Xt = ft * Pe + Qe * ke - st * Ce
              , Ot = ft * Ce + st * Pe - ze * ke
              , Nt = ft * ke + ze * Ce - Qe * Pe
              , Mt = -ze * Pe - Qe * Ce - st * ke;
            return W[0] = Xt * ft + Mt * -ze + Ot * -st - Nt * -Qe,
            W[1] = Ot * ft + Mt * -Qe + Nt * -ze - Xt * -st,
            W[2] = Nt * ft + Mt * -st + Xt * -Qe - Ot * -ze,
            W[3] = ee[3],
            W
        }
        function Ms(W) {
            return W[0] = 0,
            W[1] = 0,
            W[2] = 0,
            W[3] = 0,
            W
        }
        function Is(W) {
            return "vec4(" + W[0] + ", " + W[1] + ", " + W[2] + ", " + W[3] + ")"
        }
        function Mc(W, ee) {
            return W[0] === ee[0] && W[1] === ee[1] && W[2] === ee[2] && W[3] === ee[3]
        }
        function Ga(W, ee) {
            var ge = W[0]
              , Pe = W[1]
              , Ce = W[2]
              , ke = W[3]
              , ze = ee[0]
              , Qe = ee[1]
              , st = ee[2]
              , ft = ee[3];
            return Math.abs(ge - ze) <= dn * Math.max(1, Math.abs(ge), Math.abs(ze)) && Math.abs(Pe - Qe) <= dn * Math.max(1, Math.abs(Pe), Math.abs(Qe)) && Math.abs(Ce - st) <= dn * Math.max(1, Math.abs(Ce), Math.abs(st)) && Math.abs(ke - ft) <= dn * Math.max(1, Math.abs(ke), Math.abs(ft))
        }
        var Ic = Kc
          , Yu = xc
          , Gu = ws
          , zu = Rc
          , Hu = Oc
          , Bc = Ks
          , Wo = xs
          , $n = function() {
            var W = lo();
            return function(ee, ge, Pe, Ce, ke, ze) {
                var Qe, st;
                for (ge || (ge = 4),
                Pe || (Pe = 0),
                Ce ? st = Math.min(Ce * ge + Pe, ee.length) : st = ee.length,
                Qe = Pe; Qe < st; Qe += ge)
                    W[0] = ee[Qe],
                    W[1] = ee[Qe + 1],
                    W[2] = ee[Qe + 2],
                    W[3] = ee[Qe + 3],
                    ke(W, W, ze),
                    ee[Qe] = W[0],
                    ee[Qe + 1] = W[1],
                    ee[Qe + 2] = W[2],
                    ee[Qe + 3] = W[3];
                return ee
            }
        }()
          , wn = Object.freeze({
            __proto__: null,
            add: wc,
            ceil: Lu,
            clone: Aa,
            copy: uo,
            create: lo,
            cross: $u,
            dist: zu,
            distance: Rc,
            div: Gu,
            divide: ws,
            dot: Rs,
            equals: Ga,
            exactEquals: Mc,
            floor: Uu,
            forEach: $n,
            fromValues: Cc,
            inverse: Ns,
            len: Bc,
            length: Ks,
            lerp: ho,
            max: Wu,
            min: Fu,
            mul: Yu,
            multiply: xc,
            negate: Fo,
            normalize: fo,
            random: Bi,
            round: qu,
            scale: Nc,
            scaleAndAdd: Vu,
            set: Ya,
            sqrDist: Hu,
            sqrLen: Wo,
            squaredDistance: Oc,
            squaredLength: xs,
            str: Is,
            sub: Ic,
            subtract: Kc,
            transformMat4: ca,
            transformQuat: Os,
            zero: Ms
        });
        function qo() {
            var W = new Un(4);
            return Un != Float32Array && (W[0] = 0,
            W[1] = 0,
            W[2] = 0),
            W[3] = 1,
            W
        }
        function Dc(W) {
            return W[0] = 0,
            W[1] = 0,
            W[2] = 0,
            W[3] = 1,
            W
        }
        function za(W, ee, ge) {
            ge = ge * .5;
            var Pe = Math.sin(ge);
            return W[0] = Pe * ee[0],
            W[1] = Pe * ee[1],
            W[2] = Pe * ee[2],
            W[3] = Math.cos(ge),
            W
        }
        function kc(W, ee) {
            var ge = Math.acos(ee[3]) * 2
              , Pe = Math.sin(ge / 2);
            return Pe > dn ? (W[0] = ee[0] / Pe,
            W[1] = ee[1] / Pe,
            W[2] = ee[2] / Pe) : (W[0] = 1,
            W[1] = 0,
            W[2] = 0),
            ge
        }
        function ju(W, ee) {
            var ge = Us(W, ee);
            return Math.acos(2 * ge * ge - 1)
        }
        function Lc(W, ee, ge) {
            var Pe = ee[0]
              , Ce = ee[1]
              , ke = ee[2]
              , ze = ee[3]
              , Qe = ge[0]
              , st = ge[1]
              , ft = ge[2]
              , Xt = ge[3];
            return W[0] = Pe * Xt + ze * Qe + Ce * ft - ke * st,
            W[1] = Ce * Xt + ze * st + ke * Qe - Pe * ft,
            W[2] = ke * Xt + ze * ft + Pe * st - Ce * Qe,
            W[3] = ze * Xt - Pe * Qe - Ce * st - ke * ft,
            W
        }
        function Bs(W, ee, ge) {
            ge *= .5;
            var Pe = ee[0]
              , Ce = ee[1]
              , ke = ee[2]
              , ze = ee[3]
              , Qe = Math.sin(ge)
              , st = Math.cos(ge);
            return W[0] = Pe * st + ze * Qe,
            W[1] = Ce * st + ke * Qe,
            W[2] = ke * st - Ce * Qe,
            W[3] = ze * st - Pe * Qe,
            W
        }
        function Uc(W, ee, ge) {
            ge *= .5;
            var Pe = ee[0]
              , Ce = ee[1]
              , ke = ee[2]
              , ze = ee[3]
              , Qe = Math.sin(ge)
              , st = Math.cos(ge);
            return W[0] = Pe * st - ke * Qe,
            W[1] = Ce * st + ze * Qe,
            W[2] = ke * st + Pe * Qe,
            W[3] = ze * st - Ce * Qe,
            W
        }
        function gi(W, ee, ge) {
            ge *= .5;
            var Pe = ee[0]
              , Ce = ee[1]
              , ke = ee[2]
              , ze = ee[3]
              , Qe = Math.sin(ge)
              , st = Math.cos(ge);
            return W[0] = Pe * st + Ce * Qe,
            W[1] = Ce * st - Pe * Qe,
            W[2] = ke * st + ze * Qe,
            W[3] = ze * st - ke * Qe,
            W
        }
        function Ds(W, ee) {
            var ge = ee[0]
              , Pe = ee[1]
              , Ce = ee[2];
            return W[0] = ge,
            W[1] = Pe,
            W[2] = Ce,
            W[3] = Math.sqrt(Math.abs(1 - ge * ge - Pe * Pe - Ce * Ce)),
            W
        }
        function ks(W, ee) {
            var ge = ee[0]
              , Pe = ee[1]
              , Ce = ee[2]
              , ke = ee[3]
              , ze = Math.sqrt(ge * ge + Pe * Pe + Ce * Ce)
              , Qe = Math.exp(ke)
              , st = ze > 0 ? Qe * Math.sin(ze) / ze : 0;
            return W[0] = ge * st,
            W[1] = Pe * st,
            W[2] = Ce * st,
            W[3] = Qe * Math.cos(ze),
            W
        }
        function po(W, ee) {
            var ge = ee[0]
              , Pe = ee[1]
              , Ce = ee[2]
              , ke = ee[3]
              , ze = Math.sqrt(ge * ge + Pe * Pe + Ce * Ce)
              , Qe = ze > 0 ? Math.atan2(ze, ke) / ze : 0;
            return W[0] = ge * Qe,
            W[1] = Pe * Qe,
            W[2] = Ce * Qe,
            W[3] = .5 * Math.log(ge * ge + Pe * Pe + Ce * Ce + ke * ke),
            W
        }
        function Zu(W, ee, ge) {
            return po(W, ee),
            Ls(W, W, ge),
            ks(W, W),
            W
        }
        function Ji(W, ee, ge, Pe) {
            var Ce = ee[0], ke = ee[1], ze = ee[2], Qe = ee[3], st = ge[0], ft = ge[1], Xt = ge[2], Ot = ge[3], Nt, Mt, Gt, rr, Zt;
            return Mt = Ce * st + ke * ft + ze * Xt + Qe * Ot,
            Mt < 0 && (Mt = -Mt,
            st = -st,
            ft = -ft,
            Xt = -Xt,
            Ot = -Ot),
            1 - Mt > dn ? (Nt = Math.acos(Mt),
            Gt = Math.sin(Nt),
            rr = Math.sin((1 - Pe) * Nt) / Gt,
            Zt = Math.sin(Pe * Nt) / Gt) : (rr = 1 - Pe,
            Zt = Pe),
            W[0] = rr * Ce + Zt * st,
            W[1] = rr * ke + Zt * ft,
            W[2] = rr * ze + Zt * Xt,
            W[3] = rr * Qe + Zt * Ot,
            W
        }
        function ea(W) {
            var ee = Oi()
              , ge = Oi()
              , Pe = Oi()
              , Ce = Math.sqrt(1 - ee)
              , ke = Math.sqrt(ee);
            return W[0] = Ce * Math.sin(2 * Math.PI * ge),
            W[1] = Ce * Math.cos(2 * Math.PI * ge),
            W[2] = ke * Math.sin(2 * Math.PI * Pe),
            W[3] = ke * Math.cos(2 * Math.PI * Pe),
            W
        }
        function la(W, ee) {
            var ge = ee[0]
              , Pe = ee[1]
              , Ce = ee[2]
              , ke = ee[3]
              , ze = ge * ge + Pe * Pe + Ce * Ce + ke * ke
              , Qe = ze ? 1 / ze : 0;
            return W[0] = -ge * Qe,
            W[1] = -Pe * Qe,
            W[2] = -Ce * Qe,
            W[3] = ke * Qe,
            W
        }
        function da(W, ee) {
            return W[0] = -ee[0],
            W[1] = -ee[1],
            W[2] = -ee[2],
            W[3] = ee[3],
            W
        }
        function Fc(W, ee) {
            var ge = ee[0] + ee[4] + ee[8], Pe;
            if (ge > 0)
                Pe = Math.sqrt(ge + 1),
                W[3] = .5 * Pe,
                Pe = .5 / Pe,
                W[0] = (ee[5] - ee[7]) * Pe,
                W[1] = (ee[6] - ee[2]) * Pe,
                W[2] = (ee[1] - ee[3]) * Pe;
            else {
                var Ce = 0;
                ee[4] > ee[0] && (Ce = 1),
                ee[8] > ee[Ce * 3 + Ce] && (Ce = 2);
                var ke = (Ce + 1) % 3
                  , ze = (Ce + 2) % 3;
                Pe = Math.sqrt(ee[Ce * 3 + Ce] - ee[ke * 3 + ke] - ee[ze * 3 + ze] + 1),
                W[Ce] = .5 * Pe,
                Pe = .5 / Pe,
                W[3] = (ee[ke * 3 + ze] - ee[ze * 3 + ke]) * Pe,
                W[ke] = (ee[ke * 3 + Ce] + ee[Ce * 3 + ke]) * Pe,
                W[ze] = (ee[ze * 3 + Ce] + ee[Ce * 3 + ze]) * Pe
            }
            return W
        }
        function Qu(W, ee, ge, Pe) {
            var Ce = .5 * Math.PI / 180;
            ee *= Ce,
            ge *= Ce,
            Pe *= Ce;
            var ke = Math.sin(ee)
              , ze = Math.cos(ee)
              , Qe = Math.sin(ge)
              , st = Math.cos(ge)
              , ft = Math.sin(Pe)
              , Xt = Math.cos(Pe);
            return W[0] = ke * st * Xt - ze * Qe * ft,
            W[1] = ze * Qe * Xt + ke * st * ft,
            W[2] = ze * st * ft - ke * Qe * Xt,
            W[3] = ze * st * Xt + ke * Qe * ft,
            W
        }
        function Ju(W) {
            return "quat(" + W[0] + ", " + W[1] + ", " + W[2] + ", " + W[3] + ")"
        }
        var Vo = Aa
          , ed = Cc
          , $o = uo
          , td = Ya
          , rd = wc
          , qn = Lc
          , Ls = Nc
          , Us = Rs
          , nd = ho
          , Yo = Ks
          , id = Yo
          , Fs = xs
          , ad = Fs
          , Go = fo
          , zo = Mc
          , Wc = Ga
          , od = function() {
            var W = Es()
              , ee = As(1, 0, 0)
              , ge = As(0, 1, 0);
            return function(Pe, Ce, ke) {
                var ze = Xs(Ce, ke);
                return ze < -.999999 ? (Io(W, ee, Ce),
                Oa(W) < 1e-6 && Io(W, ge, Ce),
                Ec(W, W),
                za(Pe, W, Math.PI),
                Pe) : ze > .999999 ? (Pe[0] = 0,
                Pe[1] = 0,
                Pe[2] = 0,
                Pe[3] = 1,
                Pe) : (Io(W, Ce, ke),
                Pe[0] = W[0],
                Pe[1] = W[1],
                Pe[2] = W[2],
                Pe[3] = 1 + ze,
                Go(Pe, Pe))
            }
        }()
          , sd = function() {
            var W = qo()
              , ee = qo();
            return function(ge, Pe, Ce, ke, ze, Qe) {
                return Ji(W, Pe, ze, Qe),
                Ji(ee, Ce, ke, Qe),
                Ji(ge, W, ee, 2 * Qe * (1 - Qe)),
                ge
            }
        }()
          , cd = function() {
            var W = Js();
            return function(ee, ge, Pe, Ce) {
                return W[0] = Pe[0],
                W[3] = Pe[1],
                W[6] = Pe[2],
                W[1] = Ce[0],
                W[4] = Ce[1],
                W[7] = Ce[2],
                W[2] = -ge[0],
                W[5] = -ge[1],
                W[8] = -ge[2],
                Go(ee, Fc(ee, W))
            }
        }()
          , ld = Object.freeze({
            __proto__: null,
            add: rd,
            calculateW: Ds,
            clone: Vo,
            conjugate: da,
            copy: $o,
            create: qo,
            dot: Us,
            equals: Wc,
            exactEquals: zo,
            exp: ks,
            fromEuler: Qu,
            fromMat3: Fc,
            fromValues: ed,
            getAngle: ju,
            getAxisAngle: kc,
            identity: Dc,
            invert: la,
            len: id,
            length: Yo,
            lerp: nd,
            ln: po,
            mul: qn,
            multiply: Lc,
            normalize: Go,
            pow: Zu,
            random: ea,
            rotateX: Bs,
            rotateY: Uc,
            rotateZ: gi,
            rotationTo: od,
            scale: Ls,
            set: td,
            setAxes: cd,
            setAxisAngle: za,
            slerp: Ji,
            sqlerp: sd,
            sqrLen: ad,
            squaredLength: Fs,
            str: Ju
        });
        function ud() {
            var W = new Un(8);
            return Un != Float32Array && (W[0] = 0,
            W[1] = 0,
            W[2] = 0,
            W[4] = 0,
            W[5] = 0,
            W[6] = 0,
            W[7] = 0),
            W[3] = 1,
            W
        }
        function dd(W) {
            var ee = new Un(8);
            return ee[0] = W[0],
            ee[1] = W[1],
            ee[2] = W[2],
            ee[3] = W[3],
            ee[4] = W[4],
            ee[5] = W[5],
            ee[6] = W[6],
            ee[7] = W[7],
            ee
        }
        function fd(W, ee, ge, Pe, Ce, ke, ze, Qe) {
            var st = new Un(8);
            return st[0] = W,
            st[1] = ee,
            st[2] = ge,
            st[3] = Pe,
            st[4] = Ce,
            st[5] = ke,
            st[6] = ze,
            st[7] = Qe,
            st
        }
        function Ha(W, ee, ge, Pe, Ce, ke, ze) {
            var Qe = new Un(8);
            Qe[0] = W,
            Qe[1] = ee,
            Qe[2] = ge,
            Qe[3] = Pe;
            var st = Ce * .5
              , ft = ke * .5
              , Xt = ze * .5;
            return Qe[4] = st * Pe + ft * ge - Xt * ee,
            Qe[5] = ft * Pe + Xt * W - st * ge,
            Qe[6] = Xt * Pe + st * ee - ft * W,
            Qe[7] = -st * W - ft * ee - Xt * ge,
            Qe
        }
        function ja(W, ee, ge) {
            var Pe = ge[0] * .5
              , Ce = ge[1] * .5
              , ke = ge[2] * .5
              , ze = ee[0]
              , Qe = ee[1]
              , st = ee[2]
              , ft = ee[3];
            return W[0] = ze,
            W[1] = Qe,
            W[2] = st,
            W[3] = ft,
            W[4] = Pe * ft + Ce * st - ke * Qe,
            W[5] = Ce * ft + ke * ze - Pe * st,
            W[6] = ke * ft + Pe * Qe - Ce * ze,
            W[7] = -Pe * ze - Ce * Qe - ke * st,
            W
        }
        function ta(W, ee) {
            return W[0] = 0,
            W[1] = 0,
            W[2] = 0,
            W[3] = 1,
            W[4] = ee[0] * .5,
            W[5] = ee[1] * .5,
            W[6] = ee[2] * .5,
            W[7] = 0,
            W
        }
        function qc(W, ee) {
            return W[0] = ee[0],
            W[1] = ee[1],
            W[2] = ee[2],
            W[3] = ee[3],
            W[4] = 0,
            W[5] = 0,
            W[6] = 0,
            W[7] = 0,
            W
        }
        function hd(W, ee) {
            var ge = qo();
            cc(ge, ee);
            var Pe = new Un(3);
            return Ro(Pe, ee),
            ja(W, ge, Pe),
            W
        }
        function Vc(W, ee) {
            return W[0] = ee[0],
            W[1] = ee[1],
            W[2] = ee[2],
            W[3] = ee[3],
            W[4] = ee[4],
            W[5] = ee[5],
            W[6] = ee[6],
            W[7] = ee[7],
            W
        }
        function md(W) {
            return W[0] = 0,
            W[1] = 0,
            W[2] = 0,
            W[3] = 1,
            W[4] = 0,
            W[5] = 0,
            W[6] = 0,
            W[7] = 0,
            W
        }
        function pd(W, ee, ge, Pe, Ce, ke, ze, Qe, st) {
            return W[0] = ee,
            W[1] = ge,
            W[2] = Pe,
            W[3] = Ce,
            W[4] = ke,
            W[5] = ze,
            W[6] = Qe,
            W[7] = st,
            W
        }
        var gd = $o;
        function _d(W, ee) {
            return W[0] = ee[4],
            W[1] = ee[5],
            W[2] = ee[6],
            W[3] = ee[7],
            W
        }
        var vd = $o;
        function bd(W, ee) {
            return W[4] = ee[0],
            W[5] = ee[1],
            W[6] = ee[2],
            W[7] = ee[3],
            W
        }
        function $c(W, ee) {
            var ge = ee[4]
              , Pe = ee[5]
              , Ce = ee[6]
              , ke = ee[7]
              , ze = -ee[0]
              , Qe = -ee[1]
              , st = -ee[2]
              , ft = ee[3];
            return W[0] = (ge * ft + ke * ze + Pe * st - Ce * Qe) * 2,
            W[1] = (Pe * ft + ke * Qe + Ce * ze - ge * st) * 2,
            W[2] = (Ce * ft + ke * st + ge * Qe - Pe * ze) * 2,
            W
        }
        function Pd(W, ee, ge) {
            var Pe = ee[0]
              , Ce = ee[1]
              , ke = ee[2]
              , ze = ee[3]
              , Qe = ge[0] * .5
              , st = ge[1] * .5
              , ft = ge[2] * .5
              , Xt = ee[4]
              , Ot = ee[5]
              , Nt = ee[6]
              , Mt = ee[7];
            return W[0] = Pe,
            W[1] = Ce,
            W[2] = ke,
            W[3] = ze,
            W[4] = ze * Qe + Ce * ft - ke * st + Xt,
            W[5] = ze * st + ke * Qe - Pe * ft + Ot,
            W[6] = ze * ft + Pe * st - Ce * Qe + Nt,
            W[7] = -Pe * Qe - Ce * st - ke * ft + Mt,
            W
        }
        function yd(W, ee, ge) {
            var Pe = -ee[0]
              , Ce = -ee[1]
              , ke = -ee[2]
              , ze = ee[3]
              , Qe = ee[4]
              , st = ee[5]
              , ft = ee[6]
              , Xt = ee[7]
              , Ot = Qe * ze + Xt * Pe + st * ke - ft * Ce
              , Nt = st * ze + Xt * Ce + ft * Pe - Qe * ke
              , Mt = ft * ze + Xt * ke + Qe * Ce - st * Pe
              , Gt = Xt * ze - Qe * Pe - st * Ce - ft * ke;
            return Bs(W, ee, ge),
            Pe = W[0],
            Ce = W[1],
            ke = W[2],
            ze = W[3],
            W[4] = Ot * ze + Gt * Pe + Nt * ke - Mt * Ce,
            W[5] = Nt * ze + Gt * Ce + Mt * Pe - Ot * ke,
            W[6] = Mt * ze + Gt * ke + Ot * Ce - Nt * Pe,
            W[7] = Gt * ze - Ot * Pe - Nt * Ce - Mt * ke,
            W
        }
        function Sd(W, ee, ge) {
            var Pe = -ee[0]
              , Ce = -ee[1]
              , ke = -ee[2]
              , ze = ee[3]
              , Qe = ee[4]
              , st = ee[5]
              , ft = ee[6]
              , Xt = ee[7]
              , Ot = Qe * ze + Xt * Pe + st * ke - ft * Ce
              , Nt = st * ze + Xt * Ce + ft * Pe - Qe * ke
              , Mt = ft * ze + Xt * ke + Qe * Ce - st * Pe
              , Gt = Xt * ze - Qe * Pe - st * Ce - ft * ke;
            return Uc(W, ee, ge),
            Pe = W[0],
            Ce = W[1],
            ke = W[2],
            ze = W[3],
            W[4] = Ot * ze + Gt * Pe + Nt * ke - Mt * Ce,
            W[5] = Nt * ze + Gt * Ce + Mt * Pe - Ot * ke,
            W[6] = Mt * ze + Gt * ke + Ot * Ce - Nt * Pe,
            W[7] = Gt * ze - Ot * Pe - Nt * Ce - Mt * ke,
            W
        }
        function Yi(W, ee, ge) {
            var Pe = -ee[0]
              , Ce = -ee[1]
              , ke = -ee[2]
              , ze = ee[3]
              , Qe = ee[4]
              , st = ee[5]
              , ft = ee[6]
              , Xt = ee[7]
              , Ot = Qe * ze + Xt * Pe + st * ke - ft * Ce
              , Nt = st * ze + Xt * Ce + ft * Pe - Qe * ke
              , Mt = ft * ze + Xt * ke + Qe * Ce - st * Pe
              , Gt = Xt * ze - Qe * Pe - st * Ce - ft * ke;
            return gi(W, ee, ge),
            Pe = W[0],
            Ce = W[1],
            ke = W[2],
            ze = W[3],
            W[4] = Ot * ze + Gt * Pe + Nt * ke - Mt * Ce,
            W[5] = Nt * ze + Gt * Ce + Mt * Pe - Ot * ke,
            W[6] = Mt * ze + Gt * ke + Ot * Ce - Nt * Pe,
            W[7] = Gt * ze - Ot * Pe - Nt * Ce - Mt * ke,
            W
        }
        function Ed(W, ee, ge) {
            var Pe = ge[0]
              , Ce = ge[1]
              , ke = ge[2]
              , ze = ge[3]
              , Qe = ee[0]
              , st = ee[1]
              , ft = ee[2]
              , Xt = ee[3];
            return W[0] = Qe * ze + Xt * Pe + st * ke - ft * Ce,
            W[1] = st * ze + Xt * Ce + ft * Pe - Qe * ke,
            W[2] = ft * ze + Xt * ke + Qe * Ce - st * Pe,
            W[3] = Xt * ze - Qe * Pe - st * Ce - ft * ke,
            Qe = ee[4],
            st = ee[5],
            ft = ee[6],
            Xt = ee[7],
            W[4] = Qe * ze + Xt * Pe + st * ke - ft * Ce,
            W[5] = st * ze + Xt * Ce + ft * Pe - Qe * ke,
            W[6] = ft * ze + Xt * ke + Qe * Ce - st * Pe,
            W[7] = Xt * ze - Qe * Pe - st * Ce - ft * ke,
            W
        }
        function Ho(W, ee, ge) {
            var Pe = ee[0]
              , Ce = ee[1]
              , ke = ee[2]
              , ze = ee[3]
              , Qe = ge[0]
              , st = ge[1]
              , ft = ge[2]
              , Xt = ge[3];
            return W[0] = Pe * Xt + ze * Qe + Ce * ft - ke * st,
            W[1] = Ce * Xt + ze * st + ke * Qe - Pe * ft,
            W[2] = ke * Xt + ze * ft + Pe * st - Ce * Qe,
            W[3] = ze * Xt - Pe * Qe - Ce * st - ke * ft,
            Qe = ge[4],
            st = ge[5],
            ft = ge[6],
            Xt = ge[7],
            W[4] = Pe * Xt + ze * Qe + Ce * ft - ke * st,
            W[5] = Ce * Xt + ze * st + ke * Qe - Pe * ft,
            W[6] = ke * Xt + ze * ft + Pe * st - Ce * Qe,
            W[7] = ze * Xt - Pe * Qe - Ce * st - ke * ft,
            W
        }
        function Ad(W, ee, ge, Pe) {
            if (Math.abs(Pe) < dn)
                return Vc(W, ee);
            var Ce = Math.hypot(ge[0], ge[1], ge[2]);
            Pe = Pe * .5;
            var ke = Math.sin(Pe)
              , ze = ke * ge[0] / Ce
              , Qe = ke * ge[1] / Ce
              , st = ke * ge[2] / Ce
              , ft = Math.cos(Pe)
              , Xt = ee[0]
              , Ot = ee[1]
              , Nt = ee[2]
              , Mt = ee[3];
            W[0] = Xt * ft + Mt * ze + Ot * st - Nt * Qe,
            W[1] = Ot * ft + Mt * Qe + Nt * ze - Xt * st,
            W[2] = Nt * ft + Mt * st + Xt * Qe - Ot * ze,
            W[3] = Mt * ft - Xt * ze - Ot * Qe - Nt * st;
            var Gt = ee[4]
              , rr = ee[5]
              , Zt = ee[6]
              , ur = ee[7];
            return W[4] = Gt * ft + ur * ze + rr * st - Zt * Qe,
            W[5] = rr * ft + ur * Qe + Zt * ze - Gt * st,
            W[6] = Zt * ft + ur * st + Gt * Qe - rr * ze,
            W[7] = ur * ft - Gt * ze - rr * Qe - Zt * st,
            W
        }
        function Xd(W, ee, ge) {
            return W[0] = ee[0] + ge[0],
            W[1] = ee[1] + ge[1],
            W[2] = ee[2] + ge[2],
            W[3] = ee[3] + ge[3],
            W[4] = ee[4] + ge[4],
            W[5] = ee[5] + ge[5],
            W[6] = ee[6] + ge[6],
            W[7] = ee[7] + ge[7],
            W
        }
        function Yc(W, ee, ge) {
            var Pe = ee[0]
              , Ce = ee[1]
              , ke = ee[2]
              , ze = ee[3]
              , Qe = ge[4]
              , st = ge[5]
              , ft = ge[6]
              , Xt = ge[7]
              , Ot = ee[4]
              , Nt = ee[5]
              , Mt = ee[6]
              , Gt = ee[7]
              , rr = ge[0]
              , Zt = ge[1]
              , ur = ge[2]
              , ar = ge[3];
            return W[0] = Pe * ar + ze * rr + Ce * ur - ke * Zt,
            W[1] = Ce * ar + ze * Zt + ke * rr - Pe * ur,
            W[2] = ke * ar + ze * ur + Pe * Zt - Ce * rr,
            W[3] = ze * ar - Pe * rr - Ce * Zt - ke * ur,
            W[4] = Pe * Xt + ze * Qe + Ce * ft - ke * st + Ot * ar + Gt * rr + Nt * ur - Mt * Zt,
            W[5] = Ce * Xt + ze * st + ke * Qe - Pe * ft + Nt * ar + Gt * Zt + Mt * rr - Ot * ur,
            W[6] = ke * Xt + ze * ft + Pe * st - Ce * Qe + Mt * ar + Gt * ur + Ot * Zt - Nt * rr,
            W[7] = ze * Xt - Pe * Qe - Ce * st - ke * ft + Gt * ar - Ot * rr - Nt * Zt - Mt * ur,
            W
        }
        var Gc = Yc;
        function Td(W, ee, ge) {
            return W[0] = ee[0] * ge,
            W[1] = ee[1] * ge,
            W[2] = ee[2] * ge,
            W[3] = ee[3] * ge,
            W[4] = ee[4] * ge,
            W[5] = ee[5] * ge,
            W[6] = ee[6] * ge,
            W[7] = ee[7] * ge,
            W
        }
        var zc = Us;
        function Cd(W, ee, ge, Pe) {
            var Ce = 1 - Pe;
            return zc(ee, ge) < 0 && (Pe = -Pe),
            W[0] = ee[0] * Ce + ge[0] * Pe,
            W[1] = ee[1] * Ce + ge[1] * Pe,
            W[2] = ee[2] * Ce + ge[2] * Pe,
            W[3] = ee[3] * Ce + ge[3] * Pe,
            W[4] = ee[4] * Ce + ge[4] * Pe,
            W[5] = ee[5] * Ce + ge[5] * Pe,
            W[6] = ee[6] * Ce + ge[6] * Pe,
            W[7] = ee[7] * Ce + ge[7] * Pe,
            W
        }
        function wd(W, ee) {
            var ge = go(ee);
            return W[0] = -ee[0] / ge,
            W[1] = -ee[1] / ge,
            W[2] = -ee[2] / ge,
            W[3] = ee[3] / ge,
            W[4] = -ee[4] / ge,
            W[5] = -ee[5] / ge,
            W[6] = -ee[6] / ge,
            W[7] = ee[7] / ge,
            W
        }
        function Hc(W, ee) {
            return W[0] = -ee[0],
            W[1] = -ee[1],
            W[2] = -ee[2],
            W[3] = ee[3],
            W[4] = -ee[4],
            W[5] = -ee[5],
            W[6] = -ee[6],
            W[7] = ee[7],
            W
        }
        var jc = Yo
          , Zc = jc
          , go = Fs
          , Qc = go;
        function Kd(W, ee) {
            var ge = go(ee);
            if (ge > 0) {
                ge = Math.sqrt(ge);
                var Pe = ee[0] / ge
                  , Ce = ee[1] / ge
                  , ke = ee[2] / ge
                  , ze = ee[3] / ge
                  , Qe = ee[4]
                  , st = ee[5]
                  , ft = ee[6]
                  , Xt = ee[7]
                  , Ot = Pe * Qe + Ce * st + ke * ft + ze * Xt;
                W[0] = Pe,
                W[1] = Ce,
                W[2] = ke,
                W[3] = ze,
                W[4] = (Qe - Pe * Ot) / ge,
                W[5] = (st - Ce * Ot) / ge,
                W[6] = (ft - ke * Ot) / ge,
                W[7] = (Xt - ze * Ot) / ge
            }
            return W
        }
        function xd(W) {
            return "quat2(" + W[0] + ", " + W[1] + ", " + W[2] + ", " + W[3] + ", " + W[4] + ", " + W[5] + ", " + W[6] + ", " + W[7] + ")"
        }
        function Nd(W, ee) {
            return W[0] === ee[0] && W[1] === ee[1] && W[2] === ee[2] && W[3] === ee[3] && W[4] === ee[4] && W[5] === ee[5] && W[6] === ee[6] && W[7] === ee[7]
        }
        function Rd(W, ee) {
            var ge = W[0]
              , Pe = W[1]
              , Ce = W[2]
              , ke = W[3]
              , ze = W[4]
              , Qe = W[5]
              , st = W[6]
              , ft = W[7]
              , Xt = ee[0]
              , Ot = ee[1]
              , Nt = ee[2]
              , Mt = ee[3]
              , Gt = ee[4]
              , rr = ee[5]
              , Zt = ee[6]
              , ur = ee[7];
            return Math.abs(ge - Xt) <= dn * Math.max(1, Math.abs(ge), Math.abs(Xt)) && Math.abs(Pe - Ot) <= dn * Math.max(1, Math.abs(Pe), Math.abs(Ot)) && Math.abs(Ce - Nt) <= dn * Math.max(1, Math.abs(Ce), Math.abs(Nt)) && Math.abs(ke - Mt) <= dn * Math.max(1, Math.abs(ke), Math.abs(Mt)) && Math.abs(ze - Gt) <= dn * Math.max(1, Math.abs(ze), Math.abs(Gt)) && Math.abs(Qe - rr) <= dn * Math.max(1, Math.abs(Qe), Math.abs(rr)) && Math.abs(st - Zt) <= dn * Math.max(1, Math.abs(st), Math.abs(Zt)) && Math.abs(ft - ur) <= dn * Math.max(1, Math.abs(ft), Math.abs(ur))
        }
        var Jc = Object.freeze({
            __proto__: null,
            add: Xd,
            clone: dd,
            conjugate: Hc,
            copy: Vc,
            create: ud,
            dot: zc,
            equals: Rd,
            exactEquals: Nd,
            fromMat4: hd,
            fromRotation: qc,
            fromRotationTranslation: ja,
            fromRotationTranslationValues: Ha,
            fromTranslation: ta,
            fromValues: fd,
            getDual: _d,
            getReal: gd,
            getTranslation: $c,
            identity: md,
            invert: wd,
            len: Zc,
            length: jc,
            lerp: Cd,
            mul: Gc,
            multiply: Yc,
            normalize: Kd,
            rotateAroundAxis: Ad,
            rotateByQuatAppend: Ed,
            rotateByQuatPrepend: Ho,
            rotateX: yd,
            rotateY: Sd,
            rotateZ: Yi,
            scale: Td,
            set: pd,
            setDual: bd,
            setReal: vd,
            sqrLen: Qc,
            squaredLength: go,
            str: xd,
            translate: Pd
        });
        function el() {
            var W = new Un(2);
            return Un != Float32Array && (W[0] = 0,
            W[1] = 0),
            W
        }
        function Od(W) {
            var ee = new Un(2);
            return ee[0] = W[0],
            ee[1] = W[1],
            ee
        }
        function Md(W, ee) {
            var ge = new Un(2);
            return ge[0] = W,
            ge[1] = ee,
            ge
        }
        function Id(W, ee) {
            return W[0] = ee[0],
            W[1] = ee[1],
            W
        }
        function Bd(W, ee, ge) {
            return W[0] = ee,
            W[1] = ge,
            W
        }
        function Dd(W, ee, ge) {
            return W[0] = ee[0] + ge[0],
            W[1] = ee[1] + ge[1],
            W
        }
        function Ws(W, ee, ge) {
            return W[0] = ee[0] - ge[0],
            W[1] = ee[1] - ge[1],
            W
        }
        function qs(W, ee, ge) {
            return W[0] = ee[0] * ge[0],
            W[1] = ee[1] * ge[1],
            W
        }
        function tl(W, ee, ge) {
            return W[0] = ee[0] / ge[0],
            W[1] = ee[1] / ge[1],
            W
        }
        function kd(W, ee) {
            return W[0] = Math.ceil(ee[0]),
            W[1] = Math.ceil(ee[1]),
            W
        }
        function Ld(W, ee) {
            return W[0] = Math.floor(ee[0]),
            W[1] = Math.floor(ee[1]),
            W
        }
        function Ci(W, ee, ge) {
            return W[0] = Math.min(ee[0], ge[0]),
            W[1] = Math.min(ee[1], ge[1]),
            W
        }
        function Ud(W, ee, ge) {
            return W[0] = Math.max(ee[0], ge[0]),
            W[1] = Math.max(ee[1], ge[1]),
            W
        }
        function rl(W, ee) {
            return W[0] = Math.round(ee[0]),
            W[1] = Math.round(ee[1]),
            W
        }
        function Fd(W, ee, ge) {
            return W[0] = ee[0] * ge,
            W[1] = ee[1] * ge,
            W
        }
        function Wd(W, ee, ge, Pe) {
            return W[0] = ee[0] + ge[0] * Pe,
            W[1] = ee[1] + ge[1] * Pe,
            W
        }
        function nl(W, ee) {
            var ge = ee[0] - W[0]
              , Pe = ee[1] - W[1];
            return Math.hypot(ge, Pe)
        }
        function Vs(W, ee) {
            var ge = ee[0] - W[0]
              , Pe = ee[1] - W[1];
            return ge * ge + Pe * Pe
        }
        function il(W) {
            var ee = W[0]
              , ge = W[1];
            return Math.hypot(ee, ge)
        }
        function al(W) {
            var ee = W[0]
              , ge = W[1];
            return ee * ee + ge * ge
        }
        function ol(W, ee) {
            return W[0] = -ee[0],
            W[1] = -ee[1],
            W
        }
        function qd(W, ee) {
            return W[0] = 1 / ee[0],
            W[1] = 1 / ee[1],
            W
        }
        function Vd(W, ee) {
            var ge = ee[0]
              , Pe = ee[1]
              , Ce = ge * ge + Pe * Pe;
            return Ce > 0 && (Ce = 1 / Math.sqrt(Ce)),
            W[0] = ee[0] * Ce,
            W[1] = ee[1] * Ce,
            W
        }
        function Ma(W, ee) {
            return W[0] * ee[0] + W[1] * ee[1]
        }
        function $d(W, ee, ge) {
            var Pe = ee[0] * ge[1] - ee[1] * ge[0];
            return W[0] = W[1] = 0,
            W[2] = Pe,
            W
        }
        function Yd(W, ee, ge, Pe) {
            var Ce = ee[0]
              , ke = ee[1];
            return W[0] = Ce + Pe * (ge[0] - Ce),
            W[1] = ke + Pe * (ge[1] - ke),
            W
        }
        function Gd(W, ee) {
            ee = ee || 1;
            var ge = Oi() * 2 * Math.PI;
            return W[0] = Math.cos(ge) * ee,
            W[1] = Math.sin(ge) * ee,
            W
        }
        function zd(W, ee, ge) {
            var Pe = ee[0]
              , Ce = ee[1];
            return W[0] = ge[0] * Pe + ge[2] * Ce,
            W[1] = ge[1] * Pe + ge[3] * Ce,
            W
        }
        function sl(W, ee, ge) {
            var Pe = ee[0]
              , Ce = ee[1];
            return W[0] = ge[0] * Pe + ge[2] * Ce + ge[4],
            W[1] = ge[1] * Pe + ge[3] * Ce + ge[5],
            W
        }
        function $s(W, ee, ge) {
            var Pe = ee[0]
              , Ce = ee[1];
            return W[0] = ge[0] * Pe + ge[3] * Ce + ge[6],
            W[1] = ge[1] * Pe + ge[4] * Ce + ge[7],
            W
        }
        function ra(W, ee, ge) {
            var Pe = ee[0]
              , Ce = ee[1];
            return W[0] = ge[0] * Pe + ge[4] * Ce + ge[12],
            W[1] = ge[1] * Pe + ge[5] * Ce + ge[13],
            W
        }
        function Hd(W, ee, ge, Pe) {
            var Ce = ee[0] - ge[0]
              , ke = ee[1] - ge[1]
              , ze = Math.sin(Pe)
              , Qe = Math.cos(Pe);
            return W[0] = Ce * Qe - ke * ze + ge[0],
            W[1] = Ce * ze + ke * Qe + ge[1],
            W
        }
        function jd(W, ee) {
            var ge = W[0]
              , Pe = W[1]
              , Ce = ee[0]
              , ke = ee[1]
              , ze = Math.sqrt(ge * ge + Pe * Pe) * Math.sqrt(Ce * Ce + ke * ke)
              , Qe = ze && (ge * Ce + Pe * ke) / ze;
            return Math.acos(Math.min(Math.max(Qe, -1), 1))
        }
        function Zd(W) {
            return W[0] = 0,
            W[1] = 0,
            W
        }
        function Qd(W) {
            return "vec2(" + W[0] + ", " + W[1] + ")"
        }
        function Jd(W, ee) {
            return W[0] === ee[0] && W[1] === ee[1]
        }
        function ef(W, ee) {
            var ge = W[0]
              , Pe = W[1]
              , Ce = ee[0]
              , ke = ee[1];
            return Math.abs(ge - Ce) <= dn * Math.max(1, Math.abs(ge), Math.abs(Ce)) && Math.abs(Pe - ke) <= dn * Math.max(1, Math.abs(Pe), Math.abs(ke))
        }
        var tf = il, rf = Ws, cl = qs, nf = tl, dt = nl, fe = Vs, we = al, qe = function() {
            var W = el();
            return function(ee, ge, Pe, Ce, ke, ze) {
                var Qe, st;
                for (ge || (ge = 2),
                Pe || (Pe = 0),
                Ce ? st = Math.min(Ce * ge + Pe, ee.length) : st = ee.length,
                Qe = Pe; Qe < st; Qe += ge)
                    W[0] = ee[Qe],
                    W[1] = ee[Qe + 1],
                    ke(W, W, ze),
                    ee[Qe] = W[0],
                    ee[Qe + 1] = W[1];
                return ee
            }
        }(), je = Object.freeze({
            __proto__: null,
            add: Dd,
            angle: jd,
            ceil: kd,
            clone: Od,
            copy: Id,
            create: el,
            cross: $d,
            dist: dt,
            distance: nl,
            div: nf,
            divide: tl,
            dot: Ma,
            equals: ef,
            exactEquals: Jd,
            floor: Ld,
            forEach: qe,
            fromValues: Md,
            inverse: qd,
            len: tf,
            length: il,
            lerp: Yd,
            max: Ud,
            min: Ci,
            mul: cl,
            multiply: qs,
            negate: ol,
            normalize: Vd,
            random: Gd,
            rotate: Hd,
            round: rl,
            scale: Fd,
            scaleAndAdd: Wd,
            set: Bd,
            sqrDist: fe,
            sqrLen: we,
            squaredDistance: Vs,
            squaredLength: al,
            str: Qd,
            sub: rf,
            subtract: Ws,
            transformMat2: zd,
            transformMat2d: sl,
            transformMat3: $s,
            transformMat4: ra,
            zero: Zd
        }), et = Object.freeze({
            __proto__: null,
            glMatrix: ds,
            mat2: Kn,
            mat2d: wl,
            mat3: Jl,
            mat4: Su,
            quat: ld,
            quat2: Jc,
            vec2: je,
            vec3: Uo,
            vec4: wn
        }), Ze = d(et), Pt = {}, kt;
        function zt() {
            if (kt)
                return Pt;
            kt = 1,
            Object.defineProperty(Pt, "__esModule", {
                value: !0
            }),
            Pt.FaceModeSelectOption = Pt.FaceModeColorOption = Pt.CenterModeOption = Pt.colorSelectOptions = Pt.EditingMode = Pt.Actions = Pt.WorkAction = void 0,
            Pt.generateCuboid = ft,
            Pt.boundary = Xt,
            Pt.surfaceScale = Ot,
            Pt.hex2rgb = Nt,
            Pt.absMod = Mt,
            Pt.traverseVoxels = Gt,
            Pt.inRange = rr,
            Pt.adjacentVoxels = Zt,
            Pt.drawVoxelSphere = ur,
            Pt.drawVoxelCircle = ar,
            Pt.drawVoxelSquare = gr,
            Pt.calcRadius = yr,
            Pt.calcHalfEdgeLen = vr,
            Pt.drawVoxelLine = Kr,
            Pt.cloneArray = Yr,
            Pt.newBundle = tn,
            Pt.fillSpace = rn,
            Pt.allocEmptyVoxels = An,
            Pt.getElementPos = Xn,
            Pt.mergeVoxel = Dn,
            Pt.surfaceByNormalAndPoint = vn;
            const W = Sn()
              , ee = Ze;
            var ge;
            (function(ir) {
                ir[ir.bakeAoData = 0] = "bakeAoData",
                ir[ir.syncVoxel = 1] = "syncVoxel",
                ir[ir.updateVoxel = 2] = "updateVoxel",
                ir[ir.sendPoints = 3] = "sendPoints",
                ir[ir.clearData = 4] = "clearData",
                ir[ir.changeSize = 5] = "changeSize"
            }
            )(ge || (Pt.WorkAction = ge = {}));
            var Pe;
            (function(ir) {
                ir[ir.Attach = 0] = "Attach",
                ir[ir.Erase = 1] = "Erase",
                ir[ir.Paint = 2] = "Paint",
                ir[ir.Select = 3] = "Select",
                ir[ir.Translate = 4] = "Translate",
                ir[ir.ColorSelect = 5] = "ColorSelect",
                ir[ir.PickColor = 6] = "PickColor",
                ir[ir.HollowOut = 7] = "HollowOut",
                ir[ir.FillSameColorSpace = 8] = "FillSameColorSpace",
                ir[ir.Extrude = 9] = "Extrude"
            }
            )(Pe || (Pt.Actions = Pe = {}));
            var Ce;
            (function(ir) {
                ir[ir.line = 0] = "line",
                ir[ir.center = 1] = "center",
                ir[ir.box = 2] = "box",
                ir[ir.voxel = 3] = "voxel",
                ir[ir.face = 4] = "face",
                ir[ir.rect = 5] = "rect"
            }
            )(Ce || (Pt.EditingMode = Ce = {}));
            var ke;
            (function(ir) {
                ir[ir.volume = 0] = "volume",
                ir[ir.face = 1] = "face",
                ir[ir.all = 2] = "all"
            }
            )(ke || (Pt.colorSelectOptions = ke = {}));
            var ze;
            (function(ir) {
                ir[ir.square = 0] = "square",
                ir[ir.circle = 1] = "circle"
            }
            )(ze || (Pt.CenterModeOption = ze = {}));
            var Qe;
            (function(ir) {
                ir[ir.voxelColor = 0] = "voxelColor",
                ir[ir.currentColor = 1] = "currentColor"
            }
            )(Qe || (Pt.FaceModeColorOption = Qe = {}));
            var st;
            (function(ir) {
                ir[ir.geometry = 0] = "geometry",
                ir[ir.colorGeometry = 1] = "colorGeometry"
            }
            )(st || (Pt.FaceModeSelectOption = st = {}));
            function ft(ir, Ht, sr, Ar, Mr) {
                const {start: Dr, end: Cr} = Xt(ir, Ht, [-1 / 0, -1 / 0, -1 / 0], [1 / 0, 1 / 0, 1 / 0])
                  , Lr = []
                  , gn = []
                  , $r = []
                  , _n = Ar ? -1 : 1;
                if (sr)
                    for (let Fr = 0; Fr < 3; Fr++)
                        Mr ? Cr[Fr] = Math.min(Cr[Fr] + 1, Mr[Fr]) : Cr[Fr] = Cr[Fr] + 1;
                Lr.push([Dr[0], Dr[1], Dr[2]]),
                Lr.push([Dr[0], Dr[1], Cr[2]]),
                Lr.push([Cr[0], Dr[1], Cr[2]]),
                Lr.push([Cr[0], Dr[1], Dr[2]]),
                Lr.push([Dr[0], Cr[1], Dr[2]]),
                Lr.push([Cr[0], Cr[1], Dr[2]]),
                Lr.push([Cr[0], Cr[1], Cr[2]]),
                Lr.push([Dr[0], Cr[1], Cr[2]]),
                Lr.push([Cr[0], Dr[1], Dr[2]]),
                Lr.push([Cr[0], Dr[1], Cr[2]]),
                Lr.push([Cr[0], Cr[1], Cr[2]]),
                Lr.push([Cr[0], Cr[1], Dr[2]]),
                Lr.push([Dr[0], Dr[1], Dr[2]]),
                Lr.push([Dr[0], Cr[1], Dr[2]]),
                Lr.push([Dr[0], Cr[1], Cr[2]]),
                Lr.push([Dr[0], Dr[1], Cr[2]]),
                Lr.push([Dr[0], Dr[1], Dr[2]]),
                Lr.push([Cr[0], Dr[1], Dr[2]]),
                Lr.push([Cr[0], Cr[1], Dr[2]]),
                Lr.push([Dr[0], Cr[1], Dr[2]]),
                Lr.push([Dr[0], Dr[1], Cr[2]]),
                Lr.push([Dr[0], Cr[1], Cr[2]]),
                Lr.push([Cr[0], Cr[1], Cr[2]]),
                Lr.push([Cr[0], Dr[1], Cr[2]]);
                for (let Fr = 0; Fr < 4; Fr++)
                    $r.push([0, 1 * _n, 0]);
                for (let Fr = 0; Fr < 4; Fr++)
                    $r.push([0, -1 * _n, 0]);
                for (let Fr = 0; Fr < 4; Fr++)
                    $r.push([-1 * _n, 0, 0]);
                for (let Fr = 0; Fr < 4; Fr++)
                    $r.push([1 * _n, 0, 0]);
                for (let Fr = 0; Fr < 4; Fr++)
                    $r.push([0, 0, 1 * _n]);
                for (let Fr = 0; Fr < 4; Fr++)
                    $r.push([0, 0, -1 * _n]);
                const zr = [0, 4, 8, 12, 16, 20];
                for (let Fr = 0; Fr < zr.length; Fr++)
                    _n == -1 ? (gn.push([zr[Fr] + 2, zr[Fr] + 1, zr[Fr]]),
                    gn.push([zr[Fr], zr[Fr] + 3, zr[Fr] + 2])) : (gn.push([zr[Fr], zr[Fr] + 1, zr[Fr] + 2]),
                    gn.push([zr[Fr] + 2, zr[Fr] + 3, zr[Fr]]));
                return {
                    lo: [Dr[0], Dr[1], Dr[2]],
                    hi: [Cr[0], Cr[1], Cr[2]],
                    positions: Lr,
                    elements: gn,
                    normals: $r
                }
            }
            function Xt(ir, Ht, sr, Ar) {
                const Mr = ee.vec3.create()
                  , Dr = ee.vec3.create();
                return ee.vec3.max(Mr, ee.vec3.min(Mr, ir, Ht), sr),
                ee.vec3.min(Dr, ee.vec3.max(Dr, ir, Ht), Ar),
                {
                    start: Mr,
                    end: Dr
                }
            }
            function Ot(ir, Ht, sr) {
                const Ar = Math.min
                  , Mr = [Ht[0][0], Ht[0][1], Ht[0][2]];
                for (let Cr = 1; Cr < Ht.length; Cr++)
                    Mr[0] = Ar(Mr[0], Ht[Cr][0]),
                    Mr[1] = Ar(Mr[1], Ht[Cr][1]),
                    Mr[2] = Ar(Mr[2], Ht[Cr][2]);
                const Dr = [];
                for (let Cr = 0; Cr < Ht.length; Cr++) {
                    const Lr = [0, 0, 0];
                    ir[0] == 0 ? Lr[0] = (Ht[Cr][0] - Mr[0]) * sr - sr / 2 : ir[0] != 0 && (Lr[0] = Ht[0][0]),
                    ir[1] == 0 ? Lr[1] = (Ht[Cr][1] - Mr[1]) * sr - sr / 2 : ir[1] != 0 && (Lr[1] = Ht[0][1]),
                    ir[2] == 0 ? Lr[2] = (Ht[Cr][2] - Mr[2]) * sr - sr / 2 : ir[2] != 0 && (Lr[2] = Ht[0][2]),
                    Dr.push(Lr)
                }
                return Dr
            }
            function Nt(ir) {
                return ir[0] == "#" && (ir = ir.substr(1)),
                [parseInt(ir.substr(0, 2), 16), parseInt(ir.substr(2, 2), 16), parseInt(ir.substr(4, 2), 16)]
            }
            function Mt(ir, Ht) {
                return ir < 0 ? ir = Math.ceil(Math.abs(ir / Ht)) * Ht + ir : ir %= Ht,
                ir
            }
            function Gt(ir, Ht, sr, Ar) {
                const {data: Mr, stride: [Dr,Cr,Lr], offset: gn} = ir
                  , $r = sr[0] - Ht[0] + 1
                  , _n = sr[1] - Ht[1] + 1
                  , zr = Dr
                  , Fr = Cr - Dr * $r
                  , pn = Lr - Cr * _n;
                let xn = Dr * Ht[0] + Cr * Ht[1] + Lr * Ht[2] + gn;
                for (let si = Ht[2]; si <= sr[2]; ++si) {
                    for (let Ui = Ht[1]; Ui <= sr[1]; ++Ui) {
                        for (let Fi = Ht[0]; Fi <= sr[0]; ++Fi)
                            Ar(Fi, Ui, si, Mr[xn], xn),
                            xn += zr;
                        xn += Fr
                    }
                    xn += pn
                }
            }
            function rr(ir, Ht, sr) {
                const [Ar,Mr,Dr] = ir
                  , [Cr,Lr,gn] = Ht
                  , [$r,_n,zr] = sr;
                return Ar >= Cr && Mr >= Lr && Dr >= gn && Ar <= $r && Mr <= _n && Dr <= zr
            }
            function Zt(ir, Ht, sr, Ar, Mr, Dr, Cr, Lr, gn) {
                const $r = [];
                $r.push(sr);
                const _n = [ir.shape[0] - 1, ir.shape[1] - 1, ir.shape[2] - 1];
                for (; $r.length; ) {
                    const [zr,Fr,pn] = $r.pop();
                    if (rr([zr, Fr, pn], [0, 0, 0], _n) && !(gn && rr([zr + gn[0], Fr + gn[1], pn + gn[2]], [0, 0, 0], _n) && ir.getVoxel(zr + gn[0], Fr + gn[1], pn + gn[2]) !== 0)) {
                        if (Ar === -1) {
                            const xn = Ht.index(zr, Fr, pn);
                            if (Ht.data[xn] != 0)
                                continue;
                            if (ir.data[xn] !== 0)
                                Ht.data[xn] = ir.data[xn];
                            else
                                continue
                        } else if (Ar === 0) {
                            if (Ht.getVoxel(zr, Fr, pn) === Mr)
                                continue;
                            if (ir.getVoxel(zr, Fr, pn) === 0)
                                Ht.setVoxel(zr, Fr, pn, Mr),
                                ir.setVoxel(zr, Fr, pn, Mr);
                            else
                                continue
                        } else {
                            if (Ht.getVoxel(zr, Fr, pn) === Ar)
                                continue;
                            if (ir.getVoxel(zr, Fr, pn) === Ar)
                                Ht.setVoxel(zr, Fr, pn, Ar);
                            else
                                continue
                        }
                        ee.vec3.min(Cr, Cr, [zr, Fr, pn]),
                        ee.vec3.max(Lr, Lr, [zr, Fr, pn]),
                        Dr[0] != 0 && ($r.push([zr + 1, Fr, pn]),
                        $r.push([zr - 1, Fr, pn])),
                        Dr[1] != 0 && ($r.push([zr, Fr + 1, pn]),
                        $r.push([zr, Fr - 1, pn])),
                        Dr[2] != 0 && ($r.push([zr, Fr, pn + 1]),
                        $r.push([zr, Fr, pn - 1]))
                    }
                }
            }
            function ur(ir, Ht, sr) {
                for (let Ar = 0; Ar < sr; Ar++)
                    for (let Mr = 0; Mr < sr; Mr++)
                        for (let Dr = 0; Dr < sr; Dr++)
                            Ar * Ar + Mr * Mr + Dr * Dr < sr * sr && (ir.setVoxel(Ht[0] + Ar, Ht[1] + Mr, Ht[2] + Dr, 1),
                            ir.setVoxel(Ht[0] - Ar, Ht[1] + Mr, Ht[2] + Dr, 1),
                            ir.setVoxel(Ht[0] + Ar, Ht[1] - Mr, Ht[2] + Dr, 1),
                            ir.setVoxel(Ht[0] + Ar, Ht[1] + Mr, Ht[2] - Dr, 1),
                            ir.setVoxel(Ht[0] - Ar, Ht[1] - Mr, Ht[2] + Dr, 1),
                            ir.setVoxel(Ht[0] - Ar, Ht[1] - Mr, Ht[2] - Dr, 1),
                            ir.setVoxel(Ht[0] + Ar, Ht[1] - Mr, Ht[2] - Dr, 1),
                            ir.setVoxel(Ht[0] - Ar, Ht[1] + Mr, Ht[2] - Dr, 1))
            }
            function ar(ir, Ht, sr, Ar, Mr, Dr) {
                let Cr = 0
                  , Lr = Ar
                  , gn = 5 / 4 - Ar;
                for (typeof Mr != "string" && (Mr[0] != 0 ? Mr = "x" : Mr[1] != 0 ? Mr = "y" : Mr[2] != 0 && (Mr = "z")); Cr <= Lr; )
                    if (gn < 0 ? (gn = gn + 2 * Cr + 3,
                    Cr++) : (gn = gn + 2 * (Cr - Lr) + 5,
                    Lr--,
                    Cr++),
                    Mr === "z") {
                        for (let $r = sr[0] - Cr; $r <= sr[0] + Cr; $r++)
                            Dr($r, sr[1] + Lr, sr[2]),
                            Dr($r, sr[1] - Lr, sr[2]);
                        for (let $r = sr[0] - Lr; $r <= sr[0] + Lr; $r++)
                            Dr($r, sr[1] + Cr, sr[2]),
                            Dr($r, sr[1] - Cr, sr[2]);
                        for (let $r = sr[0] - Ar; $r <= sr[0] + Ar; $r++)
                            $r != sr[0] && Dr($r, sr[1], sr[2])
                    } else if (Mr === "y") {
                        for (let $r = sr[2] - Cr; $r <= sr[2] + Cr; $r++)
                            Dr(sr[0] + Lr, sr[1], $r),
                            Dr(sr[0] - Lr, sr[1], $r);
                        for (let $r = sr[2] - Lr; $r <= sr[2] + Lr; $r++)
                            Dr(sr[0] + Cr, sr[1], $r),
                            Dr(sr[0] - Cr, sr[1], $r);
                        for (let $r = sr[2] - Ar; $r <= sr[2] + Ar; $r++)
                            $r != sr[2] && Dr(sr[0], sr[1], $r)
                    } else if (Mr === "x") {
                        for (let $r = sr[2] - Cr; $r <= sr[2] + Cr; $r++)
                            Dr(sr[0], sr[1] + Lr, $r),
                            Dr(sr[0], sr[1] - Lr, $r);
                        for (let $r = sr[2] - Lr; $r <= sr[2] + Lr; $r++)
                            Dr(sr[0], sr[1] + Cr, $r),
                            Dr(sr[0], sr[1] - Cr, $r);
                        for (let $r = sr[2] - Ar; $r <= sr[2] + Ar; $r++)
                            $r != sr[2] && Dr(sr[0], sr[1], $r)
                    }
            }
            function gr(ir, Ht, sr, Ar, Mr, Dr=!1) {
                if (typeof Mr != "string" && (Mr[0] != 0 ? Mr = "x" : Mr[1] != 0 ? Mr = "y" : Mr[2] != 0 && (Mr = "z")),
                Mr === "z") {
                    for (let Cr = sr[0] - Ar; Cr <= sr[0] + Ar; Cr++)
                        for (let Lr = sr[1] - Ar; Lr <= sr[1] + Ar; Lr++)
                            if (Cr != sr[0] || Lr != sr[1]) {
                                const gn = ir.index(Cr, Lr, sr[2]);
                                gn > -1 && (ir.data[gn] = Dr ? Ht : ir.data[gn] || Ht)
                            }
                } else if (Mr === "y") {
                    for (let Cr = sr[0] - Ar; Cr <= sr[0] + Ar; Cr++)
                        for (let Lr = sr[2] - Ar; Lr <= sr[2] + Ar; Lr++)
                            if (Cr != sr[0] || Lr != sr[2]) {
                                const gn = ir.index(Cr, sr[1], Lr);
                                gn > -1 && (ir.data[gn] = Dr ? Ht : ir.data[gn] || Ht)
                            }
                } else if (Mr === "x") {
                    for (let Cr = sr[1] - Ar; Cr <= sr[1] + Ar; Cr++)
                        for (let Lr = sr[2] - Ar; Lr <= sr[2] + Ar; Lr++)
                            if (Cr != sr[1] || Lr != sr[2]) {
                                const gn = ir.index(sr[0], Cr, Lr);
                                gn > -1 && (ir.data[gn] = Dr ? Ht : ir.data[gn] || Ht)
                            }
                }
            }
            function yr(ir, Ht, sr) {
                if (ir[0] != 0) {
                    const Ar = sr[1] - Ht[1]
                      , Mr = sr[2] - Ht[2];
                    return Math.round(Math.pow(Ar * Ar + Mr * Mr, .5))
                } else if (ir[1] != 0) {
                    const Ar = sr[0] - Ht[0]
                      , Mr = sr[2] - Ht[2];
                    return Math.round(Math.pow(Ar * Ar + Mr * Mr, .5))
                } else if (ir[2] != 0) {
                    const Ar = sr[0] - Ht[0]
                      , Mr = sr[1] - Ht[1];
                    return Math.round(Math.pow(Ar * Ar + Mr * Mr, .5))
                }
                return 0
            }
            function vr(ir, Ht, sr) {
                if (ir[0] != 0) {
                    const Ar = Math.abs(sr[1] - Ht[1])
                      , Mr = Math.abs(sr[2] - Ht[2]);
                    return Math.max(Ar, Mr)
                } else if (ir[1] != 0) {
                    const Ar = Math.abs(sr[0] - Ht[0])
                      , Mr = Math.abs(sr[2] - Ht[2]);
                    return Math.max(Ar, Mr)
                } else if (ir[2] != 0) {
                    const Ar = Math.abs(sr[0] - Ht[0])
                      , Mr = Math.abs(sr[1] - Ht[1]);
                    return Math.max(Ar, Mr)
                }
                return 0
            }
            function Kr(ir, Ht, sr) {
                const Ar = Math.min(ir[0], Ht[0])
                  , Mr = Math.min(ir[1], Ht[1])
                  , Dr = Math.min(ir[2], Ht[2])
                  , Cr = Math.max(ir[0], Ht[0])
                  , Lr = Math.max(ir[1], Ht[1])
                  , gn = Math.max(ir[2], Ht[2]);
                let $r = +(Ht[0] - ir[0])
                  , _n = +(Ht[1] - ir[1])
                  , zr = +(Ht[2] - ir[2]);
                const Fr = Math.sqrt(Math.pow($r, 2) + Math.pow(_n, 2) + Math.pow(zr, 2));
                $r = $r / Fr,
                _n = _n / Fr,
                zr = zr / Fr;
                const pn = Math.abs(1 / $r)
                  , xn = Math.abs(1 / _n)
                  , si = Math.abs(1 / zr);
                let Ui = pn < 1 / 0 ? Math.abs($r) + 1 : 1 / 0
                  , Fi = xn < 1 / 0 ? Math.abs(_n) + 1 : 1 / 0
                  , no = si < 1 / 0 ? Math.abs(zr) + 1 : 1 / 0;
                const uf = $r < 0 ? -1 : $r > 0 ? 1 : 0
                  , df = _n < 0 ? -1 : _n > 0 ? 1 : 0
                  , yl = zr < 0 ? -1 : zr > 0 ? 1 : 0;
                let[Fa,oa,Ca] = ir;
                for (; ; ) {
                    if (sr(Fa, oa, Ca),
                    Fa == Ht[0] && oa == Ht[1] && Ca == Ht[2])
                        return;
                    if (Ui < Fi)
                        if (Ui < no) {
                            if (Fa = Fa + uf,
                            Fa < Ar || Fa > Cr)
                                return;
                            Ui = Ui + pn
                        } else {
                            if (Ca = Ca + yl,
                            Ca < Dr || Ca > gn)
                                return;
                            no = no + si
                        }
                    else if (Fi < no) {
                        if (oa = oa + df,
                        oa < Mr || oa > Lr)
                            return;
                        Fi = Fi + xn
                    } else {
                        if (Ca = Ca + yl,
                        Ca < Dr || Ca > gn)
                            return;
                        no = no + si
                    }
                }
            }
            function Yr(ir) {
                const Ht = new Array(ir.length);
                for (let sr = 0; sr < ir.length; ++sr)
                    Ht[sr] = ir[sr].slice();
                return Ht
            }
            function Qr(ir, Ht, sr, Ar) {
                const Mr = Math.max
                  , Dr = Math.min
                  , Cr = [Mr(ir[0], sr[0]), Mr(ir[1], sr[1]), Mr(ir[2], sr[2])]
                  , Lr = [Dr(Ht[0], Ar[0]), Dr(Ht[1], Ar[1]), Dr(Ht[2], Ar[2])];
                if (!(Cr[0] < Lr[0] && Cr[1] < Lr[1] && Cr[2] < Lr[2]))
                    return {
                        eliminate: [[ir, Ht]],
                        addition: [[sr, Ar]]
                    };
                const gn = [];
                [[ir, [Lr[0], Ht[1], Cr[2]]], [[Lr[0] + 1, ir[1], ir[2]], [Ht[0], Ht[1], Lr[2]]], [[ir[0], ir[1], Cr[2]], [Cr[0] - 1, Ht[1], Ht[2]]], [[Cr[0], ir[1], Lr[2]], Ht], [[Cr[0], ir[1], Cr[2]], [Lr[0], Cr[1] - 1, Lr[2]]], [[Cr[0], Lr[1] + 1, Cr[2]], [Lr[0], Ht[1], Lr[2]]]].forEach(_n => {
                    for (let zr = 0; zr < _n[0].length; zr++)
                        if (_n[1][zr] - _n[0][zr] < 0)
                            return;
                    gn.push(_n)
                }
                );
                const $r = [];
                return [[sr, [Lr[0], Ar[1], Cr[2]]], [[Lr[0] + 1, sr[1], sr[2]], [Ar[0], Ar[1], Lr[2]]], [[sr[0], sr[1], Cr[2]], [Cr[0] - 1, Ar[1], Ar[2]]], [[Cr[0], sr[1], Lr[2]], Ar], [[Cr[0], sr[1], Cr[2]], [Lr[0], Cr[1] - 1, Lr[2]]], [[Cr[0], Lr[1] + 1, Cr[2]], [Lr[0], Ar[1], Lr[2]]]].forEach(_n => {
                    for (let zr = 0; zr < _n[0].length; zr++)
                        if (_n[1][zr] - _n[0][zr] < 0)
                            return;
                    $r.push(_n)
                }
                ),
                {
                    eliminate: gn,
                    addition: $r
                }
            }
            function tn(ir, Ht, sr, Ar, Mr, Dr, Cr, Lr) {
                const gn = Xt(Ar, Mr, [0, 0, 0], ir.getDimension())
                  , [$r,_n,zr] = gn.start
                  , [Fr,pn,xn] = gn.end;
                if (Ht && Ht.length == 3) {
                    const si = Xt(Ht, sr, [0, 0, 0], ir.getDimension())
                      , [Ui,Fi,no] = si.start
                      , [uf,df,yl] = si.end
                      , Fa = Qr([Ui, Fi, no], [uf, df, yl], [$r, _n, zr], [Fr, pn, xn]);
                    Fa.eliminate.forEach(oa => {
                        rn(ir, oa[0], oa[1], Dr)
                    }
                    ),
                    Fa.addition.forEach(oa => {
                        rn(ir, oa[0], oa[1], Cr, Lr)
                    }
                    )
                } else
                    for (let si = $r; si <= Fr; si++)
                        for (let Ui = _n; Ui <= pn; Ui++)
                            for (let Fi = zr; Fi <= xn; Fi++)
                                typeof Cr == "function" ? ir.setVoxel(si, Ui, Fi, Cr(si, Ui, Fi)) : ir.setVoxel(si, Ui, Fi, Cr);
                return ir
            }
            function rn(ir, Ht, sr, Ar, Mr) {
                const Dr = typeof Ar == "function" ? Ar : () => Ar
                  , Cr = typeof Mr == "function" ? Mr : () => !0;
                Gt(ir, Ht, sr, (Lr, gn, $r) => {
                    Cr(Lr, gn, $r) && ir.setVoxel(Lr, gn, $r, Dr(Lr, gn, $r))
                }
                )
            }
            function An(ir, Ht, sr) {
                const Ar = (0,
                W.allocVoxels)(ir, Ht, sr);
                for (let Mr = 0; Mr < Ar.data.length; Mr++)
                    Ar.data[Mr] = 0;
                return Ar
            }
            function Xn(ir) {
                let Ht = 0
                  , sr = 0;
                for (; ir != null; )
                    Ht += ir.offsetLeft,
                    sr += ir.offsetTop,
                    ir = ir.offsetParent;
                return {
                    x: Ht,
                    y: sr
                }
            }
            function Dn(ir, Ht, sr, Ar, Mr=1) {
                const Dr = Xt(sr, Ar, [0, 0, 0], ir.shape.map(Fr => Fr - 1))
                  , [Cr,Lr,gn] = Dr.start
                  , [$r,_n,zr] = Dr.end;
                for (let Fr = Cr; Fr <= $r; Fr++)
                    for (let pn = Lr; pn <= _n; pn++)
                        for (let xn = gn; xn <= zr; xn++)
                            Mr === 1 ? ir.getVoxel(Fr, pn, xn) == 0 && ir.setVoxel(Fr, pn, xn, Ht.getVoxel(Fr, pn, xn)) : Mr === 2 ? ir.setVoxel(Fr, pn, xn, Ht.getVoxel(Fr, pn, xn)) : Mr === 3 ? Ht.getVoxel(Fr, pn, xn) != 0 && ir.setVoxel(Fr, pn, xn, Ht.getVoxel(Fr, pn, xn)) : Mr === 4 ? Ht.getVoxel(Fr, pn, xn) != 0 && (ir.setVoxel(Fr, pn, xn, Ht.getVoxel(Fr, pn, xn)),
                            Ht.setVoxel(Fr, pn, xn, 0)) : Mr === 5 && ir.getVoxel(Fr, pn, xn) == 0 && (ir.setVoxel(Fr, pn, xn, Ht.getVoxel(Fr, pn, xn)),
                            Ht.setVoxel(Fr, pn, xn, 0));
                return function(Fr, pn, xn, si=1) {
                    return Dn(ir, Fr, pn, xn, si)
                }
            }
            function vn(ir, Ht) {
                const sr = []
                  , Ar = Ht[0] - ir[0]
                  , Mr = Ht[1] - ir[1]
                  , Dr = Ht[2] - ir[2]
                  , Cr = ir[0]
                  , Lr = ir[1]
                  , gn = ir[2]
                  , $r = Math.max(Math.abs(Ar), Math.abs(Mr), Math.abs(Dr));
                let _n;
                const zr = 2e3;
                if ($r === Math.abs(Ar)) {
                    Ar > 0 ? _n = [[zr, zr], [-2e3, zr], [-2e3, -2e3], [zr, -2e3]] : _n = [[zr, zr], [zr, -2e3], [-2e3, -2e3], [-2e3, zr]];
                    for (let Fr = 0; Fr < _n.length; Fr++) {
                        const pn = _n[Fr][0]
                          , xn = _n[Fr][1]
                          , si = Cr - (Mr * (pn - Lr) + Dr * (xn - gn)) / Ar;
                        sr.push([si, pn, xn])
                    }
                } else if ($r === Math.abs(Mr)) {
                    Mr > 0 ? _n = [[zr, zr], [zr, -2e3], [-2e3, -2e3], [-2e3, zr]] : _n = [[zr, zr], [-2e3, zr], [-2e3, -2e3], [zr, -2e3]];
                    for (let Fr = 0; Fr < _n.length; Fr++) {
                        const pn = _n[Fr][0]
                          , xn = _n[Fr][1]
                          , si = Lr - (Ar * (pn - Cr) + Dr * (xn - gn)) / Mr;
                        sr.push([pn, si, xn])
                    }
                } else {
                    if (Dr > 0)
                        _n = [[zr, zr], [-2e3, zr], [-2e3, -2e3], [zr, -2e3]];
                    else if (Dr < 0)
                        _n = [[zr, zr], [zr, -2e3], [-2e3, -2e3], [-2e3, zr]];
                    else
                        throw new Error("C should not be zero");
                    for (let Fr = 0; Fr < _n.length; Fr++) {
                        const pn = _n[Fr][0]
                          , xn = _n[Fr][1]
                          , si = gn - (Ar * (pn - Cr) + Mr * (xn - Lr)) / Dr;
                        sr.push([pn, xn, si])
                    }
                }
                return sr
            }
            return Pt
        }
        var tr = {}, Qt = {}, Wr;
        function sn() {
            if (Wr)
                return Qt;
            Wr = 1;
            var W = 32;
            Qt.INT_BITS = W,
            Qt.INT_MAX = 2147483647,
            Qt.INT_MIN = -1 << W - 1,
            Qt.sign = function(Pe) {
                return (Pe > 0) - (Pe < 0)
            }
            ,
            Qt.abs = function(Pe) {
                var Ce = Pe >> W - 1;
                return (Pe ^ Ce) - Ce
            }
            ,
            Qt.min = function(Pe, Ce) {
                return Ce ^ (Pe ^ Ce) & -(Pe < Ce)
            }
            ,
            Qt.max = function(Pe, Ce) {
                return Pe ^ (Pe ^ Ce) & -(Pe < Ce)
            }
            ,
            Qt.isPow2 = function(Pe) {
                return !(Pe & Pe - 1) && !!Pe
            }
            ,
            Qt.log2 = function(Pe) {
                var Ce, ke;
                return Ce = (Pe > 65535) << 4,
                Pe >>>= Ce,
                ke = (Pe > 255) << 3,
                Pe >>>= ke,
                Ce |= ke,
                ke = (Pe > 15) << 2,
                Pe >>>= ke,
                Ce |= ke,
                ke = (Pe > 3) << 1,
                Pe >>>= ke,
                Ce |= ke,
                Ce | Pe >> 1
            }
            ,
            Qt.log10 = function(Pe) {
                return Pe >= 1e9 ? 9 : Pe >= 1e8 ? 8 : Pe >= 1e7 ? 7 : Pe >= 1e6 ? 6 : Pe >= 1e5 ? 5 : Pe >= 1e4 ? 4 : Pe >= 1e3 ? 3 : Pe >= 100 ? 2 : Pe >= 10 ? 1 : 0
            }
            ,
            Qt.popCount = function(Pe) {
                return Pe = Pe - (Pe >>> 1 & 1431655765),
                Pe = (Pe & 858993459) + (Pe >>> 2 & 858993459),
                (Pe + (Pe >>> 4) & 252645135) * 16843009 >>> 24
            }
            ;
            function ee(Pe) {
                var Ce = 32;
                return Pe &= -Pe,
                Pe && Ce--,
                Pe & 65535 && (Ce -= 16),
                Pe & 16711935 && (Ce -= 8),
                Pe & 252645135 && (Ce -= 4),
                Pe & 858993459 && (Ce -= 2),
                Pe & 1431655765 && (Ce -= 1),
                Ce
            }
            Qt.countTrailingZeros = ee,
            Qt.nextPow2 = function(Pe) {
                return Pe += Pe === 0,
                --Pe,
                Pe |= Pe >>> 1,
                Pe |= Pe >>> 2,
                Pe |= Pe >>> 4,
                Pe |= Pe >>> 8,
                Pe |= Pe >>> 16,
                Pe + 1
            }
            ,
            Qt.prevPow2 = function(Pe) {
                return Pe |= Pe >>> 1,
                Pe |= Pe >>> 2,
                Pe |= Pe >>> 4,
                Pe |= Pe >>> 8,
                Pe |= Pe >>> 16,
                Pe - (Pe >>> 1)
            }
            ,
            Qt.parity = function(Pe) {
                return Pe ^= Pe >>> 16,
                Pe ^= Pe >>> 8,
                Pe ^= Pe >>> 4,
                Pe &= 15,
                27030 >>> Pe & 1
            }
            ;
            var ge = new Array(256);
            return function(Pe) {
                for (var Ce = 0; Ce < 256; ++Ce) {
                    var ke = Ce
                      , ze = Ce
                      , Qe = 7;
                    for (ke >>>= 1; ke; ke >>>= 1)
                        ze <<= 1,
                        ze |= ke & 1,
                        --Qe;
                    Pe[Ce] = ze << Qe & 255
                }
            }(ge),
            Qt.reverse = function(Pe) {
                return ge[Pe & 255] << 24 | ge[Pe >>> 8 & 255] << 16 | ge[Pe >>> 16 & 255] << 8 | ge[Pe >>> 24 & 255]
            }
            ,
            Qt.interleave2 = function(Pe, Ce) {
                return Pe &= 65535,
                Pe = (Pe | Pe << 8) & 16711935,
                Pe = (Pe | Pe << 4) & 252645135,
                Pe = (Pe | Pe << 2) & 858993459,
                Pe = (Pe | Pe << 1) & 1431655765,
                Ce &= 65535,
                Ce = (Ce | Ce << 8) & 16711935,
                Ce = (Ce | Ce << 4) & 252645135,
                Ce = (Ce | Ce << 2) & 858993459,
                Ce = (Ce | Ce << 1) & 1431655765,
                Pe | Ce << 1
            }
            ,
            Qt.deinterleave2 = function(Pe, Ce) {
                return Pe = Pe >>> Ce & 1431655765,
                Pe = (Pe | Pe >>> 1) & 858993459,
                Pe = (Pe | Pe >>> 2) & 252645135,
                Pe = (Pe | Pe >>> 4) & 16711935,
                Pe = (Pe | Pe >>> 16) & 65535,
                Pe << 16 >> 16
            }
            ,
            Qt.interleave3 = function(Pe, Ce, ke) {
                return Pe &= 1023,
                Pe = (Pe | Pe << 16) & 4278190335,
                Pe = (Pe | Pe << 8) & 251719695,
                Pe = (Pe | Pe << 4) & 3272356035,
                Pe = (Pe | Pe << 2) & 1227133513,
                Ce &= 1023,
                Ce = (Ce | Ce << 16) & 4278190335,
                Ce = (Ce | Ce << 8) & 251719695,
                Ce = (Ce | Ce << 4) & 3272356035,
                Ce = (Ce | Ce << 2) & 1227133513,
                Pe |= Ce << 1,
                ke &= 1023,
                ke = (ke | ke << 16) & 4278190335,
                ke = (ke | ke << 8) & 251719695,
                ke = (ke | ke << 4) & 3272356035,
                ke = (ke | ke << 2) & 1227133513,
                Pe | ke << 2
            }
            ,
            Qt.deinterleave3 = function(Pe, Ce) {
                return Pe = Pe >>> Ce & 1227133513,
                Pe = (Pe | Pe >>> 2) & 3272356035,
                Pe = (Pe | Pe >>> 4) & 251719695,
                Pe = (Pe | Pe >>> 8) & 4278190335,
                Pe = (Pe | Pe >>> 16) & 1023,
                Pe << 22 >> 22
            }
            ,
            Qt.nextCombination = function(Pe) {
                var Ce = Pe | Pe - 1;
                return Ce + 1 | (~Ce & -~Ce) - 1 >>> ee(Pe) + 1
            }
            ,
            Qt
        }
        var cn;
        function Ln() {
            if (cn)
                return tr;
            cn = 1,
            Object.defineProperty(tr, "__esModule", {
                value: !0
            }),
            tr.alloc = ge,
            tr.free = Pe,
            tr.cloneU8 = Ce,
            tr.clearMemoryPool = ke;
            const W = sn()
              , ee = new Array(32);
            for (let ze = 0; ze < 32; ++ze)
                ee[ze] = [];
            function ge(ze) {
                const Qe = (0,
                W.nextPow2)(ze)
                  , ft = ee[(0,
                W.log2)(Qe)].pop();
                return ft || new Uint8Array(Qe).buffer
            }
            function Pe(ze) {
                ee[(0,
                W.log2)(ze.byteLength)].push(ze)
            }
            function Ce(ze) {
                const Qe = (0,
                W.nextPow2)(ze.length)
                  , ft = ee[(0,
                W.log2)(Qe)].pop();
                if (ft) {
                    const Xt = new Uint8Array(ft);
                    return Xt.set(ze),
                    Xt
                } else
                    return new Uint8Array(ze)
            }
            function ke() {
                for (let ze = 0; ze < ee.length; ++ze)
                    ee[ze].length = 0
            }
            return tr
        }
        var ri = {}, Bn;
        function zn() {
            if (Bn)
                return ri;
            Bn = 1,
            Object.defineProperty(ri, "__esModule", {
                value: !0
            }),
            ri.compress = ee,
            ri.decompress = Pe,
            ri.sectionDecompress = Ce,
            ri.old_decompress = ke;
            function W(ze, Qe, st) {
                Qe && (ze.grow(10),
                ze.writeVarint(Qe - 1),
                ze.writeVarint(st))
            }
            function ee(ze, Qe) {
                const {data: st, shape: [ft,Xt,Ot], stride: [Nt,Mt,Gt], offset: rr} = ze;
                let Zt = -1
                  , ur = 0
                  , ar = rr;
                const gr = Nt
                  , yr = Mt - Nt * ft
                  , vr = Gt - Mt * Xt;
                for (let Kr = 0; Kr < Ot; ++Kr) {
                    for (let Yr = 0; Yr < Xt; ++Yr) {
                        for (let Qr = 0; Qr < ft; ++Qr) {
                            const tn = st[ar];
                            tn !== Zt && (W(Qe, ur, Zt),
                            ur = 0,
                            Zt = tn),
                            ur += 1,
                            ar += gr
                        }
                        ar += yr
                    }
                    ar += vr
                }
                return W(Qe, ur, Zt),
                !0
            }
            function ge(ze, Qe, st) {
                for (let ft = 0; ft < st; ) {
                    const Xt = ze.readVarint() + 1
                      , Ot = ze.readVarint();
                    for (let Nt = 0; Nt < Xt; ++Nt)
                        Qe[ft++] = Ot
                }
                return !0
            }
            function Pe(ze, Qe) {
                const {data: st, shape: [ft,Xt,Ot], stride: [Nt,Mt,Gt], offset: rr} = Qe;
                let Zt = -1
                  , ur = 0;
                if (Nt === 1 && Mt === ft && Gt === ft * Xt && rr === 0)
                    return ge(ze, st, ft * Xt * Ot);
                let ar = rr;
                const gr = Nt
                  , yr = Mt - Nt * ft
                  , vr = Gt - Mt * Xt;
                for (let Kr = 0; Kr < Ot; ++Kr) {
                    for (let Yr = 0; Yr < Xt; ++Yr) {
                        for (let Qr = 0; Qr < ft; ++Qr)
                            ur <= 0 && (ur = ze.readVarint() + 1,
                            Zt = ze.readVarint()),
                            st[ar] = Zt,
                            ur -= 1,
                            ar += gr;
                        ar += yr
                    }
                    ar += vr
                }
                return ur === 0
            }
            function Ce(ze, Qe, st, ft) {
                const {data: Xt, stride: [Ot,Nt,Mt], offset: Gt} = Qe
                  , rr = ze.length;
                let Zt = -1
                  , ur = 0
                  , ar = 0;
                const gr = ft[0] - st[0] + 1
                  , yr = ft[1] - st[1] + 1
                  , vr = Ot
                  , Kr = Nt - Ot * gr
                  , Yr = Mt - Nt * yr;
                let Qr = Ot * st[0] + Nt * st[1] + Mt * st[2] + Gt;
                for (let tn = st[2]; tn <= ft[2]; tn++) {
                    for (let rn = st[1]; rn <= ft[1]; rn++) {
                        for (let An = st[0]; An <= ft[0]; An++) {
                            if (ur <= 0) {
                                if (ar >= rr)
                                    return !1;
                                const Xn = ze[ar++];
                                if (Xn < 255)
                                    ur = Xn;
                                else {
                                    if (ar + 1 >= rr)
                                        return !1;
                                    ur = (ze[ar] << 8) + ze[ar + 1],
                                    ar += 2
                                }
                                if (ar >= rr)
                                    return !1;
                                const Dn = ze[ar++];
                                if (Dn < 255)
                                    Zt = Dn;
                                else {
                                    if (ar + 1 >= rr)
                                        return !1;
                                    Zt = (ze[ar] << 8) + ze[ar + 1],
                                    ar += 2
                                }
                            }
                            Xt[Qr] = Zt,
                            ur -= 1,
                            Qr += vr
                        }
                        Qr += Kr
                    }
                    Qr += Yr
                }
                return ar === ze.length && ur === 0
            }
            function ke(ze, Qe) {
                return Ce(ze, Qe, [0, 0, 0], Qe.shape.map(st => st - 1))
            }
            return ri
        }
        var Ur;
        function Sn() {
            if (Ur)
                return Ki;
            Ur = 1,
            Object.defineProperty(Ki, "__esModule", {
                value: !0
            }),
            Ki.VoxelView = void 0,
            Ki.getBoxBoundary = ze,
            Ki.allocVoxels = Qe,
            Ki.freeVoxels = st,
            Ki.cloneVoxels = ft,
            Ki.storeVoxels = Xt,
            Ki.restoreVoxels = Ot,
            Ki.flipVoxels = Nt,
            Ki.isEmptyVoxels = Zt;
            const W = Ze
              , ee = zt()
              , ge = Ln()
              , Pe = zn()
              , Ce = new Uint16Array;
            class ke {
                constructor(ar, gr, yr, vr, Kr, Yr, Qr) {
                    this.getVoxelByPtr = tn => {
                        if (!this.dataStart || !this.dataEnd || !this.dataStride)
                            return this.data[tn];
                        const rn = Math.floor(tn / this.stride[2])
                          , An = Math.floor(tn % this.stride[2] / this.stride[1])
                          , Xn = tn % this.stride[1];
                        return this.contains(Xn, An, rn, this.dataStart, this.dataEnd) ? this.data[this.dataStride[0] * (Xn - this.dataStart[0]) + this.dataStride[1] * (An - this.dataStart[1]) + this.dataStride[2] * (rn - this.dataStart[2])] : 0
                    }
                    ,
                    this.setVoxelByPtr = (tn, rn) => {
                        if (!this.dataStart || !this.dataEnd || !this.dataStride)
                            return this.data[tn] = rn;
                        const An = Math.floor(tn / this.stride[2])
                          , Xn = Math.floor(tn % this.stride[2] / this.stride[1])
                          , Dn = tn % this.stride[1];
                        return this.contains(Dn, Xn, An, this.dataStart, this.dataEnd) ? this.data[this.dataStride[0] * (Dn - this.dataStart[0]) + this.dataStride[1] * (Xn - this.dataStart[1]) + this.dataStride[2] * (An - this.dataStart[2])] = rn : 0
                    }
                    ,
                    this.data = ar,
                    this.shape = gr,
                    this.stride = yr,
                    this.offset = vr | 0,
                    this.dataStart = Kr,
                    this.dataEnd = Yr,
                    this.dataStride = Qr
                }
                getVoxel(ar, gr, yr) {
                    return this.getVoxelByPtr(this.index(ar, gr, yr))
                }
                getVoxels() {
                    const ar = [];
                    return (0,
                    ee.traverseVoxels)(this, [0, 0, 0], this.shape.map(gr => gr - 1), (gr, yr, vr, Kr) => {
                        Kr != 0 && ar.push([gr, yr, vr])
                    }
                    ),
                    ar
                }
                getDimension() {
                    return W.vec3.add(W.vec3.clone(this.shape), this.shape, [-1, -1, -1])
                }
                index(ar, gr, yr) {
                    return this.stride[0] * ar + this.stride[1] * gr + this.stride[2] * yr + this.offset
                }
                contains(ar, gr, yr, vr, Kr) {
                    return ar >= vr[0] && ar < Kr[0] && gr >= vr[1] && gr < Kr[1] && yr >= vr[2] && yr < Kr[2]
                }
                setVoxel(ar, gr, yr, vr) {
                    return this.setVoxelByPtr(this.index(ar, gr, yr), vr)
                }
                setVoxelRotate(ar, gr, yr, vr) {
                    const Kr = this.getVoxel(ar, gr, yr) | vr << 14;
                    return this.data[this.stride[0] * ar + this.stride[1] * gr + this.stride[2] * yr + this.offset] = Kr
                }
                slice(ar, gr) {
                    return new ke(this.data,[gr[0] - ar[0], gr[1] - ar[1], gr[2] - ar[2]],this.stride,this.offset + this.stride[0] * ar[0] + this.stride[1] * ar[1] + this.stride[2] * ar[2],this.dataStart,this.dataEnd,this.dataStride)
                }
                transpose(ar, gr, yr) {
                    return new ke(this.data,[this.shape[ar], this.shape[gr], this.shape[yr]],[this.stride[ar], this.stride[gr], this.stride[yr]],this.offset)
                }
                step(ar, gr, yr) {
                    return new ke(this.data,[Math.floor(this.shape[0] / ar), Math.floor(this.shape[1] / gr), Math.floor(this.shape[2] / yr)],[this.stride[0] * ar, this.stride[1] * gr, this.stride[2] * yr],this.offset)
                }
                copy(ar) {
                    const [gr,yr,vr] = this.shape
                      , [Kr,Yr,Qr] = ar.shape
                      , tn = Math.min(gr, Kr)
                      , rn = Math.min(yr, Yr)
                      , An = Math.min(vr, Qr)
                      , Xn = this.data
                      , [Dn,vn,ir] = this.stride;
                    let Ht = this.offset;
                    const sr = Dn
                      , Ar = vn - tn * Dn
                      , Mr = ir - rn * vn
                      , Dr = ar.data
                      , [Cr,Lr,gn] = ar.stride;
                    let $r = ar.offset;
                    const _n = Cr
                      , zr = Lr - tn * Cr
                      , Fr = gn - rn * Lr;
                    for (let pn = 0; pn < An; ++pn) {
                        for (let xn = 0; xn < rn; ++xn) {
                            for (let si = 0; si < tn; ++si)
                                Xn[Ht] = Dr[$r],
                                Ht += sr,
                                $r += _n;
                            Ht += Ar,
                            $r += zr
                        }
                        Ht += Mr,
                        $r += Fr
                    }
                }
                fill(ar) {
                    const [gr,yr,vr] = this.shape
                      , Kr = this.data
                      , [Yr,Qr,tn] = this.stride;
                    let rn = this.offset;
                    const An = Yr
                      , Xn = Qr - gr * Yr
                      , Dn = tn - yr * Qr;
                    for (let vn = 0; vn < vr; ++vn) {
                        for (let ir = 0; ir < yr; ++ir) {
                            for (let Ht = 0; Ht < gr; ++Ht)
                                Kr[rn] = ar,
                                rn += An;
                            rn += Xn
                        }
                        rn += Dn
                    }
                }
                equals(ar) {
                    if (this.shape[0] !== ar.shape[0] || this.shape[1] !== ar.shape[1] || this.shape[2] !== ar.shape[2])
                        return !1;
                    const [gr,yr,vr] = this.shape
                      , Kr = this.data
                      , [Yr,Qr,tn] = this.stride;
                    let rn = this.offset;
                    const An = Yr
                      , Xn = Qr - gr * Yr
                      , Dn = tn - yr * Qr
                      , vn = ar.data
                      , [ir,Ht,sr] = ar.stride;
                    let Ar = ar.offset;
                    const Mr = ir
                      , Dr = Ht - gr * ir
                      , Cr = sr - yr * Ht;
                    for (let Lr = 0; Lr < vr; ++Lr) {
                        for (let gn = 0; gn < yr; ++gn) {
                            for (let $r = 0; $r < gr; ++$r) {
                                if (Kr[rn] !== vn[Ar])
                                    return !1;
                                rn += An,
                                Ar += Mr
                            }
                            rn += Xn,
                            Ar += Dr
                        }
                        rn += Dn,
                        Ar += Cr
                    }
                    return !0
                }
                clear() {
                    for (let ar = 0; ar < this.data.length; ar++)
                        this.data[ar] = 0
                }
                destroy() {
                    this.data = Ce
                }
                getStartPosition() {
                    let ar = this.data.findIndex(tn => tn !== 0);
                    if (ar < 0)
                        return;
                    const [gr,yr,vr] = this.stride;
                    let Kr = 0
                      , Yr = 0
                      , Qr = 0;
                    return Qr = Math.floor(ar / vr),
                    ar -= Qr * vr,
                    Yr = Math.floor(ar / yr),
                    ar -= Yr * yr,
                    Kr = Math.floor(ar / gr),
                    [Kr, Yr, Qr]
                }
            }
            Ki.VoxelView = ke;
            function ze(ur) {
                const ar = [1 / 0, 1 / 0, 1 / 0]
                  , gr = [-1 / 0, -1 / 0, -1 / 0];
                return (0,
                ee.traverseVoxels)(ur, [0, 0, 0], ur.getDimension(), (yr, vr, Kr, Yr) => {
                    Yr && (W.vec3.min(ar, ar, [yr, vr, Kr]),
                    W.vec3.max(gr, gr, [yr, vr, Kr]))
                }
                ),
                {
                    start: ar,
                    end: gr
                }
            }
            function Qe(ur, ar, gr, yr, vr) {
                let Kr = ur * ar * gr, Yr;
                if (yr && vr) {
                    const Qr = vr[0] - yr[0]
                      , tn = vr[1] - yr[1]
                      , rn = vr[2] - yr[2];
                    Kr = Qr * tn * rn,
                    Yr = [1, Qr, Qr * tn]
                }
                return new ke(new Uint16Array((0,
                ge.alloc)(Kr * 2)),[ur, ar, gr],[1, ur, ur * ar],0,yr,vr,Yr)
            }
            function st(ur) {
                (0,
                ge.free)(ur.data.buffer)
            }
            function ft(ur) {
                const ar = Qe(ur.shape[0], ur.shape[1], ur.shape[2]);
                return ar.copy(ur),
                ar
            }
            function Xt(ur, ar, gr) {
                const [yr,vr,Kr] = ur.shape;
                ar.writeInt32(yr),
                ar.writeInt32(vr),
                ar.writeInt32(Kr),
                !gr && (0,
                Pe.compress)(ur, ar)
            }
            function Ot(ur) {
                const ar = ur.readInt32()
                  , gr = ur.readInt32()
                  , yr = ur.readInt32()
                  , vr = ur.buffer.buffer.byteLength <= ur.offset;
                let Kr;
                return vr ? Kr = (0,
                ee.allocEmptyVoxels)(ar, gr, yr) : (Kr = Qe(ar, gr, yr),
                (0,
                Pe.decompress)(ur, Kr)),
                {
                    voxels: Kr,
                    isEmpty: vr
                }
            }
            function Nt(ur, ar, gr) {
                const yr = gr || ze(ur);
                switch (ar) {
                case "X":
                    Mt(ur, yr);
                    break;
                case "Y":
                    Gt(ur, yr);
                    break;
                case "Z":
                    rr(ur, yr)
                }
            }
            function Mt(ur, ar) {
                const {start: gr, end: yr} = ar
                  , vr = gr[0] + yr[0];
                (0,
                ee.traverseVoxels)(ur, gr, [Math.floor(vr / 2), yr[1], yr[2]], (Kr, Yr, Qr, tn) => {
                    const rn = ur.getVoxel(vr - Kr, Yr, Qr);
                    ur.setVoxel(Kr, Yr, Qr, rn),
                    ur.setVoxel(vr - Kr, Yr, Qr, tn)
                }
                )
            }
            function Gt(ur, ar) {
                const {start: gr, end: yr} = ar
                  , vr = gr[1] + yr[1];
                (0,
                ee.traverseVoxels)(ur, gr, [yr[0], Math.floor(vr / 2), yr[2]], (Kr, Yr, Qr, tn) => {
                    const rn = ur.getVoxel(Kr, vr - Yr, Qr);
                    ur.setVoxel(Kr, Yr, Qr, rn),
                    ur.setVoxel(Kr, vr - Yr, Qr, tn)
                }
                )
            }
            function rr(ur, ar) {
                const {start: gr, end: yr} = ar
                  , vr = gr[2] + yr[2];
                (0,
                ee.traverseVoxels)(ur, gr, [yr[0], yr[1], Math.floor(vr / 2)], (Kr, Yr, Qr, tn) => {
                    const rn = ur.getVoxel(Kr, Yr, vr - Qr);
                    ur.setVoxel(Kr, Yr, Qr, rn),
                    ur.setVoxel(Kr, Yr, vr - Qr, tn)
                }
                )
            }
            function Zt(ur) {
                return ur.data.some(ar => ar !== 0)
            }
            return Ki
        }
        var kn = Sn()
          , bi = W => Br(void 0, void 0, void 0, function*() {
            const ee = On.clone(On.identity);
            if (ee.bounds = W.bounds,
            ee.nodes = W.nodes,
            !W.meshes.length)
                return ee;
            const ge = []
              , Pe = []
              , Ce = [];
            W.meshes.forEach( (Qe, st) => Xi({
                palette: ge,
                emissivePalette: Pe,
                voxelViews: Ce
            }, Qe, st));
            for (let Qe = 0; Qe < ge.length; Qe++)
                ge[Qe] || (ge[Qe] = [0, 0, 0]);
            for (let Qe = 0; Qe < Pe.length; Qe++)
                Pe[Qe] || (Pe[Qe] = 0);
            const {meshes: ke, texture: ze} = yield n.voxelsToMeshes(Ce, ge, Pe);
            return ee.texture = ze,
            ee.meshes = ke,
            ee
        });
        function Xi(W, ee, ge) {
            const {palette: Pe, emissivePalette: Ce, voxelViews: ke} = W
              , ze = ss(new Uint8Array(ee));
            if (!ze) {
                ke[ge] = Di();
                return
            }
            for (const st in ze.material) {
                const {rgb: ft, pbr: Xt} = ze.material[st]
                  , [Ot,Nt,Mt] = ft;
                Pe[st] = [Ot, Nt, Mt],
                Ce[st] = Xt[2]
            }
            const Qe = ni(ze);
            ke[ge] = Qe || Di()
        }
        function ni(W) {
            let ee = 0
              , ge = 0;
            const Pe = [0, 0, 0]
              , Ce = [0, 0, 0];
            let ke = -1 / 0
              , ze = -1 / 0
              , Qe = -1 / 0;
            const st = [];
            for (; ge < W.sliceInfo.length; ) {
                const rr = W.sliceInfo[ge++]
                  , Zt = W.sliceInfo[ge++];
                for (let ur = 0; ur < Zt; ur++) {
                    const ar = W.sliceInfo[ge++]
                      , gr = W.sliceInfo[ge++];
                    for (let yr = 0; yr < gr; yr++,
                    ee++) {
                        const vr = W.data[ee * 6]
                          , Kr = W.data[ee * 6 + 1]
                          , Yr = W.data[ee * 6 + 2]
                          , Qr = W.data[ee * 6 + 3]
                          , tn = W.data[ee * 6 + 4];
                        let rn, An, Xn;
                        if (rr === 0 || rr === 1)
                            rn = 2,
                            An = 1,
                            Xn = 0;
                        else if (rr === 2 || rr === 3)
                            rn = 0,
                            An = 2,
                            Xn = 1;
                        else if (rr === 4 || rr === 5)
                            rn = 1,
                            An = 0,
                            Xn = 2;
                        else
                            return;
                        Pe[rn] = vr,
                        Pe[An] = Kr,
                        Pe[Xn] = ar - (rr & 1),
                        Ce[rn] = Yr - 1,
                        Ce[An] = Qr - 1,
                        Ce[Xn] = ar - (rr & 1),
                        st.push(...Pe, ...Ce, tn),
                        ke = Math.max(ke, Ce[0]),
                        ze = Math.max(ze, Ce[1]),
                        Qe = Math.max(Qe, Ce[2])
                    }
                }
            }
            const ft = [ke + 1, ze + 1, Qe + 1]
              , [Xt,Ot,Nt] = ft
              , Mt = [1, Xt, Xt * Ot]
              , Gt = new Uint16Array(Xt * Ot * Nt);
            for (let rr = 0; rr < st.length; rr += 7)
                for (let Zt = st[rr + 0]; Zt <= st[rr + 3]; Zt++)
                    for (let ur = st[rr + 1]; ur <= st[rr + 4]; ur++)
                        for (let ar = st[rr + 2]; ar <= st[rr + 5]; ar++) {
                            const gr = Zt * Mt[0] + ur * Mt[1] + ar * Mt[2];
                            Gt[gr] = st[rr + 6]
                        }
            return new kn.VoxelView(Gt,ft,Mt,0)
        }
        function Di() {
            return new kn.VoxelView(new Uint16Array,[0, 0, 0],[0, 0, 0],0)
        }
        var ui = W => Br(void 0, void 0, void 0, function*() {
            const ee = Pn.clone(Pn.identity);
            return ee.meshes = W.meshes,
            ee.nodes = W.nodes,
            ee.texture = W.texture,
            ee
        })
          , Gi = W => Br(void 0, void 0, void 0, function*() {
            const ee = Fn.clone(Fn.identity);
            return ee.meshes = W.meshes,
            ee.nodes = W.nodes,
            ee.texture = W.texture,
            ee
        })
          , na = $t.fromJSON([1, 1, 1])
          , ki = W => Br(void 0, void 0, void 0, function*() {
            const ee = Ai.clone(Ai.identity)
              , {version: ge} = W
              , Pe = Tr(W, ["version"]);
            return Object.assign(ee, Pe),
            ee.nodes.forEach(Ce => {
                Ce.scale = $t.clone(na)
            }
            ),
            ee
        })
          , Za = en.fromJSON([1, 0, 0, 0, 1, 0, 0, 0, 1])
          , ia = W => Br(void 0, void 0, void 0, function*() {
            const ee = Cn.clone(Cn.identity)
              , {version: ge} = W
              , Pe = Tr(W, ["version"]);
            return Object.assign(ee, Pe),
            ee.nodes.forEach(Ce => {
                Ce.parentScaleMat3 = en.clone(Za)
            }
            ),
            ee
        });
        function Xa(W) {
            return Br(this, void 0, void 0, function*() {
                const ee = oi(W);
                if (!ee)
                    return;
                const {version: ge, schema: Pe} = ee;
                if (ge > ti) {
                    console.error(`version: ${ge} is higher than current version: ${ti}`);
                    return
                }
                let Ce = Pe;
                const ke = {
                    1: Eo,
                    2: bi,
                    3: ui,
                    4: Gi,
                    5: ki,
                    6: ia
                };
                for (; ii(Ce) < ti; )
                    Ce = yield ke[ii(Ce)](Ce);
                if (!di(Ce)) {
                    console.error("Failed to migrate model to latest version");
                    return
                }
                return Ce
            })
        }
        var ii = W => W.version || 1
          , di = W => ii(W) === ti;
        function oi(W) {
            try {
                const Ce = JSON.parse(Buffer.from(W).toString());
                if (Ce.meshes)
                    return {
                        version: 1,
                        schema: Si[1].fromJSON(Ce)
                    }
            } catch {}
            const ee = new yt.MuReadStream(W)
              , ge = ee.readVarint();
            if (!fi(ge)) {
                console.error(`version: ${ge} is invalid`);
                return
            }
            const Pe = Si[ge];
            return {
                version: ge,
                schema: Pe.patch(Pe.identity, ee)
            }
        }
        function fi(W) {
            return W > 0 && W <= ti
        }
        function Qa(W) {
            const ee = new yt.MuWriteStream(0)
              , ge = W.version || 1;
            ee.grow(5),
            ee.writeVarint(ge);
            const Pe = Si[ge];
            Pe.diff(Pe.identity, W, ee);
            const Ce = ee.bytes();
            return ee.destroy(),
            Ce
        }
        function Ja(W, ee) {
            const ge = to(ee);
            if (ge)
                return ge;
            const Pe = oi(ee);
            if (!Pe || !eo(Pe.schema))
                return;
            let[Ce,ke,ze] = Pe.schema.bounds;
            return Pe.version === 1 && (Ce++,
            ke++,
            ze++),
            {
                version: Pe.version,
                bounds: [Ce, ke, ze],
                dataHash: W
            }
        }
        function eo(W) {
            return !!W.bounds
        }
        function to(W) {
            try {
                const ee = JSON.parse(Buffer.from(W).toString());
                if (ee.version && ee.bounds && ee.dataHash)
                    return ee
            } catch {}
        }
        var Ba = new bt.MuStruct({
            id: new bt.MuASCII,
            type: new bt.MuVarint(a.ProjectNodeType.Root),
            name: new bt.MuUTF8,
            voxelId: new bt.MuASCII,
            parentId: new bt.MuASCII,
            childrenIds: new bt.MuArray(new bt.MuASCII,1 / 0),
            pivot: $t,
            position: $t,
            quaternion: _r
        })
          , Da = new bt.MuDictionary(Ba,1 / 0)
          , ka = new bt.MuStruct({
            id: new bt.MuASCII,
            encodedView: new bt.MuArray(new bt.MuVarint,1 / 0),
            localPalette: new bt.MuArray(new bt.MuInt32,1 / 0)
        })
          , La = new bt.MuDictionary(ka,1 / 0)
          , aa = new bt.MuStruct({
            r: new bt.MuUint8,
            g: new bt.MuUint8,
            b: new bt.MuUint8
        })
          , Zn = new bt.MuStruct({
            id: new bt.MuASCII,
            color: aa,
            hsv: Gr,
            material: new bt.MuStruct({
                emissive: new bt.MuFloat32
            })
        })
          , hi = new bt.MuStruct({
            id: new bt.MuASCII,
            name: new bt.MuUTF8,
            colorIndices: new bt.MuArray(new bt.MuVarint,1 / 0)
        })
          , _o = new bt.MuStruct({
            items: new bt.MuArray(Zn,1 / 0),
            groups: new bt.MuDictionary(hi,1 / 0),
            groupList: new bt.MuArray(new bt.MuASCII,1 / 0)
        })
          , qi = new bt.MuStruct({
            version: new bt.MuVarint(1),
            nodes: Da,
            voxels: La,
            palette: _o
        })
          , jo = Object.freeze({
            __proto__: null,
            NodeSchema: Ba,
            NodesSchema: Da,
            PaletteDataSchema: _o,
            PaletteGroupSchema: hi,
            PaletteItemsSchema: Zn,
            ProjectDataV1Schema: qi,
            RGBSchema: aa,
            VoxelSchema: ka,
            VoxelsSchema: La
        })
          , Ua = new bt.MuStruct({
            id: new bt.MuASCII,
            type: new bt.MuVarint(a.ProjectNodeType.Root),
            name: new bt.MuUTF8,
            voxelId: new bt.MuASCII,
            parentId: new bt.MuASCII,
            childrenIds: new bt.MuArray(new bt.MuASCII,1 / 0),
            alpha: new bt.MuFloat32(1),
            pivot: $t,
            position: $t,
            quaternion: _r,
            euler: $t,
            flip: jr
        })
          , vo = new bt.MuDictionary(Ua,1 / 0)
          , zi = new bt.MuStruct({
            id: new bt.MuASCII,
            encodedView: new bt.MuArray(new bt.MuVarint,1 / 0)
        })
          , Ri = new bt.MuDictionary(zi,1 / 0)
          , Li = new bt.MuStruct({
            id: new bt.MuVarint,
            rgb: jr,
            hsv: Gr,
            material: new bt.MuStruct({
                emissive: new bt.MuFloat32
            })
        })
          , Hi = new bt.MuArray(Li,1 / 0)
          , ji = new bt.MuStruct({
            id: new bt.MuASCII,
            name: new bt.MuUTF8,
            itemIds: new bt.MuArray(new bt.MuUint16,1 / 0)
        })
          , Ei = new bt.MuDictionary(ji,1 / 0)
          , Pi = new bt.MuStruct({
            items: Hi,
            groups: Ei,
            groupList: new bt.MuArray(new bt.MuASCII,1 / 0)
        })
          , mf = new bt.MuStruct({
            version: new bt.MuVarint(2),
            nodes: vo,
            voxels: Ri,
            palette: Pi
        })
          , Bf = Object.freeze({
            __proto__: null,
            NodeSchema: Ua,
            NodesSchema: vo,
            PaletteDataSchema: Pi,
            PaletteGroupSchema: ji,
            PaletteGroupsSchema: Ei,
            PaletteItemSchema: Li,
            PaletteItemsSchema: Hi,
            ProjectDataV2Schema: mf,
            VoxelSchema: zi,
            VoxelsSchema: Ri
        })
          , bo = new bt.MuStruct({
            id: new bt.MuASCII,
            type: new bt.MuVarint(a.ProjectNodeType.Root),
            name: new bt.MuUTF8,
            voxelId: new bt.MuASCII,
            parentId: new bt.MuASCII,
            childrenIds: new bt.MuArray(new bt.MuASCII,1 / 0),
            alpha: new bt.MuFloat32(1),
            pivot: $t,
            position: $t,
            quaternion: _r,
            euler: $t,
            flip: jr
        })
          , ll = new bt.MuDictionary(bo,1 / 0)
          , af = new bt.MuStruct({
            target: new bt.MuStruct({
                nodeId: new bt.MuASCII,
                path: new bt.MuASCII
            }),
            sampler: Xr
        })
          , ul = new bt.MuStruct({
            name: new bt.MuUTF8,
            channels: new bt.MuArray(af,1 / 0)
        })
          , pf = new bt.MuStruct({
            version: new bt.MuVarint(3),
            nodes: ll,
            voxels: Ri,
            palette: Pi,
            animations: new bt.MuArray(ul,1 / 0)
        })
          , Df = Object.freeze({
            __proto__: null,
            get ChannelNodePath() {
                return a.ChannelNodePath
            },
            NodeSchema: bo,
            NodesSchema: ll,
            OutputSchema: er,
            PaletteDataSchema: Pi,
            PaletteGroupSchema: ji,
            PaletteGroupsSchema: Ei,
            PaletteItemSchema: Li,
            PaletteItemsSchema: Hi,
            ProjectAnimationSchema: ul,
            ProjectChannelSchema: af,
            ProjectDataV3Schema: pf,
            get ProjectInterpolationType() {
                return a.ProjectInterpolationType
            },
            SamplerSchema: Xr,
            TimeAccessorSchema: un,
            VoxelSchema: zi,
            VoxelsSchema: Ri
        })
          , gf = new bt.MuStruct({
            version: new bt.MuVarint(4),
            nodes: ll,
            voxels: Ri,
            palette: Pi,
            animations: new bt.MuArray(ul,1 / 0)
        })
          , kf = Object.freeze({
            __proto__: null,
            NodeSchema: bo,
            NodesSchema: ll,
            PaletteDataSchema: Pi,
            PaletteGroupSchema: ji,
            PaletteGroupsSchema: Ei,
            PaletteItemSchema: Li,
            PaletteItemsSchema: Hi,
            ProjectAnimationSchema: ul,
            ProjectChannelSchema: af,
            ProjectDataV4Schema: gf,
            get ProjectInterpolationType() {
                return a.ProjectInterpolationType
            },
            VoxelSchema: zi,
            VoxelsSchema: Ri
        })
          , _f = new bt.MuStruct({
            id: new bt.MuASCII,
            type: new bt.MuVarint(a.ProjectNodeType.Root),
            name: new bt.MuUTF8,
            voxelId: new bt.MuASCII,
            parentId: new bt.MuASCII,
            childrenIds: new bt.MuArray(new bt.MuASCII,1 / 0),
            skinId: new bt.MuASCII,
            boneId: new bt.MuASCII,
            alpha: new bt.MuFloat32(1),
            pivot: $t,
            position: $t,
            quaternion: _r,
            euler: $t,
            flip: jr
        })
          , vf = new bt.MuDictionary(_f,1 / 0)
          , bf = new bt.MuStruct({
            translation: new bt.MuOption($t),
            rotation: new bt.MuOption(_r),
            alpha: new bt.MuOption(new bt.MuFloat32(1))
        })
          , Pf = new bt.MuStruct({
            time: new bt.MuASCII,
            interpolation: new bt.MuASCII(a.ProjectInterpolationType.Linear),
            offset: bf
        })
          , yf = new bt.MuArray(Pf,1 / 0)
          , Sf = new bt.MuStruct({
            nodeId: new bt.MuASCII,
            keyframeList: yf
        })
          , Ef = new bt.MuDictionary(Sf,1 / 0)
          , Af = new bt.MuStruct({
            id: new bt.MuASCII,
            name: new bt.MuUTF8,
            nodes: Ef
        })
          , dl = new bt.MuStruct({
            version: new bt.MuVarint(5),
            nodes: vf,
            voxels: Ri,
            palette: Pi,
            animations: new bt.MuArray(Af,1 / 0)
        })
          , Lf = Object.freeze({
            __proto__: null,
            KeyframeListSchema: yf,
            KeyframeOffsetSchema: bf,
            KeyframeSchema: Pf,
            MotionNodeSchema: Sf,
            MotionNodesSchema: Ef,
            NodeSchema: _f,
            NodesSchema: vf,
            PaletteDataSchema: Pi,
            PaletteGroupSchema: ji,
            PaletteGroupsSchema: Ei,
            PaletteItemSchema: Li,
            PaletteItemsSchema: Hi,
            ProjectAnimationSchema: Af,
            ProjectDataV5Schema: dl,
            get ProjectInterpolationType() {
                return a.ProjectInterpolationType
            },
            VoxelSchema: zi,
            VoxelsSchema: Ri
        })
          , Xf = new bt.MuStruct({
            id: new bt.MuASCII,
            type: new bt.MuVarint(a.ProjectNodeType.Root),
            name: new bt.MuUTF8,
            voxelId: new bt.MuASCII,
            parentId: new bt.MuASCII,
            childrenIds: new bt.MuArray(new bt.MuASCII,1 / 0),
            skinId: new bt.MuASCII,
            boneId: new bt.MuASCII,
            alpha: new bt.MuFloat32(1),
            pivot: $t,
            position: $t,
            quaternion: _r,
            euler: $t,
            flip: jr,
            scale: $t
        })
          , Tf = new bt.MuDictionary(Xf,1 / 0)
          , Zo = new bt.MuStruct({
            translation: new bt.MuOption($t),
            rotation: new bt.MuOption(_r),
            scale: new bt.MuOption($t),
            alpha: new bt.MuOption(new bt.MuFloat32(1))
        })
          , Qo = new bt.MuStruct({
            time: new bt.MuASCII,
            interpolation: new bt.MuASCII(a.ProjectInterpolationType.Linear),
            offset: Zo
        })
          , Jo = new bt.MuArray(Qo,1 / 0)
          , es = new bt.MuStruct({
            nodeId: new bt.MuASCII,
            keyframeList: Jo
        })
          , ts = new bt.MuDictionary(es,1 / 0)
          , Ta = new bt.MuStruct({
            id: new bt.MuASCII,
            name: new bt.MuUTF8,
            nodes: ts
        })
          , fl = new bt.MuStruct({
            version: new bt.MuVarint(6),
            nodes: Tf,
            voxels: Ri,
            palette: Pi,
            animations: new bt.MuArray(Ta,1 / 0)
        })
          , Uf = Object.freeze({
            __proto__: null,
            KeyframeListSchema: Jo,
            KeyframeOffsetSchema: Zo,
            KeyframeSchema: Qo,
            MotionNodeSchema: es,
            MotionNodesSchema: ts,
            NodeSchema: Xf,
            NodesSchema: Tf,
            PaletteDataSchema: Pi,
            PaletteGroupSchema: ji,
            PaletteGroupsSchema: Ei,
            PaletteItemSchema: Li,
            PaletteItemsSchema: Hi,
            ProjectAnimationSchema: Ta,
            ProjectDataV6Schema: fl,
            get ProjectInterpolationType() {
                return a.ProjectInterpolationType
            },
            VoxelSchema: zi,
            VoxelsSchema: Ri
        })
          , Ys = new bt.MuStruct({
            id: new bt.MuASCII,
            type: new bt.MuVarint(a.ProjectNodeType.Root),
            name: new bt.MuUTF8,
            voxelId: new bt.MuASCII,
            parentId: new bt.MuASCII,
            childrenIds: new bt.MuArray(new bt.MuASCII,1 / 0),
            skinId: new bt.MuASCII,
            boneId: new bt.MuASCII,
            alpha: new bt.MuFloat32(1),
            pivot: $t,
            position: $t,
            quaternion: _r,
            euler: $t,
            flip: jr,
            scale: $t,
            parentScaleMat3: en
        })
          , ro = new bt.MuDictionary(Ys,1 / 0)
          , hl = new bt.MuStruct({
            version: new bt.MuVarint(7),
            nodes: ro,
            voxels: Ri,
            palette: Pi,
            animations: new bt.MuArray(Ta,1 / 0)
        })
          , Ff = Object.freeze({
            __proto__: null,
            KeyframeListSchema: Jo,
            KeyframeOffsetSchema: Zo,
            KeyframeSchema: Qo,
            MotionNodeSchema: es,
            MotionNodesSchema: ts,
            NodeSchema: Ys,
            NodesSchema: ro,
            PaletteDataSchema: Pi,
            PaletteGroupSchema: ji,
            PaletteGroupsSchema: Ei,
            PaletteItemSchema: Li,
            PaletteItemsSchema: Hi,
            ProjectAnimationSchema: Ta,
            ProjectDataV7Schema: hl,
            get ProjectInterpolationType() {
                return a.ProjectInterpolationType
            },
            VoxelSchema: zi,
            VoxelsSchema: Ri
        })
          , ml = new bt.MuStruct({
            id: new bt.MuASCII,
            dimension: new bt.MuVarint(a.VoxelDimension.XYZ),
            encodedView: new bt.MuArray(new bt.MuVarint,1 / 0)
        })
          , rs = new bt.MuDictionary(ml,1 / 0)
          , pl = new bt.MuStruct({
            version: new bt.MuVarint(8),
            nodes: ro,
            voxels: rs,
            palette: Pi,
            animations: new bt.MuArray(Ta,1 / 0)
        })
          , Wf = Object.freeze({
            __proto__: null,
            KeyframeListSchema: Jo,
            KeyframeOffsetSchema: Zo,
            KeyframeSchema: Qo,
            MotionNodeSchema: es,
            MotionNodesSchema: ts,
            NodeSchema: Ys,
            NodesSchema: ro,
            PaletteDataSchema: Pi,
            PaletteGroupSchema: ji,
            PaletteGroupsSchema: Ei,
            PaletteItemSchema: Li,
            PaletteItemsSchema: Hi,
            ProjectAnimationSchema: Ta,
            ProjectDataV8Schema: pl,
            get ProjectInterpolationType() {
                return a.ProjectInterpolationType
            },
            VoxelSchema: ml,
            VoxelsSchema: rs
        })
          , of = new bt.MuStruct({
            position: $t,
            size: $t
        })
          , gl = new bt.MuStruct({
            mode: new bt.MuVarint(a.HitBoxMode.Default),
            customBox: new bt.MuOption(of,void 0,!0)
        })
          , _l = new bt.MuStruct({
            version: new bt.MuVarint(9),
            nodes: ro,
            voxels: rs,
            palette: Pi,
            animations: new bt.MuArray(Ta,1 / 0),
            hitBox: gl
        })
          , qf = Object.freeze({
            __proto__: null,
            HitBoxDataSchema: of,
            HitBoxSchema: gl,
            KeyframeListSchema: Jo,
            KeyframeOffsetSchema: Zo,
            KeyframeSchema: Qo,
            MotionNodeSchema: es,
            MotionNodesSchema: ts,
            NodeSchema: Ys,
            NodesSchema: ro,
            PaletteDataSchema: Pi,
            PaletteGroupSchema: ji,
            PaletteGroupsSchema: Ei,
            PaletteItemSchema: Li,
            PaletteItemsSchema: Hi,
            ProjectAnimationSchema: Ta,
            ProjectDataV9Schema: _l,
            get ProjectInterpolationType() {
                return a.ProjectInterpolationType
            },
            VoxelSchema: ml,
            VoxelsSchema: rs
        })
          , Cf = $t
          , vl = new bt.MuStruct({
            version: new bt.MuVarint(10),
            nodes: ro,
            voxels: rs,
            palette: Pi,
            animations: new bt.MuArray(Ta,1 / 0),
            hitBox: gl,
            modelPivot: new bt.MuOption(Cf,void 0,!0)
        })
          , Vf = Object.freeze({
            __proto__: null,
            HitBoxDataSchema: of,
            HitBoxSchema: gl,
            KeyframeListSchema: Jo,
            KeyframeOffsetSchema: Zo,
            KeyframeSchema: Qo,
            ModelPivotSchema: Cf,
            MotionNodeSchema: es,
            MotionNodesSchema: ts,
            NodeSchema: Ys,
            NodesSchema: ro,
            PaletteDataSchema: Pi,
            PaletteGroupSchema: ji,
            PaletteGroupsSchema: Ei,
            PaletteItemSchema: Li,
            PaletteItemsSchema: Hi,
            ProjectAnimationSchema: Ta,
            ProjectDataV10Schema: vl,
            get ProjectInterpolationType() {
                return a.ProjectInterpolationType
            },
            VoxelSchema: ml,
            VoxelsSchema: rs
        })
          , Gs = 10
          , sf = {
            1: qi,
            2: mf,
            3: pf,
            4: gf,
            5: dl,
            6: fl,
            7: hl,
            8: pl,
            9: _l,
            10: vl
        }
          , wf = "ROOT"
          , $f = "Object"
          , Yf = -1
          , Gf = W => {
            const {voxels: ee, nodes: ge} = W
              , Pe = zf(ge)
              , Ce = Hf(W)
              , ke = jf(ee);
            return {
                nodes: Pe,
                voxels: ke,
                palette: Ce,
                version: 2
            }
        }
        ;
        function zf(W) {
            return Object.values(W).reduce( (ee, ge) => (ee[ge.id] = Object.assign(Object.assign({}, ge), {
                name: ge.id === wf ? ge.name : $f,
                alpha: 1,
                euler: $t.clone($t.identity),
                flip: jr.clone(jr.identity)
            }),
            ee), {})
        }
        function Hf(W) {
            const {palette: ee, nodes: ge, voxels: Pe} = W
              , {groups: Ce, items: ke, groupList: ze} = ee
              , Qe = ge[wf]
              , st = Qe.childrenIds ? Qe.childrenIds[0] : void 0;
            if (!st)
                throw new Error("Cannot find first node id.");
            const ft = ge[st];
            if (ft.type !== a.ProjectNodeType.SkinPart || !ft.voxelId || !Pe[ft.voxelId])
                throw new Error("No valid voxels");
            const Xt = Pe[ft.voxelId]
              , {localPalette: Ot} = Xt
              , Nt = []
              , Mt = {};
            Ot.forEach( (rr, Zt) => {
                if (rr === Yf)
                    return;
                const ur = ke[rr]
                  , {id: ar, color: gr} = ur
                  , yr = Tr(ur, ["id", "color"])
                  , {r: vr, g: Kr, b: Yr} = gr
                  , Qr = Zt + 1
                  , tn = jr.alloc();
                tn[0] = vr,
                tn[1] = Kr,
                tn[2] = Yr,
                Nt.push(Object.assign({
                    id: Qr,
                    rgb: tn
                }, yr)),
                Mt[ar] = Qr
            }
            );
            const Gt = Object.values(Ce).reduce( (rr, Zt) => {
                const ur = [];
                return Zt.colorIndices.forEach(ar => {
                    const {id: gr} = ke[ar];
                    Mt[gr] !== void 0 && ur.push(Mt[gr])
                }
                ),
                rr[Zt.id] = {
                    id: Zt.id,
                    name: Zt.name,
                    itemIds: ur
                },
                rr
            }
            , {});
            return {
                items: Nt,
                groups: Gt,
                groupList: ze
            }
        }
        function jf(W) {
            return Object.values(W).reduce( (ee, ge) => {
                const {id: Pe, encodedView: Ce} = ge;
                return ee[Pe] = {
                    id: Pe,
                    encodedView: Ce
                },
                ee
            }
            , {})
        }
        var bl = "ROOT"
          , Zf = "ROOT_BONE"
          , cf = "ROOT_SKIN"
          , Kf = "Root"
          , Qf = W => {
            const {nodes: ee, voxels: ge, palette: Pe} = W;
            return {
                nodes: Jf(ee),
                voxels: ge,
                palette: Pe,
                animations: [],
                version: 3
            }
        }
        ;
        function Jf(W) {
            const ee = Object.values(W).reduce( (ke, ze) => {
                const Qe = ze.type === a.ProjectNodeType.Root ? bl : ze.id;
                return ke[Qe] = Object.assign(Object.assign({}, ze), {
                    id: Qe
                }),
                ke
            }
            , {})
              , ge = ee[bl]
              , Pe = bo.clone(bo.identity);
            Pe.id = cf,
            Pe.name = Kf,
            Pe.type = a.ProjectNodeType.Group,
            Pe.parentId = bl,
            Pe.childrenIds = [...ge.childrenIds],
            ee[Pe.id] = Pe;
            const Ce = bo.clone(bo.identity);
            return Ce.id = Zf,
            Ce.name = Kf,
            Ce.type = a.ProjectNodeType.Bone,
            Ce.parentId = bl,
            Ce.childrenIds = [],
            ee[Ce.id] = Ce,
            ge.childrenIds = [Ce.id, Pe.id],
            ee
        }
        var e0 = W => {
            const {nodes: ee, voxels: ge, palette: Pe, animations: Ce} = W;
            return {
                nodes: t0(ee),
                voxels: ge,
                palette: Pe,
                animations: Ce,
                version: 4
            }
        }
        ;
        function t0(W) {
            return W[cf].childrenIds.forEach(ee => {
                const ge = W[ee];
                ge && (ge.parentId = cf)
            }
            ),
            W
        }
        var r0 = W => {
            const ee = dl.clone(dl.identity)
              , {nodes: ge, voxels: Pe, palette: Ce} = W;
            return ee.nodes = n0(ge),
            ee.voxels = Pe,
            ee.palette = Ce,
            ee.animations = [],
            ee
        }
        ;
        function n0(W) {
            return Object.values(W).reduce( (ee, ge) => (ee[ge.id] = Object.assign(Object.assign({}, ge), {
                skinId: "",
                boneId: ""
            }),
            ee), {})
        }
        var i0 = $t.fromJSON([1, 1, 1])
          , a0 = W => {
            const ee = fl.clone(fl.identity)
              , {version: ge} = W
              , Pe = Tr(W, ["version"]);
            return Object.assign(ee, Pe),
            Object.keys(ee.nodes).forEach(Ce => {
                const ke = ee.nodes[Ce];
                ke.scale = $t.clone(i0)
            }
            ),
            ee
        }
          , o0 = en.fromJSON([1, 0, 0, 0, 1, 0, 0, 0, 1])
          , s0 = W => {
            const ee = hl.clone(hl.identity)
              , {version: ge} = W
              , Pe = Tr(W, ["version"]);
            return Object.assign(ee, Pe),
            Object.keys(ee.nodes).forEach(Ce => {
                const ke = ee.nodes[Ce];
                ke.parentScaleMat3 = en.clone(o0)
            }
            ),
            ee
        }
          , c0 = W => {
            const ee = pl.clone(pl.identity)
              , {version: ge} = W
              , Pe = Tr(W, ["version"]);
            return Object.assign(ee, Pe),
            Object.keys(ee.voxels).forEach(Ce => {
                const ke = ee.voxels[Ce];
                ke.dimension = a.VoxelDimension.XYZ
            }
            ),
            ee
        }
          , l0 = W => {
            const ee = _l.clone(_l.identity)
              , {version: ge} = W
              , Pe = Tr(W, ["version"]);
            return Object.assign(ee, Pe),
            ee
        }
          , u0 = W => {
            const ee = vl.clone(vl.identity)
              , {version: ge} = W
              , Pe = Tr(W, ["version"]);
            return Object.assign(ee, Pe),
            ee
        }
        ;
        function d0(W) {
            const ee = xf(W);
            if (!ee)
                return;
            const {version: ge, schema: Pe} = ee;
            if (ge > Gs) {
                console.error(`version: ${ge} is higher than current version: ${Gs}`);
                return
            }
            let Ce = Pe;
            const ke = {
                1: Gf,
                2: Qf,
                3: e0,
                4: r0,
                5: a0,
                6: s0,
                7: c0,
                8: l0,
                9: u0
            };
            for (; Ce.version < Gs; )
                try {
                    Ce = ke[Ce.version](Ce)
                } catch (ze) {
                    console.error("Migration error", ze);
                    return
                }
            if (!f0(Ce)) {
                console.error("Failed to migrate project to latest version");
                return
            }
            return Ce
        }
        function f0(W) {
            return W.version === Gs
        }
        function xf(W) {
            try {
                const Ce = JSON.parse(Buffer.from(W).toString());
                if (Ce.version)
                    return {
                        version: 1,
                        schema: sf[1].fromJSON(Ce)
                    }
            } catch {}
            const ee = new yt.MuReadStream(W)
              , ge = ee.readVarint();
            if (!h0(ge)) {
                console.error(`version: ${ge} is invalid`);
                return
            }
            const Pe = sf[ge];
            return {
                version: ge,
                schema: Pe.patch(Pe.identity, ee)
            }
        }
        function h0(W) {
            return W > 0 && W <= Gs
        }
        function m0(W) {
            const ee = new yt.MuWriteStream(0)
              , ge = W.version;
            ee.grow(5),
            ee.writeVarint(ge);
            const Pe = sf[ge];
            Pe.diff(Pe.identity, W, ee);
            const Ce = ee.bytes();
            return ee.destroy(),
            Ce
        }
        var Nf = new bt.MuStruct({
            version: new bt.MuVarint(1),
            partId: new bt.MuUint8(0),
            bindMat: on,
            bounds: $t,
            nodes: Nr,
            texture: e.MeshTextureSchema,
            meshes: new bt.MuArray(e.MeshDataSchema,1 / 0)
        })
          , p0 = Object.freeze({
            __proto__: null,
            BodyPartDataV1Schema: Nf
        })
          , lf = new bt.MuStruct({
            version: new bt.MuVarint(2),
            partId: new bt.MuUint8(0),
            bindMat: on,
            bounds: $t,
            nodes: Mn,
            texture: e.MeshTextureSchema,
            meshes: new bt.MuArray(e.MeshDataSchema,1 / 0)
        })
          , g0 = Object.freeze({
            __proto__: null,
            BodyPartDataV2Schema: lf
        })
          , Pl = new bt.MuStruct({
            version: new bt.MuVarint(3),
            partId: new bt.MuUint8(0),
            bindMat: on,
            bounds: $t,
            nodes: an,
            texture: e.MeshTextureSchema,
            meshes: new bt.MuArray(e.MeshDataSchema,1 / 0)
        })
          , _0 = Object.freeze({
            __proto__: null,
            BodyPartDataV3Schema: Pl
        })
          , ns = 3
          , Rf = {
            1: Nf,
            2: lf,
            3: Pl
        }
          , v0 = $t.fromJSON([1, 1, 1])
          , b0 = W => {
            const ee = lf.alloc()
              , {version: ge} = W
              , Pe = Tr(W, ["version"]);
            return Object.assign(ee, Pe),
            ee.nodes.forEach(Ce => {
                Ce.scale = $t.clone(v0)
            }
            ),
            ee.version = 2,
            ee
        }
          , P0 = en.fromJSON([1, 0, 0, 0, 1, 0, 0, 0, 1])
          , y0 = W => {
            const ee = Pl.clone(Pl.identity)
              , {version: ge} = W
              , Pe = Tr(W, ["version"]);
            return Object.assign(ee, Pe),
            ee.nodes.forEach(Ce => {
                Ce.parentScaleMat3 = en.clone(P0)
            }
            ),
            ee
        }
        ;
        function S0(W) {
            const ee = Mf(W);
            if (!ee)
                return;
            const {version: ge, schema: Pe} = ee;
            if (ge > ns) {
                console.error(`version: ${ge} is higher than current version: ${ns}`);
                return
            }
            let Ce = Pe;
            const ke = {
                1: b0,
                2: y0
            };
            for (; Ce.version < ns; )
                Ce = ke[Ce.version](Ce);
            if (!Of(Ce)) {
                console.error("Failed to migrate model to latest version");
                return
            }
            return Ce
        }
        var Of = W => W.version === ns;
        function Mf(W) {
            const ee = new yt.MuReadStream(W)
              , ge = ee.readVarint();
            if (!E0(ge)) {
                console.error(`version: ${ge} is invalid`);
                return
            }
            const Pe = Rf[ge];
            return {
                version: ge,
                schema: Pe.patch(Pe.identity, ee)
            }
        }
        function E0(W) {
            return W > 0 && W <= ns
        }
        function A0(W) {
            const ee = new yt.MuWriteStream(0)
              , ge = W.version;
            ee.grow(5),
            ee.writeVarint(ge);
            const Pe = Rf[ge];
            Pe.diff(Pe.identity, W, ee);
            const Ce = ee.bytes();
            return ee.destroy(),
            Ce
        }
        function X0(W) {
            try {
                return JSON.parse(Buffer.from(W).toString())
            } catch {}
        }
        a.AlphaAccessorSchema = or,
        a.Mat3Schema = en,
        a.Mat4Schema = on,
        a.OutputSchema = er,
        a.RotationAccessorSchema = ln,
        a.SamplerSchema = Xr,
        a.TimeAccessorSchema = un,
        a.TranslationAccessorSchema = Rt,
        a.Uint16Vec3Schema = Gr,
        a.Uint8Vec3Schema = jr,
        a.VOXA_MODEL_VERSION = ti,
        a.VOXA_SKIN_VERSION = ns,
        a.Vec3Schema = $t,
        a.Vec4Schema = _r,
        a.bodyPartBytesToSchema = Mf,
        a.bodyPartSchemaToBytes = A0,
        a.calcEasing = dr,
        a.getModelMetaData = Ja,
        a.getModelVersion = ii,
        a.getSkinMetaData = X0,
        a.isLatestModel = di,
        a.isLatestSkin = Of,
        a.lerp = lr,
        a.migrateModel = Xa,
        a.migrateProject = d0,
        a.migrateSkin = S0,
        a.modelBytesToSchema = oi,
        a.modelSchemaToBytes = Qa,
        a.modelV1 = Pr,
        a.modelV2 = Yn,
        a.modelV3 = ei,
        a.modelV4 = Wn,
        a.modelV5 = _i,
        a.modelV6 = mi,
        a.modelV7 = Gn,
        a.projectBytesToSchema = xf,
        a.projectSchemaToBytes = m0,
        a.projectV1 = jo,
        a.projectV10 = Vf,
        a.projectV2 = Bf,
        a.projectV3 = Df,
        a.projectV4 = kf,
        a.projectV5 = Lf,
        a.projectV6 = Uf,
        a.projectV7 = Ff,
        a.projectV8 = Wf,
        a.projectV9 = qf,
        a.skinV1 = p0,
        a.skinV2 = g0,
        a.skinV3 = _0
    }
})
  , require_helper = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/utils/helper.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.FaceModeSelectOption = a.FaceModeColorOption = a.CenterModeOption = a.colorSelectOptions = a.EditingMode = a.Actions = a.WorkAction = void 0,
        a.generateCuboid = _,
        a.boundary = T,
        a.surfaceScale = C,
        a.hex2rgb = K,
        a.absMod = I,
        a.traverseVoxels = O,
        a.inRange = q,
        a.adjacentVoxels = k,
        a.drawVoxelSphere = V,
        a.drawVoxelCircle = $,
        a.drawVoxelSquare = Y,
        a.calcRadius = Z,
        a.calcHalfEdgeLen = H,
        a.drawVoxelLine = J,
        a.cloneArray = ae,
        a.newBundle = z,
        a.fillSpace = B,
        a.allocEmptyVoxels = f,
        a.getElementPos = y,
        a.mergeVoxel = X,
        a.surfaceByNormalAndPoint = N;
        var e = require_voxel(), n = require_cjs(), c;
        (function(R) {
            R[R.bakeAoData = 0] = "bakeAoData",
            R[R.syncVoxel = 1] = "syncVoxel",
            R[R.updateVoxel = 2] = "updateVoxel",
            R[R.sendPoints = 3] = "sendPoints",
            R[R.clearData = 4] = "clearData",
            R[R.changeSize = 5] = "changeSize"
        }
        )(c || (a.WorkAction = c = {}));
        var d;
        (function(R) {
            R[R.Attach = 0] = "Attach",
            R[R.Erase = 1] = "Erase",
            R[R.Paint = 2] = "Paint",
            R[R.Select = 3] = "Select",
            R[R.Translate = 4] = "Translate",
            R[R.ColorSelect = 5] = "ColorSelect",
            R[R.PickColor = 6] = "PickColor",
            R[R.HollowOut = 7] = "HollowOut",
            R[R.FillSameColorSpace = 8] = "FillSameColorSpace",
            R[R.Extrude = 9] = "Extrude"
        }
        )(d || (a.Actions = d = {}));
        var l;
        (function(R) {
            R[R.line = 0] = "line",
            R[R.center = 1] = "center",
            R[R.box = 2] = "box",
            R[R.voxel = 3] = "voxel",
            R[R.face = 4] = "face",
            R[R.rect = 5] = "rect"
        }
        )(l || (a.EditingMode = l = {}));
        var u;
        (function(R) {
            R[R.volume = 0] = "volume",
            R[R.face = 1] = "face",
            R[R.all = 2] = "all"
        }
        )(u || (a.colorSelectOptions = u = {}));
        var m;
        (function(R) {
            R[R.square = 0] = "square",
            R[R.circle = 1] = "circle"
        }
        )(m || (a.CenterModeOption = m = {}));
        var b;
        (function(R) {
            R[R.voxelColor = 0] = "voxelColor",
            R[R.currentColor = 1] = "currentColor"
        }
        )(b || (a.FaceModeColorOption = b = {}));
        var v;
        (function(R) {
            R[R.geometry = 0] = "geometry",
            R[R.colorGeometry = 1] = "colorGeometry"
        }
        )(v || (a.FaceModeSelectOption = v = {}));
        function _(R, D, F, M, E) {
            const {start: U, end: Q} = T(R, D, [-1 / 0, -1 / 0, -1 / 0], [1 / 0, 1 / 0, 1 / 0])
              , ie = []
              , te = []
              , oe = []
              , he = M ? -1 : 1;
            if (F)
                for (let se = 0; se < 3; se++)
                    E ? Q[se] = Math.min(Q[se] + 1, E[se]) : Q[se] = Q[se] + 1;
            ie.push([U[0], U[1], U[2]]),
            ie.push([U[0], U[1], Q[2]]),
            ie.push([Q[0], U[1], Q[2]]),
            ie.push([Q[0], U[1], U[2]]),
            ie.push([U[0], Q[1], U[2]]),
            ie.push([Q[0], Q[1], U[2]]),
            ie.push([Q[0], Q[1], Q[2]]),
            ie.push([U[0], Q[1], Q[2]]),
            ie.push([Q[0], U[1], U[2]]),
            ie.push([Q[0], U[1], Q[2]]),
            ie.push([Q[0], Q[1], Q[2]]),
            ie.push([Q[0], Q[1], U[2]]),
            ie.push([U[0], U[1], U[2]]),
            ie.push([U[0], Q[1], U[2]]),
            ie.push([U[0], Q[1], Q[2]]),
            ie.push([U[0], U[1], Q[2]]),
            ie.push([U[0], U[1], U[2]]),
            ie.push([Q[0], U[1], U[2]]),
            ie.push([Q[0], Q[1], U[2]]),
            ie.push([U[0], Q[1], U[2]]),
            ie.push([U[0], U[1], Q[2]]),
            ie.push([U[0], Q[1], Q[2]]),
            ie.push([Q[0], Q[1], Q[2]]),
            ie.push([Q[0], U[1], Q[2]]);
            for (let se = 0; se < 4; se++)
                oe.push([0, 1 * he, 0]);
            for (let se = 0; se < 4; se++)
                oe.push([0, -1 * he, 0]);
            for (let se = 0; se < 4; se++)
                oe.push([-1 * he, 0, 0]);
            for (let se = 0; se < 4; se++)
                oe.push([1 * he, 0, 0]);
            for (let se = 0; se < 4; se++)
                oe.push([0, 0, 1 * he]);
            for (let se = 0; se < 4; se++)
                oe.push([0, 0, -1 * he]);
            const j = [0, 4, 8, 12, 16, 20];
            for (let se = 0; se < j.length; se++)
                he == -1 ? (te.push([j[se] + 2, j[se] + 1, j[se]]),
                te.push([j[se], j[se] + 3, j[se] + 2])) : (te.push([j[se], j[se] + 1, j[se] + 2]),
                te.push([j[se] + 2, j[se] + 3, j[se]]));
            return {
                lo: [U[0], U[1], U[2]],
                hi: [Q[0], Q[1], Q[2]],
                positions: ie,
                elements: te,
                normals: oe
            }
        }
        function T(R, D, F, M) {
            const E = n.vec3.create()
              , U = n.vec3.create();
            return n.vec3.max(E, n.vec3.min(E, R, D), F),
            n.vec3.min(U, n.vec3.max(U, R, D), M),
            {
                start: E,
                end: U
            }
        }
        function C(R, D, F) {
            const M = Math.min
              , E = [D[0][0], D[0][1], D[0][2]];
            for (let Q = 1; Q < D.length; Q++)
                E[0] = M(E[0], D[Q][0]),
                E[1] = M(E[1], D[Q][1]),
                E[2] = M(E[2], D[Q][2]);
            const U = [];
            for (let Q = 0; Q < D.length; Q++) {
                const ie = [0, 0, 0];
                R[0] == 0 ? ie[0] = (D[Q][0] - E[0]) * F - F / 2 : R[0] != 0 && (ie[0] = D[0][0]),
                R[1] == 0 ? ie[1] = (D[Q][1] - E[1]) * F - F / 2 : R[1] != 0 && (ie[1] = D[0][1]),
                R[2] == 0 ? ie[2] = (D[Q][2] - E[2]) * F - F / 2 : R[2] != 0 && (ie[2] = D[0][2]),
                U.push(ie)
            }
            return U
        }
        function K(R) {
            return R[0] == "#" && (R = R.substr(1)),
            [parseInt(R.substr(0, 2), 16), parseInt(R.substr(2, 2), 16), parseInt(R.substr(4, 2), 16)]
        }
        function I(R, D) {
            return R < 0 ? R = Math.ceil(Math.abs(R / D)) * D + R : R %= D,
            R
        }
        function O(R, D, F, M) {
            const {data: E, stride: [U,Q,ie], offset: te} = R
              , oe = F[0] - D[0] + 1
              , he = F[1] - D[1] + 1
              , j = U
              , se = Q - U * oe
              , ue = ie - Q * he;
            let _e = U * D[0] + Q * D[1] + ie * D[2] + te;
            for (let Xe = D[2]; Xe <= F[2]; ++Xe) {
                for (let pe = D[1]; pe <= F[1]; ++pe) {
                    for (let ye = D[0]; ye <= F[0]; ++ye)
                        M(ye, pe, Xe, E[_e], _e),
                        _e += j;
                    _e += se
                }
                _e += ue
            }
        }
        function q(R, D, F) {
            const [M,E,U] = R
              , [Q,ie,te] = D
              , [oe,he,j] = F;
            return M >= Q && E >= ie && U >= te && M <= oe && E <= he && U <= j
        }
        function k(R, D, F, M, E, U, Q, ie, te) {
            const oe = [];
            oe.push(F);
            const he = [R.shape[0] - 1, R.shape[1] - 1, R.shape[2] - 1];
            for (; oe.length; ) {
                const [j,se,ue] = oe.pop();
                if (q([j, se, ue], [0, 0, 0], he) && !(te && q([j + te[0], se + te[1], ue + te[2]], [0, 0, 0], he) && R.getVoxel(j + te[0], se + te[1], ue + te[2]) !== 0)) {
                    if (M === -1) {
                        const _e = D.index(j, se, ue);
                        if (D.data[_e] != 0)
                            continue;
                        if (R.data[_e] !== 0)
                            D.data[_e] = R.data[_e];
                        else
                            continue
                    } else if (M === 0) {
                        if (D.getVoxel(j, se, ue) === E)
                            continue;
                        if (R.getVoxel(j, se, ue) === 0)
                            D.setVoxel(j, se, ue, E),
                            R.setVoxel(j, se, ue, E);
                        else
                            continue
                    } else {
                        if (D.getVoxel(j, se, ue) === M)
                            continue;
                        if (R.getVoxel(j, se, ue) === M)
                            D.setVoxel(j, se, ue, M);
                        else
                            continue
                    }
                    n.vec3.min(Q, Q, [j, se, ue]),
                    n.vec3.max(ie, ie, [j, se, ue]),
                    U[0] != 0 && (oe.push([j + 1, se, ue]),
                    oe.push([j - 1, se, ue])),
                    U[1] != 0 && (oe.push([j, se + 1, ue]),
                    oe.push([j, se - 1, ue])),
                    U[2] != 0 && (oe.push([j, se, ue + 1]),
                    oe.push([j, se, ue - 1]))
                }
            }
        }
        function V(R, D, F) {
            for (let M = 0; M < F; M++)
                for (let E = 0; E < F; E++)
                    for (let U = 0; U < F; U++)
                        M * M + E * E + U * U < F * F && (R.setVoxel(D[0] + M, D[1] + E, D[2] + U, 1),
                        R.setVoxel(D[0] - M, D[1] + E, D[2] + U, 1),
                        R.setVoxel(D[0] + M, D[1] - E, D[2] + U, 1),
                        R.setVoxel(D[0] + M, D[1] + E, D[2] - U, 1),
                        R.setVoxel(D[0] - M, D[1] - E, D[2] + U, 1),
                        R.setVoxel(D[0] - M, D[1] - E, D[2] - U, 1),
                        R.setVoxel(D[0] + M, D[1] - E, D[2] - U, 1),
                        R.setVoxel(D[0] - M, D[1] + E, D[2] - U, 1))
        }
        function $(R, D, F, M, E, U) {
            let Q = 0
              , ie = M
              , te = 5 / 4 - M;
            for (typeof E != "string" && (E[0] != 0 ? E = "x" : E[1] != 0 ? E = "y" : E[2] != 0 && (E = "z")); Q <= ie; )
                if (te < 0 ? (te = te + 2 * Q + 3,
                Q++) : (te = te + 2 * (Q - ie) + 5,
                ie--,
                Q++),
                E === "z") {
                    for (let oe = F[0] - Q; oe <= F[0] + Q; oe++)
                        U(oe, F[1] + ie, F[2]),
                        U(oe, F[1] - ie, F[2]);
                    for (let oe = F[0] - ie; oe <= F[0] + ie; oe++)
                        U(oe, F[1] + Q, F[2]),
                        U(oe, F[1] - Q, F[2]);
                    for (let oe = F[0] - M; oe <= F[0] + M; oe++)
                        oe != F[0] && U(oe, F[1], F[2])
                } else if (E === "y") {
                    for (let oe = F[2] - Q; oe <= F[2] + Q; oe++)
                        U(F[0] + ie, F[1], oe),
                        U(F[0] - ie, F[1], oe);
                    for (let oe = F[2] - ie; oe <= F[2] + ie; oe++)
                        U(F[0] + Q, F[1], oe),
                        U(F[0] - Q, F[1], oe);
                    for (let oe = F[2] - M; oe <= F[2] + M; oe++)
                        oe != F[2] && U(F[0], F[1], oe)
                } else if (E === "x") {
                    for (let oe = F[2] - Q; oe <= F[2] + Q; oe++)
                        U(F[0], F[1] + ie, oe),
                        U(F[0], F[1] - ie, oe);
                    for (let oe = F[2] - ie; oe <= F[2] + ie; oe++)
                        U(F[0], F[1] + Q, oe),
                        U(F[0], F[1] - Q, oe);
                    for (let oe = F[2] - M; oe <= F[2] + M; oe++)
                        oe != F[2] && U(F[0], F[1], oe)
                }
        }
        function Y(R, D, F, M, E, U=!1) {
            if (typeof E != "string" && (E[0] != 0 ? E = "x" : E[1] != 0 ? E = "y" : E[2] != 0 && (E = "z")),
            E === "z") {
                for (let Q = F[0] - M; Q <= F[0] + M; Q++)
                    for (let ie = F[1] - M; ie <= F[1] + M; ie++)
                        if (Q != F[0] || ie != F[1]) {
                            const te = R.index(Q, ie, F[2]);
                            te > -1 && (R.data[te] = U ? D : R.data[te] || D)
                        }
            } else if (E === "y") {
                for (let Q = F[0] - M; Q <= F[0] + M; Q++)
                    for (let ie = F[2] - M; ie <= F[2] + M; ie++)
                        if (Q != F[0] || ie != F[2]) {
                            const te = R.index(Q, F[1], ie);
                            te > -1 && (R.data[te] = U ? D : R.data[te] || D)
                        }
            } else if (E === "x") {
                for (let Q = F[1] - M; Q <= F[1] + M; Q++)
                    for (let ie = F[2] - M; ie <= F[2] + M; ie++)
                        if (Q != F[1] || ie != F[2]) {
                            const te = R.index(F[0], Q, ie);
                            te > -1 && (R.data[te] = U ? D : R.data[te] || D)
                        }
            }
        }
        function Z(R, D, F) {
            if (R[0] != 0) {
                const M = F[1] - D[1]
                  , E = F[2] - D[2];
                return Math.round(Math.pow(M * M + E * E, .5))
            } else if (R[1] != 0) {
                const M = F[0] - D[0]
                  , E = F[2] - D[2];
                return Math.round(Math.pow(M * M + E * E, .5))
            } else if (R[2] != 0) {
                const M = F[0] - D[0]
                  , E = F[1] - D[1];
                return Math.round(Math.pow(M * M + E * E, .5))
            }
            return 0
        }
        function H(R, D, F) {
            if (R[0] != 0) {
                const M = Math.abs(F[1] - D[1])
                  , E = Math.abs(F[2] - D[2]);
                return Math.max(M, E)
            } else if (R[1] != 0) {
                const M = Math.abs(F[0] - D[0])
                  , E = Math.abs(F[2] - D[2]);
                return Math.max(M, E)
            } else if (R[2] != 0) {
                const M = Math.abs(F[0] - D[0])
                  , E = Math.abs(F[1] - D[1]);
                return Math.max(M, E)
            }
            return 0
        }
        function J(R, D, F) {
            const M = Math.min(R[0], D[0])
              , E = Math.min(R[1], D[1])
              , U = Math.min(R[2], D[2])
              , Q = Math.max(R[0], D[0])
              , ie = Math.max(R[1], D[1])
              , te = Math.max(R[2], D[2]);
            let oe = +(D[0] - R[0])
              , he = +(D[1] - R[1])
              , j = +(D[2] - R[2]);
            const se = Math.sqrt(Math.pow(oe, 2) + Math.pow(he, 2) + Math.pow(j, 2));
            oe = oe / se,
            he = he / se,
            j = j / se;
            const ue = Math.abs(1 / oe)
              , _e = Math.abs(1 / he)
              , Xe = Math.abs(1 / j);
            let pe = ue < 1 / 0 ? Math.abs(oe) + 1 : 1 / 0
              , ye = _e < 1 / 0 ? Math.abs(he) + 1 : 1 / 0
              , ce = Xe < 1 / 0 ? Math.abs(j) + 1 : 1 / 0;
            const Be = oe < 0 ? -1 : oe > 0 ? 1 : 0
              , ne = he < 0 ? -1 : he > 0 ? 1 : 0
              , be = j < 0 ? -1 : j > 0 ? 1 : 0;
            let[ve,Se,Ke] = R;
            for (; ; ) {
                if (F(ve, Se, Ke),
                ve == D[0] && Se == D[1] && Ke == D[2])
                    return;
                if (pe < ye)
                    if (pe < ce) {
                        if (ve = ve + Be,
                        ve < M || ve > Q)
                            return;
                        pe = pe + ue
                    } else {
                        if (Ke = Ke + be,
                        Ke < U || Ke > te)
                            return;
                        ce = ce + Xe
                    }
                else if (ye < ce) {
                    if (Se = Se + ne,
                    Se < E || Se > ie)
                        return;
                    ye = ye + _e
                } else {
                    if (Ke = Ke + be,
                    Ke < U || Ke > te)
                        return;
                    ce = ce + Xe
                }
            }
        }
        function ae(R) {
            const D = new Array(R.length);
            for (let F = 0; F < R.length; ++F)
                D[F] = R[F].slice();
            return D
        }
        function re(R, D, F, M) {
            const E = Math.max
              , U = Math.min
              , Q = [E(R[0], F[0]), E(R[1], F[1]), E(R[2], F[2])]
              , ie = [U(D[0], M[0]), U(D[1], M[1]), U(D[2], M[2])];
            if (!(Q[0] < ie[0] && Q[1] < ie[1] && Q[2] < ie[2]))
                return {
                    eliminate: [[R, D]],
                    addition: [[F, M]]
                };
            const te = [];
            [[R, [ie[0], D[1], Q[2]]], [[ie[0] + 1, R[1], R[2]], [D[0], D[1], ie[2]]], [[R[0], R[1], Q[2]], [Q[0] - 1, D[1], D[2]]], [[Q[0], R[1], ie[2]], D], [[Q[0], R[1], Q[2]], [ie[0], Q[1] - 1, ie[2]]], [[Q[0], ie[1] + 1, Q[2]], [ie[0], D[1], ie[2]]]].forEach(he => {
                for (let j = 0; j < he[0].length; j++)
                    if (he[1][j] - he[0][j] < 0)
                        return;
                te.push(he)
            }
            );
            const oe = [];
            return [[F, [ie[0], M[1], Q[2]]], [[ie[0] + 1, F[1], F[2]], [M[0], M[1], ie[2]]], [[F[0], F[1], Q[2]], [Q[0] - 1, M[1], M[2]]], [[Q[0], F[1], ie[2]], M], [[Q[0], F[1], Q[2]], [ie[0], Q[1] - 1, ie[2]]], [[Q[0], ie[1] + 1, Q[2]], [ie[0], M[1], ie[2]]]].forEach(he => {
                for (let j = 0; j < he[0].length; j++)
                    if (he[1][j] - he[0][j] < 0)
                        return;
                oe.push(he)
            }
            ),
            {
                eliminate: te,
                addition: oe
            }
        }
        function z(R, D, F, M, E, U, Q, ie) {
            const te = T(M, E, [0, 0, 0], R.getDimension())
              , [oe,he,j] = te.start
              , [se,ue,_e] = te.end;
            if (D && D.length == 3) {
                const Xe = T(D, F, [0, 0, 0], R.getDimension())
                  , [pe,ye,ce] = Xe.start
                  , [Be,ne,be] = Xe.end
                  , ve = re([pe, ye, ce], [Be, ne, be], [oe, he, j], [se, ue, _e]);
                ve.eliminate.forEach(Se => {
                    B(R, Se[0], Se[1], U)
                }
                ),
                ve.addition.forEach(Se => {
                    B(R, Se[0], Se[1], Q, ie)
                }
                )
            } else
                for (let Xe = oe; Xe <= se; Xe++)
                    for (let pe = he; pe <= ue; pe++)
                        for (let ye = j; ye <= _e; ye++)
                            typeof Q == "function" ? R.setVoxel(Xe, pe, ye, Q(Xe, pe, ye)) : R.setVoxel(Xe, pe, ye, Q);
            return R
        }
        function B(R, D, F, M, E) {
            const U = typeof M == "function" ? M : () => M
              , Q = typeof E == "function" ? E : () => !0;
            O(R, D, F, (ie, te, oe) => {
                Q(ie, te, oe) && R.setVoxel(ie, te, oe, U(ie, te, oe))
            }
            )
        }
        function f(R, D, F) {
            const M = (0,
            e.allocVoxels)(R, D, F);
            for (let E = 0; E < M.data.length; E++)
                M.data[E] = 0;
            return M
        }
        function y(R) {
            let D = 0
              , F = 0;
            for (; R != null; )
                D += R.offsetLeft,
                F += R.offsetTop,
                R = R.offsetParent;
            return {
                x: D,
                y: F
            }
        }
        function X(R, D, F, M, E=1) {
            const U = T(F, M, [0, 0, 0], R.shape.map(se => se - 1))
              , [Q,ie,te] = U.start
              , [oe,he,j] = U.end;
            for (let se = Q; se <= oe; se++)
                for (let ue = ie; ue <= he; ue++)
                    for (let _e = te; _e <= j; _e++)
                        E === 1 ? R.getVoxel(se, ue, _e) == 0 && R.setVoxel(se, ue, _e, D.getVoxel(se, ue, _e)) : E === 2 ? R.setVoxel(se, ue, _e, D.getVoxel(se, ue, _e)) : E === 3 ? D.getVoxel(se, ue, _e) != 0 && R.setVoxel(se, ue, _e, D.getVoxel(se, ue, _e)) : E === 4 ? D.getVoxel(se, ue, _e) != 0 && (R.setVoxel(se, ue, _e, D.getVoxel(se, ue, _e)),
                        D.setVoxel(se, ue, _e, 0)) : E === 5 && R.getVoxel(se, ue, _e) == 0 && (R.setVoxel(se, ue, _e, D.getVoxel(se, ue, _e)),
                        D.setVoxel(se, ue, _e, 0));
            return function(se, ue, _e, Xe=1) {
                return X(R, se, ue, _e, Xe)
            }
        }
        function N(R, D) {
            const F = []
              , M = D[0] - R[0]
              , E = D[1] - R[1]
              , U = D[2] - R[2]
              , Q = R[0]
              , ie = R[1]
              , te = R[2]
              , oe = Math.max(Math.abs(M), Math.abs(E), Math.abs(U));
            let he;
            const j = 2e3;
            if (oe === Math.abs(M)) {
                M > 0 ? he = [[j, j], [-2e3, j], [-2e3, -2e3], [j, -2e3]] : he = [[j, j], [j, -2e3], [-2e3, -2e3], [-2e3, j]];
                for (let se = 0; se < he.length; se++) {
                    const ue = he[se][0]
                      , _e = he[se][1]
                      , Xe = Q - (E * (ue - ie) + U * (_e - te)) / M;
                    F.push([Xe, ue, _e])
                }
            } else if (oe === Math.abs(E)) {
                E > 0 ? he = [[j, j], [j, -2e3], [-2e3, -2e3], [-2e3, j]] : he = [[j, j], [-2e3, j], [-2e3, -2e3], [j, -2e3]];
                for (let se = 0; se < he.length; se++) {
                    const ue = he[se][0]
                      , _e = he[se][1]
                      , Xe = ie - (M * (ue - Q) + U * (_e - te)) / E;
                    F.push([ue, Xe, _e])
                }
            } else {
                if (U > 0)
                    he = [[j, j], [-2e3, j], [-2e3, -2e3], [j, -2e3]];
                else if (U < 0)
                    he = [[j, j], [j, -2e3], [-2e3, -2e3], [-2e3, j]];
                else
                    throw new Error("C should not be zero");
                for (let se = 0; se < he.length; se++) {
                    const ue = he[se][0]
                      , _e = he[se][1]
                      , Xe = te - (M * (ue - Q) + E * (_e - ie)) / U;
                    F.push([ue, _e, Xe])
                }
            }
            return F
        }
    }
})
  , require_twiddle = __commonJS({
    "src/utils/vcode-gltf-standalone/node_modules/.pnpm/bit-twiddle@1.0.2/node_modules/bit-twiddle/twiddle.js"(a) {
        "use restrict";
        var e = 32;
        a.INT_BITS = e,
        a.INT_MAX = 2147483647,
        a.INT_MIN = -1 << e - 1,
        a.sign = function(d) {
            return (d > 0) - (d < 0)
        }
        ,
        a.abs = function(d) {
            var l = d >> e - 1;
            return (d ^ l) - l
        }
        ,
        a.min = function(d, l) {
            return l ^ (d ^ l) & -(d < l)
        }
        ,
        a.max = function(d, l) {
            return d ^ (d ^ l) & -(d < l)
        }
        ,
        a.isPow2 = function(d) {
            return !(d & d - 1) && !!d
        }
        ,
        a.log2 = function(d) {
            var l, u;
            return l = (d > 65535) << 4,
            d >>>= l,
            u = (d > 255) << 3,
            d >>>= u,
            l |= u,
            u = (d > 15) << 2,
            d >>>= u,
            l |= u,
            u = (d > 3) << 1,
            d >>>= u,
            l |= u,
            l | d >> 1
        }
        ,
        a.log10 = function(d) {
            return d >= 1e9 ? 9 : d >= 1e8 ? 8 : d >= 1e7 ? 7 : d >= 1e6 ? 6 : d >= 1e5 ? 5 : d >= 1e4 ? 4 : d >= 1e3 ? 3 : d >= 100 ? 2 : d >= 10 ? 1 : 0
        }
        ,
        a.popCount = function(d) {
            return d = d - (d >>> 1 & 1431655765),
            d = (d & 858993459) + (d >>> 2 & 858993459),
            (d + (d >>> 4) & 252645135) * 16843009 >>> 24
        }
        ;
        function n(d) {
            var l = 32;
            return d &= -d,
            d && l--,
            d & 65535 && (l -= 16),
            d & 16711935 && (l -= 8),
            d & 252645135 && (l -= 4),
            d & 858993459 && (l -= 2),
            d & 1431655765 && (l -= 1),
            l
        }
        a.countTrailingZeros = n,
        a.nextPow2 = function(d) {
            return d += d === 0,
            --d,
            d |= d >>> 1,
            d |= d >>> 2,
            d |= d >>> 4,
            d |= d >>> 8,
            d |= d >>> 16,
            d + 1
        }
        ,
        a.prevPow2 = function(d) {
            return d |= d >>> 1,
            d |= d >>> 2,
            d |= d >>> 4,
            d |= d >>> 8,
            d |= d >>> 16,
            d - (d >>> 1)
        }
        ,
        a.parity = function(d) {
            return d ^= d >>> 16,
            d ^= d >>> 8,
            d ^= d >>> 4,
            d &= 15,
            27030 >>> d & 1
        }
        ;
        var c = new Array(256);
        (function(d) {
            for (var l = 0; l < 256; ++l) {
                var u = l
                  , m = l
                  , b = 7;
                for (u >>>= 1; u; u >>>= 1)
                    m <<= 1,
                    m |= u & 1,
                    --b;
                d[l] = m << b & 255
            }
        }
        )(c),
        a.reverse = function(d) {
            return c[d & 255] << 24 | c[d >>> 8 & 255] << 16 | c[d >>> 16 & 255] << 8 | c[d >>> 24 & 255]
        }
        ,
        a.interleave2 = function(d, l) {
            return d &= 65535,
            d = (d | d << 8) & 16711935,
            d = (d | d << 4) & 252645135,
            d = (d | d << 2) & 858993459,
            d = (d | d << 1) & 1431655765,
            l &= 65535,
            l = (l | l << 8) & 16711935,
            l = (l | l << 4) & 252645135,
            l = (l | l << 2) & 858993459,
            l = (l | l << 1) & 1431655765,
            d | l << 1
        }
        ,
        a.deinterleave2 = function(d, l) {
            return d = d >>> l & 1431655765,
            d = (d | d >>> 1) & 858993459,
            d = (d | d >>> 2) & 252645135,
            d = (d | d >>> 4) & 16711935,
            d = (d | d >>> 16) & 65535,
            d << 16 >> 16
        }
        ,
        a.interleave3 = function(d, l, u) {
            return d &= 1023,
            d = (d | d << 16) & 4278190335,
            d = (d | d << 8) & 251719695,
            d = (d | d << 4) & 3272356035,
            d = (d | d << 2) & 1227133513,
            l &= 1023,
            l = (l | l << 16) & 4278190335,
            l = (l | l << 8) & 251719695,
            l = (l | l << 4) & 3272356035,
            l = (l | l << 2) & 1227133513,
            d |= l << 1,
            u &= 1023,
            u = (u | u << 16) & 4278190335,
            u = (u | u << 8) & 251719695,
            u = (u | u << 4) & 3272356035,
            u = (u | u << 2) & 1227133513,
            d | u << 2
        }
        ,
        a.deinterleave3 = function(d, l) {
            return d = d >>> l & 1227133513,
            d = (d | d >>> 2) & 3272356035,
            d = (d | d >>> 4) & 251719695,
            d = (d | d >>> 8) & 4278190335,
            d = (d | d >>> 16) & 1023,
            d << 22 >> 22
        }
        ,
        a.nextCombination = function(d) {
            var l = d | d - 1;
            return l + 1 | (~l & -~l) - 1 >>> n(d) + 1
        }
    }
})
  , require_pool = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/utils/pool.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.alloc = c,
        a.free = d,
        a.cloneU8 = l,
        a.clearMemoryPool = u;
        var e = require_twiddle()
          , n = new Array(32);
        for (let m = 0; m < 32; ++m)
            n[m] = [];
        function c(m) {
            const b = (0,
            e.nextPow2)(m)
              , _ = n[(0,
            e.log2)(b)].pop();
            return _ || new Uint8Array(b).buffer
        }
        function d(m) {
            n[(0,
            e.log2)(m.byteLength)].push(m)
        }
        function l(m) {
            const b = (0,
            e.nextPow2)(m.length)
              , _ = n[(0,
            e.log2)(b)].pop();
            if (_) {
                const T = new Uint8Array(_);
                return T.set(m),
                T
            } else
                return new Uint8Array(m)
        }
        function u() {
            for (let m = 0; m < n.length; ++m)
                n[m].length = 0
        }
    }
})
  , require_rle_compress = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/utils/rle-compress.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.compress = n,
        a.decompress = d,
        a.sectionDecompress = l,
        a.old_decompress = u;
        function e(m, b, v) {
            b && (m.grow(10),
            m.writeVarint(b - 1),
            m.writeVarint(v))
        }
        function n(m, b) {
            const {data: v, shape: [_,T,C], stride: [K,I,O], offset: q} = m;
            let k = -1
              , V = 0
              , $ = q;
            const Y = K
              , Z = I - K * _
              , H = O - I * T;
            for (let J = 0; J < C; ++J) {
                for (let ae = 0; ae < T; ++ae) {
                    for (let re = 0; re < _; ++re) {
                        const z = v[$];
                        z !== k && (e(b, V, k),
                        V = 0,
                        k = z),
                        V += 1,
                        $ += Y
                    }
                    $ += Z
                }
                $ += H
            }
            return e(b, V, k),
            !0
        }
        function c(m, b, v) {
            for (let _ = 0; _ < v; ) {
                const T = m.readVarint() + 1
                  , C = m.readVarint();
                for (let K = 0; K < T; ++K)
                    b[_++] = C
            }
            return !0
        }
        function d(m, b) {
            const {data: v, shape: [_,T,C], stride: [K,I,O], offset: q} = b;
            let k = -1
              , V = 0;
            if (K === 1 && I === _ && O === _ * T && q === 0)
                return c(m, v, _ * T * C);
            let $ = q;
            const Y = K
              , Z = I - K * _
              , H = O - I * T;
            for (let J = 0; J < C; ++J) {
                for (let ae = 0; ae < T; ++ae) {
                    for (let re = 0; re < _; ++re)
                        V <= 0 && (V = m.readVarint() + 1,
                        k = m.readVarint()),
                        v[$] = k,
                        V -= 1,
                        $ += Y;
                    $ += Z
                }
                $ += H
            }
            return V === 0
        }
        function l(m, b, v, _) {
            const {data: T, stride: [C,K,I], offset: O} = b
              , q = m.length;
            let k = -1
              , V = 0
              , $ = 0;
            const Y = _[0] - v[0] + 1
              , Z = _[1] - v[1] + 1
              , H = C
              , J = K - C * Y
              , ae = I - K * Z;
            let re = C * v[0] + K * v[1] + I * v[2] + O;
            for (let z = v[2]; z <= _[2]; z++) {
                for (let B = v[1]; B <= _[1]; B++) {
                    for (let f = v[0]; f <= _[0]; f++) {
                        if (V <= 0) {
                            if ($ >= q)
                                return !1;
                            const y = m[$++];
                            if (y < 255)
                                V = y;
                            else {
                                if ($ + 1 >= q)
                                    return !1;
                                V = (m[$] << 8) + m[$ + 1],
                                $ += 2
                            }
                            if ($ >= q)
                                return !1;
                            const X = m[$++];
                            if (X < 255)
                                k = X;
                            else {
                                if ($ + 1 >= q)
                                    return !1;
                                k = (m[$] << 8) + m[$ + 1],
                                $ += 2
                            }
                        }
                        T[re] = k,
                        V -= 1,
                        re += H
                    }
                    re += J
                }
                re += ae
            }
            return $ === m.length && V === 0
        }
        function u(m, b) {
            return l(m, b, [0, 0, 0], b.shape.map(v => v - 1))
        }
    }
})
  , require_voxel = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/utils/voxel.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.VoxelView = void 0,
        a.getBoxBoundary = m,
        a.allocVoxels = b,
        a.freeVoxels = v,
        a.cloneVoxels = _,
        a.storeVoxels = T,
        a.restoreVoxels = C,
        a.flipVoxels = K,
        a.isEmptyVoxels = k;
        var e = require_cjs()
          , n = require_helper()
          , c = require_pool()
          , d = require_rle_compress()
          , l = new Uint16Array
          , u = class El {
            constructor($, Y, Z, H, J, ae, re) {
                this.getVoxelByPtr = z => {
                    if (!this.dataStart || !this.dataEnd || !this.dataStride)
                        return this.data[z];
                    const B = Math.floor(z / this.stride[2])
                      , f = Math.floor(z % this.stride[2] / this.stride[1])
                      , y = z % this.stride[1];
                    return this.contains(y, f, B, this.dataStart, this.dataEnd) ? this.data[this.dataStride[0] * (y - this.dataStart[0]) + this.dataStride[1] * (f - this.dataStart[1]) + this.dataStride[2] * (B - this.dataStart[2])] : 0
                }
                ,
                this.setVoxelByPtr = (z, B) => {
                    if (!this.dataStart || !this.dataEnd || !this.dataStride)
                        return this.data[z] = B;
                    const f = Math.floor(z / this.stride[2])
                      , y = Math.floor(z % this.stride[2] / this.stride[1])
                      , X = z % this.stride[1];
                    return this.contains(X, y, f, this.dataStart, this.dataEnd) ? this.data[this.dataStride[0] * (X - this.dataStart[0]) + this.dataStride[1] * (y - this.dataStart[1]) + this.dataStride[2] * (f - this.dataStart[2])] = B : 0
                }
                ,
                this.data = $,
                this.shape = Y,
                this.stride = Z,
                this.offset = H | 0,
                this.dataStart = J,
                this.dataEnd = ae,
                this.dataStride = re
            }
            getVoxel($, Y, Z) {
                return this.getVoxelByPtr(this.index($, Y, Z))
            }
            getVoxels() {
                const $ = [];
                return (0,
                n.traverseVoxels)(this, [0, 0, 0], this.shape.map(Y => Y - 1), (Y, Z, H, J) => {
                    J != 0 && $.push([Y, Z, H])
                }
                ),
                $
            }
            getDimension() {
                return e.vec3.add(e.vec3.clone(this.shape), this.shape, [-1, -1, -1])
            }
            index($, Y, Z) {
                return this.stride[0] * $ + this.stride[1] * Y + this.stride[2] * Z + this.offset
            }
            contains($, Y, Z, H, J) {
                return $ >= H[0] && $ < J[0] && Y >= H[1] && Y < J[1] && Z >= H[2] && Z < J[2]
            }
            setVoxel($, Y, Z, H) {
                return this.setVoxelByPtr(this.index($, Y, Z), H)
            }
            setVoxelRotate($, Y, Z, H) {
                const J = this.getVoxel($, Y, Z) | H << 14;
                return this.data[this.stride[0] * $ + this.stride[1] * Y + this.stride[2] * Z + this.offset] = J
            }
            slice($, Y) {
                return new El(this.data,[Y[0] - $[0], Y[1] - $[1], Y[2] - $[2]],this.stride,this.offset + this.stride[0] * $[0] + this.stride[1] * $[1] + this.stride[2] * $[2],this.dataStart,this.dataEnd,this.dataStride)
            }
            transpose($, Y, Z) {
                return new El(this.data,[this.shape[$], this.shape[Y], this.shape[Z]],[this.stride[$], this.stride[Y], this.stride[Z]],this.offset)
            }
            step($, Y, Z) {
                return new El(this.data,[Math.floor(this.shape[0] / $), Math.floor(this.shape[1] / Y), Math.floor(this.shape[2] / Z)],[this.stride[0] * $, this.stride[1] * Y, this.stride[2] * Z],this.offset)
            }
            copy($) {
                const [Y,Z,H] = this.shape
                  , [J,ae,re] = $.shape
                  , z = Math.min(Y, J)
                  , B = Math.min(Z, ae)
                  , f = Math.min(H, re)
                  , y = this.data
                  , [X,N,R] = this.stride;
                let D = this.offset;
                const F = X
                  , M = N - z * X
                  , E = R - B * N
                  , U = $.data
                  , [Q,ie,te] = $.stride;
                let oe = $.offset;
                const he = Q
                  , j = ie - z * Q
                  , se = te - B * ie;
                for (let ue = 0; ue < f; ++ue) {
                    for (let _e = 0; _e < B; ++_e) {
                        for (let Xe = 0; Xe < z; ++Xe)
                            y[D] = U[oe],
                            D += F,
                            oe += he;
                        D += M,
                        oe += j
                    }
                    D += E,
                    oe += se
                }
            }
            fill($) {
                const [Y,Z,H] = this.shape
                  , J = this.data
                  , [ae,re,z] = this.stride;
                let B = this.offset;
                const f = ae
                  , y = re - Y * ae
                  , X = z - Z * re;
                for (let N = 0; N < H; ++N) {
                    for (let R = 0; R < Z; ++R) {
                        for (let D = 0; D < Y; ++D)
                            J[B] = $,
                            B += f;
                        B += y
                    }
                    B += X
                }
            }
            equals($) {
                if (this.shape[0] !== $.shape[0] || this.shape[1] !== $.shape[1] || this.shape[2] !== $.shape[2])
                    return !1;
                const [Y,Z,H] = this.shape
                  , J = this.data
                  , [ae,re,z] = this.stride;
                let B = this.offset;
                const f = ae
                  , y = re - Y * ae
                  , X = z - Z * re
                  , N = $.data
                  , [R,D,F] = $.stride;
                let M = $.offset;
                const E = R
                  , U = D - Y * R
                  , Q = F - Z * D;
                for (let ie = 0; ie < H; ++ie) {
                    for (let te = 0; te < Z; ++te) {
                        for (let oe = 0; oe < Y; ++oe) {
                            if (J[B] !== N[M])
                                return !1;
                            B += f,
                            M += E
                        }
                        B += y,
                        M += U
                    }
                    B += X,
                    M += Q
                }
                return !0
            }
            clear() {
                for (let $ = 0; $ < this.data.length; $++)
                    this.data[$] = 0
            }
            destroy() {
                this.data = l
            }
            getStartPosition() {
                let $ = this.data.findIndex(z => z !== 0);
                if ($ < 0)
                    return;
                const [Y,Z,H] = this.stride;
                let J = 0
                  , ae = 0
                  , re = 0;
                return re = Math.floor($ / H),
                $ -= re * H,
                ae = Math.floor($ / Z),
                $ -= ae * Z,
                J = Math.floor($ / Y),
                [J, ae, re]
            }
        }
        ;
        a.VoxelView = u;
        function m(V) {
            const $ = [1 / 0, 1 / 0, 1 / 0]
              , Y = [-1 / 0, -1 / 0, -1 / 0];
            return (0,
            n.traverseVoxels)(V, [0, 0, 0], V.getDimension(), (Z, H, J, ae) => {
                ae && (e.vec3.min($, $, [Z, H, J]),
                e.vec3.max(Y, Y, [Z, H, J]))
            }
            ),
            {
                start: $,
                end: Y
            }
        }
        function b(V, $, Y, Z, H) {
            let J = V * $ * Y, ae;
            if (Z && H) {
                const re = H[0] - Z[0]
                  , z = H[1] - Z[1]
                  , B = H[2] - Z[2];
                J = re * z * B,
                ae = [1, re, re * z]
            }
            return new u(new Uint16Array((0,
            c.alloc)(J * 2)),[V, $, Y],[1, V, V * $],0,Z,H,ae)
        }
        function v(V) {
            (0,
            c.free)(V.data.buffer)
        }
        function _(V) {
            const $ = b(V.shape[0], V.shape[1], V.shape[2]);
            return $.copy(V),
            $
        }
        function T(V, $, Y) {
            const [Z,H,J] = V.shape;
            $.writeInt32(Z),
            $.writeInt32(H),
            $.writeInt32(J),
            !Y && (0,
            d.compress)(V, $)
        }
        function C(V) {
            const $ = V.readInt32()
              , Y = V.readInt32()
              , Z = V.readInt32()
              , H = V.buffer.buffer.byteLength <= V.offset;
            let J;
            return H ? J = (0,
            n.allocEmptyVoxels)($, Y, Z) : (J = b($, Y, Z),
            (0,
            d.decompress)(V, J)),
            {
                voxels: J,
                isEmpty: H
            }
        }
        function K(V, $, Y) {
            const Z = Y || m(V);
            switch ($) {
            case "X":
                I(V, Z);
                break;
            case "Y":
                O(V, Z);
                break;
            case "Z":
                q(V, Z)
            }
        }
        function I(V, $) {
            const {start: Y, end: Z} = $
              , H = Y[0] + Z[0];
            (0,
            n.traverseVoxels)(V, Y, [Math.floor(H / 2), Z[1], Z[2]], (J, ae, re, z) => {
                const B = V.getVoxel(H - J, ae, re);
                V.setVoxel(J, ae, re, B),
                V.setVoxel(H - J, ae, re, z)
            }
            )
        }
        function O(V, $) {
            const {start: Y, end: Z} = $
              , H = Y[1] + Z[1];
            (0,
            n.traverseVoxels)(V, Y, [Z[0], Math.floor(H / 2), Z[2]], (J, ae, re, z) => {
                const B = V.getVoxel(J, H - ae, re);
                V.setVoxel(J, ae, re, B),
                V.setVoxel(J, H - ae, re, z)
            }
            )
        }
        function q(V, $) {
            const {start: Y, end: Z} = $
              , H = Y[2] + Z[2];
            (0,
            n.traverseVoxels)(V, Y, [Z[0], Z[1], Math.floor(H / 2)], (J, ae, re, z) => {
                const B = V.getVoxel(J, ae, H - re);
                V.setVoxel(J, ae, re, B),
                V.setVoxel(J, ae, H - re, z)
            }
            )
        }
        function k(V) {
            return V.data.some($ => $ !== 0)
        }
    }
})
  , require_codec = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/stream/codec.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.encode = n,
        a.decode = d;
        function e(l) {
            let u;
            const m = l.length;
            let b;
            const v = [];
            for (let _ = 0; _ < m; ++_) {
                if (u = l.charCodeAt(_),
                u > 55295 && u < 57344) {
                    if (!b) {
                        if (u > 56319) {
                            v.push(239, 191, 189);
                            continue
                        } else if (_ + 1 === m) {
                            v.push(239, 191, 189);
                            continue
                        }
                        b = u;
                        continue
                    }
                    if (u < 56320) {
                        v.push(239, 191, 189),
                        b = u;
                        continue
                    }
                    u = (b - 55296 << 10 | u - 56320) + 65536
                } else
                    b && v.push(239, 191, 189);
                if (b = void 0,
                u < 128)
                    v.push(u);
                else if (u < 2048)
                    v.push(u >> 6 | 192, u & 63 | 128);
                else if (u < 65536)
                    v.push(u >> 12 | 224, u >> 6 & 63 | 128, u & 63 | 128);
                else if (u < 1114112)
                    v.push(u >> 18 | 240, u >> 12 & 63 | 128, u >> 6 & 63 | 128, u & 63 | 128);
                else
                    throw new Error("mudb/stream: invalid code point")
            }
            return v
        }
        function n(l) {
            return new Uint8Array(e(l))
        }
        function c(l) {
            const m = l.length;
            if (m <= 4096)
                return String.fromCharCode.apply(String, l);
            let b = ""
              , v = 0;
            for (; v < m; )
                b += String.fromCharCode.apply(String, l.slice(v, v += 4096));
            return b
        }
        function d(l) {
            const {byteLength: u} = l
              , m = [];
            let b = 0;
            for (; b < u; ) {
                const v = l[b];
                let _, T = v > 239 ? 4 : v > 223 ? 3 : v > 191 ? 2 : 1;
                if (b + T <= u) {
                    let C, K, I, O;
                    switch (T) {
                    case 1:
                        v < 128 && (_ = v);
                        break;
                    case 2:
                        C = l[b + 1],
                        (C & 192) === 128 && (O = (v & 31) << 6 | C & 63,
                        O > 127 && (_ = O));
                        break;
                    case 3:
                        C = l[b + 1],
                        K = l[b + 2],
                        (C & 192) === 128 && (K & 192) === 128 && (O = (v & 15) << 12 | (C & 63) << 6 | K & 63,
                        O > 2047 && (O < 55296 || O > 57343) && (_ = O));
                        break;
                    case 4:
                        C = l[b + 1],
                        K = l[b + 2],
                        I = l[b + 3],
                        (C & 192) === 128 && (K & 192) === 128 && (I & 192) === 128 && (O = (v & 15) << 18 | (C & 63) << 12 | (K & 63) << 6 | I & 63,
                        O > 65535 && O < 1114112 && (_ = O))
                    }
                }
                _ == null ? (_ = 65533,
                T = 1) : _ > 65535 && (_ -= 65536,
                m.push(_ >>> 10 & 1023 | 55296),
                _ = 56320 | _ & 1023),
                m.push(_),
                b += T
            }
            return c(m)
        }
    }
})
  , require_stream = __commonJS({
    "src/utils/vcode-gltf-standalone/vendor/@box/mudb/stream/index.js"(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        a.MuReadStream = a.MuWriteStream = a.MuBuffer = a.decodeUTF8 = a.encodeUTF8 = void 0,
        a.allocBuffer = l,
        a.freeBuffer = u;
        var e = typeof self == "object" && self.Object == Object && self || typeof global$1 == "object" && global$1.Object == Object && global$1;
        if (typeof e == "object" && "TextEncoder"in e) {
            const _ = new TextEncoder;
            a.encodeUTF8 = C => _.encode(C);
            const T = new TextDecoder;
            a.decodeUTF8 = C => T.decode(C)
        } else {
            const _ = require_codec();
            a.encodeUTF8 = _.encode,
            a.decodeUTF8 = _.decode
        }
        function n(_) {
            let T = _ - 1
              , C = T > 65535 ? 16 : 0;
            T >>>= C;
            let K = T > 255 ? 8 : 0;
            return T >>>= K,
            C |= K,
            K = T > 15 ? 4 : 0,
            T >>>= K,
            C |= K,
            K = T > 3 ? 2 : 0,
            T >>>= K,
            C |= K,
            (C | T >> 1) + 1
        }
        var c = class {
            constructor(_) {
                this.buffer = _,
                this.dataView = new DataView(_),
                this.uint8 = new Uint8Array(_)
            }
        }
        ;
        a.MuBuffer = c;
        var d = new Array(31);
        for (let _ = 0; _ < 31; ++_)
            d[_] = [];
        function l(_) {
            if (_ > 1073741824 || _ < 0)
                throw new RangeError(`size out of range: ${_}`);
            _ = Math.max(2, _ | 0);
            const T = n(_);
            return d[T].pop() || new c(new ArrayBuffer(1 << T))
        }
        function u(_) {
            _.uint8.length > 0 && d[n(_.uint8.length)].push(_)
        }
        var m = !0
          , b = class {
            constructor(_) {
                this.buffer = l(_),
                this.offset = 0
            }
            bytes() {
                return this.buffer.uint8.subarray(0, this.offset)
            }
            destroy() {
                u(this.buffer)
            }
            grow(_) {
                const T = this.offset + _
                  , C = this.buffer.uint8;
                if (C.length < T) {
                    const K = l(T);
                    K.uint8.set(C),
                    u(this.buffer),
                    this.buffer = K
                }
            }
            writeInt8(_) {
                this.buffer.dataView.setInt8(this.offset, _),
                this.offset += 1
            }
            writeInt16(_) {
                this.buffer.dataView.setInt16(this.offset, _, m),
                this.offset += 2
            }
            writeInt32(_) {
                this.buffer.dataView.setInt32(this.offset, _, m),
                this.offset += 4
            }
            writeUint8(_) {
                this.buffer.dataView.setUint8(this.offset, _),
                this.offset += 1
            }
            writeUint16(_) {
                this.buffer.dataView.setUint16(this.offset, _, m),
                this.offset += 2
            }
            writeUint32(_) {
                this.buffer.dataView.setUint32(this.offset, _, m),
                this.offset += 4
            }
            writeFloat32(_) {
                this.buffer.dataView.setFloat32(this.offset, _, m),
                this.offset += 4
            }
            writeFloat64(_) {
                this.buffer.dataView.setFloat64(this.offset, _, m),
                this.offset += 8
            }
            writeVarint(_) {
                const T = _ >>> 0
                  , C = this.buffer.uint8;
                let K = this.offset;
                T < 128 ? C[K++] = T : T < 16384 ? (C[K++] = T & 127 | 128,
                C[K++] = T >>> 7) : T < 2097152 ? (C[K++] = T & 127 | 128,
                C[K++] = T >> 7 & 127 | 128,
                C[K++] = T >>> 14) : T < 268435456 ? (C[K++] = T & 127 | 128,
                C[K++] = T >> 7 & 127 | 128,
                C[K++] = T >> 14 & 127 | 128,
                C[K++] = T >>> 21) : (C[K++] = T & 127 | 128,
                C[K++] = T >> 7 & 127 | 128,
                C[K++] = T >> 14 & 127 | 128,
                C[K++] = T >> 21 & 127 | 128,
                C[K++] = T >>> 28),
                this.offset = K
            }
            writeASCII(_) {
                const T = this.buffer.uint8;
                let C = this.offset;
                for (let K = 0; K < _.length; ++K)
                    T[C++] = _.charCodeAt(K);
                this.offset = C
            }
            writeString(_) {
                const T = (0,
                a.encodeUTF8)(_);
                this.grow(5 + T.length),
                this.writeVarint(T.length),
                this.buffer.uint8.set(T, this.offset),
                this.offset += T.length
            }
            writeUint8At(_, T) {
                this.buffer.dataView.setUint8(_, T)
            }
            writeUint32At(_, T) {
                this.buffer.dataView.setUint32(_, T, m)
            }
        }
        ;
        a.MuWriteStream = b;
        var v = class {
            constructor(_) {
                this.buffer = new c(_.buffer),
                this.offset = _.byteOffset,
                this.length = _.byteLength + _.byteOffset
            }
            bytes() {
                return this.buffer.uint8.subarray(this.offset, this.length)
            }
            checkBounds() {
                if (this.offset > this.length)
                    throw new Error("out of bounds")
            }
            readInt8() {
                const _ = this.offset;
                return this.offset += 1,
                this.checkBounds(),
                this.buffer.dataView.getInt8(_)
            }
            readInt16() {
                const _ = this.offset;
                return this.offset += 2,
                this.checkBounds(),
                this.buffer.dataView.getInt16(_, m)
            }
            readInt32() {
                const _ = this.offset;
                return this.offset += 4,
                this.checkBounds(),
                this.buffer.dataView.getInt32(_, m)
            }
            readUint8() {
                const _ = this.offset;
                return this.offset += 1,
                this.checkBounds(),
                this.buffer.dataView.getUint8(_)
            }
            readUint16() {
                const _ = this.offset;
                return this.offset += 2,
                this.checkBounds(),
                this.buffer.dataView.getUint16(_, m)
            }
            readUint32() {
                const _ = this.offset;
                return this.offset += 4,
                this.checkBounds(),
                this.buffer.dataView.getUint32(_, m)
            }
            readFloat32() {
                const _ = this.offset;
                return this.offset += 4,
                this.checkBounds(),
                this.buffer.dataView.getFloat32(_, m)
            }
            readFloat64() {
                const _ = this.offset;
                return this.offset += 8,
                this.checkBounds(),
                this.buffer.dataView.getFloat64(_, m)
            }
            readVarint() {
                const _ = this.buffer.uint8;
                let T = this.offset;
                const C = _[T++];
                if (C < 128)
                    return this.offset = T,
                    this.checkBounds(),
                    C;
                const K = _[T++];
                if (K < 128)
                    return this.offset = T,
                    this.checkBounds(),
                    C & 127 | K << 7;
                const I = _[T++];
                if (I < 128)
                    return this.offset = T,
                    this.checkBounds(),
                    C & 127 | (K & 127) << 7 | I << 14;
                const O = _[T++];
                if (O < 128)
                    return this.offset = T,
                    this.checkBounds(),
                    C & 127 | (K & 127) << 7 | (I & 127) << 14 | O << 21;
                const q = _[T++];
                return this.offset = T,
                this.checkBounds(),
                (C & 127) + ((K & 127) << 7) + ((I & 127) << 14) + ((O & 127) << 21) + q * (1 << 28)
            }
            readASCII(_) {
                const T = this.offset;
                this.offset += _,
                this.checkBounds();
                let C = "";
                for (let K = T; K < this.offset; ++K)
                    C += String.fromCharCode(this.buffer.uint8[K]);
                return C
            }
            readString() {
                const _ = this.readVarint()
                  , T = this.offset;
                this.offset += _,
                this.checkBounds();
                const C = this.buffer.uint8.subarray(T, this.offset);
                return (0,
                a.decodeUTF8)(C)
            }
            readUint8At(_) {
                return this.buffer.dataView.getUint8(_)
            }
        }
        ;
        a.MuReadStream = v
    }
})
  , glMatrix = __toESM(require_cjs())
  , voxaProject = __toESM(require_voxa_project())
  , mesherModule = __toESM(require_mesher())
  , voxelModule = __toESM(require_voxel())
  , mudbStream = __toESM(require_stream())
  , {mat3, mat4, quat, vec3} = glMatrix
  , {migrateProject, ProjectNodeType, VoxelDimension} = voxaProject
  , {Mesher, textureToMeshTexture, unpackTextureData, unpackMeshData} = mesherModule
  , {restoreVoxels, cloneVoxels, flipVoxels, getBoxBoundary} = voxelModule
  , {MuReadStream} = mudbStream
  , ENGINE_BASE_URL = "https://assets.box3.fun/engine/m/"
  , ROOT_ID = "ROOT"
  , ROOT_SKIN_ID = "ROOT_SKIN"
  , ROOT_BONE_ID = "ROOT_BONE"
  , DEFAULT_FLIP = [0, 0, 0]
  , INDEX_TO_AXIS = ["X", "Y", "Z"]
  , TEMP_POS = vec3.create()
  , TEMP_VEC3 = vec3.create()
  , TEMP_MAT3 = mat3.create()
  , TEMP_MAT4 = mat4.create()
  , BOX_POINTS = Array.from({
    length: 8
}, () => vec3.create());
function normalizeInput(a) {
    const e = String(a || "").trim();
    if (!e)
        throw new Error("请输入有效的 v 口令或 hash。");
    const n = e.match(/([A-Za-z0-9_-]{20,})/g);
    if (!n || !n.length)
        throw new Error("未能从输入中提取 hash。");
    return n[n.length - 1]
}
async function fetchProjectBytes(a) {
    const e = await fetch(`${ENGINE_BASE_URL}${a}`, {
        cache: "no-store"
    });
    if (!e.ok)
        throw new Error(`下载失败: ${e.status} ${e.statusText}`);
    return new Uint8Array(await e.arrayBuffer())
}
function buildPalette(a) {
    var l, u;
    const e = Array.isArray((l = a.palette) == null ? void 0 : l.items) ? a.palette.items : []
      , n = e.reduce( (m, b) => Math.max(m, (b == null ? void 0 : b.id) || 0), 0)
      , c = Array.from({
        length: n + 1
    }, () => [0, 0, 0])
      , d = Array.from({
        length: n + 1
    }, () => 0);
    for (const m of e) {
        const b = (m == null ? void 0 : m.id) || 0;
        c[b] = m && m.rgb ? Array.from(m.rgb) : [0, 0, 0],
        d[b] = Number.isFinite((u = m == null ? void 0 : m.material) == null ? void 0 : u.emissive) ? m.material.emissive : 0
    }
    return {
        paletteList: c,
        emissiveList: d
    }
}
function serializeVec3(a) {
    return [a[0], a[1], a[2]]
}
function serializeQuat(a) {
    return [a[0], a[1], a[2], a[3]]
}
function voxelShapeToObjSize(a, e) {
    if (e === VoxelDimension.XYZ)
        return [a[0], a[1], a[2]];
    const n = [a[0], a[1], a[2]];
    return n[e] = 0,
    n
}
function mat4SetFromMat3(a, e) {
    return a[0] = e[0],
    a[1] = e[1],
    a[2] = e[2],
    a[3] = 0,
    a[4] = e[3],
    a[5] = e[4],
    a[6] = e[5],
    a[7] = 0,
    a[8] = e[6],
    a[9] = e[7],
    a[10] = e[8],
    a[11] = 0,
    a[12] = 0,
    a[13] = 0,
    a[14] = 0,
    a[15] = 1,
    a
}
function everyNode(a, e, n) {
    const c = [a];
    for (; c.length > 0; ) {
        const d = c.shift()
          , l = d ? e[d] : void 0;
        if (!l)
            continue;
        if (!n(l))
            break;
        if (!(!l.childrenIds || l.childrenIds.length === 0))
            for (let m = l.childrenIds.length - 1; m >= 0; m--)
                c.unshift(l.childrenIds[m])
    }
}
function isRootNode(a) {
    return [ROOT_ID, ROOT_SKIN_ID, ROOT_BONE_ID].includes(a)
}
function isSkinPart(a) {
    return a && a.modelUnitType === "skinPart"
}
function getFlipKey(a) {
    return a.join()
}
function getMeshId(a, e=DEFAULT_FLIP) {
    return `${a}-${getFlipKey(e)}`
}
function isEmptyBounds(a) {
    return vec3.exactEquals(a, [0, 0, 0])
}
function clipAlpha(a) {
    const e = Number.isFinite(a) ? a : 1;
    return Math.max(0, Math.min(255, Math.round(e * 255)))
}
var Box3 = class {
    constructor(a=vec3.fromValues(1 / 0, 1 / 0, 1 / 0), e=vec3.fromValues(-1 / 0, -1 / 0, -1 / 0)) {
        this.min = a,
        this.max = e
    }
    makeEmpty() {
        return this.min[0] = this.min[1] = this.min[2] = 1 / 0,
        this.max[0] = this.max[1] = this.max[2] = -1 / 0,
        this
    }
    isEmpty() {
        return this.max[0] < this.min[0] || this.max[1] < this.min[1] || this.max[2] < this.min[2]
    }
    union(a) {
        return vec3.min(this.min, this.min, a.min),
        vec3.max(this.max, this.max, a.max),
        this
    }
    getCenter(a) {
        return this.isEmpty() ? vec3.set(a, 0, 0, 0) : vec3.scale(a, vec3.add(a, this.min, this.max), .5)
    }
    setFromPoints(a) {
        this.makeEmpty();
        for (const e of a)
            vec3.min(this.min, this.min, e),
            vec3.max(this.max, this.max, e);
        return this
    }
    applyMatrix4(a) {
        return this.isEmpty() ? this : (vec3.transformMat4(BOX_POINTS[0], vec3.set(BOX_POINTS[0], this.min[0], this.min[1], this.min[2]), a),
        vec3.transformMat4(BOX_POINTS[1], vec3.set(BOX_POINTS[1], this.min[0], this.min[1], this.max[2]), a),
        vec3.transformMat4(BOX_POINTS[2], vec3.set(BOX_POINTS[2], this.min[0], this.max[1], this.min[2]), a),
        vec3.transformMat4(BOX_POINTS[3], vec3.set(BOX_POINTS[3], this.min[0], this.max[1], this.max[2]), a),
        vec3.transformMat4(BOX_POINTS[4], vec3.set(BOX_POINTS[4], this.max[0], this.min[1], this.min[2]), a),
        vec3.transformMat4(BOX_POINTS[5], vec3.set(BOX_POINTS[5], this.max[0], this.min[1], this.max[2]), a),
        vec3.transformMat4(BOX_POINTS[6], vec3.set(BOX_POINTS[6], this.max[0], this.max[1], this.min[2]), a),
        vec3.transformMat4(BOX_POINTS[7], vec3.set(BOX_POINTS[7], this.max[0], this.max[1], this.max[2]), a),
        this.setFromPoints(BOX_POINTS))
    }
}
  , Object3D = class {
    constructor(a="") {
        this.uuid = a,
        this.parent = void 0,
        this.children = [],
        this.position = vec3.create(),
        this.quaternion = quat.create(),
        this.scale = vec3.fromValues(1, 1, 1),
        this.pivot = vec3.create(),
        this.parentScaleMat3 = mat3.create(),
        this.rotateAngles = vec3.create(),
        this.worldRotateAngles = vec3.create(),
        this.quaternionWorld = quat.create(),
        this.matrix = mat4.create(),
        this.matrixWorld = mat4.create(),
        this.matrixAutoUpdate = !0,
        this.matrixWorldNeedsUpdate = !1
    }
    add(a) {
        return a.parent !== void 0 && a.parent.remove(a),
        a.parent = this,
        this.children.push(a),
        this
    }
    remove(a) {
        const e = this.children.indexOf(a);
        return e !== -1 && (a.parent = void 0,
        this.children.splice(e, 1)),
        this
    }
    updateMatrix() {
        this.getRTSMatrix(this.matrix),
        mat4SetFromMat3(TEMP_MAT4, this.parentScaleMat3),
        mat4.mul(this.matrix, TEMP_MAT4, this.matrix),
        this.matrixWorldNeedsUpdate = !0
    }
    getRTSMatrix(a) {
        return this.getTransformedPivot(TEMP_POS),
        vec3.add(TEMP_POS, TEMP_POS, this.position),
        mat4.fromRotationTranslationScale(a, this.quaternion, TEMP_POS, this.scale)
    }
    updateMatrixWorld(a=!1) {
        this.matrixAutoUpdate && this.updateMatrix(),
        (this.matrixWorldNeedsUpdate || a) && (this.parent === void 0 ? (mat4.copy(this.matrixWorld, this.matrix),
        quat.copy(this.quaternionWorld, this.quaternion)) : (mat4.mul(this.matrixWorld, this.parent.matrixWorld, this.matrix),
        quat.mul(this.quaternionWorld, this.parent.quaternionWorld, this.quaternion)),
        this.matrixWorldNeedsUpdate = !1,
        a = !0);
        for (let e = 0; e < this.children.length; e++)
            this.children[e].updateMatrixWorld(a)
    }
    updateWorldMatrix(a, e) {
        if (a === !0 && this.parent !== void 0 && this.parent.updateWorldMatrix(!0, !1),
        this.matrixAutoUpdate && this.updateMatrix(),
        this.parent === void 0 ? (mat4.copy(this.matrixWorld, this.matrix),
        quat.copy(this.quaternionWorld, this.quaternion)) : (mat4.mul(this.matrixWorld, this.parent.matrixWorld, this.matrix),
        quat.mul(this.quaternionWorld, this.parent.quaternionWorld, this.quaternion)),
        e === !0)
            for (let n = 0; n < this.children.length; n++)
                this.children[n].updateWorldMatrix(!1, !0)
    }
    getTransformedPivot(a) {
        return vec3.mul(a, this.scale, this.pivot),
        vec3.transformQuat(a, a, this.quaternion)
    }
}
  , Group = class extends Object3D {
}
  , Bone = class extends Object3D {
}
  , SkinPart = class extends Object3D {
    constructor(a) {
        super(a),
        this.alpha = 1,
        this.modelUnitType = "skinPart"
    }
}
  , BoneNode = class extends Bone {
    constructor(a) {
        super(a),
        this.alpha = 1,
        this.modelUnitType = "bone"
    }
}
  , VoxelManager = class {
    constructor() {
        this.map = new Map
    }
    getBounds(a, e) {
        const n = [0, 0, 0]
          , c = [0, 0, 0];
        return e[0] < a[0] || e[1] < a[1] || e[2] < a[2] ? {
            bounds: n,
            boundaryStart: c
        } : (vec3.sub(n, e, a),
        vec3.copy(c, a),
        {
            bounds: n,
            boundaryStart: c
        })
    }
    loadVoxelData(a) {
        const {id: e, dimension: n, encodedView: c} = a
          , d = new MuReadStream(new Uint8Array(c))
          , {isEmpty: l, voxels: u} = restoreVoxels(d);
        let m = [0, 0, 0]
          , b = [0, 0, 0];
        if (!l) {
            const v = getBoxBoundary(u)
              , _ = this.getBounds(v.start, v.end);
            m = _.boundaryStart,
            b = _.bounds
        }
        return {
            id: e,
            voxelView: u,
            dimension: n,
            meshes: {
                [getFlipKey(DEFAULT_FLIP)]: {
                    bounds: b,
                    boundaryStart: m,
                    flip: [...DEFAULT_FLIP]
                }
            }
        }
    }
    getFlippedVoxelView(a, e) {
        let n = a;
        return vec3.exactEquals(e, [0, 0, 0]) || (n = cloneVoxels(a),
        e.forEach( (c, d) => {
            c && flipVoxels(n, INDEX_TO_AXIS[d], {
                start: [0, 0, 0],
                end: n.getDimension()
            })
        }
        )),
        n
    }
    getVoxelMesh(a, e=DEFAULT_FLIP) {
        const n = this.map.get(a);
        if (!n)
            return;
        const c = getFlipKey(e);
        if (!n.meshes[c]) {
            const d = getBoxBoundary(this.getFlippedVoxelView(n.voxelView, e))
              , {bounds: l, boundaryStart: u} = this.getBounds(d.start, d.end);
            n.meshes[c] = {
                bounds: l,
                boundaryStart: u,
                flip: [...e]
            }
        }
        return n.meshes[c]
    }
}
  , SkinManager = class {
    constructor(a) {
        this.voxelManager = a,
        this.skin = new Object3D("skin-root"),
        this.map = new Map
    }
    loadSkinPart(a) {
        const e = new SkinPart(a.id);
        return vec3.copy(e.pivot, a.pivot),
        vec3.copy(e.position, a.position),
        quat.copy(e.quaternion, a.quaternion),
        vec3.copy(e.rotateAngles, a.euler),
        vec3.copy(e.scale, a.scale),
        mat3.copy(e.parentScaleMat3, a.parentScaleMat3),
        e.alpha = a.alpha,
        e
    }
    loadGroup(a) {
        const e = new Group(a.id);
        return vec3.copy(e.pivot, a.pivot),
        vec3.copy(e.position, a.position),
        quat.copy(e.quaternion, a.quaternion),
        vec3.copy(e.rotateAngles, a.euler),
        vec3.copy(e.scale, a.scale),
        mat3.copy(e.parentScaleMat3, a.parentScaleMat3),
        e
    }
}
  , BoneManager = class {
    constructor() {
        this.rootBone = new Bone("root-bone"),
        this.map = new Map
    }
    loadBone(a) {
        const e = new BoneNode(a.id);
        return vec3.copy(e.pivot, a.pivot),
        vec3.copy(e.position, a.position),
        quat.copy(e.quaternion, a.quaternion),
        vec3.copy(e.rotateAngles, a.euler),
        vec3.copy(e.scale, a.scale),
        mat3.copy(e.parentScaleMat3, a.parentScaleMat3),
        e.alpha = a.alpha,
        e
    }
}
  , NodeManager = class {
    constructor(a) {
        this.skinManager = new SkinManager(a),
        this.boneManager = new BoneManager
    }
    setModelUnit(a) {
        a.modelUnitType === "bone" ? this.boneManager.map.set(a.uuid, a) : this.skinManager.map.set(a.uuid, a)
    }
    loadObj(a) {
        if (!(a.id === ROOT_BONE_ID || a.id === ROOT_SKIN_ID))
            switch (a.type) {
            case ProjectNodeType.SkinPart:
                return this.skinManager.loadSkinPart(a);
            case ProjectNodeType.Group:
                return this.skinManager.loadGroup(a);
            case ProjectNodeType.Bone:
                return this.boneManager.loadBone(a);
            default:
                return
            }
    }
    getParentOrBoneByNodeId(a, e) {
        const n = e[a];
        if (!(!n || n.type === ProjectNodeType.Root)) {
            if (n.type === ProjectNodeType.Bone)
                return n.parentId ? this.boneManager.map.get(n.parentId) || this.boneManager.rootBone : this.boneManager.rootBone;
            if (n.parentId)
                return this.skinManager.map.get(n.parentId) || this.skinManager.skin;
            if (n.boneId)
                return this.boneManager.map.get(n.boneId)
        }
    }
    getBoneNode(a) {
        return this.boneManager.map.get(a)
    }
    getSkinNode(a) {
        return this.skinManager.map.get(a)
    }
    getAllSkinNodes() {
        return Array.from(this.skinManager.map.values())
    }
}
  , Loader = class {
    constructor(a) {
        this.nodeManager = a
    }
    loadNodesData(a) {
        const e = {};
        return this.loadNodes(e, a),
        e
    }
    loadNodes(a, e) {
        everyNode(ROOT_ID, e, n => (this.loadNode(a, n),
        n.type === ProjectNodeType.Bone && n.skinId && everyNode(n.skinId, e, c => (this.loadNode(a, c),
        !0)),
        !0))
    }
    loadNode(a, e) {
        const n = this.getStoreNode(e);
        if (!n)
            return;
        a[n.id] = n;
        const c = this.nodeManager.loadObj(e)
          , d = this.nodeManager.getParentOrBoneByNodeId(e.id, a);
        !d || !c || (d.add(c),
        this.nodeManager.setModelUnit(c))
    }
    getStoreNode(a) {
        const {id: e, type: n, name: c, childrenIds: d} = a;
        if (n === ProjectNodeType.Root)
            return {
                id: e,
                type: n,
                name: c,
                childrenIds: d
            };
        if (n === ProjectNodeType.Bone) {
            const {parentId: l, skinId: u, alpha: m} = a;
            return {
                id: e,
                type: n,
                name: c,
                parentId: l || void 0,
                childrenIds: d,
                skinId: u || void 0,
                alpha: m
            }
        }
        if (n === ProjectNodeType.Group) {
            const {parentId: l, boneId: u} = a;
            return {
                id: e,
                type: n,
                name: c,
                childrenIds: d,
                parentId: l || void 0,
                boneId: u || void 0
            }
        }
        if (n === ProjectNodeType.SkinPart) {
            const {parentId: l, boneId: u, voxelId: m, alpha: b, flip: v} = a
              , [_,T,C] = v;
            return {
                id: e,
                type: n,
                name: c,
                alpha: b,
                flip: [_, T, C],
                parentId: l || void 0,
                boneId: u || void 0,
                voxelId: m || void 0,
                childrenIds: d
            }
        }
    }
}
  , Exporter = class {
    constructor(a, e) {
        this.nodeManager = a,
        this.hierarchyData = e
    }
    getParentOrBoneId(a) {
        if (a.parentId)
            return a.parentId;
        if (a.type === ProjectNodeType.SkinPart || a.type === ProjectNodeType.Group)
            return a.boneId
    }
    getModelBounds(a, e) {
        const n = (d, l) => {
            const u = this.hierarchyData[l.uuid];
            if (!u || u.type !== ProjectNodeType.SkinPart)
                return;
            const {voxelId: m, flip: b} = u;
            if (!m)
                return;
            const v = a[getMeshId(m, b)];
            if (!v)
                return;
            l.updateWorldMatrix(!1, !1);
            const {newBounds: _, boundaryStart: T} = v
              , C = new Box3;
            vec3.copy(C.min, [0, 0, 0]),
            vec3.copy(C.max, _),
            mat4.translate(TEMP_MAT4, l.matrixWorld, T),
            C.applyMatrix4(TEMP_MAT4),
            d.union(C)
        }
          , c = new Box3;
        return c.makeEmpty(),
        (e || this.nodeManager.getAllSkinNodes()).forEach(d => {
            isSkinPart(d) && n(c, d)
        }
        ),
        c.isEmpty() ? {
            bounds: [0, 0, 0],
            boundsCenter: [0, 0, 0],
            rootPartOffset: [0, 0, 0]
        } : {
            bounds: [c.max[0] - c.min[0], c.max[1] - c.min[1], c.max[2] - c.min[2]],
            boundsCenter: serializeVec3(c.getCenter(TEMP_VEC3)),
            rootPartOffset: serializeVec3(c.min)
        }
    }
    getModelNode(a, e, n) {
        if (isRootNode(a.id))
            return {
                name: a.name || a.id,
                children: [],
                translation: [0, 0, 0],
                rotation: [0, 0, 0, 1],
                scale: [1, 1, 1],
                parentScaleMat3: [1, 0, 0, 0, 1, 0, 0, 0, 1],
                mesh: -1,
                alpha: 255
            };
        const c = a.type === ProjectNodeType.Bone ? this.nodeManager.getBoneNode(a.id) : this.nodeManager.getSkinNode(a.id);
        if (!c)
            return;
        vec3.copy(TEMP_VEC3, c.scale),
        c.getTransformedPivot(TEMP_POS),
        vec3.add(TEMP_POS, TEMP_POS, c.position),
        n && (mat3.invert(TEMP_MAT3, c.parentScaleMat3),
        vec3.transformMat3(TEMP_VEC3, n, TEMP_MAT3),
        vec3.sub(TEMP_POS, TEMP_POS, TEMP_VEC3));
        const d = {
            name: a.name || a.id,
            children: [],
            translation: serializeVec3(TEMP_POS),
            rotation: serializeQuat(c.quaternion),
            scale: serializeVec3(c.scale),
            parentScaleMat3: Array.from(c.parentScaleMat3),
            mesh: -1,
            alpha: a.type === ProjectNodeType.Bone || a.type === ProjectNodeType.SkinPart ? clipAlpha(a.alpha) : 255
        };
        if (a.type === ProjectNodeType.SkinPart && a.voxelId) {
            const l = e[getMeshId(a.voxelId, a.flip)];
            l !== void 0 && (d.mesh = l.index)
        }
        return d
    }
    addModelNode(a, e, n, c) {
        const d = a.nodes.length
          , l = this.getModelNode(e, n, c);
        if (!l)
            return;
        a.nodes.push(l),
        a.idToIndex[e.id] = d;
        const u = this.getParentOrBoneId(e)
          , m = u ? a.idToIndex[u] : void 0;
        m !== void 0 && a.nodes[m] && a.nodes[m].children.push(d)
    }
    getModelNodes(a, e, n) {
        const c = []
          , d = {};
        return everyNode(n || ROOT_ID, this.hierarchyData, l => {
            const u = l.parentId && isRootNode(l.parentId) ? e : void 0;
            return this.addModelNode({
                nodes: c,
                idToIndex: d
            }, l, a, u),
            l.type === ProjectNodeType.Bone && l.skinId && everyNode(l.skinId, this.hierarchyData, m => (this.addModelNode({
                nodes: c,
                idToIndex: d
            }, m, a),
            !0)),
            !0
        }
        ),
        {
            nodes: c,
            idToIndex: d
        }
    }
}
;
function buildProjectRuntime(a) {
    const e = new VoxelManager;
    for (const T of Object.values(a.voxels || {})) {
        const C = e.loadVoxelData(T);
        e.map.set(C.id, C)
    }
    const n = new NodeManager(e)
      , d = new Loader(n).loadNodesData(a.nodes || {});
    everyNode(ROOT_ID, d, T => (T.type === ProjectNodeType.SkinPart && T.voxelId && e.getVoxelMesh(T.voxelId, T.flip),
    T.type === ProjectNodeType.Bone && T.skinId && everyNode(T.skinId, d, C => (C.type === ProjectNodeType.SkinPart && C.voxelId && e.getVoxelMesh(C.voxelId, C.flip),
    !0)),
    !0));
    const l = new Mesher(!0,!0,!1)
      , u = {};
    let m = 0;
    for (const T of Array.from(e.map.keys())) {
        const C = e.map.get(T);
        if (C)
            for (const K of Object.values(C.meshes)) {
                const {bounds: I, boundaryStart: O, flip: q} = K;
                if (isEmptyBounds(I))
                    continue;
                const k = e.getFlippedVoxelView(C.voxelView, q)
                  , V = voxelShapeToObjSize(I, C.dimension);
                u[getMeshId(C.id, q)] = {
                    index: m,
                    newBounds: V,
                    boundaryStart: O
                },
                m++,
                l.addModel(k, C.dimension)
            }
    }
    const b = new Exporter(n,d)
      , {rootPartOffset: v} = b.getModelBounds(u)
      , {nodes: _} = b.getModelNodes(u, v);
    return {
        mesher: l,
        nodes: _,
        meshCount: m,
        voxelCount: e.map.size
    }
}
function roundUp4Diff(a) {
    return 4 - (a & 3) & 3
}
function bytesToBase64(a) {
    let e = "";
    for (let c = 0; c < a.length; c += 32768) {
        const d = a.subarray(c, c + 32768);
        e += String.fromCharCode(...d)
    }
    return btoa(e)
}
async function canvasToPngBytes(a) {
    const e = await new Promise( (n, c) => {
        a.toBlob(d => {
            d ? n(d) : c(new Error("PNG 编码失败"))
        }
        , "image/png")
    }
    );
    return new Uint8Array(await e.arrayBuffer())
}
async function generateTexturePngBytes(a, e) {
    const n = a.width
      , c = a.data.length / n
      , d = unpackTextureData(a, e)
      , l = document.createElement("canvas");
    l.width = n,
    l.height = c;
    const u = l.getContext("2d");
    if (!u)
        throw new Error("浏览器不支持 Canvas 2D");
    const m = u.createImageData(n, c);
    for (let b = 0; b < a.data.length; b++) {
        const v = b * e.length
          , _ = b * 4;
        if (e.length === 1) {
            const T = d[v];
            m.data[_ + 0] = T,
            m.data[_ + 1] = T,
            m.data[_ + 2] = T,
            m.data[_ + 3] = 255
        } else
            m.data[_ + 0] = d[v + 0],
            m.data[_ + 1] = d[v + 1],
            m.data[_ + 2] = d[v + 2],
            m.data[_ + 3] = 255
    }
    return u.putImageData(m, 0, 0),
    canvasToPngBytes(l)
}
function pick(a, e) {
    const n = {};
    for (const c of e)
        c in a && (n[c] = a[c]);
    return n
}
async function exportToGLTFBrowser(a, e, n, c, d=[{
    name: "root",
    mesh: 0
}]) {
    const l = await textureToMeshTexture(e.getTextureData().texture, n, c)
      , u = await generateTexturePngBytes(l, [24, 16, 8])
      , m = await generateTexturePngBytes(l, [0]);
    let b = u.byteLength + m.byteLength;
    const v = []
      , _ = [];
    function T(y, X=255) {
        let N = _.indexOf(y);
        N === -1 && (N = _.length,
        _.push(y));
        let R = v.indexOf(X);
        return R === -1 && (R = v.length,
        v.push(X)),
        `${N}_${R}`
    }
    const C = [];
    d = d.map(y => {
        const X = pick(y, ["name", "mesh", "rotation", "scale", "translation", "children"]);
        if (X.mesh === -1)
            delete X.mesh;
        else {
            const N = T(X.mesh, y.alpha);
            let R = C.indexOf(N);
            R === -1 && (R = C.length,
            C.push(N)),
            X.mesh = R
        }
        return X.children && !X.children.length && delete X.children,
        X
    }
    );
    const K = Array(_.length);
    for (let y = 0; y < _.length; y++) {
        const X = e.getMesh(_[y])
          , N = Math.max(l.width, l.data.length / l.width) > 255 ? Uint16Array : Uint8Array;
        K[y] = unpackMeshData(X, Uint16Array, N);
        const R = K[y].meshData.length / 4 * 3 * 4
          , D = K[y].uvData.length * 4
          , F = R / 3 / 4
          , M = K[y].count * (F > 65536 ? 4 : F > 256 ? 2 : 1);
        b += R + D + M + roundUp4Diff(b)
    }
    const I = new Uint8Array(b)
      , O = new DataView(I.buffer);
    let q = 0;
    const k = y => {
        O.setFloat32(q, y, !0),
        q += 4
    }
      , V = y => {
        O.setUint32(q, y, !0),
        q += 4
    }
      , $ = y => {
        O.setUint16(q, y, !0),
        q += 2
    }
      , Y = y => {
        I[q++] = y
    }
      , Z = y => {
        I.set(y, q),
        q += y.length
    }
      , H = {
        generator: "ArenaPro Web VCode Exporter",
        version: "2.0"
    }
      , J = []
      , ae = []
      , re = [];
    for (let y = 0; y < _.length; y++) {
        const X = K[y]
          , N = X.meshData.length / 4 * 3 * 4
          , R = X.uvData.length * 4
          , D = N / 3 / 4
          , F = X.count * (D > 65536 ? 4 : D > 256 ? 2 : 1)
          , M = q;
        for (let se = 0; se < X.meshData.length; se += 4)
            k(X.meshData[se + 0]),
            k(X.meshData[se + 1]),
            k(X.meshData[se + 2]);
        const E = [1 / 0, 1 / 0]
          , U = [-1 / 0, -1 / 0]
          , Q = q;
        for (let se = 0; se < R / 4; se += 2) {
            const ue = X.uvData[se + 0] / l.width
              , _e = X.uvData[se + 1] / (l.data.length / l.width);
            k(ue),
            k(_e),
            E[0] = Math.min(E[0], ue),
            E[1] = Math.min(E[1], _e),
            U[0] = Math.max(U[0], ue),
            U[1] = Math.max(U[1], _e)
        }
        const ie = D > 65536 ? V : D > 256 ? $ : Y;
        let te = 1 / 0
          , oe = -1 / 0;
        const he = [0, 1, 2, 2, 1, 3]
          , j = q;
        for (let se = 0; se < X.count; se += he.length)
            for (let ue = 0; ue < he.length; ue++) {
                const _e = Math.floor(se / he.length) * 4 + he[ue];
                ie(_e),
                te = Math.min(te, _e),
                oe = Math.max(oe, _e)
            }
        q += roundUp4Diff(q),
        J.push({
            name: `bufferView_positions_${y}`,
            buffer: 0,
            byteLength: N,
            byteOffset: M,
            byteStride: 12,
            target: 34962
        }, {
            name: `bufferView_texcoords_${y}`,
            buffer: 0,
            byteLength: R,
            byteOffset: Q,
            byteStride: 8,
            target: 34962
        }, {
            name: `bufferView_indices_${y}`,
            buffer: 0,
            byteLength: F,
            byteOffset: j,
            target: 34963
        }),
        ae.push({
            name: `positions_${y}`,
            componentType: 5126,
            count: D,
            type: "VEC3",
            bufferView: y * 3 + 0,
            byteOffset: 0,
            min: [X.lox, X.loy, X.loz],
            max: [X.hix, X.hiy, X.hiz]
        }, {
            name: `texcoords_${y}`,
            componentType: 5126,
            count: D,
            type: "VEC2",
            bufferView: y * 3 + 1,
            byteOffset: 0,
            min: E,
            max: U
        }, {
            name: `indices_${y}`,
            componentType: D > 65536 ? 5125 : D > 256 ? 5123 : 5121,
            count: X.count,
            type: "SCALAR",
            bufferView: y * 3 + 2,
            byteOffset: 0,
            min: [te],
            max: [oe]
        })
    }
    J.push({
        name: "bufferView_image",
        buffer: 0,
        byteLength: u.byteLength,
        byteOffset: q
    }),
    Z(u),
    J.push({
        name: "bufferView_emissive_image",
        buffer: 0,
        byteLength: m.byteLength,
        byteOffset: q
    }),
    Z(m);
    const z = [{
        name: a,
        byteLength: I.byteLength,
        uri: `data:application/octet-stream;base64,${bytesToBase64(I)}`
    }]
      , B = [{
        name: "image",
        mimeType: "image/png",
        bufferView: J.length - 2
    }, {
        name: "emissive image",
        mimeType: "image/png",
        bufferView: J.length - 1
    }]
      , f = v.map(y => ({
        name: "material",
        pbrMetallicRoughness: {
            baseColorTexture: {
                index: 0
            },
            baseColorFactor: [1, 1, 1, y / 255],
            metallicFactor: 0,
            roughnessFactor: 1
        },
        emissiveTexture: {
            index: 1
        },
        emissiveFactor: [0, 0, 0],
        alphaMode: y === 255 ? "OPAQUE" : "BLEND",
        doubleSided: !0,
        extensions: {
            KHR_materials_unlit: {}
        }
    }));
    for (let y = 0; y < C.length; y++) {
        const [X,N] = C[y].split("_").map(R => parseInt(R, 10));
        re.push({
            name: `mesh_${y}`,
            primitives: [{
                attributes: {
                    POSITION: X * 3 + 0,
                    TEXCOORD_0: X * 3 + 1
                },
                indices: X * 3 + 2,
                material: N,
                mode: 4
            }]
        })
    }
    return JSON.stringify({
        asset: H,
        extensionsUsed: ["KHR_materials_unlit"],
        accessors: ae,
        bufferViews: J,
        buffers: z,
        images: B,
        materials: f,
        meshes: re,
        nodes: d,
        samplers: [{
            wrapS: 33071,
            wrapT: 33071,
            magFilter: 9728,
            minFilter: 9728
        }],
        scene: 0,
        scenes: [{
            nodes: [0]
        }],
        textures: [{
            name: "texture",
            sampler: 0,
            source: 0
        }, {
            name: "emissive texture",
            sampler: 0,
            source: 1
        }]
    }, null, 2)
}
async function exportVCodeToGltf$1(a) {
    const e = normalizeInput(a)
      , n = await fetchProjectBytes(e)
      , c = migrateProject(n);
    if (!c)
        throw new Error("Voxa 工程解析失败。");
    const {paletteList: d, emissiveList: l} = buildPalette(c)
      , {mesher: u, nodes: m, meshCount: b, voxelCount: v} = buildProjectRuntime(c);
    if (!b)
        throw new Error("解析完成，但没有得到任何可导出的 voxel mesh。");
    try {
        const _ = await exportToGLTFBrowser(e, u, d, l, m);
        return {
            hash: e,
            fileName: `${e}.gltf`,
            gltfText: _,
            summary: {
                paletteCount: d.length,
                emissiveCount: l.length,
                nodeCount: m.length,
                meshCount: b,
                voxelCount: v
            }
        }
    } catch (_) {
        throw console.error("导出 glTF 失败，摘要:", {
            hash: e,
            meshCount: b,
            voxelCount: v
        }),
        _
    }
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
const exportVCodeToGltf = exportVCodeToGltf$1

// Expose to global scope
window.exportVCodeToGltf = exportVCodeToGltf;
