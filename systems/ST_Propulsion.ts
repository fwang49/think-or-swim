# ST_Propulsion
# Last update 09/14/17
# (c) 2017 Simpler Trading

input colorPriceBars = No;
input ShortEMAlength = 8;
input LongEMAlength = 21;

def EMA1 = ExpAverage(close, ShortEMAlength);
def EMA2 = ExpAverage(close, LongEMAlength);
def state = {default flat, long, short};

DefineGlobalColor("Long", Color.BLUE);
DefineGlobalColor("Short", Color.RED);
AssignPriceColor(if colorPriceBars then if EMA1 > EMA2 then GlobalColor("Long") else GlobalColor("Short") else color.current);

switch (state[1]) {
case flat:
    state = if EMA1 > EMA2 and low[1] > EMA1 
    and low <= EMA1 and low >= EMA2 then state.long 
    else if EMA2 > EMA1 and high[1] < EMA1 and high >= EMA1 and high <= EMA2 then state.short else state.flat;

case long:
    state = if low <= EMA2 then state.flat else state.long;

case short:
    state = if high >= EMA2 then state.flat else state.short;
}

plot BuyDot = if state==state.long and state[1] != state.long then low else Double.NaN;
BuyDot.SetPaintingStrategy(PaintingStrategy.POINTS);
BuyDot.SetLineWeight(4);
BuyDot.SetDefaultColor(Color.GREEN);
BuyDot.HideBubble();

plot SellDot = if state==state.short and state[1] != state.short then high else Double.NaN;
SellDot.SetPaintingStrategy(PaintingStrategy.POINTS);
SellDot.SetLineWeight(4);
SellDot.SetDefaultColor(Color.GREEN);
SellDot.HideBubble();

plot BuyStopDots = if state == state.long or (state==state.flat and state[1]==state.long) then EMA2  else Double.NaN;
BuyStopDots.SetPaintingStrategy(PaintingStrategy.POINTS);
BuyStopDots.SetLineWeight(4);
BuyStopDots.SetDefaultColor(Color.MAGENTA);
BuyStopDots.HideBubble();

plot SellStopDots = if state == state.short or (state == state.flat and state[1] == state.short) then EMA2  else Double.NaN;
SellStopDots.SetPaintingStrategy(PaintingStrategy.POINTS);
SellStopDots.SetLineWeight(4);
SellStopDots.SetDefaultColor(Color.MAGENTA);
SellStopDots.HideBubble();
