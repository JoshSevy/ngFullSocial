"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("typeorm-seeding");
const Notification_1 = require("../../entity/Notification");
(0, typeorm_seeding_1.define)(Notification_1.Notification, (faker) => {
    const notification = new Notification_1.Notification();
    notification.text = faker.lorem.words();
    notification.postId = 1;
    notification.createdAt = faker.date.past();
    return notification;
});
