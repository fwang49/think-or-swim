
declare lower;
input midTermPeriod = {"1 min", "3 min", "5 min", "15 min", "30 min", "60 min", "120 min", "Daily", default "Weekly", "Monthly"};
input longTermPeriod = {"3 min", "5 min", "15 min", "30 min", "60 min", "120 min", "Daily", "Weekly", default "Monthly"};

input fastLength = 12;
input slowLength = 26;
input MACDLength = 9;

input midTermFastLength = 12;
input midTermSlowLength = 26;
input midTermMACDLength = 9;

input longTermFastLength = 12;
input longTermSlowLength = 26;
input longTermMACDLength = 9;

def middleAggregation;

switch (midTermPeriod) {
    case "1 min":
        middleAggregation = AggregationPeriod.MIN;
    case "3 min":
        middleAggregation = AggregationPeriod.THREE_MIN;
    case "5 min":
        middleAggregation = AggregationPeriod.FIVE_MIN;
    case "15 min":
        middleAggregation = AggregationPeriod.FIFTEEN_MIN;
    case "30 min":
        middleAggregation = AggregationPeriod.THIRTY_MIN;
    case "60 min":
        middleAggregation = AggregationPeriod.HOUR;
    case "120 min":
        middleAggregation = AggregationPeriod.TWO_HOURS;
    case "Daily":
        middleAggregation = AggregationPeriod.DAY;
    case "Weekly":
        middleAggregation = AggregationPeriod.WEEK;
    case "Monthly":
        middleAggregation = AggregationPeriod.MONTH;
}

def highestAggregation;
switch (longTermPeriod) {
    case "3 min":
        highestAggregation = AggregationPeriod.THREE_MIN;
    case "5 min":
        highestAggregation = AggregationPeriod.FIVE_MIN;
    case "15 min":
        highestAggregation = AggregationPeriod.FIFTEEN_MIN;
    case "30 min":
        highestAggregation = AggregationPeriod.THIRTY_MIN;
    case "60 min":
        highestAggregation = AggregationPeriod.HOUR;
    case "120 min":
        highestAggregation = AggregationPeriod.TWO_HOURS;
    case "Daily":
        highestAggregation = AggregationPeriod.DAY;
    case "Weekly":
        highestAggregation = AggregationPeriod.WEEK;
    case "Monthly":
        highestAggregation = AggregationPeriod.MONTH;
}

DefineGlobalColor("UpTrend", color.GREEN);
DefineGlobalColor("DownTrend", color.RED);
DefineGlobalColor("NoTrend", color.LIGHT_GRAY);

def timeFrame = getAggregationPeriod();
def testTimeFrames = if timeFrame < middleAggregation and middleAggregation < highestAggregation then yes else no;

AddLabel(yes, if testTimeFrames  then "Time Frames Are Correct" else "Time Frames Are Wrong", if testTimeFrames  then color.GREEN else color.RED);

# This section is for the chart level MACD
def fastAvg = ExpAverage(close, fastLength);
def slowAvg = ExpAverage(close, slowLength);

plot Value = fastAvg - slowAvg;
Value.SetDefaultColor(color.CYAN);
plot Avg = ExpAverage(Value, MACDLength);
Avg.SetDefaultColor(color.YELLOW);
plot Diff = (value - avg)*3;

# This section is for the medium term MACD
def midTermFastAvg = ExpAverage(close(period = middleAggregation) , midTermFastLength);
def midTermSlowAvg = ExpAverage(close(period = middleAggregation) , midTermSlowLength);

def midTermValue = midTermFastAvg - midTermSlowAvg;
def midTermAvg = ExpAverage(midTermValue, midTermMACDLength);
plot midTermDiff = (midTermValue - midTermAvg)*3;
midTermDiff.Hide();
midTermDiff.HideBubble();

# This section is for the long term MACD
def longTermFastAvg = ExpAverage(close(period = highestAggregation) , longTermFastLength);
def longTermSlowAvg = ExpAverage(close(period = highestAggregation) , longTermSlowLength);

def longTermValue = longTermFastAvg - longTermSlowAvg;
def longTermAvg = ExpAverage(longTermValue, longTermMACDLength);
plot longTermDiff = (longTermValue - longTermAvg)*3;
longTermDiff.Hide();
longTermDiff.HideBubble();


def midTermLower = midTermDiff < midTermDiff[1];
def midTermHigher = midTermDiff > midTermDiff[1];
rec midTermSignal = if midTermLower then  yes  else if midTermSignal[1] == yes and midTermHigher == no then yes else no;
#plot test = midTermSignal;
def longTermLower = longTermDiff < longTermDiff[1];
def longTermHigher = longTermDiff > longTermDiff[1];
rec longTermSignal = if longTermLower then  yes  else if longTermSignal[1] == yes and longTermHigher == no then yes else no;

midTermDiff.AssignValueColor(if midTermSignal then color.RED else color.BLUE);
longTermDiff.AssignValueColor(if longTermSignal then color.RED else color.BLUE);

Diff.AssignValueColor(if Diff > Diff[1] and midTermSignal == no and longTermSignal == no then GlobalColor("UpTrend") else if Diff < Diff[1] and midTermSignal == yes and longTermSignal == yes then GlobalColor("DownTrend") else GlobalColor("NoTrend") );
Diff.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
Diff.SetLineWeight(3);

plot zeroLine = if close[-1] > 0 then 0 else Double.Nan;
zeroLine.AssignValueColor(if Diff > Diff[1] and midTermSignal == no and longTermSignal == no then GlobalColor("UpTrend") else if Diff < Diff[1] and midTermSignal == yes and longTermSignal == yes then GlobalColor("DownTrend") else GlobalColor("NoTrend") );
zeroLine.SetPaintingStrategy(PaintingStrategy.POINTS);
zeroLine.SetLineWeight(3);


