<template>
    <el-container id="app">

        <el-aside width="200px" style="overflow:auto">
            <HomeMenu class="heightAll"></HomeMenu>
        </el-aside>

        <el-container>
            <!--头部-->
            <el-header>
                <span class="headTitle">Zhao Luo Fu</span>
            </el-header>

            <!--内容-->
            <el-main>
                <router-view></router-view>
            </el-main>

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
    overflow-x: hidden;
    //overflow-y:hidden;
    //overflow-y: scroll;
}



.el-header {
    text-align: center;
    color: white;
    font-size: 5vh;
    //opacity:0.7;
    //filter: blur(20px);


    display:flex;
    justify-content:center;
    align-items: center;

    margin: 10px 10px 4px 16px;
    border-radius: 4px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);


    &::before{//将背景和高斯模糊全部设置在了伪元素内，并让伪元素的z-index为-1，避免遮盖其他元素
        content: '';
        width: 86%;
        height: 8%;
        position: absolute;
        z-index: -1;
        //background: url('../images/tudou.jpg');
        filter: blur(20px);
        //-webkit-filter: blur(3px);

        background: linear-gradient(90deg, #ffc700 0%, #e91e1e 33%, #6f27b0 66%, #00ff88 100%) 100% 0;
        animation: bgSize 5s infinite ease-in-out alternate;
    }

    .headTitle{
        //backdrop-filter: blur(20px);
        font-family:'等线';
    }
}

@keyframes bgSize {
    0% {
        background-size: 300% 100%;
    }
    100% {
        background-size: 100% 100%;
    }
}

.el-aside {
    line-height: 100vh;
    border-radius: 4px;
    background-color: #6b9080;

    //border-radius: var(--el-border-radius-base);
    box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);

    margin: 10px 0 16px 16px;
}

.el-main {
    //background-color: #f8f9fa;
    //margin: 2px 0 0 1px;
}



</style>
