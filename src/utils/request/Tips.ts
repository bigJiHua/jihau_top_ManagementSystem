import { ElNotification, NotificationParams } from 'element-plus'
import { Module } from 'module'

const showNotification = (title: string, message: string, type: string) => {
  const notificationParams: NotificationParams = {
    title,
    message,
    type
  }

  ElNotification(notificationParams)
}

export default showNotification