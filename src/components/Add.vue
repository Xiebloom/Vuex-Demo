<template>
  <div>
      <h3>{{$store.getters.showNum}}</h3>
      <button @click="change(1)">+1</button>
      <button @click="changeDelay(+2)">+2 after 1s</button>
  </div>
</template>

<script>
export default {
    methods : {
        change (num) {
            this.$store.commit('change',num)
        },
        changeDelay(num) {
            this.$store.dispatch('changeAsync', num)
        }
    }
}
</script>

<style>

</style>