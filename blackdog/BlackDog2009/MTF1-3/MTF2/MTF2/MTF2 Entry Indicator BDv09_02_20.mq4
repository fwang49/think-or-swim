//+------------------------------------------------------------------+
//|                             MTF2 Entry Indicator BDv09_02_20.mq4 |
//|                                                             Jeff |
//|                                                  wolfboy@att.net |
//+------------------------------------------------------------------+
#property copyright "Jeff"
#property link      "wolfboy@att.net"

//BDv09_02_18  : Initial (revised) release.
//BDv09_02_20  : Reflects changes made to the called indicators.

#property indicator_chart_window
#property indicator_buffers 2

extern bool    Aggressive     = true;//"false" means that the faster macd (red line) must be above 
                                      //the slower macd (blue line) AND the faster macd must be at or
                                      //above zero (for long entry signals).  "true" means the faster 
                                      //macd must be above the slower macd without regard to the 
                                      //relationship between the faster macd and zero.  
                                      //Vice versa for short entry signals.
                                      
extern int     EntryOffset    = 2;//entry signal will be +/- x pips from high/low of signal bar.                                      
extern color   BuyColor       = Lime;
extern int     BuySize        = 2;
extern int     BuySymbol      = 5;//value from "Arrow codes" or "Wingdings".
extern color   SellColor      = Magenta;
extern int     SellSize       = 2;
extern int     SellSymbol     = 5;//value from "Arrow codes" or "Wingdings".
extern bool    SoundAlertOn   = true;//will give a distinct sound if "true".
extern string  SoundFileName  = "boxing_bell_multiple.wav";//use sound file types of ".wav".

double  emaCrossUp, emaCrossDn, xpMAup, xpMAdn, MTFMACDFast, MTFMACDSlow;
double  Buy[];
double  Sell[];
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
   int i = 0;
   int counted_bars=IndicatorCounted();
   if(counted_bars<0) return(-1);
   //if(counted_bars>0) counted_bars--;
   limit=Bars-counted_bars-1;
   
   for(i = 0; i <= limit; i++)
      {
//to account for 2 or 3 digit price quotes and 4 or 5 digit price quotes.
      double realpoint;
      if (Point==0.01) realpoint=0.01;
      if (Point==0.001) realpoint=0.01;
      if (Point==0.0001) realpoint=0.0001;
      if (Point==0.00001) realpoint=0.0001;
      
      emaCrossUp  = iCustom(NULL,0,"EMA_Cross__SES__BDv8_12_31",2,15,false,0,i);
      emaCrossDn  = iCustom(NULL,0,"EMA_Cross__SES__BDv8_12_31",2,15,false,1,i);
      xpMAup      = iCustom(NULL,0,"xpMA_BDv09_02_20",25,5,0,0.8,0.0,1,0,11,3,8,Black,"Arial",false,false,2,i);
      xpMAdn      = iCustom(NULL,0,"xpMA_BDv09_02_20",25,5,0,0.8,0.0,1,0,11,3,8,Black,"Arial",false,false,1,i);
      MTFMACDFast = iCustom(NULL,0,"MTF2_MACD_BDv09_01_20",10,20,5,3,0,1,i);//Red
      MTFMACDSlow = iCustom(NULL,0,"MTF2_MACD_BDv09_01_20",10,20,5,3,0,0,i);//Blue
             
      int LongSignal=0;
      int ShortSignal=0;
      
      if (Aggressive==true && xpMAup<10000 && emaCrossUp<10000 && MTFMACDFast>=MTFMACDSlow)
         {
         LongSignal=1;
         }
      if (Aggressive==false && xpMAup<10000 && emaCrossUp<10000 && MTFMACDFast>=MTFMACDSlow && MTFMACDFast>=0)
         {
         LongSignal=1;
         }
      if (Aggressive==true && xpMAdn<10000 && emaCrossDn<10000 && MTFMACDFast<=MTFMACDSlow)
         {
         ShortSignal=1;
         }
      if (Aggressive==false && xpMAdn<10000 && emaCrossDn<10000 && MTFMACDFast<=MTFMACDSlow && MTFMACDFast<=0)
         {
         ShortSignal=1;
         }

      if (LongSignal==1)
         {
         Buy[i] = High[i] + EntryOffset*realpoint + MarketInfo(Symbol(),MODE_SPREAD)*Point;
         DrawObject(1,i,Buy[i],BuySymbol);
         Alert("BUYstop Signal On:  ",Symbol(),",  ",PeriodToText(),",  at  ",Buy[i]);
         intsec=TimeSeconds(TimeCurrent());
         SoundAlert=true;
         }         
      if (ShortSignal==1)
         {
         Sell[i] = Low[i] - EntryOffset*realpoint;
         DrawObject(-1,i,Sell[i],SellSymbol);
         Alert("SELLstop Signal On:  ",Symbol(),",  ",PeriodToText(),",  at  ",Sell[i]);
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
      Obj = "MTF2_Buy_" + DoubleToStr(count,0);
      ObjectCreate(Obj,OBJ_ARROW,0,Time[i],price);
      ObjectSet(Obj,OBJPROP_COLOR,BuyColor);
      ObjectSet(Obj,OBJPROP_ARROWCODE,symbol);
      ObjectSet(Obj,OBJPROP_WIDTH,BuySize);
   }
   if (signal==-1) //sell signal
   {
      Obj = "MTF2_Sell_" + DoubleToStr(count,0);
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
      if (StringFind(name,"MTF2",0)>-1) ObjectDelete(name);
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




 
 





 
 

 
 















