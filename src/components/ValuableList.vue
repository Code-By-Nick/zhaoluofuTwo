<template>
    <!--    有价值项目列表-->
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
                <el-button type="danger" @click="deleteAll(tableChecked)" :disabled="this.tableChecked.length != 0 ? false : true">批量删除</el-button>
            </el-form-item>

            <el-form-item>
                <el-button type="info" @click="sendRequest">发送请求</el-button>
            </el-form-item>
        </el-form>

        <!-- 表格内容-->
        <el-table :data="tableData"  v-loading="loading" border stripe height="700" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection"/>
            <el-table-column type="index" label="序号"/>
            <el-table-column prop="id" label="引进战队" sortable/>
            <el-table-column prop="company" label="引进部门" />
            <el-table-column prop="age" label="上报时间" sortable>
                <template slot-scope="scope">
                    <el-tag  :type="scope.row.age == 21 ?  'success' : (scope.row.age == 22 ? '' : 'danger') ">{{scope.row.age}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="username" label="项目名称"/>
            <el-table-column prop="mobile" label="项目简介"/>
            <el-table-column prop="mobile" label="产业分类"/>
            <el-table-column prop="mobile" label="其他产业具体内容"/>
            <el-table-column prop="mobile" label="计划投资(亿元)"/>
            <el-table-column prop="mobile" label="投资公司名称"/>
<!--            <el-table-column prop="mobile" render-header="werwe" />-->
            <el-table-column prop="mobile" label="投资方介绍"/>
            <el-table-column prop="mobile" label="企业负责人及联系方式"/>
            <el-table-column prop="mobile" label="企业类型"/>
            <el-table-column prop="mobile" label="项目进展情况"/>
            <el-table-column prop="mobile" label="下一步推进计划"/>
            <el-table-column prop="mobile" label="导出"/>
            <el-table-column prop="role_name" label="角色"/>
            <el-table-column prop="status" label="状态">
                <template v-slot="slotProps">
                    <el-switch v-model="slotProps.row.status" @change="changeStatus(slotProps.row)"/>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="操作" width="180">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编 辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删 除</el-button>
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
    name: "ValuableList",
    data() {
        return {
            info: {
                query: '',
                pageNum: 1,
                pageSize: 5
            },
            total: 0,
            loading:true,
            tableData: [],
            tableChecked:[],    //被选中的记录数据-----对应“批量删除”传的参数值
            idArr:[]   //批量删除id
        }
    },
    created() {
        this.sendRequest()
    },
    methods: {
        sendRequest() {
            this.axios.get('/user/list').then(res => {
                this.loading = false;    //取消表格加载状态
                this.total = res.data.data.length;  //总数据条数
                this.tableData = res.data.data;     //获取的表格数据
                //console.log(res.data.data)
            })
        },
        //批量删除
        deleteAll(rows){


            console.log(rows)

            let _this = this;
            _this.$confirm('是否确认此操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                rows.forEach(element =>{
                    _this.idArr.push(element.id)
                })

                console.log(_this.idArr)

                _this.axios.post('/data/delete',{ids:_this.idArr}).then(res => {
                    console.log(res)
                })

        /*        let param = {
                    "token": getSessiontoken('token'),
                    "chargingStationIdList":_this.ids
                }*/
          /*      deleteAllCharging(param).then(function (res) {
                    var obj = JSON.parse(utilFile.decrypt(res.data.a));
                    if (obj.code == '200') {
                        _this.$message.success('操作成功');
                        _this.chargingUserList();
                    } else {
                        _this.$message.error(obj.msg);
                    }
                }).catch(function (err) {
                    console.log(err);
                })*/

            }).catch(() => {
                alert(2)
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        //分页的每页条数
        handleSizeChange(val) {
            this.info.pagesize = val;
            this.sendRequest();
            console.log(`每页 ${val} 条`);
        },
        //分页的当前页面
        handleCurrentChange(val) {
            this.info.pagenum = val;
            this.sendRequest();
            console.log(`当前页: ${val}`);
        },
        //表格数据选中的条
        handleSelectionChange(val) {
            console.log("handleSelectionChange--",val)
            this.tableChecked = val;
            //console.log('输出',this.tableChecked )
            //console.log(Object.prototype.toString.call(this.tableChecked))
            //.log(this.tableChecked.length == 0 ? false : true)
        },

    }
}
</script>

<style scoped>
.el-card {
    height: 100%;
}

</style>