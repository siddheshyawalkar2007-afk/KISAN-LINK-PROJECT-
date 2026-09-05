/* =========================================================
   KisanLink LANGUAGE SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const languageSelect = document.getElementById("languageSelect");

    if (!languageSelect) {
        console.error("languageSelect not found");
        return;
    }


    /* =====================================================
       TRANSLATIONS
    ===================================================== */

    const translations = {

        /* =================================================
           ENGLISH
        ================================================= */

        en: {

            navHome: "Home",
            navAbout: "About",
            navHow: "How It Works",
            navStart: "Get Started",
            login: "Login",

            heroTag: "Smart Agriculture Marketplace",

            heroText1: "Connecting",
            heroText2: "Farmers",
            heroText3: "Directly With",
            heroText4: "Consumers",

            heroDescription:
                "A simple and transparent platform where farmers can sell their agricultural products directly and consumers can find fresh produce from trusted local farmers.",

            getStarted: "Get Started",
            howWorks: "How It Works",

            stat1: "Direct",
            stat1Small: "Farmer Connection",

            stat2: "Local",
            stat2Small: "Nearby Products",

            stat3: "Trusted",
            stat3Small: "Transparent Platform",


            /* ABOUT */

            aboutSmall: "OUR PURPOSE",

            aboutTitle:
                "Making Agriculture More Connected",

            aboutDescription:
                "KisanLink helps remove unnecessary barriers between agricultural producers and the people who need their products.",

            badge:
                "Supporting Local Farming",

            about1Title:
                "Direct Connection",

            about1Text:
                "Farmers can showcase their products and connect directly with consumers without unnecessary intermediaries.",

            about2Title:
                "Better Opportunities",

            about2Text:
                "Farmers can manage product quantities, prices and availability from one place.",

            about3Title:
                "Location-Based Discovery",

            about3Text:
                "Consumers can discover agricultural products available from farmers in their area.",


            /* ROLE */

            chooseSmall:
                "GET STARTED",

            chooseTitle:
                "How Would You Like To Use KisanLink?",

            chooseDescription:
                "Choose your role to continue to the right platform.",

            farmerLabel:
                "FOR FARMERS",

            farmerTitle:
                "I'm a Farmer",

            farmerDescription:
                "Sell your agricultural products directly, manage your available quantity, set prices and connect with nearby consumers.",

            farmerPoint1:
                "Add your agricultural products",

            farmerPoint2:
                "Set quantity and price",

            farmerPoint3:
                "Manage consumer requests",

            farmerButton:
                "Continue as Farmer",


            consumerLabel:
                "FOR CONSUMERS",

            consumerTitle:
                "I'm a Consumer",

            consumerDescription:
                "Find agricultural products from nearby farmers, compare prices and request the products you need.",

            consumerPoint1:
                "Discover nearby products",

            consumerPoint2:
                "Compare available prices",

            consumerPoint3:
                "Request products directly",

            consumerButton:
                "Continue as Consumer",


            /* HOW IT WORKS */

            howSmall:
                "HOW IT WORKS",

            howTitle:
                "A Simple Process For Everyone",

            step1Title:
                "Create Your Account",

            step1Text:
                "Register as a farmer or consumer and create your profile.",

            step2Title:
                "List or Find Products",

            step2Text:
                "Farmers list products while consumers search for what they need.",

            step3Title:
                "Connect Directly",

            step3Text:
                "Consumers can send requests and farmers can respond to them.",

            step4Title:
                "Complete The Order",

            step4Text:
                "Coordinate delivery and complete the transaction directly.",


            /* CTA */

            ctaSmall:
                "BUILDING A BETTER AGRICULTURAL MARKET",

            ctaTitle:
                "Grow More. Connect Better.",

            ctaText:
                "Start using KisanLink today.",

            ctaButton:
                "Choose Your Role",


            /* FOOTER */

            footerText:
                "Connecting agriculture with technology for a more direct marketplace.",

            footerHome:
                "Home",

            footerAbout:
                "About",

            footerHow:
                "How It Works",

            footerStart:
                "Get Started",

            footerLogin:
                "Login",

            copyright:
                "© 2026 KisanLink. All rights reserved."

        },


        /* =================================================
           HINDI
        ================================================= */

        hi: {

            navHome: "होम",
            navAbout: "हमारे बारे में",
            navHow: "यह कैसे काम करता है",
            navStart: "शुरू करें",
            login: "लॉगिन",

            heroTag: "स्मार्ट कृषि मार्केटप्लेस",

            heroText1: "किसानों",
            heroText2: "को",
            heroText3: "सीधे",
            heroText4: "उपभोक्ताओं से जोड़ना",

            heroDescription:
                "एक सरल और पारदर्शी प्लेटफॉर्म जहाँ किसान अपने कृषि उत्पाद सीधे बेच सकते हैं और उपभोक्ता विश्वसनीय स्थानीय किसानों से ताज़ा उत्पाद प्राप्त कर सकते हैं।",

            getStarted: "शुरू करें",
            howWorks: "यह कैसे काम करता है",

            stat1: "सीधा",
            stat1Small: "किसान संपर्क",

            stat2: "स्थानीय",
            stat2Small: "नज़दीकी उत्पाद",

            stat3: "विश्वसनीय",
            stat3Small: "पारदर्शी प्लेटफॉर्म",


            aboutSmall: "हमारा उद्देश्य",

            aboutTitle:
                "कृषि को और अधिक जुड़ा हुआ बनाना",

            aboutDescription:
                "KisanLink कृषि उत्पादकों और उनके उत्पादों की आवश्यकता रखने वाले लोगों के बीच अनावश्यक बाधाओं को कम करने में मदद करता है।",

            badge:
                "स्थानीय खेती का समर्थन",

            about1Title:
                "सीधा संपर्क",

            about1Text:
                "किसान अपने उत्पाद दिखा सकते हैं और बिना अनावश्यक बिचौलियों के सीधे उपभोक्ताओं से जुड़ सकते हैं।",

            about2Title:
                "बेहतर अवसर",

            about2Text:
                "किसान एक ही स्थान से उत्पाद की मात्रा, कीमत और उपलब्धता का प्रबंधन कर सकते हैं।",

            about3Title:
                "स्थान आधारित खोज",

            about3Text:
                "उपभोक्ता अपने क्षेत्र के किसानों से उपलब्ध कृषि उत्पाद खोज सकते हैं।",


            chooseSmall:
                "शुरू करें",

            chooseTitle:
                "आप KisanLink का उपयोग कैसे करना चाहते हैं?",

            chooseDescription:
                "सही प्लेटफॉर्म पर जाने के लिए अपनी भूमिका चुनें।",

            farmerLabel:
                "किसानों के लिए",

            farmerTitle:
                "मैं किसान हूँ",

            farmerDescription:
                "अपने कृषि उत्पाद सीधे बेचें, उपलब्ध मात्रा प्रबंधित करें, कीमत तय करें और नज़दीकी उपभोक्ताओं से जुड़ें।",

            farmerPoint1:
                "अपने कृषि उत्पाद जोड़ें",

            farmerPoint2:
                "मात्रा और कीमत तय करें",

            farmerPoint3:
                "उपभोक्ता अनुरोध प्रबंधित करें",

            farmerButton:
                "किसान के रूप में जारी रखें",


            consumerLabel:
                "उपभोक्ताओं के लिए",

            consumerTitle:
                "मैं उपभोक्ता हूँ",

            consumerDescription:
                "नज़दीकी किसानों से कृषि उत्पाद खोजें, कीमतों की तुलना करें और अपनी जरूरत के उत्पादों का अनुरोध करें।",

            consumerPoint1:
                "नज़दीकी उत्पाद खोजें",

            consumerPoint2:
                "उपलब्ध कीमतों की तुलना करें",

            consumerPoint3:
                "सीधे उत्पादों का अनुरोध करें",

            consumerButton:
                "उपभोक्ता के रूप में जारी रखें",


            howSmall:
                "यह कैसे काम करता है",

            howTitle:
                "सभी के लिए सरल प्रक्रिया",

            step1Title:
                "अपना खाता बनाएं",

            step1Text:
                "किसान या उपभोक्ता के रूप में पंजीकरण करें और अपनी प्रोफ़ाइल बनाएं।",

            step2Title:
                "उत्पाद जोड़ें या खोजें",

            step2Text:
                "किसान उत्पाद सूचीबद्ध करते हैं और उपभोक्ता अपनी जरूरत के उत्पाद खोजते हैं।",

            step3Title:
                "सीधे जुड़ें",

            step3Text:
                "उपभोक्ता अनुरोध भेज सकते हैं और किसान उनका जवाब दे सकते हैं।",

            step4Title:
                "ऑर्डर पूरा करें",

            step4Text:
                "डिलीवरी की व्यवस्था करें और लेनदेन सीधे पूरा करें।",


            ctaSmall:
                "बेहतर कृषि बाजार का निर्माण",

            ctaTitle:
                "अधिक बढ़ें। बेहतर जुड़ें।",

            ctaText:
                "आज ही KisanLink का उपयोग शुरू करें।",

            ctaButton:
                "अपनी भूमिका चुनें",


            footerText:
                "अधिक सीधे कृषि बाजार के लिए कृषि और तकनीक को जोड़ना।",

            footerHome:
                "होम",

            footerAbout:
                "हमारे बारे में",

            footerHow:
                "यह कैसे काम करता है",

            footerStart:
                "शुरू करें",

            footerLogin:
                "लॉगिन",

            copyright:
                "© 2026 KisanLink. सर्वाधिकार सुरक्षित।"

        },


        /* =================================================
           MARATHI
        ================================================= */

        mr: {

            navHome: "मुख्यपृष्ठ",
            navAbout: "आमच्याबद्दल",
            navHow: "हे कसे कार्य करते",
            navStart: "सुरुवात करा",
            login: "लॉगिन",

            heroTag: "स्मार्ट कृषी मार्केटप्लेस",

            heroText1: "शेतकऱ्यांना",
            heroText2: "थेट",
            heroText3: "ग्राहकांशी",
            heroText4: "जोडणे",

            heroDescription:
                "एक सोपे आणि पारदर्शक व्यासपीठ जिथे शेतकरी आपली कृषी उत्पादने थेट विकू शकतात आणि ग्राहक विश्वासार्ह स्थानिक शेतकऱ्यांकडून ताजी उत्पादने शोधू शकतात.",

            getStarted: "सुरुवात करा",
            howWorks: "हे कसे कार्य करते",

            stat1: "थेट",
            stat1Small: "शेतकरी संपर्क",

            stat2: "स्थानिक",
            stat2Small: "जवळील उत्पादने",

            stat3: "विश्वासार्ह",
            stat3Small: "पारदर्शक व्यासपीठ",


            aboutSmall: "आमचा उद्देश",

            aboutTitle:
                "शेतीला अधिक जोडलेले बनवणे",

            aboutDescription:
                "KisanLink कृषी उत्पादक आणि त्यांच्या उत्पादनांची गरज असलेल्या लोकांमधील अनावश्यक अडथळे कमी करण्यास मदत करते.",

            badge:
                "स्थानिक शेतीला समर्थन",

            about1Title:
                "थेट संपर्क",

            about1Text:
                "शेतकरी आपली उत्पादने दाखवू शकतात आणि अनावश्यक मध्यस्थांशिवाय थेट ग्राहकांशी संपर्क साधू शकतात.",

            about2Title:
                "चांगल्या संधी",

            about2Text:
                "शेतकरी एका ठिकाणाहून उत्पादनाचे प्रमाण, किंमत आणि उपलब्धता व्यवस्थापित करू शकतात.",

            about3Title:
                "स्थान आधारित शोध",

            about3Text:
                "ग्राहक त्यांच्या परिसरातील शेतकऱ्यांकडून उपलब्ध कृषी उत्पादने शोधू शकतात.",


            chooseSmall:
                "सुरुवात करा",

            chooseTitle:
                "तुम्हाला KisanLink कसे वापरायचे आहे?",

            chooseDescription:
                "योग्य प्लॅटफॉर्मवर जाण्यासाठी तुमची भूमिका निवडा.",

            farmerLabel:
                "शेतकऱ्यांसाठी",

            farmerTitle:
                "मी शेतकरी आहे",

            farmerDescription:
                "तुमची कृषी उत्पादने थेट विक्री करा, उपलब्ध प्रमाण व्यवस्थापित करा, किंमत ठरवा आणि जवळच्या ग्राहकांशी संपर्क साधा.",

            farmerPoint1:
                "तुमची कृषी उत्पादने जोडा",

            farmerPoint2:
                "प्रमाण आणि किंमत ठरवा",

            farmerPoint3:
                "ग्राहकांच्या विनंत्या व्यवस्थापित करा",

            farmerButton:
                "शेतकरी म्हणून पुढे जा",


            consumerLabel:
                "ग्राहकांसाठी",

            consumerTitle:
                "मी ग्राहक आहे",

            consumerDescription:
                "जवळच्या शेतकऱ्यांकडून कृषी उत्पादने शोधा, किंमतींची तुलना करा आणि आवश्यक उत्पादनांची विनंती करा.",

            consumerPoint1:
                "जवळील उत्पादने शोधा",

            consumerPoint2:
                "उपलब्ध किंमतींची तुलना करा",

            consumerPoint3:
                "थेट उत्पादनांची विनंती करा",

            consumerButton:
                "ग्राहक म्हणून पुढे जा",


            howSmall:
                "हे कसे कार्य करते",

            howTitle:
                "सर्वांसाठी सोपी प्रक्रिया",

            step1Title:
                "तुमचे खाते तयार करा",

            step1Text:
                "शेतकरी किंवा ग्राहक म्हणून नोंदणी करा आणि तुमचे प्रोफाइल तयार करा.",

            step2Title:
                "उत्पादने जोडा किंवा शोधा",

            step2Text:
                "शेतकरी उत्पादने सूचीबद्ध करतात आणि ग्राहक आवश्यक उत्पादने शोधतात.",

            step3Title:
                "थेट संपर्क साधा",

            step3Text:
                "ग्राहक विनंत्या पाठवू शकतात आणि शेतकरी त्यांना प्रतिसाद देऊ शकतात.",

            step4Title:
                "ऑर्डर पूर्ण करा",

            step4Text:
                "डिलिव्हरीची व्यवस्था करा आणि व्यवहार थेट पूर्ण करा.",


            ctaSmall:
                "चांगल्या कृषी बाजारपेठेची निर्मिती",

            ctaTitle:
                "अधिक वाढा. चांगले जोडा.",

            ctaText:
                "आजच KisanLink वापरण्यास सुरुवात करा.",

            ctaButton:
                "तुमची भूमिका निवडा",


            footerText:
                "अधिक थेट बाजारपेठेसाठी शेती आणि तंत्रज्ञानाला जोडणे.",

            footerHome:
                "मुख्यपृष्ठ",

            footerAbout:
                "आमच्याबद्दल",

            footerHow:
                "हे कसे कार्य करते",

            footerStart:
                "सुरुवात करा",

            footerLogin:
                "लॉगिन",

            copyright:
                "© 2026 KisanLink. सर्व हक्क राखीव."

        }

    };


    /* =====================================================
       HELPER FUNCTION
    ===================================================== */

    function setText(selector, text) {

        const element = document.querySelector(selector);

        if (element) {
            element.textContent = text;
        }

    }


    /* =====================================================
       TRANSLATE PAGE
    ===================================================== */

    function translatePage(language) {

        const t = translations[language];

        if (!t) {
            console.log("Translation not available:", language);
            return;
        }


        /* ================= NAVBAR ================= */

        const navLinks = document.querySelectorAll(".nav-links a");

        if (navLinks.length >= 4) {

            navLinks[0].textContent = t.navHome;
            navLinks[1].textContent = t.navAbout;
            navLinks[2].textContent = t.navHow;
            navLinks[3].textContent = t.navStart;

        }


        setText(".login-btn", t.login);


        /* ================= HERO ================= */

        setText(".hero-tag", t.heroTag);


        const heroHeading =
            document.querySelector(".hero h1");

        if (heroHeading) {

            heroHeading.innerHTML = `
                ${t.heroText1}
                <span>${t.heroText2}</span>
                ${t.heroText3}
                <span>${t.heroText4}</span>
            `;

        }


        setText(".hero-content > p", t.heroDescription);


        const heroButtons =
            document.querySelectorAll(".hero-buttons a");

        if (heroButtons.length >= 2) {

            heroButtons[0].childNodes[0].textContent =
                t.getStarted + " ";

            heroButtons[1].childNodes[0].textContent =
                " " + t.howWorks + " ";

        }


        /* ================= STATS ================= */

        const stats =
            document.querySelectorAll(".hero-stats .stat");

        if (stats.length >= 3) {

            stats[0].querySelector("strong").textContent =
                t.stat1;

            stats[0].querySelector("small").textContent =
                t.stat1Small;


            stats[1].querySelector("strong").textContent =
                t.stat2;

            stats[1].querySelector("small").textContent =
                t.stat2Small;


            stats[2].querySelector("strong").textContent =
                t.stat3;

            stats[2].querySelector("small").textContent =
                t.stat3Small;

        }


        /* ================= ABOUT ================= */

        const aboutHeading =
            document.querySelector(".about .section-heading");

        if (aboutHeading) {

            aboutHeading.querySelector("span").textContent =
                t.aboutSmall;

            aboutHeading.querySelector("h2").textContent =
                t.aboutTitle;

            aboutHeading.querySelector("p").textContent =
                t.aboutDescription;

        }


        setText(".image-badge", t.badge);


        const aboutItems =
            document.querySelectorAll(".about-item");

        if (aboutItems.length >= 3) {

            aboutItems[0].querySelector("h3").textContent =
                t.about1Title;

            aboutItems[0].querySelector("p").textContent =
                t.about1Text;


            aboutItems[1].querySelector("h3").textContent =
                t.about2Title;

            aboutItems[1].querySelector("p").textContent =
                t.about2Text;


            aboutItems[2].querySelector("h3").textContent =
                t.about3Title;

            aboutItems[2].querySelector("p").textContent =
                t.about3Text;

        }


        /* ================= CHOOSE ROLE ================= */

        const chooseHeading =
            document.querySelector(".choose .section-heading");

        if (chooseHeading) {

            chooseHeading.querySelector("span").textContent =
                t.chooseSmall;

            chooseHeading.querySelector("h2").textContent =
                t.chooseTitle;

            chooseHeading.querySelector("p").textContent =
                t.chooseDescription;

        }


        /* ================= FARMER ================= */

        const farmerCard =
            document.querySelector(".farmer-card");

        if (farmerCard) {

            farmerCard.querySelector(".role-label").textContent =
                t.farmerLabel;

            farmerCard.querySelector("h3").textContent =
                t.farmerTitle;

            farmerCard.querySelector(".role-content p").textContent =
                t.farmerDescription;


            const farmerPoints =
                farmerCard.querySelectorAll("li");

            if (farmerPoints.length >= 3) {

                farmerPoints[0].childNodes[1].textContent =
                    " " + t.farmerPoint1;

                farmerPoints[1].childNodes[1].textContent =
                    " " + t.farmerPoint2;

                farmerPoints[2].childNodes[1].textContent =
                    " " + t.farmerPoint3;

            }


            const farmerButton =
                farmerCard.querySelector(".role-btn");

            if (farmerButton) {

                farmerButton.childNodes[0].textContent =
                    t.farmerButton + " ";

            }

        }


        /* ================= CONSUMER ================= */

        const consumerCard =
            document.querySelector(".consumer-card");

        if (consumerCard) {

            consumerCard.querySelector(".role-label").textContent =
                t.consumerLabel;

            consumerCard.querySelector("h3").textContent =
                t.consumerTitle;

            consumerCard.querySelector(".role-content p").textContent =
                t.consumerDescription;


            const consumerPoints =
                consumerCard.querySelectorAll("li");

            if (consumerPoints.length >= 3) {

                consumerPoints[0].childNodes[1].textContent =
                    " " + t.consumerPoint1;

                consumerPoints[1].childNodes[1].textContent =
                    " " + t.consumerPoint2;

                consumerPoints[2].childNodes[1].textContent =
                    " " + t.consumerPoint3;

            }


            const consumerButton =
                consumerCard.querySelector(".role-btn");

            if (consumerButton) {

                consumerButton.childNodes[0].textContent =
                    t.consumerButton + " ";

            }

        }


        /* ================= HOW IT WORKS ================= */

        const howHeading =
            document.querySelector(".how-it-works .section-heading");

        if (howHeading) {

            howHeading.querySelector("span").textContent =
                t.howSmall;

            howHeading.querySelector("h2").textContent =
                t.howTitle;

        }


        const steps =
            document.querySelectorAll(".step");

        if (steps.length >= 4) {

            steps[0].querySelector("h3").textContent =
                t.step1Title;

            steps[0].querySelector("p").textContent =
                t.step1Text;


            steps[1].querySelector("h3").textContent =
                t.step2Title;

            steps[1].querySelector("p").textContent =
                t.step2Text;


            steps[2].querySelector("h3").textContent =
                t.step3Title;

            steps[2].querySelector("p").textContent =
                t.step3Text;


            steps[3].querySelector("h3").textContent =
                t.step4Title;

            steps[3].querySelector("p").textContent =
                t.step4Text;

        }


        /* ================= CTA ================= */

        const cta =
            document.querySelector(".final-cta");

        if (cta) {

            cta.querySelector("span").textContent =
                t.ctaSmall;

            cta.querySelector("h2").textContent =
                t.ctaTitle;

            cta.querySelector("p").textContent =
                t.ctaText;

            cta.querySelector("a").childNodes[0].textContent =
                t.ctaButton + " ";

        }


        /* ================= FOOTER ================= */

        const footer =
            document.querySelector("footer");

        if (footer) {

            footer.querySelector(".footer-brand p").textContent =
                t.footerText;


            const footerLinks =
                footer.querySelectorAll(".footer-links a");

            if (footerLinks.length >= 5) {

                footerLinks[0].textContent =
                    t.footerHome;

                footerLinks[1].textContent =
                    t.footerAbout;

                footerLinks[2].textContent =
                    t.footerHow;

                footerLinks[3].textContent =
                    t.footerStart;

                footerLinks[4].textContent =
                    t.footerLogin;

            }


            footer.querySelector(".copyright").textContent =
                t.copyright;

        }


        /* ================= SAVE LANGUAGE ================= */

        localStorage.setItem(
            "selectedLanguage",
            language
        );


        /* Change HTML language */

        document.documentElement.lang =
            language;

    }


    /* =====================================================
       WHEN USER CHANGES LANGUAGE
    ===================================================== */

    languageSelect.addEventListener(
        "change",
        function () {

            translatePage(this.value);

        }
    );


    /* =====================================================
       LOAD SAVED LANGUAGE
    ===================================================== */

    const savedLanguage =
        localStorage.getItem("selectedLanguage") || "en";


    languageSelect.value =
        savedLanguage;


    translatePage(savedLanguage);

});



// document.getElementById("farmerForm").addEventListener("submit", function(event) {
//     event.preventDefault();

//     if (this.checkValidity()) {
//         window.location.href = "F_dash.html";
//     } else {
//         this.reportValidity();
//     }
// });

