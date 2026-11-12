// EventCard.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  CalendarPlus,
  X,
  Chrome,
  Apple,
  Calendar as CalendarIcon,
  Flower2,
} from "lucide-react";
import translations from "@/config/translations";
import { formatEventDate } from "@/lib/formatEventDate";
import { useLanguage } from "@/lib/language";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-[90%] max-w-sm"
          >
            <div className="bg-white transform -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 shadow-2xl border border-gray-100">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CalendarButton = ({ icon: Icon, label, onClick, className = "" }) => (
  <motion.button
    onClick={onClick}
    className={`flex items-center space-x-3 w-full p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors ${className}`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Icon className="w-5 h-5" />
    <span className="text-gray-700 font-medium">{label}</span>
  </motion.button>
);

/**
 * SingleEventCard component displays an event card with options to add the event
 * to various calendars (Google Calendar, Apple Calendar, and Outlook Calendar).
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.eventData - Object containing event data.
 * @param {string} props.eventData.date - The date of the event (expected format: YYYY-MM-DD).
 * @param {string} [props.eventData.startTime] - The start time of the event (expected format: HH:mm). Omit for an all-day event.
 * @param {string} [props.eventData.endTime] - The end time of the event (expected format: HH:mm). Omit for an all-day event.
 * @param {{en: string, hi: string}} props.eventData.title - The title of the event.
 * @param {{en: string, hi: string}} props.eventData.description - A description of the event.
 * @param {{en: string, hi: string}} [props.eventData.location] - The location where the event takes place.
 * @param {{en: string, hi: string}} [props.eventData.verse] - The invitation couplet shown on the card.
 * @param {string} props.eventData.timeZone - The time zone of the event.
 *
 * @example
 * const eventData = {
 *   date: '2023-10-15',
 *   startTime: '14:00',
 *   endTime: '16:00',
 *   title: { en: 'Wedding Ceremony', hi: 'शुभ विवाह' },
 *   description: { en: 'Join us to celebrate.', hi: 'पधारकर आशीर्वाद दें।' },
 *   location: { en: 'Sunset Gardens', hi: 'सनसेट गार्डन्स' },
 *   timeZone: 'Asia/Kolkata'
 * };
 *
 * <SingleEventCard eventData={eventData} />
 *
 * @returns {JSX.Element} A JSX element representing the event card.
 */
const SingleEventCard = ({ eventData }) => {
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const { language, t } = useLanguage();
  const title = t(eventData.title);
  const description = t(eventData.description);
  const location = t(eventData.location);
  const isAllDay = !eventData.startTime || !eventData.endTime;

  // All-day events use the date only; calendars expect the end date to be the following day.
  const allDayRange = () => {
    const start = eventData.date.replace(/-/g, "");
    const next = new Date(`${eventData.date}T00:00:00Z`);
    next.setUTCDate(next.getUTCDate() + 1);
    const end = next.toISOString().slice(0, 10).replace(/-/g, "");
    return { start, end };
  };

  const googleCalendarLink = () => {
    let dates;
    if (isAllDay) {
      const { start, end } = allDayRange();
      dates = `${start}/${end}`;
    } else {
      const startDate = new Date(`${eventData.date}T${eventData.startTime}:00`);
      const endDate = new Date(`${eventData.date}T${eventData.endTime}:00`);

      const formatDate = (date) => {
        return date.toISOString().replace(/-|:|\.\d+/g, "");
      };
      dates = `${formatDate(startDate)}/${formatDate(endDate)}`;
    }

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dates}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&ctz=${eventData.timeZone}`;
  };

  const generateICSContent = () => {
    let timing;
    if (isAllDay) {
      const { start, end } = allDayRange();
      timing = `DTSTART;VALUE=DATE:${start}
DTEND;VALUE=DATE:${end}`;
    } else {
      const startDate = new Date(`${eventData.date}T${eventData.startTime}:00`);
      const endDate = new Date(`${eventData.date}T${eventData.endTime}:00`);

      const formatICSDate = (date) => {
        return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
      };
      timing = `DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}`;
    }

    return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${window.location.href}
${timing}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`;
  };

  const downloadICSFile = () => {
    const icsContent = generateICSContent();
    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${eventData.slug}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const heroImage = eventData?.detail?.heroImage;

  return (
    <div className="relative">
      <motion.div
        className="bg-white rounded-2xl shadow-sm border border-rose-100/80 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {heroImage && (
          <div className="h-48 w-full overflow-hidden">
            <img
              src={heroImage}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="space-y-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.3em] text-rose-400">
                {t(eventData.themeTag)}
              </p>
              <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
              {eventData.subheading && (
                <p className="text-sm text-gray-500">
                  {t(eventData.subheading)}
                </p>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-rose-500 transition-colors hover:text-rose-600"
              onClick={() => setShowCalendarModal(true)}
              aria-label={t(translations.events.addToCalendar)}
            >
              <CalendarPlus className="w-5 h-5" />
            </motion.button>
          </div>
          {eventData.verse && (
            <p className="whitespace-pre-line rounded-xl bg-amber-50/70 px-4 py-3 text-center text-sm italic leading-relaxed text-gray-700">
              {t(eventData.verse)}
            </p>
          )}
          <div className="space-y-3 text-gray-600">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-rose-500" />
              <span>{formatEventDate(eventData.date, "full", language)}</span>
            </div>
            {!isAllDay && (
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-rose-500" />
                <span>
                  {eventData.startTime} - {eventData.endTime}
                </span>
              </div>
            )}
            {location && (
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-rose-500" />
                <span>{location}</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between border-t border-rose-100 pt-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600">
              <Flower2 className="h-3.5 w-3.5" />
              {t(eventData.themeTag)}
            </span>
          </div>
        </div>
      </motion.div>

      <Modal
        isOpen={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
      >
        <div className="space-y-6 ">
          <div className="flex justify-between  items-center">
            <h3 className="text-xl font-semibold text-gray-800">
              {t(translations.events.addToCalendar)}
            </h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowCalendarModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="space-y-3">
            <CalendarButton
              icon={(props) => (
                <Chrome {...props} className="w-5 h-5 text-rose-500" />
              )}
              label="Google Calendar"
              onClick={() => window.open(googleCalendarLink(), "_blank")}
            />

            <CalendarButton
              icon={(props) => (
                <Apple {...props} className="w-5 h-5 text-gray-900" />
              )}
              label="Apple Calendar"
              onClick={downloadICSFile}
            />

            <CalendarButton
              icon={(props) => (
                <CalendarIcon {...props} className="w-5 h-5 text-blue-600" />
              )}
              label="Outlook Calendar"
              onClick={downloadICSFile}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Main EventCards component that handles multiple events
const EventCards = ({ events }) => {
  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <SingleEventCard key={event.slug ?? index} eventData={event} />
      ))}
    </div>
  );
};

export default EventCards;
