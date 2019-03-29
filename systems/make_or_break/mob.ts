_SECTION_BEGIN("MOB Simulation");
SetChartOptions(0,chartShowArrows|chartShowDates);

_N(Title = StrFormat("{{NAME}} - {{INTERVAL}} {{DATE}} Open %g, High %g, Low %g, Close %g (%.1f%%) {{VALUES}}", O, H, L, C, SelectedValue( ROC( C, 1 ) ) ));

//Plot Colored Candles :)
PlotOHLC(O ,H ,L ,C ,"Price",IIf(C>O,colorGreen,colorRed),styleCandle);

Offset = 5; //Recommended to use two sheets: one with 5 and another with 7, or maybe other offset value

Avgmov = Offset * MA (abs(ROC(C,1)) ,20);
per = LastValue(Avgmov) ;
numberOfBars = Cum(1);
Range = 0.01;
PS = TroughBars(L, per, 1) == 0;
Title = Title + StrFormat("AVGMOV %g|%g|%g\n", Avgmov,per, numberOfBars);

xa = LastValue(ValueWhen (PS,numberOfBars,1)) ;//x from last trough
Ya = LastValue(ValueWhen (PS,L,1)) ;//y (Low) last trough

PR = PeakBars(H,per, 1) == 0;
xb = LastValue(ValueWhen (PR,numberOfBars,1)) ;//x from last peak
Yb = LastValue(ValueWhen (PR,H,1)) ;//y (High) last peak
Title = Title + StrFormat("PS %g|%g|%g|%g|%g|%g", PS,xa,ya,PR,xb,yb);

Trough_ReTest = abs((L/ya)-1) <Range;
Peak_ReTest = abs((H/yb)-1) <Range;
Trough_Cross = Cross(ya,C);
Peak_Cross = Cross(C,yb);

//UP = upSwing DN = downSwing
UP = xb>xa;//upSwing
DN = xa>xb;//DownSwing
RT23_6 = IIf(UP,yb-(yb- ya)*0.236, IIf(DN,ya+ (yb-ya)*0.236,-1e10) );
RT38_2 = IIf(UP,yb-(yb- ya)*0.382, IIf(DN,ya+ (yb-ya)*0.382,-1e10) );
RT50_0 = IIf(UP,yb-(yb- ya)*0.500, IIf(DN,ya+ (yb-ya)*0.500,-1e10) );
RT61_8 = IIf(UP,yb-(yb- ya)*0.618, IIf(DN,ya+ (yb-ya)*0.618,-1e10) );
RT78_6 = IIf(UP,yb-(yb- ya)*0.786, IIf(DN,ya+ (yb-ya)*0.786,-1e10) );

RT12_7 = IIf(UP,yb-(yb- ya)*1.27, IIf(DN,ya+ (yb-ya)*1.27,-1e10) );
RT16_1 = IIf(UP,yb-(yb- ya)*1.61, IIf(DN,ya+ (yb-ya)*1.61,-1e10) );

RT=
IIf(UP,-100* (yb-L)/(yb- ya),
100*(H-ya)/( yb-ya));//Retracement_ Value
InZone = C<yb & C>ya;//use it for filter to receive only signals that are in in the Retracement zone.
Buy = Trough_ReTest OR peak_Cross;
Sell = Peak_ReTest OR trough_Cross;
Filter = 1;
AddColumn(RT, "RT%");
AddColumn(Trough_ReTest,"TR- Test",1.0) ;
AddColumn(Peak_ReTest,"PK-Test",1.0) ;
AddColumn(Trough_Cross,"TR-Cross",1.0);
AddColumn(Peak_Cross,"PK-Cross",1.0);
//AddColumn(CdDoji( )OR CHammer(),"Candle" ,1.0);
//Plot(C,"C",1, 64);
Plot(IIf(numberOfBars>xa, ya,-1e10) ,"Bottom" ,colorBrown, 1+8);
Plot(IIf(numberOfBars>xb, yb,-1e10) ,"Top",colorBrown,1+8);
xab = IIf(xb>xa,xb, xa);
//Retracements
Plot(IIf(numberOfBars>= xab+1,RT23_6,-1e10), "R2 23.6% Retr.",5,styleLine | styleNoTitle | styleDots);
Plot(IIf(numberOfBars>= xab+1,RT38_2,-1e10), "R1 38.2% Retr.",5,styleLine | styleNoTitle | styleDots);
Plot(IIf(numberOfBars>= xab+1,RT50_0,-1e10), "ZR 50.0% Retr.",colorBlue, styleLine | styleNoTitle | styleDots);
Plot(IIf(numberOfBars>= xab+1,RT61_8,-1e10), "S1 61.8% Retr.",colorDarkRed, styleLine | styleNoTitle | styleDots);
Plot(IIf(numberOfBars>= xab+1,RT78_6,-1e10), "S2 78.6% Retr.",colorDarkRed, styleLine | styleNoTitle |styleDots);

// Plot the MOB Cloud
Plot(IIf(numberOfBars>= xab+1,RT12_7,-1e10), "127% ext.",colorBrightGreen, styleNoTitle | styleNoLabel | styleLine);
Plot(IIf(numberOfBars>= xab+1,RT16_1,-1e10), "161% ext.",colorBrightGreen, styleNoTitle | styleNoLabel | styleLine);
CondA=IIf(numberOfBars>= xab+1,RT12_7,-1e10);
CondB=IIf(numberOfBars>= xab+1,RT16_1,-1e10);
PlotOHLC(Condb,Condb,Conda,Conda,"",ColorRGB(30,130,30),styleCloud, styleNoTitle | styleNoLabel);

GraphXSpace = 0.5;

//Plot(Gauss2ord(C,5),"M5",4,1);
//GraphXSpace = 1.5;
//Title = Name()+" per = "+WriteVal(per, 1.0) +" Close = "+WriteVal(C, 1.2)+ " ("+WriteVal( ROC(C,1), 1.2)+"%)" +" Current Correction = "+WriteVal(RT, 1.0)+"%";

//Plot( Volume,"V", ParamColor("Color", colorBlueGrey ), ParamStyle( "Style", stylehidden| styleOwnScale | styleThick, maskHistogram ), 2 );
_SECTION_END( );
