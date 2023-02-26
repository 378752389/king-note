## 下载

```shell
# 需要jdk1.8, 下载页面
https://www.elastic.co/cn/downloads/past-releases/logstash-7-17-9
https://www.elastic.co/cn/downloads/past-releases/kibana-7-17-9
https://www.elastic.co/cn/downloads/past-releases/elasticsearch-7-17-9


# 下载地址
wget https://artifacts.elastic.co/downloads/logstash/logstash-7.17.9-linux-x86_64.tar.gz
wget https://artifacts.elastic.co/downloads/kibana/kibana-7.17.9-linux-x86_64.tar.gz
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.17.9-linux-x86_64.tar.gz



# elasticsearch
vim /config/elasticsearch.yml

# 服务监听端口号
network.host: 192.168.1.210  
 #设置允许跨域访问
http.cors.enabled: true  
http.cors.allow-origin: "*"  


# 下载页面
https://nodejs.org/en/download/releases/

vim /etc/profile
export NODE_HOME=...
export PATH=$PATH:$NODE_HOME/bin


#elasticsearch-head
git clone https://github.com/mobz/elasticsearch-head
npm install -g

npm run start



#kibana

#修改kibana.yml配置问价
vim /config/kibana.yml

# 服务端口
server.port: 5601
# 服务器ip  本机
server.host: "0.0.0.0"
# Elasticsearch 服务地址
elasticsearch.hosts: ["http://localhost:9200"]
# 设置语言为中文
i18n.locale: "zh-CN"


```

