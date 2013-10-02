enum LogLevel  {
    TRACE = 100,
    DEBUG = 200,
    INFO = 300,
    WARN = 400,
    ERROR = 500,
    OFF = 1000000 // Arbitrary large integer
}

class Level {
    constructor(public level: LogLevel,
        public logFunction: (objects: any[]) = > void,
        public style: string) {

    }
}

class Logger {
    constructor(public name: string, public level: LogLevel) {

    }

    log(message: string, level: Level, objects: any[]) {
        if (this.level <= level.level) {
            var params = ["%c" + LogLevel[level.level] + " - " + message, level.style];
            params = params.concat(objects);
            level.logFunction(params)
        }
    }

    trace(message: string, ...objects: any[]) {
        this.log(message, Rondin.TRACE, objects);
    }

    debug(message: string, ...objects: any[]) {
        this.log(message, Rondin.DEBUG, objects);
    }

    info(message: string, ...objects: any[]) {
        this.log(message, Rondin.INFO, objects);
    }

    warn(message: string, ...objects: any[]) {
        this.log(message, Rondin.WARN, objects);
    }

    error(message: string, ...objects: any[]) {
        this.log(message, Rondin.ERROR, objects);
    }
}

class Rondin {
    static normalLog = (objects: any[]) = > console.log.apply(console, objects);
    static warnLog = (objects: any[]) = > console.warn.apply(console, objects);
    static errorLog = (objects: any[]) = > console.error.apply(console, objects);

    static TRACE = new Level(LogLevel.TRACE, Rondin.normalLog, "color:#AAA");
    static DEBUG = new Level(LogLevel.DEBUG, Rondin.normalLog, "");
    static INFO = new Level(LogLevel.INFO, Rondin.normalLog, "font-weight:bold");
    static WARN = new Level(LogLevel.WARN, Rondin.warnLog, "");
    static ERROR = new Level(LogLevel.ERROR, Rondin.errorLog, "");

    private static loggers: {[name: string]: Logger} = {};
    private static defaultLogLevel: LogLevel = LogLevel.INFO;

    static get(name: string) {
        if (!Rondin.loggers[name]) {
            Rondin.loggers[name] = new Logger(name, Rondin.defaultLogLevel);
        }
        return Rondin.loggers[name];
    }

    static setDefaultLogLevel(newDefaultLevel: LogLevel, applyToExistingLoggers: boolean = false) {

        Rondin.defaultLogLevel = newDefaultLevel;
        if (applyToExistingLoggers) {
            for (var loggerName in Rondin.loggers) {
                var logger: Logger = Rondin.loggers[loggerName];
                logger.level = Rondin.defaultLogLevel;
            }
        }
    }
}
