//+------------------------------------------------------------------+
//|                             MTF3 Entry Indicator BDv09_09_24.mq4 |
//|                                                             Jeff |
//|                                                  wolfboy@att.net |
//+------------------------------------------------------------------+
#property copyright "Jeff"
#property link      "wolfboy@att.net"

//BDv09_09_03  : Initial release.  This is an entry indicator for the MTF3 Black Dog trading
//               system as described on the Black Dog Website in the "Tactics" section.
//
//BDv09_09_24  : Modifies the Aggressive = "false" code to include an entry signal when the red
//               MACD crosses the ZL AFTER all other conditions have been met.

 
#property indicator_chart_window

extern bool    Aggressive     = true;//"false" means that the faster macd (red line) must be above 
                                      //the slower macd (blue line) AND the faster macd must be at or
                                      //above zero (for long entry signals).  "true" means the faster 
                                      //macd must be above the slower macd without regard to the 
                                      //relationship between the faster macd and zero.  
                                      //Vice versa for short entry signals.
extern color   BuyColor       = Lime;
extern int     BuySize        = 2;
extern int     BuySymbol      = 5;//value from "Arrow codes" or "Wingdings".
extern color   SellColor      = Magenta;
extern int     SellSize       = 2;
extern int     SellSymbol     = 5;//value from "Arrow codes" or "Wingdings".
extern bool    SoundAlertOn   = true;//will give a distinct sound for entries and exits if "true".
extern string  SoundFileName  = "boxing_bell_multiple.wav";//use sound file types of ".wav".

double  MTFMACDFastC, MTFMACDFastP, MTFMACDSlowC, MTFMACDSlowP;
double  EMA15C, EMA3CC, EMA3CP, EMA50HC, EMA50HP, EMA50LC, EMA50LP, EMA50CC, EMA50CP;
double  Buy[], Sell[];
int     intsec;
bool    SoundAlert=false;

//+------------------------------------------------------------------+
//| Custom indicator initialization function                         |
//+------------------------------------------------------------------+
int init()
   {
   IndicatorBuffers(2);
   
   SetIndexBuffer(0,Buy);
   SetIndexBuffer(1,Sell);
    
   return(0);
   }
//+------------------------------------------------------------------+
//| Custom indicator deinitialization function                       |
//+------------------------------------------------------------------+
int deinit()
   {
   DeleteAllObjects();
   return(0);
   }
