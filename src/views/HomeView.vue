<template>
    <el-container id="app">
        <el-header>
<!--            <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
<!--                <el-radio-button :label="false">展开</el-radio-button>-->
<!--                <el-radio-button :label="true">收起</el-radio-button>-->
<!--            </el-radio-group>-->
        </el-header>
        <el-container>
            <el-aside width="200px" style="overflow:auto">
<!--                <el-scrollbar style="height: 100%">-->
                    <!--菜单-->
                    <HomeMenu class="heightAll"></HomeMenu>
<!--                </el-scrollbar>-->
            </el-aside>

<!--                内容-->
                <el-main>
                    <router-view></router-view>
                </el-main>
<!--                底部-->
<!--                <el-footer>Footer</el-footer>-->

        </el-container>
    </el-container>
</template>

<script>
import HomeMenu from '@/components/HomeMenu'

export default {
    name: 'HomeView',
    components:{
        HomeMenu
    },
    data(){
        return{
            isCollapse:true
        }
    }
}
</script>

<style lang="scss" scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    //text-align: center;
    height: 100%;
}

.heightAll{
    height: 100%;
}

.el-header {
    background-color: #c8c9cc;
}

.el-aside {
    line-height: 100vh;
    border-radius: 20px;
    background-color: #6b9080;
}

.el-main {
    background-color: #f8f9fa;
}



</style>
