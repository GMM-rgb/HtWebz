// notification-client.d.ts
declare global {
    interface Window {
        DeployNewNotification: (RequestedNotificationMessage: string, RemoveAfter?: number) => void;
    }
}

export {}; // Makes this a module