export function CarregandoTemis() {
  return (
    <main className="temis-tela">
      <p className="temis-aviso">Estamos preparando tudo para você</p>
      <div className="temis-centro">
        <div className="temis-balanca" aria-hidden="true">
          <svg viewBox="0 0 240 240">
            <path d="M120 30v180M70 210h100" />
          </svg>
          <div className="temis-haste">
            <svg viewBox="0 0 240 240">
              <path d="M30 70h20c20 0 50-10 70-20 20 10 50 20 70 20h20" />
            </svg>
            <div className="temis-prato temis-prato-esq">
              <svg viewBox="0 0 240 240">
                <path d="M20 160l30-80 30 80c-8.7 6.5-19.2 10-30 10s-21.3-3.5-30-10z" />
              </svg>
            </div>
            <div className="temis-prato temis-prato-dir">
              <svg viewBox="0 0 240 240">
                <path d="M160 160l30-80 30 80c-8.7 6.5-19.2 10-30 10s-21.3-3.5-30-10z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
