<template>
  <div class="image-uploader">
<!--    <label class="image-uploader__preview image-uploader__preview-loading" style="&#45;&#45;bg-url: url('/link.jpeg')">-->
    <label class="image-uploader__preview image-uploader__preview-loading" :style="backgroundImage">
      <span class="image-uploader__text">Загрузить изображение</span>
      <input type="file" ref="input" accept="image/*" class="image-uploader__input" v-bind="$attrs" @change="uploadFile" />
    </label>
  </div>
</template>

<script>
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
      pic:null


    }
  },
  emits: ['upload:preview', 'remove:preview'],
  computed: {
    backgroundImage(){
      return '--bg-url: url(' + this.imageUrl + ')'
    }
  },
  methods: {
    changePicture(file) {
      // if (this.uploader) {
      //     this.uploader(file)
      //   }
      console.log(file)
    },
    uploadFile() {
        this.picture = this.$refs.input.files[0];
//           let result = this.uploader(this.picture);
//                 console.log(result);
//          result.then(value => {
//   console.log(value.image);
//    this.imageUrl = String(value.image);
// }).catch(err => {
//   console.log(err);
//   // 👉️ "Something went wrong"
// });

        // console.log(this.$refs.input)
   let link = URL.createObjectURL(this.picture);
     this.imageUrl = String(link);
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
