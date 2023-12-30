<template>
  <div class="ArticleDetailPanelBox" @click.self="close">
    <div class="ArticleDetailPanelArea">
      <div class="BoxHeader">
        <h1>文章预览面板</h1>
        <el-button type="danger" circle @click.stop="close">
          <el-icon class="closeBtn">
            <CloseBold />
          </el-icon>
        </el-button>
      </div>
      <div class="ArticleShowArea">
        <!-- 左侧内容阅览区 -->
        <div class="ArticleShowAreaBox">
          <!-- 内容渲染区 -->
          <div class="content">
            <p v-html="ArticleData.content" v-highlight style="word-wrap: break-word;"></p>
          </div>
        </div>
        <!-- 右侧工具面板 -->
        <div class="ActionToolArea">
          <h3> 标题： <span class="TipText">{{ ArticleData.title }} </span></h3>
          <h3> 关键词： <span class="TipText">{{ ArticleData.keyword }} </span></h3>
          <h3> 标签： <span class="TipText">{{ ArticleData.lable }} </span></h3>
          <h3> 阅读数： <span class="TipText">{{ ArticleData.read_num }}</span></h3>
          <h3> 发布日期：<span class="TipText">{{ ArticleData.pub_date }}</span></h3>
          <h3> 作者： <span class="TipText">{{ ArticleData.username }}</span></h3>
          <h3> 文章类型： <span class="TipText">{{ props.type }}</span></h3>
          <el-row class="ActionBox">
            <el-button type="success" plain @click="recoverPage">恢复</el-button>
            <el-button type="danger" plain @click="deletePage">彻底删除</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import getArticleAPI from '@/utils/API/Recycle'
import useELTips from '@/Hooks/ElMessageBoxTips'
import { onMounted, reactive, ref } from "vue";
// 申明对父组件操作
const emit = defineEmits(['closePanel'])
const props = defineProps<{
  ArticleId: string,
  isTrue: boolean,
  type: string
}>();
let ArticleData = ref({
  content: '',
  title: '',
  keyword: '',
  lable: '',
  read_num: '',
  pub_date: '',
  username: ''
})
// 关闭组件 物理操作
function close() {
  emit('closePanel')
}
// 获取文章
const getArticle = async () => {
  const { data: res } = await getArticleAPI.getRecycleList(props.ArticleId, props.type, 'getDetail')
  ArticleData.value = res.data
}
// 选择文章状态并改变
const recoverPage = async () => {
  if (await useELTips('你确定要恢复吗？')) {
    const { data: res } = await getArticleAPI.getRecycleList(props.ArticleId, props.type, 'recover')
    if (res.status === 200) {
      close()
    }
  }
}
// 删除该文章
const deletePage = async () => {
  if (await useELTips('你真的要删除这篇文章？')) {
    const { data: res } = await getArticleAPI.getRecycleList(props.ArticleId, props.type, 'delete')
    if (res.status === 200) {
      close()
    }
  }
}

onMounted(() => {
  if (props.isTrue) {
    getArticle()
  }
});

</script>


<style lang="less" scoped>
.ArticleDetailPanelBox {
  display: flex;
  align-items: center;
  /* 垂直居中 */
  justify-content: center;
  /* 水平居中 */
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 平移 */
  background-color: rgba(104, 96, 96, 0.371);
  z-index: 99;
}

.ArticleDetailPanelArea {
  width: 70vw;
  height: 70vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 平移 */
  background-color: rgb(254, 254, 254);
  z-index: 999;
  border-radius: 5px;
  overflow: hidden;
}

.ArticleShowArea {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
  flex-wrap: wrap;
  padding-bottom: 50px;
}

.ArticleShowAreaBox {
  width: 50%;
  overflow-y: scroll;
  height: 100%;
}

.ArticleShowArea::-webkit-scrollbar {
  display: none;
}

.content {
  padding: 5px;
}

.ActionToolArea {
  width: calc(50% - 20px);
  padding: 10px;
  background-color: rgba(200, 221, 249, 0.371);
  border-radius: 5px;

  .TipText {
    font-size: 0.8rem;
  }

  .ActionBox {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
}


.BoxHeader {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
}

.closeBtn {
  font-size: 1.2rem;
}

.commentArea {
  margin-top: 20px;
  padding: 10px 20px 20px 20px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.9);

  p {
    font-size: 1rem;
    font-weight: bolder;
  }

  #comtext {
    border-radius: 8px;
    border: 2px rgba(243, 245, 248, 0.8) solid;
    padding: 5px;
    width: 100%;
    height: 80px;
    resize: none;
  }

  .comment {
    background-color: rgba(201, 227, 243, 0.4);
    border-radius: 4px;
    padding: 5px;
    margin-bottom: 10px;
    position: relative;

    p {
      margin: 0;
      color: rgba(6, 52, 122, 0.8);
    }

    .comment_user {
      font-size: 1rem;
    }

    .comment_text {
      font-size: 1rem;
      margin: 2px;
      overflow-x: scroll;
    }

    .comment_text::-webkit-scrollbar {
      display: none;
    }

    .comment_time {
      font-size: 0.5rem;
      text-align: right;
    }
  }

  .deleteCommentBtn {
    position: absolute;
    top: 5px;
    right: 5px;
  }
}
</style>