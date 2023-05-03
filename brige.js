const path = require('path');
const dgram = require("dgram");
const logger = require("./logger");
const { parse_args } = require("./parseArgs");

const LOG_SERVER_PORT = 8900;
const STATS_SERVER_PORT = 8812;
const SERVER_HOST = 'localhost';
const GET_ROOT_DIR = Buffer.from("ping");
const READ_ROOT_TIMEOUT = 10 * 1000;
const READ_ROOT_INTERVAL = 1 * 1000;

const { DEBUG_MODE } = parse_args();

class ZDBridge {

    constructor() {
        this.server = dgram.createSocket("udp4");
        this.server.on('message', (msg, rinfo) => {
            switch (msg) {
                case 'subscribe':
                    this.subscriber = rinfo;
                    logger.debug(`subscribe: ${msg}`);
                    break;
                case 'unsubscribe':
                    this.subscriber = null;
                    logger.debug(`unsubscribe: ${msg}`);
                    break;
            }
        });
        this.server.bind(STATS_SERVER_PORT);
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new ZDBridge();
        }
        return this.instance;
    }

    getLogFolder() {
        return this.rootDir;
    }

    readLogFoler() {
        return new Promise((resolve, reject) => {
            if (DEBUG_MODE) {
                this.rootDir = path.join(__dirname, '../logs');
                resolve(this.rootDir);
            } else {
                const client = dgram.createSocket("udp4");
                client.on("message", (buffer) => {
                    const length = buffer.readUInt16BE(2);
                    this.rootDir = buffer.toString("utf8", 24, 24 + length).replace("\u0000", "");
                    if (this.rootDir) {
                        clearInterval(readDirHandler);
                        clearTimeout(timeoutHandler);
                        resolve(this.rootDir);
                    }
                });
                const timeoutHandler = setTimeout(() => {
                    clearInterval(readDirHandler);
                    reject('read trace root dir timeout');
                }, READ_ROOT_TIMEOUT);
                const readDirHandler = setInterval(() => {
                    client.send(GET_ROOT_DIR, LOG_SERVER_PORT, SERVER_HOST);
                }, READ_ROOT_INTERVAL);
                client.send(GET_ROOT_DIR, LOG_SERVER_PORT, SERVER_HOST);
            }
        })
    }

    sendStatistics(portType, portId, length) {
        if (this.server && this.subscriber) {
            const buffer = Buffer.alloc(2 + 2 + 4);
            buffer.writeUInt16LE(portType, 0);
            buffer.writeUInt16LE(portId, 2);
            buffer.writeUInt32LE(length, 4);
            this.server.send(buffer, this.subscriber.port, this.subscriber.address);
        }
    }

    packPayload(portType, portId, payload) {
        const header = Buffer.alloc(4 + 4 + 1 + 1 + 4);
        const timestamp = Date.now();
        const hights = Math.floor(timestamp / 1000);
        const lowts = (timestamp % 1000) * Math.pow(10, 5);
        const length = payload.length;
        header.writeUInt32BE(hights);
        header.writeUInt32BE(lowts, 4);
        header.writeUInt8(portType, 8);
        header.writeUInt8(portId, 9);
        header.writeUInt32BE(length, 10);
        return Buffer.concat([header, payload]);
    }

}

module.exports = ZDBridge;





