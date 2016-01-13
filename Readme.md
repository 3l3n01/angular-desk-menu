# angular-desk-menu

Angular dropdown menu directive. Google docs style. 
Not released, be aware directive names may change.

### Features
- Unlimited submenus
- Key shortcuts
- No jQuery

### Installation

```bash
npm install angular-desk-menu
```

### Usage

```js
require("angular-desk-menu")
```

### Example

```html
<!-- Using font-awesome icons -->
<desk-menu desk-keypress callback="cb(value)"> <!-- Optional callback, either use regular ng-click -->
	<desk-option label="File">
		<desk-dropdown>
			<desk-dd-option>
				<desk-icon><i class="fa fa-bell-o"></i></desk-icon>
				<desk-label>Bell</desk-label>
			</desk-dd-option>
			<desk-dd-option desk-value="val"> <!-- Use desk-value to send val to callback on click -->
				<desk-icon><i class="fa fa-car"></i></desk-icon>
				<desk-label>Car</desk-label>
				<desk-dropdown>
					<desk-dd-option desk-value="val">
						<desk-icon><i class="fa fa-bell-o"></i></desk-icon>
						<desk-label>Bell</desk-label>
					</desk-dd-option>
					<desk-dd-option ng-click="cb('Clickable')" shortcut="Ctrl-C"> <!-- Register shortcut -->
						<desk-icon><i class="fa fa-car"></i></desk-icon>
						<desk-label>Car</desk-label>
					</desk-dd-option>
				</desk-dropdown>
			</desk-dd-option>
		</desk-dropdown>
	</desk-option>
<desk-menu>
```

### Docs

##### Modules

angular-desk-menu

##### Directives

- deskMenu 
	- callback, function, gets value from desk-value as attribute
	- desk-keypress, add this to listen for shortcuts

- deskOption
	- label (string), Label for menu dropdown

- deskDropdown

- deskDdOption
	- desk-value, value gets sent to callback on deskMenu
	- shortcut (string), Key shortcut for option. Preventing default on choosen shortcuts. Optional Ctrl, Alt, Shift and letter/number separated with dash. Ex Ctrl-C, Shift-Alt-F

- deskIcon
	
- deskLabel


### License

MIT




