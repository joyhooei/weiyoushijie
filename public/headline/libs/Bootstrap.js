require.config({
    baseUrl: 'src',

    paths: {
		'isMobile': ['//cdn.bootcss.com/ismobilejs/0.4.0/isMobile.min.js'],
		'q':		['//cdn.bootcss.com/q.js/2.0.3/q.min.js'],
		
		'1758' : ['http://wx.1758.com/static/common/js/hlmy1758.js'],
    },

    shim: {
    }
});

require(['isMobile', 'q'], function(isMobile){
	if (!isMobile.any) {
		var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

		var element = document.getElementById('egret-player');
		element.style.width = (Math.min(width, height) - 1) + "px";
	}

	egret.runEgret();
});