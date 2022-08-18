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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = __importDefault(require("./graphql/schema"));
const casual_1 = __importDefault(require("casual"));
const mocks = {
    User: () => ({
        id: casual_1.default.uuid,
        fullName: casual_1.default.full_name,
        bio: casual_1.default.text,
        email: casual_1.default.email,
        username: casual_1.default.username,
        password: casual_1.default.password,
        image: 'https://picsum.photos/seed/picsum/200/300',
        coverImage: 'https://picsum.photos/seed/picsum/200/300',
        postsCount: () => casual_1.default.integer(0),
    }),
    Post: () => ({
        id: casual_1.default.uuid,
        text: casual_1.default.text,
        image: 'https://picsum.photos/seed/picsum/200/300',
        commentsCount: () => casual_1.default.integer(0),
        likesCount: () => casual_1.default.integer(0),
        latestLike: casual_1.default.first_name,
        createdAt: () => casual_1.default.date(),
    }),
    Comment: () => ({
        id: casual_1.default.uuid,
        comment: casual_1.default.text,
        post: casual_1.default.uuid,
        createAt: () => casual_1.default.date(),
    }),
    Like: () => ({
        id: casual_1.default.uuid,
        user: casual_1.default.uuid,
    }),
    Query: () => ({
        getPostsByUserId: () => [...new Array(casual_1.default.integer(10, 100))],
        getFeed: () => [...new Array(casual_1.default.integer(10, 100))],
        getNotificationsByUserId: () => [...new Array(casual_1.default.integer(10, 100))],
        getCommentsByPostId: () => [...new Array(casual_1.default.integer(10, 100))],
        getLikesByPostId: () => [...new Array(casual_1.default.integer(10, 100))],
        searchUsers: () => [...new Array(casual_1.default.integer(10, 100))],
    }),
};
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const PORT = 8080;
        const app = (0, express_1.default)();
        const server = new apollo_server_express_1.ApolloServer({ schema: schema_1.default, mocks, mockEntireSchema: false });
        yield server.start();
        server.applyMiddleware({
            app,
            path: '/graphql',
        });
        app.listen(PORT, () => {
            console.log(`Server is running at
                          http:localhost:${PORT}`);
        });
    });
}
startApolloServer();
