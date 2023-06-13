---
title: 整合swagger3
permalink: /java/spring/swagger
---


## 导入依赖
```xml
 <dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-boot-starter</artifactId>
    <version>3.0.0</version>
</dependency>
```


## 编写java配置代码
```java
@Configuration
public class SwaggerConfig {



    @Bean
    public Docket createRestApi(){
        //Docket: 摘要对象，通过对象配置 描述文件的信息
        Docket docket = new Docket(DocumentationType.SWAGGER_2);
        docket.apiInfo(myApiInfo())
                //select()：返回ApiSelectorBuilder对象，通过对象调用build()可以创建Docket对象
                .select()
                // 指定要扫描/维护接口文档的包（否则就全部扫描）
                .apis(RequestHandlerSelectors.basePackage("com.king.controller"))
                // 路径过滤：该Docket-UI展示时，只展示指定路径下的接口文档(any表示都展示)
                .paths(PathSelectors.any())
                .build().enable(true);
        return docket;
    }

    // 接口文档的概要信息，返回ApiInfo对象
    private ApiInfo myApiInfo(){
        //标题
        String title = "PORTAL系统接口文档";
        //简单描述
        String description = "PORTAL系统接口文档";
        //版本
        String version = "V1.0.0";
        // url接口路径前缀
        String termsOfServiceUrl = "/";
        //作者信息
        Contact contact = new Contact("wenking", "https://378752389.github.io/king-note/", "1234567890@qq.com");
        //协议
        String license = "The Apache License";
        //协议url
        String licenseUrl = "https://wwww.baidu.com";

        ApiInfo apiInfo =  new ApiInfoBuilder()
                .title(title)
                .description(description)
                .version(version)
                .termsOfServiceUrl(termsOfServiceUrl)
                .contact(contact)
                .license(license)
                .licenseUrl(licenseUrl)
                .build();
        return apiInfo;
    }


    /**
     * 解决高版本 springboot 整合 swagger 出现的空指针异常 问题 
     * @return
     */
    @Bean
    public BeanPostProcessor generateBeanPostProcessor() {
        return new BeanPostProcessor() {

            @Override
            public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
                if (bean instanceof WebMvcRequestHandlerProvider || bean instanceof WebFluxRequestHandlerProvider) {
                    customizeSpringfoxHandlerMappings(getHandlerMappings(bean));
                }
                return bean;
            }

            private <T extends RequestMappingInfoHandlerMapping> void customizeSpringfoxHandlerMappings(List<T> mappings) {
                List<T> copy = mappings.stream()
                        .filter(mapping -> mapping.getPatternParser() == null)
                        .collect(Collectors.toList());
                mappings.clear();
                mappings.addAll(copy);
            }

            @SuppressWarnings("unchecked")
            private List<RequestMappingInfoHandlerMapping> getHandlerMappings(Object bean) {
                try {
                    Field field = ReflectionUtils.findField(bean.getClass(), "handlerMappings");
                    field.setAccessible(true);
                    return (List<RequestMappingInfoHandlerMapping>) field.get(bean);
                } catch (IllegalArgumentException | IllegalAccessException e) {
                    throw new IllegalStateException(e);
                }
            }
        };
    }

}
```


## 修改配置文件
```yaml
spring:
  mvc:
    pathmatch:
      matching-strategy: ant_path_matcher
```



## 整合 springsecurity 

需要放行swagger相关的静态文件

```java
@Configuration
public class SecurityConfig {
    
    @Bean
    public DefaultSecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        DefaultSecurityFilterChain chain = http
                .cors().and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/swagger-ui.html",
                        "/swagger-ui/*",
                        "/swagger-resources/**",
                        "/v2/api-docs",
                        "/v3/api-docs",
                        "/webjars/**").permitAll()
                .anyRequest().authenticated().and()
                .build();
        
        return chain;
    }
    
}

```

## 整合 springmvc 问题

springboot 新版本推荐使用 `WebMvcConfigurationSupport` , 放弃了之前的 `WebMvcConfigurerAdapter`, 但在整合 swagger 的时候访问 `/swagger-ui/`
出现 404， 原因是 swagger 使用的旧版本的 `WebMvcConfigurerAdapter` 配置静态资源，因此需要重新配置

```java
@Configuration
public class WebMvcConfig extends WebMvcConfigurationSupport {
    
    /**
     * 配置swagger静态资源路径
     * http://localhost:8080/swagger-ui/index.html
     * @param registry
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/swagger-ui/**").addResourceLocations("classpath:/META-INF/resources/webjars/springfox-swagger-ui/");
    }

}
```

## swagger 接口访问 token 认证


```java
@Configuration
public class SwaggerConfig {


    @Bean
    public Docket createRestApi() {
        //Docket: 摘要对象，通过对象配置 描述文件的信息
        Docket docket = new Docket(DocumentationType.SWAGGER_2);
        docket.apiInfo(myApiInfo())
                //select()：返回ApiSelectorBuilder对象，通过对象调用build()可以创建Docket对象
                .select()
                // 指定要扫描/维护接口文档的包（否则就全部扫描）
                .apis(RequestHandlerSelectors.basePackage("com.king.controller"))
                // 路径过滤：该Docket-UI展示时，只展示指定路径下的接口文档(any表示都展示)
                .paths(PathSelectors.any())
                .build()
                .securitySchemes(securitySchemes())
                .securityContexts(securityContexts());
        return docket;
    }
    
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
                        .securityReferences(
                                Collections.singletonList(new SecurityReference("Authorization", new AuthorizationScope[]{new AuthorizationScope("global", "全局认证")}))
                        ).build()
        );
    }
    
}
```


## 常用注解

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
