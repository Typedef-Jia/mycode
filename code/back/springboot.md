# spring boot 常用的代码片段

<ArticleMetadata />

### SpringBoot+Maven多模块项目（创建、依赖、打包可执行jar包部署测试）完整流程
::: details 点我查看代码
>模板下载链接：[点击下载代码](https://wwsx.lanzouw.com/iU0Fj28vq8ja "超链接title")

>github链接： [代码](https://github.com/JiaShuaikai/springboot-multi-module.git "超链接title")
***
工程结构：

父工程father

子模块 dao （用于持久化数据跟数据库交互）

子模块 entity （实体类）

子模块 service （处理业务逻辑）

子模块 web （页面交互接收、传递数据，唯一有启动类的模块）

关系： web依赖 service、dao、entity

service依赖 dao、entity

dao依赖 entity

entity谁都不依赖，独立的

***
**一、创建Maven多模块项目**
>1. 先建立外层父工程 File →new →project 选择Spring Initializr Next下一步到以下页面
>2. 接下来，把src整个删掉，父工程不需要，因为父工程你就当它只有一个外壳就完了
>3. 接下来创建子模块 工程上右键 → new → Module 选择Spring Initaializr 下一步
>4. 重复以上动作，创建dao模块，service模块，web模块
>5. service模块和entity模块一样什么都不需要引入
>6. dao模块和web模块可以根据实际需求选择引入mysql，mybatis，redis，web这些，
>7. 删除每个子模块中没用的文件，.mvn、.gitignore、daoiml、mvnw、mvnw.cmd文件只留下pom.xml
>8. 删除除了web模块以外其它模块中的Applicatin启动项，和resources目录下的application.properties配置文件

**以上动作操作完成以后如果你发现你的子模块变成了文件夹，没关系，找到Maven Projects刷新一下就好了**

整理过后的项目结构是这样的
![图片alt](https://pic.imgdb.cn/item/66d3d7e0d9c307b7e9ec9afe.webp)
***
**二、依赖关系**
>打开父pom.xml修改打包方式jar为pom，注意：build内容也需要做替换，因为默认的spring-boot-maven-plugin这种方式，等到后期打包的时候他会一直提示你，你引入的依赖不存在！代码如下
```java
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="Maven - Page Not Found" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="Maven - Page Not Found http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <!--父pom.xml-->
    <groupId>com.miu</groupId>
    <artifactId>father</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>pom</packaging>
 
    <name>father</name>
    <description>Demo project for Spring Boot</description>
 
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.0.4.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
 
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.8</java.version>
    </properties>
 
    <!--声明你有四个儿子 -->
    <modules>
        <module>entity</module>
        <module>dao</module>
        <module>service</module>
        <module>web</module>
    </modules>
 
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
 
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
 
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.1</version>
                <configuration>
                    <source>${java.version}</source>
                    <target>${java.version}</target>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>2.19.1</version>
                <configuration>
                    <skipTests>true</skipTests>    <!--默认关掉单元测试 -->
                </configuration>
            </plugin>
        </plugins>
    </build>
 
</project>
```
>这里有个坑需要注意，dao、service、entity这三个模块的pom.xml文件中不需要build 内容，直接干掉

>entity 的 pom.xml 内容
```java
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="Maven - Page Not Found" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="Maven - Page Not Found http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.miu</groupId>
    <artifactId>entity</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>jar</packaging>
    <name>entity</name>
    <description>Demo project for Spring Boot</description>
    <!--声明父模块-->
    <parent>
        <groupId>com.miu</groupId>
        <artifactId>father</artifactId>
        <version>0.0.1-SNAPSHOT</version>
        <relativePath>../pom.xml</relativePath>
    </parent>
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```
>dao 的 pom.xml 内容
```java
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="Maven - Page Not Found" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="Maven - Page Not Found http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <!--dao 模块 pom.xml-->
    <groupId>com.miu</groupId>
    <artifactId>dao</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>jar</packaging>
    <name>dao</name>
    <description>Demo project for Spring Boot</description>
    <!--声明父模块-->
    <parent>
        <groupId>com.miu</groupId>
        <artifactId>father</artifactId>
        <version>0.0.1-SNAPSHOT</version>
        <relativePath>../pom.xml</relativePath>
    </parent>
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>1.3.2</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <!--dao 模块 引入entity模块-->
        <dependency>
            <groupId>com.miu</groupId>
            <artifactId>entity</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
    </dependencies>
</project>
```
>service 模块的 pom.xml 内容
```java
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="Maven - Page Not Found" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="Maven - Page Not Found http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
 
    <groupId>com.miu</groupId>
    <artifactId>service</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>jar</packaging>
 
    <name>service</name>
    <description>Demo project for Spring Boot</description>
    <!--声明父模块-->
    <parent>
        <groupId>com.miu</groupId>
        <artifactId>father</artifactId>
        <version>0.0.1-SNAPSHOT</version>
        <relativePath>../pom.xml</relativePath>
    </parent>
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <!--service模块 引入entity模块-->
        <dependency>
            <groupId>com.miu</groupId>
            <artifactId>entity</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
        <!--service模块 引入dao模块-->
        <dependency>
            <groupId>com.miu</groupId>
            <artifactId>dao</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
    </dependencies>
</project>
```
>web模块的 pom.xml 内容

**注意build部分，因为web模块作为程序的入口启动，所以它需要打包，并且要指定Main Class**

```java
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="Maven - Page Not Found" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="Maven - Page Not Found http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.miu</groupId>
    <artifactId>web</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>jar</packaging>
    <name>web</name>
    <description>Demo project for Spring Boot</description>
    <!--声明父模块-->
    <parent>
        <groupId>com.miu</groupId>
        <artifactId>father</artifactId>
        <version>0.0.1-SNAPSHOT</version>
        <relativePath>../pom.xml</relativePath>
    </parent>
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>1.3.2</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <!--web模块 引入entity模块-->
        <dependency>
            <groupId>com.miu</groupId>
            <artifactId>entity</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
        <!--web模块 引入service模块-->
        <dependency>
            <groupId>com.miu</groupId>
            <artifactId>service</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
        <!--web模块 引入dao模块-->
        <dependency>
            <groupId>com.miu</groupId>
            <artifactId>dao</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <!-- 指定该Main Class为全局的唯一入口 -->
                    <mainClass>com.miu.web.WebApplication</mainClass>
                    <layout>ZIP</layout>
                </configuration>
                <executions>
                    <execution>
                        <goals>
                            <!--可以把依赖的包都打包到生成的Jar包中-->
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>
```
**最后把web模块中的application.properties文件补充一下就OK了，因为引入了mysql，redis等配置，所以数据源是要配的，不然运行起来会报错找不到数据源！**
***
三、打包可执行jar
**看到上面的页面就证明模块之间的依赖没有问题，调用正常，我这里是用简单的创建对象的这种方式来操作的，实际开发并不是这种操作，大部分都是通过 @Autowired 注解 来实现的注入，这里我就不做演示了，只要模块之间调用没问题，剩下的就是铺代码的事了，接下来还有最后一个打包问题，为什么要啰嗦那么多还要说打包问题呢，因为我建议在项目架构之初，除了搭框架以外，最好是在最开始的时候就测试一下打包，尤其是这种多模块项目之间各种依赖的这种工程的打包，如果等你代码写的铺天盖地的时候你在去想怎么打包，到时候有你头疼的！如果你是按照我本章的流程一步步下来的话，那么你完全不用担心打包问题，因为所有的pom.xml有已经配置好了，只需要动手运行 package打包动作就行了，第一次打包不需要clean，记住以后每次打包之前clean一下，关于为什么打jar包，不打war包这个问题，还有其它会遇到的问题，在文章最后会做说明！**
![图片alt](https://pic.imgdb.cn/item/66d3dc19d9c307b7e9efd2b4.webp)
**双击运行package，看到BUILD SUCCESS 就证明打包成功了，如此简单？告诉你就是这么简单，前提是你的每一个模块下的pom.xml要配置好，谁需要打包，谁不需要打包，谁依赖谁，父工程是否声明了子模块，子模块是否声明了父工程是谁，这些是重点！**
:::


### springboont解决本地跨域问题
::: details 点我查看代码
第一种方法在RestController添加下面注解
```java
@CrossOrigin(origins = "*")
```

第二种方法，添加跨域类
```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
    // 当前跨域请求最大有效时长。这里默认1天
    private static final long MAX_AGE = 24 * 60 * 60;

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("*"); // 1 设置访问源地址，或者http://localhost:7060
        corsConfiguration.addAllowedHeader("*"); // 2 设置访问源请求头
        corsConfiguration.addAllowedMethod("*"); // 3 设置访问源请求方法，或设置为"GET", "POST", "DELETE", "PUT"
        corsConfiguration.setMaxAge(MAX_AGE);
        source.registerCorsConfiguration("/**", corsConfiguration); // 4 对接口配置跨域设置
        return new CorsFilter(source);
    }
}
```
:::

### 统一响应结果类Result
::: details 点我查看代码
```java
import lombok.Data;

import java.io.Serializable;

/**
 * 后端统一返回结果
 * @param <T>
 */
@Data
public class Result<T> implements Serializable {

    private Integer code; //编码：1成功，0和其它数字为失败
    private String msg; //错误信息
    private T data; //数据

    public static <T> Result<T> success() {
        Result<T> result = new Result<T>();
        result.code = 1;
        return result;
    }

    public static <T> Result<T> success(T object) {
        Result<T> result = new Result<T>();
        result.data = object;
        result.code = 1;
        return result;
    }

    public static <T> Result<T> error(String msg) {
        Result result = new Result();
        result.msg = msg;
        result.code = 0;
        return result;
    }

}

```
:::
### AOP依赖及使用
::: details 点我查看代码
依赖：
```java
  <!--AOP-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-aop</artifactId>
        </dependency>
```
使用:
```java
@Aspect
@Component
@Slf4j
public class test {
//    切入点
    @Pointcut("execution(* com.student.service.impl.*.*(..))")
    
    public void pc(){}
    
//    公共方法
    @Around("pc()")
    public Object testaoo(ProceedingJoinPoint pjp) throws Throwable {
        long l = System.currentTimeMillis();
        log.info("方法开始执行....开始时间{}",l*1000);

        pjp.proceed();  //执行原始方法
        long end = System.currentTimeMillis();
        log.info("方法执行完毕....结束时间{}",end);
        log.info("方法总耗时：{}",end-l);

        return  pjp;
    }
}

```
然后启动类添加：@EnableAspectJAutoProxy 注解
:::


### redis配置类
::: details 点我查看代码
1. 依赖
   ```java
   <!--        redis-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-pool2</artifactId>
        </dependency>
     ```
```java
import org.apache.commons.pool2.impl.GenericObjectPoolConfig;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettucePoolingClientConfiguration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@EnableCaching  // 开启缓存
@Configuration  // 配置类
public class RedisConfig extends CachingConfigurerSupport {


    /**
     * 配置 Redis 连接工厂
     * 意义: LettuceConnectionFactory 是连接 Redis 服务器的入口，它使用了 Lettuce 客户端，并且配置了连接池来提高性能和资源管理
     * @return LettuceConnectionFactory
     */
    @Bean
    public LettuceConnectionFactory redisConnectionFactory() {
        // 配置 Redis 服务器的连接信息
        RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration();
        //setHostName服务器ip地址，这里是本地所以是localhost
        redisStandaloneConfiguration.setHostName("localhost");
         //setPort服务器端口号，默认端口号为6379
        redisStandaloneConfiguration.setPort(6379);
         
        //redisStandaloneConfiguration.setPassword(RedisPassword.of("123456")); // 取消注释设置密码访问

        // 配置连接池
        GenericObjectPoolConfig<Object> poolConfig = new GenericObjectPoolConfig<>();
        poolConfig.setMaxTotal(10);       // 连接池中的最大连接数
        poolConfig.setMaxIdle(5);         // 连接池中的最大空闲连接数
        poolConfig.setMinIdle(1);         // 连接池中的最小空闲连接数
        poolConfig.setMaxWaitMillis(2000); // 连接池获取连接的最大等待时间

        // 创建一个带有连接池配置的 Lettuce 客户端配置
        LettucePoolingClientConfiguration lettucePoolingClientConfiguration =
                LettucePoolingClientConfiguration.builder()
                        .poolConfig(poolConfig)
                        .build();

        // 返回带有连接池配置的 Redis 连接工厂
        return new LettuceConnectionFactory(redisStandaloneConfiguration, lettucePoolingClientConfiguration);
    }

    /**
     * 配置并返回一个 RedisTemplate 实例，用于执行 Redis 操作
     * 意义: RedisTemplate 提供了一种高级抽象，使得开发者可以通过模板方法操作 Redis，而无需直接处理底层的 Redis 命令。
     * 它支持多种 Redis 操作，例如值操作、哈希操作、列表操作等
     * @return RedisTemplate
     */
    @Bean
    public RedisTemplate<String, Object> redisTemplate() {
        /*
            1.创建 RedisTemplate: 这是 Spring 用于与 Redis 交互的核心类，简化了与 Redis 的交互。
            2.设置连接工厂: 使用前面定义的 LettuceConnectionFactory。
            3.设置序列化器: 设置键和值的序列化器，这里使用 StringRedisSerializer 来将键和值序列化为字符串。
         */
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory());  // 设置连接工厂
        template.setKeySerializer(new StringRedisSerializer());  // 设置键的序列化器
        template.setValueSerializer(new StringRedisSerializer()); // 设置值的序列化器
        return template;
    }
}

```
:::
### redis操作类
::: details 点我查看代码
```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

/**
 * RedisService 类提供了简化的 Redis 操作接口，用于在 Spring Boot 应用中存储和检索数据。
 * 它通过 RedisTemplate 与 Redis 服务器交互，执行常见的操作如设置值、获取值、设置值带过期时间和删除值。
 */
@Service
public class RedisService {

    /*
        意义: RedisTemplate 是 Spring 提供的一个 Redis 操作模板，它抽象了 Redis 的底层访问，
        使开发者可以用 Java 对象操作 Redis。使用 @Autowired 注解，Spring 自动将配置好的 RedisTemplate 注入到 RedisService 类中
     */
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    // 作用: 向 Redis 中存储一个键值对
    public void setValue(String key, Object value) {
        redisTemplate.opsForValue().set(key, value);
    }

    // 作用: 从 Redis 中获取指定键的值
    public Object getValue(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    // 作用: 向 Redis 中存储一个键值对，并设置其过期时间
    // timeout 指定时间量，timeUnit 指定时间单位
    public void setValueWithExpiry(String key, Object value, long timeout, TimeUnit timeUnit) {
        redisTemplate.opsForValue().set(key, value, timeout, timeUnit);
    }

    // 作用: 从 Redis 中删除指定键及其对应的值
    public void deleteValue(String key) {
        redisTemplate.delete(key);
    }
}

```
:::






### 分页操作
::: details 点击查看代码
1：添加MybatisPlus分页插件
```java
import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan("com.student.mapper")
public class MybatisPlusConfig {

    /**
     * 添加分页插件
     */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL)); // 如果配置多个插件, 切记分页最后添加
        // 如果有多数据源可以不配具体类型, 否则都建议配上具体的 DbType
        return interceptor;
    }
}

```
2：分页操作，students为实体类
```java
   //页码:studentDTO.getPage()
   //每页显示记录数:studentDTO.getPageSize()
    Page<students> page = new Page<>(studentDTO.getPage(), studentDTO.getPageSize());

    Page<students> selectPage = Mapper.selectPage(page, null);

    long total = selectPage.getTotal();
    //total总页数
    List<students> records = selectPage.getRecords();
    //records查询结果
    return new PageResult(total, records);
```
:::


### springboont全局异常处理器
::: details 点我查看代码
```java
import com.example.test1.pojo.Result;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
/*
全局异常处理器
 */
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)//捕获所有异常
    public Result ex(Exception ex){
        ex.printStackTrace();
        return Result.error("报错啦");

    }
}
```
:::

### springboont yml配置文件基本语法
::: details 点我查看代码
```yml
#yml配置基本语法
#1：大小写敏感
#2：数值前边必须有空格
#3：使用缩进表示层级关系，缩进时，要用空格键
#4：缩进的空格数目不重要，只要相同层级的元素左对齐即可
#
#举例
#
#数据库配置
spring:
  datasource:
    #驱动类名称
    driver-class-name: com.mysql.cj.jdbc.Driver
    #数据库连接的url
    url: jdbc:mysql://localhost:3309/myapp
    #连接数据库的用户名
    username: root
    #连接数据库的密码
    password: 123456

  mail: #邮箱配置
    host: smtp.qq.com # 指定邮件服务器的主机名，这里默认是smtp.qq.com，表示使用的是腾讯的SMTP服务器。
    port: 465 # 456也行
    username: 2930119859@qq.com
    password: fevkgnixcwtxddbi
    properties:
      mail:
        smtp:
          socketFactory:
            port: 465
            class: javax.net.ssl.SSLSocketFactory
          ssl:
            enable: true
#    properties:   # 其他配置
#      mail:
#        smtp:
#          socketFactoryClass: javax.net.ssl.SSLSocketFactory # 指定SSL Socket工厂类，用于创建加密的邮件连接。
#          auto: true # 设置为true表示启用自动连接。
#        starttls: # 配置STARTTLS加密连接
#          enable: true # 设置为true表示启用STARTTLS。
#          required: true # 设置为true表示STARTTLS是必需的，如果不可用，则会抛出异常。
#    default-encoding: UTF-8 # 设置邮件内容的默认编码格式为UTF-8 默认就是UTF-8

  data:
    redis: #redis配置
      host: 127.0.0.1 #ip
      port: 6379 #端口
      database: 1 #数据库
      timeout: 1800000

server:
  port: 9090 #springboot服务端口号

mybatis-plus: #mybatis-plus打印sql语句日志
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```
:::

### jwt令牌工具类
::: details 点我查看代码
```java
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.Map;

public class JwtUtils {

    private static String signKey = "ljjk";	//签名密钥
    private static Long expire = 100L;		//过期时间

    /**
     * 生成JWT令牌
     * @param claims JWT第二部分负载 payload 中存储的内容
     * @return
     */
    public static String generateJwt(Map<String, Object> claims){
        String jwt = Jwts.builder()
                .addClaims(claims)
                .signWith(SignatureAlgorithm.HS256, signKey)
                .setExpiration(new Date(System.currentTimeMillis() + expire))
                .compact();
        return jwt;
    }

    /**
     * 解析JWT令牌
     * @param jwt JWT令牌
     * @return JWT第二部分负载 payload 中存储的内容
     */
    public static Claims parseJWT(String jwt){
        Claims claims = Jwts.parser()
                .setSigningKey(signKey)
                .parseClaimsJws(jwt)
                .getBody();
        return claims;
    }
}
```
:::


### 后端拦截器类
::: details 点我查看代码
```java
import com.student.Utlis.JwtUtils;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/*
；拦截器Interceptor
 */
@Slf4j
@Component
public class LoginCheckInterceptor implements HandlerInterceptor {
    @Override//目标资源方法运行前运行，返回true:放行  返回false,不放行
    public boolean preHandle(HttpServletRequest req, HttpServletResponse resp, Object handler) throws Exception {

        System.out.println("我是拦截器");
        String url = req.getRequestURL().toString();

        System.out.println("路径"+url);
//        获取请求头中的token
        String token = req.getHeader("token");

        try {
            log.info("校验令牌{}", token);
            Claims claims = JwtUtils.parseJWT(token);
            return true; //放行
        } catch (Exception e) {
            System.out.println("校验失败");
            resp.setStatus(401);
            return false;//不放行
        }

    }

    @Override//目标资源方法运行后运行
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("postHandle");
    }

    @Override//视图渲染完毕后运行，最后运行
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println(" afterCompletion");
    }
}
```
:::
### 注册拦截器配置类
::: details 点我查看代码
```java
import com.student.interceptor.LoginCheckInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginCheckInterceptor())
                .addPathPatterns("/**")// 添加拦截路径
                .excludePathPatterns("/error", "/login"); // 排除拦截路径
    }
}
```
:::
### 阿里云oss对象存储依赖
::: details 点我查看代码
```java
  <!-- 阿里云对象存储 -->
        <dependency>
            <groupId>com.aliyun.oss</groupId>
            <artifactId>aliyun-sdk-oss</artifactId>
            <version>3.15.1</version>
        </dependency>
        <dependency>
            <groupId>javax.xml.bind</groupId>
            <artifactId>jaxb-api</artifactId>
            <version>2.3.1</version>
        </dependency>
        <dependency>
            <groupId>javax.activation</groupId>
            <artifactId>activation</artifactId>
            <version>1.1.1</version>
        </dependency>
        <!-- no more than 2.3.3-->
        <dependency>
            <groupId>org.glassfish.jaxb</groupId>
            <artifactId>jaxb-runtime</artifactId>
            <version>2.3.3</version>
        </dependency>
```
:::

### 阿里云OSS工具类
::: details 点我查看代码
```java
import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.model.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.URL;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


public class AliOSSUtil {
    //改成自己的oss密钥
    private static final String endpoint="";

    private static final String accessKeyId="";

    private static final String accessKeySecret="";

    private static final String bucketName="";



    /**
     * 将文件上传到阿里OSS
     *
     * @param sourceFilePathName 本地文件name
     * @param aimFilePathName    在阿里OSS中保存的可以包含路径的文件名
     * @return 返回上传后文件的访问路径
     * @throws FileNotFoundException
     */
    public static String upload(String sourceFilePathName, String aimFilePathName) throws FileNotFoundException {
        FileInputStream is = new FileInputStream(sourceFilePathName);

        if (aimFilePathName.startsWith("/")) {
            aimFilePathName = aimFilePathName.substring(1);
        }

        // 如果需要上传时设置存储类型与访问权限，请参考以下示例代码。
        ObjectMetadata metadata = new ObjectMetadata();
        int indexOfLastDot = aimFilePathName.lastIndexOf(".");
        String suffix = aimFilePathName.substring(indexOfLastDot);
        metadata.setContentType(getContentType(suffix));

        //避免文件覆盖
        aimFilePathName = aimFilePathName.substring(0, indexOfLastDot) + System.currentTimeMillis() + suffix;

        PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, aimFilePathName, is);
        //避免访问时将图片下载下来
        putObjectRequest.setMetadata(metadata);

        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

        ossClient.putObject(putObjectRequest);

        Date expiration = new Date(System.currentTimeMillis() + 3600L * 1000 * 24 * 365 * 100);
        URL url = ossClient.generatePresignedUrl(bucketName, aimFilePathName, expiration);

        // 关闭ossClient
        ossClient.shutdown();

        return url.toString();
    }

    /**
     * 网络实现上传头像到OSS
     *
     * @param multipartFile
     * @return
     */
    public static String upload(MultipartFile multipartFile) throws IOException {
        // 获取上传的文件的输入流
        InputStream inputStream = multipartFile.getInputStream();
        // 获取文件名称
        String fileName = multipartFile.getOriginalFilename();

        // 避免文件覆盖
        int i = fileName.lastIndexOf(".");
        String suffix = fileName.substring(i);
        fileName = fileName.substring(0, i) + System.currentTimeMillis() + suffix;

        // 把文件按照日期进行分类
        // 获取当前日期
        String datePath = DateTimeFormatter.ISO_DATE.format(LocalDate.now());
        // 拼接fileName
        fileName = datePath + "/" + fileName;

        // 如果需要上传时设置存储类型与访问权限
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(getContentType(fileName.substring(fileName.lastIndexOf("."))));

        // 上传文件到OSS时需要指定包含文件后缀在内的完整路径，例如abc/efg/123.jpg。
        PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, fileName, inputStream);
        putObjectRequest.setMetadata(metadata);

        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

        ossClient.putObject(putObjectRequest);

        //文件访问路径
        Date expiration = new Date(System.currentTimeMillis() + 3600L * 1000 * 24 * 365 * 100);
        URL url = ossClient.generatePresignedUrl(bucketName, fileName, expiration);

        // 关闭ossClient
        ossClient.shutdown();
        // 把上传到oss的路径返回
        return url.toString();
    }

    /**
     * 返回contentType
     *
     * @param FileNameExtension
     * @return
     */
    private static String getContentType(String FileNameExtension) {
        if (FileNameExtension.equalsIgnoreCase(".bmp")) {
            return "image/bmp";
        }
        if (FileNameExtension.equalsIgnoreCase(".gif")) {
            return "image/gif";
        }
        if (FileNameExtension.equalsIgnoreCase(".jpeg") ||
                FileNameExtension.equalsIgnoreCase(".jpg") ||
                FileNameExtension.equalsIgnoreCase(".png")
        ) {
            return "image/jpg";
        }
        return "image/jpg";
    }


    /**
     * 列举 指定路径下所有的文件的文件名
     * 如果要列出根路径下的所有文件，path= ""
     *
     * @param path
     * @return
     */
    public static List<String> listFileName(String path) {
        List<String> res = new ArrayList<>();
        // 构造ListObjectsRequest请求。
        ListObjectsRequest listObjectsRequest = new ListObjectsRequest(bucketName);

        // 设置prefix参数来获取fun目录下的所有文件。
        listObjectsRequest.setPrefix(path);

        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

        // 列出文件。
        ObjectListing listing = ossClient.listObjects(listObjectsRequest);
        // 遍历所有文件
        for (OSSObjectSummary objectSummary : listing.getObjectSummaries()) {
            System.out.println(objectSummary.getKey());
        }
        // 关闭OSSClient。
        ossClient.shutdown();
        return res;
    }

    /**
     * 列举文件下所有的文件url信息
     */
    public static List<String> listFileUrl(String path) {
        List<String> res = new ArrayList<>();

        // 构造ListObjectsRequest请求
        ListObjectsRequest listObjectsRequest = new ListObjectsRequest(bucketName);

        // 设置prefix参数来获取fun目录下的所有文件。
        listObjectsRequest.setPrefix(path);

        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

        // 列出文件。
        ObjectListing listing = ossClient.listObjects(listObjectsRequest);
        // 遍历所有文件。

        for (OSSObjectSummary objectSummary : listing.getObjectSummaries()) {
            //文件访问路径
            Date expiration = new Date(System.currentTimeMillis() + 3600L * 1000 * 24 * 365 * 100);
            URL url = ossClient.generatePresignedUrl(bucketName, objectSummary.getKey(), expiration);
            res.add(url.toString());
        }
        // 关闭OSSClient。
        ossClient.shutdown();
        return res;
    }

    /**
     * 判断文件是否存在
     *
     * @param objectName
     * @return
     */
    public static boolean isFileExist(String objectName) {
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);
        boolean res = ossClient.doesObjectExist(bucketName, objectName);
        return res;
    }

    /**
     * 通过文件名下载文件
     *
     * @param objectName    要下载的文件名
     * @param localFileName 本地要创建的文件名
     */
    public static void downloadFile(String objectName, String localFileName) {
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

        // 下载OSS文件到本地文件。如果指定的本地文件存在会覆盖，不存在则新建。
        ossClient.getObject(new GetObjectRequest(bucketName, objectName), new File(localFileName));
        // 关闭OSSClient。
        ossClient.shutdown();
    }

    /**
     * 删除文件或目录
     *
     * @param objectName
     */
    public static void delelteFile(String objectName) {
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

        ossClient.deleteObject(bucketName, objectName);
        ossClient.shutdown();
    }

    /**
     * 批量删除文件或目录
     *
     * @param keys
     */
    public static void deleteFiles(List<String> keys) {
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

        // 删除文件。
        DeleteObjectsResult deleteObjectsResult = ossClient.deleteObjects(new DeleteObjectsRequest(bucketName).withKeys(keys));
        java.util.List<String> deletedObjects = deleteObjectsResult.getDeletedObjects();

        ossClient.shutdown();
    }
    /**
     * 创建文件夹
     *
     * @param folder
     * @return
     */
    public static String createFolder(String folder) {
        // 文件夹名
        final String keySuffixWithSlash = folder;
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

        // 判断文件夹是否存在，不存在则创建
        if (!ossClient.doesObjectExist(bucketName, keySuffixWithSlash)) {
            // 创建文件夹
            ossClient.putObject(bucketName, keySuffixWithSlash, new ByteArrayInputStream(new byte[0]));
            // 得到文件夹名
            OSSObject object = ossClient.getObject(bucketName, keySuffixWithSlash);
            String fileDir = object.getKey();
            ossClient.shutdown();
            return fileDir;
        }

        return keySuffixWithSlash;
    }

}
```
:::

### Http工具类
::: details 点我查看代码
1： Http依赖
```java
     <!--发送网络请求类依赖-->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>2.0.52</version>
        </dependency>
```
2： 添加Http工具类
```java
import com.alibaba.fastjson.JSONObject;
import org.apache.http.NameValuePair;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Http工具类
 */
public class HttpClientUtil {

    static final  int TIMEOUT_MSEC = 5 * 1000;

    /**
     * 发送GET方式请求
     * @param url
     * @param paramMap
     * @return
     */
    public static String doGet(String url,Map<String,String> paramMap){
        // 创建Httpclient对象
        CloseableHttpClient httpClient = HttpClients.createDefault();

        String result = "";
        CloseableHttpResponse response = null;

        try{
            URIBuilder builder = new URIBuilder(url);
            if(paramMap != null){
                for (String key : paramMap.keySet()) {
                    builder.addParameter(key,paramMap.get(key));
                }
            }
            URI uri = builder.build();

            //创建GET请求
            HttpGet httpGet = new HttpGet(uri);

            //发送请求
            response = httpClient.execute(httpGet);

            //判断响应状态
            if(response.getStatusLine().getStatusCode() == 200){
                result = EntityUtils.toString(response.getEntity(),"UTF-8");
            }
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            try {
                response.close();
                httpClient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return result;
    }

    /**
     * 发送POST方式请求
     * @param url
     * @param paramMap
     * @return
     * @throws IOException
     */
    public static String doPost(String url, Map<String, String> paramMap) throws IOException {
        // 创建Httpclient对象
        CloseableHttpClient httpClient = HttpClients.createDefault();
        CloseableHttpResponse response = null;
        String resultString = "";

        try {
            // 创建Http Post请求
            HttpPost httpPost = new HttpPost(url);

            // 创建参数列表
            if (paramMap != null) {
                List<NameValuePair> paramList = new ArrayList();
                for (Map.Entry<String, String> param : paramMap.entrySet()) {
                    paramList.add(new BasicNameValuePair(param.getKey(), param.getValue()));
                }
                // 模拟表单
                UrlEncodedFormEntity entity = new UrlEncodedFormEntity(paramList);
                httpPost.setEntity(entity);
            }

            httpPost.setConfig(builderRequestConfig());

            // 执行http请求
            response = httpClient.execute(httpPost);

            resultString = EntityUtils.toString(response.getEntity(), "UTF-8");
        } catch (Exception e) {
            throw e;
        } finally {
            try {
                response.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return resultString;
    }

    /**
     * 发送POST方式请求
     * @param url
     * @param paramMap
     * @return
     * @throws IOException
     */
    public static String doPost4Json(String url, Map<String, String> paramMap) throws IOException {
        // 创建Httpclient对象
        CloseableHttpClient httpClient = HttpClients.createDefault();
        CloseableHttpResponse response = null;
        String resultString = "";

        try {
            // 创建Http Post请求
            HttpPost httpPost = new HttpPost(url);

            if (paramMap != null) {
                //构造json格式数据
                JSONObject jsonObject = new JSONObject();
                for (Map.Entry<String, String> param : paramMap.entrySet()) {
                    jsonObject.put(param.getKey(),param.getValue());
                }
                StringEntity entity = new StringEntity(jsonObject.toString(),"utf-8");
                //设置请求编码
                entity.setContentEncoding("utf-8");
                //设置数据类型
                entity.setContentType("application/json");
                httpPost.setEntity(entity);
            }

            httpPost.setConfig(builderRequestConfig());

            // 执行http请求
            response = httpClient.execute(httpPost);

            resultString = EntityUtils.toString(response.getEntity(), "UTF-8");
        } catch (Exception e) {
            throw e;
        } finally {
            try {
                response.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return resultString;
    }
    private static RequestConfig builderRequestConfig() {
        return RequestConfig.custom()
                .setConnectTimeout(TIMEOUT_MSEC)
                .setConnectionRequestTimeout(TIMEOUT_MSEC)
                .setSocketTimeout(TIMEOUT_MSEC).build();
    }

}
```
:::
### 随机生成验证码工具类
::: details 点我查看代码
```java
import java.util.Random;

/**
 * 随机生成验证码工具类
 */
public class ValidateCodeUtils {
    /**
     * 随机生成验证码
     * @param length 长度为4位或者6位
     * @return
     */
    public static Integer generateValidateCode(int length){
        Integer code =null;

//      长度为4
        if(length == 4){
            code = new Random().nextInt(9999);//生成随机数，最大为9999
            if(code < 1000){
                code = code + 1000;//保证随机数为4位数字
            }

//      长度为6
        }else if(length == 6){
            code = new Random().nextInt(999999);//生成随机数，最大为999999
            if(code < 100000){
                code = code + 100000;//保证随机数为6位数字
            }
//       其他情况
        }else{
            throw new RuntimeException("只能生成4位或6位数字验证码");
        }
        return code;
    }

    /**
     * 随机生成指定长度字符串验证码
     * @param length 长度
     * @return
     */
    public static String generateValidateCode4String(int length){
        Random rdm = new Random();
        String hash1 = Integer.toHexString(rdm.nextInt());
        String capstr = hash1.substring(0, length);
        return capstr;
    }
}

```
:::
### 发送邮箱验证码工具类
::: details 点我查看代码
 1：添加邮箱依赖
```java
       <!--        email邮箱验证-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-mail</artifactId>
        </dependency>
```
 2：配置yml文件
```java
  mail: #邮箱配置
    host: smtp.qq.com # 指定邮件服务器的主机名，这里默认是smtp.qq.com，表示使用的是腾讯的SMTP服务器。
    port: 465 # 456也行
    username: #开启权授的邮箱号
    password: #邮箱号权授码
    properties:
      mail:
        smtp:
          socketFactory:
            port: 465
            class: javax.net.ssl.SSLSocketFactory
          ssl:
            enable: true
```
 3：添加邮箱工具类
 ```java
 
import com.app.Config.RedisConfig;
import com.app.enumeration.Constants;
import com.app.mapper.verificationcodemapper;

import com.app.service.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


import java.util.concurrent.TimeUnit;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 发送邮箱验证码工具类
 * Created by sxy on 2024/3/11.
 */
@Service
public class EmailSendUtils {
    @Autowired
    private verificationcodemapper verificationcodemapper;
    // 注入JavaMailSender接口
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private RedisService redisService;
    // 集成redis进行验证码的缓存
//    @Autowired
//    private RedisTemplate redisTemplate;

    // 通过value注解得到配置文件中发送者的邮箱
    @Value("${spring.mail.username}")
    private String userName;// 用户发送者

    // 邮箱验证码 定义为StringBuilder对于增删改操作有优势
    private final StringBuilder EMAIL_CODE = new StringBuilder();

    // 创建一个发送邮箱验证的方法
    public void sendVerificationEmail(String to) {
        try {
            // 定义email信息格式
            SimpleMailMessage message = new SimpleMailMessage();
            // 调用生成6位数字和字母的方法，生成验证码，该方法在下面定义好了
            generateRandomCode(to);
            // 设置发件人
            message.setFrom(userName);
            // 接收者邮箱，为调用本方法传入的接收者的邮箱xxx@qq.com
            message.setTo(to);
            // 邮件主题
            message.setSubject(Constants.EMAIL_TITLE.getValue());
            // 邮件内容  设置的邮件内容，这里我使用了常量类字符串，加上验证码，再加上常量类字符串
            message.setText(Constants.EMAIL_MESSAGE.getValue() + EMAIL_CODE + Constants.EMAIL_OUTTIME_TEN.getValue());
            // 开始发送
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 发送完了之后，将EMAIL_CODE设置为空
            EMAIL_CODE.setLength(0);
        }

    }


    /**
     * 随机生成6位字母加数字组合的验证码
     *
     * @return
     */
    public void generateRandomCode(String to) {
//      生成随机数字验证
        Integer code = ValidateCodeUtils.generateValidateCode(4);

        EMAIL_CODE.append(code);
        //TODO 这里存储的key如果多个用户同时发送的话会覆盖key，就会导致第一个人的验证码被覆盖
        // 存入Redis中并设置时长为2分钟
        //把邮箱和验证码都存入redis中
        redisService.setValueWithExpiry(Constants.EMAIL_CODE.getValue(), EMAIL_CODE.toString(), 120, TimeUnit.SECONDS);
        redisService.setValueWithExpiry(Constants.EMAIL.getValue(),to,120,TimeUnit.SECONDS);

    }
}

 ```
:::
### 线程存储类
::: details 点我查看代码
```java
public class BaseContext {

    public static ThreadLocal<Long> threadLocal = new ThreadLocal<>();

    public static void setCurrentId(Long id) {
        threadLocal.set(id);
    }

    public static Long getCurrentId() {
        return threadLocal.get();
    }

    public static void removeCurrentId() {
        threadLocal.remove();
    }

}
```
:::
### Knife4j的使用
::: details 点我查看代码
>一：先引入Knife4j的依赖(当前是springboot3版本)
```java
<!-- Knife4j依赖-->
        <dependency>
            <groupId>com.github.xiaoymin</groupId>
            <artifactId>knife4j-openapi3-jakarta-spring-boot-starter</artifactId>
            <version>4.4.0</version>
        </dependency>
```
>二：配置yml文件开启Knife4j
```java
#开启knife4j

# springdoc-openapi项目访问访问地址: http://127.0.0.1:8080/doc.html
springdoc:
  swagger-ui:
    path: /swagger-ui.html
    # path: 配置swagger-ui.html/UI界面的访问路径,默认为/swagger-ui.html
    tags-sorter: alpha
    # tags-sorter: 接口文档中的tags排序规则,默认为alpha,可选值为alpha(按字母顺序排序)或as-is(按照在代码中定义的顺序排序)
    operations-sorter: alpha

  api-docs:
    path: /v3/api-docs
    # path: 配置api-docs的访问路径,默认为/v3/api-docs

  group-configs:
    # group-configs: 配置分组信息
    - group: 'default'
      # group: 分组名称
      paths-to-match: '/**'
      # paths-to-match: 配置要匹配的路径,默认为/**
      packages-to-scan: com.student.controller
      # packages-to-scan: 配置要扫描的包的路径,直接配置为Controller类所在的包名即可

# knife4j项目访问访问地址:http://127.0.0.1:8080/doc.html#/home
knife4j:
  enable: true
  # 设置为true以启用Knife4j增强功能,这将再应用程序中启用Knife4j UI
  setting:
    # language: 设置Knife4j UI的语言,默认为zh_cn,可选值为zh_cn或en
    language: zh_cn
  #开启生产环境屏蔽
  production: false
  #是否启用登录认证
#  basic:
#    enable: true
#    username: # 自己设置一个
#    password: # 自己设置一个
```
>三：添加knife4j配置文件
```java
package com.student.Config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Knife4jConfig {

    @Bean
    public OpenAPI springShopOpenAPI() {
        return new OpenAPI()
        // 接口文档标题
        .info(new Info().title("API接口文档")
              // 接口文档简介
              .description("pai api doc")
              // 接口文档版本
              .version("0.0.1-SNAPSHOT")
              // 开发者联系方式
              .contact(new Contact().name("ljjk")
                       .email("666666666@qq.com")))
        .externalDocs(new ExternalDocumentation()
                        //简介
                      .description("paicoding api doc")
                        //端口
                      .url("http://127.0.0.1:9090"));
    }
}

```
完成配置后，访问
```java
# http://localhost:9090/doc.html
```即可看到页面

**Knife4j注解说明**
1. @Api
添加在控制器类上，通过此注解的tags属性，可以指定模块名称，并且，在指定名称时，建议在名称前添加数字作为序号，Knife4j会根据这些数字将各模块升序排列，例如：
```java
@Api(value = "提供商品添加、修改、删除及查询的相关接⼝",tags = "01.商品管理")
```
1. @ApiOpearation
添加在Api中处理请求的方法上，通过此注解的value属性，可以指定业务/请求资源的名称，例如：
```java
@ApiOperation("添加商品")
```
1. @ApiOperationSupport
添加在Api中处理请求的方法上，通过此注解的order属性（int），可以指定排序序号，Knife4j会根据这些数字将各业务/请求资源升序排列，例如：
```java
@ApiOperationSupport(order = 100)
```

1. @ApiModel
用来对实体类进行说明，例如
```java
@ApiModel(value = "User对象",description = "⽤户信息")
```
:::

## 获取客户端 IP 地址
::: details 点击查看
```java
import javax.servlet.http.HttpServletRequest;
import java.net.InetAddress;

import org.apache.commons.lang3.StringUtils;

/**
 * 网络工具类
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://yupi.icu">编程导航知识星球</a>
 */
public class NetUtils {

    private static final String UNKNOWN = "unknown";
    private static final String LOCALHOST_IP = "127.0.0.1";

    /**
     * 获取客户端 IP 地址
     *
     * @param request 请求
     * @return 客户端的 IP 地址
     */
    public static String getIpAddress(HttpServletRequest request) {
        String ip = null;

        // 尝试从不同头信息中获取 IP
        ip = extractIpFromHeaders(request);

        // 如果 IP 无效，则尝试从远程地址获取
        if (isInvalidIp(ip)) {
            ip = request.getRemoteAddr();

            // 如果远程地址为本地回环地址，则尝试获取本地主机的 IP
            if (LOCALHOST_IP.equals(ip)) {
                ip = getLocalHostIp();
            }
        }

        // 处理多层代理的情况
        ip = extractRealIp(ip);

        return StringUtils.defaultIfBlank(ip, LOCALHOST_IP);
    }

    private static String extractIpFromHeaders(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (isInvalidIp(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (isInvalidIp(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        return ip;
    }

    private static boolean isInvalidIp(String ip) {
        return StringUtils.isBlank(ip) || UNKNOWN.equalsIgnoreCase(ip);
    }

    private static String getLocalHostIp() {
        try {
            InetAddress inet = InetAddress.getLocalHost();
            return inet.getHostAddress();
        } catch (Exception e) {
            // 如果获取本地 IP 出错，返回默认值
            return LOCALHOST_IP;
        }
    }

    private static String extractRealIp(String ip) {
        if (StringUtils.isNotBlank(ip) && ip.length() > 15) {
            int commaIndex = ip.indexOf(',');
            if (commaIndex > 0) {
                return ip.substring(0, commaIndex);
            }
        }
        return ip;
    }

}

```
::::

## 读取json文件
::: details 点击查看
```java


/**
* 项目启动后，flyway脚本已执行，项目数据库数据初始化.
*
* @author zhupeng
* @version 1.0.0, 2024/1/3
* @since 2024/1/3
*/
@Slf4j
@Component
public class ProjectDataBaseInitTask implements ApplicationRunner {

   /**
    * 资源加载器.
    */
   @Autowired
   private ResourceLoader resourceLoader;

   @Override
   public void run(ApplicationArguments args) {
       // 1. 读取json文件
       InitDbDataDto initDbData = getInitDbDataFromPath("classpath:init/init_property.json");
       if (Objects.isNull(initDbData)) {
           return;
       }
     
   }

   /**
    * 读取json文件.
    *
    * @param path 文件路径.
    * @return 初始化数据类.
    */
   private InitDbDataDto getInitDbDataFromPath(String path) {
       if (StringUtils.isEmpty(path)) {
           return null;
       }
       Resource resource = resourceLoader.getResource(path);
       if (!resource.exists()) {
           log.error("初始化数据不存在");
           return null;
       }
       InitDbDataDto initDbData = null;
       try {
           InputStream inputStream = resource.getInputStream();
            // 判断当前可读取的字节数
            if (inputStream.available() == 0) {
                continue;
            }
           ObjectMapper objectMapper = new ObjectMapper();
           initDbData = objectMapper.readValue(inputStream, InitDbDataDto.class);
       } catch (IOException e) {
           log.error("读取json文件错误");
           throw new RuntimeException(e);
       }
       return initDbData;
   }
}

```
::::

##
::: details 点击查看
```vue

```
::::
##
::: details 点击查看
```vue

```
::::
