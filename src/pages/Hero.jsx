import { Calendar, Clock, Heart, Sparkles, Flower2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Confetti from "react-confetti";
import config from "@/config/config";
import { formatEventDate } from "@/lib/formatEventDate";
import { safeBase64 } from "@/lib/base64";
import { useWindowSize } from "@/lib/useWindowSize";

const celebrationBadges = [
  "Mehndi & Haldi",
  "Sangeet & Dhol",
  "Sacred Pheras",
  "Reception Gala",
];

const sanitizeTimeValue = (timeValue) => {
  if (!timeValue) {
    return "09:00:00";
  }

  const trimmed = String(timeValue).trim().toUpperCase();
  const twelveHourMatch = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/);
  if (twelveHourMatch) {
    let hours = parseInt(twelveHourMatch[1], 10) % 12;
    if (twelveHourMatch[3] === "PM") {
      hours += 12;
    }
    return `${hours.toString().padStart(2, "0")}:${twelveHourMatch[2]}:00`;
  }

  const twentyFourHourMatch = trimmed.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (twentyFourHourMatch) {
    return `${twentyFourHourMatch[1].padStart(2, "0")}:${twentyFourHourMatch[2]}:${
      twentyFourHourMatch[3] ?? "00"
    }`;
  }

  return "09:00:00";
};

const buildDateWithTimezone = (year, month, day, timeSegment) => {
  const paddedMonth = String(month).padStart(2, "0");
  const paddedDay = String(day).padStart(2, "0");
  return new Date(`${year}-${paddedMonth}-${paddedDay}T${timeSegment}+05:30`);
};

const getNextDateTime = (dateString, timeString) => {
  if (!dateString) {
    return null;
  }

  const timeSegment = sanitizeTimeValue(timeString);
  const now = new Date();
  const [originalYear, originalMonth, originalDay] = dateString.split("-");

  if (!originalMonth || !originalDay) {
    return null;
  }

  const directDate = buildDateWithTimezone(
    originalYear,
    originalMonth,
    originalDay,
    timeSegment
  );

  if (!Number.isNaN(directDate.getTime()) && directDate > now) {
    return directDate;
  }

  const currentYearDate = buildDateWithTimezone(
    now.getFullYear(),
    originalMonth,
    originalDay,
    timeSegment
  );

  if (!Number.isNaN(currentYearDate.getTime()) && currentYearDate > now) {
    return currentYearDate;
  }

  const nextYearDate = buildDateWithTimezone(
    now.getFullYear() + 1,
    originalMonth,
    originalDay,
    timeSegment
  );

  return Number.isNaN(nextYearDate.getTime()) ? null : nextYearDate;
};

const determineCountdownTarget = () => {
  const weddingDateTime = getNextDateTime(config.data.date, config.data.time);
  if (!weddingDateTime) {
    return null;
  }

  const isoString = weddingDateTime.toISOString();
  return {
    iso: isoString,
    label: "Wedding Ceremony",
    formattedDate: formatEventDate(isoString, "full"),
  };
};

const FloatingPetals = () => {
  const petals = useMemo(() => Array.from({ length: 9 }), []);
  const colors = ["#fbbf24", "#fb7185", "#f97316", "#fcd34d"];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((_, i) => (
        <motion.span
          key={`petal-${i}`}
          initial={{
            opacity: 0,
            scale: 0,
            x:
              typeof window !== "undefined"
                ? Math.random() * window.innerWidth
                : 120,
            y:
              typeof window !== "undefined"
                ? window.innerHeight + Math.random() * 200
                : 600,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0.5],
            rotate: [0, i % 2 === 0 ? 45 : -45, 0],
            x:
              typeof window !== "undefined"
                ? Math.random() * window.innerWidth
                : 160,
            y: -120,
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut",
          }}
          className="absolute block h-3 w-6 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${colors[i % colors.length]}, rgba(255,255,255,0.4))`,
            boxShadow: "0 0 10px rgba(251, 113, 133, 0.35)",
          }}
        />
      ))}
    </div>
  );
};

