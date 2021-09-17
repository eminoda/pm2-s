const { program } = require("commander");
var enhanceErrorMessages = (methodName, log) => {
  program.Command.prototype[methodName] = function (...args) {
    if (methodName === "unknownOption" && this._allowUnknownOption) {
      return;
    }
    this.outputHelp();
    console.log(`  ` + chalk.red(log(...args)));
    console.log();
    process.exit(1);
  };
};

module.exports = enhanceErrorMessages;
