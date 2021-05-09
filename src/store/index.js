import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count : 0,
    list: [],
    inputValue:'aaa',  // 文本框的内容
    nextID:3,
    viewKey: 'all'

  },
  getters : {
    showNum: state => {
      return 'the Num is ' + state.count
    },
    // 未完成条数
    unDoLen: state => {
      return state.list.filter( item => {
        return item.done == false
      }).length
    },
    // 分类 list
    infoList (state) {
      if(state.viewKey === 'all') return state.list
      let status = state.viewKey == 'undone' ? false : true
      return state.list.filter(x => x.done == status)
    }
  },
  mutations: {
    change (state, num) {
      state.count += num
    },
    // 初始化 List
    initList(state, list) {
      state.list = list
    },
    // 改变输入值
    changeInputValue(state, val) {
      state.inputValue = val
    },
    // 添加事项
    addItemToList (state) {
      const obj = {
        id : state.nextID,
        info : state.inputValue,
        done : false
      }
      state.inputValue = ''
      state.list.push(obj)
      state.nextID++
    },
    // 删除
    deleteItem (state, id) {
      // 不能直接删除 state.list[id-1]
      // 会对不上！
      // state.list.splice(id-1,1)
      let index = state.list.findIndex( (item) => {
        return item.id == id
      })
      console.log(index);
      state.list.splice(index,1)
      state.nextID--
    },
    // 改变完成状态
    changeStatus(state, param) {
      let index = state.list.findIndex( x => x.id == param.id)
      if( index !== -1) {
        state.list[index].done = param.status
      }
    },
    // 清除已完成
    cleanDone (state) {
      state.list = state.list.filter( x => x.done == false)
    },
    // 改变高亮状态
    changeList (state, key) {
      state.viewKey = key
    }
  },
  actions: {
    changeAsync (context, num) {
      setTimeout(() => {
        context.commit('change', num)
      }, 1000);
    },
    getList(context) {
      axios.get('/list.json').then( ({data}) => {
        console.log(data);
        context.commit('initList',data)
      })
    }
  },
  modules: {
  }
})
