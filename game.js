// 游戏状态管理
let gameState = {
    currentScene: 0,
    currentDialog: 0,
    autoPlay: false,
    history: [],
    saves: {},
    bgmAudio: null,
    muted: false
};

// 角色占位符生成器
function generateCharacterPlaceholder(name, color) {
    const svg = `
        <svg width="400" height="800" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad_${name}" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:${color};stop-opacity:0.9" />
                    <stop offset="100%" style="stop-color:${color};stop-opacity:0.6" />
                </linearGradient>
            </defs>
            <rect width="400" height="800" fill="url(#grad_${name})" rx="20"/>
            <ellipse cx="200" cy="150" rx="80" ry="100" fill="white" opacity="0.95"/>
            <rect x="120" y="250" width="160" height="400" fill="white" opacity="0.95" rx="80"/>
            <ellipse cx="140" cy="500" rx="40" ry="150" fill="white" opacity="0.95"/>
            <ellipse cx="260" cy="500" rx="40" ry="150" fill="white" opacity="0.95"/>
            <circle cx="200" cy="120" r="70" fill="${color}" opacity="0.4"/>
            <circle cx="185" cy="130" rx="8" ry="10" fill="#333"/>
            <circle cx="215" cy="130" rx="8" ry="10" fill="#333"/>
            <text x="200" y="750" font-size="52" fill="white" text-anchor="middle" font-weight="bold">${name}</text>
            <text x="200" y="700" font-size="24" fill="white" text-anchor="middle" opacity="0.8">男友</text>
        </svg>
    `;
    return 'data:image/svg+xml;base64,' + btoa(encodeURIComponent(svg).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode('0x' + p1)));
}

// 角色定义
const characters = {
    baicai: {
        name: '白菜',
        image: './images/cabbage.png',
        color: '#32CD32'
    }
};

// 音效管理
const soundEffects = {
    first: './sounds/first.mp3', 
    second: './sounds/second.mp3',
    third:  './sounds/third.mp3',
    forth: './sounds/forth.mp3', 
    fifth: './sounds/fifth.mp3',
    angry:  './sounds/angry.mp3',
    annoyed: './sounds/annoyed.mp3',
    bored: './sounds/bored.mp3',
    enhen: './sounds/enhen.mp3',
    car: './sounds/car-horn.mp3',
    applause: './sounds/applause.mp3'
};

// 播放音效
function playSoundEffect(effectName) {
    if (soundEffects[effectName]) {
        const audio = new Audio(soundEffects[effectName]);
        audio.volume = 0.5;  // 音效音量50%
        audio.play().catch(err => {
            console.log(`音效播放失败: ${effectName}`, err);
        });
    } else {
        console.log(`音效不存在: ${effectName}`);
    }
}

