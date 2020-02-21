<template>
<div>
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>
    <el-table :data="items" style="width: 100%">
        <el-table-column label="Data" prop="raw_data">
        </el-table-column>
        <el-table-column label="Label" prop="labeled_data">
        </el-table-column>
        <el-table-column label="Status" prop="labeled_status">
        </el-table-column>
        <el-table-column align="right">
            <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
            </template>
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
    name: 'Project',
    data() {
        return {
            items: []
        }
    },
    methods: {
        get_items() {
            this.$api.get_project_items(this.$route.params.project_name).then((res) => {
                this.items = res.data
                console.log(res.data)
                for (var i=0; i< this.items.length; i++) {
                    this.items[i].raw_data = JSON.stringify(this.items[i].raw_data)
                    this.items[i].labeled_status = String(this.items[i].labeled_status)
                }
            }).catch((error) => {
                console.error(error);
            })
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        goBack() {
            this.$router.go(-1)
        }
    },
    created() {
        this.get_items()
    },

}
</script>

<style>

</style>
