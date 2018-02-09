'use strict';

window.renderStatistics = function (ctx, names, times) {
  var RECT_X = 100;
  var RECT_Y = 10;
  var RECT_WIDTH = 420;
  var RECT_HEIGHT = 270;
  var TEXT_X = 120;
  var TEXT_Y = 40;
  var CLOUD_SHADOW_X = 10;
  var CLOUD_SHADOW_Y = 10;
  var CLOUD_COLOR = 'white';
  var SHADOW_TEXT_X = 0;
  var SHADOW_TEXT_Y = 0;
  var TEXT_TITLE = 'Ура вы победили!';
  var TEXT_RESULTS = 'Список результатов:';
  var TEXT_FONT = '16px PT Mono';
  var TEXT_COLOR = 'black';

  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowOffsetX = CLOUD_SHADOW_X;
  ctx.shadowOffsetY = CLOUD_SHADOW_Y;
  ctx.fillStyle = CLOUD_COLOR;
  ctx.strokeRect(RECT_X, RECT_Y, RECT_WIDTH, RECT_HEIGHT);
  ctx.fillRect(RECT_X, RECT_Y, RECT_WIDTH, RECT_HEIGHT);

  ctx.shadowOffsetX = SHADOW_TEXT_X;
  ctx.shadowOffsetY = SHADOW_TEXT_Y;
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_FONT;
  ctx.fillText(TEXT_TITLE, TEXT_X, TEXT_Y);
  ctx.fillText(TEXT_RESULTS, TEXT_X, TEXT_Y + 20);

  var getMaxElement = function (arr) {
    var maxElement = arr[0];
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  };
  var histogramHeight = 150;
  var maxTime = getMaxElement(times);
  var step = histogramHeight / maxTime;

  var getColor = function (name) {
    var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
    var PLAYERS_COLOR = 'rgba(28, 48, 251, ' + Math.random() + ')'
    if (name !== 'Вы') {
      ctx.fillStyle = PLAYERS_COLOR;
    } else {
      ctx.fillStyle = PLAYER_COLOR;
    }
  };

  var getHistogram = function () {
    var barWidth = 40;
    var indent = 80;
    var initialX = 140;
    var initialY = 240;
    var lineHeight = 20;
    for (var i = 0; i < times.length; i++) {
      var indentation = indent * i;
      var time = times[i];
      var name = names[i];
      getColor(name);
      ctx.fillRect(initialX + indentation, initialY, barWidth, -(time * step));
      ctx.fillStyle = TEXT_COLOR;
      ctx.fillText(Math.floor(time), initialX + indentation, initialY - lineHeight / 2 - time * step);
      ctx.fillText(name, initialX + indentation, initialY + lineHeight);
    }
  };
  getHistogram();
};
