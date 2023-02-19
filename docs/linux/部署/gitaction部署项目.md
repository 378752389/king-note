name: wenking CI/CD/DEV

on:
  push:
    branches:
      - dev

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@master
        with:
          ref: dev
      - uses: actions/setup-java@v1
        with:
          java-version: 1.8
      - name: Build java jar
        run: |
          mvn clean package
      - name: scp file to server
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USERNAME }}
          password: ${{ secrets.SERVER_PASSWORD }}
          port: 22
          source: "target/gitaction-test-0.0.1-SNAPSHOT.jar"
          target: "/root"
      - name: Distribution and Backup
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USERNAME }}
          password: ${{ secrets.SERVER_PASSWORD }}
          port: 22
          script: |
            for i in `ps -ef | grep "gitaction-test-0.0.1-SNAPSHOT.jar" | grep -v "grep" | awk '{print $2}'`;
            do
              kill -9 $i
            done
    
            cd /root
            mkdir -p /root/gitaction
            if [ -f "/root/gitaction/gitaction-test-0.0.1-SNAPSHOT.jar.bak" ];then
              rm -rf /root/gitaction/gitaction-test-0.0.1-SNAPSHOT.jar.bak
            fi
    
            if [ -f "/root/gitaction/gitaction-test-0.0.1-SNAPSHOT.jar" ];then
              mv /root/gitaction/gitaction-test-0.0.1-SNAPSHOT.jar /root/gitaction/gitaction-test-0.0.1-SNAPSHOT.jar.bak
            fi
    
            mv /root/gitaction-test-0.0.1-SNAPSHOT.jar /root/gitaction/
            nohup java -jar gitaction-test-0.0.1-SNAPSHOT.jar > /root/gitaction/gitaction.log 2>&1 &