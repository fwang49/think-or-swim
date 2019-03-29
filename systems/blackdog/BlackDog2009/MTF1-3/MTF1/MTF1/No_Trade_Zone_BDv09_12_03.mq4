//+------------------------------------------------------------------+
//|                                    No_Trade_Zone_BDv09_12_03.mq4 |
//|                                           Copyright © 2008, Jeff |
//|                                                  wolfboy@att.net |
//+------------------------------------------------------------------+
#property copyright "Copyright © 2008, Jeff"
#property link      "wolfboy@att.net"

//BDv09_11_29:  Initial release.
//BDv09_12_03:  Fixed counting problem.

#property indicator_chart_window
#property indicator_buffers 5
#property indicator_color1 Tomato
#property indicator_color2 CLR_NONE
#property indicator_color3 Tomato
#property indicator_color4 Tomato
#property indicator_color5 CLR_NONE

extern int H_L_EMAPer = 50;
extern int EMAPerTwo  = 15;

//---- indicator buffers
double EMAH[];
double EMAL[];
double EMATwoC[];
double NTZHigh[];
double NTZLow[];

//+--------------------------------------------------------------------------------------+
//| Custom indicator initialization function                                             |
//+--------------------------------------------------------------------------------------+

int init()
   {
   SetIndexBuffer(0,EMAH);
   SetIndexStyle(0,DRAW_HISTOGRAM,STYLE_DOT);  
   SetIndexBuffer(1,EMAL);
   SetIndexStyle(1,DRAW_NONE);   
   SetIndexBuffer(2,EMATwoC);
   SetIndexStyle(2,DRAW_HISTOGRAM,STYLE_DOT);
   SetIndexBuffer(3,NTZHigh);      
   SetIndexStyle(3,DRAW_HISTOGRAM,STYLE_DOT);
   SetIndexBuffer(4,NTZLow);      
   SetIndexStyle(4,DRAW_NONE);   
   return(0); 
   }
   
//--------------------------------------------------------------------------------------   
   
int start()
   {
   int i,limit;
   int k=i-1;
   int counted_bars=IndicatorCounted();
   limit=Bars-counted_bars-1;
   
//---- intital zero
   if (Bars<=counted_bars) return(0);
   if (counted_bars<1)
      {
      for (i=0;i<=limit;i++)
         {
         EMAH[i]=0;
         EMAL[i]=0;
         EMATwoC[i]=0;
         NTZHigh[i]=0;
         NTZLow[i]=0;
         }
      }
   
   while (i>=0)
      {
      EMAH[i] = iMA(NULL,0,H_L_EMAPer,0,MODE_EMA,PRICE_HIGH,i);
      EMAL[i] = iMA(NULL,0,H_L_EMAPer,0,MODE_EMA,PRICE_LOW,i);
      EMATwoC[i] = iMA(NULL,0,EMAPerTwo,0,MODE_EMA,PRICE_CLOSE,i);
      NTZHigh[i]=EMAH[i];
      NTZLow[i]=EMAL[i];
      
      while (k>=i)
         {
         NTZHigh[k] = EMAH[k];
         NTZLow[k]  = EMAL[k];
         if (EMATwoC[k]>EMAH[k]) NTZHigh[k]=EMATwoC[k];
         if (EMATwoC[k]<EMAL[k]) NTZLow[k]=EMATwoC[k];
         k--;
         }
      i--;
      }
      
    return(0); 
   }
      
   
   
   
   
   
   
   
   
   
   