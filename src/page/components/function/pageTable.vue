<template>
    <div class="sys-page">
        <app-title title="统一分页插件"></app-title>
        <div class="page-content">
            <div class="article">
                <p>该组件为ElementUI的分页组件二次封装，以实现统一的分页设置。分页所有方法统一继承自ElementUI</p>
            </div>

            <app-section title="函数说明">
                <el-table :data="tableData"
                          style="width: 100%">
                    <el-table-column
                        type="index">
                    </el-table-column>
                    <el-table-column prop="_id" label="参数类型">
                    </el-table-column>
                    <el-table-column prop="code" label="组件使用">
                    </el-table-column>
                    <el-table-column prop="createtime" label="功能描述">
                    </el-table-column>
                    <el-table-column prop="name" label="参数">
                    </el-table-column>
                    <el-table-column prop="resgroups" label="参数描述">
                        <template slot-scope="scope">
                            <!--{{scope.row.resgroups}}-->
                            <ul>
                                <li v-for="item in scope.row.resgroups">{{item}}</li>
                            </ul>
                        </template>

                    </el-table-column>
                    <el-table-column prop="status" label="参数类型">
                    </el-table-column>
                </el-table>
            </app-section>
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
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.getData();
            },
            getData() {
                fetch(`/api/community/community?offset=${(this.currentPage - 1) * this.pageSize}&limit=${this.pageSize}`).then(res => {
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
        },
        data: function () {
            console.log("1234:", 1234);
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
<style>

</style>
