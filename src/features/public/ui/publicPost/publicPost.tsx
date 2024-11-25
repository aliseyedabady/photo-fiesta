import {useState} from "react";

import {GetPostResponse} from "@/features"
import {ROUTES} from "@/shared/config"
import {ProfileAvatar} from "@/shared/ui"
import {useTimeAgo} from "@/shared/utils"
import Image from "next/image"
import Link from "next/link"
import {useRouter} from "next/router"

import styles from "./publicPost.module.scss"

/**
 * PublicPost component for rendering a single public post with user details.
 */
export const PublicPost = ({post}: { post: GetPostResponse }) => {
    const router = useRouter()
    const timeAgo = useTimeAgo(post.createdAt)

    const [isExpanded, setIsExpanded] = useState(false)

    const classNames = {
        description: `${styles.description} ${isExpanded ? styles.expanded : styles.collapsed}`, // Добавьте стили для обрезанного текста
        photo: styles.photo,
        postContainer: styles.postContainer,
        postInfo: styles.postInfo,
        trigger: styles.trigger,
        user: styles.user,
    } as const

    /** Handles redirection to the user's profile page when a post image is clicked. */
    const handlePostClick = () => {
        router.push(
            {
                pathname: `${ROUTES.PROFILE}/${post.ownerId}`,
                query: {postId: post.id.toString()},
            },
            undefined,
            {shallow: true}
        )
    }

    //TODO: 'showMore' function
    //TODO: styles for publicPosts
    //TODO: add Carousel to publicPost

    const truncatedText = post.description.slice(0, 80); // Обрезаем текст до 100 символов

    return (
        <div className={classNames.postContainer} key={post.id}>
            <div className={classNames.photo}>
                <Image
                    alt={"post image"}
                    height={240}
                    onClick={handlePostClick}
                    src={post.images[0]?.url}
                    width={234}
                />
            </div>
            <div className={classNames.postInfo}>
                <Link className={classNames.user} href={`${ROUTES.PROFILE}/${post.ownerId}`}>
                    <ProfileAvatar avatarOwner={post.avatarOwner}/>
                    <div>{post.userName}</div>
                </Link>
                <div>{timeAgo}</div>
                <div className={classNames.description}>
                    {isExpanded ? post.description : truncatedText}
                    {post.description.length > 80 && (
                        <button className={classNames.trigger}
                                onClick={() => setIsExpanded(!isExpanded)}
                                type={'button'}
                        >
                            {isExpanded ? "Hide" : "Show More"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
