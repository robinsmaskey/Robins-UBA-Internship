// src/auth/permissions.ts
export enum Permission {
    USER_READ = 'user_read',
    USER_CREATE = 'user_create',
    USER_UPDATE = 'user_update',
    USER_DELETE = 'user_delete',

    // Post permissions
    POST_READ = 'post_read',
    POST_CREATE = 'post_create',
    POST_UPDATE = 'post_update',
    POST_DELETE = 'post_delete',
    
    // Comment permissions
    COMMENT_READ = 'comment_read',
    COMMENT_CREATE = 'comment_create',
    
  }