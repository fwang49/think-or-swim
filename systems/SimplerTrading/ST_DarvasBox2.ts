# ************************************
#
# Simpler Trading Darvas Box
# By Eric Purdy
# Revision Date: 09/20/17
# (c) 2017 Simpler Trading, LLC
#
# ************************************

input plotBackwardsExtensions = yes;

DefineGlobalColor("HighFirstBox", color.yellow);
DefineGlobalColor("LowFirstBox", color.plum);

def state = {default init, one, two, three, four, five};

def boxHigh;
def boxLow;
def breakoutLong;
def breakoutShort;
def highFirst;
def lowFirst;

switch (state[1]) {

case init:

    boxHigh = high;
    boxLow = low;
    state = state.one;
    breakoutLong = no;
    breakoutShort = no;
    highFirst = yes;
    lowFirst = no;

case one:

    breakoutLong = no;
    breakoutShort = no;
    if highFirst[1]
    then {
        highFirst = highFirst[1];
        lowFirst = lowFirst[1];
        if (high > boxHigh[1])
        then {
            boxHigh = high;
            boxLow = boxLow[1];
            state = state.one;
        } else {
            state = state.two;
            boxHigh = boxHigh[1];
            boxLow = boxLow[1];
        }
    } else {
        highFirst = highFirst[1];
        lowFirst = lowFirst[1];
        if (low < boxLow[1])
        then {
            boxHigh = boxHigh[1];
            boxLow = low;
            state = state.one;
        } else {
            state = state.two;
            boxHigh = boxHigh[1];
            boxLow = boxLow[1];
        }
    }
case two:

    breakoutLong = no;
    breakoutShort = no;
    if highFirst[1]
    then {
        highFirst = highFirst[1];
        lowFirst = lowFirst[1];
        if (high > boxHigh[1])
        then {
            boxHigh = high;
            boxLow = boxLow[1];
            state = state.one;
        } else {
            state = state.three;
            boxHigh = boxHigh[1];
            boxLow = low;
        }
    } else {
        highFirst = highFirst[1];
        lowFirst = lowFirst[1];
        if (low < boxLow[1])
        then {
            boxHigh = boxHigh[1];
            boxLow = low;
            state = state.one;
        } else {
            state = state.three;
            boxHigh = high;
            boxLow = boxLow[1];
        }
    }

case three:

    breakoutLong = no;
    breakoutShort = no;
    if highFirst[1]
    then {
        highFirst = highFirst[1];
        lowFirst = lowFirst[1];
        if (high > boxHigh[1])
        then {
            boxHigh = high;
            boxLow = boxLow[1];
            state = state.one;
        } else if (low < boxLow[1]) {
            state = state.three;
            boxLow = low;
            boxHigh = boxHigh[1];
        } else {
            state = state.four;
            boxHigh = boxHigh[1];
            boxLow = boxLow[1];
        }
    } else {
        highFirst = highFirst[1];
        lowFirst = lowFirst[1];
        if (low < boxLow[1])
        then {
            boxHigh = boxHigh[1];
            boxLow = low;
            state = state.one;
        } else if (high > boxHigh[1]) {
            state = state.three;
            boxLow = boxLow[1];
            boxHigh = high;
        } else {
            state = state.four;
            boxHigh = boxHigh[1];
            boxLow = boxLow[1];
        }
    }
case four:

    breakoutLong = no;
    breakoutShort = no;
    if highFirst[1]
    then {
        highFirst = highFirst[1];
        lowFirst = lowFirst[1];
        if (high > boxHigh[1])
        then {
            boxHigh = high;
            boxLow = boxLow[1];
            state = state.one;
        } else if (low < boxLow[1]) {
            state = state.three;
            boxLow = low;
            boxHigh = boxHigh[1];
         } else {
            state = state.five;
            boxHigh = boxHigh[1];
            boxLow = boxLow[1];
        }
    } else {
        highFirst = highFirst[1];
        lowFirst = lowFirst[1];
        if (low < boxLow[1])
        then {
            boxHigh = boxHigh[1];
            boxLow = low;
            state = state.one;
        } else if (high > boxHigh[1]) {
            state = state.three;
            boxLow = boxLow[1];
            boxHigh = high;     
        } else {
            state = state.five;
            boxHigh = boxHigh[1];
            boxLow = boxLow[1];
        }
    }
case five:

if (high > boxHigh[1] or low < boxLow[1])
    then {
        state = state.one;
        breakoutLong = if (high > boxHigh[1]) then  yes else no;
        breakoutShort = if (low < boxLow[1]) then yes else no;
        boxHigh = high;
        boxLow = low;
        highFirst = if breakoutLong then yes else no;
        lowFirst = if breakoutShort then yes else no;
   } else {
        state = state.five;
        boxHigh = boxHigh[1];
        boxLow = boxLow[1];
        highFirst = highFirst[1];
        lowFirst = lowFirst[1];
        breakoutLong = no;
        breakoutShort = no;
   }
}

