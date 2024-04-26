// const java = require("./modules/java");
// const linux = require("./modules/linux");

module.exports = {
    "/linux/": require("./modules/linux"),
    "/java/": require("./modules/java"),
    "/front/": require("./modules/front"),
    "/测试/": require("./modules/test"),
    "/计算机基础/": require("./modules/computeBase"),
    "/微服务/": require("./modules/microService"),
    "/其他/": require("./modules/other"),
    "/系统设计/": require("./modules/systemDesign"),
    "/中间件/": require("./modules/middleComponents"),
}