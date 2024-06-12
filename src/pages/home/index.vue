<template>
    <div> 时间周期 <el-input-number v-model="num" :min="1" :max="60" :step="7" @change="initData" /></div>
    <div style="height: 400px;">
        <ChartComponent :titleText="messageCountTitle" :seriesData="messageCountData" />
    </div>
</template>



<script lang="ts" setup>

defineOptions({
    name: 'page-home'
})

import { dashboardGetRecentMessageCountGroupByDayApi } from '@/api/dashboard';
import ChartComponent from '@/components/charts/LineChart.vue';
import { dateStringToDateString } from '@/utils/convert';
import { onMounted, ref } from 'vue';


const num = ref(7)

// 最近的消息数量
const messageCountTitle = ref("最近的消息数量")
const messageCountData = ref<Array<[string, number]>>([["", 1]])
const getmessageCount = async () => {
    const data = await dashboardGetRecentMessageCountGroupByDayApi(num.value)
    messageCountData.value = data.map(item => [dateStringToDateString(item.date), item.count])
}

onMounted(async () => {
    initData()
})

const initData = () => {
    getmessageCount()
}




</script>



<style scoped>
div {
    margin-bottom: 1rem;
}
</style>