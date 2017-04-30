var ans = "無料エロ動画";

$( function() {
  start();
});

function start (){
  fadeInView();
  mainloop();
}

function restart (){
  $("#inputarea").val("");
  $("#inputarea").focus();
  start();
}

function mainloop (){
  var foul = false;
  var init = true;
  stopwatchStop();
  stopwatchClear();
  $("#inputarea").mcInputEvent();
  $("#inputarea").on({
    'input2 mcinput': function (e){
      if( init ){
        stopwatchStart();
        init = false;
      } 

      if ( e.type == 'input2' ){
        if(ans == e.lastVal){
          stopwatchStop();
          $("#inputarea").mcInputEvent("destroy");
          $("#inputarea").unbind("mcInputEvent");
          return true;
        }
      }
    },

    // ペースト、タブキー(予測変換)は不正として処理

    'paste': function(e){
      detectedCheat();
      return false;
    },

    'keyup': function(e){
      if ( !init && e.keyCode == 9 ) {
        detectedCheat();
      }
    }
  });

  $("#reloadBtn").on({
    'click' : function(e){
      // location.reload();
      restart();
    }
  });

  $("#rm_reloadBtn").on({
    'click' : function(e){
      // location.reload();
      restart();
    }
  });

}

function fadeInView () {
  $("body").toggle();
  $("body").fadeIn(800);
}

function detectedCheat () {
  $("#inputarea").mcInputEvent("destroy");
  $("#inputarea").unbind("mcInputEvent");
  stopwatchStop();
  foul = true;
  $('[data-remodal-id=fault]').remodal().open();
}

//
// アルファシス – alphasis.info – jQueryで作るストップウォッチ より引用
// http://alphasis.info/2013/06/jquery-gyakubiki-stopwatch/
// 新バージョンのjQueryに対応のため少し改変
//

var $stopwatch, $enable = false, $stopwatchTime, $startTime, $stopwatchTimeAdd = 0;

function stopwatchStart() {
  if( $startTime === undefined ){
    var $startDate = new Date();
    $startTime = $startDate.getTime();
  }
  var $nowDate = new Date();
  $stopwatchTime = $nowDate.getTime() - $startTime + $stopwatchTimeAdd;
  $stopwatchMillisecond = $stopwatchTime % 1000;
  $stopwatchSecond = Math.floor( $stopwatchTime / 1000 ) % 60;
  $stopwatchMinute = Math.floor( $stopwatchTime / 1000 / 60 ) % 60;
  $stopwatchHour = Math.floor( Math.floor( $stopwatchTime / 1000 / 60 ) / 60 );
  if( $stopwatchMillisecond < 10 ){
    $stopwatchMillisecond = '0' + $stopwatchMillisecond;
  }
  if( $stopwatchMillisecond < 100 ){
    $stopwatchMillisecond = '0' + $stopwatchMillisecond;
  }
  if( $stopwatchSecond < 10 ){
    $stopwatchSecond = '0' + $stopwatchSecond;
  }
  if( $stopwatchMinute < 10 ){
    $stopwatchMinute = '0' + $stopwatchMinute;
  }
  if( $stopwatchHour < 10 ){
    $stopwatchHour = '0' + $stopwatchHour;
  }
  $( '#timerMinute' ).text( $stopwatchMinute );
  $( '#timerSecond' ).text( $stopwatchSecond );
  $( '#timerMillisecond' ).text( $stopwatchMillisecond );
  $stopwatch = setTimeout( "stopwatchStart()", 1 );
}

function stopwatchStop() {
  clearTimeout( $stopwatch );
  $startTime = undefined;
  $stopwatchTimeAdd = $stopwatchTime;
}

function stopwatchClear() {
  $startTime = undefined;
  $stopwatchTimeAdd = 0;
  $( '#timerMinute' ).text( '00' );
  $( '#timerSecond' ).text( '00' );
  $( '#timerMillisecond' ).text( '000' );
}
