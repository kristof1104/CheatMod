var CheatModKristof1104 = {};
(function () {

	var new_date = 0;

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
		}
		
		2 < GameManager.company.staff.length && GameManager.enableMediumContracts();
		UI.reset();
		
	}
	
	function moveToLevel4(){
	
		if(GameManager.company.gameLog.length == 0){
			GameManager.company.notifications.push(new Notification("CheatMod", "To continue to the final level, you need to have at least created game 1 game"));
			return
		}

		if(GameManager.company.currentLevel != 4){
		
			//add at least 1 staff member & at least 1 game
			if(GameManager.company.staff.length<2){
				GameManager.company.maxStaff = 7;
				//addDreamTeam();
				var character = new Character({
                    id: GameManager.getGUID(),name: "Cheater1",dF: 2,
                    tF: 2,speedF: 2,qualityF: 1,experience: 10000,
                    researchF: 2,salary: 1,efficiency: 1,
                    slot: 2,sex: 1});
				
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
			}
			GameManager.company.currentLevel = 4,
			VisualsManager.nextLevel();
			Media.createLevel4Notifications();
			GameManager.save(GameManager.company.slot + "L4");
			GameManager.resume(true);
		}
		unlockRnDLab();
		unlockHwLab();
	}		
	
	function unlockHwLab(){
		if(! GameManager.company.flags.hwLabUnlocked){
			GameManager.company.flags.hwLabUnlocked = !0;
			GameManager.company.flags.hwBudget = 0;
			GameManager.company.flags.fractionalHwLabCosts = 0;
			GameManager.company.notifications.push(new Notification("Hardware lab".localize(), "Our hardware lab is ready.".localize()));
			Tutorial.hwLabReady(); 
			GameManager.pause(!0); 
			
			UI.fadeInTransitionOverlay(function () {
				VisualsManager.loadStage(!0);
				VisualsManager.refreshLabCrew();
				VisualsManager.updateProjectStatusCards();
				UI.fadeOutTransitionOverlay(function () {
					GameManager.resume(true)
				})
			});
			GameManager.resume(true);
		}
	}	
	
	function unlockRnDLab(){
		if(! GameManager.company.flags.rndLabUnlocked){
			GameManager.company.flags.rndLabUnlocked = !0;
			GameManager.company.flags.rndBudget = 0;
			GameManager.company.flags.fractionalRndLabCosts = 0;
			GameManager.company.notifications.push(new Notification("R&D lab".localize(), "Our R&D  lab is ready.".localize()))
			Tutorial.rndLabReady();
			GameManager.pause(!0);
			UI.fadeInTransitionOverlay(function () {
                VisualsManager.loadStage(!0);
                VisualsManager.refreshLabCrew();
                VisualsManager.updateProjectStatusCards();
                UI.fadeOutTransitionOverlay(function () {
                    GameManager.resume(true)
                })
            });
			GameManager.resume(true);
		}
	}	
	function addMoney(){
		GameManager.company.adjustCash(1000000,"cheat mode 1M");
		alert(GameManager.company.currentWeek);
	}
	
	function addResearchPoints(){
		GameManager.company.researchPoints += 100;
		VisualsManager.researchPoints.updatePoints(GameManager.company.researchPoints); 
	}
	
	function addFans(){
		GameManager.company.fans += 1000000;
	}	
	function addAAAResearch(){
		if(GameManager.company.researchCompleted.indexOf(Research.MediumSizeGames) == -1){
			GameManager.company.notifications.push(new Notification("CheatMod", "To Add AAA games, you need to have medium games researched"));
			return;
		}
	
		if(-1 == GameManager.company.researchCompleted.indexOf(Research.AAA)){
			GameManager.company.researchCompleted.push(Research.AAA);
		}
	}

	var div = $("body");
	div.append('<div id="CheatContainer" class="windowBorder notificationThreeOptions" style="height: 650px;display:none;"></div>');
	div = $("#CheatContainer");
	div.append('<div id="money" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="width: 450px;" >Add Money (1M)</div>');
	div.append('<div id="research" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="width: 450px;">Add Research Points (100pt)</div>');
	div.append('<div id="fans" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="width: 450px;">Add Fans (1M)</div>');
	div.append('<div id="dreamteam" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="height: 100px;width: 450px">Fill open Team positions with 1337 Teammembers</div>');
	div.append('<div id="moveToLvl4" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="width: 450px">Move To Final level</div>');
	div.append('<div id="AAAResearch" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="width: 450px">Add AAA games</div>');
	div.append('<div id="cheatmod_date" style="width: 450px"></div>');
	div.append('<div class="volumeSlider"></div>');
	div.append('<div id="moveToDate" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="width: 450px">Move To Date</div>');
	
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
			case "moveToLvl4":
                moveToLevel4();
				break;
			case "AAAResearch":
                addAAAResearch();
				break;
			case "moveToDate":
                moveToDate();
				break;
            default:
                return;
            }
	}
	
	function moveToDate(){
		GameManager.gameTime = new_date * (GameManager.SECONDS_PER_WEEK * 1E3);
		//GameManager.company.currentWeek = GameManager.gameTime;
		General.proceedOneWeek(GameManager.company,new_date);
	}	
	
	function setDate(d){
		new_date = d
		
		 var a = Math.floor(d) % 4 + 1;
		 var c = Math.floor(d) / 4;
         var b = c / 12 + 1;
         var year = Math.floor(b);
         var month = Math.floor(c % 12 + 1);
         var week = Math.floor(a);
        
		var div = $("#CheatContainer");
		div.find("#cheatmod_date").html(year+"Y " + month + "M " + week + "W");
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
			
			
			//test slider
			div.find(".volumeSlider").slider({
            min: 0,
            max: 2160,
            range: "min",
            value: Math.floor(GameManager.company.currentWeek),
            animate: !1,
            slide: function (a, b) {
                var c = b.value;
                setDate(c);
            }
        });
		setDate(GameManager.company.currentWeek);
			
		original_showContextMenu(b, c, d, h);
	};
	UI._showContextMenu = new_showContextMenu
})();