/** Enable detailed client-side console logging. Do not use in Prod environment! */
SalesforceInteractions.setLoggingLevel(100);

/** END: Quick consent management shortcut. Do not use in Prod environment!  */   

/* ========= START: PERSONALIZATION INITIALIZATION ========= */
SalesforceInteractions.Personalization.Config.initialize({
    customFlickerDefenseConfig: {
        redisplayTimeoutMilliseconds: 2000,
        renderPersonalizationAfterTimeoutElapsed: true
    },
    additionalTransformers: [{
        name: "SimpleRecs",
        transformerType: "Handlebars",
        lastModifiedDate: new Date().getTime() - (1000 * 60 * 60 * 36),
        substitutionDefinitions: {
            recs: { defaultValue: '[data]' },
            image: { defaultValue: '[Image_Link__c]' },
            name: { defaultValue: '[ssot__Name__c]' },
            price: { defaultValue: '[Sales_Price__c]' }
        },
        // 36 hours ago
        transformerTypeDetails: {
            html: `
                <style>
                    .sfdcep-recs-carousel { 
                        width: 100%;
                        max-width: 1440px !important;
                        margin: 0px auto;
                        display: flex; 
                        justify-content: space-evenly;
                        flex-flow: row wrap;
                        padding: 20px 0px !important;
                    }
                
                    .sfdcep-recs-item {
                        margin: 0 !important;
                        width: 25%;
                        min-width: 250px;
                        text-align: center;
                        color: #393939;
                        font-family: Arial, Helvetica, sans-serif;
                        font-size: 15px;
                    }
                
                    .sfdcep-recs-item-img {
                        text-align: center;
                    }
                
                    .sfdcep-recs-item-img img {
                        width: 90%;
                        max-height: 320px;
                        max-width: 320px;
                    }
                
                    .sfdcep-recs-item-name {
                        padding-top: 10px;
                    }
                
                    .sfdcep-recs-item-name a{
                        color: #393939;
                        text-decoration: none;
                        font-weight: 600;
                    }
                
                    .sfdcep-recs-item-price {
                        padding-top: 10px;
                    }
                
                    .sfdcep-recs-item-rating {
                        color: #097fb3;
                        letter-spacing: 3px;
                        padding-top: 10px;
                    }
                </style>
                
                
                <div class="sfdcep-recs-carousel">
                    {{#each (subVar 'recs')}}
                    <div class="sfdcep-recs-item" >
                        <div class="sfdcep-recs-item-img">
                            {{#if (subVar 'image')}}
                                <img src="{{subVar 'image'}}" />
                            {{else}}
                                <img src="https://placehold.co/320x320/white/blue?text=*" />
                            {{/if}}
                        </div>
                
                        <div class="sfdcep-recs-item-name">
                            <a href="#">{{subVar 'name'}}</a>
                        </div>
                
                        <div class="sfdcep-recs-item-price">
                           <a href="#">{{subVar 'price'}}</a>
                        </div>
                    </div>
                    {{/each}}
                </div>
            `
        }
    },
    {
        name: "SimpleHero",
        transformerType: "Handlebars",
        lastModifiedDate: new Date().getTime() - (1000 * 60 * 60 * 36),

        substitutionDefinitions: {
            BackgroundImageUrl: { defaultValue: '[attributes].[BackgroundImageUrl]' },
            Header: { defaultValue: '[attributes].[Header]' },
            Subheader: { defaultValue: '[attributes].[Subheader]' },
            CallToActionUrl: { defaultValue: '[attributes].[CallToActionUrl]' },
            CallToActionText: { defaultValue: '[attributes].[CallToActionText]' }
        },
        // 36 hours ago
        transformerTypeDetails: {
            html: `
                <style>
                    .sfdcep-banner {
                        margin: 0px auto;
                        width: 100%;
                        /* max-width: 1440px !important; */
                        min-height: 600px;
                        display: flex;
                        flex-flow: column wrap;
                        justify-content: center;
                        font-family: Arial, Helvetica, sans-serif;
                    } 
    
                    .sfdcep-banner-header {
                        font-size: 32px;
                        padding-bottom: 40px;
                        font-weight: 600;
                        color: #DDDDDD;
                        text-align: center;
                    }    
    
                    .sfdcep-banner-subheader {
                        font-size: 20px;
                        font-weight: 400;
                        color: #DDDDDD;
                        text-align: center;
                        padding-bottom: 40px;
                    } 
    
                    .sfdcep-banner-cta {
                        text-align: center;
                    }
    
                    .sfdcep-banner-cta a {
                        padding: 10px 20px;
                        display: inline-block;
                        background-color: #097fb3;
                        border-radius: 20px;
                        color: #DDDDDD;
                        text-decoration: none;
                        font-weight: 400;
                        font-size: 18px;
                    }
                </style>
    
                 <div class="sfdcep-banner" style="background: url('{{subVar 'BackgroundImageUrl'}}') no-repeat center center;">
                   <div class="sfdcep-banner-box">
                   <div class="sfdcep-banner-header">{{subVar 'Header'}}</div>
                   <div class="sfdcep-banner-subheader">{{subVar 'Subheader'}}</div>
                   <div class="sfdcep-banner-cta">
                       <a href="{{subVar 'CallToActionUrl'}}">{{subVar 'CallToActionText'}}</a>
                   </div>
                   </div>
               </div>
            `
        }
    },
       {
        name: "HeaderReplace",
        transformerType: "Handlebars",
        lastModifiedDate: new Date().getTime() - (1000 * 60 * 60 * 36),

        substitutionDefinitions: {
            Header: { defaultValue: '[attributes].[Header]' }
        },
        // 36 hours ago
        transformerTypeDetails: {
            html: `
                <style>
                    .sfdcep-banner {
                        margin: 0px auto;
                        width: 100%;
                        /* max-width: 1440px !important; */
                        min-height: 20px;
                        display: flex;
                        flex-flow: column wrap;
                        justify-content: center;
                        font-family: Arial, Helvetica, sans-serif;
                    } 
    
                    .sfdcep-banner-header {
                        font-size: 20px;
                        padding-bottom: 5px;
                        padding-top: 5px;
                        font-weight: 600;
                        color: #FFFFFF;
                        text-align: center;
                    }    
                </style>
    
                <div class="sfdcep-banner" style="background: url('{{subVar 'BackgroundImageUrl'}}') no-repeat center center;">
                    <div class="sfdcep-banner-header">{{subVar 'Header'}}</div>
                    </div>
                </div>
            `
        }
    },
    {
        name: "SimpleOverlay",
        transformerType: "Handlebars",
        lastModifiedDate: new Date().getTime() - (1000 * 60 * 60 * 36),
        substitutionDefinitions: {
            BackgroundImageUrl: { defaultValue: '[attributes].[BackgroundImageUrl]' },
            Header: { defaultValue: '[attributes].[Header]' },
            Subheader: { defaultValue: '[attributes].[Subheader]' },
            CallToActionUrl: { defaultValue: '[attributes].[CallToActionUrl]' },
            CallToActionText: { defaultValue: '[attributes].[CallToActionText]' }
        },
        transformerTypeDetails: {
            html: `
                <style>
                    .sfdcep-overlay {
                        background-color: rgba(0,0,0,0.7);
                        position: fixed;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        z-index: 256;
                    }
      
                    .sfdcep-overlay-banner {
                        position: relative;
                        margin: 0px auto;
                        margin-top: 256px;
                        width: 500px;
                        height: 500px;
                        background-color: white;
                        display: flex;
                        flex-flow: column wrap;
                        justify-content: center;
                        font-family: Arial, Helvetica, sans-serif;
                        border-radius: 12px;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                    }
      
                    .close-button {
                        position: absolute;
                        top: 10px;
                        right: 15px;
                        background: none;
                        border: none;
                        font-size: 24px;
                        color: #333;
                        cursor: pointer;
                    }
      
                    .close-button:hover {
                        color: #097fb3;
                    }
      
                    .evg-form {
                        text-align: center;
                    }
      
                    .sfdcep-overlay-header {
                        font-size: 32px;
                        padding-bottom: 20px;
                        font-weight: 600;
                        color: #333;
                        text-align: center;
                    }
      
                    .sfdcep-overlay-subheader {
                        font-size: 11px;
                        font-weight: 400;
                        color: #555;
                        text-align: center;
                        padding-bottom: 30px;
                        padding-left: 15px;
                        padding-right: 15px;
                    }
      
                    .evg-phone {
                        width: 80%;
                        padding: 10px;
                        font-size: 16px;
                        margin-bottom: 20px;
                    }
      
                    .evg-cta {
                        padding: 10px 20px;
                        background-color: #097fb3;
                        border-radius: 20px;
                        border: none;
                        color: white;
                        cursor: pointer;
                        font-size: 18px;
                    }
      
                    .evg-cta:hover {
                        background-color: #066c95;
                    }
                </style>
      
                 <div class="sfdcep-overlay">
                    <div class="sfdcep-overlay-banner" style="background: url('{{subVar 'BackgroundImageUrl'}}') no-repeat top left / cover;">
                        <button class="close-button" aria-label="Close">&times;</button>
                        <div class="sfdcep-overlay-header">{{subVar 'Header'}}</div>
                        <div class="sfdcep-overlay-subheader">{{subVar 'Subheader'}}</div>
                        <form class="evg-form" aria-label="phone signup" role="form">
                            <input class="evg-phone" name="phone" type="phone" required placeholder="+X(XXX)XXX-XXXX"
                                aria-label="Phone Number" aria-required="true" tabindex="0">
                            <button id="submit" class="evg-cta" type="button" aria-label="Submit">
                                {{subVar 'CallToActionText'}}
                            </button>
                        </form>
                    </div>
                </div>
            `
        }
      },
   {
        name: "MobileOverlay",
        transformerType: "Handlebars",
        lastModifiedDate: new Date().getTime() - (1000 * 60 * 60 * 36),
        // 36 hours ago

        substitutionDefinitions: {
            BackgroundImageUrl: { defaultValue: '[attributes].[BackgroundImageUrl]' },
            Header: { defaultValue: '[attributes].[Header]' },
            Subheader: { defaultValue: '[attributes].[Subheader]' },
            CallToActionUrl: { defaultValue: '[attributes].[CallToActionUrl]' },
            CallToActionText: { defaultValue: '[attributes].[CallToActionText]' },
            Description: { defaultValue: '[attributes].[Description]' }
        },
        transformerTypeDetails: {
            html: `
                <style>
                    .sfdcep-overlay {
                        background-color: rgba(0,0,0,0.8);
                        position: fixed;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        z-index: 256;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 20px;
                    }
    
                    .sfdcep-overlay-banner {
                        margin: 0 auto;
                        width: 100%;
                        max-width: 350px; 
                        min-height: 450px;
                        background-color: white;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        font-family: Arial, Helvetica, sans-serif;
                        border-radius: 12px;
                        overflow: hidden;
                        background-size: cover !important;
                        background-position: center !important;
                        box-shadow: 0 10px 25px rgba(0,0,0,0.5);
                    }

                    .sfdcep-overlay-box {
                        background: rgba(0, 0, 0, 0.4);
                        height: 100%;
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        padding: 30px;
                        box-sizing: border-box;
                    }
    
                    .sfdcep-overlay-header {
                        font-size: 25px;
                        padding-bottom: 15px;
                        font-weight: 700;
                        color: #FFFFFF;
                        text-align: center;
                        line-height: 1.2;
                    }
    
                    .sfdcep-overlay-subheader {
                        font-size: 15px;
                        font-weight: 400;
                        color: #EEEEEE;
                        text-align: center;
                        padding-bottom: 10px;
                        line-height: 1.4;
                    }

                    .sfdcep-overlay-description {
                        font-size: 9px;
                        color: #EEEEEE;
                        text-align: center;
                        padding-bottom: 30px;
                        line-height: 1;
                    }

                    .sfdcep-overlay-cta {
                        text-align: center;
                    }
    
                    .sfdcep-overlay-cta a {
                        padding: 14px 28px;
                        display: inline-block;
                        background-color: #097fb3;
                        border-radius: 30px;
                        color: #FFFFFF;
                        text-decoration: none;
                        font-weight: 600;
                        font-size: 18px;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                    }
                </style>
                <div class="sfdcep-overlay" onclick="if(event.target === this) document.body.removeChild(this)">
                    <div class="sfdcep-overlay-banner" style="background: url('{{subVar 'BackgroundImageUrl'}}') no-repeat center center;">
                       <div class="sfdcep-overlay-box">
                        <div class="sfdcep-overlay-header">{{subVar 'Header'}}</div>
                        <div class="sfdcep-overlay-subheader">{{subVar 'Subheader'}}</div>
                        <div class="sfdcep-overlay-description">{{subVar 'Description'}}</div>
                        <div class="sfdcep-overlay-cta">
<a href="sms:+12062599934?body=JOIN%20Send%20this%20text%20to%20subscribe%20to%20recurring%20automated%20personalized%20marketing%20alerts%20(e.g.%20offers)%20from%20Quadstar">
    {{subVar 'CallToActionText'}}
</a>                        </div>
                       </div>
                    </div>
                </div>
            `
        }
    }     
    ]
});
/* ========= END: PERSONALIZATION INITIALIZATION ========= */

