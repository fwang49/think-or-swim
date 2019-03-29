input bar = 2;  

input fastLength = 12;  

input slowLength = 26;  

input MACDLength = 9;  

input averageType = AverageType.EXPONENTIAL;  

plot Diff = MACD(fastLength, slowLength, MACDLength, averageType).Diff;  

def SwingHigh = Diff > 0 and Diff >= highest(Diff[1], bar) and Diff >= highest(Diff[-bar], bar);  

def SHprice = if SwingHigh then Diff else SHprice[1];  

def SHBar = if SwingHigh then BarNumber() else SHBar[1];  

def CrossBarL = if Diff crosses below 0 then BarNumber() else CrossBarL[1];  

def SwingLow = Diff < 0 and Diff <= lowest(Diff[1], bar) and Diff <= lowest(Diff[-bar], bar);  

def SLprice = if SwingLow then Diff else SLprice[1];  

def SLBar = if SwingLow then BarNumber() else SLBar[1];  

def CrossBarH = if Diff crosses above 0 then BarNumber() else CrossBarH[1];  

def SHSP = if SwingHigh then high else SHSP[1];  

def SLSP = if SwingLow then low else SLSP[1];  

def BearDiv = Diff > 0 and CrossBarL[1] > SHBar[1] and Diff < SHprice[1] and high > SHSP[1] and SHprice[1] - Diff > 0.005;  

def BullDiv = Diff < 0 and CrossBarH[1] > SLBar[1] and Diff > SLprice[1] and low < SLSP[1] and Diff - SLprice[1] > 0.005;  

def HiddenBearDiv = Diff > 0 and Diff > SHprice[1] and high < SHSP[1] and Diff - SHprice[1] > 0.005;  

def HiddenBullDiv = Diff < 0 and Diff < SLprice[1] and low > SLSP[1] and SLprice[1] - Diff > 0.005;  

plot BearD = if BearDiv then high else Double.NaN;  

        BearD.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);  

        BearD.AssignValueColor(Color.RED);  

        BearD.SetLineWeight(3);  

plot BullD = if BullDiv then low else Double.NaN;  

        BullD.SetPaintingStrategy(PaintingStrategy.ARROW_UP);  

        BullD.AssignValueColor(Color.UPTICK);  

        BullD.SetLineWeight(3);  

plot HiddenBearD = if HiddenBearDiv then high else Double.NaN;  

        HiddenBearD.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);  

        HiddenBearD.AssignValueColor(Color.PINK);  

        HiddenBearD.SetLineWeight(1);  

plot HiddenBullD = if HiddenBullDiv then low else Double.NaN;  

        HiddenBullD.SetPaintingStrategy(PaintingStrategy.ARROW_UP);  

        HiddenBullD.AssignValueColor(Color.LIME);  

        HiddenBullD.SetLineWeight(1);  

Alert(BearDiv[1], "Short MACD divergence", Alert.BAR, Sound.Ring);  

Alert(BullDiv[1], "Long MACD divergence", Alert.BAR, Sound.Ring);  

Alert(HiddenBearDiv[1], "Short hidden MACD divergence", Alert.BAR, Sound.Ring);  

Alert(HiddenBullDiv[1], "Long hidden MACD divergence", Alert.BAR, Sound.Ring); 
