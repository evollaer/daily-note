# MySQL 学习笔记

## 一、约束概览

| 约束 | 全称 | 说明 |
| --- | --- | --- |
| PK | PRIMARY KEY | 主键，唯一标识表中的每一行记录,字段不能有 NULL 值。一个表只能有一个主键,一般用于 ID |
| NN | NOT NULL | 非空键,字段不能有 NULL 值 |
| UQ | UNIQUE | 唯一键,使用后字段中的所有值是唯一的,不会出现重复值。可以有多个唯一键 |
| AI | AUTO_INCREMENT | 自增键,自动生成唯一的递增值,每个表中最多只能有一个 AUTO_INCREMENT 字段 |

## 二、切换数据库

```sql
use instruction;
```

## 三、排序检索数据

```sql
-- prod_price 降序,若价格相同,再按 prod_id 升序
SELECT prod_price, prod_id, prod_name
FROM products
ORDER BY prod_price DESC, prod_id;

-- 多列都用降序排序
SELECT prod_price, prod_id, prod_name
FROM products
ORDER BY prod_price DESC, prod_id DESC;
```

**总结:** `DESC` 降序,`ASC` 升序,默认升序所以 `ASC` 可以不写,升序就是从上到下为从小到大排列。

## 四、过滤数据

```sql
SELECT vend_id, prod_name
FROM products
WHERE vend_id < 399;

SELECT vend_id, prod_name
FROM products
WHERE vend_id != 100;

SELECT vend_id, prod_name
FROM products
WHERE prod_name = '蓝牙音箱';

SELECT prod_name, prod_price
FROM products
WHERE prod_price BETWEEN 10 AND 100;

-- NULL 不参与匹配/不匹配的判断,要去除不为 NULL 的数据可以添加条件 WHERE xxx IS NOT NULL
SELECT prod_name
FROM products
WHERE prod_price IS NULL;
```

## 五、高级数据过滤

### 1. IN 与 OR

```sql
SELECT prod_name, vend_id
FROM products
WHERE vend_id IN (100, 101);
```

相当于:

```sql
SELECT prod_name, vend_id
FROM products
WHERE vend_id = 100 OR vend_id = 101;
```

### 2. NOT 操作符

```sql
-- 该查询会返回 vend_id 不在 100 和 101 中的产品
SELECT *
FROM products
WHERE NOT (vend_id IN (100, 101));
```

### 3. LIKE 操作符

`LIKE` 操作符用于 SQL 查询中进行模式匹配。与直接使用精确值的比较不同,`LIKE` 允许使用通配符来查找与模式匹配的记录。

#### 3.1 百分号(%)通配符

百分号 `%` 用于匹配任意数量的字符(包括 0 个字符)。

```sql
-- 返回所有以"无线"开头的产品名称
SELECT prod_id, prod_name
FROM products
WHERE prod_name LIKE '无线%';

-- 返回所有以"电脑"结尾的产品名称
SELECT prod_id, prod_name
FROM products
WHERE prod_name LIKE '%电脑';

-- 返回产品名称中包含"电"字的产品
SELECT prod_id, prod_name
FROM products
WHERE prod_name LIKE '%电%';
```

#### 3.2 下划线(_)通配符

下划线 `_` 用于匹配单个字符。

```sql
-- 返回产品价格中任意一个数字后跟 99 的产品,比如 299、399
SELECT prod_price, prod_name
FROM products
WHERE prod_price LIKE '_99';
```

## 六、创建和操纵表

### 1. 基础语法

```sql
CREATE TABLE 表名 (
  列名1 数据类型 [列约束],
  列名2 数据类型 [列约束],
  ...
);
```

> ⚠️ 注意最后一行的末尾不能加逗号。

### 2. 实例:创建供应商表

创建一个名为 `vendors` 的供应商信息表,要求包含以下字段:

- 供应商 ID:整数类型,作为主键
- 供应商名称:字符串类型(最长 50 个字符),不允许为空
- 供应商地址:字符串类型(最长 100 个字符),允许为空
- 供应商电话:字符串类型(最长 20 个字符),允许为空

```sql
CREATE TABLE vendors (
    vend_id INT PRIMARY KEY,
    vend_name VARCHAR(50) NOT NULL,
    vend_address VARCHAR(100),
    vend_phone VARCHAR(20)
);
```

### 3. 设置默认值

在列定义中使用 `DEFAULT` 关键字设置默认值:

```sql
vend_name VARCHAR(50) NOT NULL DEFAULT '苹果科技'
```

## 七、修改表结构

### 1. 添加列(ADD)

```sql
ALTER TABLE 表名
ADD 列名 数据类型 [约束];
```

**示例:** 向 `vendors` 表中添加供应商电子邮箱字段:

```sql
ALTER TABLE vendors
ADD vend_email VARCHAR(100);
```

### 2. 删除列(DROP COLUMN)

```sql
ALTER TABLE 表名
DROP COLUMN 列名;
```

**示例:** 删除 `vend_email` 字段:

```sql
ALTER TABLE vendors
DROP COLUMN vend_email;
```

### 3. 删除表(DROP TABLE)

```sql
DROP TABLE 表名;
```

### 4. 重命名表(RENAME TABLE)

