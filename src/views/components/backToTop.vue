<template>
  <div class="components-container">
    <code>商品管理</code>
    <el-tooltip placement="top" content="文字提示">
      <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="300" :backPosition="50"></back-to-top>
    </el-tooltip>
  </div>
</template>

<script>
  import BackToTop from 'components/BackToTop';
  export default {
    components: { BackToTop },
    data() {
      return {
        myBackToTopStyle: {
          right: '50px',
          bottom: '50px',
          width: '40px',
          height: '40px',
          'border-radius': '4px',
          'line-height': '45px', // 请保持与高度一致以垂直居中
          background: '#e7eaf1'// 按钮的背景颜色
        }
      }
    }
  }
  </script>