// 完整的游戏剧本 - Galgame 风格
const gameScript = [
    // 0
    {
        title: 'Chapter 1 - 命运的邂逅',
        background: './images/inBed.jpg',
        bgm: 'https://www.bensound.com/bensound-music/bensound-sunny.mp3',
        scenes: [
            {
                character: null,
                name: '',
                text: '清晨，你睡醒了。',
                position: 'center'
            },
            {
                character: null,
                name: '白菜',
                text: '早上好呀，我是你的虚拟傲娇男友。我叫白菜，请多多指教！',
                position: 'center',
                soundEffect: 'first'
            },
            {
                character: null,
                name: '白菜',
                text: '你想要做什么我都会陪你的哦，我亲爱的小姐。',
                position: 'center',
            },
            {
                character: null,
                name: '',
                text: '你打算:',
                position: 'center',
            }
        ],
        choices: [
            {
                text: '外出',
                nextScene: 1
            },
            {
                text: '继续呆在家里',
                nextScene: 1
            }
        ]
    },

    // 1
    {
        title: 'Chapter 2 - 饮料1',
        background: './images/drinkScene.jpg',
        bgm: 'https://www.bensound.com/bensound-music/bensound-tenderness.mp3',
        scenes: [
            {
                character: null,
                name: '',
                text: '终于到镇上了，好渴啊！这里有一家商店欸',
                position: 'center',
                soundEffect: 'car'
            },
            {
                character: characters.baicai.image,
                name: '',
                text: '你拿了一瓶冰红茶，奢华又带着低调。很适合你这样沉稳的有钱人。正打算付钱，你看到白菜正痴痴地望着冰柜里的冰露。你打算：',
                soundEffect: 'second'
            }
        ],
        choices: [
            {
                text: '【给白菜买一瓶饮料】',
                nextScene: 2
            },
            {
                text: '【不管白菜，自己买一瓶框框喝】',
                nextScene: 2
            }
        ]
    },

    // 2
    {
        title: 'Chapter 2 - 饮料2',
        background: './images/drink1.jpg',
        bgm: 'https://www.bensound.com/bensound-music/bensound-sunny.mp3',
        scenes: [
            {
                character: null,
                name: '白菜',
                text: '谁想要你给我买的饮料！不要擅作主张的给我买好吗！',
                soundEffect: 'third'
            }
        ],
        nextScene: 3
    },

    // 3
    {
        title: 'Chapter 2 - 饮料3',
        background: './images/drink2.jpg',
        bgm: 'https://www.bensound.com/bensound-music/bensound-sunny.mp3',
        scenes: [
            {
                character: null,
                name: '白菜',
                text: '（脸颊泛红）作为你没礼貌的惩罚，这瓶饮料我就没收了哦。',
                soundEffect: 'angry'
            }
        ],
        nextScene: 4
    },

    // 4
    {
        title: 'Chapter 3 - food',
        background: './images/foodScene.jpg',
        bgm: 'https://www.bensound.com/bensound-music/bensound-tenderness.mp3',
        scenes: [
            {
                character: null,
                name: '',
                text: '中午了...',
                position: 'center',
                soundEffect: 'car'
            },
            {
                character: null,
                name: '',
                text: '好饿啊好饿啊',
                position: 'center',
                soundEffect: 'fifth'
            },
            {
                character: characters.baicai.image,
                name: '',
                text: '你给自己点了一碗牛肉丸面。虽然简单，但你多加了一个牛肉丸。听着周围看向你羡慕的目光和窃窃私语，你的嘴角不禁勾起。',
                soundEffect: 'second'
            },
            {
                character: characters.baicai.image,
                name: '',
                text: '说起来......白菜呢？你看着他呆萌的样子，内心一阵触动。',
                soundEffect: 'enhen'
            },
            {
                character: characters.baicai.image,
                name: '',
                text: '......男人，也能这么美丽么？',
            }
        ],
        choices: [
            {
                text: '【给白菜点一碗牛肉丸面】',
                nextScene: 5
            },
            {
                text: '【白菜算个球，自己一个人吃】',
                nextScene: 5
            }
        ]
    },

    // 5
    {
        title: 'Chapter 3 - food2',
        background: './images/food1.jpg',
        bgm: 'https://www.bensound.com/bensound-music/bensound-sunny.mp3',
        scenes: [
            {
                character: null,
                name: '白菜',
                text: '你给我买的这是啥！你就给我吃这种东西么',
                soundEffect: 'annoyed'
            }
        ],
        nextScene: 6
    },

    // 6
    {
        title: 'Chapter 3 - food3',
        background: './images/food2.jpg',
        bgm: 'https://www.bensound.com/bensound-music/bensound-sunny.mp3',
        scenes: [
            {
                character: null,
                name: '白菜',
                text: '我不要吃这种东西，就不能带我去吃点好的吗？',
                soundEffect: 'first'
            },

            {
                character: null,
                name: '白菜',
                text: '算了算了我不吃了，你自己吃吧。',
            }
        ],
        nextScene: 7
    },

    // 7
    {
        title: 'Chapter 4 - night',
        background: './images/bed.jpg',
        bgm: 'https://www.bensound.com/bensound-music/bensound-sunny.mp3',
        scenes: [
            {
                character: null,
                name: '',
                text: '深夜...',
                soundEffect: 'night'
            },

            {
                character: null,
                name: '白菜',
                text: '我的头好疼啊，我好难受。好像发烧了......',
                soundEffect: 'bored'
            }
        ],
        nextScene: 8
    },
    // 8
    {
        title: 'Chapter 4 - night',
        background: './images/bedAngry.jpg',
        bgm: 'https://www.bensound.com/bensound-music/bensound-sunny.mp3',
        scenes: [
            {
                character: null,
                name: '白菜',
                text: '你盯着我干嘛，我不需要你的帮助！',
                soundEffect: 'first'
            },

            {
                character: null,
                name: '',
                text: '发烧的他看起来有种沁人心脾的艳丽。你打算：',
                soundEffect: 'bored'
            }
        ],
        choices: [
            {
                text: '【趁白菜迷迷糊糊的，给他敷个毛巾】',
                nextScene: 9
            },
            {
                text: '【不管他，继续玩刚刚没玩完的游戏】',
                nextScene: 9
            }
        ]
    },

    // 9
    {
        title: 'Chapter 4 - night1',
        background: './images/bedSmile1.jpg',
        bgm: 'https://www.bensound.com/bensound-music/bensound-sunny.mp3',
        scenes: [
            {
                character: null,
                name: '白菜',
                text: '额头好温暖，感觉全身都放松下来了',
                soundEffect: 'second'
            },

            {
                character: null,
                name: '白菜',
                text: '好感度 +50',
                soundEffect: 'second'
            }
        ],
        nextScene: 10
    },

    // 10
    {
        title: 'Chapter 4 - night1',
        background: './images/bedSmile.jpg',
        bgm: 'https://www.bensound.com/bensound-music/bensound-sunny.mp3',
        scenes: [
            {
                character: null,
                name: '小猫咪男友白菜',
                text: '居然是你帮我，我.....',
                soundEffect: 'enhen'
            },

            {
                character: null,
                name: '小猫咪男友白菜',
                text: '对不起，看来之前是我误会你了'
            }
        ],
        nextScene: 11
    },


    // 11
    {
        title: 'Chapter 5',
        background: './images/cuteOnBed.jpg',
        bgm: 'https://www.bensound.com/bensound-music/bensound-sunny.mp3',
        scenes: [
            {
                character: null,
                name: '',
                text: '恭喜你！\n成功攻略了傲娇男友白菜!',
                soundEffect: 'applause'
            }
        ]
    }  
];