```sql
RENAME TABLE 原表名 TO 新表名;
```

**示例:**

```sql
RENAME TABLE vendors TO vendors2025;
```

## 八、约束详解

约束是对表中数据插入、修改、删除时的一种限制或规则,用于确保数据库的准确性和一致性,保障数据完整性。

### 1. 主键(Primary Key)

主键是约束的一种,用于唯一标识表中的每一行。主键值必须唯一且不可为空。每张表只能定义一个主键,但这个主键可以由多个列组合而成,称为**复合主键**。

#### 1.1 列级主键

列级主键是直接在字段定义后声明该字段为主键,适用于单个字段作为主键的场景。

```sql
CREATE TABLE vendors (
    vend_id INT PRIMARY KEY,  -- 列级主键
    vend_name VARCHAR(50) NOT NULL,
    vend_address VARCHAR(100),
    vend_phone VARCHAR(20)
);
```

> `PRIMARY KEY` 的定义本身包含了 `NOT NULL` 的特性,所以可以省略 `NOT NULL`。

#### 1.2 表级主键

表级主键是在所有字段定义完成后,单独通过 `PRIMARY KEY` 子句声明主键,适用于多个字段组合作为主键(复合主键)的场景。

**要求:** 用 `vend_name` 和 `vend_phone` 组合唯一标识供应商。

```sql
CREATE TABLE vendors (
    vend_id INT,
    vend_name VARCHAR(50) NOT NULL,
    vend_address VARCHAR(100),
    vend_phone VARCHAR(20) NOT NULL,
    -- 表级声明复合主键
    PRIMARY KEY (vend_name, vend_phone)
);
```

### 2. 外键(Foreign Key)

外键是关系型数据库中的一种约束,用于建立和维护两个表之间的引用关系,外键是实现参照完整性的核心机制。

- 外键是某张表中的一列(或多列),它引用了另一张表的主键或唯一约束列。
- 外键所在的表称为**从表**,外键引用的表称为**主表**。
- 外键的作用就是保证从表中的某列值必须来自主表中的一列已有值。

**创建顾客表:**

```sql
CREATE TABLE customers (
    cust_id INT PRIMARY KEY,
    cust_name VARCHAR(50) NOT NULL,
    cust_contact VARCHAR(50),
    cust_email VARCHAR(50)
);
```

#### 2.1 列级外键

在从表的字段定义后直接声明外键,适用于单个字段作为外键的场景。

```sql
CREATE TABLE orders (
    order_num INT PRIMARY KEY,
    order_date DATE NOT NULL,
    -- 列级声明外键
    cust_id INT REFERENCES customers(cust_id)
);
```

> `REFERENCES customers(cust_id)` 表示:`orders.cust_id` 的值必须来自 `customers.cust_id` 的已存在值。

#### 2.2 表级外键

在所有字段定义完成后,通过 `FOREIGN KEY` 子句单独声明,适用于复合外键(多个字段组合作为外键)或需要给外键命名的场景。

**表级声明外键的语法结构:**

```sql
-- 外键声明部分
[CONSTRAINT 外键名称]                -- 可选:给外键命名
FOREIGN KEY (从表外键字段)            -- 指定从表中作为外键的字段
REFERENCES 主表名(主表被参照字段)     -- 指定关联的主表及主表中的字段(主键或唯一键)
[ON DELETE 级联规则]                 -- 可选:主表记录删除时的联动规则
[ON UPDATE 级联规则]                 -- 可选:主表被参照字段更新时的联动规则
```

> 外键可以不命名,数据库会自动生成一个默认名称,在 MySQL 中,默认名称格式为 `{table_name}_ibfk_{N}`。

```sql
CREATE TABLE orders (
    order_num INT PRIMARY KEY,
    order_date DATE NOT NULL,
    cust_id INT,
    -- 表级声明外键
    CONSTRAINT fk_orders_customers
    FOREIGN KEY (cust_id)
    REFERENCES customers(cust_id)
);
```

#### 2.3 给已存在的表添加外键

**要求:** 给已存在的 `orders` 表添加外键,关联 `customers` 表。

```sql
ALTER TABLE orders
ADD CONSTRAINT fk_orders_customers
FOREIGN KEY (cust_id)
REFERENCES customers(cust_id);
```

#### 2.4 删除外键

```sql
ALTER TABLE 从表名
DROP FOREIGN KEY 外键名称;
```

### 3. 唯一约束(UNIQUE)

唯一约束用于保证列(或列组合)中的数据是唯一的,与主键不同的是:

| 对比点 | 主键 | 唯一约束 |
| --- | --- | --- |
| 每表是否可多个 | 一个 | 可多个 |
| 是否允许 NULL | 不允许 | 可以允许 NULL |
| 是否可修改 | 逻辑上不建议 | 允许修改 |

#### 3.1 列级唯一约束

```sql
CREATE TABLE customers (
    cust_id INT PRIMARY KEY,
    cust_name VARCHAR(50) NOT NULL,
    cust_email VARCHAR(50) UNIQUE,  -- 列级唯一约束
    cust_phone VARCHAR(20)
);
```

#### 3.2 表级唯一约束

通过 `CONSTRAINT` 命名约束,适用于单个字段或复合字段。

