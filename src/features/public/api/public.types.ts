export type GetPublicPostsResponse = {
    items: GetPostResponse[]
    pageSize: number
    totalCount: number
    totalUsers: number
}
export type GetPostResponse = {
    avatarOwner: string
    avatarWhoLikes: boolean
    createdAt: string
    description: string
    id: number
    images: ImageType[]
    isLiked: boolean
    likesCount: number
    location: string
    owner: { firstName: string; lastName: string }
    ownerId: number
    updatedAt: string
    userName: string
}

type ImageType = {
    createdAt: string
    fileSize: number
    height: number
    uploadId: string
    url: string
    width: number
}

export type GetPublicProfileResponse = {
    aboutMe: string
    avatars: Avatar[],
    id: number
    userMetadata: Metadata
    userName: string
}
type Metadata={
    followers: number
    following: number
    publications: number
}
export type GetUserPublicPostsArgs = {userId: number } & GetPublicPostsArgs

export type GetPublicPostsArgs ={
    endCursorPostId?: number
    pageSize?: number
    sortBy?: string
    sortDirection?: 'asc' | 'desc'
}
export type GetPublicPostCommentArgs={
    pageNumber?: number
    pageSize?: number
    postId: number
    sortBy?: string
    sortDirection?: 'asc' | 'desc'
}
export type GetPublicPostCommentsResponse = {
    items: PostComment[]
    pageSize: number
    totalCount: number
}
type PostComment = {
    answerCount: number
    content: string
    createdAt: string
    from: User
    id: number
    isLiked: boolean
    likeCount: number
    postId: number
}
type User = {
    avatars: Avatar[]
    id: number
    username: string
}
type Avatar = {
    createdAt: string
    fileSize: number
    height: number
    url: string
    width: number
}