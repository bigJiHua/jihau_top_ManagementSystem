<template>
  <div class="ArticleDetailPanelBox">
    <h1>文章预览面板</h1>
  </div>
</template>

<style lang="less" scoped>
.ArticleDetailPanelBox {
  display: flex;
  align-items: center;
  /* 垂直居中 */
  justify-content: center;
  /* 水平居中 */
  width: 70vw;
  height: 70vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 平移 */
  background-color: red;
  z-index: 999;
}
</style>
