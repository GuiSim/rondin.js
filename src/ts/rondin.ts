
enum LogLevel {
	TRACE = 100,
	DEBUG = 200,
	INFO = 300,
	WARN = 400,
	ERROR = 500,
	OFF = 1000000 // Arbitrarly large integer
}

class Level {
	constructor(public level:LogLevel, 
				public logFunction:(objects:any[]) => void, 
				public style:string) {
		
	}
}

class Logger {

	 static normalLog = (objects:any[]) =>	console.log.apply(console, objects);	
	 static warnLog = (objects:any[]) =>	console.warn.apply(console, objects);	
	 static errorLog = (objects:any[]) =>	console.error.apply(console, objects);
	
	 static TRACE = new Level(LogLevel.TRACE, Logger.normalLog,"color:#AAA");
	 static DEBUG = new Level(LogLevel.DEBUG, Logger.normalLog,"");
	 static INFO = new Level(LogLevel.INFO, Logger.normalLog,"font-weight:bold");
	 static WARN = new Level(LogLevel.WARN, Logger.warnLog, "");
	 static ERROR = new Level(LogLevel.ERROR, Logger.errorLog, "");
	 
	 constructor(public name: string, public level:LogLevel){
		 
	 }
	 
	 log(message:string, level:Level, objects:any[]) {
		 if (this.level <= level.level) {
			 var params = ["%c" + LogLevel[level.level] + " - " + message, level.style];
			 params = params.concat(objects);
			 level.logFunction(params)
		 }
	 }
	 
	 trace(message:string, ...objects:any[]) {
		 this.log(message, Logger.TRACE, objects);
	 }
	 
	 debug(message:string, ...objects:any[]) {
		 this.log(message, Logger.DEBUG, objects);
	 }
	 
	 info(message:string, ...objects:any[]) {
		 this.log(message, Logger.INFO, objects);
	 }
	 
	 warn(message:string, ...objects:any[]) {
		 this.log(message, Logger.WARN, objects);
	 }
	 
	 error(message:string, ...objects:any[]) {
		 this.log(message, Logger.ERROR, objects);
	 }
}

class Rondin {
	 private static loggers: { [name:string]: Logger} = {};
	 private static defaultLogLevel: LogLevel = LogLevel.INFO; 
	
 	 static get(name:string) {
		if (!Rondin.loggers[name]) {
			Rondin.loggers[name] = new Logger(name, Rondin.defaultLogLevel);
		}
		return Rondin.loggers[name];
	}
	
	static setDefaultLogLevel(newDefaultLevel:LogLevel, applyToExistingLoggers:boolean = false) {
		
		Rondin.defaultLogLevel = newDefaultLevel;
		if (applyToExistingLoggers) {
			for (var loggerName in Rondin.loggers) {
				var logger:Logger = Rondin.loggers[loggerName];
				logger.level = Rondin.defaultLogLevel;
			}
		}
	}
}