def boxNumber = if state==state.five and state[1] != state.five then boxNumber[1]+1 else boxNumber[1];

plot boxHighPlot = if state == state.five and !isNan(close) then boxHigh else if  ((breakoutLong or breakoutShort) and !isNan(close)) then boxHigh[1] else double.nan;
boxHighPlot.setLineWeight(3);
boxHighPlot.setPaintingStrategy(paintingStrategy.HORIZONTAL);
boxHighPlot.assignValueColor(if (highFirst and !(breakoutLong or breakoutShort)) or ((breakoutLong or breakOutShort) and highFirst[1]) then GlobalColor("HighFirstBox") else  GlobalColor("LowFirstBox"));

plot boxLowPlot = if state == state.five and !isNan(close) then boxLow else if ((breakoutLong or breakoutShort) and !isNan(close)) then boxLow[1] else double.nan;
boxLowPlot.setLineWeight(3);
boxLowPlot.setPaintingStrategy(paintingStrategy.HORIZONTAL);
boxLowPlot.assignValueColor(if (highFirst and !(breakoutLong or breakoutShort)) or ((breakoutLong or breakOutShort) and highFirst[1])  then GlobalColor("HighFirstBox") else GlobalColor("LowFirstBox"));

plot longBoxBreak = if breakoutLong then 1 else double.nan;
longBoxBreak.setPaintingStrategy(paintingStrategy.BOOLEAN_ARROW_UP);
longBoxBreak.setLineWeight(2);
longBoxBreak.setDefaultColor(color.green);

plot shortBoxBreak = if breakoutShort then 1 else double.nan;
shortBoxBreak.setPaintingStrategy(paintingStrategy.BOOLEAN_ARROW_DOWN);
shortBoxBreak.setLineWeight(2);
shortBoxBreak.setDefaultColor(color.red);

boxHighPlot.hideBubble();
boxLowPlot.hideBubble();
longBoxBreak.hideBubble();
shortBoxBreak.hideBubble();

def barNumber = BarNumber();
def barCount = HighestAll(If(IsNaN(close), 0, barNumber));
def boxNum;
def boxUpperIndex;

plot boxHighExtension;
plot boxLowExtension;

if (IsNaN(close)) {
    boxNum = boxNum[1] + 1;
    boxUpperIndex = 0;
    boxHighExtension = Double.NaN;
    boxLowExtension = Double.NaN;
} else {
    boxNum = TotalSum(breakoutLong or breakoutShort);
    boxUpperIndex = fold indx = 0 to barCount - barNumber + 2 with valInd = Double.NaN
        while IsNaN(valInd)
        do if (GetValue(boxNum, -indx) != boxNum)
            then indx
            else Double.NaN;
    boxHighExtension = if plotBackwardsExtensions and !(breakoutLong or breakoutShort) then GetValue(boxHighPlot, -boxUpperIndex + 1) else double.nan;
    boxLowExtension =  if plotBackwardsExtensions and !(breakoutLong or breakoutShort) then GetValue(boxLowPlot, -boxUpperIndex + 1) else double.nan;
}

boxHighExtension.assignValueColor(if highFirst then GlobalColor("HighFirstBox") else GlobalColor("LowFirstBox") );
boxHighExtension.setpaintingStrategy(paintingStrategy.HORIZONTAL);
boxHighExtension.hideBubble();
boxHighExtension.setLineWeight(2);
boxLowExtension.assignValueColor(if highFirst then GlobalColor("HighFirstBox") else GlobalColor("LowFirstBox") );
boxLowExtension.setpaintingStrategy(paintingStrategy.HORIZONTAL);
boxLowExtension.hideBubble();
boxLowExtension.setLineWeight(2);

