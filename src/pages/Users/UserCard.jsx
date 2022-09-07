const UserCard = ({ imageSrc, name, profileUrl }) => {
  return (
    <div
      className="col-xxl-3 col-xl-4 col-md-6 col-sm-6 col-xs-12 p-3"
    >
      <div className="card">
        <img
          src={imageSrc}
          className="card-img-top"
          alt={`User ${name}`}
        />
        <div className="card-body d-flex flex-column justify-content-center align-self-center">
          <h5 className="card-title text-center">{name}</h5>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Go to profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
