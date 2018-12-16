(function(self) {
    $('pre code').each(function(i, block)
	{
		hljs.highlightBlock(block);
    });
    $(document).on('click','.rbutton',function()
    {
        var $html = $('html');
        $html.toggleClass('hidetop');
    });
})(window);
