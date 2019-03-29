#Input the start time you want:

Declare fullrange;
Input StartTime = 0930;
input swing_back=5;
input swing_forward=3;
input showswingpoints = {default "Yes", "No"};
def ssp = showswingpoints;
def hs = if ssp == 0 then 0 else 1;
def sb=swing_back;
def sf=swing_forward;
def na=double.nan;

def lfor=lowest(low,sf)[-sf];
def lback=lowest(low,sb)[1];
def swinglow=if low<lfor and low<=lback then 1 else 0;
plot sl=if swinglow then low else na;
def hfor=highest(high,sf)[-sf];
def hback=highest(high,sb)[1];
def swinghigh=if high>hfor and high>=hback then 1 else 0;
plot sh=if swinghigh then high else na; 


#Next define recursive functions to hold your high and low values while waiting for the OR balance to complete:

def ORStart = if secondsFromTime (StartTime) >= 0 then 1 else 0;
def ORbar1 = if barNumber() == 1 and ORStart then 1 else if ORSTART and !ORSTART[1] then 1 else 0;

rec highs = if ORbar1 then high else if high > highs[1] then high else highs[1];
rec lows = if ORBar1 then low else if low < lows[1] then low else lows[1];

Rec countswinghigh = if barNumber() == 1 then 0 else if !ORStart then 0 else if ORStart AND swinghigh then countswinghigh[1] + 1 else countswinghigh[1];

Rec countswinglow = if barNumber() == 1 then 0 else if !ORStart then 0 else if ORStart AND swinglow then countswinglow[1] + 1 else countswinglow[1];

rec ORHigh = if !ORStart then double.nan else if countswinglow * countswinghigh <> 0 AND countswinglow[1] * countswinghigh[1] == 0 then highs else ORHigh[1];

rec ORLow = if !ORStart then double.nan else if countswinglow * countswinghigh <> 0 AND countswinglow[1] * countswinghigh[1] == 0 then lows else ORLow[1];

# Set up Plots

Plot ORH = if ORStart then ORHigh else double.nan;
Plot ORL = if ORSTART then ORLow else double.nan;
Plot ORH0=if ORStart AND countswinglow*countswinghigh==0 then highs else double.nan;
Plot ORL0=if ORStart AND countswinglow*countswinghigh==0 then lows else double.nan;
AddCloud(ORH, ORL);
AddCloud(ORL0, ORH0);

# Formatting

ORH.setdefaultcolor(color.DARK_GREEN);
ORL.setdefaultColor(color.dark_green);
ORH0.setdefaultColor(color.dark_red);
ORL0.setDefaultColor(color.dark_red);
sh.setHiding(hs);
sh.SetLineWeight(5);
sh.SetStyle(curve.POINTS);
sh.AssignValueColor(color.white);
sl.setHiding(hs);
sl.SetLineWeight(5);
sl.SetStyle(curve.POINTS);
sl.AssignValueColor(color.WHITE);