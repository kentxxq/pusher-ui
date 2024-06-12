<template>
    <v-chart class="chart" :option="chartOption" />
</template>

<script setup lang='ts'>
defineOptions({
    name: 'pie-chart'
})


import { use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([TitleComponent, TooltipComponent, PieChart, CanvasRenderer])

const chartOption = ref<EChartsOption>({
    title: {
        text: 'Referer of a Website',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
});

// // Watch for changes in props and update the chart options accordingly
// watch(() => props.titleText, (newTitle) => {
//     chartOption.value.title = { text: newTitle };
// });

// watch(() => props.seriesData, (newData) => {
//     chartOption.value.series = [{ data: newData }];
// });

</script>

<style scoped></style>