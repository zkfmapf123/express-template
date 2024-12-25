import express, { Router } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cluster from 'cluster';
import os from 'os';
import winston, { format } from 'winston';
import { Sequelize } from 'sequelize';
import Joi from 'joi';

dotenv.config({
    path: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod',
});
var EnvConfig = /** @class */ (function () {
    function EnvConfig() {
    }
    EnvConfig.prototype.getEnv = function () {
        return {
            PORT: Number(process.env.PORT) || 3000,
            DB_PORT: Number(process.env.DB_PORT),
            DB_USER: process.env.DB_USER,
            DB_HOST: process.env.DB_HOST,
            DB_DATABASE: process.env.DB_DATABASE,
            DB_PASSWORD: process.env.DB_PASSWORD,
        };
    };
    return EnvConfig;
}());
var envConfig = new EnvConfig();

var _a = winston.format, combine = _a.combine, timestamp = _a.timestamp, json = _a.json, prettyPrint = _a.prettyPrint, simple = _a.simple, printf = _a.printf;
var Logger = /** @class */ (function () {
    function Logger() {
        this.logger = winston.createLogger({
            format: combine(timestamp({ format: 'YYYY-MM-DD hh:mm:ss' }), prettyPrint(), format.splat(), format.simple(), json()),
            transports: [
                new winston.transports.Console({
                    format: combine(
                    // Show detailed logs on console (pretty print in the terminal)
                    timestamp({ format: 'YYYY-MM-DD hh:mm:ss' }), simple(), format.colorize(), // Colors for different levels
                    printf(function (_a) {
                        var timestamp = _a.timestamp, level = _a.level, message = _a.message;
                        return "".concat(timestamp, " [").concat(level, "]: ").concat(message);
                    })),
                }),
                new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
                new winston.transports.File({ filename: 'logs/debug.log', level: 'debug' }),
                new winston.transports.File({ filename: 'logs/combined.log' }),
            ],
        });
    }
    Logger.prototype.info = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        this.logger.info(message);
    };
    Logger.prototype.error = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        this.logger.error(message);
    };
    Logger.prototype.debug = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        this.logger.debug(message);
    };
    Logger.prototype.warn = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        this.logger.warn(message);
    };
    return Logger;
}());
var logger = new Logger();

var HttpConnector = /** @class */ (function () {
    function HttpConnector(app, port, env) {
        this.app = app;
        this.port = port;
        this.env = env;
    }
    HttpConnector.prototype.setConfigs = function (config) {
        config.init(this.env);
        return this;
    };
    // Middleware 설정 (cors, helmet, etc..)
    HttpConnector.prototype.setHTTPMiddleware = function (module) {
        this.app.use(module);
        return this;
    };
    // Controller 설정
    HttpConnector.prototype.setControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (c) { return _this.app.use(c.initRoutes()); });
        return this;
    };
    // Custom Middleware 설정
    HttpConnector.prototype.setCustomMiddleware = function (middleware) {
        this.app.use(middleware);
        return this;
    };
    // Error Handling 설정
    HttpConnector.prototype.setErrorHandling = function () {
        this.app.use('/*', function (req, res) {
            res.status(404).send('Not Found');
        });
        return this;
    };
    // 서버 실행 (Options: Cluster Mode)
    HttpConnector.prototype.start = function (isClusterMode) {
        var _this = this;
        if (isClusterMode === void 0) { isClusterMode = true; }
        if (isClusterMode && cluster.isPrimary) {
            var numCpus = os.cpus().length;
            for (var i = 0; i < numCpus; i++) {
                cluster.fork();
            }
            cluster.on('exit', function (w, c, s) {
                logger.info("Worker ".concat(w.process.pid, " died"));
                cluster.fork();
            });
        }
        else {
            this.app.listen(this.port, function () {
                logger.info("connect to ".concat(process.env.NODE_ENV, " : ").concat(process.pid, " => ").concat(_this.port));
            });
        }
    };
    return HttpConnector;
}());

/******************************************************************************
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
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var ERROR;
(function (ERROR) {
    ERROR["DB_CONNECT_ERROR"] = "DB Connection has been established successfully";
})(ERROR || (ERROR = {}));

var DBConfig = /** @class */ (function () {
    function DBConfig() {
    }
    DBConfig.prototype.init = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var e_1;
            var DB_DATABASE = _b.DB_DATABASE, DB_HOST = _b.DB_HOST, DB_PASSWORD = _b.DB_PASSWORD, DB_PORT = _b.DB_PORT, DB_USER = _b.DB_USER;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.dbConn = new Sequelize("mysql://".concat(DB_HOST, ":").concat(DB_PORT, "/").concat(DB_DATABASE), {
                            username: DB_USER,
                            database: DB_DATABASE,
                            password: DB_PASSWORD,
                            dialect: 'mysql',
                            logging: false,
                            pool: {
                                max: 10,
                                min: 0,
                                idle: 30000,
                            },
                        });
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.dbConn.authenticate()];
                    case 2:
                        _c.sent();
                        logger.info('DB Connection has been established successfully');
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _c.sent();
                        logger.error(e_1);
                        throw new Error(ERROR.DB_CONNECT_ERROR);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DBConfig.prototype.beforeHook = function () {
        throw new Error('Method not implemented.');
    };
    DBConfig.prototype.afterHook = function () {
        throw new Error('Method not implemented.');
    };
    return DBConfig;
}());
var dbConfig = new DBConfig();

