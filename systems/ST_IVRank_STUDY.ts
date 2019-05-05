declare lower;
declare hide_on_intraday;
 
#IVPercentile
def vol = imp_volatility();
input DisplayIVPercentile = yes;
input DisplayImpVolatility= yes;
input DisplayDaily1StandardDev = yes;
input DisplayWeekly1StandardDev = yes;
input DisplayMonthly1StandardDev = yes;
 
 
input TimePeriod = 252;
 
def data = if !isNaN(vol) then vol else vol[-1];
def hi = highest(data, TimePeriod);
def lo = lowest(data, TimePeriod);
plot Percentile = (data - lo) / (hi - lo) * 100;
def lowend = Percentile < 25;
def highend = Percentile > 50;
 
 
#Labels
addlabel(DisplayIVPercentile , concat("IV Rank: ",aspercent(Percentile /100)), if lowend then color.red else if highend then color.green else color.yellow);
 
addlabel(DisplayImpVolatility, concat("ImpVolatility: ",aspercent(vol)), if lowend then color.red else if highend then color.green else color.yellow);
 
def ImpPts = (vol / Sqrt(252)) * close;
AddLabel(DisplayDaily1StandardDev , Concat("Daily 1 SD +/- $", Astext( ImpPts, NumberFormat.TWO_DECIMAL_PLACES)), if lowend then color.red else if highend then color.green else color.yellow); ;
 
def ImpPts2 = (vol / Sqrt(52)) * close;
AddLabel(DisplayWeekly1StandardDev, Concat("Weekly 1 SD +/- $", Astext( ImpPts2, NumberFormat.TWO_DECIMAL_PLACES)), if lowend then color.red else if highend then color.green else color.yellow); ;
 
def ImpPts3 = (vol / Sqrt(12)) * close;
AddLabel(DisplayMonthly1StandardDev, Concat("Monthly 1 SD +/- $", Astext( ImpPts3, NumberFormat.TWO_DECIMAL_PLACES)), if lowend then color.red else if highend then color.green else color.yellow); ; 
 
 
plot LowVol = 25;
plot HighVol = 50;
 
LowVol.SetDefaultColor(GetColor(5));
HighVol.SetDefaultColor(GetColor(6));