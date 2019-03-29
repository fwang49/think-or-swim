input AtrMult = 1.0; 
input nATR = 4; 
input AvgType = AverageType.HULL; 
input PaintBars = yes; 
def ATR = MovingAverage(AvgType, TrueRange(high, close, low), nATR); 
def UP = HL2 + (AtrMult * ATR); 
def DN = HL2 + (-AtrMult * ATR); 
def ST = if close < ST[1] then UP else DN; 
plot SuperTrend = ST; 
SuperTrend.AssignValueColor(if close < ST then Color.RED else Color.GREEN); 
AssignPriceColor(if PaintBars and close < ST  

                 then Color.RED  

                 else if PaintBars and close > ST  

                      then Color.GREEN  

                      else Color.CURRENT); 

AddChartBubble(close crosses below ST, low[1], low[1], color.Dark_Gray); 
AddChartBubble(close crosses above ST, high[1], high[1], color.Dark_Gray, no); 
# End Code SuperTrend 
