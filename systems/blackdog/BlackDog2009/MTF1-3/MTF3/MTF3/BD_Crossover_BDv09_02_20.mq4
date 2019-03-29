//+------------------------------------------------------------------+
//|                                     BD Crossover BDv09_02_20.mq4 |
//|                                                             Jeff |
//|                                                  wolfboy@att.net |
//+------------------------------------------------------------------+
#property copyright "Jeff"
#property link      "wolfboy@att.net"

// BD Crossover BDv8_12_31:  Original indicator modified for the Black Dog Trading System.

//Ths version simply adds a comment in the upper left hand corner of the chart
//indicating the last Black Dog arrow direction.

// BD Crossover BDv09_02_20: Adds options for where to place the Black Dog Arrow Direction comment and 
//                           other comment options.  BDTextWhatCorner: 0=upper left; 1=upper right; 
//                           2=lower left; 3=lower right.


#property indicator_chart_window
#property indicator_buffers 4
#property indicator_color1 Blue
#property indicator_color2 Red
#property indicator_color3 Black
#property indicator_color4 Black
#property indicator_width1 1
#property indicator_width2 1
#property indicator_width3 2
#property indicator_width4 2

double CrossUp1[];
double CrossDown1[];
double CrossUp2[];
double CrossDown2[];
extern int     FasterEMA1 = 3;
extern int     SlowerEMA1 = 50;
extern int     FasterEMA2 = 20;
extern int     SlowerEMA2 = 100;
extern int     CommentCorner    = 0;
extern int     CommentYoffset   = 11;
extern int     CommentXoffset   = 3;
extern int     CommentFontSize  = 8;
extern color   CommentColor     = Black;
extern string  CommentFontType  = "Arial";
extern bool    SoundON          = false;
double alertTag;
double control=2147483647;
 
