import React, { useEffect } from 'react';
import './Styles.css';

interface NotificationPopupProps {
  notifications: string[];
  removeNotification: (index: number) => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({ notifications, removeNotification }) => {
  useEffect(() => {
    const timers = notifications.map((_, index) => {
      return setTimeout(() => {
        removeNotification(index);
      }, 5000);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [notifications, removeNotification]);

  return (
    <div className="notification-popup">
      {notifications.map((notification, index) => (
        <div key={index} className="notification">
          {notification}
        </div>
      ))}
    </div>
  );
};

export default NotificationPopup;
