<script setup>
import {ref,provide} from "vue";
import Data from './components/Data.vue'
let isLoading=ref(true)
let isFeed=ref(true)
let isStories=ref(true)
let userName=ref('');
let stats=ref({bio:' ',followers:' ',following:' ',externalUrl:'',profUrl:' ',postCount:''})
let stories=ref('')
let feed=ref('')
provide('userName',userName)
provide('stats',stats)
provide('host','192.168.1.2')
provide('stories',stories)
provide('feed',feed)
provide('isLoading',isLoading)
provide('isFeed',isFeed)
provide('isStories',isStories)
</script>
<template>
  <Data/>
  <router-view/>
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  margin-top: 60px;
}
.btnContent{
  border: none;
  font-size: 4vh;
  background: white;
}

.btnDownload{
  background: #DD2A7B;
  border: none;
  width: 6rem;
  height: 4vh;
  font-size: 19px;
  margin: 10px;
}

</style>
