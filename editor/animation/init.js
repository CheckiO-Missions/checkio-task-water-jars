//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide["in"] = data[0];
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
            this_e.setAnimationHeight(112);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }
            if (data.error) {
                $content.find('.call').html('Fail: checkio(' + ext.JSON.encode(data.in) + ')');
                $content.find('.output').html(data.error.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
                return false;
            }

            var checkioInput = data.in;
            var rightResult = data.ext["answer"];
            var userResult = data.out;
            var result = data.ext["result"];
            var result_addon = data.ext["result_addon"];


            //if you need additional info from tests (if exists)
            var explanation = data.ext["explanation"];

            $content.find('.output').html('&nbsp;Your result:&nbsp;' + ext.JSON.encode(userResult));

            if (!result) {
                $content.find('.call').html('Fail: checkio(' + String(checkioInput) + ')');
                $content.find('.answer').html(result_addon);
                $content.find('.answer').addClass('error');
                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
            }
            else {
                $content.find('.call').html('Pass: checkio(' + String(checkioInput) + ')');
                $content.find('.answer').remove();
            }
            //Dont change the code before it

            var canvas = new WaterJarsCanvas();
            var dom = $content.find(".explanation")[0];

            if (!result) {
                canvas.createCanvas(dom, checkioInput, "Example of solution");
                canvas.animateCanvas(explanation);
            }
            else {
                canvas.createCanvas(dom, checkioInput, "Your solution");
                canvas.animateCanvas(userResult);
            }

            this_e.setAnimationHeight($content.height() + 60);

        });

        //TRYIT code
        var $tryit;

        var tCanvas;

        //this function process returned data and show it
        ext.set_console_process_ret(function (this_e, ret) {
            try {
                ret = JSON.parse(ret);
            }
            catch(err){}

            $tryit.find(".checkio-result-in").html(ret);
        });

        ext.set_generate_animation_panel(function (this_e) {
            $tryit = $(this_e.setHtmlTryIt(ext.get_template('tryit'))).find(".tryit-content");
            //tCanvas = new WaterJarsCanvas();
            var defaultValues = [3, 4, 2];


            //run checking
            $tryit.find('.bn-check').click(function (e) {
                //collect data from your tryit panel
                var $first = $tryit.find(".input-first");
                var $second = $tryit.find(".input-second");
                var $goal = $tryit.find(".input-goal");
                var inputs = [$first, $second, $goal];
                var args = [];
                for (var i = 0; i < 3; i ++) {
                    var t = parseInt(inputs[i]);
                    if (isNaN(t) || t < 1 || t > 10){
                        inputs[i].val(defaultValues[i]);
                        args.push(defaultValues[i]);
                    }
                    else {
                        args.push(t);
                    }
                }
                //tCanvas.createCanvas($tryit.find(".tryit-canvas")[0], args, "");
                this_e.sendToConsoleCheckiO(args[0], args[1], args[2]);
                e.stopPropagation();
                return false;
            });

        });

        var colorOrange4 = "#F0801A";
        var colorOrange3 = "#FA8F00";
        var colorOrange2 = "#FAA600";
        var colorOrange1 = "#FABA00";

        var colorBlue4 = "#294270";
        var colorBlue3 = "#006CA9";
        var colorBlue2 = "#65A1CF";
        var colorBlue1 = "#8FC7ED";

        var colorGrey4 = "#737370";
        var colorGrey3 = "#D9E9E";
        var colorGrey2 = "#C5C6C6";
        var colorGrey1 = "#EBEDED";

        var colorWhite = "#FFFFFF";

        function WaterJarsCanvas() {
            var sizeX = 300;
            var sizeY;
            var fontSize = 20;
            var delay = 800;
            var stepDelay = delay * 1.3;

            var jarUnit = 30;
            var jarWidth = jarUnit * 2.5;

            var x0 = (sizeX - jarWidth * 2.5) / 2;
            var y0 = fontSize * 2;


            var attrJar = {"stroke": colorBlue4, "stroke-width": 4};
            var attrText = {"stroke": colorBlue4, "font-size": fontSize, "font-family": "Verdana"};
            var attrSteps = {"stroke": colorBlue4, "font-size": fontSize * 0.8, "font-family": "Verdana"};
            var attrWater = {"stroke-width": 0, "fill": colorBlue1};

            var paper;
            var waterSet;
            var valueSet;
            var firstMax;
            var secondMax;
            var goal;

            this.createCanvas = function(dom, inData, message) {
                firstMax = inData[0];
                secondMax = inData[1];
                goal = inData[2];

                sizeY = y0 * 3 + Math.max(firstMax, secondMax) * jarUnit;

                paper = Raphael(dom, sizeX, sizeY, 0, 0);
                paper.path(Raphael.format(
                    "M{0},{1}V{2}H{3}V{1}",
                    x0,
                    sizeY - y0 - firstMax * jarUnit,
                    sizeY - y0,
                    x0 + jarWidth
                )).attr(attrJar);
                paper.path(Raphael.format(
                    "M{0},{1}V{2}H{3}V{1}",
                    x0 + jarWidth * 1.5,
                    sizeY - y0 - secondMax * jarUnit,
                    sizeY - y0,
                    x0 + jarWidth * 2.5
                )).attr(attrJar);

                paper.text(sizeX / 2, fontSize / 2, message).attr(attrText);

                paper.text(x0 + jarWidth / 2, sizeY - y0 * 1.5 - firstMax * jarUnit, firstMax).attr(attrText);
                paper.text(x0 + jarWidth * 2, sizeY - y0 * 1.5 - secondMax * jarUnit, secondMax).attr(attrText);
                valueSet = paper.set();
                valueSet.push(paper.text(x0 + jarWidth / 2, sizeY - y0 / 2, "0").attr(attrText));
                valueSet.push(paper.text(x0 + jarWidth * 2, sizeY - y0 / 2, "0").attr(attrText));

            };

            this.removeCanvas = function() {
                if (paper){
                    paper.remove();
                }
            };

            this.animateCanvas = function(steps) {
                var stepsText = paper.text(sizeX / 2, fontSize * 1.5, "").attr(attrSteps);
                var firstWater = paper.rect(x0, sizeY - y0, jarWidth, 0).attr(attrWater);
                var secondWater = paper.rect(x0 + jarWidth * 1.5, sizeY - y0, jarWidth, 0).attr(attrWater);
                firstWater.toBack();
                secondWater.toBack();
                var res = [0, 0];
                for (var i = 0; i < steps.length; i++){
                    res = applyAction(res[0], res[1], steps[i]);

                    setTimeout(
                        function(){
                            var action = steps[i];
                            var j = i;
                            var first = res[0];
                            var second = res[1];
                            return function(){
                                firstWater.animate({
                                    "y": sizeY - y0 - first * jarUnit,
                                    "height": jarUnit * first
                                }, delay);
                                secondWater.animate({
                                    "y": sizeY - y0 - second * jarUnit,
                                    "height": jarUnit * second
                                }, delay);
                                valueSet[0].attr("text", first);
                                valueSet[1].attr("text", second);
                                stepsText.attr({"text": steps.slice(0, j + 1).join(",")});
                            }
                        }(),
                        stepDelay * i
                    );
                }
                setTimeout(function(){
                    if (res[0] === goal) {
                        valueSet[0].attr({"stroke": colorOrange4, "fill": colorOrange4});
                    }
                    else {
                        valueSet[1].attr({"stroke": colorOrange4, "fill": colorOrange4});
                    }
                }, stepDelay * i)
            };

            function applyAction(first, second, step) {
                switch (step){
                    case "10":
                        return [0, second];
                    case "20":
                        return [first, 0];
                    case "01":
                        return [firstMax, second];
                    case "02":
                        return [first, secondMax];
                    case "12":
                        var vol = first > (secondMax - second) ? secondMax - second: first;
                        return [first - vol, second + vol];
                    case "21":
                        vol = second > (firstMax - first) ? firstMax - first: second;
                        return [first + vol, second - vol];
                }
                return [first, second];
            }

        }


    }
);
