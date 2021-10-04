## Send event from native to js

### 1 Define a native module

Java类可以只继承一个`BaseJavaModule`或者`NaiveModule`。但是为了将来的**类型安全**推荐继承`ReactContextBaseJavaModule`。

