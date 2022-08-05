<script setup>
import {inject} from 'vue'
let storyData=inject('stories')
let host=inject('host')
</script>
<template>
<div v-for="story in storyData">
  <img v-if="story.video_url===null" :src="story.thumbnail_url">
  <video v-else crossorigin="anonymous" :src="'http://'+host+':3003/video/'+encodeURIComponent(story.video_url)" controls>
  </video>
    <p>
      <button class="btnDownload">
        <a :href="'http://'+host+':3003/video/'+encodeURIComponent(story.thumbnail_url)" download v-if="story.video_url===null">скачать</a>
        <a :href="'http://'+host+':3003/video/'+encodeURIComponent(story.video_url)" download v-else>скачать</a>
      </button>
    </p>
</div>
</template>

<style scoped>
img,video{
  width: 40vh;
  box-shadow: 21px 4px 8px 7px rgba(34, 60, 80, 0.2);
}
a{
  text-decoration: none;
  color: black;
}
</style>
