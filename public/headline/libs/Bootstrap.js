require.config({
    baseUrl: 'src',

    paths: {
    },

    shim: {
    }
});

require([], function(){
	var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	var element = document.getElementById('egret-player');
	element.style.width = (Math.min(width, height) - 1) + "px";

	egret.runEgret();
});