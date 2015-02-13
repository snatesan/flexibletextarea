# flexibletextarea
Textarea that flexibly expands or shrinks, based on user input. 
So instead of a user automatically getting a scrollbar, as they type or paste into the textarea, 
it dynamically grows larger (just in height, not width). 
There is also an user configurable min and max height option, so at a certain size the scrollbars do appear.


It is exposed as an requirejs amd. 
Example usage. See it here <a href="http://snatesan.github.io/flexibletextarea" target="_blank">live</a>

<code>
&lt;textarea id="flexible_input" data-minheight="100" data-maxheight="400"&gt;&lt;/textarea&gt;
</code>
```javascript
requirejs(["lib/flexibledecorator"], function(flexible) {
	flexible(document.getElementById("flexible_input"));
});
```

or

<code>
&lt;textarea id="flexible_input"&gt;&lt;/textarea&gt;
</code>
```javascript
requirejs(["lib/flexibledecorator"], function(flexible) {
	flexible(document.getElementById("flexible_input"), 100, 400);
});
```

If you are not using requirejs then just need to expose textareaDecorator function in js/lib/flexibledecorator.js  and 
call that function with textarea as argument
```javascript
textareaDecorator(document.getElementById("flexible_input"));
```