/** START: Quick consent management shortcut. Do not use in Prod environment!  */
SalesforceInteractions.updateConsents({
    purpose: SalesforceInteractions.ConsentPurpose.Tracking,
    provider: "Example Consent Manager",
    status: SalesforceInteractions.ConsentStatus.OptIn
});

const { OnSetAnonymousId } = SalesforceInteractions.CustomEvents;

document.addEventListener(OnSetAnonymousId, () => {
  if (!window._identitySent) {
    window._identitySent = true;
    console.log("Sending identity event from OnSetAnonymousId listener");
    SalesforceInteractions.sendEvent({
      user: {
        attributes: {
          eventType: "identity",
          isAnonymous: 1,
          firstName: "",
          lastName: ""
        }
      }
    });
  }
});
/** END: Consent-based identity event */

SalesforceInteractions.init({
    personalization: { dataspace: "default" }
}).then(() => {
    const { cashDom, listener, sendEvent } = SalesforceInteractions;

    const config = {
        pageTypes: [
               {
                name: "Quadstar Home2",
                isMatch: () => window.location.pathname == "/s/quadstar-personal/default/home",
                interaction: {
                    name: 'viewed_quadstar_homepage', 
                    eventType: 'browse', 
                    pageName: 'Quadstar Homepage',
                    pageType: 'Quadstar Homepage',
                    pageView: '1'
        },
    },
            {
                name: "onlyOnQuadstar",
                isMatch: () => window.location.pathname === "/s/quadstar-personal/default/onlyquadstar",
                interaction: { name: 'view_onQuadStar' },
                listeners: [
                    SalesforceInteractions.listener("click", ".evg-cta", (event) => {
                        event.preventDefault();
                        const phoneNumber = cashDom(".evg-phone").val(); 
                      	SalesforceInteractions.sendEvent({
                            interaction: {
                                name: 'id_capture' 
                            },
                            user: {
                                attributes: {
                                    phoneNumber: phoneNumber,
                                    eventType: 'identity', 
                                    isAnonymous: 0 
                                }
                            }
                        });
                        SalesforceInteractions.sendEvent({
                            interaction: { name: 'phoneCapture' },
                            user: {
                                attributes: {
                                    phoneNumber: phoneNumber,
                                  	smsPhone: phoneNumber,
                                    eventType: 'contactPointPhone',
                                    type: 'contact_card',
                                }
                            }
                        });                     
                    })
                ]
            },
            {
   name: "Product",
   isMatch: () => window.location.href.includes('/s/quadstar-personal/default/prepaid-5g'),
   interaction: {
       name: SalesforceInteractions.CatalogObjectInteractionName.ViewCatalogObject,
       catalogObject: {
           type: "Product",
           id: "prepaid-5G",
         attributes: {
           plan: "prepaid",
              }
       },
},
 listeners: [
 SalesforceInteractions.listener('click', '.navbar-toggler', () => {
SalesforceInteractions.sendEvent({
        interaction: {
            name: SalesforceInteractions.CartInteractionName.AddToCart,
            lineItem: {
                catalogObjectType: "Product",
                catalogObjectId: "prepaid-5g",
                price: "30.00",
                quantity: "1",
            }
        }
    })
})
],
},
{
   name: "Product",
   isMatch: () => window.location.href.includes('/s/quadstar-personal/default/quadstar-celestial-connect-plan'),
   interaction: {
       name: SalesforceInteractions.CatalogObjectInteractionName.ViewCatalogObject,
       catalogObject: {
           type: "Product",
           id: "quadstar-celestial-connect-plan",
         attributes: {
           plan: "bundle",
              }
       },
},
listeners: [
SalesforceInteractions.listener('click', '.navbar-toggler', () => {
SalesforceInteractions.sendEvent({
         interaction: {
            name: SalesforceInteractions.OrderInteractionName.Purchase,
                order: {
                    id: '2021034',
                    totalValue: "99.99",
                    currency: "USD",
                    lineItems: [{
                        catalogObjectType: 'Product',
                        catalogObjectId: 'quadstar-celestial-connect-plan',
                        quantity: "1",
                        price: "99.99",
                    }]
                },
            }
    })
})
],
},
        ],
        pageTypeDefault: { name: "Default" }
    };

    SalesforceInteractions.initSitemap(config);
});

document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("close-button")) {
        const overlay = document.querySelector(".sfdcep-overlay");
        if (overlay) overlay.remove();
    }
});

document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("evg-cta")) {
        const overlayBanner = document.querySelector(".sfdcep-overlay-banner");
        if (overlayBanner) {
            overlayBanner.innerHTML = `
                <div class="thank-you-message" style="text-align:center; padding:80px;">
                    <h2>Thank You!</h2>
                    <p>We’ve received your submission.</p>
                    <button class="close-button" aria-label="Close">&times;</button>
                </div>
            `;
        }
    }
});