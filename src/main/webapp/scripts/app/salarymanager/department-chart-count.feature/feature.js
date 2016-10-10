define(['cdeio/vendors/jquery/flot/jquery.flot.min', 'cdeio/vendors/jquery/flot/jquery.flot.pie.min', 'cdeio/vendors/jquery/flot/jquery.flot.axislabels', 'vendors/jquery/echarts/echarts.min'], function (flot, pie, axisLabel, echarts){
    return {
        layout: {
            components: [{
                type: 'layout',
                defaults: {
                    spacing_open: 0,
                    hideTogglerOnSlide: true
                },
                center: {
                    findNestedContent: true
                }
            }],
            regions: {
                systemHomeArea: 'system-home-area'
            }
        },
        views: [{
            name: 'inline:system-home',
            region: 'systemHomeArea',
            avoidLoadingHandlers: true,
            extend: {
                afterRender: function(su){
                    var me = this, depNameDate = [], countByMounthDate = [], countByMounthArr = [],
                    countByYearDate = [],countByYesteryearDate = [],countByBeforeyearDate = [],
                    byYearDataArr = [], byYesteryearDataArr = [], byBeforeyearDataArr = [],
                    currentYear;

                    //获取首页需要的数据
                    $.ajax({
                        url: 'invoke/common-routers/get-shouldsalary-data',
                        type: 'get',
                        async: false
                    }).done(function (results){
                        
                        // 按照Echarts的数据格式拼成名字和数量的数组
                        for(var i = 0 ; i < results.countByYear.length; i++){
                            depNameDate.push(results.countByYear[i].name)
                            countByYearDate.push(results.countByYear[i].value)
                            countByYesteryearDate.push(results.countByYesteryear[i].value)
                            countByBeforeyearDate.push(results.countByBeforeyear[i].value)
                        }
                        for(var i = 0 ; i < results.countByMounth.length; i++){
                            countByMounthDate.push(results.countByMounth[i].value)
                                countByMounthArr.push({
                                    name: results.countByMounth[i].name,
                                    type: 'line',
                                    data: results.countByMounth[i].value
                                })  
                        }
                        //拿到当前年份
                        currentYear = results.currentYear
                        console.log(currentYear)
                        console.log(depNameDate)
                        //拿到饼状图分别要显示的各年的数据          
                        byYearDataArr = results.countByYear
                        console.log(JSON.stringify(byYearDataArr))
                        byYesteryearDataArr = results.countByYesteryear
                          console.log(currentYear-1)
                         console.log(JSON.stringify(byYesteryearDataArr))
                        byBeforeyearDataArr = results.countByBeforeyear
                          console.log(currentYear)
                        console.log(JSON.stringify(byBeforeyearDataArr))
                    });

                    //按年份饼状统计图
                    var countByYearChart = echarts.init(me.$('count-by-year-statistics').get(0));
                    // 指定饼状图的配置项和数据
                    var i ;
                    var option = {
                       timeline : {
                            type: 'number',
                            autoPlay: true,
                            data : [currentYear-2,currentYear-1,currentYear],
                            lineStyle: {
                                color: '#666',
                                width: 1,
                                type: 'dashed'
                            },
                            borderWidth: 1,
                            borderColor: '#ccc',
                            label: {
                                    show: true,
                                    interval: 'auto',
                                    formatter: function (s) {
                                        if (i === 0) {
                                            i=i+1;
                                            return currentYear - 1;
                                            
                                        }else if(i === 1) {
                                            i=i+1;
                                            return currentYear;
                                            
                                        }else{
                                            i = 0;
                                            return currentYear - 2;
                                        }
                                    }           
                            },
                            symbol: 'emptyDiamond' ,
                            controlStyle: {
                                itemSize: 15,
                                itemGap: 5,
                                normal : {
                                    color : '#333'
                                },
                                emphasis : {
                                    color : '#1e90ff'
                                }
                            },
                            padding: 5 

                        },
                        options : [
                            {
                                tooltip : {
                                    trigger: 'item',
                                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                                },

                                legend: {
                                    data:depNameDate
                                },
                                toolbox: {
                                    show : true,
                                    feature : {
                                        mark : {show: true},
                                        dataView : {show: false, readOnly: false},
                                        magicType : {
                                            show: true, 
                                            type: ['pie', 'funnel'],
                                            option: {
                                                funnel: {
                                                    x: '25%',
                                                    width: '50%',
                                                    funnelAlign: 'left',
                                                    max: 1700
                                                }
                                            }
                                        },
                                        restore : {show: false},
                                        saveAsImage : {show: false}
                                    }
                                },
                                series : [
                                    {
                                        name: '部门统计',
                                        type:'pie',
                                        center: ['50%', '45%'],
                                        radius: '50%',
                                        data: byBeforeyearDataArr
                                    }
                                ]
                            },
                            {
                                series : [
                                    {
                                        name: '部门统计',
                                        type:'pie',
                                        data:byYesteryearDataArr
                                    }
                                ]
                            },
                            {
                                series : [
                                    {
                                        name: '部门统计',
                                        type:'pie',
                                        data: byYearDataArr
                                    }
                                ]
                            }
                        ]
                    };

                    // 判断数据是否都为0
                    // 使用刚指定的配置项和数据显示图表。
                    // if (countByYearDate.filter(function(item) {return item > 0;}).length === 0 || countByYesteryearDate.filter(function(item) {return item > 0;}).length === 0 || countByBeforeyearDate.filter(function(item) {return item > 0;}).length === 0){
                    //     me.$('count-by-year-statistics').html('<p>没有相关数据</p>');
                    // }else {
                        countByYearChart.setOption(option);
                    //}
                    

                    //按月份折线统计图
                    var countByMounthChart = echarts.init(me.$('count-by-mounth-statistics').get(0));
                    // 指定折线图的配置项和数据
                    var countByMounthOption = {
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend: {
                            data: depNameDate
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        toolbox: {
                            feature: {
                                saveAsImage: {show: false}
                            }
                        },
                        xAxis :{
                                type : 'category',
                                boundaryGap: false,
                                data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                        },
                        yAxis : {
                                type : 'value'
                        },
                        series : countByMounthArr
                    };

                    // 判断数据是否都为0
                    // 使用刚指定的配置项和数据显示图表。
                    if (countByMounthDate.filter(function(item) {return item.length > 0;}).length === 0){
                        me.$('count-by-mounth-statistics').html('<p>没有相关数据</p>');
                    }else {
                        countByMounthChart.setOption(countByMounthOption);
                    }
                    return su.apply(this);
                }
            }
        }]
    };
});