//+------------------------------------------------------------------+
//| Custom indicator initialization function                         |
//+------------------------------------------------------------------+
int init()
   {
//---- indicators
   SetIndexStyle(0, DRAW_ARROW, EMPTY,1);
   SetIndexArrow(0, 233);
   SetIndexBuffer(0, CrossUp1);
   SetIndexStyle(1, DRAW_ARROW, EMPTY,1);
   SetIndexArrow(1, 234);
   SetIndexBuffer(1, CrossDown1);
   SetIndexStyle(2, DRAW_ARROW, EMPTY,2);
   SetIndexArrow(2, 233);
   SetIndexBuffer(2, CrossUp2);
   SetIndexStyle(3, DRAW_ARROW, EMPTY,2);
   SetIndexArrow(3, 234);
   SetIndexBuffer(3, CrossDown2);

//----
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
   int limit, i, counter;
   double fasterEMA1now, slowerEMA1now, fasterEMA1previous, slowerEMA1previous, fasterEMA1after, slowerEMA1after;
   double fasterEMA2now, slowerEMA2now, fasterEMA2previous, slowerEMA2previous, fasterEMA2after, slowerEMA2after;
   
   double Range, AvgRange;
   int counted_bars=IndicatorCounted();
//---- check for possible errors
   if(counted_bars<0) return(-1);
//---- last counted bar will be recounted
   if(counted_bars>0) counted_bars--;

   limit=Bars-counted_bars;
   
   for(i = 0; i <= limit; i++) 
      {
      counter=i;
      Range=0;
      AvgRange=0;
      for (counter=i ;counter<=i+9;counter++)
         {
         AvgRange=AvgRange+MathAbs(High[counter]-Low[counter]);
         }
      Range=AvgRange/10;
       
      fasterEMA1now = iMA(NULL, 0, FasterEMA1, 0, MODE_EMA, PRICE_CLOSE, i);
      fasterEMA1previous = iMA(NULL, 0, FasterEMA1, 0, MODE_EMA, PRICE_CLOSE, i+1);
      fasterEMA1after = iMA(NULL, 0, FasterEMA1, 0, MODE_EMA, PRICE_CLOSE, i-1);

      slowerEMA1now = iMA(NULL, 0, SlowerEMA1, 0, MODE_EMA, PRICE_CLOSE, i);
      slowerEMA1previous = iMA(NULL, 0, SlowerEMA1, 0, MODE_EMA, PRICE_CLOSE, i+1);
      slowerEMA1after = iMA(NULL, 0, SlowerEMA1, 0, MODE_EMA, PRICE_CLOSE, i-1);
      
      if ((fasterEMA1now > slowerEMA1now) && (fasterEMA1previous < slowerEMA1previous) && (fasterEMA1after > slowerEMA1after))
         {
         CrossUp1[i] = Low[i] - Range*0.5;
         }
      else if ((fasterEMA1now < slowerEMA1now) && (fasterEMA1previous > slowerEMA1previous) && (fasterEMA1after < slowerEMA1after)) 
         {
         CrossDown1[i] = High[i] + Range*0.5;
         }
      if (SoundON==true && i==1 && CrossUp1[i] > CrossDown1[i] && alertTag!=Time[0])
         {
         Alert("EMA Cross Trend going Down on ",Symbol()," ",Period(),",   ",FasterEMA1,"/",SlowerEMA1," Periods");
         alertTag = Time[0];
         }
      if (SoundON==true && i==1 && CrossUp1[i] < CrossDown1[i] && alertTag!=Time[0])
         {
         Alert("EMA Cross Trend going Up on ",Symbol()," ",Period(),",   ",FasterEMA1,"/",SlowerEMA1," Periods");
         alertTag = Time[0];
         }
         
//-----second EMA crossover------------------      
       
      fasterEMA2now = iMA(NULL, 0, FasterEMA2, 0, MODE_EMA, PRICE_CLOSE, i);
      fasterEMA2previous = iMA(NULL, 0, FasterEMA2, 0, MODE_EMA, PRICE_CLOSE, i+1);
      fasterEMA2after = iMA(NULL, 0, FasterEMA2, 0, MODE_EMA, PRICE_CLOSE, i-1);

      slowerEMA2now = iMA(NULL, 0, SlowerEMA2, 0, MODE_EMA, PRICE_CLOSE, i);
      slowerEMA2previous = iMA(NULL, 0, SlowerEMA2, 0, MODE_EMA, PRICE_CLOSE, i+1);
      slowerEMA2after = iMA(NULL, 0, SlowerEMA2, 0, MODE_EMA, PRICE_CLOSE, i-1);
      
      if ((fasterEMA2now > slowerEMA2now) && (fasterEMA2previous < slowerEMA2previous) && (fasterEMA2after > slowerEMA2after))
         {
         CrossUp2[i] = Low[i] - Range*0.5;
         }
      else if ((fasterEMA2now < slowerEMA2now) && (fasterEMA2previous > slowerEMA2previous) && (fasterEMA2after < slowerEMA2after)) 
         {
         CrossDown2[i] = High[i] + Range*0.5;    
         }
      if (SoundON==true && i==1 && CrossUp2[i] > CrossDown2[i] && alertTag!=Time[0])
         {
         Alert("EMA Cross Trend going Down on ",Symbol()," ",Period(),",   ",FasterEMA2,"/",SlowerEMA2," Periods");
         alertTag = Time[0];
         }
      if (SoundON==true && i==1 && CrossUp2[i] < CrossDown2[i] && alertTag!=Time[0])
         {
         Alert("EMA Cross Trend going Up on ",Symbol()," ",Period(),",   ",FasterEMA2,"/",SlowerEMA2," Periods");
         alertTag = Time[0];
         }
         
      string BDUpText = "Latest Black Dog Arrow is:  UP";
      string BDDnText = "Latest Black Dog Arrow is:  DOWN";
      string BDFlatText = "Latest Black Dog Arrow is:  FLAT";
       
         
      if (fasterEMA2now > slowerEMA2now)
         {
         ObjectCreate("BD_Direction_Text",OBJ_LABEL,0,0,0);
         ObjectSetText("BD_Direction_Text",BDUpText,CommentFontSize,CommentFontType,CommentColor);
         ObjectSet("BD_Direction_Text",OBJPROP_CORNER,CommentCorner);
         ObjectSet("BD_Direction_Text",OBJPROP_XDISTANCE,CommentXoffset);
         ObjectSet("BD_Direction_Text",OBJPROP_YDISTANCE,CommentYoffset);
         }
      if (fasterEMA2now < slowerEMA2now)
         {
         ObjectCreate("BD_Direction_Text",OBJ_LABEL,0,0,0);
         ObjectSetText("BD_Direction_Text",BDDnText,CommentFontSize,CommentFontType,CommentColor);
         ObjectSet("BD_Direction_Text",OBJPROP_CORNER,CommentCorner);
         ObjectSet("BD_Direction_Text",OBJPROP_XDISTANCE,CommentXoffset);
         ObjectSet("BD_Direction_Text",OBJPROP_YDISTANCE,CommentYoffset);
         } 
      if (fasterEMA2now == slowerEMA2now)
         {
         ObjectCreate("BD_Direction_Text",OBJ_LABEL,0,0,0);
         ObjectSetText("BD_Direction_Text",BDFlatText,CommentFontSize,CommentFontType,CommentColor);
         ObjectSet("BD_Direction_Text",OBJPROP_CORNER,CommentCorner);
         ObjectSet("BD_Direction_Text",OBJPROP_XDISTANCE,CommentXoffset);
         ObjectSet("BD_Direction_Text",OBJPROP_YDISTANCE,CommentYoffset);
         }
      }
   return(0);
}  

void DeleteAllObjects()
{
   int objs = ObjectsTotal();
   string name;
   for(int cnt=ObjectsTotal()-1;cnt>=0;cnt--)
   {
      name=ObjectName(cnt);
      if (StringFind(name,"BD_Direction_Text",0)>-1) ObjectDelete(name);
   }
}