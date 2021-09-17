/**
 * pm2 init simple 创建配置文件
 */
const chalk = require("chalk");
const path = require("path");
const { program } = require("commander");
const enhanceErrorMessages = require("../lib/enhanceErrorMessages");
const pkg = require("../package");
const cliName = "pm2-s";
const run = require("../lib/serialRun");
// 头命令
program.name(cliName).version(pkg.version).usage("<command> [options]");

program
  .command("start [ecosystem.config.js]")
  .action(async function (ecosystem) {
    console.log(ecosystem);
    let configPath;
    if (!ecosystem) {
      configPath = path.join(process.cwd(), "ecosystem.config.js");
    } else {
      configPath = path.join(process.cwd(), ecosystem);
    }
    try {
      const config = require(configPath);
      const runApps = await run(config.apps);
      console.log(
        chalk.green(`已启动服务: ${runApps.map((item) => item.name).join(",")}`)
      );
    } catch (err) {
      console.log(chalk.red(`配置文件 ${configPath} 不存在`));
    }
  });

// 增强 help
program.on("--help", () => {
  console.log();
  console.log(
    `  Run ${chalk.cyan(
      `${cliName} <command> --help`
    )} for detailed usage of given command.`
  );
  console.log();
});

// 其他命令
program.on("command:*", ([cmd]) => {
  program.outputHelp();
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}`));
  console.log();
  process.exitCode = 1;
});

// 解析命令行
program.parse(process.argv);

// 覆写错误函数
enhanceErrorMessages("missingArgument", (argName) => {
  return `Missing required argument ${chalk.yellow(`<${argName}>`)}.`;
});

enhanceErrorMessages("unknownOption", (optionName) => {
  return `Unknown option ${chalk.yellow(optionName)}.`;
});

enhanceErrorMessages("optionMissingArgument", (option, flag) => {
  return (
    `Missing required argument for option ${chalk.yellow(option.flags)}` +
    (flag ? `, got ${chalk.yellow(flag)}` : ``)
  );
});
