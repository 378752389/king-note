---
title: 验证码
---
### 导入依赖

```xml
<!-- https://mvnrepository.com/artifact/com.github.penggle/kaptcha -->
<dependency>
    <groupId>com.github.penggle</groupId>
    <artifactId>kaptcha</artifactId>
    <version>2.3.2</version>
    <exclusions>
        <exclusion>
            <artifactId>javax.servlet-api</artifactId>
            <groupId>javax.servlet</groupId>
        </exclusion>
    </exclusions>
</dependency>
```



### 服务编写

```java
@Configuration
public class CaptchaConfig {

    @Bean(name = "captchaProducer")
    public DefaultKaptcha getCaptchaBean() {
        Properties properties = new Properties();
        //图片边框
        properties.setProperty("kaptcha.border", "no");
        //文本集合，验证码值从此集合中获取
        properties.setProperty("kaptcha.textproducer.char.string", "ABCDEGHJKLMNRSTUWXY23456789");
        //字体颜色
        properties.setProperty("kaptcha.textproducer.font.color", "0,84,144");
        //干扰颜色
        properties.setProperty("kaptcha.noise.color", "0,84,144");
        //字体大小
        properties.setProperty("kaptcha.textproducer.font.size", "30");
        //背景颜色渐变，开始颜色
        properties.setProperty("kaptcha.background.clear.from", "247,255,234");
        //背景颜色渐变，结束颜色
        properties.setProperty("kaptcha.background.clear.to", "247,255,234");
        //图片宽
        properties.setProperty("kaptcha.image.width", "125");
        //图片高
        properties.setProperty("kaptcha.image.height", "35");
        properties.setProperty("kaptcha.session.key", "code");
        //验证码长度
        properties.setProperty("kaptcha.textproducer.char.length", "4");
        //字体
        properties.setProperty("kaptcha.textproducer.font.names", "Arial, Courier");
        Config config = new Config(properties);
        DefaultKaptcha defaultKaptcha = new DefaultKaptcha();
        defaultKaptcha.setConfig(config);
        return defaultKaptcha;
    }

}
```







```java
@RestController
public class DemoAuthenticationEndpoint {

    @Autowired
    private Producer captchaProducer;

    /**
     * 加载图形验证码
     */
    @GetMapping("/captcha")
    public void getCaptchaImage(HttpServletRequest request, HttpServletResponse response) throws Exception {
        HttpSession session = request.getSession();
        // 获取验证码
        //    String code = (String) session.getAttribute(Constants.KAPTCHA_SESSION_KEY);
        //    String code = (String) session.getAttribute("Kaptcha_Code");
        // 清除浏览器的缓存
        response.setDateHeader("Expires", 0);
        // Set standard HTTP/1.1 no-cache headers.
        response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
        // Set IE extended HTTP/1.1 no-cache headers (use addHeader).
        response.addHeader("Cache-Control", "post-check=0, pre-check=0");
        // Set standard HTTP/1.0 no-cache header.
        response.setHeader("Pragma", "no-cache");
        // return a jpeg
        response.setContentType("image/jpeg");
        // 浏览器记忆功能-----当前过浏览器和服务器交互成功以后下载的图片和资源会进行缓存一次。下次刷新的时候就不会在到服务器去下载。


        // 获取KAPTCHA验证的随机文本
        String capText = captchaProducer.createText();
        BufferedImage bi = captchaProducer.createImage(capText);
//
//        // 将生成好的图片放入会话中
        session.setAttribute(Constants.KAPTCHA_SESSION_KEY, capText);

        // 生成uuid和capText 一一对应关系进行验证
//        String uuid = UUID.randomUUID().toString();
//        String capText = kaptchaCacheUtil.getKaptchaText(uuid);
//        BufferedImage bi = kaptchaCacheUtil.createImage(capText);
        ServletOutputStream out = response.getOutputStream();
        // write the data out
        ImageIO.write(bi, "jpg", out);
        try {
            out.flush();
        } finally {
            out.close();//关闭
        }
    }
}

```

