<template>
    <el-menu default-active="5"
             class="el-menu-vertical-demo"
             background-color="#F2F6FC"
             active-text-color="#3662DC"
             router
             @open="handleOpen"
             @close="handleClose"
             :collapse="isCollapse">
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
                <span slot="title">分组一</span>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
                <span slot="title">选项4</span>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
        </el-submenu>

        <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
        </el-menu-item>
        <el-submenu index="5">
            <template slot="title">
                <i class="el-icon-tickets"></i>
                <span slot="title">项目信息</span>
            </template>
            <el-menu-item index="5-1">主导产业链数据</el-menu-item>
            <el-menu-item index="5-2">有价值项目列表</el-menu-item>
            <el-menu-item index="5-3">外出拜访企业情况</el-menu-item>
        </el-submenu>

        <el-submenu index="6">
            <template slot="title">
                <i class="el-icon-discount"></i>
                <span slot="title">项目跟踪</span>
            </template>
            <el-menu-item index="6-1">项目进度</el-menu-item>
            <el-menu-item index="6-2">项目全部详细情况</el-menu-item>
        </el-submenu>


        <el-menu-item index="7">
            <i class="el-icon-receiving"></i>
            <span slot="title">项目预审</span>
        </el-menu-item>

        <el-submenu index="8">
            <template slot="title">
                <i class="el-icon-document-checked"></i>
                <span slot="title">项目审核</span>
            </template>
            <el-menu-item index="8-1">4.1</el-menu-item>
            <el-menu-item index="8-2">4.2</el-menu-item>
        </el-submenu>


        <el-submenu index="10">
            <template slot="title">
                <i class="el-icon-magic-stick"></i>
                <span slot="title">测试</span>
            </template>
            <el-menu-item index="101">测试1</el-menu-item>
            <el-menu-item index="102">测试2</el-menu-item>
        </el-submenu>


        <el-menu-item index="8" disabled>
            <i class="el-icon-setting"></i>
            <span slot="title">项目审核</span>
        </el-menu-item>
        <el-menu-item index="8" disabled>
            <i class="el-icon-setting"></i>
            <span slot="title">项目审核</span>
        </el-menu-item>
        <el-menu-item index="8" disabled>
            <i class="el-icon-setting"></i>
            <span slot="title">项目审核</span>
        </el-menu-item>
        <el-menu-item index="8" disabled>
            <i class="el-icon-setting"></i>
            <span slot="title">项目审核</span>
        </el-menu-item>

    </el-menu>
</template>

<script>
export default {
    name: "HomeMenu",
    data() {
        return {
            isCollapse: false
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style scoped>

/*.el-menu-vertical-demo:not(.el-menu--collapse) {*/
/*    width: 200px;*/
/*    min-height: 400px;*/
/*}*/

</style>