```sql
CREATE TABLE customers (
    cust_id INT PRIMARY KEY,
    cust_name VARCHAR(50) NOT NULL,
    cust_email VARCHAR(50),
    cust_phone VARCHAR(20),
    -- 表级声明:单个字段唯一
    CONSTRAINT uk_cust_email UNIQUE (cust_email),
    -- 表级声明:复合字段唯一
    CONSTRAINT uk_name_phone UNIQUE (cust_name, cust_phone)
);
```

#### 3.3 创建表后添加唯一约束

```sql
-- 对单个字段添加
ALTER TABLE customers
ADD CONSTRAINT uk_cust_email UNIQUE (cust_email);

-- 对复合字段添加
ALTER TABLE customers
ADD CONSTRAINT uk_name_phone UNIQUE (cust_name, cust_phone);
```

## 九、插入数据(INSERT)

`INSERT` 用于将数据插入表中。

### 1. 插入完整的行

#### 1.1 写法一:不指定列名(不推荐)

**语法结构:**

```sql
INSERT INTO 表名
VALUES (值1, 值2, 值3, ...);
```

```sql
INSERT INTO products
VALUES (1009, '电竞耳机', 499, 101);
```

> 所有值必须严格按照表结构顺序,不推荐,因为顺序变化容易出错。

#### 1.2 写法二:指定列名插入(推荐)

**语法结构:**

```sql
INSERT INTO 表名 (列1, 列2, 列3, ...)
VALUES (值1, 值2, 值3, ...);
```

```sql
INSERT INTO products (prod_id, prod_name, prod_price, vend_id)
VALUES (1010, '便携投影仪', 1099, 102);
```

> 顺序明确,更安全、更稳定,表结构变动也不容易出错。

### 2. 插入部分列(省略某些字段)

```sql
INSERT INTO products (prod_id, prod_name, vend_id)
VALUES (1011, '智能手表', 100);
```

- 未提供 `prod_price`,系统将插入 NULL 或默认值
- 条件:省略的字段必须允许 NULL 或设置默认值

### 3. 批量插入

插入大量数据时,单条 `INSERT` 效率低,使用批量插入:

```sql
INSERT INTO products (prod_id, prod_name, prod_price, vend_id)
VALUES
    (1012, 'U盘', 69, 100),
    (1013, '移动硬盘', 399, 101),
    (1014, '读卡器', 29, 102);
```

### 4. 插入查询结果

把一张表中的数据插入另一张表,使用 `INSERT` 和 `SELECT`。

**语法结构:**

```sql
INSERT INTO 目标表名 (列1, 列2, 列3, ...)
SELECT 列1, 列2, 列3, ...
FROM 源表名
[WHERE 条件];
```

**要求:** 把 `vend_id` 为 100 的产品插入一个新表中:

```sql
CREATE TABLE hotProducts (
    prod_id INT PRIMARY KEY,
    prod_name VARCHAR(45),
    prod_price DOUBLE,
    vend_id INT
);

INSERT INTO hotProducts (prod_id, prod_name, prod_price, vend_id)
SELECT prod_id, prod_name, prod_price, vend_id
FROM products
WHERE vend_id = 100;
```

**注意事项:**

- `INSERT SELECT` 用于将一个表中的数据批量插入另一个表
- `SELECT` 的列必须和 `INSERT` 指定的列数量、顺序、数据类型一致
- 可加 `WHERE` 过滤插入的数据
- `INSERT` 和 `SELECT` 的列名尽量一致(虽然技术上不要求一致,只要位置和类型匹配)

**更方便的写法:**

```sql
CREATE TABLE hotProducts LIKE products;

INSERT INTO hotProducts
SELECT *
FROM products
WHERE vend_id = 100;
```

> 但是这种方式会完全复制原表结构,无法灵活修改新表的字段类型或约束。

## 十、更新数据(UPDATE)

**语法结构:**

```sql
UPDATE 表名
SET 列名 = 新值, ...
[WHERE 条件];
```

### 更新某一行的多个字段

**要求:** 将商品 1009 改名为蓝牙耳机,价格改为 599。

```sql
UPDATE products
SET prod_name = '蓝牙耳机',
    prod_price = 799
WHERE prod_id = 1011;  -- 这里不能省略 WHERE,否则会更新整张表
```

## 十一、删除数据(DELETE)

**语法结构:**

```sql
DELETE FROM 表名
[WHERE 条件];
```

### 1. 删除指定行

**要求:** 删除 `prod_id = 1014` 的读卡器产品。

```sql
DELETE FROM products
WHERE prod_id = 1014;
```

> ⚠️ 如果省略 WHERE,会删除整张表所有记录,但是会保留表结构,需谨慎使用,如:`DELETE FROM hotProducts;` 记得要加分号。

```sql
-- NULL 的稍微特殊一点
DELETE FROM products
WHERE prod_price IS NULL;
```

### 2. TRUNCATE TABLE

如果想从表中删除所有行,不要使用 `DELETE`。可使用 `TRUNCATE TABLE` 语句,它完成相同的工作,而速度更快。

```sql
TRUNCATE TABLE 表名;
```

> `TRUNCATE` 会重置 `AUTO_INCREMENT`,而 `DELETE` 不会重置。

## 十二、聚集函数

