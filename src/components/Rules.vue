<script setup lang="ts">
import { useToggle } from '@vueuse/core'

const [showRules, toggleShowRules] = useToggle(false)
</script>

<template>
  <div
    m="l-1"
    s-4
    i-ri:question-fill
    cursor-pointer
    @click="() => toggleShowRules()"
  />
  <NModal v-model:show="showRules">
    <n-card
      w="80%"
      title="计算规则"
    >
      <span>当前统计</span>
      <li>日常任务：从【任务】中领取的合成玉，100/天</li>
      <li>周常任务：同上，500/周</li>
      <li>Side Story：【活动商店】兑换 3 抽 | 复刻时【紫票商店】兑换 2000 合成玉</li>
      限定活动附加：
      <ul>
        <li>每天送合成玉（按平均500/天），共 14 * 500 = 7000</li>
        <li>每天送单抽 + 第一天送 10 抽，共 14 + 10 = 24 抽</li>
      </ul>
      <li>搓玉：按每天 200 合成玉算，不计算额外体力</li>
      <li>月卡：200 合成玉</li>
      <li>绿票商店：默认全部换满，一层 2 抽 + 600 合成玉 | 二层 2 抽</li>
      <li>剿灭任务：默认打满，1800合成玉/周 | 新剿灭额外 1500 合成玉</li>
      <li>签到：每个月第 17 天签到送 1 抽</li>
      <li>故事集：是否有合成玉 or 抽</li>
      <br>
      <span>暂时没统计的</span>
      <li>黄票商店：换满 38 抽</li>
      <li>源石换算：因人而异</li>
      <li>大月卡：每月 10 抽</li>
      <li>邮件送的：太复杂了，不考虑</li>
    </n-card>
  </NModal>
</template>

<style scoped>

</style>
