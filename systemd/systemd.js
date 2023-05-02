const path = require('path');
const fs = require('fs-extra');
const { execSync } = require('child_process');

(() => {
    const rootDir = '/usr/local/lib/qxdm-logger';
    const systemdService = `
        [Unit]
        After=network.target
        Description=qxdm-logger.service
        [Service]
        Environment=NODE_VERSION=16
        ExecStart=/root/.nvm/nvm-exec node ${path.join(rootDir, '/src/index.js')}
        Restart=on-failure
        [Install]
        WantedBy=multi-user.target
    `
    fs.writeFileSync('/etc/systemd/system/qxdm-logger.service', systemdService);
    execSync('systemctl daemon-reload');
    execSync('systemctl enable qxdm-logger.service');
    execSync('systemctl restart qxdm-logger.service');
    console.log('init system service success.');
})()
