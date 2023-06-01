"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockData = void 0;
const casual_1 = __importDefault(require("casual"));
let postsIds = [];
let usersIds = [];
const User = () => ({
    id: () => {
        let uuid = casual_1.default.uuid;
        usersIds.push(uuid);
        return uuid;
    },
    fullName: casual_1.default.full_name,
    bio: casual_1.default.text,
    email: casual_1.default.email,
    username: casual_1.default.username,
    password: casual_1.default.password,
    image: 'https://picsum.photos/seed/picsum/200/300',
    coverImage: 'https://picsum.photos/seed/picsum/200/300',
    postsCount: () => casual_1.default.integer(0),
});
const Post = () => ({
    id: () => {
        let uuid = casual_1.default.uuid;
        postsIds.push(uuid);
        return uuid;
    },
    author: casual_1.default.random_element(usersIds),
    text: casual_1.default.text,
    image: 'https://picsum.photos/seed/picsum/200/300',
    commentsCount: () => casual_1.default.integer(0),
    likesCount: () => casual_1.default.integer(0),
    latestLike: casual_1.default.first_name,
    createdAt: () => casual_1.default.date(),
});
const Comment = () => ({
    id: casual_1.default.uuid,
    author: casual_1.default.random_element(usersIds),
    comment: casual_1.default.text,
    post: casual_1.default.uuid,
    createdAt: () => casual_1.default.date(),
});
const Like = () => ({
    id: casual_1.default.uuid,
    user: casual_1.default.random_element(usersIds),
    post: casual_1.default.uuid,
});
const Query = () => ({
    getPostsByUserId: () => [...new Array(casual_1.default.integer(10, 100))],
    getFeed: () => [...new Array(casual_1.default.integer(10, 100))],
    getNotificationsByUserId: () => [...new Array(10, 100)],
    getCommentsByPostId: () => [...new Array(10, 100)],
    getLikesByPostId: () => [...new Array(casual_1.default.integer(10, 100))],
    searchUsers: () => [...new Array(casual_1.default.integer(10, 100))],
});
exports.mockData = {
    User,
    Post,
    Comment,
    Like,
    Query,
};
