```dockerfile
FROM java:8

RUN mkdir -p /hello    # todo

WORKDIR /hello         # todo

ARG JAR_FILE=target/hello.jar    # todo

COPY ${JAR_FILE} app.jar

EXPOSE 8501

ENV TZ=Asia/Shanghai JAVA_OPTS="-Xms128m -Xmx256m -Djava.security.egd=file:/dev/./urandom"

CMD java -jar app.jar $JAVA_OPTS
```

