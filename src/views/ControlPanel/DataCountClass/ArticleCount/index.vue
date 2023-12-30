<template>
  <div id="" class="ShowEcahrtAreaBox">
    <div class="ShowECahrtAreea">
      <ShowPostArticle></ShowPostArticle>
      <ShowReading></ShowReading>
      <ShowPostArticle></ShowPostArticle>
      <ShowReading></ShowReading>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ShowPostArticle from './ShowPostArticle.vue';
import ShowReading from './ShowReading.vue';

</script>

<style lang="less" scoped>
.ShowEcahrtAreaBox {
  width: 100%;
  height: 100%;
  margin: 5px;
  overflow: hidden;
}

.ShowECahrtAreea {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: scroll;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.ShowECahrtAreea::-webkit-scrollbar {
  display: none;
}
</style>
