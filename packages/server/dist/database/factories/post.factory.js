"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("typeorm-seeding");
const Post_1 = require("../../entity/Post");
(0, typeorm_seeding_1.define)(Post_1.Post, (faker) => {
    const post = new Post_1.Post();
    post.text = faker.lorem.text();
    post.image = faker.image.imageUrl();
    post.commentsCount = 100;
    post.likesCount = 200;
    post.latestLike = faker.name.fullName();
    post.createdAt = faker.date.past();
    return post;
});
