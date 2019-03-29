declare lower;

input study = {default MACD, RSI, CCI, Momentum, Moneyflow, OnBalanceVolume, RateOfChange, StochasticMomentumIndex, UltimateOscillator, VolumeFlowIndicator, VolumeOsc, VolumeRateOfChange, VolumeWeightedMACD, WilliamsPercentR, WoodiesCCI};


def mydivergence;
switch (study) {
case MACD:
    mydivergence = reference MACD.value;
case RSI:
    mydivergence = reference RSI;
case CCI:
    mydivergence = reference CCI;
case Momentum:
    mydivergence = reference Momentum;
case Moneyflow:
    mydivergence = reference MoneyFlow;
case OnBalanceVolume:
    mydivergence = reference OnBalanceVolume;
case RateOfChange:
    mydivergence = reference RateOfChange;
case StochasticMomentumIndex:
    mydivergence = reference StochasticMomentumIndex;
case UltimateOscillator:
    mydivergence = reference UltimateOscillator.Ultosc;
case VolumeFlowIndicator:
    mydivergence = reference VolumeFlowIndicator;
case VolumeOsc:
    mydivergence = reference VolumeOsc;
case VolumeRateOfChange:
    mydivergence = reference VolumeRateOfChange;
case VolumeWeightedMACD:
    mydivergence = reference VolumeWeightedMACD;
case WilliamsPercentR:
    mydivergence = reference WilliamsPercentR;
case WoodiesCCI:
    mydivergence = reference WoodiesCCI;
}

input length = 20;


def indicator = mydivergence;
def myslope = reference LinearRegressionSlope(mydivergence, length);
def bullslope = reference LinearRegressionSlope(low, length);
def bearslope = reference LinearRegressionSlope(high, length);
def priceslope = (bullslope + bearslope) / 2;

def isbulldiv = if (bullslope < 0 and myslope >= 0) then 1 else 0;
def isbeardiv = if (bearslope > 0 and myslope <= 0) then 1 else 0;


def myBullDiv = if isbulldiv then myslope * bullslope else 0 ;
#plot Bulldiv=if mydiv-bullpricediv>0 then mydiv-bullpricediv else 0;
def myBearDiv = if isbeardiv then myslope * bearslope else 0;
#plot beardiv = if mydiv - bearpricediv<0 then mydiv-bearPricediv else 0;
plot zeroline = 0;

def scale = Max(AbsValue(LowestAll(myBullDiv)), AbsValue(LowestAll(myBearDiv)));

plot bulldiv = AbsValue(myBullDiv) / scale * 100;
plot beardiv = -(AbsValue(myBearDiv)) / scale * 100;
plot up = 100;
plot down = -100;
up.setDefaultColor(color.light_green);
down.setdefaultcolor(color.light_red);

bulldiv.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
bulldiv.SetDefaultColor(Color.LIGHT_GREEN);
bulldiv.SetLineWeight(5);
beardiv.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
beardiv.SetDefaultColor(Color.LIGHT_RED);
beardiv.SetLineWeight(5);
zeroline.SetDefaultColor(Color.GRAY);