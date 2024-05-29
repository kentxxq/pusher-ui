<template>
    <div>
        <el-row justify="space-between">
            <div class="left-container">
                <el-button type="primary" @click="openCreateChannel"> 新建管道 </el-button>
                <el-button type="danger" :disabled="selectedRows.length === 0"
                    @click="deleteVisible = true">删除管道</el-button>
                <div v-if="selectedRows.length !== 0" class="selected-count">
                    你选择了{{ selectedRows.length }}个管道
                </div>
            </div>

            <div class="right-container">
                <el-input style="width: 10rem;" placeholder="搜索管道名" v-model="searchValue" clearable>
                </el-input>
                <el-button @click="searchChannel">
                    <SvgIcon name="refresh" />
                </el-button>
            </div>
        </el-row>

        <div style="margin-top: 1rem;">
            <el-table ref="tableRef" :data="searchData" :table-layout="'auto'" @selection-change="handleSelectionChange"
                @row-click="rowClick">
                <el-table-column type="selection" width="50" />
                <el-table-column prop="channelName" label="管道名称" width="160" />
                <el-table-column prop="channelType" label="管道类型" width="160">
                    <template #default="scope">
                        <el-tag>{{ channelTypeOptions.filter(o => o.enumKey ===
                            scope.row.channelType)[0].enumDisplayName }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="channelUrl" :show-overflow-tooltip="true" label="管道地址" />
                <el-table-column fixed="right" label="操作">
                    <template #default="scope">
                        <el-button type="success" size="small" @click.stop="TestChannel(scope.row.id)">
                            发送测试信息
                        </el-button>
                        <el-button type="primary" size="small" @click.stop="copyUrl(scope.row.channelUrl)">
                            复制url
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 创建 -->
        <el-dialog v-model="createChannelVisible" title="创建管道" @close="onCreateChannelClose">
            <el-form ref="formRef" style="padding: 1rem;" :model="formData" :rules="rules">
                <el-form-item label="管道名称" prop="channelName">
                    <el-input v-model="formData.channelName" placeholder="请输入内容" />
                </el-form-item>
                <el-form-item label="管道类型" prop="channelType">
                    <el-select v-model="formData.channelType" placeholder="请选择" size="large">
                        <el-option v-for="option in channelTypeOptions" :key="option.enumKey"
                            :label="option.enumDisplayName" :value="option.enumKey" />
                    </el-select>
                </el-form-item>
                <el-form-item label="管道地址" prop="channelUrl">
                    <el-input v-model="formData.channelUrl" placeholder="请输入内容" />
                </el-form-item>
                <el-form-item label="代理地址" prop="channelProxyUrl">
                    <el-input v-model="formData.channelProxyUrl" placeholder="请输入内容" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="onCreateChannelClose">取消</el-button>
                    <el-button type="primary" @click="onCreateChannelConfirm">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>

        <!-- 删除 -->
        <el-dialog v-model="deleteVisible" title="确认删除？" @close="deleteVisible = false">
            <p v-for="selectRow in selectedRows" :key="selectRow.id">
                <el-tag>{{ channels.filter(r => r.id === selectRow.id)[0].channelName }}</el-tag>
            </p>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="deleteVisible = false">取消</el-button>
                    <el-button type="primary" @click="onDeleteChannelConfirm">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import { computed, onMounted, reactive, ref } from 'vue';
import type { Channel, CreateChannelRO } from '@/types/pusher/channel'
import { channelCreateChannelApi, channelDeleteChannelApi, channelGetUserChannelsApi, channelSendTestMessageToChannelApi, } from '@/api/channel';
import type { EnumObject } from '@/types/pusher/common';
import { enumChannelEnumApi } from '@/api/enumapi';
import { ElMessage, ElTable, type FormInstance, type FormRules } from 'element-plus';
import useClipboard from 'vue-clipboard3'

// 初始化/生命周期
defineOptions({
    name: 'ChannelIndex'
})
const channelTypeOptions = ref<Array<EnumObject>>([])
onMounted(async () => {
    channelTypeOptions.value = await enumChannelEnumApi()
    await searchChannel()
})

// 表格
// 操作
const copyUrl = (content: string) => {
    const { toClipboard } = useClipboard()
    toClipboard(content)
    ElMessage({
        message: `已拷贝到粘贴板`,
        type: 'success',
    })
}
const TestChannel = async (channelId: number) => {
    if (await channelSendTestMessageToChannelApi(channelId)) {
        ElMessage({
            message: "发送成功",
            type: 'success'
        })
    }
}

let channels = ref<Channel[]>([])

// 搜索按钮
const searchValue = ref('');
const searchData = computed(() => {
    return channels.value.filter(c => c.channelName.indexOf(searchValue.value) !== -1);
})
async function searchChannel() {
    channels.value = await channelGetUserChannelsApi()
}

// 创建管道
const formRef = ref<FormInstance>()
const formData: CreateChannelRO = reactive({
    channelName: '',
    channelType: 0,
    channelUrl: '',
    channelProxyUrl: ''
});
function resetFormData() {
    formData.channelName = ''
    formData.channelType = 0
    formData.channelUrl = ''
    formData.channelProxyUrl = ''
}

const rules = reactive<FormRules<CreateChannelRO>>({
    channelName: [
        { required: true, message: '必填', trigger: 'blur' }
    ],
    channelType: [
        { required: true, message: '必填', trigger: 'blur' },
    ],
    channelUrl: [
        { required: true, message: '必填', trigger: 'blur' },
        { type: 'url', message: '请输入正确的 Url 地址', trigger: 'blur' }
    ],
    channelProxyUrl: [
        { type: 'url', message: '请输入正确的 Url 地址', trigger: 'blur' }
    ]
})
const createChannelVisible = ref(false)
function openCreateChannel() {
    createChannelVisible.value = true
}
async function createChannel(createChannelRO: CreateChannelRO) {
    var result = await channelCreateChannelApi(createChannelRO)
    ElMessage({
        message: `成功创建管道${result}`,
        type: 'success',
    })
}
async function onCreateChannelConfirm() {
    if (!formRef.value) return
    await formRef.value.validate(async (valid, fields) => {
        if (valid) {
            await createChannel({ ...formData })
            createChannelVisible.value = false
            resetFormData()
            await searchChannel()
        } else {
            ElMessage({
                message: `校验不通过`,
                type: 'warning',
            })
        }
    })
}
function onCreateChannelClose() {
    resetFormData()
    createChannelVisible.value = false
}



// 删除管道
const selectedRows = ref<Channel[]>([])
// 选中就赋值
const handleSelectionChange = (val: Channel[]) => {
    selectedRows.value = val
}
const tableRef = ref<InstanceType<typeof ElTable>>()
const rowClick = (row: Channel, column: any, event: Event) => {
    if (selectedRows.value.some(r => r.id === row.id)) {
        tableRef.value?.toggleRowSelection(row, false)
    } else {
        tableRef.value?.toggleRowSelection(row, true)
    }
}
const deleteVisible = ref(false)
const onDeleteChannelConfirm = async () => {
    var deleteKeys = selectedRows.value!.map(row => row.id);
    const result = await channelDeleteChannelApi(deleteKeys)
    deleteVisible.value = false;
    await searchChannel()
    ElMessage({
        message: `成功删除${result}个管道`,
        type: 'success',
    })
};

</script>



<style scoped>
.left-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem
}

.right-container {
    display: flex;
    gap: 1rem
}
</style>