//+------------------------------------------------------------------+
//| Custom indicator iteration function                              |
//+------------------------------------------------------------------+
int start()
   {
   int limit;
   int i=1;
   int counted_bars=IndicatorCounted();
   if(counted_bars<0) return(-1);
   limit=Bars-counted_bars-1;
   
   for(i=1; i<=limit; i++)
      {
      MTFMACDFastC = iCustom(NULL,0,"MTF2_MACD_BDv09_01_20",10,20,5,3,0,1,i);//Red
      MTFMACDFastP = iCustom(NULL,0,"MTF2_MACD_BDv09_01_20",10,20,5,3,0,1,i+1);//Red      
      MTFMACDSlowC = iCustom(NULL,0,"MTF2_MACD_BDv09_01_20",10,20,5,3,0,0,i);//Blue
      MTFMACDSlowP = iCustom(NULL,0,"MTF2_MACD_BDv09_01_20",10,20,5,3,0,0,i+1);//Blue
      
      EMA50HC = iMA(NULL,0,50,0,MODE_EMA,PRICE_HIGH,i);
      EMA50HP = iMA(NULL,0,50,0,MODE_EMA,PRICE_HIGH,i+1);      
      EMA50LC = iMA(NULL,0,50,0,MODE_EMA,PRICE_LOW,i);
      EMA50LP = iMA(NULL,0,50,0,MODE_EMA,PRICE_LOW,i+1);      
      EMA50CC = iMA(NULL,0,50,0,MODE_EMA,PRICE_CLOSE,i); 
      EMA50CP = iMA(NULL,0,50,0,MODE_EMA,PRICE_CLOSE,i+1);              
      EMA15C  = iMA(NULL,0,15,0,MODE_EMA,PRICE_CLOSE,i);
      EMA3CC  = iMA(NULL,0,3,0,MODE_EMA,PRICE_CLOSE,i); 
      EMA3CP  = iMA(NULL,0,3,0,MODE_EMA,PRICE_CLOSE,i+1);        
             
      int LongSignal=0;
      int ShortSignal=0;    
      
      if ((Aggressive==true && iClose(NULL,0,i)>EMA50HC && iClose(NULL,0,i+1)<EMA50HC  && 
          EMA3CC>EMA50CC && MTFMACDFastC>MTFMACDSlowC && iClose(NULL,0,i)>EMA15C) || 
          (Aggressive==true && iClose(NULL,0,i)>EMA50HC && EMA3CP<EMA50CP && EMA3CC>EMA50CC &&
          MTFMACDFastC>MTFMACDSlowC && iClose(NULL,0,i)>EMA15C) || (Aggressive==true && 
          iClose(NULL,0,i)>EMA50HC && iClose(NULL,0,i)>EMA15C && EMA3CC>EMA50CC && 
          MTFMACDFastP<MTFMACDSlowP && MTFMACDFastC>MTFMACDSlowC))
         {
         LongSignal=1;
         }
      if ((Aggressive==false && iClose(NULL,0,i)>EMA50HC && iClose(NULL,0,i+1)<EMA50HC  && 
          EMA3CC>EMA50CC && MTFMACDFastC>MTFMACDSlowC && MTFMACDFastC>0 && iClose(NULL,0,i)>EMA15C) 
          || (Aggressive==false && iClose(NULL,0,i)>EMA50HC && EMA3CP<EMA50CP && EMA3CC>EMA50CC &&
          MTFMACDFastC>MTFMACDSlowC && MTFMACDFastC>=0 && iClose(NULL,0,i)>EMA15C) || (Aggressive==false && 
          iClose(NULL,0,i)>EMA50HC && iClose(NULL,0,i)>EMA15C && EMA3CC>EMA50CC && 
          MTFMACDFastP<MTFMACDSlowP && MTFMACDFastC>MTFMACDSlowC && MTFMACDFastC>0) || (Aggressive==false && 
          iClose(NULL,0,i)>EMA50HC && iClose(NULL,0,i)>EMA15C && EMA3CC>EMA50CC && 
          MTFMACDFastC>MTFMACDSlowC && MTFMACDFastP<0 && MTFMACDFastC>=0))
         {
         LongSignal=1;
         }
         
      if ((Aggressive==true && iClose(NULL,0,i)<EMA50LC && iClose(NULL,0,i+1)>EMA50LC  && 
          EMA3CC<EMA50CC && MTFMACDFastC<MTFMACDSlowC && iClose(NULL,0,i)<EMA15C) || 
          (Aggressive==true && iClose(NULL,0,i)<EMA50LC && EMA3CP>EMA50CP && EMA3CC<EMA50CC &&
          MTFMACDFastC<MTFMACDSlowC && iClose(NULL,0,i)<EMA15C) || (Aggressive==true && 
          iClose(NULL,0,i)<EMA50LC && iClose(NULL,0,i)<EMA15C && EMA3CC<EMA50CC && 
          MTFMACDFastP>MTFMACDSlowP && MTFMACDFastC<MTFMACDSlowC))
         {
         ShortSignal=1;
         }
      if ((Aggressive==false && iClose(NULL,0,i)<EMA50LC && iClose(NULL,0,i+1)>EMA50LC  && 
          EMA3CC<EMA50CC && MTFMACDFastC<MTFMACDSlowC && MTFMACDFastC<0 && iClose(NULL,0,i)<EMA15C) 
          || (Aggressive==false && iClose(NULL,0,i)<EMA50LC && EMA3CP>EMA50CP && EMA3CC<EMA50CC &&
          MTFMACDFastC<MTFMACDSlowC && MTFMACDFastC<=0 && iClose(NULL,0,i)<EMA15C) || (Aggressive==false && 
          iClose(NULL,0,i)<EMA50LC && iClose(NULL,0,i)<EMA15C && EMA3CC<EMA50CC && 
          MTFMACDFastP>MTFMACDSlowP && MTFMACDFastC<MTFMACDSlowC && MTFMACDFastC<0) || (Aggressive==false && 
          iClose(NULL,0,i)<EMA50HC && iClose(NULL,0,i)<EMA15C && EMA3CC<EMA50CC && 
          MTFMACDFastC<MTFMACDSlowC && MTFMACDFastP>0 && MTFMACDFastC<=0))
         {
         ShortSignal=1;
         }
         
      if (LongSignal==1)
         {
         Buy[i] = Close[i];
         DrawObject(1,i,Buy[i],BuySymbol);
         Alert("BUY Signal On:  ",Symbol(),",  ",PeriodToText(),",  at  ",DoubleToStr(Buy[i],Digits));
         intsec=TimeSeconds(TimeCurrent());
         SoundAlert=true;         
         }         
      if (ShortSignal==1)
         {
         Sell[i] = Close[i];
         DrawObject(-1,i,Sell[i],SellSymbol);
         Alert("SELL Signal On:  ",Symbol(),",  ",PeriodToText(),",  at  ",DoubleToStr(Sell[i],Digits));
         intsec=TimeSeconds(TimeCurrent());
         SoundAlert=true;
         }
      }
      
   if (SoundAlertOn && SoundAlert && TimeSeconds(TimeCurrent()) > intsec+1)
      {
      PlaySound(SoundFileName);
      SoundAlert=false;
      }
      
   return(0);
   }
   
//+------------------------------------------------------------------+

void DrawObject(int signal, int i, double price, int symbol)
   {
   static int count = 0;
   count++;
   string Obj = "";
   if (signal==1) //buy signal
      {
      Obj = "MTF3_Buy_" + DoubleToStr(count,0);
      ObjectCreate(Obj,OBJ_ARROW,0,Time[i],price);
      ObjectSet(Obj,OBJPROP_COLOR,BuyColor);
      ObjectSet(Obj,OBJPROP_ARROWCODE,symbol);
      ObjectSet(Obj,OBJPROP_WIDTH,BuySize);
      }
   if (signal==-1) //sell signal
      {
      Obj = "MTF3_Sell_" + DoubleToStr(count,0);
      ObjectCreate(Obj,OBJ_ARROW,0,Time[i],price);
      ObjectSet(Obj,OBJPROP_COLOR,SellColor);
      ObjectSet(Obj,OBJPROP_ARROWCODE,symbol);
      ObjectSet(Obj,OBJPROP_WIDTH,SellSize);
      }
   }   

void DeleteAllObjects()
   {
   string name;
   for(int cnt=ObjectsTotal()-1;cnt>=0;cnt--)
      {
      name=ObjectName(cnt);
      if (StringFind(name,"MTF3",0)>-1) ObjectDelete(name);
      }
   }

string PeriodToText()
   {
   switch (Period())
   {
      case 1:
            return("M1");
            break;
      case 5:
            return("M5");
            break;
      case 15:
            return("M15");
            break;
      case 30:
            return("M30");
            break;
      case 60:
            return("H1");
            break;
      case 240:
            return("H4");
            break;
      case 1440:
            return("D1");
            break;
      case 10080:
            return("W1");
            break;
      case 43200:
            return("MN1");
            break;
      }

   }   




 
 





 
 

 
 















