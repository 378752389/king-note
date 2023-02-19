### 导入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- https://mvnrepository.com/artifact/org.springframework.security/spring-security-oauth2-authorization-server -->
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-oauth2-authorization-server</artifactId>
    <version>0.3.1</version>
</dependency>
```



### 服务编写



#### config

```java
@Configuration
public class SecurityConfig {

    @Autowired
    private DemoAuthenticationProvider demoAuthenticationProvider;

    @Bean
    public SecurityFilterChain authenticationChain(HttpSecurity http) throws Exception {

        // 表单登录
        http.formLogin();
        // csrf 禁用， 系统采用验证码模式
        http.csrf().disable();
        http.headers().frameOptions().disable();

        // 认证处理器
        http.authenticationProvider(demoAuthenticationProvider);

        // 放行接口
        http.authorizeHttpRequests(authorize -> authorize
                .antMatchers("/demo/public", "/captcha").permitAll()
                .anyRequest().authenticated());
//                .anyRequest().permitAll());


        DefaultSecurityFilterChain chain = http.build();
        return chain;
    }
    
    @Bean
    public DemoUserDetailService demoPasswordEncoder() {
        return new DemoUserDetailService();
    }
}
```



#### oauth2 config

```java
@Configuration
public class Oauth2Config {

    @Autowired
    private DemoPasswordEncoder demoPasswordEncoder;

    private static final String LICENSE = "http://www.wenking.com";

    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public SecurityFilterChain authorizationChain(HttpSecurity http) throws Exception {

        OAuth2AuthorizationServerConfigurer<HttpSecurity> oauth2 = new OAuth2AuthorizationServerConfigurer<>();
        http.apply(oauth2);

        oauth2.registeredClientRepository(registeredClientRepository());
        oauth2.providerSettings(ProviderSettings.builder().issuer(LICENSE).build());

        RequestMatcher endpointsMatcher = oauth2.getEndpointsMatcher();
        http.requestMatcher(endpointsMatcher);
        http.csrf().disable();
        http.headers().frameOptions().disable();

        DefaultSecurityFilterChain chain = http.build();
        return chain;
    }


    @Bean
    public RegisteredClientRepository registeredClientRepository() {
        RegisteredClient app01 = RegisteredClient.withId("app01")
                .clientId("app01-cid")
                .clientName("app01-cn")
                .clientSecret(demoPasswordEncoder.encode("123"))
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .redirectUri("http://127.0.0.1:8080/authorize/callback")
                .scope("app01-article")
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
                .tokenSettings(TokenSettings.builder().accessTokenFormat(OAuth2TokenFormat.REFERENCE).build())
//                配置 consent page
//                .clientSettings(ClientSettings.builder().requireAuthorizationConsent(true).build())
                .build();

        InMemoryRegisteredClientRepository repository = new InMemoryRegisteredClientRepository(app01);

        return repository;
    }
}
```



#### endpoint callback

```java
@RestController
public class DemoTokenCallBackEndPoint {

    // 表单登录认证           get
    // http://127.0.0.1:8080/login

    // 表单登录认证           get
    // http://127.0.0.1:8080/oauth2/authorize?response_type=code&client_id=app01-cid&redirect_uri=http://127.0.0.1:8080/authorize/callback&scope=app01-article

    // refresh_token请求    post
    // http://127.0.0.1:8080/oauth2/token?grant_type=refresh_token&scope=app01-article&refresh_token=tBeVxg1lOPoskaaOxftCnhnc23UctOW8vRjIK78_QRT1115KVm_OecyKeHNVUa8XEQ1YqcV_oC5I7Jx44oJzJQRFxm3S8lxRTw45o0c2lS6SAANmZdJQr0RdWgPMzIcI

    // access_token请求     post
    // http://127.0.0.1:8080/oauth2/token?client_id=app01-cid&code=asd&grant_type=authorization_code&redirect_uri=http://127.0.0.1:8080/authorize/callback

    @Autowired
    private RestTemplate restTemplate;

    private static final String TOKEN_URL = "http://127.0.0.1:8080/oauth2/token";

    private static final String CALLBACK_URL = "http://127.0.0.1:8080/authorize/callback";


    @GetMapping("/authorize/callback")
    public String authorizeCallBack(@RequestParam("code") String code) {
        System.out.println("获取的授权码为 : ".concat(code));

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", "app01-cid");
        params.add("code", code);
        params.add("redirect_uri", CALLBACK_URL);
        params.add("grant_type", "authorization_code");

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Basic YXBwMDEtY2lkOjEyMw==");

        HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(params, headers);

        // 发送请求
        ResponseEntity<String> request = restTemplate.postForEntity(TOKEN_URL, httpEntity, String.class);
        String body = request.getBody();

//        OAuth2RefreshTokenAuthenticationProvider

        System.out.println(body);
        return body;
    }
}

```

