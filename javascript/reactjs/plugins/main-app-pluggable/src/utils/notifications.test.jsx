/* eslint-disable global-require */

describe('Notifications.showNotification', () => {
    let Notifications;

    beforeEach(() => {
        jest.resetModules();
        Notifications = require('utils/notifications.tsx');
    });

    it('should throw an exception if Notification is not defined on window', async () => {
        await expect(Notifications.showNotification()).rejects.toThrow('Notification not supported');
    });

    it('should throw an exception if Notification.requestPermission is not defined', async () => {
        window.Notification = {};
        await expect(Notifications.showNotification()).rejects.toThrow('Notification.requestPermission not supported');
    });

    it('should throw an exception if Notification.requestPermission is not a function', async () => {
        window.Notification = {
            requestPermission: true,
        };
        await expect(Notifications.showNotification()).rejects.toThrow('Notification.requestPermission not supported');
    });

    it('should request permissions, promise style, if not previously requested, do nothing', async () => {
        window.Notification = {
            requestPermission: () => Promise.resolve('denied'),
            permission: 'denied',
        };
        await expect(Notifications.showNotification()).resolves.toBeTruthy();
    });

    it('should request permissions, callback style, if not previously requested, do nothing', async () => {
        window.Notification = {
            requestPermission: (callback) => {
                if (callback) {
                    callback('denied');
                }
            },
            permission: 'denied',
        };
        await expect(Notifications.showNotification()).resolves.toBeTruthy();
    });

    it('should request permissions, promise style, if not previously requested, handling success', async () => {
        window.Notification = jest.fn();
        window.Notification.requestPermission = () => Promise.resolve('granted');
        window.Notification.permission = 'denied';

        const n = {};
        window.Notification.mockReturnValueOnce(n);

        await expect(Notifications.showNotification({
            body: 'body',
            requireInteraction: true,
            silent: false,
        })).resolves.toBeTruthy();
        await expect(window.Notification.mock.calls.length).toBe(1);
        const call = window.Notification.mock.calls[0];
        expect(call[1]).toEqual({
            body: 'body',
            tag: 'body',
            icon: {},
            requireInteraction: true,
            silent: false,
        });
    });

    it('should request permissions, callback style, if not previously requested, handling success', async () => {
        window.Notification = jest.fn();
        window.Notification.requestPermission = (callback) => {
            if (callback) {
                callback('granted');
            }
        };
        window.Notification.permission = 'denied';

        const n = {};
        window.Notification.mockReturnValueOnce(n);

        await expect(Notifications.showNotification({
            body: 'body',
            requireInteraction: true,
            silent: false,
        })).resolves.toBeTruthy();
        await expect(window.Notification.mock.calls.length).toBe(1);
        const call = window.Notification.mock.calls[0];
        expect(call[1]).toEqual({
            body: 'body',
            tag: 'body',
            icon: {},
            requireInteraction: true,
            silent: false,
        });
    });

    it('should do nothing if permissions previously requested but not granted', async () => {
        window.Notification = {
            requestPermission: () => Promise.resolve('denied'),
            permission: 'denied',
        };

        // Call one to deny and mark as already requested, do nothing, throw nothing
        await expect(Notifications.showNotification()).resolves.toBeTruthy();

        // Try again
        await expect(Notifications.showNotification()).resolves.toBeTruthy();
    });
});
