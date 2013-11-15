var CheatModKristof1104 = {};
(function () {

	function addDreamTeam(){
		for (var i=1;i<GameManager.company.maxStaff;i++){
		var skipCharacter = false;
			for(var j=0;j<GameManager.company.staff.length;j++){
				if(GameManager.company.staff[j].slot == i){
					skipCharacter = true;
					break;
				}
			}
			
			if(skipCharacter){
				continue;
			}
			
			var character = new Character({
                    id: GameManager.getGUID(),
                    name: "Cheater"+i,
                    dF: 2,
                    tF: 2,
                    speedF: 2,
                    qualityF: 1,
                    experience: 10000,
                    researchF: 2,
                    salary: 1,
                    efficiency: 1,
                    slot: i,
                    sex: 1
					});
				
					GameManager.setBodyAndHead(character);
					character.flags.hiredTimestamp = GameManager.gameTime;
					character.flags.nextVacation = GameManager.gameTime + 48E3 * GameManager.SECONDS_PER_WEEK;
					character.flags.workload = 0;
					GameManager.company.staff.push(character);
					GameManager.uiSettings.findStaffData = null;
					VisualsManager.reloadAllCharacters();
					GameManager.company.staff[GameManager.company.staff.length - 1].startAnimations();
					VisualsManager.addComputer(character);
					VisualsManager.refreshHiringButtons();
					VisualsManager.refreshTrainingOverlays();
					alert(GameManager.company.staff.length);
		}
		
		2 < GameManager.company.staff.length && GameManager.enableMediumContracts();
		UI.reset();
		
	}
	
	function addMoney(){
		GameManager.company.adjustCash(1000000,"cheat mode 1M");
	}
	
	function addResearchPoints(){
		GameManager.company.researchPoints += 100;
		VisualsManager.researchPoints.updatePoints(GameManager.company.researchPoints); 
	}
	
	function addFans(){
		GameManager.company.fans += 1000000;
	}
	
	
	var div = $("body");
	div.append('<div id="CheatContainer" class="windowBorder notificationThreeOptions" style="height: 550px;"></div>');
	div = $("#CheatContainer");
	div.append('<div id="money" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="width: 450px;" >Add Money (1M)</div>');
	div.append('<div id="research" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="width: 450px;">Add Research Points (100pt)</div>');
	div.append('<div id="fans" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="width: 450px;">Add Fans (1M)</div>');
	div.append('<div id="dreamteam" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="height: 100px;width: 450px">Fill open Team positions with 1337 Teammembers</div>');
	
	UI.pickCheatClick = function (a) {
		Sound.click();
		switch (a.id) {
            case "money":
                addMoney();
				break;
            case "research":
                addResearchPoints();
				break;
            case "fans":
                addFans();
				break;
			case "dreamteam":
                addDreamTeam();
				break;
            default:
                return;
            }
	}
	
	var original_showContextMenu = UI._showContextMenu;
	var new_showContextMenu = function(b, c, d, h){
		//add your custom code
		GameManager.isIdle() && (!GameManager.currentEngineDev && 0 < GameManager.company.staff.filter(function (a) {
            return a.state === CharacterState.Idle
        }).length) && c.push({
                label: "CheatMode...",
                action: function () {
                    Sound.click();
					GameManager.resume(true);
					
						 var div = $("#CheatContainer");
						 div.gdDialog({
							popout: !0,
							close: !0
						})
                }
            })
			
		original_showContextMenu(b, c, d, h);
	};
	UI._showContextMenu = new_showContextMenu
})();