var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["TRACE"] = 100] = "TRACE";
    LogLevel[LogLevel["DEBUG"] = 200] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 300] = "INFO";
    LogLevel[LogLevel["WARN"] = 400] = "WARN";
    LogLevel[LogLevel["ERROR"] = 500] = "ERROR";
    LogLevel[LogLevel["OFF"] = 1000000] = "OFF";
})(LogLevel || (LogLevel = {}));

var Level = (function () {
    function Level(level, logFunction, style) {
        this.level = level;
        this.logFunction = logFunction;
        this.style = style;
    }
    return Level;
})();

var Logger = (function () {
    function Logger(name, level) {
        this.name = name;
        this.level = level;
    }
    Logger.prototype.log = function (message, level, objects) {
        if (this.level <= level.level) {
            var params = ["%c" + LogLevel[level.level] + " - " + message, level.style];
            params = params.concat(objects);
            level.logFunction(params);
        }
    };

    Logger.prototype.trace = function (message) {
        var objects = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            objects[_i] = arguments[_i + 1];
        }
        this.log(message, Logger.TRACE, objects);
    };

    Logger.prototype.debug = function (message) {
        var objects = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            objects[_i] = arguments[_i + 1];
        }
        this.log(message, Logger.DEBUG, objects);
    };

    Logger.prototype.info = function (message) {
        var objects = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            objects[_i] = arguments[_i + 1];
        }
        this.log(message, Logger.INFO, objects);
    };

    Logger.prototype.warn = function (message) {
        var objects = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            objects[_i] = arguments[_i + 1];
        }
        this.log(message, Logger.WARN, objects);
    };

    Logger.prototype.error = function (message) {
        var objects = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            objects[_i] = arguments[_i + 1];
        }
        this.log(message, Logger.ERROR, objects);
    };
    Logger.normalLog = function (objects) {
        return console.log.apply(console, objects);
    };
    Logger.warnLog = function (objects) {
        return console.warn.apply(console, objects);
    };
    Logger.errorLog = function (objects) {
        return console.error.apply(console, objects);
    };

    Logger.TRACE = new Level(LogLevel.TRACE, Logger.normalLog, "color:#AAA");
    Logger.DEBUG = new Level(LogLevel.DEBUG, Logger.normalLog, "");
    Logger.INFO = new Level(LogLevel.INFO, Logger.normalLog, "font-weight:bold");
    Logger.WARN = new Level(LogLevel.WARN, Logger.warnLog, "");
    Logger.ERROR = new Level(LogLevel.ERROR, Logger.errorLog, "");
    return Logger;
})();

var Rondin = (function () {
    function Rondin() {
    }
    Rondin.get = function (name) {
        if (!Rondin.loggers[name]) {
            Rondin.loggers[name] = new Logger(name, Rondin.defaultLogLevel);
        }
        return Rondin.loggers[name];
    };

    Rondin.setDefaultLogLevel = function (newDefaultLevel, applyToExistingLoggers) {
        if (typeof applyToExistingLoggers === "undefined") { applyToExistingLoggers = false; }
        Rondin.defaultLogLevel = newDefaultLevel;
        if (applyToExistingLoggers) {
            for (var loggerName in Rondin.loggers) {
                var logger = Rondin.loggers[loggerName];
                logger.level = Rondin.defaultLogLevel;
            }
        }
    };
    Rondin.loggers = {};
    Rondin.defaultLogLevel = LogLevel.INFO;
    return Rondin;
})();
