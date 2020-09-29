/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("@tensorflow/tfjs-core"), require("@tensorflow/tfjs-converter")) : "function" == typeof define && define.amd ? define(["exports", "@tensorflow/tfjs-core", "@tensorflow/tfjs-converter"], e) : e(t.posenet = {}, t.tf, t.tf)
}(this, function(t, e, r) {
    "use strict";
    var n = function(t, e) {
        return (n = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
            })(t, e)
    };

    function i(t, e) {
        function r() {
            this.constructor = t
        }
        n(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
    }
    var o = function() {
        return (o = Object.assign || function(t) {
            for (var e, r = 1, n = arguments.length; r < n; r++)
                for (var i in e = arguments[r]) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t
        }).apply(this, arguments)
    };

    function u(t, e, r, n) {
        return new(r || (r = Promise))(function(i, o) {
            function u(t) {
                try {
                    a(n.next(t))
                } catch (t) {
                    o(t)
                }
            }

            function s(t) {
                try {
                    a(n.throw(t))
                } catch (t) {
                    o(t)
                }
            }

            function a(t) {
                t.done ? i(t.value) : new r(function(e) {
                    e(t.value)
                }).then(u, s)
            }
            a((n = n.apply(t, e || [])).next())
        })
    }

    function s(t, e) {
        var r, n, i, o, u = {
            label: 0,
            sent: function() {
                if (1 & i[0]) throw i[1];
                return i[1]
            },
            trys: [],
            ops: []
        };
        return o = {
            next: s(0),
            throw: s(1),
            return: s(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
            return this
        }), o;

        function s(o) {
            return function(s) {
                return function(o) {
                    if (r) throw new TypeError("Generator is already executing.");
                    for (; u;) try {
                        if (r = 1, n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, o[1])).done) return i;
                        switch (n = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                            case 0:
                            case 1:
                                i = o;
                                break;
                            case 4:
                                return u.label++, {
                                    value: o[1],
                                    done: !1
                                };
                            case 5:
                                u.label++, n = o[1], o = [0];
                                continue;
                            case 7:
                                o = u.ops.pop(), u.trys.pop();
                                continue;
                            default:
                                if (!(i = (i = u.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                    u = 0;
                                    continue
                                }
                                if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                    u.label = o[1];
                                    break
                                }
                                if (6 === o[0] && u.label < i[1]) {
                                    u.label = i[1], i = o;
                                    break
                                }
                                if (i && u.label < i[2]) {
                                    u.label = i[2], u.ops.push(o);
                                    break
                                }
                                i[2] && u.ops.pop(), u.trys.pop();
                                continue
                        }
                        o = e.call(t, u)
                    } catch (t) {
                        o = [6, t], n = 0
                    } finally {
                        r = i = 0
                    }
                    if (5 & o[0]) throw o[1];
                    return {
                        value: o[0] ? o[1] : void 0,
                        done: !0
                    }
                }([o, s])
            }
        }
    }
    var a = function() {
            function t(t, r) {
                this.model = t, this.outputStride = r;
                var n = this.model.inputs[0].shape;
                e.util.assert(-1 === n[1] && -1 === n[2], function() {
                    return "Input shape [" + n[1] + ", " + n[2] + "] must both be equal to or -1"
                })
            }
            return t.prototype.predict = function(t) {
                var r = this;
                return e.tidy(function() {
                    var e = r.preprocessInput(t.toFloat()).expandDims(0),
                        n = r.model.predict(e).map(function(t) {
                            return t.squeeze([0])
                        }),
                        i = r.nameOutputResults(n);
                    return {
                        heatmapScores: i.heatmap.sigmoid(),
                        offsets: i.offsets,
                        displacementFwd: i.displacementFwd,
                        displacementBwd: i.displacementBwd
                    }
                })
            }, t.prototype.dispose = function() {
                this.model.dispose()
            }, t
        }(),
        l = function(t) {
            function r() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(r, t), r.prototype.preprocessInput = function(t) {
                return e.tidy(function() {
                    return e.div(t, 127.5).sub(1)
                })
            }, r.prototype.nameOutputResults = function(t) {
                return {
                    offsets: t[0],
                    heatmap: t[1],
                    displacementFwd: t[2],
                    displacementBwd: t[3]
                }
            }, r
        }(a);

    function f(t) {
        return Math.floor(t / 2)
    }
    var c = function() {
        function t(t, e) {
            this.priorityQueue = new Array(t), this.numberOfElements = -1, this.getElementValue = e
        }
        return t.prototype.enqueue = function(t) {
            this.priorityQueue[++this.numberOfElements] = t, this.swim(this.numberOfElements)
        }, t.prototype.dequeue = function() {
            var t = this.priorityQueue[0];
            return this.exchange(0, this.numberOfElements--), this.sink(0), this.priorityQueue[this.numberOfElements + 1] = null, t
        }, t.prototype.empty = function() {
            return -1 === this.numberOfElements
        }, t.prototype.size = function() {
            return this.numberOfElements + 1
        }, t.prototype.all = function() {
            return this.priorityQueue.slice(0, this.numberOfElements + 1)
        }, t.prototype.max = function() {
            return this.priorityQueue[0]
        }, t.prototype.swim = function(t) {
            for (; t > 0 && this.less(f(t), t);) this.exchange(t, f(t)), t = f(t)
        }, t.prototype.sink = function(t) {
            for (; 2 * t <= this.numberOfElements;) {
                var e = 2 * t;
                if (e < this.numberOfElements && this.less(e, e + 1) && e++, !this.less(t, e)) break;
                this.exchange(t, e), t = e
            }
        }, t.prototype.getValueAt = function(t) {
            return this.getElementValue(this.priorityQueue[t])
        }, t.prototype.less = function(t, e) {
            return this.getValueAt(t) < this.getValueAt(e)
        }, t.prototype.exchange = function(t, e) {
            var r = this.priorityQueue[t];
            this.priorityQueue[t] = this.priorityQueue[e], this.priorityQueue[e] = r
        }, t
    }();

    function p(t, e, r, n, i, o) {
        for (var u = o.shape, s = u[0], a = u[1], l = !0, f = Math.max(r - i, 0), c = Math.min(r + i + 1, s), p = f; p < c; ++p) {
            for (var h = Math.max(n - i, 0), d = Math.min(n + i + 1, a), m = h; m < d; ++m)
                if (o.get(p, m, t) > e) {
                    l = !1;
                    break
                }
            if (!l) break
        }
        return l
    }
    var h = ["nose", "leftEye", "rightEye", "leftEar", "rightEar", "leftShoulder", "rightShoulder", "leftElbow", "rightElbow", "leftWrist", "rightWrist", "leftHip", "rightHip", "leftKnee", "rightKnee", "leftAnkle", "rightAnkle"],
        d = h.length,
        m = h.reduce(function(t, e, r) {
            return t[e] = r, t
        }, {}),
        y = [
            ["nose", "leftEye"],
            ["leftEye", "leftEar"],
            ["nose", "rightEye"],
            ["rightEye", "rightEar"],
            ["nose", "leftShoulder"],
            ["leftShoulder", "leftElbow"],
            ["leftElbow", "leftWrist"],
            ["leftShoulder", "leftHip"],
            ["leftHip", "leftKnee"],
            ["leftKnee", "leftAnkle"],
            ["nose", "rightShoulder"],
            ["rightShoulder", "rightElbow"],
            ["rightElbow", "rightWrist"],
            ["rightShoulder", "rightHip"],
            ["rightHip", "rightKnee"],
            ["rightKnee", "rightAnkle"]
        ],
        v = [
            ["leftHip", "leftShoulder"],
            ["leftElbow", "leftShoulder"],
            ["leftElbow", "leftWrist"],
            ["leftHip", "leftKnee"],
            ["leftKnee", "leftAnkle"],
            ["rightHip", "rightShoulder"],
            ["rightElbow", "rightShoulder"],
            ["rightElbow", "rightWrist"],
            ["rightHip", "rightKnee"],
            ["rightKnee", "rightAnkle"],
            ["leftShoulder", "rightShoulder"],
            ["leftHip", "rightHip"]
        ].map(function(t) {
            var e = t[0],
                r = t[1];
            return [m[e], m[r]]
        });

    function g(t, e, r, n) {
        return {
            y: n.get(t, e, r),
            x: n.get(t, e, r + d)
        }
    }

    function b(t, e, r) {
        var n = g(t.heatmapY, t.heatmapX, t.id, r),
            i = n.y,
            o = n.x;
        return {
            x: t.heatmapX * e + o,
            y: t.heatmapY * e + i
        }
    }

    function w(t, e, r) {
        return t < e ? e : t > r ? r : t
    }

    function x(t, e) {
        return {
            x: t.x + e.x,
            y: t.y + e.y
        }
    }
    var _ = y.map(function(t) {
            var e = t[0],
                r = t[1];
            return [m[e], m[r]]
        }),
        S = _.map(function(t) {
            return t[1]
        }),
        E = _.map(function(t) {
            return t[0]
        });

    function M(t, e, r, n) {
        return {
            y: w(Math.round(t.y / e), 0, r - 1),
            x: w(Math.round(t.x / e), 0, n - 1)
        }
    }

    function k(t, e, r, n, i, o, u, s) {
        void 0 === s && (s = 2);
        for (var a = n.shape, l = a[0], f = a[1], c = function(t, e, r) {
                var n = r.shape[2] / 2;
                return {
                    y: r.get(e.y, e.x, t),
                    x: r.get(e.y, e.x, n + t)
                }
            }(t, M(e.position, o, l, f), u), p = x(e.position, c), d = 0; d < s; d++) {
            var m = M(p, o, l, f),
                y = g(m.y, m.x, r, i);
            p = x({
                x: m.x * o,
                y: m.y * o
            }, {
                x: y.x,
                y: y.y
            })
        }
        var v = M(p, o, l, f),
            b = n.get(v.y, v.x, r);
        return {
            position: p,
            part: h[r],
            score: b
        }
    }

    function O(t, e, r, n, i, o) {
        var u = e.shape[2],
            s = S.length,
            a = new Array(u),
            l = t.part,
            f = t.score,
            c = b(l, n, r);
        a[l.id] = {
            score: f,
            part: h[l.id],
            position: c
        };
        for (var p = s - 1; p >= 0; --p) {
            var d = S[p],
                m = E[p];
            a[d] && !a[m] && (a[m] = k(p, a[d], m, e, r, n, o))
        }
        for (p = 0; p < s; ++p) {
            d = E[p], m = S[p];
            a[d] && !a[m] && (a[m] = k(p, a[d], m, e, r, n, i))
        }
        return a
    }

    function I(t, e, r, n) {
        var i = r.x,
            o = r.y;
        return t.some(function(t) {
            var r, u, s, a, l, f, c = t.keypoints[n].position;
            return r = o, u = i, s = c.y, a = c.x, (l = s - r) * l + (f = a - u) * f <= e
        })
    }

    function j(t, e, r) {
        return r.reduce(function(r, n, i) {
            var o = n.position,
                u = n.score;
            return I(t, e, o, i) || (r += u), r
        }, 0) / r.length
    }
    var R = 1;

    function P(t, e, r, n, i, o, u, s) {
        void 0 === u && (u = .5), void 0 === s && (s = 20);
        for (var a = [], l = function(t, e, r) {
                for (var n = r.shape, i = n[0], o = n[1], u = n[2], s = new c(i * o * u, function(t) {
                        return t.score
                    }), a = 0; a < i; ++a)
                    for (var l = 0; l < o; ++l)
                        for (var f = 0; f < u; ++f) {
                            var h = r.get(a, l, f);
                            h < t || p(f, h, a, l, e, r) && s.enqueue({
                                score: h,
                                part: {
                                    heatmapY: a,
                                    heatmapX: l,
                                    id: f
                                }
                            })
                        }
                return s
            }(u, R, t), f = s * s; a.length < o && !l.empty();) {
            var h = l.dequeue();
            if (!I(a, f, b(h.part, i, e), h.part.id)) {
                var d = O(h, t, e, i, r, n),
                    m = j(a, f, d);
                a.push({
                    keypoints: d,
                    score: m
                })
            }
        }
        return a
    }

    function N(t) {
        var r = t.shape,
            n = r[0],
            i = r[1],
            o = r[2];
        return e.tidy(function() {
            var r, u, s = t.reshape([n * i, o]).argMax(0),
                a = s.div(e.scalar(i, "int32")).expandDims(1),
                l = (r = s, u = i, e.tidy(function() {
                    var t = r.div(e.scalar(u, "int32"));
                    return r.sub(t.mul(e.scalar(u, "int32")))
                })).expandDims(1);
            return e.concat([a, l], 1)
        })
    }

    function B(t, e, r, n) {
        return {
            y: n.get(t, e, r),
            x: n.get(t, e, r + d)
        }
    }

    function q(t, r, n) {
        return e.tidy(function() {
            var i = function(t, r) {
                for (var n = [], i = 0; i < d; i++) {
                    var o = B(t.get(i, 0).valueOf(), t.get(i, 1).valueOf(), i, r),
                        u = o.x,
                        s = o.y;
                    n.push(s), n.push(u)
                }
                return e.tensor2d(n, [d, 2])
            }(t, n);
            return t.toTensor().mul(e.scalar(r, "int32")).toFloat().add(i)
        })
    }

    function A(t, e, r) {
        return u(this, void 0, void 0, function() {
            var n, i, o, u, a, l, f, c, p, d;
            return s(this, function(s) {
                switch (s.label) {
                    case 0:
                        return n = 0, i = N(t), [4, Promise.all([t.buffer(), e.buffer(), i.buffer()])];
                    case 1:
                        return o = s.sent(), u = o[0], a = o[1], l = o[2], [4, (f = q(l, r, a)).buffer()];
                    case 2:
                        return c = s.sent(), p = Array.from(function(t, e) {
                            for (var r = e.shape[0], n = new Float32Array(r), i = 0; i < r; i++) {
                                var o = e.get(i, 0),
                                    u = e.get(i, 1);
                                n[i] = t.get(o, u, i)
                            }
                            return n
                        }(u, l)), d = p.map(function(t, e) {
                            return n += t, {
                                position: {
                                    y: c.get(e, 0),
                                    x: c.get(e, 1)
                                },
                                part: h[e],
                                score: t
                            }
                        }), i.dispose(), f.dispose(), [2, {
                            keypoints: d,
                            score: n / d.length
                        }]
                }
            })
        })
    }
    var H = "https://storage.googleapis.com/tfjs-models/savedmodel/posenet/mobilenet/",
        F = "https://storage.googleapis.com/tfjs-models/savedmodel/posenet/resnet50/";
    var T = [-123.15, -115.9, -103.06],
        V = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.preprocessInput = function(t) {
                return t.add(T)
            }, e.prototype.nameOutputResults = function(t) {
                var e = t[0],
                    r = t[1];
                return {
                    offsets: t[2],
                    heatmap: t[3],
                    displacementFwd: e,
                    displacementBwd: r
                }
            }, e
        }(a);
    var Y = Number.NEGATIVE_INFINITY,
        K = Number.POSITIVE_INFINITY;

    function Q(t) {
        return t.reduce(function(t, e) {
            var r = t.maxX,
                n = t.maxY,
                i = t.minX,
                o = t.minY,
                u = e.position,
                s = u.x,
                a = u.y;
            return {
                maxX: Math.max(r, s),
                maxY: Math.max(n, a),
                minX: Math.min(i, s),
                minY: Math.min(o, a)
            }
        }, {
            maxX: Y,
            maxY: Y,
            minX: K,
            minY: K
        })
    }

    function X(t, e, r, n, i) {
        return void 0 === n && (n = 0), void 0 === i && (i = 0), {
            score: t.score,
            keypoints: t.keypoints.map(function(t) {
                var o = t.score,
                    u = t.part,
                    s = t.position;
                return {
                    score: o,
                    part: u,
                    position: {
                        x: s.x * r + i,
                        y: s.y * e + n
                    }
                }
            })
        }
    }

    function z(t, e) {
        return G(t, e) ? t : Math.floor(t / e) * e + 1
    }

    function D(t) {
        e.util.assert("number" == typeof t || "object" == typeof t, function() {
            return "Invalid inputResolution " + t + ". Should be a number or an object with width and height"
        }), "object" == typeof t && (e.util.assert("number" == typeof t.width, function() {
            return "inputResolution.width has a value of " + t.width + " which is invalid; it must be a number"
        }), e.util.assert("number" == typeof t.height, function() {
            return "inputResolution.height has a value of " + t.height + " which is invalid; it must be a number"
        }))
    }

    function W(t, e) {
        return D(t), "object" == typeof t ? [z(t.height, e), z(t.width, e)] : [z(t, e), z(t, e)]
    }
    var C = [8, 16, 32];

    function G(t, e) {
        return (t - 1) % e == 0
    }

    function U(t) {
        return t instanceof e.Tensor ? [t.shape[0], t.shape[1]] : [t.height, t.width]
    }

    function J(t, r) {
        var n = r[0],
            i = r[1],
            o = U(t),
            u = o[0],
            s = o[1],
            a = i / n,
            l = [0, 0, 0, 0],
            f = l[0],
            c = l[1],
            p = l[2],
            h = l[3];
        return s / u < a ? (f = 0, c = 0, p = Math.round(.5 * (a * u - s)), h = Math.round(.5 * (a * u - s))) : (f = Math.round(.5 * (1 / a * s - u)), c = Math.round(.5 * (1 / a * s - u)), p = 0, h = 0), {
            resized: e.tidy(function() {
                var r = function(t) {
                    return t instanceof e.Tensor ? t : e.browser.fromPixels(t)
                }(t);
                return (r = e.pad3d(r, [
                    [f, c],
                    [p, h],
                    [0, 0]
                ])).resizeBilinear([n, i])
            }),
            padding: {
                top: f,
                left: p,
                right: h,
                bottom: c
            }
        }
    }

    function L(t, e, r, n, i) {
        var o = e[0],
            u = e[1],
            s = r[0],
            a = r[1],
            l = function(t, e, r, n, i) {
                return void 0 === n && (n = 0), void 0 === i && (i = 0), 1 === r && 1 === e && 0 === n && 0 === i ? t : t.map(function(t) {
                    return X(t, e, r, n, i)
                })
            }(t, (o + n.top + n.bottom) / s, (u + n.left + n.right) / a, -n.top, -n.left);
        return i ? function(t, e) {
            return e <= 0 ? t : t.map(function(t) {
                return function(t, e) {
                    return {
                        score: t.score,
                        keypoints: t.keypoints.map(function(t) {
                            var r = t.score,
                                n = t.part,
                                i = t.position;
                            return {
                                score: r,
                                part: n,
                                position: {
                                    x: e - 1 - i.x,
                                    y: i.y
                                }
                            }
                        })
                    }
                }(t, e)
            })
        }(l, u) : l
    }
    var Z = {
            architecture: "MobileNetV1",
            outputStride: 16,
            multiplier: .75,
            inputResolution: 257
        },
        $ = ["MobileNetV1", "ResNet50"],
        tt = {
            MobileNetV1: [8, 16, 32],
            ResNet50: [32, 16]
        },
        et = {
            MobileNetV1: [.5, .75, 1],
            ResNet50: [1]
        },
        rt = [1, 2, 4];
    var nt = {
            flipHorizontal: !1
        },
        it = {
            flipHorizontal: !1,
            maxDetections: 5,
            scoreThreshold: .5,
            nmsRadius: 20
        };
    var ot = function() {
        function t(t, r) {
            var n;
            n = t.outputStride, e.util.assert("number" == typeof n, function() {
                    return "outputStride is not a number"
                }), e.util.assert(C.indexOf(n) >= 0, function() {
                    return "outputStride of " + n + " is invalid. It must be either 8, 16, or 32"
                }),
                function(t, r) {
                    e.util.assert("number" == typeof t[0] && "number" == typeof t[1], function() {
                        return "both resolution values must be a number but had values " + t
                    }), e.util.assert(G(t[0], r), function() {
                        return "height of " + t[0] + " is invalid for output stride " + r + "."
                    }), e.util.assert(G(t[1], r), function() {
                        return "width of " + t[1] + " is invalid for output stride " + r + "."
                    })
                }(r, t.outputStride), this.baseModel = t, this.inputResolution = r
        }
        return t.prototype.estimateMultiplePoses = function(t, e) {
            return void 0 === e && (e = it), u(this, void 0, void 0, function() {
                var r, n, i, a, l, f, c, p, h, d, m, y, v, g, b, w, x, _, S, E, M;
                return s(this, function(k) {
                    switch (k.label) {
                        case 0:
                            return r = o({}, it, e),
                                function(t) {
                                    var e = t.maxDetections,
                                        r = t.scoreThreshold,
                                        n = t.nmsRadius;
                                    if (e <= 0) throw new Error("Invalid maxDetections " + e + ". Should be > 0");
                                    if (r < 0 || r > 1) throw new Error("Invalid scoreThreshold " + r + ". Should be in range [0.0, 1.0]");
                                    if (n <= 0) throw new Error("Invalid nmsRadius " + n + ".")
                                }(e), n = this.baseModel.outputStride, i = this.inputResolution, a = U(t), l = a[0], f = a[1], c = J(t, i), p = c.resized, h = c.padding, d = this.baseModel.predict(p), m = d.heatmapScores, y = d.offsets, v = d.displacementFwd, g = d.displacementBwd, [4, function(t) {
                                    return u(this, void 0, void 0, function() {
                                        return s(this, function(e) {
                                            return [2, Promise.all(t.map(function(t) {
                                                return t.buffer()
                                            }))]
                                        })
                                    })
                                }([m, y, v, g])];
                        case 1:
                            return b = k.sent(), w = b[0], x = b[1], _ = b[2], S = b[3], [4, P(w, x, _, S, n, r.maxDetections, r.scoreThreshold, r.nmsRadius)];
                        case 2:
                            return E = k.sent(), M = L(E, [l, f], i, h, r.flipHorizontal), m.dispose(), y.dispose(), v.dispose(), g.dispose(), p.dispose(), [2, M]
                    }
                })
            })
        }, t.prototype.estimateSinglePose = function(t, e) {
            return void 0 === e && (e = nt), u(this, void 0, void 0, function() {
                var r, n, i, u, a, l, f, c, p, h, d, m, y, v, g, b;
                return s(this, function(s) {
                    switch (s.label) {
                        case 0:
                            return r = o({}, nt, e), n = this.baseModel.outputStride, i = this.inputResolution, u = U(t), a = u[0], l = u[1], f = J(t, i), c = f.resized, p = f.padding, h = this.baseModel.predict(c), d = h.heatmapScores, m = h.offsets, y = h.displacementFwd, v = h.displacementBwd, [4, A(d, m, n)];
                        case 1:
                            return g = s.sent(), b = L([g], [a, l], i, p, r.flipHorizontal), d.dispose(), m.dispose(), y.dispose(), v.dispose(), c.dispose(), [2, b[0]]
                    }
                })
            })
        }, t.prototype.estimatePoses = function(t, e) {
            return u(this, void 0, void 0, function() {
                return s(this, function(r) {
                    switch (r.label) {
                        case 0:
                            return "single-person" !== e.decodingMethod ? [3, 2] : [4, this.estimateSinglePose(t, e)];
                        case 1:
                            return [2, [r.sent()]];
                        case 2:
                            return [2, this.estimateMultiplePoses(t, e)]
                    }
                })
            })
        }, t.prototype.dispose = function() {
            this.baseModel.dispose()
        }, t
    }();

    function ut(t) {
        return u(this, void 0, void 0, function() {
            var n, i, o, u, a, f, c;
            return s(this, function(s) {
                switch (s.label) {
                    case 0:
                        if (n = t.outputStride, i = t.quantBytes, o = t.multiplier, null == e) throw new Error("Cannot find TensorFlow.js. If you are using a <script> tag, please also include @tensorflow/tfjs on the page before using this\n        model.");
                        return u = function(t, e, r) {
                            var n = {
                                    1: "100",
                                    .75: "075",
                                    .5: "050"
                                },
                                i = "model-stride" + t + ".json";
                            return 4 === r ? H + "float/" + n[e] + "/" + i : H + "quant" + r + "/" + n[e] + "/" + i
                        }(n, o, i), [4, r.loadGraphModel(t.modelUrl || u)];
                    case 1:
                        return a = s.sent(), f = new l(a, n), c = W(t.inputResolution, f.outputStride), [2, new ot(f, c)]
                }
            })
        })
    }

    function st(t) {
        return u(this, void 0, void 0, function() {
            var n, i, o, u, a, l;
            return s(this, function(s) {
                switch (s.label) {
                    case 0:
                        if (n = t.outputStride, i = t.quantBytes, null == e) throw new Error("Cannot find TensorFlow.js. If you are using a <script> tag, please also include @tensorflow/tfjs on the page before using this\n        model.");
                        return o = function(t, e) {
                            var r = "model-stride" + t + ".json";
                            return 4 === e ? F + "float/" + r : F + "quant" + e + "/" + r
                        }(n, i), [4, r.loadGraphModel(t.modelUrl || o)];
                    case 1:
                        return u = s.sent(), a = new V(u, n), l = W(t.inputResolution, a.outputStride), [2, new ot(a, l)]
                }
            })
        })
    }
    t.decodeMultiplePoses = P, t.decodeSinglePose = A, t.MobileNet = l, t.partChannels = ["left_face", "right_face", "right_upper_leg_front", "right_lower_leg_back", "right_upper_leg_back", "left_lower_leg_front", "left_upper_leg_front", "left_upper_leg_back", "left_lower_leg_back", "right_feet", "right_lower_leg_front", "left_feet", "torso_front", "torso_back", "right_upper_arm_front", "right_upper_arm_back", "right_lower_arm_back", "left_lower_arm_front", "left_upper_arm_front", "left_upper_arm_back", "left_lower_arm_back", "right_hand", "right_lower_arm_front", "left_hand"], t.partIds = m, t.partNames = h, t.poseChain = y, t.load = function(t) {
        return void 0 === t && (t = Z), u(this, void 0, void 0, function() {
            return s(this, function(e) {
                return "ResNet50" === (t = function(t) {
                    if (null == (t = t || Z).architecture && (t.architecture = "MobileNetV1"), $.indexOf(t.architecture) < 0) throw new Error("Invalid architecture " + t.architecture + ". Should be one of " + $);
                    if (null == t.inputResolution && (t.inputResolution = 257), D(t.inputResolution), null == t.outputStride && (t.outputStride = 16), tt[t.architecture].indexOf(t.outputStride) < 0) throw new Error("Invalid outputStride " + t.outputStride + ". Should be one of " + tt[t.architecture] + " for architecutre " + t.architecture + ".");
                    if (null == t.multiplier && (t.multiplier = 1), et[t.architecture].indexOf(t.multiplier) < 0) throw new Error("Invalid multiplier " + t.multiplier + ". Should be one of " + et[t.architecture] + " for architecutre " + t.architecture + ".");
                    if (null == t.quantBytes && (t.quantBytes = 4), rt.indexOf(t.quantBytes) < 0) throw new Error("Invalid quantBytes " + t.quantBytes + ". Should be one of " + rt + " for architecutre " + t.architecture + ".");
                    return t
                }(t)).architecture ? [2, st(t)] : "MobileNetV1" === t.architecture ? [2, ut(t)] : [2, null]
            })
        })
    }, t.PoseNet = ot, t.getAdjacentKeyPoints = function(t, e) {
        return v.reduce(function(r, n) {
            var i = n[0],
                o = n[1];
            return function(t, e, r) {
                return t < r || e < r
            }(t[i].score, t[o].score, e) ? r : (r.push([t[i], t[o]]), r)
        }, [])
    }, t.getBoundingBox = Q, t.getBoundingBoxPoints = function(t) {
        var e = Q(t),
            r = e.minX,
            n = e.minY,
            i = e.maxX,
            o = e.maxY;
        return [{
            x: r,
            y: n
        }, {
            x: i,
            y: n
        }, {
            x: i,
            y: o
        }, {
            x: r,
            y: o
        }]
    }, t.scaleAndFlipPoses = L, t.scalePose = X, t.version = "2.2.1", Object.defineProperty(t, "__esModule", {
        value: !0
    })
});
