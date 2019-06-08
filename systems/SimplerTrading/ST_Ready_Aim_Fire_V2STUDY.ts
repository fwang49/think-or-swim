#
# ST_Ready_Aim_Fire
#
# Last Update 9/8/2016
#
# Copyright (c) 2010-2016 David H. Starr
#

#hint GenerateAlerts: Controls whether or not the indicator should generate alerts for major turns in overbought or oversold:\n<li>Yes to generate alerts</li><li>No to not generate alerts</li>
#hint AlertRequiresAim: Determines whether Ready and Aim signals are required for alerts.\n<li>Yes - Alerts will only be generated for major turns in overbought and oversold when they line up with Ready and Aim signals.</li><li>No - Alerts will be generated for every major turn signal regardless of Ready and Aim signals.</li>
declare lower;

input OverboughtOversold = 1.2;
input GenerateAlerts=No;
input AlertRequiresAim=Yes;

def CountChg;
rec SC;
def maxHigh = Highest(high, 10);
def minLow = Lowest(low, 10);

def k1v = Max(-100, Min(100, (StochasticFull(KPeriod = 5, slowing_period = 3, averageType=averageType.EXPONENTIAL))) - 50) / 50.01;
def k2v = Max(-100, Min(100, (StochasticFull(KPeriod = 8, slowing_period = 5, averageType=averageType.EXPONENTIAL))) - 50) / 50.01;
def k3v = Max(-100, Min(100, (StochasticFull(KPeriod = 17, slowing_period = 5, averageType=averageType.EXPONENTIAL))) - 50) / 50.01;
#def R1v = Max(-100, Min(100, reference RSI(2)) - 50) / 50.01;

plot ZeroLine = 0;
ZeroLine.SetDefaultColor(Color.BLUE);

plot Overbought = OverboughtOversold ;
plot Oversold = -OverboughtOversold ;


if k2v > 0
Then {
    CountChg = if k1v <= k2v and k1v[1] > k2v[1] and k2v[1] > 0 then -1 else 0;
    SC = CompoundValue(1,  Min (0, SC[1]) + CountChg, 0);
}
else {
    CountChg = if k1v >= k2v and k1v[1] < k2v[1] and k2v[1] <= 0 then 1 else 0;
    SC = CompoundValue (1,  Max (0, SC[1]) + CountChg, 0);
}

DefineGlobalColor ("Ready Buy", CreateColor(0,120,0));
DefineGlobalColor ("Aim Buy", Color.GREEN);
DefineGlobalColor ("Ready Sell", CreateColor(120,0,0));
DefineGlobalColor ("Aim Sell", Color.RED);

AddVerticalLine (((k2v > 0 and k1v <= k2v and k1v[1] > k2v[1]) or (k2v < 0 and k1v >= k2v and k1v[1] < k2v[1])), 
if AbsValue(SC) > 1 then "AIM" else "READY",
if SC > 1 then 
    GlobalColor ("Aim Buy")
else if SC == 1 then
    GlobalColor ("Ready Buy")
else if SC < -1 then
    GlobalColor ("Aim Sell")
else GlobalColor ("Ready Sell"));

rec f2 = CompoundValue(1, if IsNaN(0.5 * (Log((1 + k2v) / (1 - k2v)) + f2[1])) then f2[1]
                             else 0.5 * (Log((1 + k2v) / (1 - k2v)) + f2[1]), 0);
rec f3 = CompoundValue(1, if IsNaN(0.5 * (Log((1 + k3v) / (1 - k3v)) + f3[1])) then f3[1]
                             else 0.5 * (Log((1 + k3v) / (1 - k3v)) + f3[1]), 0);
rec value = CompoundValue(1, if maxHigh - minLow == 0 then 0 else 0.66 * ((close - minLow) / 
                             (maxHigh - minLow) - 0.5) + 0.67 * value[1], 0);
def truncValue = if value > 0.99 then 0.999 else if value < -0.99 then -0.999 else value;
rec f = CompoundValue(1, if IsNaN(0.5 * (Log((1 + truncValue) / (1 - truncValue)) + f[1])) then                           f[1] else 0.5 * (Log((1 + truncValue) / (1 - truncValue)) + f[1]), 0);

plot Major = if IsNaN(close) then Double.NaN else f3;
plot Moderate  = if IsNaN(close) then Double.NaN else f2;
plot Minor    = if IsNaN(close) then Double.NaN else f;

plot MinorBuy = if (Sign (f - f[1]) > Sign (f[1] - f[2]))  and !IsNaN(close) then f[1] else Double.NaN;
plot ModBuy = if (Sign (f2 - f2[1]) > Sign (f2[1] - f2[2])) and !IsNaN(close) then f2[1] else Double.NaN;
plot MajorBuy = if (Sign (f3 - f3[1]) > Sign (f3[1] - f3[2])) and !IsNaN(close) then f3[1] else Double.NaN;

plot MinorSell = if (Sign (f - f[1]) < Sign (f[1] - f[2]))  and !IsNaN(close) then f[1] else Double.NaN;
plot ModSell = if (Sign (f2 - f2[1]) < Sign (f2[1] - f2[2]))  and !IsNaN(close) then f2[1] else Double.NaN;
plot MajorSell = if (Sign (f3 - f3[1]) < Sign (f3[1] - f3[2]))  and !IsNaN(close) then f3[1] else Double.NaN;

def BuyCloudL = if sc>1 then OverboughtOversold else if sc == 1 then -OverboughtOversold else double.NaN;
def BuyCloudH = if sc>1 then -OverboughtOversold else if sc == 1 then OverboughtOversold else double.NaN;
AddCloud (BuyCloudL, BuyCloudH, GlobalColor ("Aim Buy"), GlobalColor ("Ready Buy"));
def SellCloudL = if sc<-1 then OverboughtOversold else if sc == -1 then -OverboughtOversold else double.NaN;
def SellCloudH = if sc<-1 then -OverboughtOversold else if sc == -1 then OverboughtOversold else double.NaN;
AddCloud (SellCloudL, SellCloudH, GlobalColor ("Aim Sell"), GlobalColor ("Ready Sell"));


Moderate.SetDefaultColor(Color.GREEN);
Major.SetDefaultColor(Color.MAGENTA);
Minor.SetDefaultColor(Color.CYAN);

ModBuy.SetDefaultColor(Color.GREEN);
MajorBuy.SetDefaultColor(Color.MAGENTA);
MinorBuy.SetDefaultColor(Color.CYAN);
ModSell.SetDefaultColor(Color.GREEN);
MajorSell.SetDefaultColor(Color.MAGENTA);
MinorSell.SetDefaultColor(Color.CYAN);

ModBuy.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
MajorBuy.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
MinorBuy.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
ModSell.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);
MajorSell.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);
MinorSell.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);

MajorBuy.SetLineWeight(5);
ModBuy.SetLineWeight(3);
MinorBuy.SetLineWeight(1);
MajorSell.SetLineWeight(5);
ModSell.SetLineWeight(3);
MinorSell.SetLineWeight(1);

Overbought.SetDefaultColor (Color.BLUE);
Oversold.SetDefaultColor (Color.BLUE);

Alert(GenerateAlerts and (AlertRequiresAim == No or sc>1) and MinorBuy<=0-OverboughtOversold, "Ready, Aim, Fire! Buy", Alert.BAR, Sound.RING);
Alert(GenerateAlerts and (AlertRequiresAim == No or sc<-1) and MinorSell>=OverboughtOversold, "Ready, Aim, Fire! Sell", Alert.BAR, Sound.RING);

