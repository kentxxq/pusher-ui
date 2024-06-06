<template>
    <div>
        <!-- 查询表单 -->
        <el-row justify="space-between">
            <div class="left-container">
                <el-button type="primary" @click="openCreateRoom"> 新建房间 </el-button>
                <el-button type="danger" :disabled="selectedRows.length === 0"
                    @click="deleteVisible = true">删除房间</el-button>
                <div v-if="selectedRows.length !== 0" class="selected-count">
                    你选择了{{ selectedRows.length }}个房间
                </div>
            </div>

            <div class="right-container">
                <el-input style="width: 10rem;" placeholder="搜索房间名" v-model="searchValue" clearable>
                </el-input>
                <el-button @click="searchRoom">
                    <SvgIcon name="refresh" />
                </el-button>
            </div>
        </el-row>

        <!-- 表格 -->
        <div style="margin-top: 1rem;">
            <el-table ref="tableRef" :data="searchData" :table-layout="'auto'" @selection-change="handleSelectionChange"
                @row-click="rowClick">
                <el-table-column type="selection" width="50" />
                <el-table-column prop="roomName" label="房间名" width="160" />
                <el-table-column prop="roomCode" :show-overflow-tooltip="true" label="房间代码" />
                <!-- <el-table-column prop="roomKey" label="房间密钥" />
                <el-table-column prop="customRoomName" label="自定义房间代码" /> -->
                <el-table-column prop="createDate" label="创建时间">
                    <template #default="scope">
                        {{ timeformat(scope.row.createDate) }}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作">
                    <template #default="scope">
                        <el-button type="primary" size="small" @click.stop="UpdateRoomChannel(scope.row.id)">
                            关联管道
                        </el-button>
                        <el-button type="success" size="small" @click.stop="SendTestMessage(scope.row.roomCode)">
                            发送测试信息
                        </el-button>
                        <el-button type="info" size="small" @click.stop="CopyUrl(scope.row.roomCode, 'Get')">
                            复制get地址
                        </el-button>
                        <el-button type="info" size="small" @click.stop="CopyUrl(scope.row.roomCode, 'Post')">
                            复制post地址
                        </el-button>
                        <el-button size="small" @click.stop="ShowRoomMessageHistory(scope.row.id)">
                            消息记录
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 新增 -->
        <el-dialog v-model="roomVisible" title="创建房间" @close="onCreateRoomClose">
            <el-input v-model="roomName" placeholder="请输入房间名" />
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="onCreateRoomClose">取消</el-button>
                    <el-button type="primary" @click="onCreateRoomConfirm">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>

        <!-- 删除 -->
        <el-dialog v-model="deleteVisible" title="确认删除？" @close="deleteVisible = false">
            <p v-for="selectRow in selectedRows" :key="selectRow.id">
                <el-tag>{{ rooms.filter(r => r.id === selectRow.id)[0].roomName }}</el-tag>
            </p>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="deleteVisible = false">取消</el-button>
                    <el-button type="primary" @click="onDeleteRoomConfirm">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>

        <!-- 关联 -->
        <el-dialog v-model="relationVisible" title="管道配置" @close="onCreateRoomClose">
            <div style="display: flex;justify-content: center;align-items: center;">
                <el-transfer v-model="roomChannelIds" :data="transferData" :titles="['未加入的房间', '已加入的房间']" filterable />
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="onRelationClose">取消</el-button>
                    <el-button type="primary" @click="onRelationConfirm">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>

        <!-- 消息记录 -->
        <el-dialog v-model="historyVisible" title="消息记录" @close="historyVisible = false">
            <el-table :data="history" :table-layout="'auto'">
                <el-table-column prop="content" label="文本内容" width="180" />
                <el-table-column prop="recordTime" label="时间">
                    <template #default="scope">
                        {{ timeformat(scope.row.recordTime) }}
                    </template>
                </el-table-column>
            </el-table> <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="historyVisible = false">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import { roomCreateRoomApi, roomDeleteRoomApi, roomGetRoomsApi, roomSendMessageByGetApi, roomGetRoomChannelsApi, roomUpdateRoomChannelApi, roomGetRoomMessageHistoryApi } from '@/api/room';
