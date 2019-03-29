input nbar = 20;
def na = double.nan;
input HidePriceChannels={"No", default "Yes"};
def h=hidepricechannels;
#Start the Code for High
def htest = if Highest(high, nbar) == high then 1 else 0;
plot NBarHigh = if htest then Highest(high, nbar) else na;
plot highchannel=highest(high, nbar);
#Format the plot
NBarHigh.SetDefaultColor(color.green);
NBarHigh.SetStyle(curve.points);
NBarHigh.SetLineWeight(5);
#Start the Code for Low
def ltest = if Lowest(low, nbar) == low then 1 else 0;
plot nbarlow = if ltest then Lowest(low, nbar) else na;
plot lowchannel=Lowest(low, nbar);
#Format the plots
nbarlow.SetDefaultColor(color.red);
nbarlow.SetStyle(curve.points);
nbarlow.SetLineWeight(5);
highchannel.setDefaultColor(color.green);
highchannel.setstyle(curve.short_dash);
highchannel.sethiding(h);
lowchannel.setDefaultColor(color.red);
lowchannel.setstyle(curve.short_dash);
lowchannel.sethiding(h);

