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
            <p v-if="!isMd" v-html="ArticleData.data.article.content" v-highlight style="word-wrap: break-word;"></p>
            <mdView v-if="isMd && isShow" :content="ArticleData.data.article.content"></mdView>
          </div>
          <!-- 留言区 -->
          <div class="commentArea" v-if="ArticleData.data.comment.length">
            <p>留言</p>
            <div class="comment" v-for="(item, index) in ArticleData.data.comment" :key="index">
              <p class="comment_user">
                {{ item.username }}
                用户 留言：
              </p>
              <p class="comment_text">{{ item.comment }}</p>
              <p class="comment_time">时间:{{ item.pub_date }}</p>
              <el-button v-show="isDeleteCommentBtn" type="danger" circle
                @click.stop="deleteComment(item.username, item.id)" class="deleteCommentBtn">
                <el-icon class="closeBtn">
                  <CloseBold />
                </el-icon>
              </el-button>
            </div>
          </div>
        </div>
        <!-- 右侧工具面板 -->
        <div class="ActionToolArea">
          <h3> 标题： <span class="TipText">{{ ArticleData.data.article.title }} </span></h3>
          <h3> 关键词： <span class="TipText">{{ ArticleData.data.article.keyword }} </span></h3>
          <h3> 标签： <span class="TipText">{{ ArticleData.data.article.lable }} </span></h3>
          <h3> 阅读数： <span class="TipText">{{ ArticleData.data.article.read_num }}</span></h3>
          <h3> 发布日期：<span class="TipText">{{ ArticleData.data.article.pub_date }}</span></h3>
          <h3> 作者： <span class="TipText">{{ ArticleData.data.article.username }}</span></h3>
          <h3> 文章类型： <span class="TipText">{{ props.type }}</span></h3>
          <el-row class="ActionBox">
            <el-button type="primary" plain @click="ShowDeleteBtn">删除评论</el-button>
            <el-dropdown split-button type="warning" @command="selectAction">
              修改状态
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="reject">驳回</el-dropdown-item>
                  <el-dropdown-item command="restore">恢复正常</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-button type="danger" plain @click="deleteArticle(props.ArticleId)">删除</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArticleRequest from "@/utils/API/ArticleClass"
import useELTips from '@/Hooks/ElMessageBoxTips'
import { onMounted, reactive, ref } from "vue";
import { ElMessage } from 'element-plus'
import mdView from '@/components/MdEditor/mdView.vue'
// 申明对父组件操作
const emit = defineEmits(['closePanel'])
const props = defineProps<{
  ArticleId: string,
  isTrue: boolean,
  type: string
}>();
const isMd = ref(false)
const isShow = ref(false)
const isDeleteCommentBtn = ref(false)
const ArticleData = reactive({
  data: {
    article: {
      content: '',
      title: '',
      keyword: '',
      lable: '',
      pub_date: '',
      username: '',
      read_num: '',
    },
    comment: [
      {
        username: '',
        comment: '',
        pub_date: '',
        id: '',
      }
    ],
    goodnum: 0,
    collect: 0
  }
})
// 复用传递参数
class PutDataClass {
  cagUserName: string = ''
  articleId: string = ''
  func: string = ''
}
// 关闭组件 物理操作
function close() {
  emit('closePanel')
}
// 删评论按钮
function ShowDeleteBtn() {
  if (ArticleData.data.comment.length !== 0) {
    isDeleteCommentBtn.value = !isDeleteCommentBtn.value
  } else {
    ElMessage.warning('该文章没得评论，删个锤子删？')
  }
}
// 获取文章
const getArticle = async () => {
  isMd.value = false
  if (/\bmd[A-Z0-9]+\b/g.test(String(props.ArticleId))) isMd.value = true
  const { data: res } = await ArticleRequest.getDetail(String(props.ArticleId), props.type)
  ArticleData.data = res.data
  isShow.value = false
  if (res.data) {
    isShow.value = true
  }
}
// 删除留言
const deleteComment = async (username: string, commentId: number | string) => {
  if (await useELTips('你确定要删除这条评论吗？')) {
    const delCommentPutData = new PutDataClass();
    delCommentPutData.cagUserName = username
    delCommentPutData.articleId = String(commentId)
    delCommentPutData.func = 'delComment'
    const { data: res } = await ArticleRequest.cagUPData(delCommentPutData, props.type)
    if (res.status === 200) {
      getArticle()
    }
  }
}
// 选择文章状态并改变
const selectAction = async (selectValue: string) => {
  if (await useELTips('你确定要改变文章状态吗？')) {
    const selectActionPutData = new PutDataClass();
    selectActionPutData.cagUserName = ArticleData.data.article.username
    selectActionPutData.articleId = props.ArticleId
    selectActionPutData.func = selectValue
    await ArticleRequest.cagUPData(selectActionPutData, props.type)
  }
}
// 删除该文章
const deleteArticle = async (articleId: string | number) => {
  if (await useELTips('你真的要删除这篇文章？')) {
    const delArticlePutData = new PutDataClass();
    delArticlePutData.cagUserName = ArticleData.data.article.username
    delArticlePutData.articleId = String(articleId)
    delArticlePutData.func = 'delArticle'
    const { data: res } = await ArticleRequest.cagUPData(delArticlePutData, props.type)
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