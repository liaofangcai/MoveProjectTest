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
                    var me = this, byYearDataArr = [], depNameDate = [], countByYearDate = [],countByMounthDate = [], countByMounthArr = [];

                    //获取首页需要的数据
                    $.ajax({
                        url: 'invoke/common-routers/get-shouldsalary-data',
                        type: 'get',
                        async: false
                    }).done(function (results){
                        // 按照Echarts的数据格式拼成名字和数量的数组
                        //var index
                        for(var i = 0 ; i < results.countByYear.length; i++){
                            depNameDate.push(results.countByYear[i].name)
                            countByYearDate.push(results.countByYear[i].value)
                        }
                        console.log('条形统计图的长度: ' ,results.countByMounth.length)
                        for(var i = 0 ; i < results.countByMounth.length; i++){
                            //var group = 2
                            countByMounthDate.push(results.countByMounth[i].value)
                            // console.log(results.countByMounth[i].name)
                            // console.log(results.countByMounth[i].value)
                            // if (i%group == 0) {
                            //     index = i
                                countByMounthArr.push({
                                    name: results.countByMounth[i].name,
                                    type: 'bar',
                                    data: results.countByMounth[i].value
                                })
                            // }else {
                            //     countByMounthArr.push({
                            //         name: results.countByMounth[i].name,
                            //         type: 'bar',
                            //         stack: results.countByMounth[index].name,
                            //         data: results.countByMounth[i].value
                            //     })
                            // }
                            
                        }          
                        byYearDataArr = results.countByYear
                        //countByMounthArr= results.countByMounth
                    });

                    //按年份饼状统计图
                    var countByYearChart = echarts.init(me.$('count-by-year-statistics').get(0));
                    // 指定饼状图的配置项和数据
                    var countByYearOption = {
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: depNameDate
                        },
                        series : [
                            {
                                name: '应发工资年份统计',
                                type: 'pie',
                                radius : '55%',
                                center: ['50%', '60%'],
                                data: byYearDataArr,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    };

                    // 判断数据是否都为0
                    // 使用刚指定的配置项和数据显示图表。
                    if (countByYearDate.filter(function(item) {return item > 0;}).length === 0){
                        me.$('count-by-year-statistics').html('<p>没有相关数据</p>');
                    }else {
                        countByYearChart.setOption(countByYearOption);
                    }
                    

                    //按月份条形统计图
                    var countByMounthChart = echarts.init(me.$('count-by-mounth-statistics').get(0));
                    // 指定饼状图的配置项和数据
                    var countByMounthOption = {
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
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
                        xAxis : [
                            {
                                type : 'category',
                                data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
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
