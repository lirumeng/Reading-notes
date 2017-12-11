### 对象和数据结构
#### 数据抽象
下面两段代码。每段代码都表示笛卡尔平面上的一个点。
```java
// 代码清单6-1 具象点
public class Point{
    public double x;
    public double y;
}
```
```java
// 代码清单6-2 抽象点
public interface Point{
   double getX();
   double getY();
   void setCartesian(double x, double y);
   double getR();
   double getTheta();
   void setPolar(double r, double theta);
}
```
代码清单6-1的漂亮之处在于，你不知道该实现会是在矩形坐标系中还是在极坐标系中。可能两个都不是！然而，该接口还是明白无误地呈现一种数据结构。

我们不愿暴露数据细节，更愿意以抽象邢台表述数据。这并不只是用接口和/或赋值器、取值器就万事大吉。要以最好的方式呈现某个对象包含的数据，需要做严肃的思考。乱加取值器和赋值器，是最坏的选择。
#### 数据、对象的反对称性