聚集函数用于将多行数据汇总为一个结果。常用于:

- 统计行数(如符合某条件的数量)
- 求某列的最大值、最小值、平均值或总和等

SQL 提供了 5 个常用聚集函数:

| 函数 | 说明 |
| --- | --- |
| AVG() | 求平均值 |
| COUNT() | 统计行数 |
| MAX() | 返回最大值 |
| MIN() | 返回最小值 |
| SUM() | 求总和 |

### 1. AVG() 平均值函数

**用法:**

```sql
SELECT AVG(column) FROM 表名;
```

可返回整列或某一条件下的平均值。

**要求:** 统计所有商品的平均价格。

```sql
SELECT AVG(prod_price) AS avg_price
FROM products;
```

**带条件过滤:**

```sql
SELECT AVG(prod_price) AS avg_price
FROM products
WHERE vend_id = 100;
```

> - `AVG()` 只能用于数值列
> - 自动忽略 NULL 值

### 2. COUNT() 计数函数

**用法:**

- `COUNT(*)`:统计所有行数(包括 NULL)
- `COUNT(column)`:只统计非 NULL 值的行数

**要求:** 统计 `products` 表中商品的总数量。

```sql
SELECT COUNT(*) AS num_prod FROM products;
```

**要求:** 统计 `products` 表中价格不为空的商品数量。

```sql
SELECT COUNT(prod_price) AS num_prod FROM products;
```

### 3. MAX() 最大值函数

**用法:**

```sql
SELECT MAX(column) FROM 表名;
```

**要求:** 查询所有商品中的最高价格。

```sql
SELECT MAX(prod_price) AS max_price FROM products;
```

> - 忽略 NULL
> - 可用于非数值类型,比如使用字符串类型时依赖排序规则

### 4. MIN() 最小值函数

与 `MAX()` 相反,返回最小值。

**要求:** 查询所有商品中的最低价格。

```sql
SELECT MIN(prod_price) AS min_price FROM products;
```

> `MIN()` 也可用于非数值列并且会忽略 NULL 值。

### 5. SUM() 求和函数

**用法:**

```sql
SELECT SUM(column) FROM 表;
```

**要求:** 计算所有商品的总价格。

```sql
SELECT SUM(prod_price) AS total_price
FROM products;
```

**要求:** 计算不同供应商的商品总价格。

```sql
SELECT vend_id, SUM(prod_price) AS total_price
FROM products
GROUP BY vend_id;
```

**要求:** 假设每个商品都卖了 2 件,计算总价格。

```sql
SELECT SUM(prod_price * 2) AS total_sales
FROM products;
```

### 6. 聚集不同值(DISTINCT)

- 聚集函数默认是对所有值(包括重复)进行聚合
- 使用 `DISTINCT` 可只对不重复值聚合

比如价格是 `[100, 100, 200]`:

- 普通 `AVG()`,`(100 + 100 + 200) ÷ 3 ≈ 133.33`
- `AVG(DISTINCT ...)`,`(100 + 200) ÷ 2 = 150`

```sql
SELECT AVG(DISTINCT prod_price) AS avg_price
FROM products
WHERE vend_id = 100;
```

## 十三、创建分组(GROUP BY 子句)

### 1. 基础语法

通过在 `SELECT` 语句中使用 `GROUP BY` 子句来创建分组。`GROUP BY` 通常和聚合函数搭配使用,否则分组的意义不大。

**要求:** 统计各供应商的产品数量。

```sql
SELECT vend_id, COUNT(*) AS num_prods
FROM products
GROUP BY vend_id;
```

### 2. GROUP BY 子句的重要规则

#### 2.1 SELECT 里非聚合的列,必须全部出现在 GROUP BY 里

| 字段类型 | 定义 | 例子 |
| --- | --- | --- |
| 普通字段(非聚合字段) | 直接从表中取出的原始列,或基于原始列的表达式,描述单条记录的属性 | `vend_id`、`prod_price`、`vend_id*2` |
| 聚合字段 | 通过聚合函数计算得到的列,描述一组记录的统计结果 | `COUNT(*)`、`SUM(prod_price)`、`AVG(prod_price)` |

**正确写法:**

```sql
SELECT vend_id, prod_name, COUNT(*)
FROM products
GROUP BY vend_id, prod_name;
```

#### 2.2 GROUP BY 可以多列分组,多列是组合键(按组合值分组)

比如上面的 `GROUP BY vend_id, prod_name`;数据库会按 `vend_id` 和 `prod_name` 列进行复合分组,将 `vend_id` 和 `prod_name` 的值完全相同的记录归为同一个分组,然后对每个分组执行聚合计算。

#### 2.3 GROUP BY 不能用聚合函数、不能用列别名,要用原表达式

```sql
SELECT vend_id, prod_price * 0.8 AS discount_price, COUNT(*)
FROM products
GROUP BY vend_id, prod_price * 0.8;
```

#### 2.4 GROUP BY 书写顺序:WHERE 后、ORDER BY 前

> SQL 子句的书写顺序是:`SELECT`、`FROM`、`WHERE`、`GROUP BY`、`HAVING`、`ORDER BY`。

## 十四、过滤分组(HAVING 子句)

**Q:** 为什么需要过滤分组?

