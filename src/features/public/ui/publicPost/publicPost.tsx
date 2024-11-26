import {useState} from "react"

import {GetPostResponse} from "@/features"
import {ROUTES} from "@/shared/config"
import {ProfileAvatar} from "@/shared/ui"
import {useTimeAgo} from "@/shared/utils"
import {Scroll, Typography} from "@photo-fiesta/ui-lib";
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
        description: `${styles.description} ${isExpanded ? styles.expanded : styles.collapsed}`,
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

    const isDescriptionLong = post.description && post.description.length > 80
    const truncatedText = post.description ? post.description.slice(0, 80) : ""

    const textHeight = isExpanded ? 200 : 72
    const imageBaseHeight = 240
    const imageHeight = imageBaseHeight - (textHeight - 72);

    //TODO: add Carousel to publicPost
    return (
        <div className={classNames.postContainer} key={post.id}>
            <div className={classNames.photo}>
                <Image
                    alt={'post image'}
                    height={imageHeight}
                    onClick={handlePostClick}
                    src={post.images[0]?.url}
                    style={{transition: 'height 0.5s ease'}}
                    width={234}
                />
            </div>
            <div className={classNames.postInfo}>
                <Link className={classNames.user} href={`${ROUTES.PROFILE}/${post.ownerId}`}>
                    <ProfileAvatar avatarOwner={post.avatarOwner}/>
                    <Typography variant={'h3'}>{post.userName}</Typography>
                </Link>
                <Typography className={styles.time} variant={"textSmall"}>{timeAgo}</Typography>
                <div className={styles.description}
                     style={{ maxHeight: `${textHeight}px`}}>
                    {isExpanded ? (
                        <Scroll>
                            {post.description}
                        </Scroll>
                    ):(
                        <div>{truncatedText}</div>
                    )}
                </div>
                    {isDescriptionLong && (
                        <span className={classNames.trigger}
                                onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? 'Hide' : 'Show More'}
                        </span>
                    )}
            </div>
        </div>
    )
}
