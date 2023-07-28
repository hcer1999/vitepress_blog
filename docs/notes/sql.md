# 数据库语句
<!-- 目录
[[toc]] -->
## 增

~~~mysql
inset into <表名> (字段名称,字段名称) value('value','value2');
-- 插入一段
inset into <表名> (字段名称,字段名称) value('value','value2'),('value1','value2');
-- 插入两段
~~~

## 删

~~~mysql
delete from <表名> where id=1
-- 删除数据库中id为1的这条数据
~~~

## 改

~~~mysql
update <表名> set name = 'zhangsan' where age = 30;
-- 将age=30的字段的name改为zhangsan
update <表名> set age = age+50 where name = '李四';
-- 将name为李四的字段的age等于本身加上50
update <表名> set age = age+50,name='张三' where name='李四';
-- 将name为李四的字段的age改为本身加50，name改为张三
~~~

## 查

~~~mysql
select * form <表名>;
-- 查询所有数据
select distinct name from <表名>;
-- 查询去重后的数据
select * from <表名> where age=22;
-- 查询age等于22的数据
select * from <表名> where age>22;
-- 查询age>22的数据
select * from <表名> where age<22;
-- 查询age<22的数据
select * from <表名> where age>=22;
-- 查询age>=22的数据
select * from <表名> where age<=22;
-- 查询age<=22的数据
select * from <表名> where name like '%mysql%'
-- 查询name字段中包含mysql的数据（ 模糊查找 ）
select * from <表名> where name like  'mysql%'
-- 查询name字段中以mysql开头的数据
select * from <表名> where age between 100 and 200;
-- 区间查询
select * from <表名> where name = 'zhangsan ' or name = 'lisi';
-- 或
select username,age  from <表名>
-- 查询指定列的数据
select username,age from <表名> where age>30
-- 查询指定列数据并且age>30
select * from <表名> order by age desc;
-- 降序
select * from <表名> order by age asc;
-- 升序
select * from <表名> limit 0,5;
-- 显示多少条数据（跳过0 条数据显示 5条数据）
select count(*) from <表名> where age>30
-- 查询某个结果中有多少条数据
~~~

