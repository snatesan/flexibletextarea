(function() {

define(["modernizr"], function(modernizer) {
	"use strict";

	function textareaDecorator(textEl, minHeight, maxHeight) {
		var isBinded = textEl.getAttribute("data-decorate-grow");

		if(isBinded == 1) {
			return null;
		}

		minHeight = minHeight || textEl.getAttribute("data-minheight");
		maxHeight = maxHeight || textEl.getAttribute("data-maxheight");

		minHeight = parseInt(minHeight, 10) || 100;
		maxHeight = parseInt(maxHeight, 10) || 400;

		textEl.addEventListener("input", onInputChanged);
		textEl.setAttribute("data-decorate-grow", 1);
		textEl.setAttribute("data-minheight", minHeight);
		textEl.setAttribute("data-maxheight", maxHeight);

		return {
			remove: function() {
				if(textEl) {
					textEl.removeEventListener("input", onInputChanged);
					textEl = null;
				}
			}
		};

	}

	function onInputChanged(e) {
		var srcEl = e.target,
			isRunning = srcEl.getAttribute("data-resize-on");

		if(isRunning == 1) {
			return;
		}

		srcEl.setAttribute("data-resize-on", 1);

		var requestAnimFrame = modernizer.prefixed("requestAnimationFrame", window) ||  legacySupport;

		requestAnimFrame(resizeTextarea.bind(null, srcEl));
	}

	function legacySupport(callback) {
		setTimeout(callback, 1000/60);
	}

	function resizeTextarea(textEl) {
		var name = textEl.getAttribute("data-clone-id"),
			minHeight = parseInt(textEl.getAttribute("data-minheight"), 10),
			maxHeight = parseInt(textEl.getAttribute("data-maxheight"), 10),
			clientHeight = textEl.clientHeight,
			scrollHeight = textEl.scrollHeight,
			cloneEl, cloneHeight;

		if(scrollHeight > clientHeight) {
			//increase the height if max height is not reached
			if(clientHeight < maxHeight) {
				textEl.style.height = Math.min(scrollHeight, maxHeight) + "px";
			}
		} else {

			if(name) {
				cloneEl = document.getElementById(name);
			} 

			if(!cloneEl) {
				//create the clone element of the textarea

				name = textEl.getAttribute("id") || textEl.getAttribute("name");

				if(!name) {
					name = Date.now().toString();
				}

				name += Math.ceil(Math.random()*100);

				cloneEl = textEl.cloneNode();
				cloneEl.classList.add("hiddenclone");
				cloneEl.setAttribute("id", name);
				document.body.appendChild(cloneEl)

				textEl.setAttribute("data-clone-id", name);
			}

			cloneEl.value = textEl.value;
			
			cloneHeight = cloneEl.scrollHeight;

			if(cloneHeight < scrollHeight) {
				//decrease the height when user deletes content

				textEl.style.height = cloneHeight + "px";
			}

		}

		textEl.setAttribute("data-resize-on", 0);

	}

	return textareaDecorator;
});

})();
