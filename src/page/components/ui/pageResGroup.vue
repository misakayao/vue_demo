<template>
    <div class="sys-page">
        <app-title title="资源组"></app-title>
        <div class="page-content">
            <el-table :data="tableData"
                      style="width: 100%">
                <el-table-column
                    type="index">
                </el-table-column>
                <el-table-column prop="_id" label="_id">
                </el-table-column>
                <el-table-column prop="name" label="名称">
                </el-table-column>
                <el-table-column prop="resources" label="资源">
                    <template slot-scope="scope">
                        <ul>
                            <li v-for="item in scope.row.resources">{{item}}</li>
                        </ul>
                    </template>

                </el-table-column>
                <el-table-column prop="createtime" label="创建时间" :formatter="formatTime">
                </el-table-column>
                <el-table-column prop="updatetime" label="更新时间" :formatter="formatTime">
                </el-table-column>
                <el-table-column prop="status" label="状态" :formatter="formatStatus">
                </el-table-column>
            </el-table>
            <br/>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size=pageSize
                layout="total, sizes, prev, pager, next, jumper"
                :total=paginationTotal>
            </el-pagination>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'comPageTable',
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.getData();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.getData();
            },
            getData() {
                fetch(`/api/resource/resgroup?status=[0,1,2]&offset=${(this.currentPage - 1) * this.pageSize}&limit=${this.pageSize}`).then(res => {
                    return res.json();     //返回promise对象
                }).then(response => {
                    console.log("response:", response);
                    if (response.result === 1) {
                        this.paginationTotal = response.data.total;
                        this.tableData = response.data.rows
                    }
                }).catch(reason => {
                    console.log("reason:", reason);
                });
            },
            formatStatus(row) {
                return row.status === 1 ? "正常" : row.status === 0 ?  "停用" : "删除";
            },
            formatTime(row, column) {
                //console.log(JSON.stringify(row), JSON.stringify(column));
                return row[column.property] ? new Date(row[column.property]).toLocaleString() : "";
            }
        },
        data: function () {
            return {
                tableData: [],
                paginationTotal: 0,
                currentPage: 1,
                pageSize: 10,
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>
