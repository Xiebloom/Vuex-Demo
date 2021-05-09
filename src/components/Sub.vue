<template>
  <div>
      <h3>当前值为{{count}}</h3>
      <button @click="change(-1)">-1</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'

export default {
    methods : {
        ...mapMutations(['change'])
    },
    computed : {
        ...mapState(['count'])
    }
}
</script>

<style>

</style>