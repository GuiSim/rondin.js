rondin.js
=========

### What is it?
A TypeScript and JavaScript library that provides basic logging facilities based on Google Chrome's _console_ object.

### Browser support
Developed for Chrome

Tested for Chrome

### Usage

1. Add rondin.js to your web page
2. Open Chrome's JavaScript console via *Menu > Tools > JavaScript console*
3. Add logging to your application

```js
    // Set default logging level. By default, only INFO messages are enabled on all loggers.
    Rondin.setDefaultLogLevel(LogLevel.TRACE)

    // Get a logger
    var logger = Rondin.get("RobinHood.js")
    
    // Use the various log levels
    logger.trace("Hello. This is TRACE.")
    logger.debug("Hello. This is DEBUG.")
    logger.info("Hello. This is INFO.")
    logger.warn("Hello. This is WARN.")
    logger.error("Hello. This is ERROR.")
    
    // Log full JSON objects
    var forest = {
      name: "Sherwood",
      size : { value: 423.2, unit: "hectares" },
      trees : ["Pine", "Oak", "Birch"]
    }
    
    logger.info("Entering the forest", forest);
  
    // Log using string formats
    var hero = "Robin Hood"
    logger.info("Hello %s!", hero) 
    
    // Change specific logger level
    var noisyLogger = Rondin.get("Nottingham.js")
    noisyLogger.level = LogLevel.OFF
    
    // Customize the style of the log output
    Rondin.DEBUG.style = "color:#CFB52B" // standard CSS
    logger.debug("Take this gold!")
```

## Console API documentation
https://developers.google.com/chrome-developer-tools/docs/console-api

## TODO

* Add date to logs
* Add layout customization
* Test on Firefox / Firebug
* Test on NodeJS
* Don't throw on other browsers
