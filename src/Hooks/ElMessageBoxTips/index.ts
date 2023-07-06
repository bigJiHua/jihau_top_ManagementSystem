import { ElMessageBox, ElMessage } from 'element-plus'

// 二次封装 回调 Element 提示框 结果只返回 true / false
function WarningTips(Tips: string): Promise<string> {
  return new Promise((resolve) => {
    ElMessageBox.confirm(
      '你确定要' + Tips + '吗？',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
      .then(() => {
        resolve('true');
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消' + Tips,
        });
        resolve('false');
      });
  });
}

export default {
  WarningTips
}