input RateOfChangeSlowPeriod = 14;
input RateOfChangeFastPeriod = 11;
input WeightedMAPeriod = 10;

def AggregationPeriod = if (getAggregationPeriod() < AggregationPeriod.HOUR) then AggregationPeriod.HOUR else getAggregationPeriod();

def price = close(period = AggregationPeriod);

def ROC1 = if price[RateOfChangeSlowPeriod]!=0 then (price/price[RateOfChangeSlowPeriod]-1)*100 else 0;
def ROC2 = if price[RateOfChangeFastPeriod]!=0 then (price/price[RateOfChangeFastPeriod]-1)*100 else 0;

def Coppock = WMA(ROC1 + ROC2, WeightedMAPeriod);

def ZeroLine = 0;

def BuyNow = Coppock[1] < 0 and Coppock > Coppock[1] and Coppock[1] < Coppock[2];
#plot Buy1 = BuyNow;
#Buy1.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
#Buy1.SetLineWeight(1);
#Buy1.AssignValueColor(Color.WHITE);

def SellNow = Coppock[1] > 0 and Coppock < Coppock[1] and Coppock[1] > Coppock[2];
plot Sell1 = SellNow;
Sell1.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DoWN);
Sell1.SetLineWeight(1);
Sell1.AssignValueColor(Color.WHITE);

input priceclose = close;
input EMA = 4;
def displaceclose = 0;

input priceclose13 = close;
input EMA13 = 13;
def displaceclose13 = 0;

input pricehigh = close;
input SMA = 9;
def displacehigh = 0;

def AvgExpema = ExpAverage(priceclose[-displaceclose], EMA);
def AvgExpsma = Average(pricehigh[-displacehigh], SMA);
def AvgExp13 = ExpAverage(priceclose13[-displaceclose13], EMA13);

plot ln1 = AvgExp13;
ln1.SetDefaultColor(CreateColor(145, 210, 144));
ln1.SetLineWeight(2);

def US =  AvgExpema crosses above AvgExpsma;
def DS = AvgExpema crosses below AvgExpsma ;

AddOrder(OrderType.SELL_AUTO, condition = Sell1, price = close,1, tickcolor = Color.LIME, arrowcolor = Color.LIME, name = "Short");

AddOrder(OrderType.BUY_AUTO, condition = US, price = close,1, tickcolor = Color.LIME, arrowcolor = Color.LIME, name = "Cover");

AddLabel(yes,"4/9 Crossover Hidden. 13ema on",color.Yellow);
