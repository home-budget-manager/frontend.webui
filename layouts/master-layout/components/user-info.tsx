import styles from "./user-info.module.scss";

import { CircleUserRound } from "lucide-react";

export default function UserInfo() {
    return (
        <div className={styles.userInfo}>
            <CircleUserRound className={styles.avatar} />
            <span>User Name</span>
        </div>
    );
}