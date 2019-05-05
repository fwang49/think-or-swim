declare lower;
input middleAggregation = AggregationPeriod.FIFTEEN_MIN;
input LongAggregation = AggregationPeriod.THIRTY_MIN;
input highestAggregation = AggregationPeriod.HOUR;


input fastLength = 8;
input slowLength = 17;
input MACDLength = 9;

input midTermFastLength = 8;
input midTermSlowLength = 17;
input midTermMACDLength = 9;

input longTermFastLength = 8;
input longTermSlowLength = 17;
input longTermMACDLength = 9;

input HeighestTermFastLength = 8;
input HeighestTermSlowLength = 17;
input HeighestTermMACDLength = 9;


#def middleAggregation = midTermPeriod;
#def highestAggregation = longTermPeriod ;

DefineGlobalColor("UpTrend", color.GREEN);
DefineGlobalColor("DownTrend", color.RED);
DefineGlobalColor("NoTrend", color.LIGHT_GRAY);

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
def longTermFastAvg = ExpAverage(close(period = LongAggregation) , longTermFastLength);
def longTermSlowAvg = ExpAverage(close(period = LongAggregation) , longTermSlowLength);

def longTermValue = longTermFastAvg - longTermSlowAvg;
def longTermAvg = ExpAverage(longTermValue, longTermMACDLength);
plot longTermDiff = (longTermValue - longTermAvg)*3;
longTermDiff.Hide();
longTermDiff.HideBubble();

def HeighestTermFastAvg = ExpAverage(close(period = highestAggregation) , HeighestTermFastLength);
def HeighestTermSlowAvg = ExpAverage(close(period = highestAggregation) , HeighestTermSlowLength);

def HeighestTermValue = longTermFastAvg - longTermSlowAvg;
def HeighestTermAvg = ExpAverage(longTermValue, longTermMACDLength);
plot HeighestTermDiff = (longTermValue - longTermAvg)*3;
HeighestTermDiff.Hide();
HeighestTermDiff.HideBubble();


def midTermLower = midTermDiff < midTermDiff[1];
def midTermHigher = midTermDiff > midTermDiff[1];
rec midTermSignal = if midTermLower then  yes  else if midTermSignal[1] == yes and midTermHigher == no then yes else no;
#plot test = midTermSignal;
def longTermLower = longTermDiff < longTermDiff[1];
def longTermHigher = longTermDiff > longTermDiff[1];
rec longTermSignal = if longTermLower then  yes  else if longTermSignal[1] == yes and longTermHigher == no then yes else no;

def HeighestTermLower = HeighestTermDiff < HeighestTermDiff[1];
def HeighestTermHigher = HeighestTermDiff > HeighestTermDiff[1];
rec HeighestTermSignal = if HeighestTermLower then  yes  else if HeighestTermSignal[1] == yes and HeighestTermHigher == no then yes else no;

midTermDiff.AssignValueColor(if midTermSignal then color.RED else color.BLUE);
longTermDiff.AssignValueColor(if longTermSignal then color.RED else color.BLUE);
HeighestTermDiff.AssignValueColor(if longTermSignal then color.RED else color.BLUE);

Diff.AssignValueColor(if Diff > Diff[1] and midTermSignal == no and longTermSignal == no and HeighestTermSignal == no then GlobalColor("UpTrend") else if Diff < Diff[1] and midTermSignal == yes and longTermSignal == yes and HeighestTermSignal == yes then GlobalColor("DownTrend") else GlobalColor("NoTrend") );
Diff.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
Diff.SetLineWeight(3);

plot zeroLine = if close[-1] > 0 then 0 else Double.Nan;
zeroLine.AssignValueColor(if Diff > Diff[1] and midTermSignal == no and longTermSignal == no and HeighestTermSignal == no then GlobalColor("UpTrend") else if Diff < Diff[1] and midTermSignal == yes and longTermSignal == yes and HeighestTermSignal == yes then GlobalColor("DownTrend") else GlobalColor("NoTrend") );
zeroLine.SetPaintingStrategy(PaintingStrategy.POINTS);
zeroLine.SetLineWeight(3);

def trigger = Diff > Diff[1] and midTermSignal == no and longTermSignal == no and HeighestTermSignal == no;
plot crossAbove = if trigger and diff[1] < 0 and diff > 0 then 0 else Double.NaN;
crossAbove.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
crossAbove.SetDefaultColor(Color.YELLOW);
crossAbove.SetLineWeight(3);  

def triggerd =Diff < Diff[1] and midTermSignal == yes and longTermSignal == yes and HeighestTermSignal == yes;
plot crossbelow = if triggerd and diff[1] > 0 and diff < 0 then 0 else Double.NaN;
crossbelow.SetPaintingStrategy(PaintingStrategy.ARROW_down);
crossbelow.SetDefaultColor(Color.white);
crossbelow.SetLineWeight(3);
