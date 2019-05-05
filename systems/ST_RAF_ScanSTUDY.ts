#
# ST_RAF_Scan
#
# Last Update 2/11/2017
#
# Copyright (c) 2010-2017 David H. Starr
#

input OverboughtOversold = 1.2;
input MustFire = yes;
input RAFLevel = 2;


def CountChg;
rec SC;
def maxHigh = Highest(high, 10);
def minLow = Lowest(low, 10);

def k1v = Max(-100, Min(100, (StochasticFull(KPeriod = 5, slowing_period = 3, averageType=averageType.EXPONENTIAL))) - 50) / 50.01;
def k2v = Max(-100, Min(100, (StochasticFull(KPeriod = 8, slowing_period = 5, averageType=averageType.EXPONENTIAL))) - 50) / 50.01;
def k3v = Max(-100, Min(100, (StochasticFull(KPeriod = 17, slowing_period = 5, averageType=averageType.EXPONENTIAL))) - 50) / 50.01;


if k2v > 0
Then {
    CountChg = if k1v <= k2v and k1v[1] > k2v[1] and k2v[1] > 0 then -1 else 0;
    SC = CompoundValue(1,  Min (0, SC[1]) + CountChg, 0);
}
else {
    CountChg = if k1v >= k2v and k1v[1] < k2v[1] and k2v[1] <= 0 then 1 else 0;
    SC = CompoundValue (1,  Max (0, SC[1]) + CountChg, 0);
}

rec f3 = CompoundValue(1, if IsNaN(0.5 * (Log((1 + k3v) / (1 - k3v)) + f3[1])) then f3[1]
                             else 0.5 * (Log((1 + k3v) / (1 - k3v)) + f3[1]), 0);

def Major = if IsNaN(close) then Double.NaN else f3;


def MajorBuy = if ((MustFire==No) or (Sign (f3 - f3[1]) > Sign (f3[1] - f3[2]))) and !IsNaN(close) then f3[1] else Double.NaN;

def MajorSell = if ((MustFire==No) or (Sign (f3 - f3[1]) < Sign (f3[1] - f3[2])))  and !IsNaN(close) then f3[1] else Double.NaN;

Plot RAFBuy = if (OverboughtOversold == 0.0 or MajorBuy < (0-OverBoughtOversold)) and (RAFLevel == 0 or SC>=RAFLevel) then 1 else 0;
Plot RAFSell =  if (OverboughtOversold == 0.0 or MajorSell > OverboughtOverSold) and (RAFLevel == 0 or SC <= (0-RAFLevel)) then 1 else 0;









