## React-Tabs公共路由配置

> *在react中使用Tabs是常见的开发交互，偶尔为了权限配置或者路由精确定位，会将Tab组件的TabPane和content分离。这样做还有一个好处就是配置好之后，可以提高Tabs组件的复用程度，减少在外层router.js中对子路由的重写，即使这样也可以实现，但是重复工作量较大。这里的实现是把Tabs组件配置为和路由组件相关联。这里以Ant-design组件库的Tabs为例，使用Dva库的封装的路由进行实现*



```js
import React, { Component } from 'react'
import { Tabs } from 'antd'
import { Switch, Router, Route, Redirect, routerRedex } from 'dva/router'
import { connect } from 'dva'
const TabPane = Tabs.TabPane

// 这里使用高阶组件是为了对路由进行操作，使用的前提是必须要有一个返回值
@connect(state => ({}))
// 定义无状态组件
const Tab1 = () => <div>tab1组件</div>
const Tab2 = () => <div>tab2组件</div>
const Tab3 = () => <div>tab3组件</div>

export default class TabsDemo extends Component {
  state = {
    activeKey: 'tab1'
  }
  componentWillReceiveProps (nextProps) {
    // 这里每次点击路由跳转时都会进入
    switch (nextProps.location.pathname) {
      case '/demo/tabs':
      case '/demo/tabs/tab1':
        this.setState({ activeKey: 'tab1' })
        break;
      case '/demo/tabs/tab2':
        this.setState({ activeKey: 'tab2' })
        break
      case '/demo/tabs/tab3':
        this.setState({ activeKey: 'tab3' })
        break
      default:
        break;
    }
  }
  handleTabs = (activeKey) => {
    // 切换Tabs触发
    this.setState({ activeKey }, () => {
      /**
       * 这里可以使用两种方式进行路由跳转
       * 1.使用connect高阶组件暴露出的dispatchfangfa
       * 2.可以使用this.props.history.push(路径)
       */
      this.props.dispatch(routerRedex.push(`/demo/tabs/${activeKey}`))
      // this.props.history.push(`/demo/tabs/${activeKey}`)
    })
  }
  render() {
    const { activeKey } = this.state
    return (
      <div className="tabs-demo">
        <h2>Tabs公共路由</h2>
        <div className="card-content'">
          <Tabs
            activeKey={activeKey}
            onChange={this.handleTabs}
          >
            <TabPane tab="Tab1" key="tab1" />
            <TabPane tab="Tab2" key="tab2" />
            <TabPane tab="Tab3" key="tab3" />
          </Tabs>
          {
            /**
             * 路由提取说明：
             * 该文件是挂在/demo/tabs路由下的，所以这里的Tabs若要与路由挂钩，必须要访问到父级路由，然后再配置自己的路由。比如
             * 这里的/demo/tabs是父级路由，/tab1便是该文件中的子路由，这样结合起来就实现了访问/demo/tabs/tab1展示Tab1的组件。
             * 如果这里的this.props.history是一个脱离与路由的独立组件，可以使用dva/router或者react-router-dom（react-router4）
             * 的withRouter高阶函数进行包裹当前组件，否则Router组件的history会出现警告，这是因为路由是基于浏览器的history特性实现的，
             * 浏览器需要将路由的入栈和出栈的行为进行记录
             */
            <Router hisroty={this.props.history}>
              <Switch>
                <Route path="/demo/tabs/tab1" component={Tab1} />
                <Route path="/demo/tabs/tab2" component={Tab2} />
                <Route path="/demo/tabs/tab3" component={Tab3} />
                <Redirect exact from="/demo/tabs" to="/demos/tabs/tab1" />
              </Switch>
            </Router>
          }
        </div>
      </div>
    )
  }
}
```