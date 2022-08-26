<template>
    <!--    省市级重点项目-->
    <div>
        <el-card>
            <!--操作按钮-->
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="info.query" prefix-icon="el-icon-search" placeholder="请输入内容" clearable/>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary"><i class="el-icon-search"></i> 搜 索</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="centerDialogVisible = true">
                        <i class="el-icon-circle-plus-outline"></i> 添 加
                    </el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="danger" @click="deleteAll(tableChecked)"
                               :disabled="this.tableChecked.length != 0 ? false : true"><i class="el-icon-delete"></i>
                        批量删除
                    </el-button>
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
            <el-table :data="tableData" v-loading="loading" border stripe height="720" style="width: 100%"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection"/>
                <el-table-column type="index" label="序号"/>
                <el-table-column prop="id" label="项目名称"/>
                <el-table-column prop="f_projectLegalPersons" label="项目法人"/>
                <el-table-column prop="f_constructionQuality" label="建设性质" sortable>
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.age == 21 ?  'success' : (scope.row.age == 22 ? '' : 'danger') ">
                            {{ scope.row.age }}
                        </el-tag>
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
                <el-table-column :label=" parseInt(optionValue ) + 1 + '年计划'">
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
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删 除
                        </el-button>
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

<!--        添加对话框-->
        <el-dialog
            title="添加数据"
            :visible.sync="centerDialogVisible"
            destroy-on-close
            width="45%"
            center>

            <span>需要注意的是内容是默认不居中的</span>

            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="活动名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="即时配送">
                    <el-switch v-model="form.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="活动性质">
                    <el-checkbox-group v-model="form.type">
                        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                        <el-checkbox label="地推活动" name="type"></el-checkbox>
                        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="特殊资源">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="线上品牌商赞助"></el-radio>
                        <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="活动形式">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
                <el-row>
<!--                一行显示两列-->
                    <el-col :span="11">
                        <el-form-item label="活动名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="活动名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="success" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
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
            centerDialogVisible: false, // 添加显示&隐藏
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
            optionValue: '2022',
            //添加的表单
            formLabelWidth:'80px',
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
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