<template>
    <div>
        <!-- 欢迎来到这里, 说明你登录成功了 -->
        <v-chart class="chart" :option="option" />
    </div>
</template>



<script lang="ts" setup>

defineOptions({
    name: 'page-home'
})

import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    ToolboxComponent,
    GridComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { ComposeOption } from 'echarts/core'
import type { LineSeriesOption } from 'echarts/charts'
import type {
    TitleComponentOption,
    TooltipComponentOption,
    ToolboxComponentOption,
    GridComponentOption
} from 'echarts/components'
import { ref } from 'vue';

use([
    TitleComponent,
    TooltipComponent,
    ToolboxComponent,
    GridComponent,
    LineChart,
    CanvasRenderer
])

type EChartsOption = ComposeOption<
    | TitleComponentOption
    | TooltipComponentOption
    | ToolboxComponentOption
    | GridComponentOption
    | LineSeriesOption
>




const option = ref<EChartsOption>({
    title: {
        text: "请求数走势图"
    },
    tooltip: {
        trigger: 'axis'
    },
    toolbox: {
        show: true,
        feature: {
            dataView: { readOnly: false },
            // restore: {},
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        // boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line',
            smooth: true
        }
    ]
});

</script>



<style scoped>
.chart {
    height: 400px;
}
</style>