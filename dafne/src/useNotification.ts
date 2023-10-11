import { useDispatch } from "react-redux";
import { NotificationActions, Notification } from "./redux/features/notificationsSlice";

export const useNotification = () => {
    const dispatch = useDispatch();

    const displayNotification = (notification: Notification) => {
        dispatch(NotificationActions.addNotification(notification));
    };

    const removeNotification = (notificationId: string) => {
        dispatch(NotificationActions.removeNotification(notificationId));
    };

    return { displayNotification, removeNotification } as const;
};