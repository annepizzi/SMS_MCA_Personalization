# SMS Demo Playbook: Tap-to-Join and Contact Cards

This demo showcases how to use a website pop-up based on device (desktop vs. mobile), tap-to-join functionality to acquire new SMS subscribers, and send a downloadable contact card.

## **Prerequisites** 

To create in your own demo environment, please ensure you have the following enabled:

1. Agentforce Marketing 
2. Salesforce Personalization  
3. Data360

**Licenses & Permissions:**

1. Data360 Admin  
2. Marketing Admin  
3. Personalization Admin

**Consent & Send Code Requirements**

1. Ensure you have a SMS Sender Code activated
2. Create a New Communication Subscription with Sender Code

**Setup Consent Replies**

Where📍: Setup → SMS Codes → Click on Code
- **Consent Opt-in Type:** Explicit
- **Opt-In Keywords:** JOIN,SIGN-UP, JOIN Send this text to subscribe to recurring automated personalized marketing alerts (e.g. offers) from <company>
- **Opt-In Confirmation Message:** <Company>: Welcome! Msg & data rates apply. Msg frequency varies. Reply HELP for help, STOP to unsubscribe.
- **Double Opt-In Keywords:** YES
- **Opt-Out Keywords (including these system-defined keywords): **REVOKE,STOP,UNSUBSCRIBE,CANCEL,QUIT,END,OPT OUT
- **Opt-Out Message:** You've opted out of receiving messages from us, so we won't contact you again.
- **Help Keywords (including system-defined HELP keyword):** HELP
- **Help Message:** Text STOP to opt out of further messages. Quadstart support at support@quadstar.com

## **How to Implement**

To build in your own environment, please follow these steps.

### **🌟 Data360 Setup**

#### **Create a New Website in Data360**

Where📍: Setup → “Website & Mobile Apps“ in search bar → New (or modify existing)

#### **Add Your Sitemap**

Where📍: Replace Sitemap → Insert your Sitemap  
*Note: This is where you will make any edits on your sitemap.*

#### **Upload Web Schema**

Where📍: Schema → Update Schema

#### **Configure Data Streams**

Where:📍Data 360 App → Data Streams → New → Website → Select Website App → Select All 

#### **Map Data Streams**

Where:📍Data 360 App → Data Streams → New

**Identity**

| Engagement Name | Behavioral Event Table | Maps To ➤ | Data Model Entities | Engagement Name |
| :---: | :---: | :---: | :---: | :---: |
| deviceId | identity | ➤ | Individual | Individual Id (Primary Key) |
| firstName | identity | ➤ | Individual | First Name |
| lastName | identity | ➤ | Individual | Last Name |
| isAnonymous | identity | ➤ | Individual | Is Anonymous |

**Contact Point Phone**

| Engagement Name | Behavioral Event Table | Maps To ➤ | Data Model Entities | Engagement Name |
| :---: | :---: | :---: | :---: | :---: |
| deviceId | contactPointPhone | ➤ | Contact Point Phone | Contact Point Phone Id (Primary Key) |
| phoneNumber | contactPointPhone | ➤ | Contact Point Phone | Telephone Number |
| phoneNumber | contactPointPhone | ➤ | Contact Point Phone | Formatted E164 Phone Number |

**Product Browse Engagement**

| DLO Field Name | Behavioral Event Table | Maps To ➤ | Data Model Entities | Engagement Name |
| ----- | ----- | :---: | ----- | ----- |
| eventId | All Event Data | ➤ | Product Browse Engagement | \*Product Browse Engagement Id Primary Key |
| dateTime | All Event Data | ➤ | Product Browse Engagement | Engagement Date Time |
| deviceId | All Event Data | ➤ | Product Browse Engagement | Individual |
| eventType | Catalog | ➤ | Product Browse Engagement | Engagement Type |
| id | Catalog | ➤ | Product Browse Engagement | Product |

**System Information (Custom DMO)**  
*Note: System information is a custom DMO, so you will need to create a relationship with individual to system information (see relationship below).*

| Object | Field | Key Qualifier (Field) | Cardinality | Related Object | Related Field | Key Qualifier ( Related Field) |
| ----- | ----- | :---: | ----- | ----- | ----- | ----- |
| System Info | deviceId | KQ\_deviceID | ManyToOne | Individual | Individual Id | KQ\_Id |

