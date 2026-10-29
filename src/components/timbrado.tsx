export function Timbrado() {
  return (
    <>
      <header className="timbrado-topo">
        <div className="timbrado-marca">
          <span className="timbrado-selo" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="#fffdf8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v18" />
              <path d="M8 21h8" />
              <path d="M12 6.5h.01" />
              <path d="M6.5 8.5h11" />
              <path d="M6.5 8.5 4.2 14.2a2.6 2.6 0 0 0 4.6 0z" />
              <path d="M17.5 8.5 15.2 14.2a2.6 2.6 0 0 0 4.6 0z" />
            </svg>
          </span>
          <span>
            <strong>Auxilia Legis</strong>
            <em>Assistente do Poder Legislativo</em>
          </span>
        </div>
        <div className="timbrado-lado">
          <p>Controle interno de prazos</p>
        </div>
        <span className="timbrado-linhas" aria-hidden>
          <i />
          <i />
        </span>
      </header>
    </>
  );
}

export function TimbradoRodape() {
  return (
    <footer className="timbrado-base">
      <span className="timbrado-linhas" aria-hidden>
        <i />
        <i />
      </span>
      <p>
        <strong>Auxilia Legis</strong>
        <span>Uso não comercial · Licença GPL</span>
      </p>
    </footer>
  );
}
