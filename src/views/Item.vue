<template>
<div>
    <el-container>
        <el-header style="height: 20%">
            <el-page-header @back="goBack" content="详情页面">
            </el-page-header>
            <h3 style="text-align:center">{{$route.params.project_name}}</h3>
        </el-header>
        <el-container>
            <el-aside width="15%">
                <template v-if="items">
                    <el-row style="margin: 5px">
                        <span>进度：</span>
                        <el-progress :text-inside="true" :stroke-width="26" :percentage="percentage" style="display: inline-block;width:75%; margin: 5px;"></el-progress>
                    </el-row>
                    <el-row style="margin: 5px">
                        <span>默认跳转:</span>
                        <el-switch v-model="switch_value" active-color="#13ce66" inactive-color="#ff4949" style="margin: 5px;"></el-switch>
                    </el-row>
                </template>
            </el-aside>
            <el-container>
                <el-main>
                    <template v-if="items">
                        <div style="height: 300px">
                            <h1 style="padding: 10%">{{items[current_page].raw_data}}</h1>
                        </div>
                        <div v-if="data">
                            <el-radio-group v-model="radio">
                                <el-radio :label="class_item" v-for="(class_item, index) in data.classes" :key="index">{{class_item}}</el-radio>
                            </el-radio-group>
                        </div>
                        <el-row style="margin: 20px;">
                            <el-col :span="7" style="visibility:hidden;">
                                <span>fuck</span>
                            </el-col>
                            <el-col :span="2">
                                <el-button type="primary" icon="el-icon-arrow-left" circle @click="go_pre_page"></el-button>
                            </el-col>
                            <el-col :span="3">
                                <el-button type="success" icon="el-icon-check" circle @click="post_label"></el-button>
                            </el-col>
                            <el-col :span="3">
                                <el-button type="danger" icon="el-icon-delete" circle></el-button>
                            </el-col>
                            <el-col :span="2">
                                <el-button type="primary" icon="el-icon-arrow-right" circle @click="go_next_page"></el-button>
                            </el-col>
                            <el-col :span="7" style="visibility:hidden;">
                            </el-col>
                        </el-row>
                        <el-row style="display:none;">
                            <el-button round>圆角按钮</el-button>
                            <el-button type="primary" round>主要按钮</el-button>
                            <el-button type="success" round>成功按钮</el-button>
                            <el-button type="info" round>信息按钮</el-button>
                            <el-button type="warning" round>警告按钮</el-button>
                            <el-button type="danger" round>危险按钮</el-button>
                        </el-row>
                        <el-pagination background ref="pagination" layout="prev, pager, next" :total="items.length" :page-size="1" :current-page="current_page + 1" style="margin-top:100px">
                        </el-pagination>
                    </template>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</div>
</template>

<script>
export default {
    name: 'Item',
    data() {
        return {
            items: null,
            current_page: 0,
            radio: '',
            percentage: 0,
            data: null,
            switch_value: true,
        }
    },
    methods: {
        get_items() {
            this.$api.get_project_items(this.$route.params.project_name).then((res) => {
                this.items = res.data
                console.log(res.data)
                if (this.items.length) {
                    this.percentage = Math.floor(this.items.filter(item => item.labeled_status).length / this.items.length * 100)
                    if (this.items[this.current_page]['labeled_status']) {
                        this.radio = this.items[this.current_page]['labeled_data']
                    }
                } else {
                    this.percentage = 0
                }
            }).catch((error) => {
                console.error(error);
            })
        },
        get_data() {
            this.$api.get_project_data(this.$route.params.project_name).then((res) => {
                this.data = res.data;
                this.radio = this.data.classes[0];
            })
        },
        post_label() {
            this.$api.update_project_item(this.$route.params.project_name, {
                'data_id': {
                    '_id': this.items[this.current_page]['_id']
                },
                'new_data': {
                    'labeled_data': this.radio,
                    'labeled_status': true
                }
            }).then((res) => {
                this.items[this.current_page]['labeled_data'] = this.radio;
                this.items[this.current_page]['labeled_status'] = true;
                this.percentage = Math.floor(this.items.filter(item => item.labeled_status).length / this.items.length * 100)
                if (this.switch_value) {
                    this.go_next_page()
                }
            })
            console.log(this.radio)
        },
        goBack() {
            this.$router.go(-1)
        },
        go_pre_page() {
            if (this.current_page > 0) {
                this.current_page--;
            }
        },
        go_next_page() {
            if (this.current_page < this.items.length - 1) {
                this.current_page++;
            }
        },
        handle_current_change(page) {
            console.log(page)
            this.current_page = page - 1
        }
    },
    created() {
        this.get_data(),
            this.get_items()
    }

}
</script>

<style>
.el-container {
    /* background-color: #e4f0e0; */
    border-radius: 10px;
}

.el-main {
    background-color: #ebf3f0;
    /* color: aliceblue; */
    border-radius: 10px;
    margin: 5px;
}

.el-aside {
    background-color: #d3dff0;
    /* color: aliceblue; */
    text-align: center;
    border-radius: 10px;
    margin: 5px;
    /* line-height: 200px; */
}
</style>
