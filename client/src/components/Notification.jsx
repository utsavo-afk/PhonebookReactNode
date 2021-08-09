import React from 'react';

const Notification = (props) => {
    const { notification } = props

    if (notification.message === "") {
        return null
    }

    if (notification.message && notification.type === 'success') {
        return (
            <div className="success">
                {notification.message}
            </div>
        )
    }

    if (notification.message && notification.type === 'error') {
        return (
            <div className="error">
                {notification.message}
            </div>
        )
    }
}

export default Notification;
