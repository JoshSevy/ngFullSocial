import casual from 'casual';

const User = () => ({
  id: casual.uuid,
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
  id: casual.uuid,
  text: casual.text,
  image: 'https://picsum.photos/seed/picsum/200/300',
  commentsCount: () => casual.integer(0),
  likesCount: () => casual.integer(0),
  latestLike: casual.first_name,
  createdAt: () => casual.date(),
});

const Comment = () => ({
  id: casual.uuid,
  comment: casual.text,
  post: casual.uuid,
  createdAt: () => casual.date(),
});

const Like = () => ({
  id: casual.uuid,
  post: casual.uuid,
});

const Query = () => ({
  getPostsByUserId: () => [...new Array(casual.integer(10, 100))],
  getFeed: () => [...new Array(casual.integer(10, 100))],
  getNotificationsByUserId: () => [...new Array(10, 100)],
  getCommentsByPostId: () => [...new Array(10, 100)],
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
