def diff = average(close, 7)/ average(close, 65);
def TI65Up = diff >=1.05;
def TI65Down= diff <=0.95;

# plot youngTrend = diff >= 1.05 and diff[25] <= 1.05;

def countUp = if TI65Up[1] then 1 else countUp[1] + 1;
def countDown = if TI65Down[1] then 1 else countDown[1] + 1;


plot pTI65Up = TI65Up;

plot pTI65Down = TI65Down;




pTI65Up.SetPaintingStrategy(PaintingStrategy.LINE);

pTI65Up.SetDefaultColor(Color.Blue);

pTI65Up.SetPaintingStrategy(PaintingStrategy.LINE);

pTI65Down.SetDefaultColor(Color.White);

plot volSurge = volume > 5*average(Volume, 20);

volSurge.SetPaintingStrategy(PaintingStrategy.LINE);

volSurge.SetDefaultColor(Color.yellow);

# youngTrend.setPaintingStrategy(PaintingStrategy.LINE);

# youngTrend.setdefaultColor(Color.Green);#

# AddLabel(yes,  "TI65Up Days: " + countUp, Color.green);

# AddLabel(yes,  "TI65Down Days: " + countDown, Color.red);




