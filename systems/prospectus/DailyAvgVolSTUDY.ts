#Average Daily Volume Indicator
#By Prospectus @ http://readtheprospectus.wordpress.com
declare upper;
input Days = 30;
input Level = 100.0;
input chartlabel = Yes;
def dailyvolsum = volume(period = "DAY")[1] * (if(days >= 1, 1, 0)) + volume(period = "DAY")[2] * (if(days >= 2, 1, 0)) + volume(period = "DAY")[3] * (if(days >= 3, 1, 0)) + volume(period = "DAY")[4] * (if(days >= 4, 1, 0)) + volume(period = "DAY")[5] * (if(days >= 5, 1, 0)) + volume(period = "DAY")[6] * (if(days >= 6, 1, 0)) + volume(period = "DAY")[7] * (if(days >= 7, 1, 0)) + volume(period = "DAY")[8] * (if(days >= 8, 1, 0)) + volume(period = "DAY")[9] * (if(days >= 9, 1, 0)) + volume(period = "DAY")[10] * (if(days >= 10, 1, 0)) + volume(period = "DAY")[11] * (if(days >= 11, 1, 0)) + volume(period = "DAY")[12] * (if(days >= 12, 1, 0)) + volume(period = "DAY")[13] * (if(days >= 13, 1, 0)) + volume(period = "DAY")[14] * (if(days >= 14, 1, 0)) + volume(period = "DAY")[15] * (if(days >= 15, 1, 0)) + volume(period = "DAY")[16] * (if(days >= 16, 1, 0)) + volume(period = "DAY")[17] * (if(days >= 17, 1, 0)) + volume(period = "DAY")[18] * (if(days >= 18, 1, 0)) + volume(period = "DAY")[19] * (if(days >= 19, 1, 0)) + volume(period = "DAY")[20] * (if(days >= 20, 1, 0)) + volume(period = "DAY")[21] * (if(days >= 21, 1, 0)) + volume(period = "DAY")[22] * (if(days >= 22, 1, 0)) + volume(period = "DAY")[23] * (if(days >= 23, 1, 0)) + volume(period = "DAY")[24] * (if(days >= 24, 1, 0)) + volume(period = "DAY")[25] * (if(days >= 25, 1, 0)) + volume(period = "DAY")[26] * (if(days >= 26, 1, 0)) + volume(period = "DAY")[27] * (if(days >= 27, 1, 0)) + volume(period = "DAY")[28] * (if(days >= 28, 1, 0)) + volume(period = "DAY")[29] * (if(days >= 29, 1, 0)) + volume(period = "DAY")[30] * (if(days >= 30, 1, 0)) + volume(period = "DAY")[31] * (if(days >= 31, 1, 0)) + volume(period = "DAY")[32] * (if(days >= 32, 1, 0)) + volume(period = "DAY")[33] * (if(days >= 33, 1, 0)) + volume(period = "DAY")[34] * (if(days >= 34, 1, 0)) + volume(period = "DAY")[35] * (if(days >= 35, 1, 0)) + volume(period = "DAY")[36] * (if(days >= 36, 1, 0)) + volume(period = "DAY")[37] * (if(days >= 37, 1, 0)) + volume(period = "DAY")[38] * (if(days >= 38, 1, 0)) + volume(period = "DAY")[39] * (if(days >= 39, 1, 0)) + volume(period = "DAY")[40] * (if(days >= 40, 1, 0)) + volume(period = "DAY")[41] * (if(days >= 41, 1, 0)) + volume(period = "DAY")[42] * (if(days >= 42, 1, 0)) + volume(period = "DAY")[43] * (if(days >= 43, 1, 0)) + volume(period = "DAY")[44] * (if(days >= 44, 1, 0)) + volume(period = "DAY")[45] * (if(days >= 45, 1, 0)) + volume(period = "DAY")[46] * (if(days >= 46, 1, 0)) + volume(period = "DAY")[47] * (if(days >= 47, 1, 0)) + volume(period = "DAY")[48] * (if(days >= 48, 1, 0)) + volume(period = "DAY")[49] * (if(days >= 49, 1, 0)) + volume(period = "DAY")[50] * (if(days >= 50, 1, 0)) + volume(period = "DAY")[51] * (if(days >= 51, 1, 0)) + volume(period = "DAY")[52] * (if(days >= 52, 1, 0)) + volume(period = "DAY")[53] * (if(days >= 53, 1, 0)) + volume(period = "DAY")[54] * (if(days >= 54, 1, 0)) + volume(period = "DAY")[55] * (if(days >= 55, 1, 0)) + volume(period = "DAY")[56] * (if(days >= 56, 1, 0)) + volume(period = "DAY")[57] * (if(days >= 57, 1, 0)) + volume(period = "DAY")[58] * (if(days >= 58, 1, 0)) + volume(period = "DAY")[59] * (if(days >= 59, 1, 0)) + volume(period = "DAY")[60] * (if(days >= 60, 1, 0));
def avgvol = dailyvolsum / Min(Days, 60);
rec todayvol = volume(period = "DAY");
plot percent = todayvol / avgvol * 100.0;
def AlertLevel = level;
addchartlabel(chartlabel, concat(percent, concat(" ", "% of AvgDailyVolume")), if percent >= level then color.green else color.red);
percent.hide();
#
# Alerts:
#
def alerttrigger = if percent >= level then 1 else 0; 
# BLOCK CODE BELOW
input alerttext = "AvgVolume Alert!";
input UseAlerts = {false, default true};
input AlertType = {default "ONCE", "TICK", "BAR"};
def at = AlertType;
input AlertSound = {"Bell", "Chimes", default "Ding", "NoSound", "Ring"};
alert(alerttrigger AND UseAlerts AND AT==Alert.BAR, alerttext, Alert.Bar, AlertSound);
alert(alerttrigger AND UseAlerts AND AT==Alert.ONCE, alerttext, Alert.ONCE, AlertSound);
alert(alerttrigger AND UseAlerts AND AT==Alert.TICK, alerttext, Alert.TICK, AlertSound);