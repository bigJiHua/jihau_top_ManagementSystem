<template>
  <div class="PostNotifyArea">
    <div class="HeaderBox">
      <el-button type="primary" class="HeaderItem" size="small" @click="isShowAside">{{ AsideBtn }}</el-button>
      <el-button type="primary" class="HeaderItem" size="small" @click="TemStorage">暂存</el-button>
      <el-button type="danger" class="HeaderItem" size="small" @click="Unstage">取消发布</el-button>
      <el-button type="success" class="HeaderItem" size="small" @click="PostNotifyData">发布通知</el-button>
      <el-button type="primary" class="HeaderItem" size="small" @click="startEditiPost">开始水通知</el-button>
      <el-button type="danger" class="HeaderItem" size="small" @click="StopEditiPost">关闭水通知</el-button>
    </div>
    <div class="EditorAreaBox">
      <aside :class="{
        cagAside: !isChange,
        opAside: isChange,
      }">
        <el-input v-model="editorData.title" placeholder="请输入">
          <template #prepend>标题：</template>
        </el-input>
        <el-input v-model="editorData.lable" placeholder="请输入">
          <template #prepend>标签：</template>
        </el-input>
        <el-input v-model="editorData.keyword" placeholder="请输入">
          <template #prepend>关键词:</template>
        </el-input>
        <div class="selectBox">
          <p>谁能看：</p>
          <el-select v-model="editorData.whosee" class="m-2" placeholder="Select" size="small">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <el-input v-model="editorData.state" placeholder="请输入" disabled>
          <template #prepend>状态:</template>
        </el-input>
      </aside>
      <div id="EditorArea">
        <Cekditor :content="editorData.content" @cagEditorData="cagEditorData"></Cekditor>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
import useELTips from '@/Hooks/ElMessageBoxTips'
import useLocalStorage from '@/Hooks/useLocalStorage'
import GetArticleData from '@/utils/API/ArticleClass'
import Cekditor from '@/components/Cekditor/index.vue'
const router = useRouter()
const postID = router.currentRoute.value.params.postId as string
const editorData = ref({
  title: '',
  lable: '',
  keyword: '',
  content: '',
  state: 0,
  whosee: 0
})
const options = [
  {
    value: 0,
    label: '所有人',
  }, {
    value: 1,
    label: '管理员',
  }]
const isChange = ref(false)
let AsideBtn = ref('收起菜单')

