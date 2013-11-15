(function () {
	//this is the default modding API module that is loaded as the first mod and provides convenience methods for other mods.
	//generally methods are added to the global object GDT.
	var ready = function () {
	};

	var error = function () {
	};

	GDT.loadJs(['mods/CheatMod/helpers/checks.js',
	'mods/CheatMod/api/persistence.js',
	'mods/CheatMod/api/events.js',
	'mods/CheatMod/api/platforms.js',
	'mods/CheatMod/api/topics.js',
	'mods/CheatMod/api/research.js',
	'mods/CheatMod/source/source.js'
	], ready, error);
})();