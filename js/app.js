( function() {

	'use strict';
	var myApp = angular.module( 'MyApp', [ ] );

	myApp.controller( 'chairController', [ '$timeout', function( $timeout )
		{
			var self = this;
			var i, numChairs = 100;
			var delay = 80;

			self.chairs = [];
			self.index = 0;
			self.exterminateIndex = 0;
			self.exterminateNext = 0;
			self.winner = false;

			function initChairs()
			{
				for( i = 0; i < numChairs; i++ )
				{
					var chair = { 'id':0, 'state': 1 };

					chair.id = ( i + 1 );
					chair.state = 1;
					chair.selected = 0;
					self.chairs[ i ] = chair;

					self.index = 0;
					self.exterminateIndex = 0;
					self.exterminateNext = 0;
				}	
			}

			self.run = function()
			{
				if( self.chairs.length > 1 )
				{
					var i = 0;

					self.index = 0;
					self.exterminateIndex = 0;
					self.exterminateNext = 0;

					self.tipChairs();
				}
			};

			self.tipChairs = function()
			{
				$timeout( function()
				{
					self.chairTip();
					if( self.index < self.chairs.length )
					{
						self.chairs[ self.index ].selected = 1;

						self.tipChairs();			
					}
					else
					{
						self.removeTipped();

						if( self.chairs.length > 1 )
						{
							self.run();
						}
						else
						{
							self.winner = true;
						}
					}

					return;

				},  ( delay ) );
			};

			self.chairTip = function()
			{
				if( self.index === self.exterminateNext )
				{
					self.chairs[ self.index ].state = 0;

					self.chairs[ self.index ].selected = 0;

					self.index++;
					self.exterminateIndex++;
					self.exterminateNext = self.index + self.exterminateIndex;
				}
				else
				{
					self.chairs[ self.index ].selected = 0;

					self.index++;
				}
				
			};

			self.removeTipped = function()
			{
				var i = ( self.chairs.length - 1 );

				while( i > -1 )
				{
					if( self.chairs[ i ].state === 0 )
					{
						self.chairs.splice( i, 1 );
					}

					i--;
				}
			};

			self.reset = function()
			{
				initChairs();
				self.winner = false;
			};

			initChairs();
		} ]
	)

	.directive('chairWidget', [ function() 
		{
			return {
				template: "<div class='chair' ng-class=\"{  'tipped' : chair.state===0, 'selected' : chair.selected===1 }\" >"
				+ '<img src="images/chair1.png" alt="" />'
				+ '<span class="user_num">{{chair.id}}</span>'
				+ '</div>'
			}
		}
	] );


} ) ();