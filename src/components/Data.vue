<script setup>
import {ref,inject} from 'vue'
import axios from "axios";
import {useRouter} from 'vue-router'
let isLoading=inject('isLoading')
let isFeed=inject('isFeed')
let isStories=inject('isStories')
let userName=inject('userName')
let stats=inject('stats')
let message=ref('')
let host=inject('host')
let stories=inject('stories')
let feed=inject('feed')
let router=useRouter()
function  send() {
  isLoading.value=true
  isFeed.value=true
  userName.value= message.value
  sessionStorage.setItem('reload',true)
  axios.get(`http://${host}:3004/profile/${userName.value}`).then(response=>{
  if (response.data ==='error'){router.push('/error')}
    console.log(response.data)
    stats.value.bio=response.data.biography
    stats.value.followers=response.data.follower_count
    stats.value.following=response.data.following_count
     stats.value.externalUrl=response.data.external_url
     stats.value.profUrl=response.data.profile_pic_url_hd
    stats.value.postCount=response.data.media_count
        isLoading.value=false
  }).catch(()=>{router.push('/error')})
  axios.get(`http://${host}:3004/posts/${userName.value}`).then(response=>{
    isFeed.value=false
    feed.value=response.data
  })
  axios.get(`http://${host}:3004/stories/${userName.value}`).then(response=>{
    isStories.value=false
    stories.value=response.data
  })
}
if (sessionStorage.reload){
 sessionStorage.reload=false
  router.push('/')
}
</script>
<template>
  <div>
     <label class="search">
       <input type="text" v-model="message" placeholder="введете имя аккаунта ">
       <router-link :to="/profile/+message+'/'" @keypress.enter="send"><button @click="send()" >🔎</button></router-link>
     </label>
  </div>
</template>
<style scoped>
.search{
display: flex;
  flex-direction: row;
  justify-content: center;
}
.search>input{
  border: 4px black solid;
  width: 40vh ;
}
button{
  border: none;
  background:#DD2A7B ;
  height:25px;
  width: 100px;
}
</style>
