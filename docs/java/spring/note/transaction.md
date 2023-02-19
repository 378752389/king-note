---
title: 事务
---

## 事务的传播行为

[参考博客](https://www.jianshu.com/p/25c8e5a35ece)

1.REQUIRED 
@Transactional(propagation = Propagation.REQUIRED)
**spring中的默认**事务传播行为就是它。如果业务方法执行时已经在一个事务中，则加入当前事务，

否则重新开启一个事务。外层事务提交了，内层才会提交。内/外只要有报错，他俩会一起回滚。

只要内层方法报错抛出异常，即使外层有try-catch，该事务也会回滚。

因为内外层方法在同一个事务中，内层只要抛出了异常，这个事务就会被设置成rollback-only，即使外层try-catch内层的异常，该事务也会回滚。



2.REQUIRES_NEW 
@Transactional(propagation = Propagation.REQUIRES_NEW)

支持事务。每次都是创建一个新事物，如果当前已经在事务中了，会挂起当前事务。内层事务结束，内层就提交了，不用等着外层一起提交。

外层报错回滚，不影响内层。内层报错回滚，外层try-catch内层的异常，外层不会回滚。

内层报错回滚，然后又会抛出异常，外层如果没有捕获处理内层抛出来的这个异常，外层还是会回滚的。



3.NESTED
@Transactional(propagation = Propagation.NESTED)

支持事务。如果当前事务存在，那么在嵌套的事务中执行，内层事务结束，要等着外层一起提交。如果当前事务不存在，则表现跟REQUIRED一样。

这个直接说，如果外层报错回滚，内层也会跟着回滚。

如果只是内层回滚，不影响外层。这个内层回滚不影响外层的特性是有前提的，否则内外都回滚。

内层是NESTED模式下，外层要try-catch内层的异常，外层才不会回滚。而内层是REQUIRED模式的话，即使外层try-catch内层异常，外层同样会回滚的。



4.SUPPORTS （被调用者）
@Transactional(propagation = Propagation.SUPPORTS)

支持事务。当前有事务就支持使用当前事务，若当前不存在事务，以非事务的方式执行。内层事务结束，要等着外层一起提交。



5.MANDATORY（被调用者）
@Transactional(propagation = Propagation.MANDATORY)

支持事务，如果业务方法执行时已经在一个事务中，则加入当前事务。否则抛出异常。内层事务结束，要等着外层一起提交。



6.NOT_SUPPORTED（被调用者）
@Transactional(propagation = Propagation.NOT_SUPPORTED)

不支持事务，以非事务的方式执行，若当前存在事务，则把当前事务挂起，等方法执行完毕后，事务恢复进行。

若A是事务执行，B（NOT_SUPPORTED非事务执行）B在A尚未提交前再操作同一条记录，会产生死锁，A、B不可操作同一条记录。



7.NEVER（被调用者）
@Transactional(propagation = Propagation.NEVER) 

不支持事务。如果当前已经在一个事务中了，抛出异常。



