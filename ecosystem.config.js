module.exports = {
  apps: [
    {
      name: "ng-ingenieria",
      script: "npm",
      args: "start",
      cwd: "/home/ng/public_html/ng-ingenieria", // Update this path on the server
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      error_file: "/var/log/pm2/ng-ingenieria-error.log",
      out_file: "/var/log/pm2/ng-ingenieria-out.log",
      log_file: "/var/log/pm2/ng-ingenieria.log",
      time: true,
    },
  ],
};
