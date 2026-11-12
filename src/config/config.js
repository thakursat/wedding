// Text fields written as { en, hi } are shown in the guest's chosen language.
const config = {
  data: {
    // Main invitation title that appears on the page
    title: {
      en: "Rishabh & Khushi's Wedding",
      hi: "ऋषभ और ख़ुशी का शुभ विवाह",
    },
    // Opening message/description of the invitation
    description: {
      en: "With the blessings of Lord Ganesha, we warmly invite you and your family to the wedding celebrations of Rishabh and Khushi in Lucknow.",
      hi: "श्री गणेश जी के आशीर्वाद से, ऋषभ और ख़ुशी के शुभ विवाह के मांगलिक कार्यक्रमों में आप सपरिवार सादर आमंत्रित हैं।",
    },
    // Groom's name
    groomName: { en: "Rishabh", hi: "ऋषभ" },
    // Bride's name
    brideName: { en: "Khushi", hi: "ख़ुशी" },
    // Opening invocation and doha printed at the top of the card
    invocation: {
      en: "Shri Ganeshaya Namah",
      hi: "॥ श्री गणेशाय नमः ॥",
    },
    blessing: {
      en: "O Lord Ganpati, remover of obstacles and bringer of good fortune — the first invitation is yours; please bless this occasion.",
      hi: "विघ्न हरण मंगल करण, श्री गणपति महाराज। प्रथम निमंत्रण आपको, पूरण कीजै काज॥",
    },
    // Wedding date (format: YYYY-MM-DD)
    date: "2026-12-04",
    // Google Maps link for location (short clickable link)
    maps_url: "https://share.google/q2tDbn1x124EZKmIF",
    // Google Maps embed code to display map on website
    // How to get: open Google Maps → select location → Share → Embed → copy link
    maps_embed:
      "https://www.google.com/maps?q=Greenfields+Gardens,+Rajajipuram,+Lucknow&output=embed",
    // Venue/building name
    location: { en: "Green Field Lawn", hi: "ग्रीन फील्ड लॉन" },
    // Full address of the wedding venue
    address: {
      en: "Near Bala Ji Mandir, Eveready Chauraha, Rajajipuram, Lucknow",
      hi: "निकट बाला जी मन्दिर, एवरेडी चौराहा, राजाजीपुरम, लखनऊ",
    },
    // Image that appears when link is shared on social media
    ogImage: "/images/couple.jpeg",
    // Icon that appears in browser tab
    favicon: "/images/favicon.ico",
    // List of event agenda/schedule.
    // startTime/endTime (e.g. "11:00") and location are optional; events
    // without times are added to calendars as all-day events.
    agenda: [
      {
        slug: "haldi",
        title: { en: "Haldi Ceremony", hi: "हल्दी" },
        subheading: {
          en: "Turmeric blessings from family and loved ones",
          hi: "परिवार और अपनों का हल्दी आशीर्वाद",
        },
        date: "2026-12-02",
        timeZone: "Asia/Kolkata",
        verse: {
          en: "A new bond of relationships, a new dawn of joy — may this new journey of our groom be blessed.",
          hi: "रिश्तों की नई डोर, ख़ुशियों का नया सवेरा, मंगल मय हो हमारे दूल्हे राजा का यह नया फेरा॥",
        },
        description: {
          en: "Join us for the haldi ceremony as we begin the wedding festivities.",
          hi: "विवाह उत्सव की शुरुआत हल्दी की रस्म के साथ।",
        },
        themeTag: { en: "Turmeric & marigold", hi: "हल्दी और गेंदा" },
        detail: { heroImage: "/images/haldi.jpg" },
      },
      {
        slug: "wedding",
        title: { en: "Wedding Ceremony", hi: "शुभ विवाह" },
        subheading: {
          en: "Sacred pheras, varmala, and vows",
          hi: "वरमाला, फेरे और सात वचन",
        },
        date: "2026-12-04",
        timeZone: "Asia/Kolkata",
        location: { en: "Green Field Lawn", hi: "ग्रीन फील्ड लॉन" },
        verse: {
          en: "Lord Shiva smiled and whispered to Parvati — we shall all attend the wedding of Rishabh and Khushi.",
          hi: "शिव जी ने मुस्कुरा कर कहा पार्वती जी के कान में, हम सभी सम्मिलित होंगे ऋषभ और ख़ुशी के विवाह में॥",
        },
        description: {
          en: "Bless Rishabh and Khushi as they take their wedding vows.",
          hi: "ऋषभ और ख़ुशी के शुभ विवाह में पधारकर वर-वधू को आशीर्वाद दें।",
        },
        themeTag: { en: "Sacred fire & blessings", hi: "अग्नि और आशीर्वाद" },
        detail: { heroImage: "/images/wedding.jpg" },
      },
      {
        slug: "vadhu-aagman",
        title: { en: "Vadhu Aagman", hi: "वधू आगमन" },
        subheading: {
          en: "Welcoming the bride to her new home",
          hi: "नए घर में वधू का स्वागत",
        },
        date: "2026-12-05",
        timeZone: "Asia/Kolkata",
        verse: {
          en: "When her feet touched our courtyard, the whole world bloomed — the bride arrived like Lakshmi, bringing a shower of joy.",
          hi: "चरण पड़े जब घर आँगन में, खिल उठे संसार, लक्ष्मी बनकर वधू पधारी, ख़ुशियों की बौछार॥",
        },
        description: {
          en: "Join us in welcoming Khushi to her new home.",
          hi: "ख़ुशी के गृह प्रवेश पर स्वागत में शामिल हों।",
        },
        themeTag: { en: "A joyful welcome", hi: "हर्षित स्वागत" },
        detail: { heroImage: "/images/vadhu-aagman.jpg" },
      },
    ],

    // Background music settings
    audio: {
      // Music file (choose one or replace with your own file)
      src: "/audio/song.mp3", // or /audio/nature-sound.mp3
      // Music title to display
      title: "Fulfilling Humming", // or Nature Sound
      // Whether music plays automatically when website opens
      autoplay: true,
      // Whether music repeats continuously
      loop: true,
      // Duration for showing the playback toast (ms)
      toastDuration: 3000
    }
  }
};

export default config;
