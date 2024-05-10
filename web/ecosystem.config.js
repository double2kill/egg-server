module.exports = {
  apps: [
    {
      name: "egg-server_web",
      port: "8000",
      exec_mode: "cluster",
      instances: "max",
      script: "node ./.output/server/index.mjs",
    },
  ],
};
