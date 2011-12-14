/*!
 * Ext.ux.PasswordMeter
 * 
 * Copyright 2011, Dan Harabagiu
 * Licenced under the Apache License Version 2.0
 * See LICENSE
 * 
 * Version : 0.1 - Initial coding
 */
/*global Ext : false, */
var PasswordMeter = Ext.define('Ext.ux.PasswordMeter', {
	extend		:	'Ext.form.TextField',
    alias		:	'widget.passwordMeter',    
    requires	:	['Ext.form.field.VTypes', 'Ext.layout.component.field.Text'],
    inputType	:	'password',
    //Configurable parameters
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
	/**
	 * Initialisez the elements and renders them
	 * @param {Ext.Component} The component itself
	 * @param {Object} The options object
	 * @return nothing
	 * Private Function
	 */
	onRender: function(ct, position) {
		Ext.ux.PasswordMeter.superclass.onRender.call(this, ct, position);
		
		var elp = this.el.findParent('div', 1, true);		
		var inputField = elp.child('div[id^=passwordMeter]',false);
		var objectWidth = 0;
		if(inputField !== null) {
			objectWidth = inputField.getWidth();
			
			this.scoreText = inputField.createChild({
				tag		:	'div',
				'id'	:	'scoreText',
				'style'	:	{
					'width'		:	objectWidth,
					'color'		:	this.backgroundColor,
					'text-align':	this.textAlign,
					'margin-top':	5
				}
			});

			
			this.objMeter = inputField.createChild({
				tag		:	"div",
				'id'	:	'metterContainer',
				'style'	:	{
					'height'	:	5,
					'margin-top':	3,
					'width'		:	objectWidth,
					'background-color'	:	this.backgroundColor
				}
			});
		}
		else {
			throw("Can't find the text field");
		}
		
		this.objMeter.setWidth(objectWidth);		
		this.scoreBar = this.objMeter.createChild({
			tag		:	"div",
			'id'	:	'scoreBar',
			'style'	:	{
				'height'	:	5,
				'width'		:	0				
			}
		});
		
		if(Ext.isIE && !Ext.isIE7) { // Fix style for IE6
			this.objMeter.setStyle('margin-left', '3px');
			this.scoreText.setStyle('margin-left', '3px');
		}
	},
	/**
	 * Initialise event listeners
	 * @return nothing
	 * Private function
	 */
	initEvents: function() {
		Ext.ux.PasswordMeter.superclass.initEvents.call(this);
		
		this.el.on('keyup', this.resizeMeter, this);
	},
	/**
	 * Sets a new width, based on the size of the input field
	 * @param {Ext.Component} obj
	 * @return nothing
	 * Private function
	 */
	resizeMeter: function(obj) {
		var elp = this.el.findParent('div', 1, true);
		var inputField = elp.child('div[id^=passwordMeter]',false);
		var objectWidth = inputField.getWidth();
		this.objMeter.setWidth(objectWidth);
		this.scoreText.setWidth(objectWidth);
		this.updateMeter(obj);
	},
	/**
	 * Sets the width of the meter, based on the score
	 * @param {Ext.Component} obj
	 * @return nothing
	 * Private function
	 */
	updateMeter: function(obj) {
		var score = 0;
	    var p = obj.target.value;
		
		var maxWidth = this.objMeter.getWidth() - 2;
		
		var nScore = this.calcStrength(p);
		
		// Set new width
		var nRound = Math.round(nScore * 2);

		if (nRound > 100) {
			nRound = 100;
		}

		var scoreWidth = (maxWidth / 100) * nRound;
		this.scoreBar.setWidth(scoreWidth, true);
		this.setColorOnScore(nRound);
	},
	/**
	 * Set the color and text of the meter bar, based on the score
	 * @param {int} score
	 * @return nothing
	 * Private function
	 */
	setColorOnScore: function(score) {
		var color = this.backgroundColor;
		if(score < 30) {
			//weak
			color = this.colorL1;
			this.scoreText.update(this.textL1);
		}
		else if(score >= 30 & score < 60) {
			//poor
			color = this.colorL2;
			this.scoreText.update(this.textL2);
		}
		else if(score >= 60 & score < 90 ) {
			//good
			color = this.colorL3;
			this.scoreText.update(this.textL3);
		}
		else if(score >= 80){
			//excelent
			color = this.colorL4;
			this.scoreText.update(this.textL4);
		}
		this.scoreText.setStyle('color',color);
		this.scoreBar.setStyle('background-color',color);
	},
	/**
	 * Calculates the strength of a password
	 * @param {Ext.Component} p The password that needs to be calculated
	 * @return {int} intScore The strength score of the password
	 */
	calcStrength: function(p) {
		var intScore = 0;

		// PASSWORD LENGTH
		intScore += p.length;
		
		// length 4 or less
		if(p.length > 0 && p.length <= 4) {
			intScore += p.length;
		}
		// length between 5 and 7
		else if (p.length >= 5 && p.length <= 7) {
			intScore += 6;
		}
		// length between 8 and 15
		else if (p.length >= 8 && p.length <= 15) {
			intScore += 12;
		}
		// length 16 or more
		else if (p.length >= 16) {
			intScore += 18;
		}
		
		// LETTERS (Not exactly implemented as dictacted above because of my limited understanding of Regex)
		// [verified] at least one lower case letter
		if (p.match(/[a-z]/)) {
			intScore += 1;
		}
		// [verified] at least one upper case letter
		if (p.match(/[A-Z]/)) {
			intScore += 5;
		}
		// NUMBERS
		// [verified] at least one number
		if (p.match(/\d/)) {
			intScore += 5;
		}
		// [verified] at least three numbers
		if (p.match(/.*\d.*\d.*\d/)) {
			intScore += 5;
		}
		
		// SPECIAL CHAR
		// [verified] at least one special character
		if (p.match(/[!,@,#,$,%,^,&,*,?,_,~]/)) {
			intScore += 5;
		}
		// [verified] at least two special characters
		if (p.match(/.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~]/)) {
			intScore += 5;
		}
		
		// COMBOS
		// [verified] both upper and lower case
		if (p.match(/(?=.*[a-z])(?=.*[A-Z])/)) {
			intScore += 2;
		}
		// [verified] both letters and numbers
		if (p.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)) {
			intScore += 2;
		}
		// [verified] letters, numbers, and special characters
		if (p.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!,@,#,$,%,^,&,*,?,_,~])/)) {
			intScore += 2;
		}
		return intScore;
	},
});