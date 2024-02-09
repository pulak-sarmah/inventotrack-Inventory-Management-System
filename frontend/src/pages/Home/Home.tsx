import { TbCircleLetterI } from "react-icons/tb";
import { Link } from "react-router-dom";
import "./home.scss";
import { brandStats } from "../../constants";
import heroImage from "../../assets/inv-img.png";

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between">
        <div className="logo">
          <TbCircleLetterI size={35} />
        </div>
        <ul className="home-links">
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <button className="--btn --btn-primary">
              <Link to="/login">Login</Link>
            </button>
          </li>

          <li>
            <button className="--btn --btn-primary">
              <Link to="/dashboard">Dashboard</Link>
            </button>
          </li>
        </ul>
      </nav>

      <section className="container hero --mt5">
        <div className="hero-text">
          <h2>Inventory & Stock management Solution</h2>
          <p>
            A simple and easy to use inventory management solution for small and
            medium businesses.
          </p>
          <div className="--flex-start">
            {brandStats.map((stat) => (
              <div key={stat.id} className="--mr">
                <h3 className="--color-white">{stat.number}</h3>
                <p className="--color-white">{stat.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImage} alt="inventory" />
        </div>
      </section>
    </div>
  );
};

export default Home;
