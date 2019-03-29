//+------------------------------------------------------------------+
//|                                     Macd with EMA BDv8_12_31.mq4 |
//|                                                             Jeff |
//|                                                  wolfboy@att.net |
//+------------------------------------------------------------------+
#property copyright "Jeff"
#property link      "wolfboy@att.net"

// Macd with EMA BDv8_12_31:  Original indicator modified for the Black Dog Trading System.

// Charts the MACD along with the EMA of the MACD Signal.

//---- indicator settings
#property  indicator_separate_window
#property  indicator_buffers 3
#property  indicator_color1  Silver
#property  indicator_color2  Red
#property  indicator_color3  Yellow
#property  indicator_style3  2 
#property  indicator_width1  1
//---- indicator parameters
extern int FastEMA=10;
extern int SlowEMA=20;
extern int SignalEMA=1;
extern int MAofSignalPer=7;
//---- indicator buffers
double     MacdBuffer[];
double     SignalBuffer[];
double     MAofSignalBuffer[];

//+------------------------------------------------------------------+
//| Custom indicator initialization function                         |
//+------------------------------------------------------------------+
int init()
  {
//---- drawing settings
   SetIndexStyle(0,DRAW_HISTOGRAM);
   SetIndexStyle(1,DRAW_LINE);
   SetIndexStyle(2,DRAW_LINE);
   SetIndexDrawBegin(1,SignalEMA);
   IndicatorDigits(Digits+1);
//---- indicator buffers mapping
   SetIndexBuffer(0,MacdBuffer);
   SetIndexBuffer(1,SignalBuffer);
   SetIndexBuffer(2,MAofSignalBuffer);
//---- name for DataWindow and indicator subwindow label
   IndicatorShortName("MACD("+FastEMA+", "+SlowEMA+", "+SignalEMA+", "+MAofSignalPer+")");
   SetIndexLabel(0,"MACD");
   SetIndexLabel(1,"Signal");
   SetIndexLabel(2,"MAofSignal");
   
//---- initialization done
   return(0);
  }
//+------------------------------------------------------------------+
//| Moving Averages Convergence/Divergence                           |
//+------------------------------------------------------------------+
int start()
  {
   int limit;
   int counted_bars=IndicatorCounted();
//---- last counted bar will be recounted
   if(counted_bars>0) counted_bars--;
   limit=Bars-counted_bars;
//---- macd counted in the 1-st buffer
   for(int i=0; i<limit; i++)
      MacdBuffer[i]=iMA(NULL,0,FastEMA,0,MODE_EMA,PRICE_CLOSE,i)-iMA(NULL,0,SlowEMA,0,MODE_EMA,PRICE_CLOSE,i);
//---- signal line counted in the 2-nd buffer
   for(i=0; i<limit; i++)
      SignalBuffer[i]=iMAOnArray(MacdBuffer,Bars,SignalEMA,0,MODE_EMA,i);
//---- MA of signal
   for(i=0; i<limit; i++)
      MAofSignalBuffer[i]=iMAOnArray(SignalBuffer,Bars,MAofSignalPer,0,MODE_EMA,i);
//---- done
   return(0);
  }
//+------------------------------------------------------------------+