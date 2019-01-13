<template>
    <div class="sys-page">
        <app-title title="资源"></app-title>
        <div class="page-content">
            <el-table :data="tableData"
                      style="width: 100%">
                <el-table-column
                    type="index">
                </el-table-column>
                <el-table-column prop="_id" label="_id" sortable>
                </el-table-column>
                <el-table-column
                    prop="imgUrl"
                    label="图片"
                    width="180">
                    <template slot-scope="scope">
                        <img :src="`/api${scope.row.imgUrl}`" alt="" style="width: 50px;height: 50px">
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="名称" sortable>
                </el-table-column>
                <el-table-column prop="resourceUrl" label="url">
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
                fetch(`/api/resource/resource_manager?offset=${(this.currentPage - 1) * this.pageSize}&limit=${this.pageSize}`).then(res => {
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
                return row.status === 1 ? "正常" : "停用";
            },
            formatTime(row, column) {
                //console.log(JSON.stringify(row), JSON.stringify(column));
                return row[column.property] ? new Date(row[column.property]).toLocaleString() : "暂未更新";
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