**A:** 使用 `GROUP BY` 可以将数据分组,但有时我们需要对分组后的结果再进行筛选,但 `WHERE` 子句只能在分组前筛选行,无法对分组后的结果进行过滤,因此需要新的工具。

`HAVING` 子句用于分组后筛选分组,通常与 `GROUP BY` 配合使用。

**创建一个订单表如下:**

```sql
-- 创建 orders 订单表
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,  -- 订单ID(主键,自增)
    cust_id INT NOT NULL,                     -- 客户ID(用于分组)
    order_date DATE NOT NULL,                 -- 下单日期
    order_amount DECIMAL(10,2) NOT NULL       -- 订单金额
);

INSERT INTO Orders (cust_id, order_date, order_amount) VALUES
(101, '2026-01-05', 199.00),
(101, '2026-01-12', 299.00),  -- 客户101:第2个订单
(101, '2026-01-20', 89.00),   -- 客户101:第3个订单
(102, '2026-01-08', 699.00),
(102, '2026-01-18', 399.00),  -- 客户102:第2个订单
(103, '2026-01-10', 1299.00), -- 客户103:仅1个订单
(104, '2026-01-15', 499.00),
(104, '2026-01-22', 899.00),  -- 客户104:第2个订单
(105, '2026-01-03', 59.00);   -- 客户105:仅1个订单
```

> `DATE` 标准格式是 `YYYY-MM-DD`。

**要求:** 统计至少有 2 个订单的客户。

```sql
SELECT cust_id, COUNT(*) AS orders
FROM orders
GROUP BY cust_id
HAVING COUNT(*) >= 2;
```

### HAVING 与 WHERE 的区别

| 特性 | WHERE | HAVING |
| --- | --- | --- |
| 作用时机 | 分组前筛选行 | 分组后筛选分组 |
| 作用对象 | 行数据 | 分组聚合结果 |
| 能否使用聚合函数 | 不能 | 可以 |

## 十五、SQL 子查询

> 地址链接:<https://blog.csdn.net/2301_79609207/article/details/157430127>

### 1. 子查询的基本概念

- **简单查询:** 指从单个数据库表中检索数据的单条无嵌套 `SELECT` 语句。
- **查询(query):** 任何 SQL 语句都可称为查询,但通常特指 `SELECT` 语句。
- **子查询(subquery):** 嵌套在其他查询中的查询称为子查询,可以将一个查询的结果作为另一个查询的输入。

### 2. 准备数据表

在学习子查询前,先创建订单明细表 `orderItems` 和顾客表 `customers`。

```sql
CREATE TABLE orderItems (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,  -- 订单商品明细 ID
    order_id INT NOT NULL,                         -- 订单 ID
    prod_id INT NOT NULL,                          -- 商品 ID
    quantity INT NOT NULL DEFAULT 1,               -- 商品数量
    item_price DECIMAL(10,2) NOT NULL,             -- 商品单价
    FOREIGN KEY (order_id) REFERENCES orders (order_id),
    FOREIGN KEY (prod_id) REFERENCES products (prod_id)
);

INSERT INTO orderItems (order_id, prod_id, quantity, item_price)
VALUES
(1, 1007, 2, 89.00),   -- 订单1包含商品1007(无线充电器)
(2, 1001, 1, 5999.00), -- 订单2包含商品1001(笔记本电脑)
(3, 1003, 1, 299.00),  -- 订单3包含商品1003(机械键盘)
(4, 1007, 3, 89.00);   -- 订单4包含商品1007(无线充电器)
```

```sql
CREATE TABLE customers (
    cust_id INT PRIMARY KEY AUTO_INCREMENT,   -- 顾客ID
    cust_name VARCHAR(50) NOT NULL,           -- 顾客姓名
    cust_phone VARCHAR(20),                   -- 顾客手机号
    cust_email VARCHAR(50),                   -- 顾客邮箱
    cust_address VARCHAR(100)                 -- 顾客地址
);

INSERT INTO customers (cust_id, cust_name, cust_phone, cust_email, cust_address)
VALUES
(101, '张三', '13800138001', 'zhangsan@example.com', '北京市朝阳区'),
(102, '李四', '13900139002', 'lisi@example.com', '上海市浦东新区'),
(103, '王五', '13700137003', 'wangwu@example.com', '广州市天河区'),
(104, '赵六', '13600136004', 'zhaoliu@example.com', '深圳市南山区'),
(105, '孙七', '13500135005', 'sunqi@example.com', '杭州市西湖区');

ALTER TABLE orders
ADD CONSTRAINT fk_orders_customers
FOREIGN KEY (cust_id) REFERENCES customers(cust_id);
```

**Q:** 为什么关于 `cust_id` 的外键约束要加在订单表而不是顾客表上?

**A:** 因为外键约束是从表指向主表的,外键约束加在 `orders` 表的 `cust_id` 上就说明 `customers` 表是主表,`orders` 表是从表。外键的作用是限制从表的取值范围,现在 `orders` 表是从表,就不可以在 `orders` 表中插入 `customers` 表中没有的顾客,这样做的好处是可以避免脏数据。如果反过来给 `customers` 表的 `cust_id` 加外键指向 `orders` 表,这样就导致创建新顾客时,必须先在 `orders` 表中存在该顾客的订单记录,完全不符合实际场景,因为新注册的顾客可以没有任何订单,却无法被正常创建。

