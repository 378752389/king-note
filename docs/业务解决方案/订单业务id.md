---
title :订单相关业务
---

## 订单号生成

### 雪花算法

![snowflake](/king-note/assets/img/business/snowflake.png)

生成一个64bit的long类型唯一id

* 最高位固定为0（表示正数）
* 接下来41位数存储毫秒时间戳，大概可以使用69年
* 接下来10位存储机器码，包括5位 datacenterID 和 5位 workerID。 最多可以部署1024台机器
* 最后12位存储序列号

```xml
<dependency>
    <groupId>cn.hutool</groupId>
    <artifactId>hutool-all</artifactId>
    <version>5.8.0</version>
</dependency>
```

```java

public class OrderUtil {
    public String generateOrderSn() {
        Snowflake snowflake = IdUtil.getSnowflake(0, 0);
        long l = snowflake.nextId();
        return Long.toString(l);
    }
}

```

### 基于redis自增生成订单

组成订单号结构： 8位日期 + 2位订单来源 + 2位订单类型 + 至少8位订单序列号

其中，订单序列号可以根据 redis 的 incr 指令生成，可以确保全局唯一

```java
public class OrderUtil {
    
    public String generateOrderSn() {
        StringBuilder sb = new StringBuilder();
        String date = new SimpleDateFormat("yyyyMMdd").format(new Date());
        String key = "0" + "orderId:" + date;
        Long increment = redisTemplate.opsForValue().increment(key, 1);
        sb.append(date);
        sb.append(String.format("%02d", order.getSource()));
        sb.append(String.format("%02d", order.getType()));
        String incrementStr = increment.toString();
        
        if (incrementStr.length() <= 6) {
            sb.append(String.format("%06d", increment));
        } else {
            sb.append(incrementStr);
        }
        return sb.toString();
    }
}
```

## 订单模块设计

### 订单表

基础信息： order基础信息、用户信息、支付信息、通用字段信息；

```sql
create table order
(
  id bigint auto_increment,
  order_sn varchar(64) comment '订单流水号',
  status tinyint comment '订单状态 0-待付款，1-待发货，2-已发货，3-已完成，4-已关闭，5-无效订单',
  source tinyint comment '订单来源 pc, app',
  type tinyint comment '订单类型  普通，秒杀',
  note varchar(300) comment '订单备注',
  
  user_id int comment '用户表， 用户id',
  
  pay_amount decimal comment '支付金额',
  pay_type tinyint comment '支付类型',
  pay_time datetime comment '支付时间',
  
  delete_status tinyint comment '1-逻辑删除',
  create_time datetime comment '订单创建时间',
  modify_time datetime comment '订单修改时间',
  primary key (id) 
);
```

扩展信息：发票信息、快递公司信息、促销信息、收件人信息、
```sql
create table order_extension
(
  bill_type tinyint comment '发票类型：0->不开发票；1->电子发票；2->纸质发票',
  bill_header varchar(200) comment '发票抬头',
  bill_content varchar(200) comment '发票内容',
  bill_receiver_email varchar(32) comment '收票人电话',
  bill_receiver_phone varchar(64) comment '收票人邮箱',

  delivery_company varchar(64) comment '物流公司(配送方式)',
  delivery_sn varchar(64) comment '物流单号',
  delivery_time datetime comment '发货时间',
  freight_amount decimal comment '运费',

  promotion_amount decimal comment '促销优化金额',
  integration_amount decimal comment '积分抵扣金额',
  coupon_amount decimal comment '优惠券金额',
  discount_amount decimal comment '折扣金额',
      
  receiver_name varchar(200) comment '收货人姓名',
  receiver_phone varchar(200) comment '收货人手机号',
  receiver_post_code varchar(16) comment '收货人邮政编码',
  receiver_province varchar(16),
  receiver_city varchar(64),
  receiver_region varchar(64),
  receiver_detail_address varchar(256),
  receive_time datetime,
  confirm_status tinyint comment '确认收货： 0-为确认  1-已确认'
);
```


## 业务流程

* 用户确认商品后，可以选择直接下单购买或加入购物车
* 直接下单购买或者在购物车内选中商品后下单，进入订单确认页面（可以选择收货地址、使用支付券、使用积分、满减计算等）
* 订单确认页面确认后可以进行下单， 将生成订单，跳转到支付页面
* 选择支付方式， 确认支付



