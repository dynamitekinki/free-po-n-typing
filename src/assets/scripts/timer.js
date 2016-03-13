//
// アルファシス – alphasis.info – jQueryで作るストップウォッチ より引用
// http://alphasis.info/2013/06/jquery-gyakubiki-stopwatch/
// 新バージョンのjQueryに対応のため少し改変
//

$( function() {
    $( '#stopwatchStop' ).prop("disabled", true);
    $( '#stopwatchStart' ).click(
        function() {
            stopwatchStart();
        }
    );
    $( '#stopwatchStop' ).click(
        function() {
            stopwatchStop();
        }
    );
    $( '#stopwatchClear' ).click(
        function() {
            stopwatchClear();
        }
    );
} );

var $stopwatch, $enable = false, $stopwatchTime, $startTime, $stopwatchTimeAdd = 0;

function stopwatchStart() {
    $( '#stopwatchStop' ).prop("disabled", false);
    $( '#stopwatchStart' ).prop("disabled", true);
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
    $( '#stopwatchHour' ).text( $stopwatchHour );
    $( '#stopwatchMinute' ).text( $stopwatchMinute );
    $( '#stopwatchSecond' ).text( $stopwatchSecond );
    $( '#stopwatchMillisecond' ).text( $stopwatchMillisecond );
    $stopwatch = setTimeout( "stopwatchStart()", 1 );
}

function stopwatchStop() {
    $( '#stopwatchStop' ).prop("disabled", true);
    $( '#stopwatchStart' ).prop("disabled", false);
    clearTimeout( $stopwatch );
    $startTime = undefined;
    $stopwatchTimeAdd = $stopwatchTime;
}

function stopwatchClear() {
    $startTime = undefined;
    $stopwatchTimeAdd = 0;
    $( '#stopwatchHour' ).text( '00' );
    $( '#stopwatchMinute' ).text( '00' );
    $( '#stopwatchSecond' ).text( '00' );
    $( '#stopwatchMillisecond' ).text( '000' );
}