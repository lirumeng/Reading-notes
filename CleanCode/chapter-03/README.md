### 函数
函数是所有程序中得第一组代码。本章将讨论如何写好函数。

#### 1. 短小
函数的第一规则是要短小，第二条规则是还要更短小。
函数到底该有多长？
- 一目了然
- 只做一件事
- 每个函数都依序把你带到下一个函数。

> 代码块和缩进

if语句、else语句、while语句等，其中的代码块应该只有一行。该行大抵应该是一个函数调用语句。这样不但能保持函数短小，而且，因为块内调用的函数拥有较具说明性的名称，从而增加了文档上的价值。
这也意味着函数不应该大到足以容纳嵌套结构。所以，函数的缩进层级不该多于一层或两层。当然，这样的函数易于阅读和理解。

#### 2. 只做一件事
过去30年以来，以下建议以不同形式一再出现：
`函数应该做一件事。做好这件事。只做这一件事。`
问题在于很难知道那件该做的事是什么。

代码清单3-3只做了一件事：
```java
public static String renderPageWithSetupsAndTeardowns(
  PageData pageData,bollean isSuite ) throws Exception {
    if(isTestPage(pageData))
      includeSetupAndTeardownPages(pageData, isSuite);
    return pageData.getHtml();
}
```
其实很容易看作是三件事：

（1）判断是否为测试页面；

（2）如果是，则容纳进设置和分拆步骤；

（3）渲染成HTML。

这三个步骤均在该函数名下的同一抽象层上。如果函数只是做了该函数名下同一抽象层上的步骤，则函数还是只做了一件事。编写函数毕竟是为了把大一些的概念（函数名称）拆分为另一抽象层上的一系列步骤。

#### 3. 每个函数一个抽象层级
要确保函数只做一件事，函数中的语句都要在同一抽象层级上。

- 自顶向下读代码：向下规则


#### 4. switch语句
写出短小的switch语句很难。不幸我们总无法避开switch语句，不过还是能够确保每个switch都埋藏在较低的抽象层级，而且永远不会重复。可以利用多态来实现这一点。
```java
public Money calculatePay(Employee e)
throws InvalidEmployeeType{
  switch(e.type){
    case COMMISSIONED:
      return calculateCommissionedPay(e);
    case HOURLY:
      return calculateHourlyPay(e);
    case SALARIED:
      return calculateSalariedPay(e);
    default:
      throw new InvalidEmployeeType(e.type);
  }
}
```
该函数有好几个问题。

- 太长，当出现新的雇员类型时，还会变的更长。
- 它明显做了不止一件事。
- 它违反了单一权责原则，因为有好几个修改它的理由。
- 他违反了开放闭合原则，因为每当添加新类型时，就必须修改之。

不过该函数最麻烦的可能是到处皆有类似结构的函数。例如，可能会有
```
isPayday(Employee e,Date date)
```
或
```
deliverPay(Employee e,Money pay)
```
如此等等。它们的结构都有同样的问题。
该问题的解决方案是将switch语句埋到抽象工厂底下，不让任何人看到。该工厂使用switch语句为Employee派生物创建适当的实体，而不同的函数，如calculatePay、isPay和deliverPay等，则藉由Employee接口多态地接受派遣。
对于switch语句，我的规则是如果出现一次，用于创建多态对象，而且隐藏在某个继承关系中，在系统其他部分看不到，就还能容忍（当然也要就事论事）。
```java
public abstract class Employee{
    public abstract boolean isPayday();
    public abstract Money calculatePay();
    public abstract void deliverPay(Money pay);
}
------------
public interface EmployeeFactory {
    public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType;
}
------------
public class EmployeeFactoryImpl implements EmployeeFactory{
    public Employee markEmployee(EmployeeRecord r) throws InvalidEmployeeType{
        switch(r.type){
            case COMMISSIONED:
                return new CommissionedEmployee(r);
            case HOURLY:
                return new HourlyEmployee(r);
            case SALARIED:
                return new SalariedEmployee(r.type);
             default:
                throws new INvalidEmployeeType(r.type);
        }
    }
}
```
#### 5. 使用描述性的名称
函数越短小、功能越集中，就越便于取个好名字。
- 别害怕长名称。长且具有描述性的名称，要比短而令人费解的名称好。长而具有描述性的名称，要比描述性的长注释好。
- 别害怕花时间取名字。
选择描述性的名称能清理你关于模块的设计思路，并帮你改进之。追索好名称，往往导致对代码的改善重构。
- 命名方式要保持一致。
#### 6. 函数参数
最理想的参数数量是零，其次是一，再其次是二，应尽量避免三。有足够特殊的理由才能用三个以上参数。
- 参数不易对付。
- 从测试的角度看，参数甚至更叫人为难。
- 输出参数比输入参数还要难以理解。
##### 一元函数的普遍形式
向函数传入单个参数有两种极普遍的理由。
- 操作参数，将其转换为其他什么东西，再输出之。
- 事件。有输入参数而无输出参数。
#### 7.  无副作用
应避免使用输出参数。如果函数必须要修改某种状态，就修改所属对象的状态吧。
#### 8. 分割指令与询问
函数要么做什么事，要么回答什么事，但二者不可得兼。函数应该修改某对象的状态，或是返回该对象的有关信息。
#### 9. 使用异常代替返回错误码
##### 抽离try/catch代码块
try/catch代码块，搞乱了代码结构，把错误处理与正常流程混为一谈。最好把try和catch代码块的主体部分抽离出来，另外形成函数。
```java
public void delete(Page page){
    try{
        deletePageAndAllReferences(page);
    }catch(Exception e){
        logError(e);
    }
}
private void deletePageAndAllReferences(Page page) throws Exception{
    deletePage(page);
    registry.deleteReferences(page.name);
    configKeys.deleteKey(page.name.makeKey());
}
private void logError(Exception e){
    logger.log(e.getMessage());
}
```
在上例中，delete函数只与错误处理有关。很容易理解然后就忽略掉。deletePageAndAllReferences函数只与完全删除一个page有关。错误处理可以忽略掉。
##### 错误处理就是一件事
函数赢啊只做一件事。错误处理就是一件事。因此，处理错误的函数不该做其他事。这意味着如果关键字try在某个函数中存在，它就该是这个函数的第一个单词，而且在catch/finally代码后面也不该有其他内容。
#### 10. 别重复自己
重复代码会导致问题，因为代码因此而臃肿，且当算法改变时需要修改几处地方。而且也会增加几次放过错误代码的可能性。
重复可能是软件中一切邪恶的根源。许多原则与实践规则都是为控制与消除重复而创建。面向对象编程是如何将代码集中到基类，从而避免了荣誉。面向方面编程、面向组件编程多少也都是消除重读的一种策略。
#### 11. 结构化编程
有些程序员遵循Edsger Dijkstra的结构话编程规则。Dijkstra认为，每个函数、函数中的每个代码块都应该有一个入口、一个出口。
#### 12. 如何写出这样会的函数
写函数时，一开始都冗长而复杂。有太多缩进和嵌套循环。有过长的参数列表。名称是随意取的，也会有重复代码。不过我会配上一套单元测试，覆盖每一行丑陋的代码。
然后我打磨这些代码，分解函数、修改名称、消除重复。我缩短和重新安置方法。有事我还拆散类。同时保持测试通过。
最后，遵循本章列出的规则，我组装好这些函数。
我并不从一开始就按照规则写函数。我想没人做得到。

#### 小结
编程艺术是且一直就是语言设计的艺术。
大师级程序员把系统当做故事来讲，而不是当作程序来写。