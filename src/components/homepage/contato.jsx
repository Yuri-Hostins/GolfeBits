import React, { useState } from "react";
import { useI18n } from "../../i18n/I18nProvider";
import { DICTS } from "../../i18n/langs";

const MAX_MSG = 600;

export default function ContatoSection() {
  const { lang } = useI18n();
  const L = (DICTS[lang] || DICTS.pt).contact;

  const [values, setValues] = useState({ nome: "", email: "", mensagem: "", website: "" }); // website = honeypot
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: "", text: "" });

  const validators = {
    nome: (v) => (v.trim().length < 2 ? L.errors.nome : ""),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : L.errors.email),
    mensagem: (v) => {
      const t = (v || "").trim();
      if (!t) return L.errors.msgRequired;
      if (t.length > MAX_MSG) return L.errors.msgTooLong.replace("{max}", MAX_MSG);
      return "";
    },
  };

  function validateAll(vals = values) {
    return Object.fromEntries(Object.keys(validators).map((k) => [k, validators[k](vals[k] || "")]));
  }

  function handleChange(e) {
    const { name } = e.target;
    let value = e.target.value;

    if (name === "mensagem" && value.length > MAX_MSG) {
      value = value.slice(0, MAX_MSG);
    }

    const next = { ...values, [name]: value };
    setValues(next);

    if (touched[name] && validators[name]) {
      setErrors({ ...errors, [name]: validators[name](value) });
    }
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    if (validators[name]) {
      setErrors({ ...errors, [name]: validators[name](values[name]) });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // honeypot: se "website" tiver algo, provavelmente é bot — não envia.
    if (values.website) {
      setStatus({ type: "err", text: L.status.spam });
      return;
    }

    const errs = validateAll();
    setErrors(errs);
    setTouched({ nome: true, email: true, mensagem: true });

    if (Object.values(errs).some(Boolean)) return;

    try {
      setSending(true);

      // simula envio (substitua pelo seu fetch se quiser)
      await new Promise((r) => setTimeout(r, 900));

      setValues({ nome: "", email: "", mensagem: "", website: "" });
      setTouched({});
      setStatus({ type: "ok", text: L.status.ok });
    } catch (err) {
      setStatus({ type: "err", text: L.status.fail });
    } finally {
      setSending(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 4000);
    }
  }

  const invalid = (f) => touched[f] && !!errors[f];

  // Título com dropcap
  const first = L.title.slice(0, 1);
  const rest = L.title.slice(1);

  return (
    <section id="contato" className="gb-section" role="region" aria-label={L.aria.section}>
      <div className="gb-shell">
        <h2 className="contato-title">
          <span className="dropcap">{first}</span>
          {rest}
        </h2>
        <p className="contato-intro">{L.intro}</p>

        <form className="contato-form" onSubmit={handleSubmit} noValidate>
          {/* honeypot invisível para bots */}
          <div style={{ position: "absolute", left: "-9999px", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
            <label>
              {L.form.honeypot}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="contato-field">
            <label htmlFor="nome">{L.form.nome}</label>
            <input
              id="nome"
              name="nome"
              type="text"
              placeholder={L.form.placeholders.nome}
              value={values.nome}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={invalid("nome")}
              aria-describedby={invalid("nome") ? "err-nome" : undefined}
              className={invalid("nome") ? "is-invalid" : touched.nome && !errors.nome ? "is-valid" : ""}
              required
            />
            {invalid("nome") && (
              <small id="err-nome" className="field-err" role="alert">
                {errors.nome}
              </small>
            )}
          </div>

          <div className="contato-field">
            <label htmlFor="email">{L.form.email}</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder={L.form.placeholders.email}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={invalid("email")}
              aria-describedby={invalid("email") ? "err-email" : undefined}
              className={invalid("email") ? "is-invalid" : touched.email && !errors.email ? "is-valid" : ""}
              required
            />
            {invalid("email") && (
              <small id="err-email" className="field-err" role="alert">
                {errors.email}
              </small>
            )}
          </div>

          <div className="contato-field contato-full">
            <label htmlFor="mensagem">{L.form.mensagem}</label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows={5}
              placeholder={L.form.placeholders.mensagem}
              value={values.mensagem}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={invalid("mensagem")}
              aria-describedby={invalid("mensagem") ? "err-mensagem msg-meta" : "msg-meta"}
              required
            />
            <div className="textarea-meta" id="msg-meta">
              <span>
                {values.mensagem.length}/{MAX_MSG}
              </span>
            </div>
            {invalid("mensagem") && (
              <small id="err-mensagem" className="field-err" role="alert">
                {errors.mensagem}
              </small>
            )}
          </div>

          <button className="contato-btn" type="submit" disabled={sending}>
            {sending ? L.sending : L.submit}
          </button>

          <div className={`contato-status ${status.type ? "show" : ""}`} aria-live="polite">
            {status.text}
          </div>
        </form>
      </div>
    </section>
  );
}
