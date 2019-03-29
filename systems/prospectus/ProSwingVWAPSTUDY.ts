#Pro Swing VWAP
# Inputs
input swing_back=8;
input swing_forward=2;
input price = VWAP;

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

def hprice=if swinghigh then high*volume else price*volume+hprice[1];
def lprice=if swinglow then low*volume else price*volume+lprice[1];

def hvol = if swinghigh then volume else hvol[1]+volume;
def lvol= if swinglow then volume else lvol[1]+volume;

def hCMA = hprice/hvol;
def lCMA = lprice/lvol;


plot LongSwingVWAP=if isnan(close[-sf]) then na else if close>hCMA then na else hCMA;
plot ShortSwingVWAP= if isnan(close[-sf]) then na else if close<lCMA then na else lCMA;


#Formatting stuff
input Paintbars=Yes;
input FlagEarly = yes;
def pb=Paintbars;
assignpricecolor(if pb AND isnan(close[-sf]) AND FlagEarly then color.yellow else 
if isnan(LongSwingVWAP) AND !isnan(ShortSwingVWAP) AND pb then color.green else if isnan(ShortSwingVWAP) AND !isnan(longSwingVWAP) AND pb then color.red else if pb then color.gray else color.current);

LongSwingVWAP.setdefaultColor(color.light_green);
LongSwingVWAP.setLineWeight(2);
ShortSwingVWAP.setdefaultColor(color.light_red);
ShortSwingVWAP.setLineWeight(2);
LongSwingVWAP.setPaintingstrategy(paintingStrategy.points);
ShortSwingVWAP.setPaintingstrategy(paintingStrategy.points);

sh.setstyle(curve.points);
sh.setlineweight(5);
sh.setdefaultcolor(color.white);
sl.setstyle(curve.points);
sl.setlineweight(5);
sl.setdefaultcolor(color.white);