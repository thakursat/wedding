import { useEffect, useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Music,
  PartyPopper,
  BadgeCheck,
} from "lucide-react";
import config from "@/config/config";
import { formatEventDate } from "@/lib/formatEventDate";
import { useWindowSize } from "@/lib/useWindowSize";

const gradientPalette = [
  "from-orange-200/80 via-rose-200/70 to-pink-100/80",
  "from-amber-200/80 via-fuchsia-200/70 to-rose-100/80",
  "from-rose-200/80 via-red-100/70 to-yellow-100/80",
  "from-pink-200/80 via-orange-100/70 to-amber-100/80",
];

const EventDetailPage = () => {
  const { eventSlug } = useParams();
  const event = useMemo(
    () => config.data.agenda.find((item) => item.slug === eventSlug),
    [eventSlug]
  );
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [eventSlug]);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!event) {
    return <Navigate to="/" replace />;
  }

  const detail = event.detail ?? {};
  const gradientClass = useMemo(
    () => gradientPalette[event.slug.length % gradientPalette.length],
    [event.slug]
  );

  return (
    <div className="relative min-h-screen pb-16" id="event-detail">
      {showConfetti && width > 0 && height > 0 && (
        <Confetti
          width={width}
          height={height}
          gravity={0.3}
          numberOfPieces={220}
          recycle={false}
        />
      )}

      <section className="relative overflow-hidden rounded-b-[48px] bg-black/80">
        <div className="absolute inset-0">
          <img
            src={detail.heroImage ?? event.image}
            alt={`${event.title} celebration backdrop`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 px-5 pt-12 pb-16 text-white">
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/#event"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to events
            </Link>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm">
              <Sparkles className="h-4 w-4" />
              {event.themeTag}
            </span>
          </div>

          <div className="mt-8 space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-xs uppercase tracking-[0.2em] text-amber-100"
            >
              {event.subheading}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-serif leading-tight sm:text-4xl"
            >
              {event.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-rose-100/80 sm:text-base"
            >
              {detail.headline}
            </motion.p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
              <Calendar className="h-5 w-5 text-rose-200" />
              <div>
                <p className="text-xs uppercase tracking-wide text-rose-100/70">
                  Date
                </p>
                <p className="text-sm font-semibold">
                  {formatEventDate(event.date)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
              <Clock className="h-5 w-5 text-rose-200" />
              <div>
                <p className="text-xs uppercase tracking-wide text-rose-100/70">
                  Time
                </p>
                <p className="text-sm font-semibold">
                  {event.startTime} – {event.endTime} IST
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
              <MapPin className="h-5 w-5 text-rose-200" />
              <div>
                <p className="text-xs uppercase tracking-wide text-rose-100/70">
                  Venue
                </p>
                <p className="text-sm font-semibold">{event.location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`-mt-10 rounded-3xl border border-rose-100/60 bg-gradient-to-br ${gradientClass} p-6 shadow-xl`}
        >
          <div className="space-y-4 text-gray-700">
            <h2 className="text-lg font-semibold text-gray-900">
              About this celebration
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              {detail.description || event.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-rose-600 shadow-sm">
                <Music className="h-3.5 w-3.5" />
                Live performances all evening
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-rose-600 shadow-sm">
                <PartyPopper className="h-3.5 w-3.5" />
                {event.themeTag}
              </span>
              {detail.dressCode && (
                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-rose-600 shadow-sm">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Dress code: {detail.dressCode}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mt-10 space-y-8 px-5">
        {Array.isArray(detail.schedule) && detail.schedule.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl border border-rose-100 bg-white/80 p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              Flow of the evening
            </h3>
            <ul className="mt-4 space-y-3">
              {detail.schedule.map((slot) => (
                <li
                  key={`${slot.time}-${slot.activity}`}
                  className="flex items-start gap-3 rounded-2xl bg-rose-50/60 px-4 py-3"
                >
                  <span className="mt-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-rose-500 shadow-sm">
                    {slot.time}
                  </span>
                  <p className="text-sm text-gray-700">{slot.activity}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {Array.isArray(detail.highlights) && detail.highlights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-3xl border border-rose-100 bg-white/80 p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              Highlights to look forward to
            </h3>
            <div className="mt-4 grid gap-3">
              {detail.highlights.map((highlight) => (
                <motion.div
                  key={highlight}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-start gap-3 rounded-2xl bg-rose-50/70 px-4 py-3"
                >
                  <Sparkles className="mt-1 h-4 w-4 text-rose-500" />
                  <p className="text-sm text-gray-700">{highlight}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {Array.isArray(detail.notes) && detail.notes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl border border-rose-100 bg-white/80 p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              Important notes
            </h3>
            <ul className="mt-4 space-y-2">
              {detail.notes.map((note) => (
                <li
                  key={note}
                  className="flex items-start gap-3 text-sm text-gray-700"
                >
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {detail.keepsake && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="rounded-3xl border border-rose-100 bg-white/90 p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              A keepsake for you
            </h3>
            <p className="mt-3 text-sm text-gray-700">{detail.keepsake}</p>
          </motion.div>
        )}
      </section>

      <section className="mt-12 px-5 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl border border-rose-100 bg-white p-6 text-center shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-900">
            Stay for the entire celebration
          </h3>
          <p className="mt-3 text-sm text-gray-700">
            Every ritual is woven together—your presence adds warmth to our
            story. Follow the marigold trail back to the main invitation for
            more details on travel plans and celebration highlights.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/#event"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-rose-500 px-5 py-2 text-sm font-medium text-white shadow-lg transition hover:bg-rose-600"
            >
              <PartyPopper className="h-4 w-4" />
              View all wedding events
            </Link>
            <Link
              to="/#location"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-rose-200 px-5 py-2 text-sm font-medium text-rose-600 transition hover:border-rose-300 hover:bg-rose-50"
            >
              <MapPin className="h-4 w-4" />
              Venue directions
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default EventDetailPage;
