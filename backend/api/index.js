"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const app_1 = require("../src/app");
const prisma_1 = require("../src/lib/prisma");
let appPromise = null;
async function getApp() {
    if (!appPromise) {
        appPromise = (async () => {
            await (0, prisma_1.connectDatabase)();
            return (0, app_1.createApp)();
        })();
    }
    return appPromise;
}
async function handler(req, res) {
    const app = await getApp();
    return app(req, res);
}
//# sourceMappingURL=index.js.map