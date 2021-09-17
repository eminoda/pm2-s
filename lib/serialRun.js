// module.exports = {
//   apps: [
//     {
//       name: "app1",
//       script: "./app.js",
//       env_production: {
//         NODE_ENV: "production",
//       },
//       env_development: {
//         NODE_ENV: "development",
//       },
//     },
//   ],
// };
const pm2 = require("pm2");

const isStarted = (appName) => {
  return new Promise((resolve, reject) => {
    pm2.list((err, list) => {
      if (!err) {
        const _isExist = list.filter((item) => item.name == appName);
        resolve(_isExist.length > 0);
        return;
      }
      reject(err);
    });
  });
};

const pm2Start = (config) => {
  return new Promise((resolve, reject) => {
    pm2.start(config, (err, apps) => {
      if (err) {
        reject(err);
      } else {
        resolve(apps[0].pm2_env);
      }
    });
  });
};

const runApps = [];
const run = (apps = []) => {
  let i = 0;
  const dispatch = async (i) => {
    try {
      if (i < apps.length) {
        const pm2_env = await pm2Start(apps[i]);
        runApps.push(pm2_env);
        i++;
        return dispatch(i);
      }
      pm2.disconnect();
      return runApps;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
    }
  };
  return dispatch(i);
};

module.exports = run;
