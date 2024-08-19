export interface CronJobInterface {
    handleUnseenNotifications(): Promise<void>;
}
