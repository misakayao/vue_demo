import Mock from 'mockjs'
import navlist from './navlist'
import urllist from './urllist'
import login from './login'
import echarts from './echarts'
import table from './table'
import groupList from './groupList'
import getToken from './getToken'

let data = [].concat(navlist, login, echarts, table, groupList, getToken, urllist);

data.forEach(function(res){
    Mock.mock(res.path, res.data)
})

export default Mock
