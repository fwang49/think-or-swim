input length = 14;
input averageType = AverageType.WILDERS;

# declare hide_on_daily;
input thredHoldPerc = 0.00;
AddLabel(yes, "PreviousHigh: " + high(period = AggregationPeriod.DAY)[1], Color.WHITE );
AddLabel(yes, "PreviousLow: " + low(period = AggregationPeriod.DAY)[1], Color.WHITE  );
AddLabel(yes, "PeviousCose: " + close(period = AggregationPeriod.DAY)[1], Color.WHITE  );
AddLabel(yes, "CurrentOpen: " + open(period = AggregationPeriod.DAY), Color.yellow);

def diff = open(period = AggregationPeriod.DAY) - close(period = AggregationPeriod.DAY)[1];
def perc = roundUp(diff / close(period = AggregationPeriod.DAY)[1], 4);
AddLabel(yes, if ( perc > thredHoldPerc) then "InitGapUp: " + perc*100 +"%" else "InitGapDown: " + perc*100+"%" ,  Color.yellow );
def diff2 =  close(period = AggregationPeriod.DAY) - close(period = AggregationPeriod.DAY)[1];
def perc2 = roundUp(diff2 / close(period = AggregationPeriod.DAY)[1], 4);
AddLabel(yes, "Change%: " + perc2*100+"%" ,  Color.yellow );


# declare hide_on_daily;
input avgVThredHold=20;
def prev =  volume(period = AggregationPeriod.DAY)[1];
def currentv = volume(period = AggregationPeriod.DAY);
def avgv = Roundup(MovingAverage(AverageType.SIMPLE, volume(period = AggregationPeriod.DAY), avgVThredHold), 0);
# AddLabel(yes, "PreviousVolume: " + prev, Color.WHITE );
#AddLabel(yes, "CurrentVolume: " + currentv,  Color.WHITE  );

AddLabel(yes, if prev > currentv then  "PreviousVolume: " + prev+ " > CurrentVolume: " + currentv else  "PreviousVolume: " + prev+ " < CurrentVolume: " + currentv,  Color.WHITE  );

AddLabel(yes, avgVThredHold+ " days AvgVolume: " + avgv, Color.yellow);
def relativeVolume = roundUp(currentv /avgv , 2);
AddLabel(yes, "RV: " +relativeVolume  ,  Color.yellow );


def ADX = roundUp(DMI(length, averageType).ADX,2);

def DIPlus = roundUp(DMI(length, averageType)."DI+", 2);

def DIMinus = roundUp(DMI(length, averageType)."DI-", 2);

AddLabel(yes, if DIPlus >= DIMinus then  "DIPlus: " +  DIPlus + " > DIMinus: " + DIMinus else  "DIPlus: " + DIPlus+ " < DIMinus: " + DIMinus,  Color.WHITE  );

AddLabel(yes,  "ADX: " + ADX, Color.YELLOW);


def peak = Average(close, 7) / Average(close, 65) >= 1.05;
def count = if peak[1] then count[1] + 1 else 0;
AddLabel(yes, "PTI65 Up: " +count  ,  Color.white );

def down = Average(close, 7) / Average(close, 65) <= 0.95;
def countDown = if down[1] then countDown[1] + 1 else 0;
AddLabel(yes, "PTI65 Down: " +countDown  ,  Color.white );

AddLabel(yes, "TI65: " + roundup(Average(close, 7) / Average(close, 65), 2)  ,  Color.white );

AddLabel(yes, "COH: " + roundup((close-low) / (high-low)*100, 2)  ,  Color.white );

AddLabel(yes, "Comobo: " + roundup(Average(close, 7) / Average(close, 65)*(close-low) / (high-low)*100, 2)  ,  Color.yellow );

input length2=60;
def xx = -getEventOffset(Events.EARNINGS);
def yy = sum(HasEarnings(type = EarningTime.AFTER_MARKET),length2)[-length2 +1] > 0;

def x=xx+yy*.5;

AddLabel(yes, "DTE: " + x,  Color.red );

def ma50 = roundUp(average(close, 50), 2);
AddLabel(yes, if close >= ma50 then  "Close: " +  close + " > MA50: " + ma50 else  "Close: " + close+ " < MA50: " + ma50,  Color.WHITE  );


input ATRLength = 5;

input RSILength= 14;

def ATR = MovingAverage(averageType, TrueRange(high, close, low), ATRLength);
AddLabel(yes, Concat("ATR(" , Concat(ATRLength, Concat(") = ", roundup(ATR,2)))), Color.YELLOW);
AddLabel(yes, Concat("RSI(" , Concat(RSILength, Concat(") = ", roundup(rsi( RSILength),2)))), Color.YELLOW);

def startOfYear = GetYear() <> GetYear()[1];
rec startingClose = if startOfYear then close[1] else startingClose[1];
def ytd = 100 * (close / startingClose - 1);

AddLabel(yes,  "YTD: " + roundup(ytd,2) +"%", Color.YELLOW);

input lookback= 90;


#AddLabel(yes,"highest " + lookback+ " days : " + highest(high, lookback), Color.white);

# AddLabel(yes,"lowest " + lookback+ " days : " + lowest(low, lookback), Color.white);

def range= highest(high, lookback)-lowest(low, lookback);
# AddLabel(yes,"range" + lookback+ " days : " + range, Color.white);



