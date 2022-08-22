"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("typeorm-seeding");
const Comment_1 = require("../../entity/Comment");
(0, typeorm_seeding_1.define)(Comment_1.Comment, (faker) => {
    const comment = new Comment_1.Comment();
    comment.comment = faker.lorem.text();
    comment.createdAt = faker.date.past();
    return comment;
});
