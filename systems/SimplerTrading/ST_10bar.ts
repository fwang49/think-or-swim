# ST_10xV1_1
# (C) 2017 Simpler Trading, LLC
# Revision Date: 09/11/17
# This revision refines Volume Strength calculation

DefineGlobalColor("Long", Color.GREEN);
DefineGlobalColor("Short", Color.RED);
DefineGlobalColor("Neutral", Color.LIGHT_ORANGE);

input DMIlength = 14;
input ADXThreshold = 20;
def ADX = DMI(length = DMIlength)."ADX";
def DIm = DMI(length = DMIlength)."DI-";
def DIp = DMI(length = DMIlength)."DI+";
def long = DIp > DIm and ADX > ADXThreshold;
def short = DIm > DIp and ADX > ADXThreshold;
AssignPriceColor(if long then GlobalColor("Long") else if short then GlobalColor("Short") else GlobalColor("Neutral"));

input volumeAveragingLength = 20;
input volumePercentThreshold = 50;
input showVolumeStrengthOnYellow = No;
def aVol = Average(volume, volumeAveragingLength);
def pVol = 100 * ((volume - aVol[1]) /aVol[1]);
def pDot = pVol >= volumePercentThreshold;
plot volumeStrength = if pDot and (long or short or showVolumeStrengthOnYellow) then hl2 else Double.NaN;
volumeStrength.SetPaintingStrategy(PaintingStrategy.POINTS);
volumeStrength.SetLineWeight(5);
volumeStrength.SetDefaultColor(color.cyan);
volumeStrength.hideBubble();

input enableAlerts = NO;
alert(enableAlerts and long and !long[1], "10x Green Alert", alert.bar, sound.ring);
alert(enableAlerts and short and !short[1], "10x Red Alert", alert.bar, sound.ring);
alert(enableAlerts and pDot and (long or short or showVolumeStrengthOnYellow), "10x Volume Strength Alert", alert.bar, sound.ring);

plot scan = if long then 1 else if short then -1 else 0;
scan.hide();

#hint: <b>Simpler Trading 10x</b>\n\n Revision 09/11/17: \n1) Volume Strength calculation refined.
