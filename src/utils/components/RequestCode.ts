import { ElNotification } from 'element-plus'

export const showNotification = (options: {
  title?: string,
  message: string,
  type?: 'success' | 'warning' | 'error' | 'info'
}) => {
  ElNotification(options)
}
