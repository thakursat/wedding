const config = {
  data: {
    // Main invitation title that appears on the page
    title: "Shanu and Ankit's Wedding",
    // Opening message/description of the invitation
    description:
      "Join us for a multi-day Indian wedding filled with colour, music, and heartfelt rituals as we celebrate the union of Shanu and Ankit.",
    // Groom's name
    groomName: "Ankit",
    // Bride's name
    brideName: "Shanu",
    // Groom's parents names
    parentGroom: "Groom's Father & Groom's Mother",
    // Bride's parents names
    parentBride: "Bride's Father & Bride's Mother",
    // Wedding date (format: YYYY-MM-DD)
    date: "2024-12-25",
    // Google Maps link for location (short clickable link)
    maps_url: "https://maps.app.goo.gl/3agAD1nXwfr1t7R28",
    // Google Maps embed code to display map on website
    // How to get: open Google Maps → select location → Share → Embed → copy link
    maps_embed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4317.8299229582!2d75.69805537615741!3d26.902222176653318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db4ab8c4abcdf%3A0x5d44d04dcfb87ec0!2sJaipur%20Bagh!5e1!3m2!1sen!2sin!4v1761332070033!5m2!1sen!2sin",
    // Secondary reception venue information
    reception_maps_url: "https://maps.app.goo.gl/qJ9YMni1WCDpXuen9",
    reception_maps_embed:
      "https://www.google.com/maps?q=Moon+and+Mars+Chakheri&output=embed",
    // Event time (free format, example: "1:00 PM - 3:00 PM")
    time: "1:00 PM",
    // Venue/building name
    location: "Jaipur Bagh, Jaipur",
    // Full address of the wedding venue
    address: "Jaipur Bagh, Sirsi Road, Jaipur, Rajasthan, India",
    receptionLocation: "Moon and Mars, Chakheri",
    receptionAddress: "Moon and Mars, Chakheri, Uttar Pradesh, India",
    // Image that appears when link is shared on social media
    ogImage: "/images/og-image.jpg",
    // Icon that appears in browser tab
    favicon: "/images/favicon.ico",
    // List of event agenda/schedule
    agenda: [
        {
          slug: "haldi",
          title: "Haldi & Welcome Lunch",
          subheading: "Turmeric blessings, floral rituals, and folk songs",
          date: "2024-12-24",
          startTime: "11:00 AM",
          endTime: "02:00 PM",
          timeZone: "Asia/Kolkata",
          location: "Pool Side, Jaipur Bagh",
          address: "Jaipur Bagh, Sirsi Road, Jaipur",
          description:
            "Celebrate the beginning of our festivities with turmeric blessings, playful rituals, and soulful folk tunes amid marigold garlands.",
          themeTag: "Sunlit turmeric & marigold",
          detail: {
            heroImage: "/images/haldi.jpg",
            headline: "An afternoon of colour, artistry, and family blessings",
            description:
              "Our haldi afternoon brings loved ones together for turmeric blessings, fragrant floral showers, and spirited folk music. Sip on refreshing aam panna, enjoy live dhol beats, and join the laughter as elders share cherished blessings.",
            highlights: [
              "Turmeric blessing bowls for close family",
              "Floral shower and tika ceremony",
              "Folk dhol and ghoomar performances",
              "Rajasthani chaat and mithai counters",
            ],
            schedule: [
              { time: "11:00 AM", activity: "Welcome thali & floral tika" },
              { time: "11:30 AM", activity: "Haldi swirls & family blessings" },
              { time: "12:00 PM", activity: "Floral rituals & blessings" },
              { time: "12:45 PM", activity: "Luncheon & sweet bites" },
            ],
            notes: [
              "Wear something you don’t mind getting turmeric on—bright yellows encouraged!",
              "Dedicated children's corner with storytelling and craft kits.",
              "Valet parking available at the main courtyard gate.",
            ],
            dressCode: "Wear shades of turmeric yellow, citrus orange, and festive ivory.",
            keepsake: "Handcrafted haldi packets infused with marigold petals.",
          },
        },
        {
          slug: "sangeet",
          title: "Ring Ceremony & Sangeet",
          subheading: "Dance-offs, choreographed surprises, and live dhol",
          date: "2024-12-24",
          startTime: "05:00 PM",
          endTime: "08:00 PM",
          timeZone: "Asia/Kolkata",
          location: "Hall, Jaipur Bagh",
          address: "Jaipur Bagh, Sirsi Road, Jaipur",
          description:
            "Twilight melodies, energetic dance performances, and sparkling cocktails set the tone for a night of togetherness.",
          themeTag: "Twilight rhythms & sparkle",
          detail: {
            heroImage: "/images/sangeet.jpg",
            headline: "Music, dance, and stories under Jaipur's winter sky",
            description:
              "Our families have rehearsed all year to bring you a sangeet that blends Bollywood medleys with folk rhythms. From the parents' retro medley to the cousins' dandiya circle, every segment is a love note in motion. Expect handcrafted cocktails, live dhol transitions, and a finale led by the couple.",
            highlights: [
              "Grand couple entry with phoolon ki chadar",
              "Live dhol-tasha & DJ fusion set",
              "Mixology bar featuring regional infusions",
              "Open dance floor with glow prop station",
            ],
            schedule: [
              { time: "07:00 PM", activity: "Guest arrivals & welcome mocktails" },
              { time: "08:00 PM", activity: "Family performances & dance-offs" },
              { time: "09:30 PM", activity: "Couple duet & cake cutting" },
              { time: "10:00 PM", activity: "DJ + dhol after-party" },
            ],
            notes: [
              "Bring comfortable footwear to join the garba and dandiya rounds.",
              "Silent disco headphones available post 10:00 PM.",
              "Coat check and shawls provided for the evening breeze.",
            ],
            dressCode: "Glitz with a touch of tradition—think mirror work, sequins, and jewel tones.",
            keepsake: "Mini dandiya sticks engraved with our initials.",
          },
        },
        {
          slug: "wedding",
          title: "Wedding Ceremony",
          subheading: "Sacred pheras, varmala, and vows",
          date: "2024-12-25",
          startTime: "01:00 PM",
          endTime: "04:00 PM",
          timeZone: "Asia/Kolkata",
          location: "Lawn, Jaipur Bagh",
          address: "Jaipur Bagh, Sirsi Road, Jaipur",
          description:
            "Gather around the sacred fire as we exchange garlands, circle the agni, and promise a lifetime of togetherness.",
          themeTag: "Sacred fire & sandalwood",
          detail: {
            heroImage: "/images/wedding.jpg",
            headline: "Seven vows, ancestral blessings, and a shower of petals",
            description:
              "Our wedding mandap is draped in jasmine and marigold strands, with the sacred banyan tree bearing witness. From the varmala exchange to the saat pheras, every ritual is steeped in family tradition. Priests will guide us through each vow while a flute ensemble plays serene ragas.",
            highlights: [
              "Varmala under a canopy of flowers",
              "Sacred fire rituals with live Sanskrit chants",
              "Floral petal shower during the final phera",
              "Traditional shehnai and flute ensemble",
            ],
            schedule: [
              { time: "12:30 PM", activity: "Sehra bandi & groom's arrival" },
              { time: "01:00 PM", activity: "Varmala & jaimala exchange" },
              { time: "01:30 PM", activity: "Saat pheras & kanyadaan" },
              { time: "02:30 PM", activity: "Sindoor, mangalsutra, and blessings" },
              { time: "03:00 PM", activity: "Traditional lunch service" },
            ],
            notes: [
              "Please arrive 20 minutes early to participate in the varmala shower.",
              "Phones on silent during the pheras; onsite team will share photos.",
              "Vegetarian lunch with regional live counters to follow.",
            ],
            dressCode: "Heritage silhouettes in saffron, ivory, or deep red.",
            keepsake: "Blessing cards to pen wishes for the couple.",
          },
        },
        {
          slug: "reception",
          title: "Reception Gala",
          subheading: "Elegant sit-down dinner and toasts",
          date: "2024-12-30",
          startTime: "01:00 PM",
          endTime: "06:00 PM",
          timeZone: "Asia/Kolkata",
          location: "Moon and Mars, Rooma",
          address: "Moon and Mars, Chakheri, Uttar Pradesh, India",
          description:
            "An evening of heartfelt speeches, curated dining, and our first dance as a married couple.",
          themeTag: "Royal velvet & champagne",
          detail: {
            heroImage: "/images/reception.jpg",
            headline: "Raise a toast beneath chandeliers and starlit drapes",
            description:
              "The reception gala brings everyone together for refined conversations, soulful jazz-fusion, and a lavish Rajasthani-meets-contemporary menu. Join us for our first dance, a cascade of sparklers, and a dessert bar inspired by royal kitchens.",
            highlights: [
              "Couple first dance with cold pyros",
              "Curated five-course tasting menu",
              "Memory lane photo installation",
              "Sparkler send-off for the couple",
            ],
            schedule: [
              { time: "07:00 PM", activity: "Welcome reception & live saxophone" },
              { time: "08:00 PM", activity: "Toasts from family & friends" },
              { time: "08:45 PM", activity: "First dance & couple cake cutting" },
              { time: "09:15 PM", activity: "Dinner service & dessert bar" },
              { time: "10:15 PM", activity: "Sparkler exit & wishes" },
            ],
            notes: [
              "Formal seating; please RSVP for dietary preferences.",
              "Complimentary valet and chauffeur service available.",
              "Photo booth with instant prints near the ballroom entry.",
            ],
            dressCode: "Black-tie optional with Indian regal accents.",
            keepsake: "Custom mithai boxes curated by the couple.",
          },
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