// 启动游戏
function startGame() {
    const startScreen = document.getElementById('startScreen');
    const gameScreen = document.getElementById('gameScreen');

    startScreen.classList.remove('active');
    setTimeout(() => {
        gameScreen.classList.add('active');
        loadScene(0);
    }, 500);
}

// 加载场景
function loadScene(sceneIndex) {
    if (sceneIndex >= gameScript.length) {
        showEnding();
        return;
    }

    gameState.currentScene = sceneIndex;
    gameState.currentDialog = 0;

    const scene = gameScript[sceneIndex];

    // 设置背景（自动比例适配）
    const background = document.getElementById('background');
    if (scene.background) {
        background.style.opacity = '0';

        const img = new Image();
        img.src = scene.background;
        img.onload = () => {
            const screenRatio = window.innerWidth / window.innerHeight;
            const imageRatio = img.width / img.height;

            // 判断图片比例：横图 → cover，竖图 → contain
            if (imageRatio >= screenRatio) {
                background.style.backgroundSize = 'cover';
            } else {
                background.style.backgroundSize = 'contain';
            }

            background.style.backgroundColor = 'black';
            background.style.backgroundImage = `url(${scene.background})`;
            background.style.opacity = '1';
        };
    }

    // 播放背景音乐
    if (scene.bgm) {
        playBGM(scene.bgm);
    }

    // 清除角色
    const charactersLayer = document.getElementById('characters');
    charactersLayer.innerHTML = '';

    // 显示对话
    showDialog();
}

// 播放背景音乐
function playBGM(bgmUrl) {
    if (gameState.bgmAudio) {
        gameState.bgmAudio.pause();
    }

    gameState.bgmAudio = new Audio(bgmUrl);
    gameState.bgmAudio.loop = true;

    // 获取当前音量设置
    const volumeSlider = document.getElementById('volumeSlider');
    const volume = volumeSlider ? volumeSlider.value / 100 : 0.3;
    gameState.bgmAudio.volume = volume;

    // 检查是否静音
    if (!gameState.muted) {
        gameState.bgmAudio.play().catch(err => {
            console.log('BGM播放失败（可能需要用户交互）:', err);
        });
    }
}

