"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("typeorm-seeding");
const Like_1 = require("../../entity/Like");
(0, typeorm_seeding_1.define)(Like_1.Like, (faker) => {
    const like = new Like_1.Like();
    like.createdAt = faker.date.past();
    return like;
});
