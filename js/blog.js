(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
(function($,win)
{
	var globalCache = [],
		goonData={},
		audio = new Audio();
	var cover = $('.cover'),
		elapse = $('.elapse'),
		foredrag = $('.foredrag'),
		detail = $('.detail'),
		inited = 0,
		rendered = $.Deferred();
	var option =
	{
		defaultVolume: 0.5,
		coverSize: '?param=350y350',
		cacheAmount: 3
	};
	var music=
	{
		show:function(show)
		{
			loader.show(function()
			{
				if(show)
				{
					$('body').addClass('player');
					cover = $('.cover'),
					elapse = $('.elapse'),
					foredrag = $('.foredrag'),
					detail = $('.detail'),
					foredrag.click(function ()
					{
					   audio.src&&audio.paused ? audio.play() : (inited?audio.pause():music.init());
					});
					music.goon();
					if(audio.src&&audio.paused)
					{
						audio.play();
					}
					else
					{
						if(inited)
						{
							if((audio.src&&!audio.paused))
							{
								cover.addClass('running');
								foredrag.find('.fa').removeClass('fa-play').addClass('fa-pause');
							}
						}
						else
						{
							music.init();
						}
					}
				}
				else
				{
					$('body').removeClass('player');
				}
				setTimeout("loader.hide()",500);
			});
		},
		goon:function()
		{
			var data=goonData;
			if(!$.isEmptyObject(data))
			{
				cover.find('img').attr('src', data.cover + option.coverSize);
				detail.find('.title').html(data.title);
				detail.find('.artist').html(data.artist);
			}
		},
		next:function()
		{
			audio.pause();
			if (globalCache.length > 0)
			{
				this.renderData(globalCache.shift());
				this.getMusicSource(true);
			}
			else
			{
				this.getMusicSource();
			}
		},
		init:function()
		{
			inited=1;
			this.next();
		},
		renderData:function(data)
		{
			if(data.code==0)
			{
				goonData=data;
				audio.src = data.mp3;
				cover.find('img').attr('src', data.cover + option.coverSize);
				detail.find('.title').html(data.title);
				detail.find('.artist').html(data.artist);
				audio.play();
				rendered.resolve();
			}
			else
			{
				console.log('error play data');
			}
		},
		getMusicSource:function(isCallback)
		{
			if (globalCache.length >= option.cacheAmount)
			{
				return;
			}
			var url='http://media.suconghou.cn/music.php';
			if(window.list)
			{
				url=url+'?list='+window.list;
			}
			$.ajax(
			{
				url: url,
				timeout: 12000,
				dataType: 'json',
				xhrFields: {withCredentials: true}
			}).done(function (data)
			{
				if (!isCallback)
				{
					music.renderData(data);
					for (var i = 0; i < option.cacheAmount; i++)
					{
						music.getMusicSource(true);
					}
				}
				else
				{
					globalCache.push(data);
				}
			}).fail(function()
			{
				console.log('filed');
			});
		}
	};
	rendered.done(function()
	{
		audio.addEventListener('playing',function()
		{
			cover.addClass('running');
			foredrag.find('.fa').removeClass('fa-play').addClass('fa-pause');
		});
		audio.addEventListener('pause',function()
		{
			cover.removeClass('running');
			foredrag.find('.fa').removeClass('fa-pause').addClass('fa-play');
		});
		audio.addEventListener('ended',function()
		{
			music.next();
		});
		audio.addEventListener('timeupdate',function()
		{
			elapse.css('width', audio.currentTime * 100 / audio.duration + '%');
		});
		audio.addEventListener('error',function()
		{
			console.log('error');
		});
	});
	$(document).on('keydown', function (e)
	{
		if($('.music-player').is(':visible'))
		{
			if (e.ctrlKey && e.which == 39)
			{
				e.preventDefault();
				music.init();
			}
			else if(e.which==32)
			{
				audio.src&&audio.paused ? audio.play() : (inited?audio.pause():music.init());
			}
		}
	});
	window.addEventListener('error', function (err)
	{
	    var lineAndColumnInfo = err.colno ? ' line:' + err.lineno +', column:'+ err.colno : ' line:' + err.lineno;
	    ga('send', 'event', 'JavaScript Error', err.message, err.filename + lineAndColumnInfo + ' -> ' +  navigator.userAgent, 0, true );
	});
	win.music=music;
})(jQuery,window);

InstantClick.on('change', function()
{
	$('pre code').each(function(i, block)
	{
		hljs.highlightBlock(block);
	});
	window.loader = new SVGLoader( document.getElementById( 'loader' ), { speedIn : 300, easingIn : mina.easeinout } );
	ga('create', 'UA-78443985-1', 'auto');
	ga('set', 'location', document.location.origin + document.location.pathname + document.location.search);
	ga('send', 'pageview');
});
InstantClick.init();





