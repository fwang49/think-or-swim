//+------------------------------------------------------------------+
//|                                               Pip Value v1_1.mq4 |
//|                                                             Jeff |
//|                                                  wolfboy@att.net |
//+------------------------------------------------------------------+
#property copyright "Jeff"
#property link      "wolfboy@att.net"

//Displays pip value in an EXISTING seperate chart window.
//Does not draw a history line of the pip value.
//v1_1 accounts for brokers with different price quote digits.

//---- indicator settings
#property  indicator_separate_window
#property  indicator_buffers  1

extern string LotType   =  "mini";
extern string Note1     =  "Use 'standard', 'mini', or 'micro'";
extern string Noet2     =  "do not use upper case";

//---- buffers
double TV[];

//+------------------------------------------------------------------+
//| Custom indicator initialization function                         |
//+------------------------------------------------------------------+
int init()
   {
   SetIndexBuffer(0,TV);
   SetIndexStyle(0,DRAW_NONE);
  
   IndicatorShortName(" Pip Value=");

   return(0);
   }

int start()
   {
   int limit;
   int counted_bars=IndicatorCounted();
   if (counted_bars>0) counted_bars--;
   limit=Bars-counted_bars;
   
   double LotSize;
   if (LotType=="standard") LotSize=1;
   if (LotType=="mini") LotSize=0.1;
   if (LotType=="micro") LotSize=0.01;
   
   int PointValue;
   if (Point==0.01) PointValue=1;
   if (Point==0.001) PointValue=10;
   if (Point==0.0001) PointValue=1;
   if (Point==0.00001) PointValue=10;
   
   for (int i=0; i<limit; i++)
      {
      TV[i]=MarketInfo(Symbol(),MODE_TICKVALUE)*LotSize*PointValue;
      }
   return(0);
  }
//+------------------------------------------------------------------+