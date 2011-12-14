# About.
 It is a Ext JS extension that will provide a password strength checker for a password field inside a standard form. It has some customisation possible
    
# How to use it?
 Download the Ext.ux.PasswordStrength.js to your server, include it into the HEAD of your page (After the Ext JS inclusion). No CSS file needed. For more details please have a look at the demo.html

# Screenshot?
 [ Flickr ] (http://blah)
 
# Configuration?

    {
    	//Standard options
		fieldLabel	:	'Password',
		name		:	'password',
		anchor		:	'100%',
		minLength	:	3,
		allowBlank	:	false,
		xtype		:	'passwordStrength',
		//Custom options
		backgroundColor	:	"#CACACA",
    	textAlign		:	"right",
    	colorL1			:	"#FF0000",
    	colorL2			:	"#C79322",
    	colorL3			:	"#005000",
    	colorL4			:	"#00AA00",
    	textL1			:	"Weak",
    	textL2			:	"Poor",
    	textL3			:	"Good",
    	textL4			:	"Excelent",
    }

# Explenations?

* _backgroundColor_ : The color of the background of the line that displays the meter
* _textAlign_ : The CSS alignment of the text of the meter
* _colorL1_ : The color of the first level of the meter (0-30%)
* _colorL2_ : The color of the second level of the meter (30-60%)
* _colorL3_ : The color of the third level of the meter (60-90%)
* _colorL4_ : The color of the fourth level of the meter (90-100%) 
* _textL1_ : The text of the first level of the meter (0-30%)
* _textL2_ : The text of the second level of the meter (30-60%)
* _textL3_ : The text of the third level of the meter (60-90%)
* _textL4_ : The text of the fourth level of the meter (90-100%)

# Enjoy it, and drop me a line if you like it