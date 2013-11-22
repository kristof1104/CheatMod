var CheatModKristof1104 = {};
(function () {
	var new_date = 0;
	var perfectScores = false;

	function removeNeedForVacationForStaff(){
			for(var i=0;i<GameManager.company.staff.length;i++){
				var character = GameManager.company.staff[i];
					character.flags.nextVacation = 2700 * (GameManager.SECONDS_PER_WEEK * 1E3);; // more then 40 years :)
					character.flags.needsVacation = false;
			}
	}
	
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
	function addMoney(money){
		GameManager.company.adjustCash(money,"cheat mode " + money / 1000000 + "M");
	}
	
	function addResearchPoints(){
		GameManager.company.researchPoints += 100;
		VisualsManager.researchPoints.updatePoints(GameManager.company.researchPoints); 
	}
	
	function addFans(){
		GameManager.company.fans += 1000000;
	}	
	
	function addHype(){
		GameManager.company.adjustHype(GameManager.company.currentGame.hypePoints + 100);
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
	div.append('<div id="CheatContainer" class="windowBorder tallWindow" style="overflow:auto;display:none;"> <div id="cheatmodtop" class="windowTitle smallerWindowTitle">CheatMod</div>');
	div = $("#CheatContainer");
	div.append('<div id="moneylbl" style="margin-left:50px;width: 450px;" >Add Money</div>');
	div.append('<div id="money1M" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="display:inline-block;position: relative;margin-left:50px;width: 142px;" >Add 1M</div>');
	div.append('<div id="money10M" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="display:inline-block;position: relative;margin-left:0px;width: 142px;" >Add 10M</div>');
	div.append('<div id="money100M" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="display:inline-block;position: relative;margin-left:0px;width: 142px;" >Add 100M</div>');
	div.append('<div id="research" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="margin-left:50px;width: 450px;">Add Research Points (100pt)</div>');
	div.append('<div id="fans" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="margin-left:50px;width: 450px;">Add Fans (1M)</div>');
	div.append('<div id="hype" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="margin-left:50px;width: 450px;">Add Hype (100pt)</div>');
	div.append('<div id="dreamteam" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="margin-left:50px;height: 100px;width: 450px">Fill open Team positions with 1337 Teammembers</div>');
	div.append('<div id="moveToLvl4" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="margin-left:50px;width: 450px">Move To Final level</div>');
	div.append('<div id="AAAResearch" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="margin-left:50px;width: 450px">Add AAA games</div>');
	div.append('<div id="removeNeedForVacationForStaff" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="margin-left:50px;width: 450px">Remove need for staff vacation</div>');
	div.append('<div id="setPerfectScoreEnabled" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="margin-left:50px;width: 450px">Activate Always have PerfectScores</div>');
	
	div.append('<div id="cheatmodtop" class="windowTitle smallerWindowTitle">Experimental!</div>');
	div.append('<div style="margin-left:50px;width: 450px">Move through time, only use this for mod development/testing!(Moving back in time can add double platforms, moving in the future should work fine!</div>');
	div.append('<div id="cheatmod_date" style="text-align:center;margin-left:50px;width: 450px"></div>');
	div.append('<div class="volumeSlider"></div>');
	div.append('<div id="moveToDate" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="margin-left:50px;width: 450px">Move To Date</div>');
	
	UI.pickCheatClick = function (a) {
		Sound.click();
		switch (a.id) {
            case "money1M":
                addMoney(1000000);
				break;
            case "money10M":
                addMoney(10000000);
				break;
            case "money100M":
                addMoney(100000000);
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
			case "removeNeedForVacationForStaff":
                removeNeedForVacationForStaff();
				break;
			case "hype":
                addHype();
				break;
			case "setPerfectScoreEnabled":
                setPerfectScoreEnabled();
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
		div.find("#cheatmod_date").html("Y" + year + " M" + month  + " W" + week);
	}	
	
	var original_showContextMenu = UI._showContextMenu;
	var new_showContextMenu = function(b, c, d, h){
		//add your custom code
		c.push({
                label: "CheatMode...",
                action: function () {
                    Sound.click();
					GameManager.resume(true);
					
						 var div = $("#CheatContainer");
						 
						 div.scrollTop()
						 
						 div.gdDialog({
							popout: !0,
							close: !0
						})
                }
            })

			div.animate({
				scrollTop: $("#cheatmodtop").offset().top
			}, 2000);
			
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
	
	
	//always perfect scores easy way
	var getPerfectScoreComment = function(){
		return ["A masterpiece.".localize(), "Best of its kind.".localize(), "Truly great.".localize(), "Everyone loves it!".localize(), "Must have!".localize(), "Outstanding achievement.".localize(), "Awesome!".localize(), "My new favorite!".localize()].pickRandom();
	}
	
	var setPerfectScores = function (e) {
		e.reviews[0].score = 10;
		e.reviews[0].message = getPerfectScoreComment;
		e.reviews[1].score = 10;
		e.reviews[1].message = getPerfectScoreComment;
		e.reviews[2].score = 10;
		e.reviews[2].message = getPerfectScoreComment;
		e.reviews[3].score = 10;
		e.reviews[3].message = getPerfectScoreComment;
		e.game.score = 10;
	};
	
	var setPerfectScoreEnabled = function(){
		if(perfectScores){
			GDT.off(GDT.eventKeys.gameplay.afterGameReview, setPerfectScores);
			var div = $("#CheatContainer");
			div.find("#setPerfectScoreEnabled").html("Activate Always have PerfectScores");
			perfectScores = false;
		}else{
			GDT.on(GDT.eventKeys.gameplay.afterGameReview, setPerfectScores);
			var div = $("#CheatContainer");
			div.find("#setPerfectScoreEnabled").html("Deactivate Always have PerfectScores");
			perfectScores = true;
		}
	}
})();