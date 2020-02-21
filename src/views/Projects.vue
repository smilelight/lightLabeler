<template>
<div>
    <el-table :data="projects" style="width: 100%">
        <el-table-column label="项目名称" prop="title">
        </el-table-column>
        <el-table-column label="项目描述" prop="description">
        </el-table-column>
        <el-table-column label="项目类型" prop="task_type">
        </el-table-column>
        <el-table-column label="项目状态">
            <template slot-scope="scope">
                {{scope.row.label_status}}
            </template>
        </el-table-column>
        <el-table-column align="right">
            <template slot-scope="scope">
                <el-button size='mini' @click="handleProject(scope.row.title)">项目整体</el-button>
                <el-button size='mini' @click="handleItem(scope.row.title)">项目元素</el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
import { get_all_projects } from '@/request/base'
export default {
    name: 'Projects',
    data() {
        return {
            projects: []
        }
    },
    methods: {
        get_projects() {
            // const path = 'http://127.0.1:5000/project_lists';
            // this.axios.get(path).then((res) => {
            //     this.projects = res.data
            //     console.log(res.data)
            // }).catch((error) => {
            //     console.error(error);
            // })
            this.$api.get_all_projects().then((res) => {
                this.projects = res.data
                console.log(res.data)
            }).catch((error) => {
                console.error(error);
            })
        },
        handleProject(project_name) {
            console.log(`/projects/${project_name}/project`)
            this.$router.push({
                path: `/projects/${project_name}/project`
            })
        },
        handleItem(project_name) {
            console.log(`/projects/${project_name}/item`)
            this.$router.push({
                path: `/projects/${project_name}/item`
            })
        }
    },
    created() {
        this.get_projects()
    }
}
</script>

<style>

</style>
