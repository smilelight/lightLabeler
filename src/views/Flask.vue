<template>
<div>
    <el-table :data="items" style="width: 100%">
        <el-table-column label="Date" prop="updated_time">
        </el-table-column>
        <el-table-column label="Name" prop="labeled_user">
        </el-table-column>
        <el-table-column label="Word" prop="raw_data.word">
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
    <el-pagination background layout="prev, pager, next" :total="1000" style="margin-top:100px">
    </el-pagination>
</div>
</template>

<script>
export default {
    name: 'Flask',
    data() {
        return {
            items: []
        }
    },
    methods: {
        get_items() {
            const path = 'http://127.0.1:5000/ttt_demo';
            this.axios.get(path).then((res) => {
                this.items = res.data
                console.log(res.data)
            }).catch((error) => {
                console.error(error);
            })
        },
        handleEdit(index, row) {
            console.log(index, row);
            const path = 'http://127.0.1:5000/ttt_demo';
            this.axios.post(path, row)
        },
        handleDelete(index, row) {
            console.log(index, row);
        }
    },
    created() {
        this.get_items()
    }

}
</script>

<style>

</style>
