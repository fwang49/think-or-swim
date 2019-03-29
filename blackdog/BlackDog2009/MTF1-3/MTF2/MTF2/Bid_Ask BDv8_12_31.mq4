//+------------------------------------------------------------------+
//|                                           Bid_Ask BDv8_12_31.mq4 |
//|                                                             Jeff |
//|                                                  wolfboy@att.net |
//+------------------------------------------------------------------+
#property copyright "Jeff"
#property link      "wolfboy@att.net"

// Bid_Ask BDv8_12_31:  Original indicator modified for the Black Dog Trading System.

// This a modified version of the "Magnified Market Price" ver1.4 by Habeeb.
// This version gives more external options (show Ask, font size, font type, colors)
// and gives a more complete view of price changes.

#property indicator_chart_window

  extern string note1 = "Change font colors automatically? True = Yes";
  extern bool   Bid_Ask_Colors = True;
  extern bool   ShowBid = True;
  extern bool   ShowAsk = True;
  extern color  DefaultColor = White;
  extern color  BidUpColor = Lime;
  extern color  BidDnColor = Red;
  extern color  AskUpColor = Lime;
  extern color  AskDnColor = Red;
  extern string note3 = "Font Size";
  extern int    BidFontSize=22;
  extern int    AskFontSize=18;
  extern string note4 = "Font Type";
  extern string BidFontType="Arial";
  extern string AskFontType="Arial";
  extern string note5 = "Display the price in what corner?";
  extern string note6 = "Upper left=0; Upper right=1";
  extern string note7 = "Lower left=2; Lower right=3";
  extern int    WhatCorner=3;
   
  double        Old_Ask_Price, Old_Bid_Price;

int init()
   {
   return(0);
   }

int deinit()
   {
   ObjectDelete("Market_Ask_Price_Label");
   ObjectDelete("Market_Bid_Price_Label");
  
   return(0);
   }

int start()
   {
   int AskYoffset, BidYoffset;
   color AskColor, BidColor;
   
   if (Bid_Ask_Colors == True)
      {
      if (Ask > Old_Ask_Price) AskColor = AskUpColor;
      if (Ask < Old_Ask_Price) AskColor = AskDnColor;
      if (Ask == Old_Ask_Price) AskColor = DefaultColor;
      if (Bid > Old_Bid_Price) BidColor = BidUpColor;
      if (Bid < Old_Bid_Price) BidColor = BidDnColor;
      if (Bid == Old_Bid_Price) BidColor = DefaultColor;
      Old_Ask_Price = Ask;
      Old_Bid_Price = Bid;
      }
    
   if (Bid_Ask_Colors == False)
      {
      if (Ask > Old_Ask_Price) AskColor = DefaultColor;
      if (Ask < Old_Ask_Price) AskColor = DefaultColor;
      if (Ask == Old_Ask_Price) AskColor = DefaultColor;
      if (Bid > Old_Bid_Price) BidColor = DefaultColor;
      if (Bid < Old_Bid_Price) BidColor = DefaultColor;
      if (Bid == Old_Bid_Price) BidColor = DefaultColor;
      Old_Ask_Price = Ask;
      Old_Bid_Price = Bid;
      }
    
   
   string Market_Ask_Price = DoubleToStr(Ask, Digits);
   string Market_Bid_Price = DoubleToStr(Bid, Digits);
   
   if(ShowBid == True && ShowAsk  == True)
      {
      if(WhatCorner == 2 || WhatCorner == 3)
         {
         AskYoffset = BidFontSize + 8;
         BidYoffset = 1;
         }
      if(WhatCorner == 0 || WhatCorner == 1)
         {
         AskYoffset = 1;
         BidYoffset = AskFontSize + 8;
         }

      ObjectCreate("Market_Ask_Price_Label", OBJ_LABEL, 0, 0, 0);
      ObjectSetText("Market_Ask_Price_Label", Market_Ask_Price, AskFontSize, AskFontType, AskColor);
      ObjectSet("Market_Ask_Price_Label", OBJPROP_CORNER, WhatCorner);
      ObjectSet("Market_Ask_Price_Label", OBJPROP_XDISTANCE, 1);
      ObjectSet("Market_Ask_Price_Label", OBJPROP_YDISTANCE, AskYoffset);
   
      
      ObjectCreate("Market_Bid_Price_Label", OBJ_LABEL, 0, 0, 0);
      ObjectSetText("Market_Bid_Price_Label", Market_Bid_Price, BidFontSize, BidFontType, BidColor);
      ObjectSet("Market_Bid_Price_Label", OBJPROP_CORNER, WhatCorner);
      ObjectSet("Market_Bid_Price_Label", OBJPROP_XDISTANCE, 1);
      ObjectSet("Market_Bid_Price_Label", OBJPROP_YDISTANCE, BidYoffset);
       
      }
      
   if(ShowBid == True && ShowAsk == False)
      {
      BidYoffset = 1;
      
      ObjectCreate("Market_Bid_Price_Label", OBJ_LABEL, 0, 0, 0);
      ObjectSetText("Market_Bid_Price_Label", Market_Bid_Price, BidFontSize, BidFontType, BidColor);
      ObjectSet("Market_Bid_Price_Label", OBJPROP_CORNER, WhatCorner);
      ObjectSet("Market_Bid_Price_Label", OBJPROP_XDISTANCE, 1);
      ObjectSet("Market_Bid_Price_Label", OBJPROP_YDISTANCE, BidYoffset);
      }
      
   if(ShowBid == False && ShowAsk == True)
      {
      AskYoffset = 1;
      
      ObjectCreate("Market_Ask_Price_Label", OBJ_LABEL, 0, 0, 0);
      ObjectSetText("Market_Ask_Price_Label", Market_Ask_Price, AskFontSize, AskFontType, AskColor);
      ObjectSet("Market_Ask_Price_Label", OBJPROP_CORNER, WhatCorner);
      ObjectSet("Market_Ask_Price_Label", OBJPROP_XDISTANCE, 1);
      ObjectSet("Market_Ask_Price_Label", OBJPROP_YDISTANCE, AskYoffset);
      } 
  }
  
  