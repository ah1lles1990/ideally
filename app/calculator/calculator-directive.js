angular.module('boardsApp')
    .directive('calculatorDirective', function () {
        return {
            restrict: 'EA',
            templateUrl: 'app/calculator/calculator.html',
            controller: function() {

                // коэффициент для преобразования леменов в ватт для разных ламп
                var inc_conversion = .0625,
                  hal_conversion = .0450,
                  cfl_conversion = .0146,
                  led_conversion = .0125;

                var current_lumens = 1600;
                // пример получения ватт для 1600 люменов для лампы накаливания
                inc_wattage = (current_lumens * inc_conversion).toFixed(1); // 100

                var hoursPerDay = 1; // часов в день
                var cost = 12 / 100; // цена 12 центов э то 0.12 долларов
                // пример определения стоимости в год для лампы накаливания
                var inc_cost = (((inc_wattage * 365 * hoursPerDay) /1000) * cost).toFixed(2);

                var vm = this;

                vm.opts = {
                    lumen: 600,
                    cost_kilowatt: 12,
                    hours_per_day: 1
                };

                vm.lamps = [
                    {
                        title: 'Incandescent',
                        alias: 'inc',
                        watts: 0,
                        cost_per_year: 0,
                        conversion: .0625
                    },
                    {
                        title: 'Halogen',
                        alias: 'hal',
                        watts: 0,
                        cost_per_year: 0,
                        conversion: .0450
                    },
                    {
                        title: 'CFL',
                        alias: 'cfl',
                        watts: 0,
                        cost_per_year: 0,
                        conversion: .0146
                    },
                    {
                        title: 'LED',
                        alias: 'led',
                        watts: 0,
                        cost_per_year: 0,
                        conversion: .0125
                    },
                ];

                vm.calculate = function() {
                    for (var i = 0; i < vm.lamps.length; i++) {
                        var inc_wattage = (vm.opts.lumen * vm.lamps[i].conversion).toFixed(1);
                        var inc_cost = (((inc_wattage * 365 * vm.opts.hours_per_day) /1000) * (vm.opts.cost_kilowatt / 100)).toFixed(2);
                        vm.lamps[i].watts = inc_wattage;
                        vm.lamps[i].cost_per_year = inc_cost;
                    }
                };


                vm.calculate();

            },
            controllerAs: 'calcCtrl'
        }
     
      
    });