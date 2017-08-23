<template>
    <div class="app-container">
        <div class="news-detail-title"><span class="news-detail-border">文章标题</span></div>
        <p class="news-detail-time">2017-5-19 19:10</p>
        <div class="news-detail-box">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
        </div>
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
.news-detail-title {
    width: 800px;
    margin: 10px auto 0;
    font-size: 18px;
    font-weight: bold;
}
.news-detail-border {
    display: inline-block;
    border-bottom: 1px solid rgb(51,51,51);
    line-height: 40px;
}
.news-detail-time {
    width: 800px;
    margin: 15px auto;
    font-size: 14px;
    color: #666;
}
.news-detail-box {
    width: 800px;
    padding: 5px 10px;
    margin: 0 auto;
    background: #f2f2f2;
}
</style>
