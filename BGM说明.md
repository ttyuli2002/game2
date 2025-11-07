# 背景音乐说明

## 音乐列表

游戏中的所有背景音乐均来自 [Bensound](https://www.bensound.com)，这是一个提供免费音乐的网站。

### 场景配乐表

| 场景编号 | 场景名称 | BGM名称 | 风格特点 | 情感氛围 |
|---------|---------|---------|---------|---------|
| 0 | Prologue | Memories | 钢琴独奏，温馨 | 回忆、怀旧 |
| 1 | Chapter 1 - 命运的邂逅 | Sunny | 轻快吉他，欢乐 | 阳光、活力 |
| 2 | Chapter 2 - 雨中的少女 | Tenderness | 柔和钢琴，细腻 | 温柔、关怀 |
| 3 | Chapter 3 - 温柔的外套 | Sweet Day | 轻松愉快 | 甜蜜、温暖 |
| 4 | Chapter 4 - 特制便当 | Buddy | 活泼轻快 | 友好、欢快 |
| 5 | Chapter 5 - 心意传达 | Love | 浪漫钢琴 | 恋爱、心动 |
| 6 | Final Chapter - 樱花树下 | Romantic | 深情浪漫 | 告白、感动 |
| 7 | Bad End - 陌路人 | Sad Day | 忧伤缓慢 | 遗憾、离别 |
| 8 | Normal End - 友情结局 | Little Idea | 轻松明快 | 友情、美好 |

## 音乐风格说明

### 轻松校园向特点

所有音乐都经过精心挑选，符合以下特点：

1. **轻松明快**：主旋律以钢琴、吉他为主，节奏轻快
2. **校园氛围**：适合青春校园恋爱故事
3. **情感丰富**：从欢快到感伤，覆盖完整的情感曲线
4. **循环播放**：所有音乐都支持无缝循环

### 场景音乐匹配逻辑

- **开场**：温馨回忆风格，营造怀旧氛围
- **日常**：阳光明快，符合校园生活
- **转折**：温柔细腻，突出情感变化
- **甜蜜**：轻松愉快，表现恋爱甜蜜
- **高潮**：浪漫深情，强化告白场景
- **结局**：根据路线选择不同风格

## 使用许可

### Bensound 使用条款

Bensound 的音乐可以免费使用，需要遵守以下条款：

- 个人项目免费使用
- 商业项目需要购买许可证
- 需要标注音乐来源

**标注示例**：
```
Music: Bensound.com
License: https://www.bensound.com/licensing
```

本游戏已在控制台输出中标注音乐来源。

## 替换音乐

### 方法一：使用其他在线音乐

修改 `game.js` 中的 `bgm` 字段：

```javascript
{
    title: 'Chapter 1',
    bgm: 'https://你的音乐URL.mp3',
    scenes: [ /* ... */ ]
}
```

### 方法二：使用本地音乐文件

1. 创建 `music` 文件夹
2. 放入音乐文件
3. 修改配置：

```javascript
{
    title: 'Chapter 1',
    bgm: 'music/your-music.mp3',
    scenes: [ /* ... */ ]
}
```

### 推荐的免费音乐资源

- [Bensound](https://www.bensound.com) - 免费音乐库
- [Incompetech](https://incompetech.com) - Kevin MacLeod 的音乐
- [Purple Planet](https://www.purple-planet.com) - 免费音乐
- [YouTube Audio Library](https://www.youtube.com/audiolibrary) - YouTube 音频库

## 音量控制

### 默认设置

- **初始音量**：30%（0.3）
- **音量范围**：0-100%
- **静音模式**：可通过按钮或 M 键切换

### 在代码中调整

修改 `game.js` 中的初始音量：

```javascript
// 在 playBGM 函数中
const volume = volumeSlider ? volumeSlider.value / 100 : 0.3;  // ← 修改这里的 0.3
```

或在 HTML 中修改滑块默认值：

```html
<input type="range" id="volumeSlider" min="0" max="100" value="30">  <!-- ← 修改 value -->
```

## 技术细节

### 音频实现

- **格式**：MP3
- **播放方式**：HTML5 Audio API
- **循环**：自动循环播放
- **切换**：场景切换时自动更换BGM

### 浏览器兼容性

- Chrome/Edge: 完全支持
- Firefox: 完全支持
- Safari: 完全支持
- 移动端: 需要用户交互后才能播放（浏览器限制）

### 已知问题

1. **首次播放可能失败**
   - 原因：浏览器安全策略要求用户交互
   - 解决：点击"开始游戏"后音乐会正常播放

2. **移动端自动播放限制**
   - 原因：移动浏览器限制自动播放
   - 解决：需要用户点击才能播放

## 添加音效

除了BGM，还可以添加音效（SE）：

```javascript
// 在对话中添加音效
function playSound(soundUrl) {
    const sound = new Audio(soundUrl);
    sound.volume = 0.5;
    sound.play();
}

// 使用示例
{
    character: characters.baicai.image,
    name: '白菜',
    text: '哼！',
    onShow: () => playSound('sounds/hmph.mp3')  // 添加"哼"的音效
}
```

## 创作建议

### BGM 选择原则

1. **节奏适中**：不要太快或太慢
2. **情感匹配**：音乐情感要与场景一致
3. **音量平衡**：避免音乐过于突出
4. **循环自然**：选择能自然循环的音乐

### 场景配乐技巧

- **开场**：选择能吸引玩家的音乐
- **日常**：轻松愉快，不抢戏
- **关键剧情**：情感浓烈，突出氛围
- **结局**：根据结局类型选择（喜/悲/平淡）

---

享受音乐，享受故事！
