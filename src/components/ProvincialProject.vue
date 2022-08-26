<template>
    <!--    省市级重点项目-->
    <el-card>
        <!--操作按钮-->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="info.query" prefix-icon="el-icon-search" placeholder="请输入内容" clearable/>
            </el-form-item>

            <el-form-item>
                <el-button type="primary"><i class="el-icon-search" ></i> 搜 索</el-button>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="addDialogVisible = true"><i class="el-icon-circle-plus-outline" ></i> 添 加</el-button>
            </el-form-item>

            <el-form-item>
                <el-button type="danger" @click="deleteAll(tableChecked)" :disabled="this.tableChecked.length != 0 ? false : true"><i class="el-icon-delete" ></i> 批量删除</el-button>
            </el-form-item>

            <el-form-item>

                <el-button type="info" @click="sendRequest">发送请求</el-button>
            </el-form-item>

            <el-form-item>
<!--                <el-button type="info" @click="sendRequest">发送请求</el-button>-->
                <span>请选择年份： </span>
                <el-select v-model="optionValue" placeholder="请选择" @change="optionChecked">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <!-- 表格内容-->
        <el-table :data="tableData"  v-loading="loading" border stripe height="720" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection"/>
            <el-table-column type="index" label="序号"/>
            <el-table-column prop="id" label="项目名称" />
            <el-table-column prop="f_projectLegalPersons" label="项目法人" />
            <el-table-column prop="f_constructionQuality" label="建设性质" sortable>
                <template slot-scope="scope">
                    <el-tag  :type="scope.row.age == 21 ?  'success' : (scope.row.age == 22 ? '' : 'danger') ">{{scope.row.age}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="f_porojectTypeID" label="项目类型" sortable/>
            <el-table-column prop="f_constructionSite" label="建设地点"/>
            <el-table-column prop="f_approveFile" label="批准文件"/>
            <el-table-column prop="f_mainContent" label="主要建设内容及规模"/>
            <el-table-column prop="mobile" label="建设用地面积(亩)"/>
            <el-table-column prop="f_startAndEndYears" label="建设起止年限"/>
            <el-table-column prop="f_sumInvestment" label="总投资"/>
            <el-table-column prop="f_yearInvestment" :label="optionValue + '年底累计完成投资'"/>
            <el-table-column  :label=" parseInt(optionValue ) + 1 + '年计划'">
                <el-table-column prop="f_nextYearPlanInvestment" label="投资"/>
                <el-table-column prop="f_nextYearContent" label="主要建设内容"/>
            </el-table-column>
            <el-table-column prop="f_imageProgress" label="形象进度"/>
            <el-table-column prop="f_commencementStatus" label="开工状态"/>
            <el-table-column prop="f_lnboundStatus" label="入库状态"/>
            <el-table-column prop="role_name" label="责任单位"/>
            <el-table-column prop="f_contact" label="联系人"/>
            <el-table-column prop="f_phone" label="联系电话"/>
            <el-table-column prop="role_name" label="包联领导"/>
            <el-table-column prop="f_remark" label="备注"/>
            <el-table-column prop="status" label="调度管理">
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
name: "ProvincialProject",
    data() {
        return {
            info: {
                query: '',
                pageNum: 1,
                pageSize: 5
            },
            total: 0,
            loading: true,
            tableData: [],
            tableChecked: [],    //被选中的记录数据-----对应“批量删除”传的参数值
            idArr: [],   //批量删除id
            //下拉菜单选择
            options: [
                {
                    value: '2022',
                    label: '2022年',
                },
                {
                    value: '2023',
                    label: '2023年'
                },
                {
                    value: '2024',
                    label: '2024年'
                }
            ],
            optionValue: '2022'
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
        //分页:每页条数
        handleSizeChange(val) {
            this.info.pageSize = val;
            this.sendRequest();
            console.log(`每页 ${val} 条`);
        },
        //分页:当前页码
        handleCurrentChange(val) {
            this.info.pageNum = val;
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
        //下拉框选择的年份
        optionChecked(val){
            console.log('下拉框',val)
        }

    }
}
</script>

<style scoped>

</style>