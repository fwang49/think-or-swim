input swing_back = 8;
input swing_forward = 2;
input maxbars = 30;
input showlevels = Yes;
def sb = swing_back;
def sf = swing_forward;
def na = double.nan;

def lfor = Lowest(low, sf)[-sf];
def lback = Lowest(low, sb)[1];
def swinglow = if low < lfor and low <= lback then 1 else 0;
plot sl = if swinglow then low else na;
def hfor = Highest(high, sf)[-sf];
def hback = Highest(high, sb)[1];
def swinghigh = if high > hfor and high >= hback then 1 else 0;
plot sh = if swinghigh then high else na; 

sh.SetStyle(curve.points);
sh.SetLineWeight(5);
sh.SetDefaultColor(color.white);
sl.SetStyle(curve.points);
sl.SetLineWeight(5);
sl.SetDefaultColor(color.white);

rec lsl = if IsNaN(close[-sf]) then lsl[1] else if swinglow then low else lsl[1];
rec lsh = if IsNaN(close[-sf]) then lsh[1] else if swinghigh then high else lsh[1];

def bn = barNumber();
rec hcount = if swinghigh then 1 else hcount[1] + 1;
rec lcount = if swinglow then 1 else lcount[1] + 1;

plot lasthigh = if hcount<=maxbars AND IsNaN(close[-sf]) then lsh[1] else if hcount > maxbars then na else if hcount < 2 then na else lsh;
plot lastlow = if lcount<=maxbars AND IsNaN(close[-sf]) then lsl[1] else if lcount > maxbars then na else if lcount < 2 then na else lsl;

lasthigh.SetStyle(curve.SHORT_DASH);
lasthigh.SetDefaultColor(color.white);
lasthigh.setHiding(!showlevels);

lastlow.SetStyle(curve.sHORT_DASH);
lastlow.SetDefaultColor(color.white);
lastlow.setHiding(!showlevels);