const CountdownTimer = ({ targetDate, targetLabel, formattedDate }) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  function calculateTimeLeft(dateValue) {
    if (!dateValue) {
      return null;
    }

    const difference = +new Date(dateValue) - +new Date();
    if (difference <= 0) {
      return null;
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(targetDate));
    if (!targetDate) {
      return undefined;
    }

    const timer = setInterval(() => {
      setTimeLeft(() => {
        const next = calculateTimeLeft(targetDate);
        if (!next) {
          clearInterval(timer);
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!targetDate || !timeLeft) {
    return (
      <div className="mt-8 rounded-2xl border border-rose-100 bg-white/80 px-6 py-5 text-center shadow-lg">
        <p className="text-base font-semibold text-rose-600">
          The celebrations are underway!
        </p>
        <p className="mt-1 text-sm text-gray-600">
          We are welcoming guests in real time and soaking in every blessing.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      {(targetLabel || formattedDate) && (
        <div className="text-center">
          {targetLabel && (
            <p className="text-sm font-medium text-rose-600">
              Counting down to {targetLabel}
            </p>
          )}
          {formattedDate && (
            <p className="text-xs text-gray-500">{formattedDate}</p>
          )}
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Object.entries(timeLeft).map(([interval, value]) => (
          <motion.div
            key={interval}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center rounded-xl border border-rose-100 bg-white/80 p-3 backdrop-blur-sm"
          >
            <span className="text-xl font-bold text-rose-600 sm:text-2xl">
              {value}
            </span>
            <span className="text-xs capitalize text-gray-500">{interval}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function Hero() {
  const [guestName, setGuestName] = useState("");
  const [showCelebrationConfetti, setShowCelebrationConfetti] = useState(true);
  const { width, height } = useWindowSize();
  const countdownTarget = determineCountdownTarget();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get("guest");

    if (guestParam) {
      try {
        const decodedName = safeBase64.decode(guestParam);
        setGuestName(decodedName);
      } catch (error) {
        console.error("Error decoding guest name:", error);
        setGuestName("");
      }
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowCelebrationConfetti(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16 text-center sm:py-20"
    >
      {showCelebrationConfetti && width > 0 && height > 0 && (
        <Confetti
          width={width}
          height={height}
          gravity={0.2}
          numberOfPieces={180}
          recycle={false}
        />
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 space-y-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-xl sm:max-w-2xl"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2.75rem] bg-gradient-to-br from-rose-200/60 via-white/30 to-rose-50/40 blur-3xl" />
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/40 bg-white/60 shadow-[0_25px_60px_-20px_rgba(244,114,182,0.45)] backdrop-blur-md"
          >
            <motion.img
              src="/images/couple.jpeg"
              alt={`${config.data.brideName} and ${config.data.groomName}`}
              className="h-full w-full object-cover"
              initial={{ scale: 1.08, opacity: 0.95 }}
              animate={{ scale: [1.08, 1, 1.08], opacity: 1 }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "mirror",
              }}
              loading="eager"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end gap-2 px-6 pb-10 text-center text-white sm:pb-14">
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-xs uppercase tracking-[0.45em] text-white/80 sm:text-sm"
              >
                Our Story Begins
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7 }}
                className="text-3xl font-serif sm:text-[2.85rem]"
              >
                {config.data.brideName} &amp; {config.data.groomName}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.7 }}
                className="text-sm font-light text-white/80 sm:text-base"
              >
                {formatEventDate(config.data.date, "dayMonthYear")} at{" "}
                {config.data.time}
              </motion.p>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/40 to-transparent" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block mx-auto"
        >
          <span className="px-4 py-1 text-sm text-rose-600 rounded-full border border-rose-200 bg-rose-50">
            Save These Important Dates
          </span>
        </motion.div>

        <div className="space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base italic font-light text-gray-500 sm:text-lg"
          >
            God willing, we unite in a celebration of love, tradition, and joy.
          </motion.p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-5">
            {celebrationBadges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-rose-600 rounded-full shadow-sm bg-white/80"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {badge}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="relative max-w-md mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-rose-50/50 to-white/50 backdrop-blur-md rounded-2xl" />

          <div className="relative px-4 py-8 border rounded-2xl border-rose-100/50 sm:px-8 sm:py-10">
            <div className="absolute top-0 left-1/2 w-20 -translate-x-1/2 -translate-y-px sm:w-32">
              <div className="h-[2px] bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
            </div>

            <div className="space-y-6 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex justify-center"
              >
                <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-rose-100/70 bg-white/90 px-5 py-2 shadow-sm shadow-rose-100/70">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 sm:text-base">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 text-rose-500 shadow-sm">
                      <Calendar className="h-4 w-4" />
                    </span>
                    <span>
                      {formatEventDate(config.data.date, "dayMonthYear")}
                    </span>
                  </span>
                  <span className="hidden h-4 w-px bg-rose-100 sm:block" />
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 sm:text-base">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 text-rose-500 shadow-sm">
                      <Clock className="h-4 w-4" />
                    </span>
                    <span>{config.data.time}</span>
                  </span>
                </div>
              </motion.div>

              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-px bg-rose-200/50 sm:w-12" />
                <div className="w-2 h-2 bg-rose-200 rounded-full" />
                <div className="w-8 h-px bg-rose-200/50 sm:w-12" />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="space-y-2"
              >
                <p className="text-sm italic font-serif text-gray-500">
                  To our cherished guest
                </p>
                <p className="text-lg font-semibold text-rose-500">
                  {guestName ? guestName : "Honoured Guest"}
                </p>
                <p className="text-sm text-gray-600">
                  Your presence blesses this celebration
                </p>
              </motion.div>
            </div>

            <div className="absolute bottom-0 left-1/2 w-20 -translate-x-1/2 translate-y-px sm:w-32">
              <div className="h-[2px] bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
            </div>
          </div>

          <div className="absolute -top-2 -right-2 w-16 h-16 bg-rose-100/20 rounded-full blur-xl sm:h-24 sm:w-24" />
          <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-rose-100/20 rounded-full blur-xl sm:h-24 sm:w-24" />
        </motion.div>
        <CountdownTimer
          targetDate={countdownTarget?.iso}
          targetLabel={countdownTarget?.label}
          formattedDate={countdownTarget?.formattedDate}
        />

        <div className="relative pt-6">
          <FloatingPetals />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="flex items-center justify-center gap-3">
              <Heart
                className="w-10 h-10 text-rose-500 sm:w-12 sm:h-12"
                fill="currentColor"
              />
              <Flower2 className="w-8 h-8 text-amber-500 sm:w-10 sm:h-10" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
