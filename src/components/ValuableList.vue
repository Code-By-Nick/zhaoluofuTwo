<template>
    <el-card>
        <el-form :inline="true"  class="demo-form-inline">
            <el-form-item>
                <el-input v-model="info.query" prefix-icon="el-icon-search" placeholder="请输入内容" clearable />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" >搜索</el-button>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="addDialogVisible = true">添加</el-button>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="sendRequest">发送</el-button>
            </el-form-item>
        </el-form>

        <!-- 表格-->
        <el-table :data="tableData" border stripe height="380" style="width: 100%">
            <el-table-column type="selection" width="55"/>
            <el-table-column type="index" label="序号" />
            <el-table-column prop="username" label="引进战队" />
            <el-table-column prop="email" label="引进部门" />
            <el-table-column prop="mobile" label="上报时间" />
            <el-table-column prop="mobile" label="项目名称" />
            <el-table-column prop="mobile" label="项目简介" />
            <el-table-column prop="mobile" label="产业分类" />
            <el-table-column prop="mobile" label="其他产业具体内容" />
            <el-table-column prop="mobile" label="计划投资(亿元)" />
            <el-table-column prop="mobile" label="投资公司名称" />
            <el-table-column prop="mobile" label="投资方介绍" />
            <el-table-column prop="mobile" label="企业负责人及联系方式" />
            <el-table-column prop="mobile" label="企业类型" />
            <el-table-column prop="mobile" label="项目进展情况" />
            <el-table-column prop="mobile" label="下一步推进计划" />
            <el-table-column prop="mobile" label="导出" />
            <el-table-column prop="role_name" label="角色" />
            <el-table-column prop="mg_state" label="状态" >
                <template v-slot="slotProps">
                    <el-switch v-model="slotProps.row.mg_state" @change="changeStatus(slotProps.row)"/>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="操作">
                <template v-slot="slotProps">
                    <el-button type="primary" :icon="Edit" circle @click="showEditDialog(slotProps.row.id)" />
                    <el-button type="warning" :icon="Setting" circle @click="roleDialog(slotProps.row)"  />
                    <el-popconfirm
                        confirm-button-text="确定"
                        cancel-button-text="取消"
                        :icon="InfoFilled"
                        icon-color="red"
                        title="你确定要删除该用户吗?"
                        @confirm="deleteUser(slotProps.row.id)"

                    >
                        <template #reference>
                            <el-button type="danger" :icon="Delete" circle  />
                        </template>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>

    </el-card>
</template>

<script>
//import axios from "axios";

export default {
name: "ValuableList",
    data(){
    return{
        info:{
            query:''
        },
        tableData:[]

    }
    },
    methods:{
        sendRequest(){
            this.axios.get('/user/list').then(res => {
                console.log(res.data.data)
            })
        }
    }
}
</script>

<style scoped>
.el-card{
    height: 100%;
}

</style>