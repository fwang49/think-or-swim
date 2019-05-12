# JT_Trends (c) Jeff Thaw 2018
# 2 indicators, 1st is the relationship of 8:13:21, to help with Squeeze
# 2nd adds in the relationship of the 34, to get the trend of the 34Wave

input Show81321Label = yes;
input ShowWaveTrendLabel = yes;


DefineGlobalColor("Bullish", Color.GREEN);
DefineGlobalColor("Sideways", Color.YELLOW);
DefineGlobalColor("Bearish", Color.RED);

def EMA34High = ExpAverage (high, 34); #was ema1_34
def EMA34Close = ExpAverage (close, 34); #ema2_34
def EMA34Low = ExpAverage (low, 34); # was ema3_34
def EMA8 = ExpAverage(close, 8); #JT Changed var name from EMA1 to EMA8
def EMA21 = ExpAverage(close, 21); #JT Changed var name from EMA2 to EMA21
def EMA13 = ExpAverage (close, 13);


def bullish = (EMA8 > EMA13) and (EMA13 > EMA21);
def bearish = (EMA8 < EMA13) and (EMA13 < EMA21);

def WaveState = {default SW, Bullish, Bearish}; #SW = sideways
WaveState = IF (EMA8 > EMA13) AND (EMA13 > EMA21) AND (EMA21 > EMA34High) 
            THEN WaveState.Bullish
            ELSE IF (EMA8 < EMA13) AND (EMA13 < EMA21) AND (EMA21 < EMA34Low) 
            THEN WaveState.Bearish
            ELSE WaveState.SW;


def IsBullishWave =  WaveState == WaveState.Bullish;
def IsBearishWave =  WaveState == WaveState.Bearish;
def IsSidewaysWave = WaveState == WaveState.SW;

AddLabel(Show81321Label, "8:13:21: " + if Bullish then "Bullish" else if Bearish then "Bearish" else "Slop", if bullish then GlobalColor("Bullish") else if bearish then GlobalColor("Bearish") else GlobalColor("Sideways"));

AddLabel(ShowWaveTrendLabel, "Wave: " + if IsBullishWave then "Bullish" else if IsBearishWave then "Bearish" else "S/W", if IsBullishWave then GlobalColor("Bullish") else if IsBearishWave then GlobalColor("Bearish") else GlobalColor("Sideways"));

#adding a blank label after as a spacer
AddLabel(yes, "   ", color.black);
