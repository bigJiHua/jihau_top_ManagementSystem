<template>
  <div class="CardBox">
    <div class="leftContentArea">
      <img :src="data.cover_img" alt="文章配图" class="ArticleImg">
    </div>
    <div class="rightContentArea">
      <header>
        <!-- TODO 这里路径目前在测试，上线时需要重新修改 -->
        <h3>标题：<a class="defalut_a_black" :href="`http://localhost:8080/article/${data.article_id}`">{{ data.title }}</a>
        </h3>
      </header>
      <div class="content">
        <p>{{ displayContent }}</p>
        <span v-if="data.pub_date">{{ data.pub_date }}</span>
      </div>
    </div>
    <div class="deleteBtn" v-if="data.comment">
      <el-button type="danger" :icon="Delete" @click="DeleteData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import deleteCommentAPI from '@/utils/API/UsersClass'
import useELTips from '@/Hooks/ElMessageBoxTips'
const props = defineProps<{
  data: {
    title: "",
    article_id: "",
    cover_img: "",
    id: 0,
    content?: '',
    comment?: '',
    pub_date: '',
    username: '',
  },
  user: string
}>()


// 申明对父组件操作
const emit = defineEmits(['GetnewListData'])
// 删除用户评论
const DeleteData = async () => {
  // /users/delact?id=88&username=JiHua&article_id=YGYG88
  if (await useELTips('你确定要删除该用户此条评论吗？')) {
    const { data: res } = await deleteCommentAPI.deleteUserComment(props.data.id, props.user, props.data.article_id)
    if (res.status === 200) {
      emit('GetnewListData')
    }
  }
}

const displayContent = computed(() => {
  if (props.data.content) {
    return props.data.content + '...';
  } else if (props.data.comment) {
    return props.data.comment;
  } else {
    return '没有内容可显示';
  }
});
</script>

<style lang="less" scoped>
.CardBox {
  display: flex;
  justify-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  background-color: #f4f4f4;
  margin-top: 10px;
  width: 100%;
}

.content {
  display: flex;
  justify-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
}

.leftContentArea {
  margin: 5px 10px 5px 5px;
  max-width: 8%;
}

.rightContentArea {
  width: 60%;
  max-width: 75%;
}

.ArticleImg {
  width: 50px;
  height: 50px;
}
</style>
