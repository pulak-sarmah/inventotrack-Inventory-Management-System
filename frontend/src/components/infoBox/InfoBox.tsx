import "./infoBox.scss";
interface InfoBoxProps {
  bgColor: string;
  title: string;
  count: string;
  icon: JSX.Element;
}

const InfoBox = ({ bgColor, title, count, icon }: InfoBoxProps) => {
  return (
    <div className={`info-box ${bgColor}`}>
      <span className="info-icon --color-white">{icon}</span>
      <span className="info-text">
        <p>{title}</p>
        <h4>{count}</h4>
      </span>
    </div>
  );
};

export default InfoBox;
