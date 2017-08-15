<template>
    <div class="app-container">
        <div class="model-title clr">
            <div class="title-text"><span class="vertical-line-b">&nbsp;</span>添加模块</div>
            <div class="title-save-btn"><el-button type="primary" size="large">&nbsp;&nbsp;保&nbsp;&nbsp;存&nbsp;&nbsp;</el-button></div>
        </div>
    </div>
</template>

<style>
    .clr::after {
        content: '';
        display: table;
        clear: both;
    }
    .model-title {
        width: 80%;
        margin: 0 auto;
        padding: 40px;
        line-height: 40px;
        background: #f2f2f2;
    }
    .vertical-line-b {
        border-left: 4px solid #333;
    }
    .title-text {
        float: left;
        line-height: 1;
    }
    .title-save-btn {
        float: right;
    }
</style>