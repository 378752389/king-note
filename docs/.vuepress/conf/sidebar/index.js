// const java = require("./modules/java");
// const linux = require("./modules/linux");

module.exports = {
    "/linux/": require("./modules/linux"),
    "/front/": require("./modules/front"),
    "/计算机基础/": require("./modules/computeBase"),
    "/微服务/": require("./modules/microService"),
    "/其他/": require("./modules/other"),
}