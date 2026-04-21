"use client";

import { FormEvent, useState } from "react";
import { GoogleMapEmbed } from "@/components/GoogleMapEmbed";
import { CONTACT_LOCAL_HEADING, GOOGLE_MAP_EMBED_SRC } from "@/data/location";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-14">
      <h1 className="text-center text-[28px] font-semibold leading-[1.12] md:text-4xl">Contact</h1>
      <p className="mx-auto mt-6 max-w-4xl text-sm leading-6 text-neutral-700 md:text-base md:leading-7">
        Looking for bulk glass railing hardware or contractor discounts? Contact us for competitive pricing on
        frameless glass railings, framed glass systems, aluminum railings, and premium railing components. We also
        connect homeowners and builders with trusted railing installers across Ontario and Canada. Whether your
        project is residential or commercial, our team is here to help you find the right products and professionals.
      </p>
      <div className="mx-auto mt-8 max-w-4xl space-y-3 md:mt-10 md:space-y-4">
        <h2 className="text-lg font-semibold md:text-2xl">{CONTACT_LOCAL_HEADING}</h2>
        <GoogleMapEmbed
          src={GOOGLE_MAP_EMBED_SRC}
          title="2450 Victoria Park Ave #100 service area map"
          className="mt-4 md:mt-5"
        />
      </div>
      <div className="mt-8 max-w-3xl md:mt-10">
        <p className="text-neutral-700">Email: </p>
        <p className="text-neutral-700">Phone: </p>
      </div>

      {submitted ? (
        <p className="mt-8 max-w-3xl rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-neutral-800 md:mt-10">
          Thanks — we received your message.
        </p>
      ) : (
        <form className="mt-8 max-w-3xl space-y-4 md:mt-10" onSubmit={onSubmit}>
          <input
            required
            type="text"
            name="name"
            placeholder="Name"
            className="w-full rounded-xl border border-neutral-200 px-4 py-3"
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            className="w-full rounded-xl border border-neutral-200 px-4 py-3"
          />
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