| DLO Field Name | Behavioral Event Table | Maps To ➤ | Data Model Entities | Engagement Name |
| ----- | ----- | :---: | ----- | ----- |
| \*eventId | All Event Data | ➤ | System Info | \*eventId |
| dateTime | All Event Data | ➤ | System Info | Engagement Date Time |
| deviceId | All Event Data | ➤ | System Info | deviceId |
| eventType | All Event Data | ➤ | System Info | eventType |
| sessionId | All Event Data | ➤ | System Info | sessionId |
| cdp\_sys\_DeviceType | All Event Data | ➤ | System Info | cdp\_sys\_DeviceType |
| System Info | All Event Data | ➤ | System Info | System Info |

#### **Create Real-Time Identity Ruleset**

Match Rules: Exact Phone  
Data Model Object: Contact Point Phone  
*Note: You must use Formatted E164 Phone Number for Identity Resolution and have exact matching.*

#### **Create Real-Time Data Graph**

**Include Fields:**

- First Name *(individual)*   
- Last Name *(individual)*   
- Phone *(individual)*   
- Create Date *(individual)*   
- Formatted e164 Phone Number *(contactPointPhone)*  
- Telephone Number *(contactPointPhone)*  
- Type *(contactPointPhone)*  
- Usage Type  *(contactPointPhone)*  
- cdp\_sys\_DeviceType *(system info)*  
- eventType *(system info)*  
- cdp\_sys\_DeviceModel *(system info)*  
- deviceId *(system info)*  
- dateTime *(system info)*  
- cdp\_sys\_BrowserName *(system info)*

### **🌟 Segmentation Setup**

#### **Submit Phone Number for Contact Card:**

Create a real-time segment and pull in attribution for contact point phone where **create date is today** and **type is equal to contact\_card**.

**Mobile Users**  
System Info **\- cdp\_sys\_DeviceType \-** is Equal to   **SmartPhone**

**Desktop Users**  
System Info **\- cdp\_sys\_DeviceType \-** is Equal to   **Desktop**

---

### **🌟 Personalization Setup**

#### **Create the Response Template**

**Personalization Type:** Manual Content   
**Attributes:**

* BackgroundImageUrl  
* CallToActionText  
* CallToActionUrl  
* Header  
* Subheader  
* Description

#### **Create 2 Personalization Points for Mobile and Desktop**

1. Manual Setup  
2. Personalization Type: Manual Content   
3. Response Template (The one created above)

   

#### **Under the Desktop User Personalization Point, Add a Decision**

1. Decision Configuration  
   1. **BackgroundImageUrl:** https://img.freepik.com/free-vector/abstract-elegant-business-presentation-backdrop-design\_1017-60098.jpg?semt=ais\_hybrid\&w=740\&q=80  
   2. **CallToActionText:** Sign Up Now\!  
   3. **CallToActionUrl**  
   4. **Header:** Stay Connected Through \<Company\>'s Text Messaging Program\!  
   5. **Subheader:** By signing up via text message, you agree to receive promotional and personalized marketing text messages from \<Company\> at the phone number used when signing up. We will use information about your activities on our website and other services to suggest products and offers that might be of interest to you. Message and data rates may apply. You will receive 2-3 messages per week. You can unsubscribe from texts at any time by replying STOP to any of our texts. View Terms \[link\] and Privacy \[link\].  
2. Add Targeting Rules On Decision   
   1. Take Action When All Conditions Are Met \* Segment \= ‎Desktop Users‎ Operator Is Member

      

#### **Under the Mobile User Personalization Point, Add a Decision**

1. Decision Configuration  
   1. **BackgroundImageUrl**: https://t3.ftcdn.net/jpg/02/61/53/06/360\_F\_261530621\_GSo6USr4tNJc1670c0moKXI0x6bThcPn.jpg  
   2. **CallToActionText**: Start Saving\!  
   3. **CallToActionUrl**  
   4. **Description**: By signing up via text message, you agree to receive promotional and personalized marketing text messages from \<Company\> at the phone number used when signing up. We will use information about your activities on our website and other services to suggest products and offers that might be of interest to you. Message and data rates may apply. You will receive 2-3 messages per week. You can unsubscribe from texts at any time by replying STOP to any of our texts. View Terms \[link\] and Privacy \[link\].  
   5. **Header**: Get Rewards Sent Directly to Your Phone\!  
   6. **Subheader:** Become a member of our text rewards program now.  
