import casual from 'casual';

let postsIds: string[] = [];
let usersIds: string[] = [];

const User = () => ({
  id: () => {
    let uuid = casual.uuid;
    usersIds.push(uuid);
    return uuid;
  },
  fullName: casual.full_name,
  bio: casual.text,
  email: casual.email,
  username: casual.username,
  password: casual.password,
  image: 'https://picsum.photos/seed/picsum/200/300',
  coverImage: 'https://picsum.photos/seed/picsum/200/300',
  postsCount: () => casual.integer(0),
});

const Post = () => ({
  id: () => {
    let uuid = casual.uuid;
    postsIds.push(uuid);
    return uuid;
  },
  author: casual.random_element(usersIds),
  text: casual.text,
  image: 'https://picsum.photos/seed/picsum/200/300',
  commentsCount: () => casual.integer(0),
  likesCount: () => casual.integer(0),
  latestLike: casual.first_name,
  createdAt: () => casual.date(),
});

const Comment = () => ({
  id: casual.uuid,
  author: casual.random_element(usersIds),
  comment: casual.text,
  post: casual.random_element(postsIds),
  createdAt: () => casual.date(),
});

const Like = () => ({
  id: casual.uuid,
  user: casual.random_element(usersIds),
  post: casual.random_element(postsIds),
});

const Query = () => ({
  getPostsByUserId: () => [...new Array(casual.integer(10, 100))],
  getFeed: () => [...new Array(casual.integer(10, 100))],
  getNotificationsByUserId: () => [...new Array(casual.integer(10, 100))],
  getCommentsByPostId: () => [...new Array(casual.integer(10, 100))],
  getLikesByPostId: () => [...new Array(casual.integer(10, 100))],
  searchUsers: () => [...new Array(casual.integer(10, 100))],
});

export const mockData = {
  User,
  Post,
  Comment,
  Like,
  Query,
};
