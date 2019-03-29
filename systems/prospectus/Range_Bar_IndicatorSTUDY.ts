# ProRangeBarIndicator
# by Prospectus @ http://readtheprospectus.wordpress.com
#
# This indicator will plot a crude facsimile of Range Bars.
#
# Input the Bar Range:
input Range=1.0;
def bar1=if barnumber()==1 then 1 else 0;

# Check if we have moved the range distance from the Range Bar open:
rec rangeopen=if bar1 then open else if high>rangeopen[1]+Range then rangeopen[1]+Range else if low<rangeopen[1]-Range then Rangeopen[1]-Range else rangeopen[1];
#
# Keep track of the prior Range Bar open:
#
rec rold=if bar1 then open else if rangeopen[0]!=rangeopen[1] then rangeopen[1] else rold[1];
#
# Plots
#
plot r0=rangeopen;
plot r1=rold;
addcloud(r0,r1);
#
# Formatting
#
r0.setdefaultcolor(color.black);
r1.setdefaultColor(color.BLACK);
