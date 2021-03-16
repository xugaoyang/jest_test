# jest_test3

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

#### 每个同学的代码存放目录格式要求

```
|-- views
|  |-- yourname
|  |  |-- __test__
|  |  |  |-- name.spec.js
|  |  |-- filename.vue
|  |  |-- xxxx.name
...
```

#### demo 调试路线

- [x] 安装，脚手架额外集成jest

- [x] 钩子beforeEach/afterEach在describe方法内外部的流向

- [x] shallowMount和mount的区别

- [x] dom的prop/class/style的验证



- [x] 测试组件方法的调用

```
// 组件方法改变了data某个值的变化，或改变了元素的样式，验证此过程
```
- [x] 测试父组件的是否响应了子组件发射的事件

```
// 子组件发射事件触发父组件data的某个属性值的变化，验证此过程
```
- [x] 模拟mock api调用

```
// 模拟接口返回的值是否一致，模拟异步接口执行
```
- [x] 测试表单的提交事件

```
// @/components/Form.vue
// 测试参数,例如：
// 用户名：法外狂徒张三
// 密码：luoxiang
// 记住密码 勾选
// 点击提交按钮，触发调用接口，并验证接口所带参数与上述匹配
```