// 显示对话
function showDialog() {
    const scene = gameScript[gameState.currentScene];
    const dialog = scene.scenes[gameState.currentDialog];

    if (!dialog) {
        // 对话结束，检查是否有选项
        if (scene.choices !== undefined) {
            if (scene.choices.length > 0) {
                showChoices(scene.choices);
            } else {
                // choices 为空数组，表示结局，显示结束画面
                showEnding();
            }
        } else if (scene.nextScene !== undefined) {
            // 如果有 nextScene 属性，跳转到指定场景
            setTimeout(() => {
                loadScene(scene.nextScene);
            }, 1500);
        } else {
            // 没有选项，也没有指定跳转，进入下一场景
            setTimeout(() => {
                loadScene(gameState.currentScene + 1);
            }, 1500);
        }
        return;
    }

    const nameElement = document.getElementById('characterName');
    const textElement = document.getElementById('dialogText');
    const dialogBox = document.getElementById('dialogBox');

    // 暂时禁用点击事件，防止重复触发
    dialogBox.onclick = null;

    // 设置角色名颜色
    nameElement.textContent = dialog.name;
    if (dialog.name === characters.baicai.name) {
        nameElement.style.color = characters.baicai.color;
    } else {
        nameElement.style.color = '#ffd700';
    }

    // 打字机效果
    typeWriter(textElement, dialog.text, 50);

    // 播放音效（如果有）
    if (dialog.soundEffect) {
        playSoundEffect(dialog.soundEffect);
    }

    // 设置角色立绘
    if (dialog.character) {
        showCharacter(dialog.character, dialog.position);
    } else {
        // 清除角色
        const charactersLayer = document.getElementById('characters');
        charactersLayer.innerHTML = '';
    }

    // 延迟设置点击事件，确保上一个事件已清除
    setTimeout(() => {
        dialogBox.onclick = () => {
            if (textElement.dataset.typing === 'true') {
                // 如果正在打字，直接显示全部文本
                textElement.textContent = dialog.text;
                textElement.dataset.typing = 'false';
                // 清除打字机的timeout
                if (currentTypeWriterTimeout) {
                    clearTimeout(currentTypeWriterTimeout);
                    currentTypeWriterTimeout = null;
                }
            } else {
                // 否则进入下一段对话
                gameState.currentDialog++;
                showDialog();
            }
        };
    }, 50);
}

// 打字机效果
let currentTypeWriterTimeout = null;

function typeWriter(element, text, speed) {
    // 清除之前的打字机效果
    if (currentTypeWriterTimeout) {
        clearTimeout(currentTypeWriterTimeout);
        currentTypeWriterTimeout = null;
    }

    element.textContent = '';
    element.dataset.typing = 'true';
    let i = 0;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            currentTypeWriterTimeout = setTimeout(type, speed);
        } else {
            element.dataset.typing = 'false';
            currentTypeWriterTimeout = null;
        }
    }

    type();
}

// 显示角色
function showCharacter(characterImage, position) {
    const charactersLayer = document.getElementById('characters');

    // 添加淡入效果
    const img = document.createElement('img');
    img.src = characterImage;
    img.className = 'character';
    img.style.left = getPosition(position);
    img.style.opacity = '0';

    charactersLayer.innerHTML = '';
    charactersLayer.appendChild(img);

    setTimeout(() => {
        img.style.opacity = '1';
    }, 100);
}

function getPosition(position) {
    const positions = {
        left: '10%',
        center: '35%',
        right: '60%'
    };
    return positions[position] || positions.center;
}

// 显示选项
function showChoices(choices) {
    const dialogBox = document.getElementById('dialogBox');
    const choiceContainer = document.getElementById('choiceContainer');

    dialogBox.style.display = 'none';
    choiceContainer.classList.remove('hidden');
    choiceContainer.innerHTML = '';

    choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.textContent = choice.text;
        button.style.animationDelay = `${index * 0.1}s`;
        button.onclick = () => {
            choiceContainer.classList.add('hidden');
            dialogBox.style.display = 'block';
            loadScene(choice.nextScene);
        };
        choiceContainer.appendChild(button);
    });
}

