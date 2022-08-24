<template>
<!--    外出拜访企业情况-->
    <el-card>
        <!--操作按钮-->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="info.query" prefix-icon="el-icon-search" placeholder="请输入内容" clearable/>
            </el-form-item>

            <el-form-item>
                <el-button type="primary">搜索</el-button>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="addDialogVisible = true">添加</el-button>
            </el-form-item>

            <el-form-item>
                <el-button type="danger" @click="sendRequest">发送请求</el-button>
            </el-form-item>
        </el-form>

        <!-- 表格内容-->
        <el-table :data="tableData"  v-loading="loading" border stripe height="700" style="width: 100%">
            <el-table-column type="selection"/>
            <el-table-column type="index" label="序号"/>
            <el-table-column prop="username" label="引进战队"/>
            <el-table-column prop="email" label="引进部门"/>
            <el-table-column prop="mtime" label="上报时间"/>
            <el-table-column prop="nickname" label="项目名称"/>
            <el-table-column prop="score" label="项目简介"/>
            <el-table-column prop="rank" label="产业分类"/>
            <el-table-column prop="mobile" label="其他产业具体内容"/>
            <el-table-column prop="stars" label="计划投资(亿元)"/>
            <el-table-column prop="mobile" label="投资公司名称"/>
            <el-table-column prop="mobile" label="投资方介绍"/>
            <el-table-column prop="mobile" label="企业负责人及联系方式"/>
            <el-table-column prop="mobile" label="企业类型"/>
            <el-table-column prop="mobile" label="项目进展情况"/>
            <el-table-column prop="mobile" label="下一步推进计划"/>
            <el-table-column prop="mobile" label="导出"/>
            <el-table-column prop="role_name" label="角色"/>
            <el-table-column prop="mg_state" label="状态">
                <template v-slot="slotProps">
                    <el-switch v-model="slotProps.row.status" @change="changeStatus(slotProps.row)"/>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="操作" width="180">
                <template v-slot="slotProps">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                        <el-button type="primary" icon="el-icon-edit" circle @click="showEditDialog(slotProps.row.id)"/>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="导出" placement="bottom">
                        <el-button type="warning" icon="el-icon-download" circle @click="roleDialog(slotProps.row)"/>
                    </el-tooltip>
                    <el-popconfirm
                        confirm-button-text="确定"
                        cancel-button-text="取消"
                        icon="el-icon-info"
                        icon-color="red"
                        title="你确定要删除该用户吗?"
                        @confirm="deleteUser(slotProps.row.id)"

                    >
                        <template #reference>
                            <el-button type="danger" icon="el-icon-delete" circle/>
                        </template>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <el-pagination
            :current-page="info.pageNum"
            :page-size="info.pageSize"
            :page-sizes="[5, 10, 20, 50]"
            :small="false"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            :background="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </el-card>
</template>

<script>
export default {
name: "VisitingEnterprises",
    data() {
        return {
            info: {
                query: '',
                pageNum: 1,
                pageSize: 5
            },
            total: 0,
            loading:true,
            tableData: []
        }
    },
    created() {
        this.sendRequest()
    },
    methods: {
        sendRequest() {
            this.axios.get('/user/test').then(res => {
                this.loading = false;    //取消表格加载状态
                this.total = res.data.data.length;  //总数据条数
                this.tableData = res.data.data;     //获取的表格数据
                console.log(res.data)
            })
        },
        // 分页每页条数
        handleSizeChange(val) {
            this.info.pagesize = val;
            this.sendRequest();
            console.log(`每页 ${val} 条`);
        },
        // 分页当前页码
        handleCurrentChange(val) {
            this.info.pagenum = val;
            this.sendRequest();
            console.log(`当前页: ${val}`);
        }
    }
}
</script>

<style scoped>

</style>