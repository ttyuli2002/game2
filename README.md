# 视觉小说游戏 (Visual Novel Game)

一个仿照 WebGAL 风格制作的简单视觉小说游戏引擎，使用纯 HTML/CSS/JavaScript 实现。

## 功能特性

✨ **完整的视觉小说体验**
- 动态渐变背景启动页面
- 打字机效果的对话显示
- 角色立绘显示系统
- 背景图片切换
- 分支选项系统
- 自动播放功能
- 存档/读档系统

## 快速开始

1. **直接打开游戏**
   ```bash
   # 使用任意 HTTP 服务器运行
   python -m http.server 8000
   # 或使用 Node.js
   npx serve
   ```

2. **在浏览器中访问**
   ```
   http://localhost:8000
   ```

## 项目结构

```
game2/
├── index.html          # 主 HTML 文件
├── style.css           # 样式文件
├── game.js            # 游戏逻辑
└── README.md          # 说明文档
```

## 如何自定义游戏内容

### 1. 修改游戏剧本

在 [game.js](game.js) 中找到 `gameScript` 数组，这是游戏的剧本数据：

```javascript
const gameScript = [
    {
        background: '背景图片URL',
        scenes: [
            {
                character: null,              // 角色立绘图片URL（可选）
                name: '角色名称',
                text: '对话内容',
                position: 'center'           // left/center/right
            }
        ],
        choices: [                           // 选项（可选）
            {
                text: '选项文本',
                nextScene: 2                 // 跳转到的场景索引
            }
        ]
    }
];
```

### 2. 添加角色立绘

在场景对话中添加 `character` 属性：

```javascript
{
    character: 'https://你的图片URL.png',
    name: '角色名称',
    text: '对话内容',
    position: 'center'  // left/center/right
}
```

### 3. 添加分支选项

在场景末尾添加 `choices` 数组：

```javascript
{
    background: '背景图片URL',
    scenes: [ /* 对话内容 */ ],
    choices: [
        { text: '选项1', nextScene: 2 },
        { text: '选项2', nextScene: 3 }
    ]
}
```

### 4. 自定义样式

修改 [style.css](style.css) 来改变游戏外观：

- `.game-title` - 修改游戏标题样式
- `.dialog-box` - 修改对话框样式
- `.choice-button` - 修改选项按钮样式
- `.animated-background` - 修改启动页背景动画

## 游戏操作

### 鼠标操作
- **点击对话框** - 继续对话/显示完整文本
- **点击选项按钮** - 选择分支

### 键盘快捷键
- **空格键/回车键** - 继续对话

### 控制按钮
- **AUTO** - 自动播放（每3秒自动前进）
- **SKIP** - 跳过当前场景
- **SAVE** - 保存游戏进度
- **LOAD** - 加载已保存的进度

## 进阶功能

### 添加音效和音乐

在 [game.js](game.js) 中添加音频系统：

```javascript
// 在场景数据中添加
{
    background: '背景图片',
    bgm: '背景音乐URL.mp3',
    scenes: [ /* ... */ ]
}

// 在 loadScene 函数中添加
if (scene.bgm) {
    const audio = new Audio(scene.bgm);
    audio.loop = true;
    audio.play();
}
```

### 添加过场动画

修改场景切换时的效果：

```javascript
// 在 style.css 中添加
.background-layer {
    transition: opacity 1s ease, transform 1s ease;
}

.background-layer.fade-in {
    animation: fadeIn 1s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: scale(1.1); }
    to { opacity: 1; transform: scale(1); }
}
```

### 添加 CG 画廊

创建一个新的数组来存储已解锁的 CG：

```javascript
let unlockedCG = [];

function unlockCG(cgId) {
    if (!unlockedCG.includes(cgId)) {
        unlockedCG.push(cgId);
        localStorage.setItem('unlockedCG', JSON.stringify(unlockedCG));
    }
}
```

## 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式和动画（渐变、过渡、关键帧动画）
- **JavaScript (ES6+)** - 游戏逻辑
- **LocalStorage** - 存档系统

## 浏览器兼容性

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## 示例资源网站

如果需要免费的图片资源：
- **背景图片**: [Unsplash](https://unsplash.com)
- **角色立绘**: [Pixabay](https://pixabay.com)
- **音乐音效**: [freesound.org](https://freesound.org)

## 下一步优化建议

1. **添加更多视觉效果**
   - 文字抖动、闪烁效果
   - 场景转场特效
   - 粒子效果

2. **增强交互性**
   - 添加历史记录功能
   - 快进/回退功能
   - 角色好感度系统

3. **性能优化**
   - 图片预加载
   - 资源懒加载
   - Service Worker 离线支持

4. **使用专业引擎**
   - [WebGAL](https://github.com/MakinoharaShoko/WebGAL) - 开源视觉小说引擎
   - [Ren'Py](https://www.renpy.org/) - Python 视觉小说引擎
   - [TyranoBuilder](https://tyranobuilder.com/) - 可视化编辑器

## 许可证

MIT License - 自由使用和修改

## 贡献

欢迎提交问题和改进建议！