import { Context } from '..';
import { Resolvers, User, Post, Comment, Like, Notification } from '@ngsocial/graphql';
import { ApolloError } from 'apollo-server-errors';
import { DeleteResult } from 'typeorm';

const resolvers: Resolvers = {
  Query: {
    message: () => 'It works!',
    getUser: async (_, args, ctx: Context) => {
      const orm = ctx.orm;
      const user = await orm.userRepository.findOne({ where: { id: args.userId } });
      if (!user) {
        throw new ApolloError('No user found', 'USER_NOT_FOUND');
      }
      return user as unknown as User;
    },
    getPostsByUserId: async (_, args, ctx: Context) => {
      const posts = await ctx.orm.postRepository
        .createQueryBuilder('post')
        .where({ author: { id: args.userId } })
        .leftJoinAndSelect('post.author', 'post_author')
        .leftJoinAndSelect('post.latestComment', 'latestComment')
        .leftJoinAndSelect('latestComment.author', 'latestComment_author')
        .leftJoinAndSelect('likes.user', 'likes_user')
        .orderBy('post.createdAt', 'DESC')
        .skip(args.offset as number)
        .take(args.limit as number)
        .getMany();
      return posts as unknown as Post[];
    },
    getFeed: async (_, args, ctx: Context) => {
      const feed = await ctx.orm.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.author', 'post_author')
        .leftJoinAndSelect('post.latestComment', 'latestComment')
        .leftJoinAndSelect('latestComment.author', 'latestComment_author')
        .leftJoinAndSelect('post.likes', 'likes')
        .leftJoinAndSelect('likes.user', 'likes_user')
        .orderBy('post.createdAt', 'DESC')
        .skip(args.offset as number)
        .take(args.limit as number)
        .getMany();
      return feed as unknown as Post[];
    },
    getNotificationsByUserId: async (_, args, ctx: Context) => {
      const notifications = await ctx.orm.notificationRepository
        .createQueryBuilder('notification')
        .innerJoinAndSelect('notification.user', 'user')
        .where('user.id = :userID', { userID: args.userId })
        .orderBy('notification.createdAt', 'DESC')
        .skip(args.offset as number)
        .take(args.limit as number)
        .getMany();
      return notifications as unknown as Notification[];
    },
    getCommentsByPostId: async (_, args, ctx: Context) => {
      return (await ctx.orm.commentRepository
        .createQueryBuilder('comment')
        .innerJoinAndSelect('comment.author', 'author')
        .innerJoinAndSelect('comment.post', 'post')
        .where('post.id = :postID', { postID: args.postId as string })
        .orderBy('comment.createdAt', 'DESC')
        .skip(args.offset as number)
        .take(args.limit as number)
        .getMany()) as unknown as Comment[];
    },
    getLikesByPostId: async (_, args, ctx: Context) => {
      return (await ctx.orm.likeRepository
        .createQueryBuilder('like')
        .innerJoinAndSelect('like.user', 'user')
        .innerJoinAndSelect('like.post', 'post')
        .where('post.id = :id', { id: args.postId })
        .orderBy('like.createdAt', 'DESC')
        .skip(args.offset as number)
        .take(args.limit as number)
        .getMany()) as unknown as Like[];
    },
    searchUsers: async (_, args, ctx: Context) => {
      const users = await ctx.orm.userRepository
        .createQueryBuilder('user')
        .where(`user.fullName Like'%${args.searchQuery}%'`)
        .orWhere(`user.username Like'%${args.searchQuery}%'`)
        .getMany();
      return users as unknown as User[];
    },
  },
  Mutation: {
    post: async (_, args, ctx: Context) => {
      throw new ApolloError('Not implemented yet', 'NOT_IMPLEMENTED_YET');
    },
    comment: async (_, args, ctx: Context) => {
      throw new ApolloError('Not implemented yet', 'NOT_IMPLEMENTED_YET');
    },
    like: async (_, args, ctx: Context) => {
      throw new ApolloError('Not implemented yet', 'NOT_IMPLEMENTED_YET');
    },
    removeLike: async (_, args, ctx: Context) => {
      throw new ApolloError('Not implemented yet', 'NOT_IMPLEMENTED_YET');
    },
    removePost: async (_, args, { orm }: Context) => {
      const post = await orm.postRepository.findOne(args.id, { relations: ['author'] });
      if (!post) {
        throw new ApolloError('Post not found', 'POST_NOT_FOUND');
      }
      const result: DeleteResult = await orm.postRepository
        .createQueryBuilder()
        .delete()
        .from(PostEntity)
        .where('id = :id', { id: args.id })
        .execute();

      const postsCount = post?.author?.postsCount;
      if (postsCount && postsCount >= 1) {
        await orm.userRepository.update({ id: post?.author.id }, { postsCount: postsCount - 1 });
      }
      if (result.affected && result.affected <= 0) {
        throw new ApolloError('Post not deleted', 'POST_NOT_DELETED');
      }
      return args.id;
    },
    removeComment: async (_, args, ctx: Context) => {
      const comment = await ctx.orm.commentRepository.findOne(args.id, { relations: ['author', 'post'] });
      if (!comment) {
        throw new ApolloError('Comment not found', 'COMMENT_NOT_FOUND');
      }
      const result: DeleteResult = await ctx.orm.commentRepository.delete(args.id);
      if (result.affected && result.affected <= 0) {
        throw new ApolloError('Comment not deleted', 'COMMENT_NOT_DELETED');
      }
      const commentsCount = comment?.post?.commentsCount;
      if (commentsCount && commentsCount >= 1) {
        await ctx.orm.postRepository.update({ id: comment?.post.id }, { commentsCount: commentsCount - 1 });
      }
      return comment as unknown as Comment;
    },
    removeNotification: async (_, args, ctx: Context) => {
      const notificationRepository = ctx.orm.notificationRepository;
      const notification = await notificationRepository.findOne(args.id, { relations: ['user'] });
      if (!notification) {
        throw new ApolloError('Notification not found', 'NOTIFICATION_NOT_FOUND');
      }
      const result: DeleteResult = await notificationRepository.delete(args.id);
      if (result.affected && result.affected <= 0) {
        throw new ApolloError('Notification not deleted', 'NOTIFICATION_NOT_DELETED');
      }
      return args.id;
    },
  },
};

export default resolvers;
