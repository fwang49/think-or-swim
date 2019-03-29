<chart>
comment=
symbol=USDCAD
period=15
leftpos=20894
digits=4
scale=8
graph=1
fore=1
grid=1
volume=0
scroll=1
shift=1
ohlc=1
askline=0
days=1
descriptions=1
shift_size=20
fixed_pos=0
window_left=48
window_top=68
window_right=1136
window_bottom=669
window_type=3
background_color=9470064
foreground_color=0
barup_color=0
bardown_color=0
bullcandle_color=25600
bearcandle_color=255
chartline_color=0
volumes_color=0
grid_color=8614757
askline_color=255
stops_color=255

<window>
height=149
<indicator>
name=main
<object>
type=23
object_name=Market_Ask_Price_Label
period_flags=0
create_time=1230831387
description=1.2184
color=25600
font=Arial
fontsize=22
angle=0
background=0
corner=3
x_distance=1
y_distance=40
</object>
<object>
type=23
object_name=Market_Bid_Price_Label
period_flags=0
create_time=1230831387
description=1.2180
color=25600
font=Arial
fontsize=32
angle=0
background=0
corner=3
x_distance=1
y_distance=1
</object>
</indicator>
<indicator>
name=Custom Indicator
<expert>
name=Color ma BDv8_12_31
flags=339
window_num=0
<inputs>
MA_Period=50
MA_Type=1
MA_Applied=2
T3MA_VolumeFactor=0.80000000
JMA_Phase=0.00000000
Step_Period=1
Alert_On=0
DebugMode=0
</inputs>
</expert>
shift_0=0
draw_0=0
color_0=65535
style_0=0
weight_0=2
shift_1=0
draw_1=0
color_1=128
style_1=0
weight_1=2
shift_2=0
draw_2=0
color_2=25600
style_2=0
weight_2=2
shift_3=0
draw_3=0
color_3=0
style_3=0
weight_3=0
period_flags=0
show_data=1
</indicator>
<indicator>
name=Custom Indicator
<expert>
name=Color ma BDv8_12_31
flags=339
window_num=0
<inputs>
MA_Period=50
MA_Type=1
MA_Applied=3
T3MA_VolumeFactor=0.80000000
JMA_Phase=0.00000000
Step_Period=1
Alert_On=0
DebugMode=0
</inputs>
</expert>
shift_0=0
draw_0=0
color_0=65535
style_0=0
weight_0=2
shift_1=0
draw_1=0
color_1=128
style_1=0
weight_1=2
shift_2=0
draw_2=0
color_2=25600
style_2=0
weight_2=2
shift_3=0
draw_3=0
color_3=0
style_3=0
weight_3=0
period_flags=0
show_data=1
</indicator>
<indicator>
name=Custom Indicator
<expert>
name=Bid_Ask BDv8_12_31
flags=339
window_num=0
<inputs>
note1=Change font colors automatically? True = Yes
Bid_Ask_Colors=1
ShowBid=1
ShowAsk=1
DefaultColor=25600
BidUpColor=25600
BidDnColor=128
AskUpColor=25600
AskDnColor=25600
note3=Font Size
BidFontSize=32
AskFontSize=22
note4=Font Type
BidFontType=Arial
AskFontType=Arial
note5=Display the price in what corner?
note6=Upper left=0; Upper right=1
note7=Lower left=2; Lower right=3
WhatCorner=3
</inputs>
</expert>
shift_0=0
draw_0=0
color_0=0
style_0=0
weight_0=0
period_flags=0
show_data=1
</indicator>
<indicator>
name=Custom Indicator
<expert>
name=BD Crossover BDv8_12_31
flags=339
window_num=0
<inputs>
FasterEMA1=3
SlowerEMA1=50
FasterEMA2=20
SlowerEMA2=100
SoundON=1
</inputs>
</expert>
shift_0=0
draw_0=3
color_0=16711680
style_0=0
weight_0=1
arrow_0=233
shift_1=0
draw_1=3
color_1=255
style_1=0
weight_1=1
arrow_1=234
shift_2=0
draw_2=3
color_2=0
style_2=0
weight_2=2
arrow_2=233
shift_3=0
draw_3=3
color_3=0
style_3=0
weight_3=2
arrow_3=234
period_flags=0
show_data=1
</indicator>
</window>

<window>
height=50
<indicator>
name=Custom Indicator
<expert>
name=Macd with EMA BDv8_12_31
flags=339
window_num=1
<inputs>
FastEMA=10
SlowEMA=20
SignalEMA=1
MAofSignalPer=7
</inputs>
</expert>
shift_0=0
draw_0=2
color_0=16711680
style_0=0
weight_0=1
shift_1=0
draw_1=0
color_1=0
style_1=0
weight_1=0
shift_2=0
draw_2=0
color_2=255
style_2=0
weight_2=0
levels_color=0
levels_style=0
levels_weight=1
level_0=0.0000
period_flags=0
show_data=1
</indicator>
<indicator>
name=Custom Indicator
<expert>
name=ATR
flags=339
window_num=1
<inputs>
AtrPeriod=14
</inputs>
</expert>
shift_0=0
draw_0=0
color_0=-1
style_0=0
weight_0=0
period_flags=0
show_data=1
</indicator>
</window>
</chart>
