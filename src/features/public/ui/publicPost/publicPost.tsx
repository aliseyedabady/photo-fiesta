import {GetPostResponse} from "@/features";
import { ROUTES } from "@/shared/config";
import { ProfileAvatar } from "@/shared/ui";
import { useTimeAgo } from "@/shared/utils";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";

import styles from "./publicPost.module.scss";

export const PublicPost = ({ post }: { post: GetPostResponse }) => {
    const router = useRouter()
    const timeAgo = useTimeAgo(post.createdAt);
    const classNames = {
        user: styles.user,
    } as const
    const handlePostClick = () => {
        router.push(
            {
                pathname: `${ROUTES.PROFILE}/${post.ownerId}`,
                query: { postId: post.id.toString() },
            },
            undefined,
            { shallow: true }
        );
    };

    return (
        <div key={post.id}>
            <Image
                alt={"post image"}
                height={240}
                onClick={handlePostClick}
                src={post.images[0]?.url}
                width={234}
            />
            <Link className={classNames.user} href={`${ROUTES.PROFILE}/${post.ownerId}`}>
                <ProfileAvatar avatarOwner={post.avatarOwner} />
                <div>{post.userName}</div>
            </Link>
            <div>{timeAgo}</div>
            <div>{post.description}</div>
        </div>
    );
};
