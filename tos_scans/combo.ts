def combo = average(close, 7)/average(close, 65)*(close-low)/(high-low)*100>=110;


def liquid = lowest(volume, 3)>100000;

def liquid2 = volume * close >=3000000;

def buyout = close> 1.2 * close[1] and (high- low)<0.04*close;
def bcount = if buyout then bcount[1]+1 else 0;
def buyoutFilter = Sum(bcount, 100)==0;

plot data = liquid and liquid2 and combo and 
 buyoutFilter ;
