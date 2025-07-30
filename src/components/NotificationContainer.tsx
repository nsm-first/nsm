import React from 'react';
import { useNotification } from '../context/NotificationContext';
import Notification from './Notification';

const NotificationContainer: React.FC = () => {
  const { notifications, hideNotification } = useNotification();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={() => hideNotification(notification.id)}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;