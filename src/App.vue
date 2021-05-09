
<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="handleInputChange"/>
    <a-button type="primary" @click="addItem">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="changeStatus(item.id, $event)">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="deleteItem(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDoLen}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey == 'all'?'primary':'default'" @click="changeList('all')">全部</a-button>
          <a-button :type="viewKey == 'undone'?'primary':'default'" @click="changeList('undone')">未完成</a-button>
          <a-button :type="viewKey == 'done'?'primary':'default'" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="cleanDoneItems">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  // 获得 List 的数据
  created() {
    this.$store.dispatch('getList');
  },
  // 获得输入框的值
  computed: {
    ...mapState(['inputValue','viewKey']),
    ...mapGetters(['unDoLen','infoList'])
  },
  methods : {
    // 实时改变输入框的值
    handleInputChange (e) {
      console.log(e.target.value);
      this.$store.commit('changeInputValue', e.target.value)
    },
    // 添加事项
    addItem () {
      if(this.$store.state.inputValue.length == 0) 
        return this.$message.warning('请输入！')
      this.$store.commit('addItemToList')
    },
    // 删除事项
    deleteItem (id) {
      console.log(id);
      this.$store.commit('deleteItem',id)
    },
    // 改变完成状态
    changeStatus(id, e) {
      // console.log(id);
      // console.log(e);
      const param = {
        id : id,
        status : e.target.checked
      }
      this.$store.commit('changeStatus', param)
    },
    cleanDoneItems () {
      this.$store.commit('cleanDone')
    },
    changeList (key) {
      this.$store.commit('changeList',key)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>