import { useDispatch } from "react-redux";
import { NotificationActions, NotificationState } from "./redux/features/notificationsSlice";

export const useNotification = () => {
    const dispatch = useDispatch();

    const displayNotification = (notification: NotificationState) => {
        dispatch(NotificationActions.addNotification(notification));
    };

    const clearNotification = () => {
        dispatch(NotificationActions.clearNotification());
    };

    return { displayNotification, clearNotification } as const;
};