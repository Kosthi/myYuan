const {User} = require("./user")

class Video {
    constructor(id, author, playUrl, coverUrl, favoriteCount, commentCount, isFavorite, title) {
        this.id = id;
        this.author = author;
        this.playUrl = playUrl;
        this.coverUrl = coverUrl;
        this.favoriteCount = favoriteCount;
        this.commentCount = commentCount;
        this.isFavorite = isFavorite;
        this.title = title;
    }

    displayInfo() {
        console.log(`Video ID: ${this.id}`);
        this.author.displayInfo()
        console.log(`Play URL: ${this.playUrl}`);
        console.log(`Cover URL: ${this.coverUrl}`);
        console.log(`Favorite Count: ${this.favoriteCount}`);
        console.log(`Comment Count: ${this.commentCount}`);
        console.log(`Is Favorite: ${this.isFavorite}`);
        console.log(`Title: ${this.title}`);
    }
}

// 创建一个 User 实例
const author = new User(
    12345,
    'John Doe',
    true,
    100,
    200,
    'avatar_url',
    'background_image_url',
    'This is my signature.',
    500,
    10,
    50
)

// 创建一个 Video 实例
const video = new Video(1, author, 'http://example.com/play', 'http://example.com/cover', 100, 20, true, 'Sample Video');

// 测试 displayInfo 方法
video.displayInfo();