### 3. 利用子查询进行过滤

**要求:** 查询订购商品 1007 的所有顾客信息。

**步骤 1:** 查询包含商品 1007 的所有订单编号。

```sql
SELECT order_id
FROM orderItems
WHERE prod_id = 1007;
```

**步骤 2:** 通过订单号获取顾客 ID。

```sql
SELECT cust_id
FROM orders
WHERE order_id IN (1, 4);
```

**步骤 3:** 通过顾客 ID 获取顾客信息。

```sql
SELECT cust_id, cust_name, cust_phone
FROM customers
WHERE cust_id IN (101, 102);
```

**子查询合并写法:** 将分步查询嵌套为一条语句:

```sql
SELECT cust_id, cust_name, cust_phone
FROM customers
WHERE cust_id IN (
    SELECT cust_id
    FROM orders
    WHERE order_id IN (
        SELECT order_id
        FROM orderItems
        WHERE prod_id = 1007
    )
);
```

> - **执行顺序:** 子查询由内向外执行,最内层子查询的结果作为外层查询的条件。
> - 子查询并非总是最有效的数据检索方式,后续会介绍更高效的 JOIN 写法。

**Q:** 为什么说子查询不一定是最有效的?

**A:** 子查询的执行逻辑是从内到外、分步执行,每一层子查询都会生成一个临时结果集,再传递给外层查询。这种分步执行的方式在数据量大时,会产生多个临时表和多次数据扫描,性能不如一次关联多表的 JOIN 高效。

```sql
SELECT c.cust_id, c.cust_name, c.cust_phone
FROM customers c
INNER JOIN orders o ON c.cust_id = o.cust_id
INNER JOIN orderItems oi ON o.order_id = oi.order_id
WHERE oi.prod_id = 1007;
```

### 4. 作为计算字段使用子查询

**Q:** 什么是计算字段?

**A:** 计算字段不是数据库表中原本就存在的列,而是通过:

- 算术运算(如 `price * quantity`)
- 函数计算(如 `COUNT()`、`SUM()`、`CONCAT()`)
- 子查询返回值等等

生成的虚拟列,仅在查询结果中临时存在,不会存储在表中。所以**表中没有的列,但在查询时临时算出来的列就是计算字段**。

**要求:** 查询每个顾客的订单总数。

**步骤 1:** 对单个顾客统计订单数。

```sql
SELECT COUNT(*) AS orders
FROM orders
WHERE cust_id = 101;
```

**步骤 2:** 子查询整合,为每个顾客动态计算订单数。

```sql
SELECT cust_id,
       cust_name,
       (SELECT COUNT(*)
        FROM orders
        WHERE orders.cust_id = customers.cust_id) AS orders
FROM customers
ORDER BY cust_id;
```

**执行逻辑:**

1. 主查询先取 `customers` 表的第一行(`cust_id=101`)
2. 子查询执行时,`customers.cust_id` 会被替换成当前行的 101,条件变成 `WHERE orders.cust_id = 101`
3. 子查询只筛选 `orders` 表中 `cust_id=101` 的行,统计数量后返回给主查询
4. 主查询再取 `customers` 表的第二行,重复上述步骤……

代码的作用是给 `customers` 表中的每一个客户,单独统计其对应的订单数量,返回结果的行数 = `customers` 表的客户总数。

> ⚠️ 需要注意的是当多表存在同名列(`orders.cust_id` 和 `customers.cust_id`)时,必须用**表名.列名**的格式明确指定,避免歧义。

## 十六、联结(JOIN)

### 1. 为什么使用联结

- **背景:** 数据拆分到多个表后,需要用一条 `SELECT` 语句跨表查询数据。
- **定义:** 联结(JOIN,也称连接)是用于从两个或多个关系表中,基于共同的字段,按照指定条件组合行数据的查询操作。
- **作用:** 可以在一次查询中从多个关联表中提取并组合数据。

### 2. 准备数据表

在学习联结时,需要先创建 `vendors` 表并且为产品表添加外键。

```sql
CREATE TABLE vendors (
    vend_id INT PRIMARY KEY,               -- 供应商ID
    vend_name VARCHAR(100) NOT NULL,       -- 供应商名称
    vend_address VARCHAR(200),             -- 供应商地址
    vend_phone VARCHAR(20)                 -- 供应商电话
);

INSERT INTO vendors (vend_id, vend_name, vend_address, vend_phone)
VALUES
(100, '科技优品供应商', '北京市海淀区中关村大街1号', '010-12345678'),
(101, '数码配件厂商', '广东省深圳市南山区科技园', '0755-87654321'),
(102, '电竞设备供应商', '上海市浦东新区张江科技园', '021-11223344');

ALTER TABLE products
ADD CONSTRAINT fk_products_vendors
FOREIGN KEY (vend_id)
REFERENCES vendors(vend_id)
ON UPDATE CASCADE    -- 供应商ID更新时,关联的产品表自动同步
ON DELETE RESTRICT;  -- 禁止删除有产品关联的供应商
```

### 3. 创建联结

#### 3.1 基础语法(等值联结)

