"use client";

import { FormEvent, useState } from "react";
import { GoogleMapEmbed } from "@/components/GoogleMapEmbed";
import { GOOGLE_MAP_EMBED_SRC, SERVICE_AREA_LABEL } from "@/data/location";

export function InstallerNetworkPageClient() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-14">
      <h1 className="mx-auto max-w-4xl text-center text-[28px] font-semibold leading-[1.12] md:text-4xl">
        Need a Glass Railing Installer in Ontario?
      </h1>
      <p className="mt-8 max-w-4xl text-sm leading-6 text-neutral-700 md:mt-10 md:text-base md:leading-7">
        We connect homeowners and contractors with trusted glass and aluminum railing installers across Ontario. From
        Toronto and the GTA to surrounding regions, our network specializes in frameless glass railings, balcony
        systems, and safety fencing.
      </p>
      <p className="mt-4 max-w-4xl text-sm leading-6 text-neutral-700 md:mt-5 md:text-base md:leading-7">
        Whether you&apos;re installing balcony railings, pool fencing, or commercial glass systems, we&apos;ll match
        you with experienced local professionals who meet Canadian building standards.
      </p>
      <div className="mx-auto mt-8 max-w-4xl md:mt-10">
        <p className="mb-3 text-xs text-neutral-600 md:text-sm">{SERVICE_AREA_LABEL}</p>
        <GoogleMapEmbed src={GOOGLE_MAP_EMBED_SRC} title="2450 Victoria Park Ave #100 service area map" />
      </div>

      {submitted ? (
        <div className="mt-10 max-w-3xl rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-neutral-800 md:mt-12">
          Thanks — we’ll connect you with an installer soon.
        </div>
      ) : (
        <form className="mt-10 max-w-3xl space-y-4 md:mt-12" onSubmit={onSubmit}>
          <input
            required
            type="text"
            name="name"
            placeholder="Name"
            className="w-full rounded-xl border border-neutral-200 px-4 py-3"
          />
          <input
            required
            type="tel"
            name="phone"
            placeholder="Phone"
            className="w-full rounded-xl border border-neutral-200 px-4 py-3"
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            className="w-full rounded-xl border border-neutral-200 px-4 py-3"
          />
          <input
            required
            type="text"
            name="cityPostal"
            placeholder="City / Postal Code"
            className="w-full rounded-xl border border-neutral-200 px-4 py-3"
          />
          <select required name="projectType" className="w-full rounded-xl border border-neutral-200 px-4 py-3">
            <option value="">Project Type</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Pool fence">Pool fence</option>
            <option value="Balcony">Balcony</option>
            <option value="Other">Other</option>
          </select>
          <textarea
            required
            name="message"
            placeholder="Message"
            rows={5}
            className="w-full rounded-xl border border-neutral-200 px-4 py-3"
          />
          <button
            type="submit"
            className="inline-flex h-11 items-center rounded-full bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-neutral-900"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
