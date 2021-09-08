
function App() {
  return (
    <div className="main" data-theme="default">
      <div className="geo">
        <div className="geo__location">Dubai, United Arab Emirates</div>
        <div className="geo__date">Fri, May 6</div>
      </div>
      
      <div className="temperature">
        <div className="temperature__deg">25</div>
        <div className="temperature__wrap">
          <div className="temperature__mesure">&deg;C</div>
          
          <div className="temperature__box">
            <div className="temperature__max">
              <span className="temperature__mark">{ '\u2191' }</span>
              <p className="temperature__text">38</p>
              <span className="temperature__unit">&deg;C</span>
            </div>
            <div className="temperature__min">
              <span className="temperature__mark">{ '\u2193' }</span>
              <p className="temperature__text">25</p>
              <span className="temperature__unit">&deg;C</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
