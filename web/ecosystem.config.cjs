module.exports = {
  apps: [
    {
      name: "egg-server_web",
      script: "./.output/server/index.mjs", // 应用程序的入口文件路径
      exec_mode: "fork", // 运行模式，这里使用fork模式
      instances: 1, // 实例数，根据需要设置
      watch: false, // 是否监视文件变化并重启应用
      max_memory_restart: "100M", // 当应用使用内存超过100M时重启
      env: {
        PORT: 8000, // 设置环境变量，指定端口号
      },
      env_production: {
        // 生产环境的配置，可以在这里覆盖默认设置
      },
    },
  ],
};