// 结局
function showEnding() {
    const dialogBox = document.getElementById('dialogBox');
    const nameElement = document.getElementById('characterName');
    const textElement = document.getElementById('dialogText');
    const charactersLayer = document.getElementById('characters');

    charactersLayer.innerHTML = '';
    nameElement.textContent = 'GAME OVER';
    textElement.textContent = '感谢游玩！\n\n按 F5 重新开始，尝试不同的选择探索更多结局。';

    dialogBox.onclick = null;
    document.querySelector('.continue-indicator').style.display = 'none';
}

// 自动播放
let autoPlayInterval;
function autoPlay(event) {
    const button = event.target;
    gameState.autoPlay = !gameState.autoPlay;

    if (gameState.autoPlay) {
        button.style.background = 'rgba(255, 215, 0, 0.3)';
        autoPlayInterval = setInterval(() => {
            const textElement = document.getElementById('dialogText');
            if (textElement.dataset.typing !== 'true') {
                gameState.currentDialog++;
                showDialog();
            }
        }, 3000);
    } else {
        button.style.background = 'rgba(0, 0, 0, 0.6)';
        clearInterval(autoPlayInterval);
    }
}

// 跳过对话
function skipDialog() {
    if (confirm('确定要跳过当前场景吗？')) {
        clearInterval(autoPlayInterval);
        gameState.autoPlay = false;
        loadScene(gameState.currentScene + 1);
    }
}

// 保存游戏
function saveGame() {
    const saveName = prompt('请输入存档名称：', `存档_${new Date().toLocaleDateString()}`);
    if (saveName) {
        const saveData = {
            currentScene: gameState.currentScene,
            currentDialog: gameState.currentDialog,
            timestamp: new Date().toLocaleString('zh-CN')
        };
        localStorage.setItem(`vn_save_${saveName}`, JSON.stringify(saveData));
        alert('保存成功！');
    }
}

// 加载游戏
function loadGame() {
    const saves = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('vn_save_')) {
            const saveName = key.replace('vn_save_', '');
            const data = JSON.parse(localStorage.getItem(key));
            saves.push(`${saveName} (${data.timestamp})`);
        }
    }

    if (saves.length === 0) {
        alert('没有找到存档！');
        return;
    }

    const saveName = prompt(`请输入要加载的存档名称：\n\n可用存档：\n${saves.join('\n')}`);
    if (saveName) {
        const cleanName = saveName.split(' (')[0];
        const saveData = localStorage.getItem(`vn_save_${cleanName}`);
        if (saveData) {
            const data = JSON.parse(saveData);
            gameState.currentScene = data.currentScene;
            gameState.currentDialog = data.currentDialog;
            loadScene(data.currentScene);
            alert('加载成功！');
        } else {
            alert('存档不存在！');
        }
    }
}

// 音量控制
function changeVolume(value) {
    const volume = value / 100;
    if (gameState.bgmAudio) {
        gameState.bgmAudio.volume = volume;
    }
}

// 静音切换
function toggleMute() {
    gameState.muted = !gameState.muted;
    const muteButton = document.getElementById('muteButton');

    if (gameState.muted) {
        muteButton.textContent = '静音';
        if (gameState.bgmAudio) {
            gameState.bgmAudio.pause();
        }
    } else {
        muteButton.textContent = '音乐';
        if (gameState.bgmAudio) {
            gameState.bgmAudio.play().catch(err => {
                console.log('BGM播放失败:', err);
            });
        }
    }
}

// 键盘快捷键
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        const dialogBox = document.getElementById('dialogBox');
        if (dialogBox && dialogBox.onclick) {
            dialogBox.onclick();
        }
    }
    // M键静音
    if (e.code === 'KeyM') {
        toggleMute();
    }
});

// 初始化
console.log('%c傲娇男友白菜 - Galgame', 'color: #32CD32; font-size: 24px; font-weight: bold;');
console.log('%c准备好体验与虚拟傲娇男友的日常了吗？', 'color: #98FB98; font-size: 14px;');
console.log('%cBGM: Bensound (https://www.bensound.com)', 'color: #FFD700; font-size: 12px;');
