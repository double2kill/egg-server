module.exports = {
  apps: [
    {
      name: "egg-server_web",
      port: "8000",
      exec_mode: "single", // 或者使用 "fork" 如果你希望应用在每个CPU核心上运行一个实例
      instances: undefined, // 由于使用了single模式，这里不需要设置instances
      script: "./.output/server/index.mjs",
    },
  ],
};
