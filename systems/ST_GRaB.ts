# 3 color GRaB candles for ThinkorSwim
# Copyright 2014 Simpler Options
# Modified for 6 Color Light/Hollow and Solid/Dark Green, Red and Blue Colored Candles for ThinkorSwim by Robert Kling

declare upper;
declare once_per_bar;

plot ema1 = ExpAverage (high, 34);
plot ema2 = ExpAverage (close, 34);
plot ema3 = ExpAverage (low, 34);
ema1.SetDefaultColor(Color.GREEN);
ema1.SetLineWeight(2);
ema2.SetDefaultColor(Color.BLUE);
ema2.SetLineWeight(2);
ema3.SetDefaultColor(Color.RED);
ema3.SetLineWeight(2);

AssignPriceColor(if close > ema1 and open < close then Color.GREEN
  else if close > ema1 and open >= close then Color.DARK_GREEN
  else if close < ema3 and open < close then Color.RED
  else if close < ema3 and open >= close then Color.DARK_RED 
  else if open < close then Color.CYAN
  else if open >= close then Color.BLUE
  else Color.BLUE);
