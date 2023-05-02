const cors = require("cors");
const express = require("express");
const router = require("./router");
const logger = require("./logger");
const ZDBridge = require("./bridge");
const QXReceiverManager = require("./rcvrMgr");
const { readConfigSync } = require("./config");

const port = 6010;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.listen(port, () => {
    logger.debug(`App is listening on port ${port}.`);
    ZDBridge.getInstance().readLogFoler().then((rootDir) => {
        logger.debug('rootDir=', rootDir);
        const config = readConfigSync();
        if (config) {
            QXReceiverManager.getInstance().reload(config);
            QXReceiverManager.getInstance().forward(config);
        }
    }).catch((reason) => {
        logger.debug(reason);
    })
});
