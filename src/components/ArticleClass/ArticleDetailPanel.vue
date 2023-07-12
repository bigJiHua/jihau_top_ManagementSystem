<template>
  <div class="ArticleDetailPanelBox" @click.self="close">
    <div class="ArticleDetailPanelArea">
      <div class="BoxHeader">
        <h1>快速预览文章面板</h1>
        <el-button type="danger" circle @click.stop="close">
          <el-icon class="closeBtn">
            <CloseBold />
          </el-icon>
        </el-button>
      </div>
      <div class="ArticleShowArea">
        <div class="content">
          <p v-html="ArticleData.data.article.content" v-highlight></p>
        </div>
        <div class="commentArea">
          <p>留言</p>
          <div class="comment" v-for="(item, index) in ArticleData.data.comment" :key="index">
            <p class="comment_user">
              {{ item.username }}
              用户 留言：
            </p>
            <p class="comment_text">{{ item.comment }}</p>
            <p class="comment_time">时间:{{ item.pub_date }}</p>
          </div>
        </div>
        <div class="ActionToolArea">
          <div class="spanLine">
            <h3>
              <span class="TipLable"> 标题：</span>
              <span class="TipText">{{ ArticleData.data.article.title }} </span>
            </h3>
            <h3>
              <span class="TipLable"> 作者：</span>
              <span class="TipText">{{ ArticleData.data.article.username }}</span>
            </h3>
          </div>
          <h3><span class="TipLable"> 关键词：</span>
            <span class="TipText">{{ ArticleData.data.article.keyword }} </span>
          </h3>
          <h3><span class="TipLable"> 标签：</span>
            <span class="TipText">{{ ArticleData.data.article.lable }} </span>
          </h3>
          <div class="spanLine">
            <h3>
              <span class="TipLable"> 阅读数：</span>
              <span class="TipText">{{ ArticleData.data.article.read_num }}</span>
            </h3>
            <h3>
              <span class="TipLable"> 评论数：</span>
              <span class="TipText">{{ (ArticleData.data.comment).length }}</span>
            </h3>
          </div>
          <h3><span class="TipLable"> 发布日期：</span>
            <span class="TipText">{{ ArticleData.data.article.pub_date }}</span>
          </h3>
          <el-row class="ActionBox">
            <el-button type="primary" plain @click="ShowDeleteBtn">删除评论</el-button>
            <el-dropdown split-button type="warning" @command="selectAction">
              修改状态
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="reject">驳回文章</el-dropdown-item>
                  <el-dropdown-item command="restore">恢复正常</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-button type="danger" plain @click="deleteArticle(ArticleData.data.article.article_id)">删除文章</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArticleRequest from "@/utils/API/ArticleClass"
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
// 申明对父组件操作
const emit = defineEmits(['closePanel'])
const route = useRouter();
const props = defineProps<{
  ArticleId: String,
  isTrue: boolean
}>();

const ArticleData = reactive({
  data: {
    article: {},
    comment: [],
    goodnum: 0,
    collect: 0
  }
});

function close() {
  emit('closePanel')
}
const getArticle = async () => {
  const { data: res } = await ArticleRequest.getArchives(String(props.ArticleId))
  ArticleData.data = res.data
}
// 删除留言
const deleteComment = async (username: string, commentId: number | string) => {
  if (await useELTips.WarningTips('确定要删除这条评论吗？') === 'true') {
    const delCommentPutData = new PutDataClass();
    delCommentPutData.cagUserName = username
    delCommentPutData.articleId = String(commentId)
    delCommentPutData.func = 'delComment'
    const { data: res } = await ArticleRequest.cagUPData(delCommentPutData)
    if (res.status === 200) {
      getArticle()
    }
  }
}
// 选择文章状态并改变
const selectAction = async (selectValue: string) => {
  if (await useELTips.WarningTips('确定要改变文章状态吗？') === 'true') {
    const selectActionPutData = new PutDataClass();
    selectActionPutData.cagUserName = ArticleData.data.article.username
    selectActionPutData.articleId = props.ArticleId
    selectActionPutData.func = selectValue
    await ArticleRequest.cagUPData(selectActionPutData)
  }
}
// 删除该文章
const deleteArticle = async (articleId: string | number) => {
  if (await useELTips.WarningTips('确定要删除这篇文章吗？') === 'true') {
    const delArticlePutData = new PutDataClass();
    delArticlePutData.cagUserName = ArticleData.data.article.username
    delArticlePutData.articleId = String(articleId)
    delArticlePutData.func = 'delArticle'
    await ArticleRequest.cagUPData(delArticlePutData)
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 平移 */
  background-color: rgba(104, 96, 96, 0.371);
  z-index: 99;
}

.ArticleDetailPanelArea {
  width: 80vw;
  height: 80vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 平移 */
  background-color: rgb(254, 254, 254);
  z-index: 999;
  border-radius: 5px;
  z-index: 999;
  overflow: hidden;
}

.ArticleShowArea {
  width: 100%;
  height: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ArticleShowArea::-webkit-scrollbar {
  display: none;
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

.content {
  padding: 5px;
  overflow-x: scroll;
}
.ActionToolArea {
  max-width: 100%;
  padding: 5px;
}
.commentArea {
  max-width: 50%;
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
}

.spanLine {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 80%;
}

.TipLable {
  display: inline-block;
  width: 90px;
}
</style>