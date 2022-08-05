<script setup>
import {inject} from 'vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import "swiper/css/navigation";
import 'swiper/css'
import 'swiper/css/pagination'
let userName=inject('userName')
let feedData=inject('feed')
let host=inject('host')
</script>
<template>
  <div v-for="feed in feedData">
    <img :src="feed.thumbnail_url" alt="" v-if="feed.thumbnail_url!=null && feed.video_url=== null">
      <div v-else-if="feed.thumbnail_url==null && feed.video_url=== null" >
        <swiper :slidesPerView="1" :spaceBetween="30" :loop="true"  class="" :pagination="{clickable:true}">
         <p>свайпни в сторону чтобы посмотреть карусель </p>
          <swiper-slide v-for="resources in feed.resources">
            <div   v-if="resources.thumbnail_url!=null && resources.video_url=== null">
              <img :src="'http://'+host+':3003/video/'+encodeURIComponent(resources.thumbnail_url)">
             <p> <button class="btnDownload"> <a :href="'http://'+host+':3003/video/'+encodeURIComponent(resources.thumbnail_url)" :download="resources.thumbnail_url"> скачать</a></button></p>
            </div>
            <div v-else>
              <video  crossorigin="anonymous" :src="'http://'+host+':3003/video/'+encodeURIComponent(resources.video_url)"  controls >
              </video>
            <p><button class="btnDownload" ><a :href="'http://'+host+':3003/video/'+encodeURIComponent(resources.video_url)" :download="resources.thumbnail_url">скачать</a></button></p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    <video v-else crossorigin="anonymous" :src="'http://'+host+':3003/video/'+encodeURIComponent(feed.video_url)"  controls >
    </video>
    <div>❤️{{feed.like_count}} 💬{{feed.comment_count}}</div>
    <div>{{feed.caption_text}}</div>
    <p v-if="feed.thumbnail_url!=null && feed.video_url=== null"><button class="btnDownload">
     <a :href="'http://'+host+':3003/video/'+encodeURIComponent(feed.thumbnail_url)" download > скачать</a>
   </button></p>
    <div v-else-if="feed.resources !==null && feed.video_url===null"></div>
    <button class="btnDownload" v-else ><a :href="'http://'+host+':3003/video/'+encodeURIComponent(feed.video_url)" download>скачать</a></button>
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
