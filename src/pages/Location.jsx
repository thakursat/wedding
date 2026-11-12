import config from "@/config/config";
import translations from "@/config/translations";
import { useLanguage } from "@/lib/language";
import { CalendarCheck, ExternalLink, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const buildVenueList = (t) => {
  const agenda = Array.isArray(config.data.agenda) ? config.data.agenda : [];
  // Events list a location only when it is held at the venue below.
  const hostedEvents = agenda.filter((event) => event?.location);

  return [
    {
      id: "green-field-lawn",
      title: t(config.data.location),
      address: t(config.data.address),
      embed: config.data.maps_embed,
      mapsUrl: config.data.maps_url,
      hostedEvents,
    },
  ].filter((venue) => venue.title && venue.mapsUrl);
};

export default function Location() {
  const { t } = useLanguage();
  const text = translations.location;
  const venues = buildVenueList(t);

  return (
    <section id="location" className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 space-y-4 text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block font-medium text-rose-500"
          >
            {t(text.eyebrow)}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="font-serif text-4xl text-gray-800 md:text-5xl"
          >
            {t(text.heading)}
          </motion.h2>

          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 pt-4"
          >
            <div className="h-[1px] w-12 bg-rose-200" />
            <MapPin className="h-5 w-5 text-rose-400" />
            <div className="h-[1px] w-12 bg-rose-200" />
          </motion.div>
        </motion.div>

        <div className="mx-auto flex max-w-5xl flex-col gap-20">
          {venues.map((venue, index) => {
            const mapSection = (
              <motion.div
                key={`${venue.id}-map`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="h-[240px] w-full overflow-hidden rounded-3xl border-8 border-white shadow-xl sm:h-[300px] md:h-[360px]"
              >
                {venue.embed ? (
                  <iframe
                    src={venue.embed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full"
                    title={`${venue.title} map`}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-rose-50 text-sm text-rose-500">
                    {t(text.mapComingSoon)}
                  </div>
                )}
              </motion.div>
            );

            const detailSection = (
              <motion.div
                key={`${venue.id}-details`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <div className="h-full rounded-3xl border border-gray-100 bg-white p-8 shadow-lg">
                  <h3 className="text-2xl font-serif text-gray-800">
                    {venue.title}
                  </h3>

                  <div className="mt-6 space-y-4">
                    {venue.address && (
                      <div className="flex items-start gap-4">
                        <MapPin className="mt-1 h-5 w-5 text-rose-500" />
                        <p className="flex-1 text-gray-600">{venue.address}</p>
                      </div>
                    )}

                    {venue.hostedEvents?.length > 0 && (
                      <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.3rem] text-rose-400">
                          {t(text.hostedEvents)}
                        </p>
                        <ul className="mt-3 space-y-2 text-sm text-gray-700">
                          {venue.hostedEvents.map((event) => (
                            <li
                              key={`${venue.id}-${event.slug ?? event.title}`}
                              className="flex items-start gap-2"
                            >
                              <CalendarCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-500" />
                              <span>{t(event.title)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="pt-2">
                      <motion.a
                        href={venue.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        viewport={{ once: true }}
                        className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        {t(text.openInMaps)}
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );

            return (
              <div key={venue.id} className="flex flex-col gap-8">
                {mapSection}
                {detailSection}
                {index < venues.length - 1 && (
                  <div className="mx-auto mt-8 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-rose-200/80 to-transparent" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
