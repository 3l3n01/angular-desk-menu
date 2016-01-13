angular.module("angular-desk-menu", [])

.directive("deskMenu", [function() {

	return {
		scope: {
			callback: "&"
		},
		restrict: "E",
		replace: true,
		transclude: true,
		template: "<nav class='desk-toolbar'><ul ng-transclude></ul></nav>",
		link: function(scope, element, attrs) {
			if (!attrs.hasOwnProperty("callback"))
				scope.callback = function(bop) {};

			scope.$on("desk-toolbar", function(event, value) {
				scope.callback({value: value});
			});


		}
	}
}])

.directive("deskOption", ['$document', function($document) {

	return {
		restrict: "E",
		replace: true,
		transclude: true,
		template: "<li ng-transclude></li>",
		link: function(scope, element, attrs) {

			if (attrs.hasOwnProperty("label")) {
				var label = $document[0].createElement("a");
				label.setAttribute("href", "#");
				label.innerText = attrs.label;
				label.textContent = attrs.label;
				if(element[0].firstChild)element[0].insertBefore(label,element[0].firstChild);
					else element[0].appendChild(label);
			}
			
		}
	}
}])

.directive("deskLabel", [function() {

	return {
		restrict: "E",
		replace: true,
		transclude: true,
		template: "<a href='#' ng-transclude></a>",
		link: function(scope, element, attrs) {
		}
	}
}])

.directive("deskDropdown", [function() {

	return {
		restrict: "E",
		replace: true,
		transclude: true,
		template: "<ul ng-transclude></ul>",
		link: function(scope, element, attrs) {
		}
	}
}])

.directive("deskDdOption", ['$document', '$timeout', function($document, $timeout) {

	return {
		scope: {
			disabled: "=",
			deskValue: "="
		},
		restrict: "E",
		replace: true,
		transclude: true,
		template: "<li ng-transclude tabindex='0' ng-class='{\"desk-option-disabled\": disabled}'></li>",
		link: function(scope, element, attrs) {

			if (!attrs.hasOwnProperty("disabled"))
				scope.disabled=false;


			element.on("click", function(e) {
				e.stopPropagation();

				if (!scope.disabled) {
					element[0].style.backgroundColor = "#DDDDDD";
					$timeout(function() {
						element[0].style.backgroundColor = "";
					}, 100);

					if (scope.hasOwnProperty("deskValue"))
						scope.$emit("desk-toolbar", scope.deskValue);
				}

			});

			scope.$on("$destroy", function() {
				element.off("click");
			});	


			var shortcut = null;

			if (attrs.hasOwnProperty("shortcut")) {

				// create shortcut object from shortcut attribute
				var commands = attrs.shortcut.split("-");
				shortcut = {ctrl: false, alt: false, shift: false, keyCode: null}; 
				for (var i=0; i<commands.length; i++) {
					if (commands[i].toLowerCase()=="ctrl")
						shortcut.ctrl = true;
					else if (commands[i].toLowerCase()=="shift")
						shortcut.shift = true;
					else if (commands[i].toLowerCase()=="alt")
						shortcut.alt = true;
					else 
						shortcut.keyCode = commands[1].charCodeAt(0);
				}

				// Add listener for keypress event
				scope.$on("desk-toolbox-shortcut", function(event, key, e) {
					if (angular.equals(key, shortcut)) {
						if (!scope.disabled)
							element[0].click();
						e.stopImmediatePropagation();
						e.preventDefault();
					}

				});


				// Add shortcut text
				var shortcut_obj = $document[0].createElement("span");
				shortcut_obj.className = "desk-toolbar-shortcut";
				shortcut_obj.innerText = attrs.shortcut;
				shortcut_obj.textContent = attrs.shortcut;
				element[0].appendChild(shortcut_obj);
			}

		}
	}
}])

.directive("deskIcon", [function() {

	return {
		restrict: "E",
		replace: true,
		transclude: true,
		template: "<span class='desk-toolbar-icon' ng-transclude></span>",
		link: function(scope, element, attrs) {
		}
	}
}])

.directive("deskKeypress", ['$document', function($document) {

	return {
		link: function(scope, element, attrs) {

			$document.on('keydown', function(e){
				scope.$broadcast("desk-toolbox-shortcut", {ctrl: e.ctrlKey, shift: e.shiftKey, alt: e.altKey, keyCode: e.keyCode}, e);
			});

			scope.$on("$destroy", function() {
				$document.off('keyup keydown');
			});
		}
	}
	

}])
;