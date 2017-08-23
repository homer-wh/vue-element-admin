<template>
    <div class="app-container">
        <div class="dashboard-title"><span class="vertical-line-b">&nbsp;</span>公告消息<span class="dashboard-title-line"></span></div>
        <ul class="dashboard-news-box">
            <router-link to="/newsdetail">
                <li class="dashboard-news-item">事件营销八大策略和注意事项<span class="news-item-right">2017-5-19 19:10</span></li>
            </router-link>
            <router-link to="/newsdetail">
                <li class="dashboard-news-item">事件营销八大策略和注意事项<span class="news-item-right">2017-5-19 19:10</span></li>
            </router-link>
            <router-link to="/newsdetail">
                <li class="dashboard-news-item">事件营销八大策略和注意事项<span class="news-item-right">2017-5-19 19:10</span></li>
            </router-link>
            <router-link to="/newsdetail">
                <li class="dashboard-news-item">事件营销八大策略和注意事项<span class="news-item-right">2017-5-19 19:10</span></li>
            </router-link>
            <router-link to="/newsdetail">
                <li class="dashboard-news-item">事件营销八大策略和注意事项<span class="news-item-right">2017-5-19 19:10</span></li>
            </router-link>
            <router-link to="/newsdetail">
                <li class="dashboard-news-item">事件营销八大策略和注意事项<span class="news-item-right">2017-5-19 19:10</span></li>
            </router-link>
            <router-link to="/newsdetail">
                <li class="dashboard-news-item">事件营销八大策略和注意事项<span class="news-item-right">2017-5-19 19:10</span></li>
            </router-link>
            <router-link to="/newsdetail">
                <li class="dashboard-news-item">事件营销八大策略和注意事项<span class="news-item-right">2017-5-19 19:10</span></li>
            </router-link>
            <router-link to="/newsdetail">
                <li class="dashboard-news-item">事件营销八大策略和注意事项<span class="news-item-right">2017-5-19 19:10</span></li>
            </router-link>
            <router-link to="/newsdetail">
                <li class="dashboard-news-item">事件营销八大策略和注意事项<span class="news-item-right">2017-5-19 19:10</span></li>
            </router-link>
            <router-link to="/newsdetail">
                <li class="dashboard-news-item">事件营销八大策略和注意事项<span class="news-item-right">2017-5-19 19:10</span></li>
            </router-link>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style>
.dashboard-title {
    width: 800px;
    margin: 60px auto 0;
    font-weight: 400;
}
.vertical-line-b {
    border-left: 4px solid #333;
}
.dashboard-title-line {
    display: inline-block;
    width: 716px;
    border-top: 2px solid #e9e9e9;
    vertical-align: middle;
    margin-left: 10px;
}
.dashboard-news-box {
    width: 800px;
    margin:10px auto;
    list-style: none;
    padding-left: 20px;
}
.dashboard-news-item {
    line-height: 30px;
    margin: 10px 0;
    font-size: 14px;
    color: #666;
}
.news-item-right {
    float: right;
}
</style>