import { computed, onMounted, ref } from 'vue';
import type { Room, RoomMessageHistorySO } from '@/types/pusher/room'
import { ElMessage, ElTable } from 'element-plus';
import { timeformat } from '@/utils/convert';
import type { Channel } from '@/types/pusher/channel';
import { channelGetUserChannelsApi } from '@/api/channel';
import useClipboard from 'vue-clipboard3'



defineOptions({
    name: 'RoomIndex'
})


let rooms = ref<Room[]>([])
const searchValue = ref('');
const searchData = computed(() => {
    return rooms.value.filter(r => r.roomName.indexOf(searchValue.value) !== -1);
})

onMounted(async () => {
    await searchRoom()
})

// 搜索按钮
async function searchRoom() {
    rooms.value = await roomGetRoomsApi()
}

// 创建房间
const roomVisible = ref(false)
const roomName = ref('')
function openCreateRoom() {
    roomVisible.value = true
}
async function createRoom(roomName: string) {
    var result = await roomCreateRoomApi(roomName)
    ElMessage({
        message: `成功创建${result}个房间`,
        type: 'success',
    })
}
async function onCreateRoomConfirm() {
    await createRoom(roomName.value)
    roomVisible.value = false
    roomName.value = ''
    await searchRoom()
}
function onCreateRoomClose() {
    roomName.value = ''
    roomVisible.value = false
}

// 删除房间
const tableRef = ref<InstanceType<typeof ElTable>>()
const rowClick = (row: Room, column: any, event: Event) => {
    if (selectedRows.value.some(r => r.id === row.id)) {
        tableRef.value?.toggleRowSelection(row, false)
    } else {
        tableRef.value?.toggleRowSelection(row, true)
    }
}
const deleteVisible = ref(false)
// 选中了行
const selectedRows = ref<Room[]>([])
// 选中就赋值
const handleSelectionChange = (val: Room[]) => {
    selectedRows.value = val
}
const onDeleteRoomConfirm = async () => {
    var deleteKeys = selectedRows.value!.map(row => row.id);
    const result = await roomDeleteRoomApi(deleteKeys)
    deleteVisible.value = false;
    await searchRoom()
    ElMessage({
        message: `成功删除${result}个房间`,
        type: 'success',
    })
};


// 操作
// 关联管道
const relationVisible = ref(false)
const roomChannelIds = ref<number[]>([])
const allChannels = ref<Channel[]>([])

interface Option {
    key: number
    label: string
    disabled: boolean
}

const transferData = ref<Option[]>()
const relationRoomId = ref<number>()
const UpdateRoomChannel = async (roomId: number) => {
    relationRoomId.value = roomId
    relationVisible.value = true
    // 拿到管道数据
    allChannels.value = await channelGetUserChannelsApi()
    transferData.value = allChannels.value.map(c => { return { key: c.id, label: c.channelName, disabled: false } })
    // 拿到房间的管道
    const roomChannels = await roomGetRoomChannelsApi(roomId)
    roomChannelIds.value = roomChannels.map(r => r.id)
}
const onRelationConfirm = async () => {
    const result = await roomUpdateRoomChannelApi({ roomId: relationRoomId.value!, channelIds: roomChannelIds.value })
    ElMessage({
        message: `更新后房间的管道数量:${result}`,
        type: 'success'
    })
    relationVisible.value = false
}
const onRelationClose = () => {
    relationVisible.value = false
}

// 复制url
const GetUrlByMethod = (url: string, method: string) => {
    if (method == 'Get') {
        return `${window.location.protocol}//${window.location.host}/Room/SendMessageBy${method}/${url}?content=消息内容`
    } else {
        return `${window.location.protocol}//${window.location.host}/Room/SendMessageBy${method}/${url}`
    }
}

const CopyUrl = (url: string, method: string) => {
    const { toClipboard } = useClipboard()
    toClipboard(GetUrlByMethod(url, method))
    ElMessage({
        message: `已拷贝到粘贴板`,
        type: 'success',
    })
}

// 发送测试消息
const SendTestMessage = async (roomCode: string) => {
    var result = await roomSendMessageByGetApi(roomCode, "测试内容\nby pusher")
    ElMessage({
        message: result,
        type: 'success',
    })
}


// 查看消息记录
const historyVisible = ref(false)
const history = ref<RoomMessageHistorySO[]>([])
const ShowRoomMessageHistory = async (roomId: number) => {
    history.value = await roomGetRoomMessageHistoryApi(roomId)
    historyVisible.value = true
}

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