// 重新编辑待发布的通知
const getPostNotifyData = async (PostId: string) => {
  if (!PostId) {
    ElMessage.error('ID不能为空！')
    return
  }
  const { data: res } = await GetArticleData.getDetail(PostId, 'notify')
  if (res.status !== 200) {
    ElMessage.error('文章已经被删除！')
    router.replace('/controlPanel/NotifyPost/');
    return
  }
  router.replace('/controlPanel/NotifyPost/' + PostId);
  editorData.value = res.data.article
}
// 暂存PostNotifyData
const TemStorage = () => {
  if (editorData.value.content === undefined) {
    ElMessage.warning('内容空空，没有什么可存的，请输入文章ID进行编辑吧！')
  } else {
    ElMessageBox.confirm(
      '你要选择保存在本地还是以待发布的状态存在？',
      '提示',
      {
        confirmButtonText: '上传待发布',
        cancelButtonText: '保存在本地',
        type: 'warning',
      }
    ).then(() => {
      // 设置状态为待发布
      editorData.value.state = 1
      PostNotifyData() // 调用上传函数
    }).catch(() => {
      if (editorData.value.content === '') {
        ElMessage({
          message: '无数据存储，请编辑你的文章',
          duration: 800,
          type: 'error'
        })
        return
      }
      useLocalStorage.setLoc('TemStorageN', editorData.value, false)
      if (useLocalStorage.getLoc('TemStorageN', false).content !== undefined) {
        ElMessage.success('暂存在本地成功！')
      }
    });
  }
}
// 同步数据
const cagEditorData = (cagData: string) => {
  if (cagData === '') return
  if (editorData.value.content !== cagData) {
    editorData.value.content = cagData
    ElMessage({
      message: '成功接收变更后的数据',
      duration: 300,
      type: 'success'
    })
  }
}
function generateChineseCharacters(Num: number) {
  let characters = '';
  const totalCharacters = Num;

  while (characters.length < totalCharacters) {
    const randomUnicode = Math.floor(Math.random() * (0x9fa5 - 0x4e00 + 1)) + 0x4e00;
    characters += String.fromCharCode(randomUnicode);
  }

  return characters;
}
// 开始刷文章
let OpenEditiPost = 0
const startEditiPost = () => {
  OpenEditiPost = setInterval(async () => {
    editorData.value.title = generateChineseCharacters(10)
    editorData.value.lable = generateChineseCharacters(10)
    editorData.value.keyword = generateChineseCharacters(15)
    editorData.value.content = generateChineseCharacters(450)
    editorData.value.state = 0
    const { data: res } = await GetArticleData.postNotify(editorData.value)
    if (res.status === 200) {
      editorData.value = {
        title: '',
        lable: '',
        keyword: '',
        content: '',
        state: 0,
        whosee: 0
      }
    }
  }, 2000);
}
// 停止刷文章
const StopEditiPost = () => {
  clearInterval(OpenEditiPost)
  editorData.value = {
    title: '',
    lable: '',
    keyword: '',
    content: '',
    state: 0,
    whosee: 0
  }
}
// 发布通知
const PostNotifyData = async () => {
  if (!isCheck(editorData.value.content) && !isCheck(editorData.value.title) && !isCheck(editorData.value.lable) && !isCheck(editorData.value.keyword)) {
    ElMessage.warning('内容空空，务必确保你的通知名、标签、关键词完整！')
  } else {
    if (await useELTips('你确定要发布该通知吗？')) {
      editorData.value.state = 0
      const { data: res } = await GetArticleData.postNotify(editorData.value, postID)
      if (res.status === 200) {
        editorData.value = {
          title: '',
          lable: '',
          keyword: '',
          content: '',
          state: 0,
          whosee: 0
        }
        router.push('/controlPanel/NotifyList')
      }
    }
  }
}
function isCheck(value: string) {
  return value !== '' && value !== undefined && value !== null
}
// 取消发布
const Unstage = async () => {
  if (await useELTips('确定要取消编辑吗？你可以选择暂存待会再看看！')) {
    useLocalStorage.remLoc('TemStorageN')
    router.back()
  }
}
// 收起菜单
const isShowAside = () => {
  isChange.value = !isChange.value
  if (isChange.value) {
    AsideBtn.value = '展开菜单'
  } else {
    AsideBtn.value = '收起菜单'
  }
}
// 加载时获取 ID？ 或者自动保存
onMounted(async () => {
  if (localStorage.getItem('TemStorageN')) {
    if (await useELTips('上次还有保存的数据哟！要继续编辑吗？')) {
      const TemStorageData = JSON.parse(localStorage.getItem('TemStorageN') as string)
      editorData.value = TemStorageData
      ElMessage.success('当前显示的是暂存的内容！')
    }
  } else if (postID) {
    getPostNotifyData(postID)
  }
})
// 在组件销毁之前执行的操作
// 文章不为空且没按提交按钮
onBeforeUnmount(async () => {
  if (localStorage.getItem('TemStorageA')) {
    if (await useELTips('检测到本地有暂存，还未提交，需要保留吗？')) {
      localStorage.removeItem('TemStorageN')
      ElMessage.warning('暂存已删除')
    }
  }
});

</script>

<style scoped>
.PostNotifyArea {
  height: calc(100vh - 100px);
  width: 100%;
}

.HeaderBox {
  display: flex;
  justify-content: space-between;
  padding: 8px 20px;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 8px 20px;

  >.HeaderItem:nth-child(1) {
    width: 200px;
  }
}

#editor {
  min-height: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
}

.EditorAreaBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}


@media only screen and (min-width: 755px) {
  .EditorAreaBox {
    flex-wrap: nowrap;
    max-width: 90vw;
    overflow: scroll;
    height: calc(100vh - 100px);
  }

  .cagAside {
    flex: 0.5;
    background-color: rgb(5, 0, 105);
    color: white;
    padding: 5px;
    position: relative;
    overflow: hidden;
    transform: scaleY(1);
    transition: transform 0.5s;
    transform-origin: top center;
  }

  #EditorArea {
    flex: 1.5;
    height: calc(100vh - 100px);
    overflow: scroll;
  }
}

@media only screen and (max-width: 755px) {
  .EditorAreaBox {
    flex-wrap: wrap;
  }

  .HeaderBox>button {
    margin-bottom: 10px;
  }

  .cagAside {
    height: 40vh;
    background-color: rgb(5, 0, 105);
    color: white;
    padding: 5px;
    position: relative;
    overflow: hidden;
    transform: scaleY(1);
    transition: transform 0.5s;
    transform-origin: top center;
  }

}

.opAside {
  transform: scaleY(0);
  transition: transform 0.2s;
  transform-origin: top center;
  width: 0;
  height: 0;
}

.imgurl {
  color: black;
}

.pvimg {
  width: 80%;
  max-height: 100px;
}

#EditorArea::-webkit-scrollbar {
  display: none;
}

.EditorAreaBox::-webkit-scrollbar {
  display: none;
}

.cke_chrome {
  padding: 0;
}

.selectBox {
  display: flex;
  margin-top: 10px;
}

/deep/.el-input-group {
  margin-top: 10px;
}
</style>
