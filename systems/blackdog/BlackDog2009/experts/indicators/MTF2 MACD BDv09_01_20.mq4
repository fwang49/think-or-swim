//+------------------------------------------------------------------+
//|                                        MTF2 MACD BDv09_01_20.mq4 |
//|                                                             Jeff |
//|                                                  wolfboy@att.net |
//+------------------------------------------------------------------+
#property copyright "Jeff"
#property link      "wolfboy@att.net"

//MTF2 MACD BDv09_01_20:  Initial release.

#property indicator_separate_window
#property indicator_buffers 3
#property indicator_color1 Blue
#property indicator_color2 Red
#property indicator_width1 2
#property indicator_width2 2
#property indicator_level1 0.0
#property indicator_levelcolor Yellow
#property indicator_levelstyle STYLE_DASH

//---- input parameters
/*
The MACD time frame will automatically be 1-2 time frames greater than the chart time frame
this indicator is applied to.

PRICE_CLOSE    0 Close price. 
PRICE_OPEN     1 Open price. 
PRICE_HIGH     2 High price. 
PRICE_LOW      3 Low price. 
PRICE_MEDIAN   4 Median price, (high+low)/2. 
PRICE_TYPICAL  5 Typical price, (high+low+close)/3. 
PRICE_WEIGHTED 6 Weighted close price, (high+low+close+close)/4. 
You must use the numeric value of the Applied Price that you want to use
when you set the 'applied_price' value with the indicator inputs.
**************************************************************************/

extern int FastEMA=10;
extern int SlowEMA=20;
extern int SignalSMA=5;
extern int EMAofMACDPer=3;
extern int applied_price=0;


double Main[];
double Signal[];
double EMAofMACD[];

//+------------------------------------------------------------------+
//| Custom indicator initialization function                         |
//+------------------------------------------------------------------+
int init()
   {
   
//---- indicator line
   SetIndexStyle(0,DRAW_LINE);
   SetIndexStyle(1,DRAW_LINE);
   SetIndexStyle(2,DRAW_NONE);
   SetIndexDrawBegin(1,SignalSMA);
   IndicatorDigits(MarketInfo(Symbol(),MODE_DIGITS)+1);
   
   SetIndexBuffer(0,Signal);
   SetIndexBuffer(1,EMAofMACD);
   SetIndexBuffer(2,Main); 
     
//---- name for DataWindow and indicator subwindow label
   string TimeFrameStr;
   if (Period() == 1) TimeFrameStr = "MACD_Period_M5";
   if (Period() == 5) TimeFrameStr = "MACD_Period_M15";
   if (Period() == 15) TimeFrameStr = "MACD_Period_H1";
   if (Period() == 30) TimeFrameStr = "MACD_Period_H4";
   if (Period() == 60) TimeFrameStr = "MACD_Period_H4";
   if (Period() == 240) TimeFrameStr = "MACD_Period_D1";
   if (Period() == 1440) TimeFrameStr = "MACD_Period_W1";
   if (Period() == 10080) TimeFrameStr = "MACD_Period_MN1";
   if (Period() == 43200) TimeFrameStr = "MACD_Period_MN1";
   
   IndicatorShortName("MTF2_MACD_BDv09_01_20 ("+FastEMA+","+SlowEMA+","+SignalSMA+","+EMAofMACDPer+")  ("+TimeFrameStr+")");

   }
//----
   return(0);
 
//+------------------------------------------------------------------+
//| MTF MACD                                                         |
//+------------------------------------------------------------------+
int start()
   {
   int TimeFrame;
   if (Period() == 1) TimeFrame = 5;
   if (Period() == 5) TimeFrame = 15;
   if (Period() == 15) TimeFrame = 60;
   if (Period() == 30) TimeFrame = 240;
   if (Period() == 60) TimeFrame = 240;
   if (Period() == 240) TimeFrame = 1440;
   if (Period() == 1440) TimeFrame = 10080;
   if (Period() == 10080) TimeFrame = 43200;
   if (Period() == 43200) TimeFrame = 43200;
   
   datetime TimeArray[];
   int    i,limit,y=0,counted_bars=IndicatorCounted();
 
// Plot defined time frame on to current time frame
   ArrayCopySeries(TimeArray,MODE_TIME,Symbol(),TimeFrame); 
   
   limit=Bars-counted_bars;
   for(i=0,y=0;i<limit;i++)
      {
      if (Time[i]<TimeArray[y]) y++;
         Main[i]=iMACD(NULL,TimeFrame,FastEMA,SlowEMA,SignalSMA,applied_price,0,y);
         Signal[i]=iMACD(NULL,TimeFrame,FastEMA,SlowEMA,SignalSMA,applied_price,1,y);
      }
      
   for(i=0;i<limit;i++)
      {
      EMAofMACD[i]=iMAOnArray(Main,0,EMAofMACDPer,0,MODE_EMA,i);
      }
      
   return(0);
  }
//+------------------------------------------------------------------+

 



