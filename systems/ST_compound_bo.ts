# ST Compound Breakout Tool
# (c) 2018 Simpler Trading
# http://www.simplertrading.com
# Revision 12/11/18
# By Eric Purdy

# *** Sharing of this source code is expressly prohibited by the terms of your user agreement ***

declare lower;

def s1 = Average(close, 10);
def u1 = close crosses above s1;
def d1 = close crosses below s1;

def s2 = Average(close, 30);
def u2 = close crosses above s2;
def d2 = close crosses below s2;

def s3 = Average(close, 100);
def u3 = close crosses above s3;
def d3 = close crosses below s3;

def mas = if u1 or u2 or u3 then 1 else if d1 or d2 or d3 then 0 else mas[1];
def t1 = if u1 or u2 or u3 then 1 else if d1 or d2 or d3 then -1 else 0;

def mdf = MACD(8, 17, 9, AverageType.EXPONENTIAL).Diff;
def mu = mdf crosses above 0;
def md = mdf crosses below 0;
def mds = if mu then 1 else if md then 0 else mds[1];
def t2 = if mu then 1 else if md then -1 else 0;

def lowest_k = Lowest(low, 10);
def c1 = close - lowest_k;
def c2 = Highest(high, 10) - lowest_k;
def FastK = if c2 != 0 then c1 / c2 * 100 else 0;

def FullK = MovingAverage(AverageType.SIMPLE, FastK, 3);
def upK = FullK crosses above 20;
def upKI = FullK crosses below 20;
def downK = FullK crosses below 80;
def downKI = FullK crosses above 80;

def ss = if upK then 1 else if downk then -1 else ss[1];
def t3 = if upK then 1 else if downk then -1 else 0;

def lastSignal = if t1 ==1 or t2 ==1 or t3 ==1 then 1 else if t1==-1 or t2==-1 or t3==-1 then -1 else lastSignal[1];

def s1e = if t1==1 then 1 else if t1 == -1 then -1 else if s1e[1]==1 and lastSignal == -1 then 0 else if s1e[1] == -1 and lastSignal ==1 then 0 else s1e[1];
def s2e = if t2==1 then 1 else if t2 == -1 then -1 else if s2e[1]==1 and lastSignal == -1 then 0 else if s2e[1] == -1 and lastSignal ==1 then 0 else s2e[1];
def s3e = if t3==1 then 1 else if t3 == -1 then -1 else if s3e[1]==1 and lastSignal == -1 then 0 else if s3e[1] == -1 and lastSignal ==1 then 0 else s3e[1];
 

plot a1 = if !isnan(close) and mas !=mas[1] then  1 else double.nan;
a1.setPaintingStrategy(paintingStrategy.SQUARES);
a1.setLineWeight(5);
a1.assignValueColor(if mas then color.green else color.red);

plot a1s = if !isnan(close) and s1e !=0 then  1 else double.nan;
a1s.setPaintingStrategy(paintingStrategy.points);
a1s.setLineWeight(1);
a1s.assignValueColor(if s1e==1 then color.green else color.red);

plot b1 =  if !isnan(close) and mds != mds[1] then 0 else double.nan;
b1.setPaintingStrategy(paintingStrategy.SQUARES);
b1.setLineWeight(5);
b1.assignValueColor(if mds then color.green else color.red);

plot b1s =  if !isnan(close) and s2e !=0 then  0 else double.nan;
b1s.setPaintingStrategy(paintingStrategy.points);
b1s.setLineWeight(1);
b1s.assignValueColor(if s2e==1 then color.green else color.red);

plot r1 =  if !isnan(close) and (upK or downK) then -1 else double.nan ;
r1.setPaintingStrategy(paintingStrategy.SQUARES);
r1.setLineWeight(5);
r1.assignValueColor(if ss ==1 then color.green else if ss == -1 then color.red else color.yellow);

plot r1s =  if !isnan(close) and s3e !=0 then  -1 else double.nan;
r1s.setPaintingStrategy(paintingStrategy.points);
r1s.setLineWeight(1);
r1s.assignValueColor(if s3e==1 then color.green else color.red);

plot h1 = 2;
h1.setDefaultColor(color.gray);
h1.hideBubble();
plot l1 = -2;
l1.setDefaultColor(color.gray);
l1.hideBubble();

plot wls = if (s1e+s2e+s3e) ==2 then -3 else double.nan;
wls.setPaintingStrategy(paintingStrategy.POINTS);
wls.setDefaultColor(color.lime);
wls.setLineWeight(1);
def lss = if s1e+s2e+s3e == 3 then 1 else 0;
def lc = if lss == 1 and lss[1] == 0 then 1 else 0;
plot ls = if lc==1 then -3 else double.nan;
ls.setPaintingStrategy(paintingStrategy.TRIANGLES);
ls.setDefaultColor(color.green);
ls.setLineWeight(5);

plot wss = if (s1e+s2e+s3e) ==-2 then 3 else double.nan;
wss.setPaintingStrategy(paintingStrategy.POINTS);
wss.setDefaultColor(color.pink);
wss.setLineWeight(1);
def ssss = if s1e+s2e+s3e == -3 then 1 else 0;
def sc = if ssss == 1 and ssss[1] == 0 then 1 else 0;
plot sss = if sc==1 then 3 else double.nan;
sss.setPaintingStrategy(paintingStrategy.TRIANGLES);
sss.setDefaultColor(color.red);
sss.setLineWeight(5);

a1.hideBubble();
a1s.hideBubble();
b1.hideBubble();
b1s.hideBubble();
r1.hideBubble();
r1s.hideBubble();
wls.hideBubble();
ls.hideBubble();
wss.hideBubble();
sss.hideBubble();
