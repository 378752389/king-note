### 导入依赖

```xml
 <dependency>
     <groupId>io.springfox</groupId>
     <artifactId>springfox-boot-starter</artifactId>
     <version>3.0.0</version>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <spring-boot.version>2.6.11</spring-boot.version>
</dependency>

<!-- 可导可不导  -->
 <dependency>
     <groupId>org.springframework.boot</groupId>
     <artifactId>spring-boot-starter-actuator</artifactId>
     <spring-boot.version>2.6.11</spring-boot.version>
</dependency>
```



### yaml配置文件

```yaml
spring:
	mvc:
    	pathmatch:
      		matching-strategy: ant_path_matcher
```





### 服务编写

```java
@EnableOpenApi
@Slf4j
@Configuration
public class SwaggerConfig {

    private static final boolean SWAGGER_ENABLE = true;
    private static final String TRY_HOST = "localhost";

    @Bean
    @SneakyThrows
    public Docket createApi() {
        return new Docket(DocumentationType.OAS_30).pathMapping("/")

                // 定义是否开启swagger，false为关闭，可以通过变量控制
                .enable(SWAGGER_ENABLE)

                // 将api的元信息设置为包含在json ResourceListing响应中。
                .apiInfo(apiInfo())

                // 接口调试地址
                .host(TRY_HOST)

                // 选择哪些接口作为swagger的doc发布
                .select()
                .apis(RequestHandlerSelectors.any())
            	//.apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class))
                .paths(PathSelectors.any())
                .build()

                // 支持的通讯协议集合
                .protocols(new LinkedHashSet<>(Arrays.asList("https", "http")))

//                // 授权信息设置，必要的header token等认证信息
                .securitySchemes(securitySchemes())
//
//                // 授权信息全局应用
                .securityContexts(securityContexts());
    }

    /**
     * 设置授权信息
     */
    private List<SecurityScheme> securitySchemes() {
        ApiKey apiKey = new ApiKey("Authorization", "Authorization", In.HEADER.toValue());
        return Collections.singletonList(apiKey);
    }


    /**
     * 授权信息全局应用
     */
    private List<SecurityContext> securityContexts() {
        return Collections.singletonList(
                SecurityContext.builder()
                        .securityReferences(Collections.singletonList(new SecurityReference("Authorization", new AuthorizationScope[]{new AuthorizationScope("global", "全局认证")})))
                        .build()
        );
    }
    
	/**
     * 2.6.x 后 springboot 版本适配
     */
    @Bean
    public WebMvcEndpointHandlerMapping webEndpointServletHandlerMapping(
            WebEndpointsSupplier webEndpointsSupplier, ServletEndpointsSupplier servletEndpointsSupplier,
            ControllerEndpointsSupplier controllerEndpointsSupplier, EndpointMediaTypes endpointMediaTypes,
            CorsEndpointProperties corsProperties, WebEndpointProperties webEndpointProperties, Environment environment) {
        List<ExposableEndpoint<?>> allEndpoints = new ArrayList<>();
        Collection<ExposableWebEndpoint> webEndpoints = webEndpointsSupplier.getEndpoints();
        allEndpoints.addAll(webEndpoints);
        allEndpoints.addAll(servletEndpointsSupplier.getEndpoints());
        allEndpoints.addAll(controllerEndpointsSupplier.getEndpoints());
        String basePath = webEndpointProperties.getBasePath();
        EndpointMapping endpointMapping = new EndpointMapping(basePath);
        boolean shouldRegisterLinksMapping = webEndpointProperties.getDiscovery().isEnabled() &&
                (org.springframework.util.StringUtils.hasText(basePath) || ManagementPortType.get(environment).equals(ManagementPortType.DIFFERENT));
        return new WebMvcEndpointHandlerMapping(endpointMapping, webEndpoints, endpointMediaTypes, corsProperties.toCorsConfiguration(), new EndpointLinksResolver(allEndpoints, basePath), shouldRegisterLinksMapping, null);
    }


    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("auth4")
                .description("【接口文档接口】")
                .termsOfServiceUrl("https://www.wenking.com")
                .contact(new Contact("文金/wenking", "https://www.baidu.com", "378752389@qq.com"))
                .version("1.0.0")
                .build();
    }

}
```



### 常用注解

> 类

@Api: 作用在Controller类上，用来描述类信息

eg: @Api(tags = "招聘管理",description = "用于招聘模块的测试")



> 方法

@ApiOperation: 作用在Controller类的方法上，用来描述接口信息

eg: @ApiOperation(value = "简历的查询")



> 参数

@ApiImplicitParam : 作用在Controller类的方法上，用来描述接口的参数信息(单参)

@ApilmplicitParams: 作用在Controller类的方法上，用来描述接口的参数信息(多参)

@ApiParam:  作用在方法的参数上，用来描述接口的参数信息(一个参设置一个)



> 实体类

@ApiModel：作用在实体类上

@ApiModelProperty：作用在实体类的属性上