//+------------------------------------------------------------------+
//|                                    Macd_with_EMA_BDv09_12_22.mq4 |
//|                                                             Jeff |
//|                                                  wolfboy@att.net |
//+------------------------------------------------------------------+
#property copyright "Jeff"
#property link      "wolfboy@att.net"

//Macd_with_EMA_BDv9_07_19:   Modified the Macd_with_EMA_BDv8_12_31 indicator to show the 
//                            macd histogram in four colors.
//Macd_with_EMA-BDv09_12_22:  Fixed problem with very first green bar being dark green (now is
//                            light green).

#property indicator_separate_window
#property indicator_buffers 7
#property indicator_color1 LimeGreen
#property indicator_color2 DarkGreen
#property indicator_color3 Red
#property indicator_color4 Maroon
#property indicator_color5 CLR_NONE
#property indicator_color6 Magenta
#property indicator_color7 Yellow
#property indicator_width1 2
#property indicator_width2 2
#property indicator_width3 2
#property indicator_width4 2
#property indicator_width5 1
#property indicator_width6 1
#property indicator_width7 1
#property indicator_level1 0.0
#property indicator_levelcolor Black
#property indicator_levelstyle 2

//---- indicator parameters
extern int FastEMA=10;
extern int SlowEMA=20;
extern int SignalEMA=1;
extern int MAofSignalPer=7;

//---- indicator buffers
double MacdBuffer[];
double SignalBuffer[];
double MAofSignalBuffer[];
double green_buffer[];
double DarkGreen_buffer[];
double red_buffer[];
double Maroon_buffer[];
//+------------------------------------------------------------------+
//| Custom indicator initialization function                         |
//+------------------------------------------------------------------+
int init()
   {
   IndicatorBuffers(7);
   
//---- drawing settings
   SetIndexStyle(0,DRAW_HISTOGRAM,STYLE_SOLID);
   SetIndexStyle(1,DRAW_HISTOGRAM,STYLE_SOLID);
   SetIndexStyle(2,DRAW_HISTOGRAM,STYLE_SOLID);
   SetIndexStyle(3,DRAW_HISTOGRAM,STYLE_SOLID);         
   SetIndexStyle(4,DRAW_NONE);
   SetIndexStyle(5,DRAW_LINE,STYLE_SOLID);
   SetIndexStyle(6,DRAW_LINE,STYLE_DOT);   
   SetIndexDrawBegin(1,SignalEMA);
   IndicatorDigits(Digits+1);
   
//---- indicator buffers mapping
   SetIndexBuffer(0,green_buffer);
   SetIndexBuffer(1,DarkGreen_buffer);
   SetIndexBuffer(2,red_buffer);
   SetIndexBuffer(3,Maroon_buffer);
   SetIndexBuffer(4,MacdBuffer);      
   SetIndexBuffer(5,SignalBuffer);
   SetIndexBuffer(6,MAofSignalBuffer);

   
//---- name for DataWindow and indicator subwindow label
   IndicatorShortName("MACD("+FastEMA+", "+SlowEMA+", "+SignalEMA+", "+MAofSignalPer+")");
   SetIndexLabel(4,"MACD");
   SetIndexLabel(5,"Signal");
   SetIndexLabel(6,"MAofSignal");
   
//---- initialization done
   return(0);
  }
//+------------------------------------------------------------------+
//| Moving Averages Convergence/Divergence                           |
//+------------------------------------------------------------------+
int start()
   {
   int limit, i;
   double MACD;
   int counted_bars=IndicatorCounted();
   
//---- last counted bar will be recounted
   if(counted_bars>0) counted_bars--;
   limit=Bars-counted_bars;
   
//---- macd
   for(i=0; i<limit; i++)
      MacdBuffer[i]=iMA(NULL,0,FastEMA,0,MODE_EMA,PRICE_CLOSE,i)-
                    iMA(NULL,0,SlowEMA,0,MODE_EMA,PRICE_CLOSE,i);
      
//---- signal line
   for(i=0; i<limit; i++)
      SignalBuffer[i]=iMAOnArray(MacdBuffer,Bars,SignalEMA,0,MODE_EMA,i);
      
//---- MA of signal
   for(i=0; i<limit; i++)
      MAofSignalBuffer[i]=iMAOnArray(SignalBuffer,Bars,MAofSignalPer,0,MODE_EMA,i);
      
   for (i = Bars - Max (counted_bars-1, 1); i>=0; i--) 
      {
      MACD=MacdBuffer[i];
           
      if(MACD>0) 
         {
         if (MACD>MacdBuffer[i+1])
            {
            green_buffer[i] = MACD;
            DarkGreen_buffer[i] = 0;
            }
         else 
            {
            green_buffer[i] = 0;
            DarkGreen_buffer[i] = MACD;
            }
         }
      else 
         {
         if (MACD<MacdBuffer[i+1])
            {
            red_buffer[i] = 0;
            Maroon_buffer[i] = MACD;
            }
         else 
            {
            red_buffer[i] = MACD;
            Maroon_buffer[i] = 0;
            } 
         }
      }
      
//---- done
   return(0);
  }

//+------------------------------------------------------------------+
int Max (int val1, int val2) {
  if (val1 > val2)  return(val1);
  return(val2);
}





