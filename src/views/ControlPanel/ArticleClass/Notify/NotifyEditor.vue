<template>
  <div class="HeaderBox">
    <el-input v-model="EditorArticleID" class="HeaderItem" placeholder="输入编辑ID">
      <template #append>
        <el-button :icon="Search" @click="getArticleData(EditorArticleID)" />
      </template>
    </el-input>
    <el-button type="primary" class="HeaderItem" size="small" @click="isShowAside">{{ AsideBtn }}</el-button>
    <el-button type="primary" class="HeaderItem" size="small" @click="TemStorage">暂存</el-button>
    <el-button type="success" class="HeaderItem" size="small" @click="UpChangeArticleData">提交变更</el-button>
    <el-button type="danger" class="HeaderItem" size="small" @click="Unstage">取消编辑</el-button>
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
      <el-input v-model="editorData.cover_img" placeholder="请输入">
        <template #prepend>封面：</template>
      </el-input>
      <el-input v-model="editorData.cover_img">
        <template #prepend>预览:
          <img :src="editorData.cover_img" alt="文章封面" class="pvimg" />
        </template>
      </el-input>
      <p>变更任何人的文章都需要变更缘由：</p>
      <el-input v-model="reason" placeholder="输入缘由，不能为空" clearable />
      <p>
        ⚠：没有内容？请输入对应文章ID进行编辑，后台管理面板不支持发布文章，需要登录前台站点后台发布新文章
      </p>
    </aside>
    <div id="EditorArea" v-if="isShowEditor">
      <Cekditor :content="editorData.content" v-highlight @cagEditorData="cagEditorData"></Cekditor>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import useELTips from '@/Hooks/ElMessageBoxTips'
import useLocalStorage from '@/Hooks/useLocalStorage'
import GetArticleData from '@/utils/API/ArticleClass'
import Cekditor from '@/components/Cekditor/index.vue'
const router = useRouter()
const editorData = ref({})
const isChange = ref(false)
const isShowEditor = ref(editorData.value.content !== '' ? true : false)
let reason = ref('')
let newArticleData = reactive({}) // 这里存储文章的源数据
let AsideBtn = ref('收起菜单')
let EditorArticleID = ref('')

// 获取文章如果有Id的话
const getArticleData = async (id: string) => {
  if (!id) {
    ElMessage.error('ID不能为空！')
    return
  }
  router.replace('/controlPanel/ArticleEditor/' + id);
  const { data: res } = await GetArticleData.getArchives(id)
  if (res.status!== 200) {
    ElMessage.error('文章已经被删除！')
  router.replace('/controlPanel/ArticleEditor/');
  return
  }
  editorData.value = res.data.article
  Object.assign(newArticleData, editorData.value)
  EditorArticleID.value = ''
}
// 暂存
const TemStorage = () => {
  if (newArticleData.content === undefined) {
    ElMessage.warning('内容空空，没有什么可存的，请输入文章ID进行编辑吧！')
  } else {
    useLocalStorage.setLoc('TemStorageA', newArticleData, false)
    if (useLocalStorage.getLoc('TemStorageA', false).content !== undefined) {
      ElMessage.success('暂存在本地成功！')
    }
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
// 提交修改
const UpChangeArticleData = async () => {
  if (isChangeArticle(newArticleData, editorData.value)) {
    if (reason.value !== '') {
      const upData = JSON.stringify(useLocalStorage.getRandomSubstring(useLocalStorage.getLoc('token', false), JSON.stringify(editorData.value)))
      const { data: res } = await GetArticleData.cagUAData(reason.value, upData)
      if (res.status === 200) {
        getArticleData(router.currentRoute.value.params.articleid as string)
      }
    } else {
      ElMessage.error('修改任何文章需要理由，请输入理由！')
    }
  } else {
    ElMessage.warning('内容未发生改变')
  }
}
// 取消编辑
const Unstage = async () => {
  if (await useELTips.WarningTips('确定要取消编辑吗？你可以选择暂存待会再看看！') === 'true') {
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
// 对比 是否 有修改差异 obj1是原始数据，obj2是变更数据
const isChangeArticle = (obj1: any, obj2: any) => {
  //  对象 1 和 2
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  // 比较键值对
  if (keys1.length !== keys2.length) {
    return true; // 键不同，存在差异
  }
  for (let i = 0; i < keys1.length; i++) {
    const key = keys1[i];
    if (obj1[key] !== obj2[key]) {
      return true; // 值不同，存在差异
    }
  }
  return false // 值未变
}
onMounted(async () => {
  const ArticleID = router.currentRoute.value.params.articleid as string
  if (localStorage.getItem('TemStorageA')) {
    if (await useELTips.WarningTips('上次还有保存的数据哟！要继续编辑吗？') === 'true') {
      const TemStorageData = JSON.parse(localStorage.getItem('TemStorageA') as string)
      editorData.value = TemStorageData
      newArticleData = TemStorageData
      ElMessage.success('当前显示的是暂存的内容！')
      router.replace('/controlPanel/ArticleEditor/'+ TemStorageData.article_id);
    } else if (ArticleID) {
      getArticleData(ArticleID)
    }
  } else if (ArticleID) {
    getArticleData(ArticleID)
  }
})
// 在组件销毁之前执行的操作
onBeforeUnmount(async () => {
  if (localStorage.getItem('TemStorageA')) {
    if (await useELTips.WarningTips('检测到本地有暂存，还未提交，需要保留吗？') !== 'true') {
      localStorage.removeItem('TemStorageA')
      ElMessage.warning('暂存已删除')
    }
  }
});

</script>

<style scoped>
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
</style>
