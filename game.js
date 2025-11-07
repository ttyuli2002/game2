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
            <text x="200" y="700" font-size="24" fill="white" text-anchor="middle" opacity="0.8">大小姐</text>
        </svg>
    `;
    return 'data:image/svg+xml;base64,' + btoa(encodeURIComponent(svg).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode('0x' + p1)));
}

// 角色定义
const characters = {
    baicai: {
        name: '白菜',
        image: generateCharacterPlaceholder('白菜', '#98FB98'),
        color: '#32CD32'
    }
};

// 完整的游戏剧本 - Galgame 风格
const gameScript = [
    // === Prologue ===
    {
        title: 'Prologue',
        background: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1920&q=80',
        bgm: 'https://www.bensound.com/bensound-music/bensound-memories.mp3',
        scenes: [
            {
                character: null,
                name: '',
                text: '四月，樱花盛开的季节。',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '我作为特别奖学金生，转入了这所传说中只有贵族子弟才能就读的——',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '圣光学园。',
                position: 'center'
            }
        ]
    },

    // === Chapter 1: First Encounter ===
    {
        title: 'Chapter 1 - 命运的邂逅',
        background: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=80',
        bgm: 'https://www.bensound.com/bensound-music/bensound-sunny.mp3',
        scenes: [
            {
                character: null,
                name: '我',
                text: '（走进教学楼）',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '（环顾四周）',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '大理石地面、水晶吊灯、油画装饰...',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '这、这里...真的是学校吗？',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '就在我呆站在走廊中央时——',
                position: 'center'
            },
            {
                character: null,
                name: '？？？',
                text: '喂！',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '？？？',
                text: '你挡路了！让开让开！',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '啊，抱歉！',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '我慌忙让到一旁。',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '？？？',
                text: '哼！',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '？？？',
                text: '（仔细打量着我）',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '？？？',
                text: '你...该不会就是那个用奖学金进来的平民学生吧？',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '是、是的...',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '哼哼～果然！',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '听好了！本小姐是白菜家族的千金——白菜！',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '在这所学校里，白菜家族可是数一数二的名门哦！',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '（点头）我、我记住了...',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '那就好！',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '你可不要做什么奇怪的事给本小姐添麻烦哦？',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '说完，她扬起下巴，优雅地转身离去。',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '只留下淡淡的香水味...和我凌乱的心情。',
                position: 'center'
            }
        ],
        choices: [
            {
                text: '（真是个任性的大小姐...）',
                nextScene: 2
            },
            {
                text: '（虽然有点傲慢，但...还挺可爱的？）',
                nextScene: 2
            }
        ]
    },

    // === Chapter 2: Rainy Day ===
    {
        title: 'Chapter 2 - 雨中的少女',
        background: 'https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=1920&q=80',
        bgm: 'https://www.bensound.com/bensound-music/bensound-tenderness.mp3',
        scenes: [
            {
                character: null,
                name: '',
                text: '——一周后',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '放学时分，天空突然下起了倾盆大雨。',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '（站在校门口）唉...没带伞...',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '就在我犹豫要不要冲进雨中时——',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '我注意到校门旁的屋檐下，站着一个熟悉的身影。',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '可恶...管家怎么还不来接我...',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '（焦急地看着手机）',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '白菜似乎也被困在了这里。',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '（注意到我的视线）',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '你、你看什么看！',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '难道你想嘲笑本小姐被困在这里吗？！',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '不、不是...',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '我看着她微微发抖的肩膀。',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '尽管嘴上说得很强硬，但她似乎有些害怕...',
                position: 'center'
            }
        ],
        choices: [
            {
                text: '【把外套递给她】那个...你先披上我的外套吧',
                nextScene: 3
            },
            {
                text: '【默默离开】还是不要多管闲事了...',
                nextScene: 7
            }
        ]
    },

    // === Good Route: Chapter 3 ===
    {
        title: 'Chapter 3 - 温柔的外套',
        background: 'https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=1920&q=80',
        bgm: 'https://www.bensound.com/bensound-music/bensound-sweetday.mp3',
        scenes: [
            {
                character: null,
                name: '我',
                text: '那个...白菜同学',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '虽然不能遮雨，但这件外套至少能挡挡风...',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '诶？',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '你、你...！',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '（脸颊泛红）什、什么啊！',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '你以为本小姐会需要你这种平民的帮助吗？！',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '（准备收回外套）啊，抱歉，是我多管闲事了...',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '等、等等！',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '（小声）我、我可没说不要...',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '只、只是暂时借用一下而已！',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '别想太多了！哼！',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '她接过外套，轻轻披在肩上。',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '（微笑）没关系，能帮上忙就好。',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '...',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '（把脸别向一边）',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '你、你这家伙...还真是个笨蛋呢...',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '虽然这么说着，但她的声音却意外地温柔。',
                position: 'center'
            }
        ]
    },

    // === Chapter 4: Lunch ===
    {
        title: 'Chapter 4 - 特制便当',
        background: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1920&q=80',
        bgm: 'https://www.bensound.com/bensound-music/bensound-buddy.mp3',
        scenes: [
            {
                character: null,
                name: '',
                text: '——第二天，午休时间',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '（打开便利店买的便当）',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '啪！',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '一个精致的便当盒突然出现在我面前。',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '这是...？',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '哼！',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '昨天本小姐勉强收下了你的外套...',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '作为白菜家的千金，怎么可能欠别人人情呢！',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '所以！这是给你的回礼！',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '我们家的厨师今天做多了...不吃的话...本小姐会很困扰的！',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '（打开便当盒）',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '里面是色彩鲜艳的玉子烧、精致的饭团，还有各种配菜。',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '每一样都摆放得像艺术品一样。',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '看起来好好吃...那我就不客气了！',
                position: 'center'
            }
        ],
        choices: [
            {
                text: '【品尝便当】太好吃了！谢谢你，白菜！',
                nextScene: 5
            },
            {
                text: '【婉拒】不用了，我已经有便当了...',
                nextScene: 8
            }
        ]
    },

    // === Chapter 5: True Feelings ===
    {
        title: 'Chapter 5 - 心意传达',
        background: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1920&q=80',
        bgm: 'https://www.bensound.com/bensound-music/bensound-love.mp3',
        scenes: [
            {
                character: null,
                name: '我',
                text: '（品尝）唔...！',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '这个玉子烧...太好吃了！',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '是、是吗...？',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '（小声）那就好...',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '诶？你刚才说什么？',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '没、没什么！',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '（脸颊微红）',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '不过...这真的是厨师做的吗？',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '总觉得...有种特别用心的感觉...',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '！！！',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '你、你这家伙...！',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '（慌张地站起来）当、当然是厨师做的啊！',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '本小姐怎么可能会亲自下厨呢！',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '（温柔地笑）是这样啊...',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '不过，我注意到她的手指上有个小小的创可贴。',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '（捂住手指）',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '不、不许看！',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '白菜...谢谢你。',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '这是我吃过最好吃的便当了。',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '...',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '（小声）...笨蛋...',
                position: 'center'
            }
        ]
    },

    // === Final Chapter: Confession ===
    {
        title: 'Final Chapter - 樱花树下',
        background: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1920&q=80',
        bgm: 'https://www.bensound.com/bensound-music/bensound-romantic.mp3',
        scenes: [
            {
                character: null,
                name: '',
                text: '——放学后',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '白菜突然给我发来了一条消息。',
                position: 'center'
            },
            {
                character: null,
                name: '【消息】白菜',
                text: '"放学后来学校后院的樱花树下。\n本小姐有重要的话要对你说！"',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '（来到樱花树下）',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '樱花花瓣随风飘落。',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '你、你来了...',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '嗯，你找我有什么事吗？',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '那个...我...',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '（握紧拳头）',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '虽然一开始我对你很傲慢...',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '但是...你总是对我那么温柔...',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '即使我用那种态度对你，你也从来没有生气过...',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '我...我...',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '（深呼吸，鼓起勇气）',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '我喜欢你！',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '虽、虽然我是大小姐，你是平民...',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '但是！我不在乎那些！',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '所以...你...你愿意和我交往吗？',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '樱花瓣在我们之间飘落。',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '白菜...',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '我也喜欢你。',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '诶...？',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '真、真的吗...？',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '（眼眶湿润）',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '嗯，从第一次见面开始，我就觉得你很特别。',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '虽然嘴上说着"哼"，但其实很善良...',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '会偷偷做便当，会在意别人是否受伤...',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '这样的你，怎么可能不喜欢呢？',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '笨、笨蛋...！',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '（扑进我怀里）',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '太好了...真的太好了...',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '樱花花瓣在我们周围飞舞。',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '见证着这份跨越身份的爱情。',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '——True End——',
                position: 'center'
            },
            {
                character: null,
                name: '系统',
                text: '【白菜的好感度：MAX】\n\n恭喜达成 True End\n"傲娇大小姐的真心"',
                position: 'center'
            }
        ]
    },

    // === Bad End 1 ===
    {
        title: 'Bad End - 陌路人',
        background: 'https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=1920&q=80',
        bgm: 'https://www.bensound.com/bensound-music/bensound-sadday.mp3',
        scenes: [
            {
                character: null,
                name: '',
                text: '我选择了默默离开。',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '之后，白菜再也没有主动和我说过话。',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '偶尔在走廊相遇时...',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '（冷淡地看了我一眼）',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '哼！',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '她快步走过，留下清冷的背影。',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '也许...我们本就是两个世界的人。',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '——Bad End——',
                position: 'center'
            },
            {
                character: null,
                name: '系统',
                text: '【达成 Bad End "陌路人"】\n\n也许...当时如果选择帮助她的话...\n\n（提示：尝试不同的选择探索其他结局）',
                position: 'center'
            }
        ]
    },

    // === Normal End ===
    {
        title: 'Normal End - 友情结局',
        background: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1920&q=80',
        bgm: 'https://www.bensound.com/bensound-music/bensound-littleidea.mp3',
        scenes: [
            {
                character: null,
                name: '我',
                text: '抱歉...我已经有便当了...',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '诶...？',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '（明显失望）',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '哼！算、算了！',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '本小姐才不会强求别人呢！',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '（转身准备离开）',
                position: 'center'
            },
            {
                character: null,
                name: '我',
                text: '不过...我们还是朋友吧？',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '（停下脚步）',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '朋友...吗...',
                position: 'center'
            },
            {
                character: characters.baicai.image,
                name: '白菜',
                text: '（勉强笑了笑）嗯...当然了。',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '之后，我们成为了朋友。',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '虽然她还是会时不时地"哼"一声...',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '但总感觉...少了些什么。',
                position: 'center'
            },
            {
                character: null,
                name: '',
                text: '——Normal End——',
                position: 'center'
            },
            {
                character: null,
                name: '系统',
                text: '【达成 Normal End "珍贵的友情"】\n\n友情也是一种美好的关系...\n但似乎还有更好的结局？\n\n（提示：尝试接受白菜的好意）',
                position: 'center'
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

    // 设置背景
    const background = document.getElementById('background');
    if (scene.background) {
        background.style.opacity = '0';
        setTimeout(() => {
            background.style.backgroundImage = `url(${scene.background})`;
            background.style.opacity = '1';
        }, 300);
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
        if (scene.choices) {
            showChoices(scene.choices);
        } else {
            // 没有选项，进入下一场景
            setTimeout(() => {
                loadScene(gameState.currentScene + 1);
            }, 1500);
        }
        return;
    }

    const nameElement = document.getElementById('characterName');
    const textElement = document.getElementById('dialogText');
    const dialogBox = document.getElementById('dialogBox');

    // 设置角色名颜色
    nameElement.textContent = dialog.name;
    if (dialog.name === characters.baicai.name) {
        nameElement.style.color = characters.baicai.color;
    } else {
        nameElement.style.color = '#ffd700';
    }

    // 打字机效果
    typeWriter(textElement, dialog.text, 50);

    // 设置角色立绘
    if (dialog.character) {
        showCharacter(dialog.character, dialog.position);
    } else {
        // 清除角色
        const charactersLayer = document.getElementById('characters');
        charactersLayer.innerHTML = '';
    }

    // 点击继续
    dialogBox.onclick = () => {
        if (textElement.dataset.typing === 'true') {
            // 如果正在打字，直接显示全部文本
            textElement.textContent = dialog.text;
            textElement.dataset.typing = 'false';
        } else {
            // 否则进入下一段对话
            gameState.currentDialog++;
            showDialog();
        }
    };
}

// 打字机效果
function typeWriter(element, text, speed) {
    element.textContent = '';
    element.dataset.typing = 'true';
    let i = 0;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.dataset.typing = 'false';
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
console.log('%c傲娇大小姐白菜 - Galgame', 'color: #32CD32; font-size: 24px; font-weight: bold;');
console.log('%c准备好体验一段甜蜜的恋爱故事了吗？', 'color: #98FB98; font-size: 14px;');
console.log('%cBGM: Bensound (https://www.bensound.com)', 'color: #FFD700; font-size: 12px;');
