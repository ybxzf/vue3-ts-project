<template>
  <div class="basic-item" :style="{ width: width, height: height, }">
    <div style="margin: 0 15px;height: 100%;">
      <div style="position: relative;">
        <el-image style="position: absolute;top: -15px;left: -15px;" src="/img/bg/title-forward-icon.png"></el-image>
        <div class="item-title">
          <label>{{ title }}</label>
        </div>
        <el-image style="position: absolute;top: 50%;right: 0;transform: translateY(-50%);"
          src="/img/bg/title-end-icon.png"></el-image>
      </div>
      <div style="height: calc(100% - 50px);">
        <slot name="content">暂无数据</slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BasicItem",
  components: {
  },
  props: {
    width: {
      type: String,
      default: () => ("100%"),
    },
    height: {
      type: String,
      default: () => ("auto"),
    },
    title: {
      type: String,
      default: () => (""),
    },
  },
  data() {
    return {

    }
  },
  computed: {},
  watch: {},

  created() {
  },
  mounted() {
  },
  methods: {
  }
}

</script>
<style lang="scss" scoped>
.basic-item {
  // background: rgba($color: #f08484, $alpha: 0.5);
  box-sizing: content-box;
  // border: 1px solid red;
}

.item-title {
  height: 50px;
  background-image: url('/img/bg/item-bg-line.png');
  background-size: 100% 100%;
  padding-top: 1%;
  padding-left: 35px;
  font-size: 18px;
  font-style: italic;
  font-weight: bold;

  label {
    width: 80%;
    line-height: 20px;
    display: inline-block;
    font-family: PingFang SC;
    color: #F6F9FE;
    // text-shadow: 0px 2px 8px rgba(5, 28, 55, 0.42);
    font-style: italic;
    background: linear-gradient(to bottom, #0EC5EC 0%, #ffffff 46%, #ffffff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    // text-shadow: 0px 2px 8px rgba(5, 28, 55, 0.42);
    // background: linear-gradient(0deg, rgba(14, 197, 236, 0.36) 0%, rgba(49, 190, 255, 0.36) 0%, rgba(239, 252, 254, 0.36) 58%);
    // -webkit-background-clip: text;
    // color: rgb(255 255 255 / 40%);
  }
}
</style>