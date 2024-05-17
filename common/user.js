class User {
    constructor(id, name, isFollow, followCount = null, followerCount = null, avatar = null, backgroundImage = null, signature = null, totalFavorited = null, workCount = null, favoriteCount = null) {
        this.id = id;
        this.name = name;
        this.isFollow = isFollow;
        this.followCount = followCount;
        this.followerCount = followerCount;
        this.avatar = avatar;
        this.backgroundImage = backgroundImage;
        this.signature = signature;
        this.totalFavorited = totalFavorited;
        this.workCount = workCount;
        this.favoriteCount = favoriteCount;
    }

    displayInfo() {
        console.log(`User ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Follow Count: ${this.followCount}`);
        console.log(`Follower Count: ${this.followerCount}`);
        console.log(`Is Follow: ${this.isFollow}`);
        console.log(`Avatar: ${this.avatar}`);
        console.log(`Background Image: ${this.backgroundImage}`);
        console.log(`Signature: ${this.signature}`);
        console.log(`Total Favorited: ${this.totalFavorited}`);
        console.log(`Work Count: ${this.workCount}`);
        console.log(`Favorite Count: ${this.favoriteCount}`);
    }
}

module.exports = {
    User: User
}

// Example usage:
// const test_user = new User(
//     12345,
//     'John Doe',
//     true,
//     100,
//     200,
//     'avatar_url',
//     'background_image_url',
//     'This is my signature.',
//     500,
//     10,
//     50
// )

// Display user information
// test_user.displayInfo()
