<script setup lang="ts">
// #ifdef H5
const test = 'text'
// #endif
</script>

<template>
  <!-- #ifdef H5 -->
  <view class="test">
    test
  </view>
  <!-- #endif -->
</template>

<style>
  /* #ifdef H5 */
  .test {
    color: red;
  }
  /* #endif */
</style>
