"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("typeorm-seeding");
const User_1 = require("../../entity/User");
(0, typeorm_seeding_1.define)(User_1.User, (faker) => {
    const user = new User_1.User();
    user.fullName = faker.name.fullName();
    user.bio = faker.lorem.sentences();
    user.email = faker.internet.email();
    user.username = faker.internet.userName();
    user.password = faker.internet.password();
    user.image = faker.image.imageUrl();
    user.coverImage = faker.image.imageUrl();
    user.postsCount = 200;
    user.createdAt = faker.date.past();
    return user;
});
