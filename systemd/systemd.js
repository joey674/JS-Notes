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
    fs.writeFileSync('/etc/systemd/system/qxdm-logger.service', systemdService);//把配置文件写进systemd的配置文件文件夹
    execSync('systemctl daemon-reload');//重新加载systemd的配置文件 
    execSync('systemctl enable qxdm-logger.service');//在systemd下开启service 这里接下来会执行上面systemdService变量中的内容作为service运行内容
    execSync('systemctl restart qxdm-logger.service');
    console.log('init system service success.');
})()
//(()=>{})()  是一个作用域 相当于{}；意思就是说不在外面定义全局变量造成污染。通常情况下写完js暴露一个接口也是这样。
