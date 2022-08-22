"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../entity/User");
const Notification_1 = require("../../entity/Notification");
const Like_1 = require("../../entity/Like");
const Comment_1 = require("../../entity/Comment");
const Post_1 = require("../../entity/Post");
class CreateUsers {
    run(factory) {
        return __awaiter(this, void 0, void 0, function* () {
            yield factory(User_1.User)()
                .map((user) => __awaiter(this, void 0, void 0, function* () {
                const comments = yield factory(Comment_1.Comment)()
                    .map((comment) => __awaiter(this, void 0, void 0, function* () {
                    comment.author = yield factory(User_1.User)().create();
                    return comment;
                }))
                    .createMany(Math.floor(Math.random() * 10) + 1);
                const likes = yield factory(Like_1.Like)()
                    .map((like) => __awaiter(this, void 0, void 0, function* () {
                    like.user = yield factory(User_1.User)().create();
                    return like;
                }))
                    .createMany(Math.floor(Math.random() * 10) + 1);
                const userPosts = yield factory(Post_1.Post)()
                    .map((post) => __awaiter(this, void 0, void 0, function* () {
                    post.comments = comments;
                    post.likes = likes;
                    post.latestComment = yield factory(Comment_1.Comment)()
                        .map((comment) => __awaiter(this, void 0, void 0, function* () {
                        comment.author = yield factory(User_1.User)().create();
                        return comment;
                    }))
                        .create();
                    return post;
                }))
                    .createMany(Math.floor(Math.random() * 10) + 1);
                const postIds = userPosts.map((post) => post.id);
                const notifications = yield factory(Notification_1.Notification)()
                    .map((notification) => __awaiter(this, void 0, void 0, function* () {
                    const postId = postIds.pop();
                    notification.postId = postId;
                    return notification;
                }))
                    .createMany(postIds.length);
                user.posts = userPosts;
                user.notifications = notifications;
                return user;
            }))
                .createMany(15);
        });
    }
}
exports.default = CreateUsers;