function apiDocument(_a) {
    var url = _a.url, method = _a.method, description = _a.description;
    return function (target, propertyKey, descriptor) {
        logger.debug("method : ", method, "url ", url, "desc : ", description);
    };
}

var passed = function (data) { return ({
    tag: 'pass',
    data: data,
    error: null,
}); };
var failed = function (error) { return ({
    tag: 'fail',
    data: null,
    error: error,
}); };
var isFail = function (p) { return p.tag === 'fail'; };

var OptionResponseReturn = function (o, res, successFn, failedFn) {
    if (isFail(o))
        return failedFn(res);
    return successFn(res);
};

var schemaMiddleware = function (schema) {
    return function (req, res, next) {
        var _a;
        var error = schema.validate(req.body).error;
        if (!error) {
            return next();
        }
        var errorDetails = (_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map(function (ms) { return ms.message; });
        return res.status(400).json({
            msg: errorDetails,
        });
    };
};

var testSchema = Joi.object({
    name: Joi.string().required(),
});

var UrlParams$1;
(function (UrlParams) {
    UrlParams["HEALTH"] = "/health";
    UrlParams["TEST"] = "/test";
})(UrlParams$1 || (UrlParams$1 = {}));
var HealthCheckContrller = /** @class */ (function () {
    function HealthCheckContrller() {
    }
    HealthCheckContrller.prototype.initRoutes = function () {
        var r = Router();
        r.get(UrlParams$1.HEALTH, this.handleHealthCheck);
        r.post(UrlParams$1.TEST, schemaMiddleware(testSchema), this.testBodyData);
        return r;
    };
    HealthCheckContrller.prototype.handleHealthCheck = function (req, res) {
        var healthCheck = passed('success');
        return OptionResponseReturn(healthCheck, res, function (res) { return res.status(200).json(healthCheck); }, function (res) { return res.status(500).json(healthCheck); });
    };
    HealthCheckContrller.prototype.testBodyData = function (req, res) {
        var test = passed('test');
        return OptionResponseReturn(test, res, function (res) { return res.status(200).json(test); }, function (res) { return res.status(500).json(test); });
    };
    __decorate([
        apiDocument({
            url: UrlParams$1.HEALTH,
            method: 'GET',
            description: 'health check를 하는 함수입니다.',
        })
    ], HealthCheckContrller.prototype, "handleHealthCheck", null);
    __decorate([
        apiDocument({
            url: UrlParams$1.TEST,
            method: 'POST',
            description: 'test 하는 함수입니다.',
        })
    ], HealthCheckContrller.prototype, "testBodyData", null);
    return HealthCheckContrller;
}());
var healthController = new HealthCheckContrller();

var CoworkersRepository = /** @class */ (function () {
    function CoworkersRepository() {
        this.TABLE_NAME = 'coworkers';
    }
    CoworkersRepository.prototype.retrieve = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, results, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, dbConfig.dbConn.query("select * from ".concat(this.TABLE_NAME))];
                    case 1:
                        _a = _b.sent(), results = _a[0], _a[1];
                        logger.info('users : ', results === null || results === void 0 ? void 0 : results.length);
                        return [2 /*return*/, passed(results)];
                    case 2:
                        e_1 = _b.sent();
                        logger.error(e_1);
                        return [2 /*return*/, failed(null)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CoworkersRepository.prototype.retrieveFindById = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _c, result, e_2;
            var id = _b.id;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, dbConfig.dbConn.query("select * from ".concat(this.TABLE_NAME, " where id = :id"), {
                                replacements: {
                                    id: id,
                                },
                            })];
                    case 1:
                        _c = _d.sent(), result = _c[0], _c[1];
                        return [2 /*return*/, passed(result[0])];
                    case 2:
                        e_2 = _d.sent();
                        logger.error(e_2);
                        return [2 /*return*/, failed(null)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CoworkersRepository.prototype.setData = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _c, metadata, e_3;
            var job = _b.job, name = _b.name, email = _b.email, isLeader = _b.isLeader;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, dbConfig.dbConn.query("insert into ".concat(this.TABLE_NAME, " (job, name, email, isLeader) values(:job,:name,:email,:isLeader)"), {
                                replacements: {
                                    job: job,
                                    name: name,
                                    email: email,
                                    isLeader: isLeader,
                                },
                            })
                            // success
                        ];
                    case 1:
                        _c = _d.sent(), _c[0], metadata = _c[1];
                        // success
                        if (metadata === 1) {
                            return [2 /*return*/, passed(null)];
                        }
                        return [2 /*return*/, failed(null)];
                    case 2:
                        e_3 = _d.sent();
                        logger.error(e_3);
                        return [2 /*return*/, failed(null)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CoworkersRepository.prototype.deleteById = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _c, result, e_4;
            var id = _b.id;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, dbConfig.dbConn.query("delete from ".concat(this.TABLE_NAME, " where id = :id"), {
                                replacements: {
                                    id: id,
                                },
                            })];
                    case 1:
                        _c = _d.sent(), result = _c[0], _c[1];
                        return [2 /*return*/, passed(result[0])];
                    case 2:
                        e_4 = _d.sent();
                        logger.error(e_4);
                        return [2 /*return*/, failed(null)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return CoworkersRepository;
}());
var coworkersRepository = new CoworkersRepository();

var coworkerSchemaParamas = Joi.object({
    id: Joi.number().optional(),
    job: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    isLeader: Joi.number().valid(0, 1),
});
var coworkerUserParams = Joi.object({
    id: Joi.number().required(),
});

var UrlParams;
(function (UrlParams) {
    UrlParams["COWERKERS"] = "/coworkers";
    UrlParams["COWORKERS_USER"] = "/coworkers/user";
})(UrlParams || (UrlParams = {}));
var CoWorkersCheckContrller = /** @class */ (function () {
    function CoWorkersCheckContrller() {
    }
    CoWorkersCheckContrller.prototype.initRoutes = function () {
        var r = Router();
        r.get(UrlParams.COWERKERS, this.getCoworkers);
        r.put(UrlParams.COWERKERS, schemaMiddleware(coworkerSchemaParamas), this.PutCoWorkers);
        r.get(UrlParams.COWORKERS_USER, schemaMiddleware(coworkerUserParams), this.getUserUseId);
        r.delete(UrlParams.COWERKERS, schemaMiddleware(coworkerUserParams), this.deleteUserUseId);
        return r;
    };
    CoWorkersCheckContrller.prototype.getCoworkers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, coworkersRepository.retrieve()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, OptionResponseReturn(users, res, function (res) { return res.status(200).json(users); }, function (res) { return res.status(500).json(users); })];
                }
            });
        });
    };
    CoWorkersCheckContrller.prototype.PutCoWorkers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var setData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, coworkersRepository.setData(req.body)];
                    case 1:
                        setData = _a.sent();
                        return [2 /*return*/, OptionResponseReturn(setData, res, function (res) { return res.status(200).json(setData); }, function (res) { return res.status(500).json(setData); })];
                }
            });
        });
    };
    CoWorkersCheckContrller.prototype.getUserUseId = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var getUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, coworkersRepository.retrieveFindById(req.body)];
                    case 1:
                        getUser = _a.sent();
                        return [2 /*return*/, OptionResponseReturn(getUser, res, function (res) { return res.status(200).json(getUser); }, function (res) { return res.status(500).json(getUser); })];
                }
            });
        });
    };
    CoWorkersCheckContrller.prototype.deleteUserUseId = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, coworkersRepository.deleteById(req.body)];
                    case 1:
                        deleteUser = _a.sent();
                        return [2 /*return*/, OptionResponseReturn(deleteUser, res, function (res) { return res.status(200).json(deleteUser); }, function (res) { return res.status(500).json(deleteUser); })];
                }
            });
        });
    };
    __decorate([
        apiDocument({
            url: UrlParams.COWERKERS,
            method: 'GET',
            description: 'get cowerkers list',
        })
    ], CoWorkersCheckContrller.prototype, "getCoworkers", null);
    __decorate([
        apiDocument({
            url: UrlParams.COWERKERS,
            method: 'PUT',
            description: 'update coworker user',
        })
    ], CoWorkersCheckContrller.prototype, "PutCoWorkers", null);
    __decorate([
        apiDocument({
            url: UrlParams.COWORKERS_USER,
            method: 'POST',
            description: 'get user use id',
        })
    ], CoWorkersCheckContrller.prototype, "getUserUseId", null);
    __decorate([
        apiDocument({
            url: UrlParams.COWERKERS,
            method: 'DELETE',
            description: 'delete user use id',
        })
    ], CoWorkersCheckContrller.prototype, "deleteUserUseId", null);
    return CoWorkersCheckContrller;
}());
var coworkerController = new CoWorkersCheckContrller();

var PORT = envConfig.getEnv().PORT;
var httpConnect = new HttpConnector(express(), PORT, envConfig.getEnv());
httpConnect
    .setConfigs(dbConfig)
    .setHTTPMiddleware(morgan('tiny'))
    .setHTTPMiddleware(express.json())
    .setHTTPMiddleware(express.urlencoded({ extended: false }))
    .setControllers([healthController, coworkerController])
    .setErrorHandling()
    .start(process.env.NODE_ENV === 'dev' ? false : true);