等值联结是最基础的表关联方式,它通过两个表中相等的列值来建立关联。

**必须同时满足以下两点,才能被称为等值联结:**

- **语法层面:** 多个表出现在 `FROM` 子句中(并列写,或用 `JOIN` 关键字),形成表的拼接
- **条件层面:** 用 `=` 作为表之间的关联条件

**要求:** 查询所有产品对应的供应商名称、产品名称及价格。

```sql
SELECT vend_name, prod_name, prod_price
FROM products, vendors
WHERE products.vend_id = vendors.vend_id;
```

> 这是早期 SQL 中实现联结的原始写法,通过在 `FROM` 子句中用逗号分隔表,再在 `WHERE` 子句中写联结条件。后来引入了 `INNER JOIN ... ON` 的标准写法。
>
> ⚠️ 当列名在多个表中存在时,必须用**表名.列名**格式。

### 4. 内联结(INNER JOIN)

- **等值联结:** 是内联结的子集,是内联结中最常用的形式
- **内联结:** 是一个更宽泛的概念,只要是只返回两表匹配行的联结,都叫内联结,不管关联条件是等号还是其他运算符

#### 4.1 内联结的 3 种常见写法【以等值联结为例】

**写法 1:标准写法(`INNER JOIN ... ON`)**

标准写法需要完整写 `INNER JOIN`,用 `ON` 指定联结条件。

```sql
SELECT p.prod_name, v.vend_name
FROM products p
INNER JOIN vendors v
  ON p.vend_id = v.vend_id;
```

**写法 2:简化写法(省略 INNER,只写 `JOIN ... ON`)**

`INNER` 可以省略,`JOIN` 默认就是内联结。

```sql
SELECT p.prod_name, v.vend_name
FROM products p
JOIN vendors v
  ON p.vend_id = v.vend_id;
```

**写法 3:旧式写法(WHERE 替代 ON)**

```sql
SELECT p.prod_name, v.vend_name
FROM products p, vendors v
WHERE p.vend_id = v.vend_id;
```

> 这种写法是 SQL 早期的语法形式,随着 SQL 标准的演进,显式的 `JOIN ... ON` 写法成为了官方推荐的新式写法。

**ON 与 WHERE 的区别:**

- `ON` 子句后面跟**关联条件**,用于定义两张表如何配对
- `WHERE` 后面跟**过滤条件**,用于定义最终保留哪些行
- `INNER JOIN ... ON ...` 要写在 `WHERE` 前面
- 隐式内联结没有 `ON` 子句,所以我们借用 `WHERE` 来写关联条件

#### 4.2 非等值联结

内联结除了等值联结还有非等值联结,它也属于内联结,但很少见。非等值联结关联条件不是等号,用 `BETWEEN ... AND`、`>`、`<`、`>=`、`<=` 等非等号条件。

**要求:** 给每个产品匹配对应的价格等级。

```sql
SELECT
    p.prod_name,
    p.prod_price,
    pl.level_name
FROM products p
INNER JOIN price_levels pl
  ON p.prod_price BETWEEN pl.min_price AND pl.max_price;
```

> `ON` 子句会把所有返回 true 的行组合保留下来。

**在运行代码前需要提前创建价格等级表:**

```sql
CREATE TABLE price_levels (
    level_id INT PRIMARY KEY,
    level_name VARCHAR(20),
    min_price DECIMAL(8,2),
    max_price DECIMAL(8,2)
);

INSERT INTO price_levels VALUES
(1, '低价商品', 0, 100),
(2, '中价商品', 100, 500),
(3, '高价商品', 500, 3000),
(4, '奢品商品', 3000, 10000);
```

### 5. 联结多个表

**要求:** 查询订购商品 1007 的所有顾客信息。

**标准写法:**

```sql
SELECT DISTINCT c.cust_id, c.cust_name, c.cust_phone
FROM customers c
INNER JOIN orders o ON c.cust_id = o.cust_id
INNER JOIN orderItems oi ON o.order_id = oi.order_id
WHERE oi.prod_id = 1007;
```

**旧式写法:**

```sql
SELECT DISTINCT c.cust_id, c.cust_name, c.cust_phone
FROM customers c, orders o, orderItems oi
WHERE
    c.cust_id = o.cust_id
    AND o.order_id = oi.order_id
    AND oi.prod_id = 1007;
```

**注意事项:**

- `FROM` 子句列出所有需要联结的表
- `WHERE` 子句定义所有表之间的联结条件(表的数量为 N 时,至少需要 N-1 个联结条件)
- 过滤条件建议写在 `WHERE` 末尾

### 6. 内联结与子查询搭配使用

**要求:** 查询 2026 年 1 月有下单记录的客户的姓名、电话,以及订单号。

```sql
SELECT
    c.cust_name,
    c.cust_phone,
    o.order_id
FROM customers c
INNER JOIN (
    SELECT order_id, cust_id
    FROM orders
    WHERE order_date BETWEEN '2026-01-01' AND '2026-01-31'
) o ON c.cust_id = o.cust_id;
```

