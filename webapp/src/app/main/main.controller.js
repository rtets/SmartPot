'use strict';

angular.module('webapp')
    .controller('MainCtrl', function ($scope, DATA, $interval, PUMP) {
        $scope.data = {};
        $scope.options = {
            uv: {
                //showScale: false,
                scaleOverride: true,
                // Boolean - If we want to override with a hard coded scale
                scaleSteps: 2,
                // Number - The value jump in the hard coded scale
                scaleStepWidth: 5,
                // Number - The scale starting value
                scaleStartValue: 5
            },
            moisture: {
                //showScale: false,
                scaleOverride: true,
                // Boolean - If we want to override with a hard coded scale
                scaleSteps: 5,
                // Number - The value jump in the hard coded scale
                scaleStepWidth: 20,
                // Number - The scale starting value
                scaleStartValue: 0
            },
            temp: {
                //showScale: false,
                scaleOverride: true,
                // Boolean - If we want to override with a hard coded scale
                scaleSteps: 4,
                // Number - The value jump in the hard coded scale
                scaleStepWidth: 10,
                // Number - The scale starting value
                scaleStartValue: 0
            },
        };
        $scope.labels = ['now','', '', '', '', '', '', '', '', ''];
        $scope.series = ['Series A', 'Series B'];

        $scope.pumpOn = function () {
            PUMP.pumpOn();
        };
        loadData();
        $interval(loadData, 1000);

        function loadData() {
            DATA.readings().success(function (result) {
                //console.log(result);
                $scope.data.uv = [result.uv];
                $scope.data.temp = [result.temp];
                moistureToPercentage(result.moisture, function (data) {
                    $scope.data.moisture = [data];
                });
                $scope.msg=result.msg;

            });
        }

        function moistureToPercentage(moistureArray, callback) {
            var results = [];
            for (var i = 0; i < moistureArray.length; i++) {

                var result = Math.floor((moistureArray[i] - 300) / 2);
                results.push(result)
                if (i == (moistureArray.length - 1)) {
                    callback(results);
                }
            }

        }
    })
    .factory('DATA', function ($http) {
        var HOST = 'http://192.168.50.158:3000';
        return {
            readings: function () {
                var req = {
                    method: 'GET',
                    //                    headers: {
                    //                        'Content-Type': 'application/json'
                    //                    },
                    url: HOST + '/all/read/10',
                };
                console.log(req);
                return $http(req);
            },
            read: function (cat) {
                var req = {
                    method: 'GET',
                    //                    headers: {
                    //                        'Content-Type': 'application/json'
                    //                    },
                    url: HOST + '/' + cat + '/read/10',
                };
                console.log(req);
                return $http(req);
            }
        }

    })
    .factory('PUMP', function ($http) {
        return {
            pumpOn: function () {
                var HOST = 'http://192.168.50.158:3000';
                var req = {
                    method: 'GET',
                    //                    headers: {
                    //                        'Content-Type': 'application/json'
                    //                    },
                    url: HOST + '/pump/on',
                };
                console.log(req);
                $http(req).success(function (result) {
                    console.log('watering');
                });
            }
        }
    });