
## rethinkdb 常用命令
##### 没有文档咱就自己写！

```json
//示例醒目数据
{
    {
        "address": "北新桥" , 
        "business": "crowd" , 
        "classChoose": [ 
            "娱乐" 
        ] , 
        "create_Time": "Mon Oct 14 2019 14:07:20 GMT+0800 (China Standard Time)" , 
        "dateTime": "2019-10-17" , 
        "desc": "还是那一句话 咱买不起" , 
        "hot": 1 , 
        "id": "2423a4c5-b8e4-4fed-93a7-38f8f645be1a" , 
        "localDetail": 
        
        { 
        "lat": 39.94758476755084 , 
        "lng": 116.4285982975456 
        } , 
        "look": 35 , 
        "money": "1200" , 
        "nickname": "cwb" , 
        "projectId": "2423a4c5-b8e4-4fed-93a7-38f8f645be1a" , 
        "projectImg": "https://dxd-1256577846.cos.ap-beijing.myqcloud.com/2109a0922f58adb584e97f2c36f25515.gif",
        "title": "众筹长板" , 
        "uid": "2423a4c5-b8e4-4fed-93a7-38f8f645be1a" , 
        "userId": "5d9f379a-6cbc-4562-a7b5-254e22c86046" , 
        "userImg": "https://dxd-1256577846.cos.ap-beijing.myqcloud.com/7-1Z303153449.jpg",
        "videoUrl": "https://dxd-1256577846.cos.ap-beijing.myqcloud.com/2423a4c5-b8e4-4fed-93a7-38f8f645be1a",
    } 
    
    {
        "address": "北京市" , 
        "business": "crowd" , 
        "classChoose": [ 
            "科技" 
        ] , 
        "create_Time": "Mon Oct 14 2019 14:12:36 GMT+0800 (China Standard Time)" , 
        "dateTime": "2019-10-31" , 
        "desc": "dasdasd" , 
        "hot": 0 , 
        "id": "06af6c98-6e43-4421-9169-5378ad589bde" , 
        "localDetail": 
        
        { 
        "lat": 39.910923647957595 , 
        "lng": 116.41338729034514 
        } , 
        "look": 6 , 
        "money": "1232" , 
        "nickname": "前端测试" , 
        "projectId": "06af6c98-6e43-4421-9169-5378ad589bde" , 
        "projectImg": "https://dxd-1256577846.cos.ap-beijing.myqcloud.com/3dec4d9a9998dd252e312cf187ba373.jpg",
        "title": "测试项目" , 
        "userId": "544ab431-551f-4972-bbe4-602bad24da2e" , 
        "userImg": "https://dxd-1256577846.cos.ap-beijing.myqcloud.com/download.jpg",
        "videoUrl": "" 
    }
}
```

```node
    r.table('projects').filter({address:"北京市"})                  //匹配address为北京市的项目
    r.table('projects').filter({address:"北京市"})("classChoose")   //匹配address为北京市项目下的classChoose值
    r.table('projects').filter(r.row("address").match('新'))        //模糊查询address含有"新"的项目
    r.table('projects').filter({address:"北京市"}).delete()         //删除address为北京市的项目
    r.table('projects').filter({address:"北京市"})("userImg")       //获取address为北京市项目下的userImg值
    r.table('projects').filter({address:"北京市"}).pluck("userImg","title")         //匹配address为北京市的项目并返回 userImg title的值 {"userImg":"xxx","title":"xxx"}
    r.table('projects').get("06af6c98-6e43-4421-9169-5378ad589bde").delete()        //根据id获取项目
    r.table('projects').filter(r.row("classChoose").toJsonString().match("科技"))   //模糊查询classChoose含有"科技"的项目 针对array模糊查询
```