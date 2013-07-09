/**
 * @fileoverview event handlers en elementen voor de ria pagina.
 */

// multiple versions of JQuery/JQuery UI can cause problems.
jQuery.noConflict();

/**
 * document onload event handling.
 */
jQuery(document)
		.ready(
				function() {
					// create map
					Viewer.init(config);

					var maps = jQuery.grep(_layers, function(n, i) {
						return n.id == config.defaultMapId;
					});

					Viewer.loadWMS(maps[0]);

					/* popup */
					jQuery('.fancybox').fancybox();

					/* slidedown effect */
					var settings_head = jQuery('.settingsPanel > li > a');
					settings_head.first().addClass('active').next().slideDown('normal');
					// todo: compute height on click
					jQuery('#legenda').css('max-height', jQuery(window).height() - 500); 
					settings_head.on('click', function(event) {
						event.preventDefault();
						jQuery(this).next().stop(true, true).slideToggle('normal');
						if (jQuery(this).attr('class') != 'active') {
							jQuery(this).addClass('active');
						} else {
							jQuery(this).removeClass('active');
						}
					});

					var menuAccordion_head = jQuery('.menuAccordion > li > .accordionheader'), menuAccordion_body = jQuery('.menuAccordion li > .menuAccordionContent');
					menuAccordion_head.first().addClass('active').next().slideDown('normal');
					menuAccordion_head.on('click', function(event) {
						event.preventDefault();

						if (jQuery(this).attr('class') != 'active') {
							menuAccordion_body.slideUp('normal');
							jQuery(this).next().stop(true, true).slideToggle('normal');
							menuAccordion_head.removeClass('active');
							jQuery(this).addClass('active');
						}
					});
				});

/**
 * Change theme from menu
 * 
 * @param event
 *            DOM click event
 */
jQuery('.switchlayer').click(
		function(event) {
			event.preventDefault();
			// only load new themes
			// only load new themes
			if (jQuery(this).attr('name') != config.defaultMapId && jQuery(this).attr('href') != '#'
					&& jQuery(this).attr('class') != 'accordionheader') {

				var _id = jQuery(this).attr('name');

				var maps = jQuery.grep(_layers, function(n, i) {
					return n.id == _id;
				});
				Viewer.loadWMS(maps[0]);
				// bijwerken pagina titel
				jQuery('title').html(OpenLayers.i18n('KEY_KAART_TITEL', {
					'0' : '' + maps[0].name
				}));
				jQuery('#pagSubTitle').html(OpenLayers.i18n('KEY_KAART_TITEL', {
					'0' : '' + maps[0].name
				}));

				// bijwerken download link
				if (maps[0].link) {
					jQuery('#downloadLink').html(
							'<a href="' + maps[0].link + '">Download de dataset voor'
									+ OpenLayers.i18n('KEY_KAART_TITEL', {
										'0' : '' + maps[0].name
									}) + '</a>');
				} else {
					jQuery('#downloadLink').html('');
				}

				config.defaultMapId = _id;
			}
		});

/**
 * dynamische elementen aan de pagina toevoegen.
 */
var setupPage = {
	init : function() {
		OpenLayers.Lang.setCode('nl');

		// verwijder core container, die hebben we niet nodig als er javascript
		// ondersteuning is.
		jQuery('#coreContainer').remove();

		// a11y link toevoegen in de DOM boven de kaart
		var aLink = '<a id="activeerKeys" class="accesskey" href="" accesskey="1" onclick="jQuery(\'#' + config.mapDiv
				+ '\').attr(\'tabindex\',-1).focus(); return false;" title="' + OpenLayers.i18n('KEY_KEYBOARDNAV_TTL')
				+ '">' + OpenLayers.i18n('KEY_KEYBOARDNAV') + '</a>';
		jQuery('#' + config.mapDiv).prepend(aLink);

		// core link toevoegen aan de kaart voor het geval de javascript kaart
		// niet "goed" is
		var aCore = '<a id="naarCoreLink" class="accesskey" href="?coreonly=true">' + OpenLayers.i18n('KEY_CSSERROR')
				+ '</a>';
		jQuery('#' + config.mapDiv).prepend(aCore);

		ZoekFormulier.init();

		// uitvouwen van de accordion na change event, klap de legenda in voor
		// meer duidelijkheid voor de gebruiker
		jQuery('#' + config.featureInfoDiv).change(function() {
			if (jQuery('#keyfeatureinfo a').attr('class') != 'active') {
				jQuery('#keyfeatureinfo a').next().stop(true, true).slideToggle('normal');
				jQuery('#keyfeatureinfo a').addClass('active');
			}
		});
	}
};

setupPage.init();
