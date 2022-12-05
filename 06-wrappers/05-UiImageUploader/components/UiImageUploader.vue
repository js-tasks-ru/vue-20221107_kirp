<template>
  <div class="image-uploader">
<!--    <label class="image-uploader__preview image-uploader__preview-loading" style="&#45;&#45;bg-url: url('/link.jpeg')">-->
    <label class="image-uploader__preview" :class="{'image-uploader__preview-loading': !isSUCCESS}" :style="backgroundImage">
      <span class="image-uploader__text">{{ eventText }}</span>
      <input type="file" v-if="!isSUCCESS" ref="input" accept="image/*" class="image-uploader__input" v-bind="$attrs" @change="uploadFile" />
      <input type="file" v-else-if="isSUCCESS" ref="input" accept="image/*" class="image-uploader__input" v-bind="$attrs" @click="removeFile" />
    </label>
  </div>
</template>

<script>
const
  STATUS_INITIAL = 0,
  STATUS_SUCCESS = 1,
  STATUS_FAILED = 2;
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  props: {
    preview: String,
    uploader: Function
  },
  data(){
    return{
      imageUrl: this.preview,
      eventText: 'Загрузить изображение',
      currentStatus: null
    }
  },
  emits: ['select', 'upload', 'remove','error'],
  computed: {
    backgroundImage(){
      if (this.currentStatus === STATUS_FAILED ||  typeof this.imageUrl != 'string'){
        return ''
      } else {
        return '--bg-url: url(' + this.imageUrl + ')'
      }


    },
    isInitial() {
        return this.currentStatus === STATUS_INITIAL;
      },
    isSUCCESS() {
        return this.currentStatus === STATUS_SUCCESS;
      },
    isFAILED() {
        return this.currentStatus === STATUS_FAILED;
      }
  },
  methods: {
    uploadFile() {
        this.picture = this.$refs.input.files[0];
          let result = this.uploader(this.picture);
                this.eventText = 'Загрузка...'
         result.then(value => {
   this.imageUrl = String(value.image);
   this.currentStatus = STATUS_SUCCESS
    this.eventText = 'Удалить изображение';
}).catch(err => {
  this.currentStatus = STATUS_FAILED;
  this.eventText = 'Загрузить изображение';
});
      },
    removeFile() {
         this.currentStatus = STATUS_INITIAL;
         this.eventText = 'Загрузить изображение'
    }
  }
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
