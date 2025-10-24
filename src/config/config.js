const config = {
  data: {
    // Main invitation title that appears on the page
    title: "Shanu and Ankit's Wedding",
    // Opening message/description of the invitation
    description:
      "We are getting married and invite you to celebrate this special moment with us.",
    // Groom's name
    groomName: "Ankit",
    // Bride's name
    brideName: "Shanu",
    // Groom's parents names
    parentGroom: "Groom's Father & Groom's Mother",
    // Bride's parents names
    parentBride: "Bride's Father & Bride's Mother",
    // Wedding date (format: YYYY-MM-DD)
    date: "2025-12-25",
    // Google Maps link for location (short clickable link)
    maps_url: "https://goo.gl/maps/abcdef",
    // Google Maps embed code to display map on website
    // How to get: open Google Maps → select location → Share → Embed → copy link
    maps_embed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4317.8299229582!2d75.69805537615741!3d26.902222176653318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db4ab8c4abcdf%3A0x5d44d04dcfb87ec0!2sJaipur%20Bagh!5e1!3m2!1sen!2sin!4v1761332070033!5m2!1sen!2sin",
    // Event time (free format, example: "10:00 - 12:00 WIB")
    time: "1 PM",
    // Venue/building name
    location: "Jaipur Bagh, Jaipur",
    // Full address of the wedding venue
    address: "Jend. Sudirman St. No.1, Jakarta, Indonesia",
    // Image that appears when link is shared on social media
    ogImage: "/images/og-image.jpg",
    // Icon that appears in browser tab
    favicon: "/images/favicon.ico",
    // List of event agenda/schedule
    agenda: [
      {
        // First event name
        title: "Marriage Ceremony",
        // Event date (format: YYYY-MM-DD)
        date: "2024-12-24",
        // Start time (format: HH:MM)
        startTime: "16:16",
        // End time (format: HH:MM)
        endTime: "17:30",
        // Event venue
        location: "Grand Ballroom, Hotel Majesty",
        // Full address
        address: "Jl. Jend. Sudirman No.1, Jakarta",
      },
      {
        // Second event name
        title: "Wedding Reception",
        date: "2024-12-24",
        startTime: "16:16",
        endTime: "17:30",
        location: "Grand Ballroom, Hotel Majesty",
        address: "Jl. Jend. Sudirman No.1, Jakarta",
      }
      // You can add more agenda items with the same format
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
      loop: true
    },

    // List of bank accounts for digital envelope/gifts
    banks: [
      {
        // Bank name
        bank: "Bank Central Asia",
        // Account number
        accountNumber: "1234567890",
        // Account holder name (all uppercase)
        accountName: "FULAN",
      },
      {
        bank: "Bank Mandiri",
        accountNumber: "0987654321",
        accountName: "FULANA",
      }
      // You can add more banks with the same format
    ]
  }
};

export default config;