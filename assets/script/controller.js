var _0x75cd=["\x41\x49\x7A\x61\x53\x79\x41\x4D\x45\x4A\x66\x71\x4F\x4B\x75\x67\x6F\x4D\x32\x59\x67\x59\x49\x61\x45\x69\x7A\x38\x61\x53\x65\x45\x30\x5F\x4C\x6C\x74\x4D\x51","\x74\x61\x6C\x6B\x2D\x69\x6E\x2D\x74\x65\x72\x6D\x69\x6E\x61\x6C\x2E\x66\x69\x72\x65\x62\x61\x73\x65\x61\x70\x70\x2E\x63\x6F\x6D","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x74\x61\x6C\x6B\x2D\x69\x6E\x2D\x74\x65\x72\x6D\x69\x6E\x61\x6C\x2E\x66\x69\x72\x65\x62\x61\x73\x65\x69\x6F\x2E\x63\x6F\x6D","\x74\x61\x6C\x6B\x2D\x69\x6E\x2D\x74\x65\x72\x6D\x69\x6E\x61\x6C","\x74\x61\x6C\x6B\x2D\x69\x6E\x2D\x74\x65\x72\x6D\x69\x6E\x61\x6C\x2E\x61\x70\x70\x73\x70\x6F\x74\x2E\x63\x6F\x6D","\x34\x38\x31\x35\x31\x32\x39\x30\x37\x33\x36\x34","\x69\x6E\x69\x74\x69\x61\x6C\x69\x7A\x65\x41\x70\x70","\x61\x70\x70","\x66\x69\x72\x65\x62\x61\x73\x65","\x6D\x6F\x64\x75\x6C\x65"];var _0x925f=[_0x75cd[0],_0x75cd[1],_0x75cd[2],_0x75cd[3],_0x75cd[4],_0x75cd[5],_0x75cd[6]];firebase[_0x925f[6]]({apiKey:_0x925f[0],authDomain:_0x925f[1],databaseURL:_0x925f[2],projectId:_0x925f[3],storageBucket:_0x925f[4],messagingSenderId:_0x925f[5]});var app=angular[_0x75cd[9]](_0x75cd[7],[_0x75cd[8]])
app.config(['$compileProvider', function($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
}]);

app.controller('controller', function (
    $scope, $firebaseArray,
    $timeout, Notify) {

    var db              = firebase.database();
    $scope.orders       = $firebaseArray(db.ref('slimSale/'));
    $scope.show_loading = false;
    $scope.user         = {quantity:1};
    $scope.lend         = {};
    $scope.tableLend    = [];

    $scope.register = function()
    {
        if (! $scope.user.fullname || ! $scope.user.phone || ! $scope.user.address || ! $scope.user.quantity) {
            return Notify.error('Vui lòng nhập đầy đủ các thông tin thanh toán');
        }
        $scope.user.called = false;
        $scope.user.date   = now();
        loading.show();
        $scope.orders.$add($scope.user);
        loading.hide();
        Notify.success('Đặt hàng thành công, vui lòng chờ đợi xác nhận đơn hàng');
        $scope.user = {};
    };

    $scope.updateStatus = function(id)
    {
        var index                   = indexOfArr(id);
        $scope.orders[index].called = $scope.orders[index].called ? false : true;
        $scope.orders.$save(index);
    };

    function indexOfArr(id)
    {
        var result = null;
        angular.forEach($scope.orders, function(value, key) {
            if (value.$id === id) {
                return result = key;
            }
        });
        return result;
    };

    function now()
    {
        var currentdate = new Date();
        return currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
    }

    var loading = {
        show: function() {
            $scope.show_loading = true;
        },
        hide: function() {
            $timeout(function() {
                $scope.show_loading = false;
            }, 1000);
        }
    };

    function gup( name, url ) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp( regexS );
        var results = regex.exec( url );
        return results == null ? null : results[1];
    }

    $scope.p = gup('p');
    switch (gup('p')) {
        case '1':
            $scope.product = 'Trà giảm cân thảo mộc Slimming Tea';
            break;
        case '2':
            $scope.product = 'Viên Giảm Cân Slimming Plus';
            break;
        case '3':
            $scope.product = 'Bộ giảm mỡ - Mờ rạn Slimming Day Collagen thế hệ mới';
            break;
        case '4':
            $scope.product = 'Bộ ủ nóng tan mỡ săn da Slimming Body';
            break;
        default:
            window.location.href = '/';
            break;
    }

});