2. Add Targeting Rules On Decision   
   1. Take Action When All Conditions Are Met \* Segment \= Mobile Users‎ Operator Is Member  
3. Open the Web Personalization Manager  
   1. From Website & Mobile Apps open your App and scroll down to copy the CDN script   
   2. Go to the company web page (example: [Quadstar](https://www.quadstarcomms.com/default/home)) and open the Salesforce Interactions Launcher. Add your CDN under the “Force SDK URL” and hit inject. Ensure you also have disabled personalized toggle on.   
   3. Add ?sf\_personalization\_wpm to the end of the URL (example: [https://www.quadstarcomms.com/default/home?sf\_personalization\_wpm](https://www.quadstarcomms.com/default/home?sf_personalization_wpm)) and hit enter. You will be prompted to log into your Data 360 account.   
   4. Once logged in, you should see the WPM open on your screen. On the lefthand side, hit Personalization Experiences and “Add New” and Configure Embedded Content.  
   5. Choose the Desktop Personalization Point → and select the SimpleOverlay Template  
   6. On the right side template, choose “Add on Overlay” for Method to Display, and “Exit Intent” as When to Display. Click Save and toggle the state to live.  
   7. For Mobile Personalization Point → Select mobileOverlay Template  
   8. On the right side template, choose “Add on Overlay” and Method to Display, and “Scroll Percent” as When to Display. Pick 5%. Click Save and toggle the state to live.  
   9. **NOTE: if you do not have the SDK/CDN live on the website (as in integrated) you won’t be able to test the experience of the Desktop popup on your phone. Your best way to demo this is to keep the WPM app live and show the experience of the mobile user.**

---

### **🌟 Agentforce Marketing Setup**

#### **For Desktop Experience**

1. Create a web page to hold an SMS link (you can use MCE CloudPage for this, [Example here](https://mctfhbnjkktpdnvjkfy2stt2d-84.pub.sfmc-content.com/wv54rdw4vht)). You can also use the script below. The important element is the VCard code highlighted in yellow. Save and publish. (Vcard code available in folder)   
2. Create an SMS message in Agentforce Marketing under content.  
   1. **Message Purpose:** Promotional  
   2. **Message:** Hi there\! Welcome to \<Company\>\! Tap the card below to save our details and get exclusive offers. \<Insert URL from Page Here\>  
3. Create an SMS campaign   
   1. **Type:** Single SMS Message with Real-Time Segment  
   2. Pick Existing RT Segment → Submit Phone Number for Contact Card   
   3. Add your sender code and communication subscription  
4. Save and activate

#### **For Mobile Experience**

1. **Create 3 new SMS messages**   
   1. Welcome Coupon   
      1. **Message Purpose:** Promotional  
      2. **Message:** \<Company\>: Here's your 10% off coupon: SMSy6zf83GEG. Click here to auto-apply the code and shop: [https://www.salesforce.com](https://www.salesforce.com)  
   2. Welcome Contact Card  
      1. **Message Purpose:** Promotional  
      2. **Message:** \<Company\>: Don't forget to save our contact to get exclusive updates\! \<Insert URL from Page Here\>  
   3. Collect Interest  
      1. **Message Purpose:** Promotional  
      2. **Message:** \<Company\>: We'd love to get to know you better\! Was there a particular product or category of products you are most interested in learning about for example our device line, internet plans or entertainment bundles?   
2. **Create an Automation Event-Triggered Flow**  
   1. Event: SMS Subscription   
   2. Create Records  
      1. How to set record field values: Manually  
      2. Object: Prospect   
      3. Set Field Values for the Prospect: Field= **Phone** ←Value= **{\!$Event.ssot\_\_ContactPointValueText\_\_c}**  
   3. Add a Send SMS Message for “Send Welcome Coupon” SMS  
   4. Add a Send SMS Message for “Send Welcome Contact Card” SMS  
   5. Add wait event   
      1. 1 Minute   
   6. Add Path Experiment: Manual  
      1. Conversational Path  
         1. Path Label: Conversational  
         2. Path API Name: Conversational  
         3. Path Percentage: 50%   
      2. Add a Send SMS Message for “Collect Interest” SMS on Conversational Path  
      3. No follow-up  
         1. Path Label: No follow-up  
         2. Path API Name: No\_follow\_up  
         3. Path Percentage: 50%   
      4. Add a Send SMS Message for “Collect Interest” SMS on No Follow-Up Path  
   7. Save and activate