| 类型 | 定义 | 执行逻辑 | 特点 |
| --- | --- | --- | --- |
| 非相关子查询 | 子查询可以独立执行,先算出结果再传给主查询用 | 先执行子查询,再执行主查询 | 子查询不依赖主查询的任何字段 |
| 相关子查询 | 子查询不能独立执行,要依赖主查询的字段才能运行 | 主查询逐行执行,子查询跟着逐行跑 | 子查询引用主查询的字段 |

**只用联结的写法:**

```sql
SELECT
    c.cust_name,
    c.cust_phone,
    o.order_id
FROM customers c
INNER JOIN orders o ON c.cust_id = o.cust_id
WHERE o.order_date BETWEEN '2026-01-01' AND '2026-01-31';
```

> 只用联结是先关联再筛选,同时使用子查询和联结是先筛选再关联。

### 7. 自联结

自联结是一种将单张物理表与自身进行联结的操作。

**判定自联结的条件:**

1. 联结对象是同一张物理表
2. 必须为表定义不同的别名
3. 联结条件是关联同一张表内的行

**自联结必须依赖内联结、左联结、右联结才能实现。**

> 自联结是**联结的对象类型**,内联结、左联结、右联结是**行保留的逻辑规则**:
>
> - 内联结:只取满足联结条件的匹配行
> - 左联结:保留左表所有行,右表无匹配则补 NULL
> - 右联结:保留右表所有行,左表无匹配则补 NULL

**要求:** 找出每个供应商中比无线鼠标更贵的产品。

```sql
SELECT
    p1.prod_name AS 基础商品,
    p1.prod_price AS 基础价格,
    p2.prod_name AS 高价同类商品,
    p2.prod_price AS 高价
FROM products p1
INNER JOIN products p2
  ON p2.vend_id = p1.vend_id
  AND p2.prod_price > p1.prod_price
WHERE p1.prod_name = '无线鼠标';
```

### 8. 外联结

外联结是一种联结操作,会保留一个或两个参与联结表的所有行,即便另一张表中无匹配行。被保留表的非匹配行会被纳入结果集,且其对应非匹配表的列值会填充为 NULL。

**外联结包含三个具体分类:**

- **左外联结(LEFT OUTER JOIN,简写 LEFT JOIN):** 保留左表所有行
- **右外联结(RIGHT OUTER JOIN,简写 RIGHT JOIN):** 保留右表所有行
- **全外联结(FULL OUTER JOIN,简写 FULL JOIN):** 同时保留左表和右表所有行

#### 8.1 左联结(LEFT OUTER JOIN)

保留左表的所有行,如果右表没有匹配行,右表字段显示为 NULL。

**为顾客表添加一行数据,该顾客没有订单:**

```sql
INSERT INTO customers
(cust_id, cust_name, cust_phone, cust_email, cust_address)
VALUES
(106, '周八', '13800138006', 'zhoub@example.com', '成都市锦江区');
```

**要求:** 查询所有客户的 ID、名称及其对应的订单总数,按订单总数降序排列。

```sql
SELECT
  c.cust_id,
  c.cust_name,
  COUNT(o.order_id) AS order_total
FROM customers c
LEFT JOIN orders o
  ON c.cust_id = o.cust_id
GROUP BY c.cust_id, cust_name
ORDER BY order_total DESC;
```

**注意事项:**

- 无论是左联结还是右联结,`FROM` 后跟的是**左表**,`JOIN` 后面的是**右表**
- 如果使用内联结会丢失无订单的客户,不符合所有客户的需求
- 若 `GROUP BY` 中的列是表的主键,则该表中所有其他列都函数依赖于这个主键,即主键确定后,其他列的值唯一确定,此时这些列可以不出现在 `GROUP BY` 中
- 只要 `SELECT` 查询的字段出现了主键,并且 `SELECT` 中的所有非聚合字段都仅来自该主键所在的表,那么 `GROUP BY` 中就可以只写主键

**要求:** 统计所有客户的订单及订单商品信息。

```sql
SELECT
  c.cust_id,
  c.cust_name,
  o.order_id,
  oi.prod_id,
  oi.quantity
FROM customers c
LEFT JOIN orders o
  ON c.cust_id = o.cust_id
LEFT JOIN orderItems oi
  ON o.order_id = oi.order_id
ORDER BY c.cust_id;
```

> 逻辑链:`customers → orders → orderItems`

**右联结写法:**

```sql
SELECT
  c.cust_id,
  c.cust_name,
  o.order_id,
  oi.prod_id,
  oi.quantity
FROM orderItems oi
RIGHT JOIN orders o
  ON oi.order_id = o.order_id
RIGHT JOIN customers c
  ON o.cust_id = c.cust_id
ORDER BY c.cust_id;
```

#### 8.2 右联结(RIGHT OUTER JOIN)

保留右表的所有行,如果左表没有匹配行,左表字段显示为 NULL。

> 左联结可以完全能取代右联结,只要调换两张表在 `FROM` 和 `JOIN` 中的位置,左联结就能实现和右联结一模一样的效果,实际开发中大部分时候也只用左联结,很少写右联结。

## 十七、联结类型总结

| 联结类型 | 适用场景 |
| --- | --- |
| 内联结 | 只留匹配行 |
| 左联结 | 保留左表的所有行 |
| 右联结 | 保留右表的所有行 |
| 自联结 | 查同一张表的关联数据 |
