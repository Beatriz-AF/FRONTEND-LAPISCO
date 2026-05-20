interface CurrentWeatherCardProps {
  cityName: string;
  temperatura: number;
  sensacao: number;
  umidade: number;
  vento: number;
  descricao: string;
  emoji: string;
  loading: boolean;
}

export function CurrentWeatherCard({
  cityName, temperatura, sensacao,
  umidade, vento, descricao, emoji, loading,
}: CurrentWeatherCardProps) {

  if (loading) {
    return (
      <div className="card-clima">
        <div className="topo"><h2>Carregando...</h2></div>
        <div className="temperatura">--°C</div>
        <div className="detalhes">
          <div className="info"><h3>Umidade</h3><p>--%</p></div>
          <div className="info"><h3>Vento</h3><p>-- km/h</p></div>
          <div className="info"><h3>Sensação</h3><p>--°C</p></div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-clima">
      <div className="topo">
        <h2>{cityName}</h2>
        <p>{descricao} {emoji}</p>
      </div>
      <div className="temperatura">{temperatura}°C</div>
      <div className="detalhes">
        <div className="info"><h3>Umidade</h3><p>{umidade}%</p></div>
        <div className="info"><h3>Vento</h3><p>{vento} km/h</p></div>
        <div className="info"><h3>Sensação</h3><p>{sensacao}°C</p></div>
      </div>
    </div>
  );
}