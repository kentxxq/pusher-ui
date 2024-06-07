<template>
    <div>
        欢迎来到这里, 说明你登录成功了
        <v-chart class="chart" :option="option" />
    </div>
</template>



<script lang="ts" setup>

defineOptions({
    name: 'page-home'
})

// import "echarts";
// import { THEME_KEY } from 'vue-echarts';
// import { provide, ref } from 'vue';

import { use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { ComposeOption } from 'echarts/core'
import type { PieSeriesOption } from 'echarts/charts'
import type {
    TitleComponentOption,
    TooltipComponentOption,
    LegendComponentOption
} from 'echarts/components'
import { provide, ref } from 'vue';
import { THEME_KEY } from 'vue-echarts';

use([
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer
])

type EChartsOption = ComposeOption<
    | TitleComponentOption
    | TooltipComponentOption
    | LegendComponentOption
    | PieSeriesOption
>



provide(THEME_KEY, "dark");

const option = ref<EChartsOption>({
    title: {
        text: "Traffic Sources",
        left: "center"
    },
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: "vertical",
        left: "left",
        data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"]
    },
    series: [
        {
            name: "Traffic Sources",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
                { value: 335, name: "Direct" },
                { value: 310, name: "Email" },
                { value: 234, name: "Ad Networks" },
                { value: 135, name: "Video Ads" },
                { value: 1548, name: "Search Engines" }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                }
            }
        }
    ]
});

</script>



<style scoped>
.chart {
    height: 400px;
}
</style>