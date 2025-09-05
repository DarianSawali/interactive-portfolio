"use client";

import { useState } from "react";

const EMAIL = "das14@sfu.ca"; 

export default function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24">

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
          <p className="text-white/80">
            I&apos;m open to freelance, collabs, and full-time roles.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-black"
            >
              Email me
            </a>
            <CopyEmailButton email={EMAIL} />
          </div>

          <ul className="mt-8 space-y-3 text-sm text-white/70">
            <li>
              <InlineIcon/> {EMAIL}
            </li>
            <li>
              <InlineIcon/> Vancouver, BC 
            </li>
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

function InlineIcon() {
  return (
    <svg viewBox="0 0 20 20" className="mr-2 inline h-4 w-4 opacity-70" fill="currentColor">
      <path d="M2.5 4.5h15v11h-15v-11zm1.25 1.5l6.25 4.5 6.25-4.5H3.75zm13.75 8.75V7.6l-6.15 4.43a1.5 1.5 0 0 1-1.7 0L3.5 7.6v7.15h14z"/>
    </svg>
  );
}

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        } catch {}
      }}
      className="rounded-xl border border-white/20 px-5 py-3 text-sm font-medium"
    >
      {copied ? "Copied!" : "Copy email"}
    </button>
  );
}

function ContactForm() {
  const [state, setState] = useState({ name: "", email: "", message: "" });
  const disabled = !state.name || !state.email || !state.message;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Hello from ${state.name}`);
        const body = encodeURIComponent(`${state.message}\n\n— ${state.name} (${state.email})`);
        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      }}
      className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md"
    >
      <Field
        label="Name"
        value={state.name}
        onChange={(v) => setState((s) => ({ ...s, name: v }))}
      />
      <Field
        label="Email"
        type="email"
        value={state.email}
        onChange={(v) => setState((s) => ({ ...s, email: v }))}
      />
      <Field
        label="Message"
        as="textarea"
        rows={5}
        value={state.message}
        onChange={(v) => setState((s) => ({ ...s, message: v }))}
      />

      <div className="mt-4 flex gap-3">
        <button
          type="submit"
          disabled={disabled}
          className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          Send
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  as,
  type = "text",
  rows,
  value,
  onChange,
}: {
  label: string;
  as?: "textarea";
  type?: string;
  rows?: number;
  value: string;
  onChange: (v: string) => void;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  const Tag = (as === "textarea" ? "textarea" : "input") as
    | "textarea"
    | "input";

  return (
    <label className="group relative mb-6 block">
      <Tag
        id={id}
        type={type}
        rows={rows}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          onChange(e.target.value)
        }
        placeholder={label}
        className="
            peer w-full appearance-none
            [color-scheme:dark]
            bg-white/[0.04] text-white/90 outline-none
            px-4 py-3
            border border-white/12 rounded-xl
            placeholder-transparent
            transition-all duration-300

            focus:border-transparent focus:rounded-xl
            focus:border-b focus:border-b-white/30

            [&&:not(:placeholder-shown)]:border-transparent
            [&&:not(:placeholder-shown)]:rounded-xl
            [&&:not(:placeholder-shown)]:border-b
            [&&:not(:placeholder-shown)]:border-b-white/20

            autofill:bg-transparent
            autofill:text-white
            autofill:shadow-[inset_0_0_0_1000px_rgba(255,255,255,0.04)]
            autofill:[-webkit-text-fill-color:rgba(255,255,255,0.92)]
            autofill:[caret-color:rgba(255,255,255,0.92)]
        "
        />


      <span
        className="
          pointer-events-none absolute left-4 top-3 origin-left
          text-sm text-white/60 transition-all duration-300
          peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
          peer-focus:-translate-y-5 peer-focus:scale-100
          peer-[&:not(:placeholder-shown)]:-translate-y-5
          peer-[&:not(:placeholder-shown)]:scale-90
        "
      >
        {label}
      </span>
      
      <span
        aria-hidden
        className="
          pointer-events-none absolute left-3 right-3 bottom-0
          h-px bg-white/10 transition-all duration-300
          peer-focus:opacity-0 peer-[&:not(:placeholder-shown)]:opacity-0
        "
      />

      <span
        aria-hidden
        className="
          pointer-events-none absolute left-0 right-0 bottom-0
          h-[2px] origin-left scale-x-0
          bg-gradient-to-r from-fuchsia-400 to-cyan-300
          transition-transform duration-300
          peer-focus:scale-x-100
          peer-[&:not(:placeholder-shown)]:scale-x-100
        "
      />
    </label>
  );
}
