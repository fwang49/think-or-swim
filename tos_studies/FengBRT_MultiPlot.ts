# Custom Multi Plot ThinkScript by 7of9 for BRT
# edited 3/5/19

# Inputs

input PlotPreMktLinesHrsPastOpen = 0;

input PlotRegMktLinesHrsPastOpen = 0;

input PlotYesterdayMktLinesHrsPastOpen = 0;

input PlotActiveRegMktLinesOnPrevDays = 0;

input DisplayPreMarketPriceBubbles = yes;

input DisplayCurrentDayPriceBubbles = yes;

input DisplayPreviousDayPriceBubbles = yes;

# Pre market / Regular market definitions

def ExtPMOut = PlotPreMktLinesHrsPastOpen * 3610000;

def ExtRMOut = PlotRegMktLinesHrsPastOpen * 3610000;

def ExtYMOut = PlotYesterdayMktLinesHrsPastOpen * 3610000;

def MktPlot = GetLastDay() - PlotActiveRegMktLinesOnPrevDays <= GetDay() and GetLastYear() - 0 <= GetYear();

def PMhrs = RegularTradingStart (GetYYYYMMDD()) > GetTime();

def RMhrs = RegularTradingStart (GetYYYYMMDD()) < GetTime();

def PMplots = RegularTradingStart (GetYYYYMMDD()) > GetTime() - ExtPMOut;

def RMplots = RegularTradingStart (GetYYYYMMDD()) > GetTime() - ExtRMOut;

def YMplots = RegularTradingStart (GetYYYYMMDD()) > GetTime() - ExtYMOut;

def PMStart = RMhrs[1] and PMhrs;

def RMStart = PMhrs[1] and RMhrs;

def PMHigh = CompoundValue(1, if PMStart then high else if PMhrs then Max(high, PMHigh[1]) else PMHigh[1], 0);

def PMLow = CompoundValue (1, if PMStart then low else if PMhrs then Min(low, PMLow[1]) else PMLow[1], 0);

def bar = BarNumber();

def highBar = if PMhrs and high == PMHigh then bar else Double.NaN;

def lowBar = if PMhrs and low == PMLow then bar else Double.NaN;

# Current price line tracker code

plot PriceLine = HighestAll (if IsNaN(close[-1]) and !IsNaN(close) then close else Double.NaN);

PriceLine.SetDefaultColor (Color.GRAY);
PriceLine.SetStyle (Curve.SHORT_DASH);

# Pre market open code

def HidePMO = if GetAggregationPeriod() <= AggregationPeriod.FIFTEEN_MIN then yes else no;

def day = GetDay();

def PMopenBar = day != day[1];

def PMOpen = if PMopenBar then open else PMOpen[1];

plot PMO = if HidePMO and MktPlot and PMplots then PMOpen else Double.NaN;

PMO.SetDefaultColor (CreateColor (234, 136, 255));

# Pre market high code

def HidePMH = if GetAggregationPeriod() <= AggregationPeriod.FIFTEEN_MIN then yes else no;

def PMHighBar = if bar == HighestAll(highBar) then PMHigh else PMHighBar[1];

plot PMH = if HidePMH and PMplots and PMHighBar > 0 then PMHighBar else Double.NaN;

