import axios from 'axios'

const BASE_URL = 'http://127.0.1:5000/'

// const get_all_projects = () => {
//     return axios.get(`${BASE_URL}project_lists`);
// }

const get_project_items = function(project_name) {
    return axios.get(`${BASE_URL}${project_name}/items`);
}

// const get_project_data = function(project_name) {
//     return axios.get(`${BASE_URL}${project_name}/data`);
// }

// export default {
//     get_all_projects,
//     get_project_items,
//     get_project_data,
// }

const baseApi = {
    get_all_projects(){
        return axios.get(`${BASE_URL}project_lists`);
    },
    get_project_items(project_name) {
        return axios.get(`${BASE_URL}${project_name}/items`);
    },
    update_project_item(project_name, item_data){
        return axios.post(`${BASE_URL}${project_name}/items`, item_data);
    },
    get_project_data(project_name) {
        return axios.get(`${BASE_URL}${project_name}/data`);
    },
}

export default baseApi;