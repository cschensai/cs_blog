## React插件浏览器滚动条



```
// 这里的smooth-scrollbar是依赖于react-smooth-scrollbar的，两个库都要安装
npm install react-smooth-scrollbar smooth-scrollbar --save
```

### 最基本的使用



```js
import { Component } from 'react';
import Scrollbar from 'react-smooth-scrollbar';
class Demo extends Component {
    render() {
        return (
            <Scrollbar
                damping={number}
                thumbMinSize={number}
                syncCallbacks={boolean}
                renderByPixels={boolean}
                alwaysShowTracks={boolean}
                continuousScrolling={boolean}
                wheelEventTarget={element}
                plugins={object}
                onScroll={func}
            >
                your contents here...
            </Scrollbar>
        );
    }
}
```

### 附带滚动弹性效果的滚动条



```js
import { Component } from 'react';
import PropTypes from 'prop-types';
import SmoothScrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overflow';
import Scrollbar from 'react-smooth-scrollbar';
 // 注册插件
SmoothScrollbar.use(OverscrollPlugin);
 
class App2 extends Component {
    render() {
        return (
            <Scrollbar> ... </Scrollbar>
        );
    }
}
```