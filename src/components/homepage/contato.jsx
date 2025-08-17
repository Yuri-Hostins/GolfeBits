import React, { useState } from "react";

const MAX_MSG = 600;

export default function ContatoSection() {
  const [values, setValues] = useState({ nome: "", email: "", mensagem: "" });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: "", text: "" });

  // validações simples
  const validators = {
    nome: (v) =>
      v.trim().length < 2 ? "Digite seu nome completo." : "",
    email: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Informe um e-mail válido.",
  };

  function validateAll(vals = values) {
    return Object.fromEntries(
      Object.keys(validators).map((k) => [k, validators[k](vals[k] || "")])
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name]) {
      setErrors({ ...errors, [name]: validators[name](value) });
    }
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validators[name](values[name]) });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validateAll();
    setErrors(errs);
    setTouched({ nome: true, email: true, mensagem: true });

    const hasError = Object.values(errs).some(Boolean);
    if (hasError) return;

    setSending(true);
    // simula envio
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setValues({ nome: "", email: "", mensagem: "" });
    setTouched({});
    setStatus({ type: "ok", text: "Mensagem enviada! Obrigado pelo contato 😊" });
    setTimeout(() => setStatus({ type: "", text: "" }), 4000);
  }

  const invalid = (f) => touched[f] && !!errors[f];

  return (
    <section id="contato" className="gb-section" role="region" aria-label="Contato">
      <div className="gb-shell">
          <h2 className="contato-title">
            <span className="dropcap">C</span>ontato
          </h2>
        <p className="contato-intro">
          Fale com a equipe do trabalho para sugestões ou dúvidas.
        </p>

        <form className="contato-form" onSubmit={handleSubmit} noValidate>
          <div className="contato-field">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              name="nome"
              type="text"
              placeholder="Seu nome"
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
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
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
            <label htmlFor="mensagem">Mensagem</label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows={5}
              placeholder="Escreva aqui..."
              value={values.mensagem}
            />
            <div className="textarea-meta" id="msg-meta">
              <span>{values.mensagem.length}/{MAX_MSG}</span>
            </div>
            {invalid("mensagem") && (
              <small id="err-mensagem" className="field-err" role="alert">
                {errors.mensagem}
              </small>
            )}
          </div>

          <button className="contato-btn" type="submit" disabled={sending}>
            {sending ? "Enviando..." : "Enviar"}
          </button>

          <div className={`contato-status ${status.type ? "show" : ""}`} aria-live="polite">
            {status.text}
          </div>
        </form>
      </div>
    </section>
  );
}
