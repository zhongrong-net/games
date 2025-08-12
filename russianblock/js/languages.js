var curLang;

function initLang(){
	curLang = localStorage.getItem("curLang");
}

function getText(section, index){
	return game.cache.getJSON('langs').langs[curLang][section].texts[index];
}

function setLang(l){
	curLang = l;
}

function createLanguageFlags(){
	// game.add.button(56, 410, 'flags', function(){updateLanguage("CN")}, this, 5, 5, 5);
}

function updateLanguage(newLang){
	setLang(newLang);
	localStorage.setItem("curLang", curLang);
	game.state.start(game.state.current)
}
