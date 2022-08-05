<script setup>
import {inject,shallowRef} from "vue";
import Feed from './Feed.vue'
import Stories from './Stories.vue'
let isLoading=inject('isLoading')
let isFeed=inject('isFeed')
let isStories=inject('isStories')
let userName=inject('userName')
let stats=inject('stats')
let currentTab=shallowRef(Feed)
let user=sessionStorage.user
let aColor='#515BD4'
let pColor='#ffffff'
</script>
<template>
  <div v-if="isLoading">
    <svg width="280" height="280" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
        <stop stop-color="#515BD4" stop-opacity="0" offset="0%"/>
        <stop stop-color="#515BD4" stop-opacity=".631" offset="63.146%"/>
        <stop stop-color="#515BD4" offset="100%"/>
      </linearGradient>
    </defs>
    <g fill="none" fill-rule="evenodd">
      <g transform="translate(1 1)">
        <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2">
          <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="2s"
              repeatCount="indefinite" />
        </path>
        <circle fill="#DD2A7B" cx="36" cy="18" r="1">
          <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="2s"
              repeatCount="indefinite" />
        </circle>
      </g>
    </g>
  </svg></div>
  <div v-else style>
    <img  :src="stats.profUrl" id="profPic" >
    <div class="userName">{{userName}}</div>
    <div class="stats">{{stats.bio}} <a :href="stats.externalUrl">{{stats.externalUrl}}</a></div>
    <div class="bio" >Подписчиков: {{stats.followers}} Подписок:  {{stats.following}} Постов:{{stats.postCount}}</div>
  </div>
 <div>
   <button @click=" currentTab=Feed" class="btnContent" :style="`background-color:${currentTab===Feed ? aColor : pColor};`" >посты</button>
   <button @click=" currentTab=Stories" class="btnContent" :style="`background:${currentTab===Stories ?  aColor:pColor };`" >истории</button>
   <hr color="#515BD4">
 </div>
<div v-if="isFeed">
  <svg width="380" height="380" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
        <stop stop-color="#515BD4" stop-opacity="0" offset="0%"/>
        <stop stop-color="#515BD4" stop-opacity=".631" offset="63.146%"/>
        <stop stop-color="#515BD4" offset="100%"/>
      </linearGradient>
    </defs>
    <g fill="none" fill-rule="evenodd">
      <g transform="translate(1 1)">
        <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2">
          <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="2s"
              repeatCount="indefinite" />
        </path>
        <circle fill="#DD2A7B" cx="36" cy="18" r="1">
          <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="2s"
              repeatCount="indefinite" />
        </circle>
      </g>
    </g>
  </svg>
</div>
<div v-else>
<KeepAlive>
  <component :is="currentTab"></component>
</KeepAlive>
</div>
</template>
<style scoped>
#profPic{
  width: 40vh;
  box-shadow: 21px 4px 8px 7px rgba(34, 60, 80, 0.2);
  border-radius: 50%;
  margin: 10px;
}
.userName{
  font-size: 5vh;

}
.stats{
  font-size: 2vh;
  margin: 10px;
}
.bio{
  font-size: 2vh;
  margin: 10px;
}

hr{
  margin: 0  0 10px;

}

</style>
