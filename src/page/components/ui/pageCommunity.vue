<template>
    <div class="sys-page">
        <app-title title="社群"></app-title>
        <div class="page-content">
            <el-table :data="tableData"
                      style="width: 100%">
                <el-table-column
                    type="index">
                </el-table-column>
                <el-table-column prop="_id" label="_id">
                </el-table-column>
                <el-table-column prop="code" label="社群code">
                    <template slot-scope="scope">
                            <span v-if="scope.row.isSet">
                                <el-input size="mini" placeholder="请输入内容" v-model="scope.row.code">
                                </el-input>
                            </span>
                        <span v-else>{{scope.row.code}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createtime" label="创建时间" :formatter="formatTime">
                </el-table-column>
                <el-table-column prop="name" label="名称">
                </el-table-column>
                <el-table-column prop="resgroups" label="资源组">
                    <template slot-scope="scope">
                        <!--{{scope.row.resgroups}}-->
                        <ul>
                            <li v-for="item in scope.row.resgroups">{{item}}</li>
                        </ul>
                    </template>

                </el-table-column>
                <el-table-column prop="status" label="状态" width="80px">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status === 1">正常</span>
                        <span v-else-if="scope.row.status === 0">停用</span>
                        <span v-else>删除</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                            <span class="el-tag el-tag--info el-tag--medium" style="cursor: pointer;"
                                  @click="editRow(scope.row,scope.$index, 1)">
                                {{scope.row.isSet?'保存':"修改"}}
                            </span>
                        <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--medium"
                              style="cursor: pointer;" @click="editRow(scope.row,scope.$index, 2)">
                                删除
                            </span>
                        <span v-else class="el-tag  el-tag--medium" style="cursor: pointer;"
                              @click="editRow(scope.row,scope.$index, 0)">
                                取消
                            </span>
                    </template>
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
                fetch(`/api/community/community?offset=${(this.currentPage - 1) * this.pageSize}&limit=${this.pageSize}`).then(res => {
                    return res.json();     //返回promise对象
                }).then(response => {
                    console.log("response:", response);
                    if (response.result === 1) {
                        this.paginationTotal = response.data.total;
                        this.tableData = response.data.rows.map(value => {
                            value.isSet = false;
                            return value;
                        });
                    }
                }).catch(reason => {
                    console.log("reason:", reason);
                });
            },
            formatTime(row, column) {
                if (row) {
                    //console.log(JSON.stringify(row), JSON.stringify(column));
                    return row[column.property] ? new Date(row[column.property]).toLocaleString() : " ";
                } else {
                    return "";
                }
            },
            editRow(row, index, cg) {
                //点击修改 判断是否已经保存所有操作
                /*for (let i of app.master_user.data) {
                    if (i.isSet && i.id != row.id) {
                        app.$message.warning("请先保存当前编辑项");
                        return false;
                    }
                }*/
                console.log("currentLine:", this.currentLine, ", row:", row);
                if (this.currentLine && this.currentLine.code !== row.code) {
                    console.log("editRow:", "请先保存当前编辑项");
                    return false;
                }
                //是否是取消操作
                if (!cg) {
                    /*if (!app.master_user.sel.id) app.master_user.data.splice(index, 1);*/
                    this.currentLine = null;
                    return row.isSet = !row.isSet;
                }
                //提交数据
                if (this.currentLine) {
                    //项目是模拟请求操作  自己修改下
                    this.currentLine = null;
                    row.isSet = false;
                } else {
                    this.currentLine = JSON.parse(JSON.stringify(row));
                    row.isSet = true;
                }
            }
        },
        data: function () {
            return {
                currentLine: null,
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
