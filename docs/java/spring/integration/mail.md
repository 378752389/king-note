---
title: SpringBoot整合Mail
date: 2023-07-06
categories:
  - SpringBoot
tags:
  - Spring整合
---

### 导入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
```





### 编写配置

```yml
spring:
  mail:
    host: smtp.qq.com
    username: .........
    password: .........
    default-encoding: UTF-8
```





### 编写服务

```java
@Service
public class EmailServiceImpl implements EmailService {

    @Value("${spring.mail.username}")
    private String fromUser;

    @Autowired
    private JavaMailSender javaMailSender;


    // 发送 txt 邮件
    @Override
    public void sendEmailServer(String sendUser, String title, String text) {
        SimpleMailMessage smm = new SimpleMailMessage();
        smm.setFrom(fromUser);
        smm.setTo(sendUser);
        smm.setSubject(title);
        smm.setText(text);
        javaMailSender.send(smm);
    }

    // 发送 包含文件的邮件
    @Override
    public void sendFileEmailServer(String sendUser, String title, String text, List<String> fileList) {
        MimeMessage mm = null;

        try {
            mm = javaMailSender.createMimeMessage();

            MimeMessageHelper mmh = new MimeMessageHelper(mm, true);
            mmh.setFrom(fromUser);
            mmh.setTo(sendUser);
            mmh.setSubject(title);
            mmh.setText(text);

            for (String path : fileList) {
                FileSystemResource fsr = new FileSystemResource(new File(path));
                String fileName = path.substring(path.lastIndexOf(File.separator));
                mmh.addAttachment(fileName, fsr);
            }

            javaMailSender.send(mm);
        } catch (MessagingException e) {
            e.printStackTrace();
        }

    }
}
```

