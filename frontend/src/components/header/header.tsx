const Header = () => {
  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Welcome, </span>
          <span className="--color danger">test</span>
        </h3>

        <button className="--btn --btn-danger">LogOut</button>
      </div>
      <hr />
    </div>
  );
};

export default Header;
