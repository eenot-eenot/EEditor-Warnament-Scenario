const inGameMaps = [
    "jalhund_europe_vg",
    "jaba_america_vg",
    "parcoucat_euro4_vg",
    "jalhund_europe",
    "jaba_america",
    "parcoucat_euro4",
];

const statusScores = {
    "complate": 40,
    "early_access": 30,
    "in_development": 20,
    "beta": 15,
    "alpha": 10,
    "experimental": 5,
    "frozen": 0,
    "archived": -30,
    "discontinued": -50,
};

const awardScores = {
    "star": 25,
    "enot": 50,
    "50": 25,
};

const scenariosData = [
    {
        id: [
            "eenot",
            "world",
            "v1",
            "modern-world",
        ],
        title: "Modern World",
        author: {
            name: "@eenot",
            link: "https://discord.com/users/794675642037567491",
            color: "#3B83BD"
        },
        year: "2015",
        languages: ["EN", "RU"],
        gameMode: "Sandbox",
        tags: ["World", "For Phones", "Recommended", "without events", "without reforms", "Modern Day"],
        worldCreator: "ЕЕнот",
        awards: ["star", "enot"],
        // Hidden parameters
        publishDate: "2025-01-19",
        lastUpdate: "2025-01-19",
        hiddenScore: 50,
        type: "sandbox",
        period: "modern",
        status: "archived",
    },
    {
        id: [
            "jalhund",
            "europe",
            "vg",
            "new-revolution",
        ],
        title: "New Revolution",
        author: {
            name: "@eenot",
            link: "https://discord.com/users/794675642037567498",
            color: "#3B83BD"
        },
        year: "2022",
        languages: ["RU"],
        gameMode: "Sandbox",
        tags: ["Europe", "For Phones", "Recommended", "without events", "without reforms", "Alternative History"],
        worldCreator: "ЕЕнот",
        map: {
            name: "Standart Europe",
            id: "jalhund_europe_vg"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2024-10-30",
        lastUpdate: "2024-10-30",
        hiddenScore: -250,
        type: "sandbox",
        period: "alternative",
        status: "discontinued",
    },
    {
        id: [
            "eenot",
            "world",
            "v1",
            "ww2",
        ],
        title: "World War 2",
        author: {
            name: "@theman_the_myth_the_legend",
            link: "https://discord.com/users/1083919275951149118",
            color: "#3B83BD"
        },
        year: "1936",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["World", "For Phones", "Recommended", "without events", "without reforms", "Historical", "WW2"],
        worldCreator: "ЕЕнот",
        awards: [],
        // Hidden parameters
        publishDate: "2025-01-24",
        lastUpdate: "2025-01-24",
        hiddenScore: 0,
        type: "sandbox",
        period: "ww2",
    },
    {
        id: [
            "eenot",
            "world",
            "v1",
            "cw",
        ],
        title: "The Cold War",
        author: {
            name: "@theman_the_myth_the_legend",
            link: "https://discord.com/users/1083919275951149118",
            color: "#3B83BD"
        },
        year: "1965",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["World", "For Phones", "without events", "without reforms", "Historical", "Cold War"],
        worldCreator: "ЕЕнот",
        awards: [],
        // Hidden parameters
        publishDate: "2025-01-24",
        lastUpdate: "2025-01-24",
        hiddenScore: 0,
        type: "sandbox",
        period: "cw",
    },
    {
        id: [
            "eenot",
            "world",
            "v1",
            "1984",
        ],
        title: "1984",
        author: {
            name: "@helvetic_brutalisation",
            link: "https://discord.com/users/1280887382920532073",
            color: "#3B83BD"
        },
        year: "1984",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["World", "For Phones", "Recommended", "without events", "without reforms", "Alternative History", "1984"],
        worldCreator: "ЕЕнот",
        awards: ["enot"],
        // Hidden parameters
        publishDate: "2025-01-31",
        lastUpdate: "2025-01-31",
        hiddenScore: 0,
        type: "sandbox",
        period: "alternative"
    },
    {
        id: [
            "estebanf259",
            "euromagnus",
            "v1",
            "1444",
        ],
        title: "1444",
        author: {
            name: "@totoska",
            link: "https://discord.com/users/820194328201920524",
            color: "#3B83BD"
        },
        year: "1444",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["Europe", "Historical", "Medieval", "without events", "without reforms"],
        worldCreator: "ЕЕнот",
        map: {
            name: "EuroMagnus by Estebanf259",
            id: "estebanf259_euromagnus_v1"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2024-11-17",
        lastUpdate: "2024-11-17",
        hiddenScore: 0,
        type: "sandbox",
        period: "ancient"
    },
    {
        id: [
            "parkourcat",
            "euro4",
            "vg",
            "pick-roman-empire",
        ],
        title: "The peak of the Roman Empire",
        author: {
            name: "@totoska",
            link: "https://discord.com/users/820194328201920524",
            color: "#3B83BD"
        },
        year: "1177",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["Europe", "Historical", "Roman Empire", "Ancient"],
        worldCreator: "ЕЕнот",
        map: {
            name: "Euro4 Standart",
            id: "parkourcat_euro4_vg"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2024-11-20",
        lastUpdate: "2024-11-20",
        hiddenScore: 0,
        type: "sandbox",
        period: "ancient"
    },
    {
        id: [
            "shahz0d",
            "world",
            "v1",
            "shw",
        ],
        title: "The Seven Hours War",
        author: {
            name: "@totoska",
            link: "https://discord.com/users/820194328201920524",
            color: "#3B83BD"
        },
        year: "2000",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["World", "Alternative History", "Half-Life", "Post-apocalyptic"],
        worldCreator: "ЕЕнот",
        map: {
            name: "World Plus",
            id: "shahz0d_world_v1"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2024-11-21",
        lastUpdate: "2024-11-21",
        hiddenScore: 0,
        type: "sandbox",
        period: "alternative"
    },
    {
        id: [
            "zachary",
            "eurasia",
            "v2",
            "kaiserreich",
        ],
        title: "Kaiserreich",
        author: {
            name: "@totoska",
            link: "https://discord.com/users/820194328201920524",
            color: "#3B83BD"
        },
        year: "1936",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["Eurasia", "Alternative History", "WW1", "Kaiserreich"],
        worldCreator: "ЕЕнот",
        map: {
            name: "Eurasia by Zachary",
            id: "zachary_eurasia_v1"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2024-12-03",
        lastUpdate: "2025-04-07",
        hiddenScore: 0,
        type: "sandbox",
        period: "alternative"
    },
    {
        id: [
            "zachary",
            "eurasia",
            "v2",
            "modern",
        ],
        title: "Modern Day",
        author: {
            name: "@totoska",
            link: "https://discord.com/users/820194328201920524",
            color: "#3B83BD"
        },
        year: "2020",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["Eurasia", "Modern Day", "2020s"],
        worldCreator: "ЕЕнот",
        map: {
            name: "Eurasia by Zachary",
            id: "zachary_eurasia_v1"
        },
        awards: ["star","enot"],
        // Hidden parameters
        publishDate: "2025-03-07",
        lastUpdate: "2025-04-30",
        hiddenScore: 0,
        type: "sandbox",
        period: "modern"
    },
    {
        id: [
            "zachary",
            "eurasia",
            "v2",
            "tno",
        ],
        title: "The New Order",
        author: {
            name: "@totoska",
            link: "https://discord.com/users/820194328201920524",
            color: "#3B83BD"
        },
        year: "1962",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["Eurasia", "Alternative History", "WW2", "The New Order", "Cold War"],
        worldCreator: "ЕЕнот",
        map: {
            name: "Eurasia by Zachary",
            id: "zachary_eurasia_v1"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2024-12-17",
        lastUpdate: "2024-12-17",
        hiddenScore: 0,
        type: "sandbox",
        period: "alternative"
    },
    {
        id: [
            "zachary",
            "world",
            "v1",
            "ww2",
        ],
        title: "World War 2",
        author: {
            name: "@totoska",
            link: "https://discord.com/users/820194328201920524",
            color: "#3B83BD"
        },
        year: "1936",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["World", "Historical", "WW2", "1936"],
        worldCreator: "ЕЕнот",
        map: {
            name: "World by Zachary",
            id: "zachary_world_v1"
        },
        awards: ["star","enot"],
        // Hidden parameters
        publishDate: "2025-03-07",
        lastUpdate: "2025-03-07",
        hiddenScore: 0,
        type: "sandbox",
        period: "ww2"
    },
    {
        id: [
            "enotochel",
            "pvp",
            "v1",
            "1-1",
        ],
        title: "1v1 Warnament",
        author: {
            name: "@totoska",
            link: "https://discord.com/users/820194328201920524",
            color: "#3B83BD"
        },
        year: "0",
        languages: ["EN"],
        gameMode: "Battle",
        tags: ["PvP", "Battle", "1v1", "Competitive"],
        worldCreator: "ЕЕнот",
        map: {
            name: "PvP map by Енотий",
            id: "enotochel_pvp_v1"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2024-12-23",
        lastUpdate: "2024-12-23",
        hiddenScore: 0,
        type: "battle",
        period: ""
    },
    {
        id: [
            "enotochel",
            "pvp",
            "v1",
            "1-1-watcher",
        ],
        title: "1v1 Warnament (+Watcher)",
        author: {
            name: "@totoska",
            link: "https://discord.com/users/820194328201920524",
            color: "#3B83BD"
        },
        year: "0",
        languages: ["EN"],
        gameMode: "Battle",
        tags: ["PvP", "Battle", "1v1", "Competitive", "Spectator"],
        worldCreator: "ЕЕнот",
        map: {
            name: "PvP map by Енотий",
            id: "enotochel_pvp_v1"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2024-12-23",
        lastUpdate: "2024-12-23",
        hiddenScore: 0,
        type: "battle",
        period: ""
    },
    {
        id: [
            "estebanf259",
            "world-redux",
            "v2",
            "cw",
        ],
        title: "The Cold War",
        author: {
            name: "@deleted_user",
            link: "https://discord.com/users/456226577798135808",
            color: "#3B83BD"
        },
        year: "1949",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["World", "Historical", "Cold War", "Redux"],
        worldCreator: "ЕЕнот",
        map: {
            name: "World Map Redux",
            id: "estebanf259_world-redux_v2"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2023-07-03",
        lastUpdate: "2023-07-03",
        hiddenScore: 0,
        type: "sandbox",
        period: "cw"
    },
    {
        id: [
            "estebanf259",
            "world-redux",
            "v2",
            "modern",
        ],
        title: "Modern Day",
        author: {
            name: "@deleted_user",
            link: "https://discord.com/users/456226577798135808",
            color: "#3B83BD"
        },
        year: "2000",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["World", "Modern Day", "Redux", "2000s"],
        worldCreator: "ЕЕнот",
        map: {
            name: "World Map Redux",
            id: "estebanf259_world-redux_v2"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2023-07-03",
        lastUpdate: "2023-07-03",
        hiddenScore: 0,
        type: "sandbox",
        period: "modern"
    },
    {
        id: [
            "estebanf259",
            "world-redux",
            "v2",
            "hoi4-formables",
        ],
        title: "Hoi4 Formables",
        author: {
            name: "@deleted_user",
            link: "https://discord.com/users/456226577798135808",
            color: "#3B83BD"
        },
        year: "1936",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["World", "WW2", "Hearts of Iron", "Formable Nations", "Redux"],
        worldCreator: "ЕЕнот",
        map: {
            name: "World Map Redux",
            id: "estebanf259_world-redux_v2"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2023-11-10",
        lastUpdate: "2023-11-10",
        hiddenScore: 0,
        type: "sandbox",
        period: "ww2"
    },
    {
        id: [
            "estebanf259",
            "world-redux",
            "v2",
            "1218",
        ],
        title: "1218",
        author: {
            name: "@deleted_user",
            link: "https://discord.com/users/456226577798135808",
            color: "#3B83BD"
        },
        year: "1218",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["World", "Historical", "Medieval", "Redux", "13th Century"],
        worldCreator: "ЕЕнот",
        map: {
            name: "World Map Redux",
            id: "estebanf259_world-redux_v2"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2023-07-03",
        lastUpdate: "2023-07-03",
        hiddenScore: 0,
        type: "sandbox",
        period: "ancient"
    },
    {
        id: [
            "estebanf259",
            "world-redux",
            "v2",
            "1756",
        ],
        title: "1756",
        author: {
            name: "@deleted_user",
            link: "https://discord.com/users/456226577798135808",
            color: "#3B83BD"
        },
        year: "1756",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["World", "Historical", "18th Century", "Redux"],
        worldCreator: "ЕЕнот",
        map: {
            name: "World Map Redux",
            id: "estebanf259_world-redux_v2"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2023-07-03",
        lastUpdate: "2023-07-03",
        hiddenScore: 0,
        type: "sandbox",
        period: "ancient"
    },
    {
        id: [
            "zachary",
            "world-3ga",
            "v1",
            "continents",
        ],
        title: "World 3g ago",
        author: {
            name: "@zachary.bachary",
            link: "https://discord.com/users/804839006403428423",
            color: "#3B83BD"
        },
        year: "-3000000000",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["World", "Historical", "Prehistoric", "Geology", "Continents"],
        worldCreator: "ЕЕнот",
        map: {
            name: "World Map (3 billion years ago)",
            id: "zachary_world-3ga_v1"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2025-04-09",
        lastUpdate: "2025-04-09",
        hiddenScore: 0,
        type: "sandbox",
        period: "ancient"
    },
    {
        id: [
            "zachary",
            "eurasia",
            "v2",
            "1800"
        ],
        title: "Europe 1800",
        author: {
            name: "@zachary.bachary",
            link: "https://discord.com/users/804839006403428423",
            color: "#3B83BD"
        },
        year: "1800",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["Eurasia", "Historical", "Napoleonic Era", "19th Century"],
        worldCreator: "Zachary",
        map: {
            name: "Eurasia by Zachary",
            id: "zachary_eurasia_v2"
        },
        awards: [],
        publishDate: "2025-03-07",
        lastUpdate: "2025-03-07",
        hiddenScore: 0,
        type: "sandbox",
        period: "ancient"
    },
    {
        id: [
            "zachary",
            "eurasia",
            "v2",
            "1812"
        ],
        title: "Napoleonic Wars",
        author: {
            name: "@zachary.bachary",
            link: "https://discord.com/users/804839006403428423",
            color: "#3B83BD"
        },
        year: "1812",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["Eurasia", "Historical", "Napoleonic Wars", "19th Century"],
        worldCreator: "Zachary",
        map: {
            name: "Eurasia by Zachary",
            id: "zachary_eurasia_v2"
        },
        awards: [],
        publishDate: "2025-03-07",
        lastUpdate: "2025-03-07",
        hiddenScore: 0,
        type: "sandbox",
        period: "ancient"
    },
    {
        id: [
            "zachary",
            "eurasia",
            "v2",
            "1939"
        ],
        title: "World War 2 Start",
        author: {
            name: "@zachary.bachary",
            link: "https://discord.com/users/804839006403428423",
            color: "#3B83BD"
        },
        year: "1939",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["Eurasia", "Historical", "WW2", "20th Century"],
        worldCreator: "Zachary",
        map: {
            name: "Eurasia by Zachary",
            id: "zachary_eurasia_v2"
        },
        awards: [],
        publishDate: "2025-03-07",
        lastUpdate: "2025-03-07",
        hiddenScore: 0,
        type: "sandbox",
        period: "ww2"
    },
    {
        id: [
            "zachary",
            "eurasia",
            "v2",
            "ep2"
        ],
        title: "Episode 2",
        author: {
            name: "@zachary.bachary",
            link: "https://discord.com/users/804839006403428423",
            color: "#3B83BD"
        },
        year: "2025",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["Eurasia", "Alternative History", "Future", "Episode 2"],
        worldCreator: "Zachary",
        map: {
            name: "Eurasia by Zachary",
            id: "zachary_eurasia_v2"
        },
        awards: [],
        publishDate: "2025-03-07",
        lastUpdate: "2025-03-07",
        hiddenScore: 0,
        type: "sandbox",
        period: "alternative"
    },
    {
        id: [
            "zachary",
            "eurasia",
            "v2",
            "ep3"
        ],
        title: "Episode 3",
        author: {
            name: "@zachary.bachary",
            link: "https://discord.com/users/804839006403428423",
            color: "#3B83BD"
        },
        year: "2025",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["Eurasia", "Alternative History", "Future", "Episode 3"],
        worldCreator: "Zachary",
        map: {
            name: "Eurasia by Zachary",
            id: "zachary_eurasia_v2"
        },
        awards: [],
        publishDate: "2025-03-07",
        lastUpdate: "2025-03-07",
        hiddenScore: 0,
        type: "sandbox",
        period: "alternative"
    },
    {
        id: [
            "zachary",
            "eurasia",
            "v2",
            "ep4"
        ],
        title: "Episode 4",
        author: {
            name: "@zachary.bachary",
            link: "https://discord.com/users/804839006403428423",
            color: "#3B83BD"
        },
        year: "2025",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["Eurasia", "Alternative History", "Future", "Episode 4"],
        worldCreator: "Zachary",
        map: {
            name: "Eurasia by Zachary",
            id: "zachary_eurasia_v2"
        },
        awards: [],
        publishDate: "2025-03-07",
        lastUpdate: "2025-03-07",
        hiddenScore: 0,
        type: "sandbox",
        period: "alternative"
    },
    {
        id: [
            "zachary",
            "eurasia",
            "v2",
            "fac"
        ],
        title: "Fall of Constantinople",
        author: {
            name: "@zachary.bachary",
            link: "https://discord.com/users/804839006403428423",
            color: "#3B83BD"
        },
        year: "2077",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["Eurasia", "Post-apocalyptic", "Fallout", "Alternative History"],
        worldCreator: "Zachary",
        map: {
            name: "Eurasia by Zachary",
            id: "zachary_eurasia_v2"
        },
        awards: [],
        publishDate: "2025-03-07",
        lastUpdate: "2025-03-07",
        hiddenScore: 0,
        type: "sandbox",
        period: "future"
    },
    {
        id: [
            "zachary",
            "eurasia",
            "v2",
            "ww1"
        ],
        title: "World War 1",
        author: {
            name: "@zachary.bachary",
            link: "https://discord.com/users/804839006403428423",
            color: "#3B83BD"
        },
        year: "1914",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["Eurasia", "Historical", "WW1", "20th Century"],
        worldCreator: "Zachary",
        map: {
            name: "Eurasia by Zachary",
            id: "zachary_eurasia_v2"
        },
        awards: [],
        publishDate: "2025-03-07",
        lastUpdate: "2025-03-07",
        hiddenScore: 0,
        type: "sandbox",
        period: "ww1"
    },
    {
        id: [
            "zachary",
            "eurasia",
            "v2",
            "nw"
        ],
        title: "Napoleonic War",
        author: {
            name: "@zachary.bachary",
            link: "https://discord.com/users/804839006403428423",
            color: "#3B83BD"
        },
        year: "2025",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["Eurasia", "Alternative History", "Nuclear War", "Post-apocalyptic"],
        worldCreator: "Zachary",
        map: {
            name: "Eurasia by Zachary",
            id: "zachary_eurasia_v2"
        },
        awards: [],
        publishDate: "2025-03-07",
        lastUpdate: "2025-03-07",
        hiddenScore: 0,
        type: "sandbox",
        period: "alternative"
    },
    {
        id: [
            "zachary",
            "world",
            "v1",
            "islam"
        ],
        title: "Islamic World",
        author: {
            name: "@zachary.bachary",
            link: "https://discord.com/users/804839006403428423",
            color: "#3B83BD"
        },
        year: "632",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["World", "Historical", "Islam", "7th Century", "Medieval"],
        worldCreator: "Zachary",
        map: {
            name: "World by Zachary",
            id: "zachary_world_v1"
        },
        awards: [],
        publishDate: "2025-03-07",
        lastUpdate: "2025-03-07",
        hiddenScore: 0,
        type: "sandbox",
        period: "ancient"
    },
    {
        id: [
            "zachary",
            "world",
            "v1",
            "revolutionary-war"
        ],
        title: "American Revolution",
        author: {
            name: "@zachary.bachary",
            link: "https://discord.com/users/804839006403428423",
            color: "#3B83BD"
        },
        year: "1776",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["World", "Historical", "American Revolution", "18th Century"],
        worldCreator: "Zachary",
        map: {
            name: "World by Zachary",
            id: "zachary_world_v1"
        },
        awards: [],
        publishDate: "2025-03-07",
        lastUpdate: "2025-03-07",
        hiddenScore: 0,
        type: "sandbox",
        period: "ancient"
    },
    {
        id: [
            "zachary",
            "world",
            "v1",
            "ww1"
        ],
        title: "World War 1",
        author: {
            name: "@zachary.bachary",
            link: "https://discord.com/users/804839006403428423",
            color: "#3B83BD"
        },
        year: "1914",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["World", "Historical", "WW1", "20th Century"],
        worldCreator: "Zachary",
        map: {
            name: "World by Zachary",
            id: "zachary_world_v1"
        },
        awards: [],
        publishDate: "2025-03-07",
        lastUpdate: "2025-03-07",
        hiddenScore: 0,
        type: "sandbox",
        period: "ww1"
    },
    {
        id: [
            "zachary",
            "world",
            "v1",
            "ww2z"
        ],
        title: "World War 2",
        author: {
            name: "@zachary.bachary",
            link: "https://discord.com/users/804839006403428423",
            color: "#3B83BD"
        },
        year: "1936",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["World", "Alternative History", "WW2", "Zombies"],
        worldCreator: "Zachary",
        map: {
            name: "World by Zachary",
            id: "zachary_world_v1"
        },
        awards: [],
        publishDate: "2025-03-27",
        lastUpdate: "2025-03-27",
        hiddenScore: 0,
        type: "sandbox",
        period: "ww2"
    },
    {
        id: [
            "zachary",
            "usa",
            "v1",
            "2025"
        ],
        title: "USA 2025",
        author: {
            name: "@zachary.bachary",
            link: "https://discord.com/users/804839006403428423",
            color: "#3B83BD"
        },
        year: "2025",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["USA", "Modern Day", "2025"],
        worldCreator: "Zachary",
        map: {
            name: "USA by Zachary",
            id: "zachary_usa_v1"
        },
        awards: [],
        publishDate: "2025-01-21",
        lastUpdate: "2025-01-21",
        hiddenScore: 0,
        type: "sandbox",
        period: "modern"
    },
    {
        id: [
            "zachary",
            "usa",
            "v1",
            "civil"
        ],
        title: "American Civil War",
        author: {
            name: "@zachary.bachary",
            link: "https://discord.com/users/804839006403428423",
            color: "#3B83BD"
        },
        year: "1861",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["USA", "Historical", "Civil War", "19th Century"],
        worldCreator: "Zachary",
        map: {
            name: "USA by Zachary",
            id: "zachary_usa_v1"
        },
        awards: [],
        publishDate: "2025-02-02",
        lastUpdate: "2025-02-02",
        hiddenScore: 0,
        type: "sandbox",
        period: "ancient"
    },
    {
        id: [
            "zachary",
            "usa",
            "v1",
            "ethnic"
        ],
        title: "USA Ethnic Map",
        author: {
            name: "@zachary.bachary",
            link: "https://discord.com/users/804839006403428423",
            color: "#3B83BD"
        },
        year: "2020",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["USA", "Modern Day", "Ethnic Groups", "Demographics"],
        worldCreator: "Zachary",
        map: {
            name: "USA by Zachary",
            id: "zachary_usa_v1"
        },
        awards: [],
        publishDate: "2025-01-23",
        lastUpdate: "2025-01-23",
        hiddenScore: 0,
        type: "sandbox",
        period: "modern"
    },
    {
        id: [
            "zachary",
            "world",
            "v1",
            "kaiserreich",
        ],
        title: "Kaiserreich",
        author: {
            name: "@totoska",
            link: "https://discord.com/users/820194328201920524",
            color: "#3B83BD"
        },
        year: "1936",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["World", "Alternative History", "Kaiserreich"],
        worldCreator: "ЕЕнот",
        map: {
            name: "World by Zachary",
            id: "zachary_world_v1"
        },
        awards: ["enot"],
        // Hidden parameters
        publishDate: "2025-04-14",
        lastUpdate: "2025-04-14",
        hiddenScore: 0,
        type: "sandbox",
        period: "alternative"
    },
    {
        id: [
            "zachary",
            "world",
            "v1",
            "kalterkrieg",
        ],
        title: "Kalterkrieg",
        author: {
            name: "@totoska",
            link: "https://discord.com/users/820194328201920524",
            color: "#3B83BD"
        },
        year: "1948",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["World", "Alternative History", "Kalterkrieg"],
        worldCreator: "ЕЕнот",
        map: {
            name: "World by Zachary",
            id: "zachary_world_v1"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2025-04-14",
        lastUpdate: "2025-04-14",
        hiddenScore: 0,
        type: "sandbox",
        period: "alternative"
    },
    {
        id: [
            "jalhund",
            "europe",
            "vg",
            "1941",
        ],
        title: "Великая Отечественная Война",
        author: {
            name: "@pelo3918",
            link: "https://discord.com/users/1071700840492056717",
            color: "#3B83BD"
        },
        year: "1941",
        languages: ["RU"],
        gameMode: "Sandbox",
        tags: ["Europe", "Historical", "WW2", "1941"],
        worldCreator: "ЕЕнот",
        map: {
            name: "Standart Europe",
            id: "jalhund_europe_vg"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2024-07-01",
        lastUpdate: "2024-07-01",
        hiddenScore: 0,
        type: "sandbox",
        period: "ww2"
    },
    {
        id: [
            "jalhund",
            "europe",
            "vg",
            "modern-ru",
        ],
        title: "Современный Мир",
        author: {
            name: "@pelo3918",
            link: "https://discord.com/users/1071700840492056717",
            color: "#3B83BD"
        },
        year: "2020",
        languages: ["RU"],
        gameMode: "Sandbox",
        tags: ["Europe", "Historical", "Modern", "2020"],
        worldCreator: "ЕЕнот",
        map: {
            name: "Standart Europe",
            id: "jalhund_europe_vg"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2024-06-14",
        lastUpdate: "2024-06-14",
        hiddenScore: 0,
        type: "sandbox",
        period: "modern"
    },
    {
        id: [
            "jalhund",
            "europe",
            "vg",
            "modern-en",
        ],
        title: "Modern World",
        author: {
            name: "@pelo3918",
            link: "https://discord.com/users/1071700840492056717",
            color: "#3B83BD"
        },
        year: "2020",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["Europe", "Historical", "Modern", "2020"],
        worldCreator: "ЕЕнот",
        map: {
            name: "Standart Europe",
            id: "jalhund_europe_vg"
        },
        awards: ["star","enot"],
        // Hidden parameters
        publishDate: "2024-06-14",
        lastUpdate: "2024-06-14",
        hiddenScore: 0,
        type: "sandbox",
        period: "modern"
    },
    {
        id: [
            "jalhund",
            "europe",
            "vg",
            "1985",
        ],
        title: "Холодная Война",
        author: {
            name: "@pelo3918",
            link: "https://discord.com/users/1071700840492056717",
            color: "#3B83BD"
        },
        year: "1985",
        languages: ["RU"],
        gameMode: "Sandbox",
        tags: ["Europe", "Historical"],
        worldCreator: "ЕЕнот",
        map: {
            name: "Standart Europe",
            id: "jalhund_europe_vg"
        },
        awards: ["enot"],
        // Hidden parameters
        publishDate: "2024-07-01",
        lastUpdate: "2024-07-01",
        hiddenScore: 0,
        type: "sandbox",
        period: "cw"
    },
    {
        id: [
            "jalhund",
            "europe",
            "vg",
            "nw-ru",
        ],
        title: "Северная Война",
        author: {
            name: "@pelo3918",
            link: "https://discord.com/users/1071700840492056717",
            color: "#3B83BD"
        },
        year: "1700",
        languages: ["RU"],
        gameMode: "Sandbox",
        tags: ["Europe", "Historical"],
        worldCreator: "ЕЕнот",
        map: {
            name: "Standart Europe",
            id: "jalhund_europe_vg"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2024-04-12",
        lastUpdate: "2024-04-12",
        hiddenScore: 0,
        type: "sandbox",
        period: "ancient"
    },
    {
        id: [
            "jalhund",
            "europe",
            "vg",
            "nw-en",
        ],
        title: "Northern War",
        author: {
            name: "@pelo3918",
            link: "https://discord.com/users/1071700840492056717",
            color: "#3B83BD"
        },
        year: "1700",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["Europe", "Historical"],
        worldCreator: "ЕЕнот",
        map: {
            name: "Standart Europe",
            id: "jalhund_europe_vg"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2024-04-12",
        lastUpdate: "2024-04-12",
        hiddenScore: 0,
        type: "sandbox",
        period: "ancient"
    },
    {
        id: [
            "parkourcat",
            "euro4",
            "vg",
            "hsb",
        ],
        title: "Эллада наносит ответный удар",
        author: {
            name: "@pelo3918",
            link: "https://discord.com/users/1071700840492056717",
            color: "#3B83BD"
        },
        year: "-323",
        languages: ["RU"],
        gameMode: "Sandbox",
        tags: ["Europe", "Historical", "Ancient"],
        worldCreator: "ЕЕнот",
        map: {
            name: "Euro4 Standart",
            id: "parkourcat_euro4_vg"
        },
        awards: ["50"],
        // Hidden parameters
        publishDate: "2024-02-03",
        lastUpdate: "2024-02-03",
        hiddenScore: 0,
        type: "sandbox",
        period: "ancient"
    },
    {
        id: [
            "eenot",
            "arstotzka",
            "v2",
            "1996",
        ],
        title: "Arstotzka World - 1996",
        author: {
            name: "@eenot",
            link: "https://discord.com/users/794675642037567491",
            color: "#3B83BD"
        },
        year: "1996",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["World", "For Phones", "Recommended", "without events", "without reforms"],
        worldCreator: "ЕЕнот",
        map: {
            name: "World by ЕЕнот",
            id: "eenot_arstotzka_v2"
        },
        awards: ["enot"],
        // Hidden parameters
        publishDate: "2025-04-21",
        lastUpdate: "2025-05-21",
        hiddenScore: 0,
        type: "sandbox",
        period: "alternative",
    },
    {
        id: [
            "zachary",
            "world-am",
            "v1",
            "modern",
        ],
        title: "World According to Americans",
        author: {
            name: "@zachary.bachary",
            link: "https://discord.com/users/804839006403428423",
            color: "#3B83BD"
        },
        year: "2026",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["World", "For Phones", "without events", "without reforms"],
        map: {
            name: "World According to Americans",
            id: "zachary_world-am_v1"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2025-01-28",
        lastUpdate: "2025-02-21",
        hiddenScore: 0,
        type: "sandbox",
        period: "modern"
    },
    {
        id: [
            "zachary",
            "world-am",
            "v1",
            "ru",
        ],
        title: "Мир, со слов русских",
        author: {
            name: "@eenot",
            link: "https://discord.com/users/794675642037567491",
            color: "#3B83BD"
        },
        year: "2026",
        languages: ["RU"],
        gameMode: "Sandbox",
        tags: ["World", "For Phones", "without events", "without reforms"],
        map: {
            name: "World According to Americans",
            id: "zachary_world-am_v1"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2025-03-26",
        lastUpdate: "2025-03-26",
        hiddenScore: 0,
        type: "sandbox",
        period: "modern"
    },
    {
        id: [
            "eenot",
            "moldavia",
            "v1",
            "1990",
        ],
        title: "Moldavia - 1990",
        author: {
            name: "@eenot",
            link: "https://discord.com/users/794675642037567491",
            color: "#3B83BD"
        },
        year: "1990",
        languages: ["RU"],
        gameMode: "Sandbox",
        tags: ["For Phones", "without events", "without reforms", "Modern Day"],
        worldCreator: "ЕЕнот",
        map: {
            name: "Moldavia by ЕЕнот",
            id: "eenot_moldavia_v1"
        },
        awards: ["enot"],
        // Hidden parameters
        publishDate: "2025-04-28",
        lastUpdate: "2025-04-28",
        hiddenScore: 0,
        type: "sandbox",
        period: "modern",
        status: "in_development",
    },
    {
        id: [
            "eenot",
            "moldavia",
            "v1",
            "2025",
        ],
        title: "Moldavia - 2025",
        author: {
            name: "@eenot",
            link: "https://discord.com/users/794675642037567491",
            color: "#3B83BD"
        },
        year: "2025",
        languages: ["EN","RU"],
        gameMode: "Sandbox",
        tags: ["For Phones", "without events", "without reforms", "Modern Day"],
        worldCreator: "ЕЕнот",
        map: {
            name: "Moldavia by ЕЕнот",
            id: "eenot_moldavia_v1"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2025-04-28",
        lastUpdate: "2025-04-28",
        hiddenScore: 0,
        type: "sandbox",
        period: "modern",
        status: "in_development",
    },
    {
        id: [
            "eenot",
            "moldavia",
            "v1",
            "1941",
        ],
        title: "Moldavia - 1941",
        author: {
            name: "@eenot",
            link: "https://discord.com/users/794675642037567491",
            color: "#3B83BD"
        },
        year: "1941",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["For Phones", "without events", "without reforms", "World War 2"],
        worldCreator: "ЕЕнот",
        map: {
            name: "Moldavia by ЕЕнот",
            id: "eenot_moldavia_v1"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2025-04-28",
        lastUpdate: "2025-04-28",
        hiddenScore: 0,
        type: "sandbox",
        period: "ww2",
        status: "in_development",
    },
    {
        id: [
            "eenot",
            "moldavia",
            "v1",
            "1944",
        ],
        title: "Moldavia - 1944",
        author: {
            name: "@eenot",
            link: "https://discord.com/users/794675642037567491",
            color: "#3B83BD"
        },
        year: "1944",
        languages: ["RU"],
        gameMode: "Sandbox",
        tags: ["For Phones", "without events", "without reforms", "World War 2"],
        worldCreator: "ЕЕнот",
        map: {
            name: "Moldavia by ЕЕнот",
            id: "eenot_moldavia_v1"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2025-04-28",
        lastUpdate: "2025-04-28",
        hiddenScore: 0,
        type: "sandbox",
        period: "ww2",
        status: "in_development",
    },
    {
        id: [
            "eenot",
            "world",
            "v1",
            "ww1",
        ],
        title: "World War 1",
        author: {
            name: "@totoska",
            link: "https://discord.com/users/820194328201920524",
            color: "#3B83BD"
        },
        year: "1914",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["World", "Historical", "WW1"],
        worldCreator: "ЕЕнот",
        awards: ["star","enot"],
        // Hidden parameters
        publishDate: "2025-05-01",
        lastUpdate: "2025-05-01",
        hiddenScore: 10,
        type: "sandbox",
        period: "ww1"
    },
    {
        id: [
            "bluepum",
            "enaatme",
            "v2",
            "1444-atharva",
        ],
        title: "1444",
        author: {
            name: "@atharva04303",
            link: "https://discord.com/users/1306545186146353193",
            color: "#3B83BD"
        },
        year: "1444",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: [],
        worldCreator: "ЕЕнот",
        map: {
            name: "Europe+ by BluePum",
            id: "bluepum_enaatme_v2"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2025-04-30",
        lastUpdate: "2025-04-30",
        hiddenScore: 0,
        type: "sandbox",
        period: "ancient"
    },
    {
        id: [
            "bluepum",
            "enaatme",
            "v2",
            "modern-atharva",
        ],
        title: "Modern",
        author: {
            name: "@atharva04303",
            link: "https://discord.com/users/1306545186146353193",
            color: "#3B83BD"
        },
        year: "2025",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: [],
        worldCreator: "ЕЕнот",
        map: {
            name: "Europe+ by BluePum",
            id: "bluepum_enaatme_v2"
        },
        awards: ["star","enot"],
        // Hidden parameters
        publishDate: "2025-04-29",
        lastUpdate: "2025-04-29",
        hiddenScore: 0,
        type: "sandbox",
        period: "modern"
    },
    {
        id: [
            "bluepum",
            "enaatme",
            "v2",
            "fc",
        ],
        title: "First coalition of france",
        author: {
            name: "@atharva04303",
            link: "https://discord.com/users/1306545186146353193",
            color: "#3B83BD"
        },
        year: "1792",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: [],
        worldCreator: "ЕЕнот",
        map: {
            name: "Europe+ by BluePum",
            id: "bluepum_enaatme_v2"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2025-04-30",
        lastUpdate: "2025-04-30",
        hiddenScore: 0,
        type: "sandbox",
        period: "ancient"
    },
    {
        id: [
            "bluepum",
            "enaatme",
            "v4",
            "1991",
        ],
        title: "1991",
        author: {
            name: "@atharva04303",
            link: "https://discord.com/users/1306545186146353193",
            color: "#3B83BD"
        },
        year: "2025",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: [],
        worldCreator: "ЕЕнот",
        map: {
            name: "Europe+ by BluePum",
            id: "bluepum_enaatme_v4"
        },
        awards: ["star","enot"],
        // Hidden parameters
        publishDate: "2025-05-02",
        lastUpdate: "2025-05-03",
        hiddenScore: 0,
        type: "sandbox",
        period: "modern"
    },
    {
        id: [
            "bluepum",
            "enaatme",
            "v4",
            "ww1",
        ],
        title: "World War 1",
        author: {
            name: "@blue_pum_67269",
            link: "https://discord.com/users/1260558860796825610",
            color: "#3B83BD"
        },
        year: "1914",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: [],
        worldCreator: "ЕЕнот",
        map: {
            name: "Europe+ by BluePum",
            id: "bluepum_enaatme_v4"
        },
        awards: ["star","enot"],
        // Hidden parameters
        publishDate: "2025-05-02",
        lastUpdate: "2025-05-02",
        hiddenScore: 0,
        type: "sandbox",
        period: "ww1"
    },
    {
        id: [
            "bluepum",
            "enaatme",
            "v1",
            "ww2",
        ],
        title: "World War 2",
        author: {
            name: "@radardev",
            link: "https://discord.com/users/951467148063158324",
            color: "#3B83BD"
        },
        year: "1936",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: [],
        worldCreator: "ЕЕнот",
        map: {
            name: "Europe+ by BluePum",
            id: "bluepum_enaatme_v1"
        },
        awards: ["star","enot"],
        // Hidden parameters
        publishDate: "2025-04-27",
        lastUpdate: "2025-04-27",
        hiddenScore: 0,
        type: "sandbox",
        period: "ww2"
    },
    {
        id: [
            "bluepum",
            "enaatme",
            "v2",
            "cw",
        ],
        title: "Cold War",
        author: {
            name: "@zachary.bachary",
            link: "https://discord.com/users/804839006403428423",
            color: "#3B83BD"
        },
        year: "1964",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: [],
        worldCreator: "ЕЕнот",
        map: {
            name: "Europe+ by BluePum",
            id: "bluepum_enaatme_v2"
        },
        awards: ["enot"],
        // Hidden parameters
        publishDate: "2025-04-29",
        lastUpdate: "2025-04-29",
        hiddenScore: 0,
        type: "sandbox",
        period: "cw"
    },
    {
        id: [
            "zachary",
            "deadhand",
            "v1",
            "2022",
        ],
        title: "Dead Hand | Aftermath of WW3",
        author: {
            name: "@zachary.bachary",
            link: "https://discord.com/users/804839006403428423",
            color: "#3B83BD"
        },
        year: "2022",
        languages: ["EN"],
        gameMode: "Historical",
        tags: [],
        worldCreator: "ЕЕнот",
        map: {
            name: "Dead Hand by BluePum",
            id: "zachary_deadhand_v1"
        },
        awards: ["enot"],
        // Hidden parameters
        publishDate: "2025-05-07",
        lastUpdate: "2025-05-07",
        hiddenScore: 0,
        type: "historical",
        period: "alternative"
    },
    {
        id: [
            "bluepum",
            "enaatme",
            "v4",
            "ww2",
        ],
        title: "World War 2",
        author: {
            name: "@blue_pum_67269",
            link: "https://discord.com/users/1260558860796825610",
            color: "#3B83BD"
        },
        year: "1936",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: [],
        worldCreator: "ЕЕнот",
        map: {
            name: "Europe+ by BluePum",
            id: "bluepum_enaatme_v2"
        },
        awards: ["enot"],
        // Hidden parameters
        publishDate: "2025-05-07",
        lastUpdate: "2025-05-07",
        hiddenScore: 0,
        type: "sandbox",
        period: "ww2"
    },
    {
        id: [
            "stewardconstruct",
            "europe",
            "v1",
            "ww1",
        ],
        title: "World War 1",
        author: {
            name: "@stewardconstruct.",
            link: "https://discord.com/users/1114590604668706927",
            color: "#3B83BD"
        },
        year: "1914",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: [],
        worldCreator: "ЕЕнот",
        map: {
            name: "Europe by Public nuisance 🇷🇸☦",
            id: "stewardconstruct_europe_v1"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2025-05-07",
        lastUpdate: "2025-05-07",
        hiddenScore: 0,
        type: "sandbox",
        period: "ww1"
    },
    {
        id: [
            "stewardconstruct",
            "europe",
            "v1",
            "ww2",
        ],
        title: "World War 2",
        author: {
            name: "@stewardconstruct.",
            link: "https://discord.com/users/1114590604668706927",
            color: "#3B83BD"
        },
        year: "1936",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: [],
        worldCreator: "ЕЕнот",
        map: {
            name: "Europe by Public nuisance 🇷🇸☦",
            id: "stewardconstruct_europe_v1"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2025-05-07",
        lastUpdate: "2025-05-07",
        hiddenScore: 0,
        type: "sandbox",
        period: "ww2"
    },
    {
        id: [
            "stewardconstruct",
            "serbia",
            "v1",
            "regions",
        ],
        title: "Regions of Serbia",
        author: {
            name: "@stewardconstruct.",
            link: "https://discord.com/users/1114590604668706927",
            color: "#3B83BD"
        },
        year: "2025",
        languages: ["other"],
        gameMode: "Sandbox",
        tags: [],
        worldCreator: "ЕЕнот",
        map: {
            name: "",
            id: "stewardconstruct_serbia_v1"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2025-03-15",
        lastUpdate: "2025-03-15",
        hiddenScore: 0,
        type: "sandbox",
        period: "modern"
    },
    {
        id: [
            "stewardconstruct",
            "yugoslavia",
            "v1",
            "modern",
        ],
        title: "West Balkans / Yugoslavia",
        author: {
            name: "@stewardconstruct.",
            link: "https://discord.com/users/1114590604668706927",
            color: "#3B83BD"
        },
        year: "2025",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: [],
        worldCreator: "ЕЕнот",
        map: {
            name: "",
            id: "stewardconstruct_yugoslavia_v1"
        },
        awards: [],
        // Hidden parameters
        publishDate: "2025-03-19",
        lastUpdate: "2025-03-19",
        hiddenScore: -250,
        type: "sandbox",
        period: "modern",
        status: "discontinued"
    },
    {
        id: [
            "pelo",
            "greece",
            "v1",
            "corinthian-war",
        ],
        title: "Коринфская война",
        author: {
            name: "@pelo3918",
            link: "https://discord.com/users/1071700840492056717",
            color: "#3B83BD"
        },
        year: "-395",
        languages: ["RU"],
        gameMode: "Sandbox",
        tags: ["Europe", "Historical", "Ancient"],
        worldCreator: "ЕЕнот",
        awards: [],
        // Hidden parameters
        publishDate: "2024-06-09",
        lastUpdate: "2024-06-09",
        hiddenScore: 0,
        type: "sandbox",
        period: "ancient"
    },
    {
        id: [
            "pelo",
            "greece",
            "v1",
            "grcirn-war",
        ],
        title: "Греко-Персидская война",
        author: {
            name: "@pelo3918",
            link: "https://discord.com/users/1071700840492056717",
            color: "#3B83BD"
        },
        year: "-480",
        languages: ["RU"],
        gameMode: "Sandbox",
        tags: ["Europe", "Historical", "Ancient"],
        worldCreator: "ЕЕнот",
        awards: [],
        // Hidden parameters
        publishDate: "2024-06-07",
        lastUpdate: "2024-06-07",
        hiddenScore: 0,
        type: "sandbox",
        period: "ancient"
    },
    {
        id: [
            "pelo",
            "greece",
            "v1",
            "macedonia",
        ],
        title: "Начало возвышения Македонии",
        author: {
            name: "@pelo3918",
            link: "https://discord.com/users/1071700840492056717",
            color: "#3B83BD"
        },
        year: "-355",
        languages: ["RU"],
        gameMode: "Sandbox",
        tags: ["Europe", "Historical", "Ancient"],
        worldCreator: "ЕЕнот",
        awards: [],
        // Hidden parameters
        publishDate: "2024-06-29",
        lastUpdate: "2024-06-29",
        hiddenScore: 0,
        type: "sandbox",
        period: "ancient"
    },
    {
        id: [
            "pelo",
            "greece",
            "v1",
            "persiainvasion-war",
        ],
        title: "Греко-Персидская воина",
        author: {
            name: "@pelo3918",
            link: "https://discord.com/users/1071700840492056717",
            color: "#3B83BD"
        },
        year: "-480",
        languages: ["RU"],
        gameMode: "Sandbox",
        tags: ["Europe", "Historical", "Ancient"],
        worldCreator: "ЕЕнот",
        awards: [],
        // Hidden parameters
        publishDate: "2024-06-07",
        lastUpdate: "2024-06-07",
        hiddenScore: 0,
        type: "sandbox",
        period: "ancient"
    },
    {
        id: [
            "pelo",
            "greece",
            "v1",
            "peloponessian-war",
        ],
        title: "Пелопонесская война",
        author: {
            name: "@pelo3918",
            link: "https://discord.com/users/1071700840492056717",
            color: "#3B83BD"
        },
        year: "-431",
        languages: ["RU"],
        gameMode: "Sandbox",
        tags: ["Europe", "Historical", "Ancient"],
        worldCreator: "ЕЕнот",
        awards: [],
        // Hidden parameters
        publishDate: "2024-06-08",
        lastUpdate: "2024-06-08",
        hiddenScore: 0,
        type: "sandbox",
        period: "ancient"
    },
    {
        id: [
            "pelo",
            "greece",
            "v1",
            "persiainvasion-war-en",
        ],
        title: "Sacred war of Hellada",
        author: {
            name: "@pelo3918",
            link: "https://discord.com/users/1071700840492056717",
            color: "#3B83BD"
        },
        year: "-480",
        languages: ["EN"],
        gameMode: "Sandbox",
        tags: ["Europe", "Historical", "Ancient"],
        worldCreator: "ЕЕнот",
        awards: [],
        // Hidden parameters
        publishDate: "2025-05-11",
        lastUpdate: "2025-05-11",
        hiddenScore: 0,
        type: "sandbox",
        period: "ancient"
    },
];

console.log("Данные сценариев загружены");