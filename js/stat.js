'use strict';

window.renderStatistics = function (ctx, names, times) {
  var rectX = 100;
  var rectY = 10;
  var rectWidth = 420;
  var rectHeight = 270;
  var textX = 120;
  var textY = 40;

  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  ctx.fillStyle = 'white';
  ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);
  ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', textX, textY);
  ctx.fillText('Список результатов:', textX, textY + 20);

  var sortHistogram = function () {
    for (var i = 0; i <= times.length - 2; i++) {
      var maxTime = times[i];
      var maxName = names[i];
      for (var j = i + 1; j <= times.length - 1; j++) {
        if (times[j] > maxTime) {
          maxTime = times[j];
          maxName = names[j];
          var swapTime = times[i];
          var swapName = names[i];
          times[i] = maxTime;
          names[i] = maxName;
          times[j] = swapTime;
          names[j] = swapName;
        }
      }
    }
  };

  sortHistogram();

  var histogramHeight = 150;
  var step = histogramHeight / (times[0] - 0);

  var barWidth = 40;
  var indent = 80;
  var initialX = 140;
  var initialY = 240;
  var lineHeight = 20;

  var getHistogram = function () {
    for (var i = 0; i < times.length; i++) {
      var indentation = indent * i;
      var time = times[i];
      var name = names[i];
      if (name !== 'Вы') {
        ctx.fillStyle = 'rgba(28, 48, 251, ' + Math.random(0.11, 1.01) + ')';
      } else {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      }
      ctx.fillRect(initialX + indentation, initialY, barWidth, -(time * step));
      ctx.fillStyle = 'black';
      ctx.fillText(Math.floor(time), initialX + indentation, initialY - lineHeight / 2 - time * step);
      ctx.fillText(name, initialX + indentation, initialY + lineHeight);
    }
  };
  getHistogram();
};
