const RepositoryCard = ({ name, description, url }) => {
  const getDescriptionElipsis = () => {
    return !!description && description.substring(0, 40).trim() + "...";
  };
  return (
    <div className="col-xxl-3 col-xl-4 col-md-6 col-sm-6 col-xs-12 p-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{getDescriptionElipsis()}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Go to repository
          </a>
        </div>
      </div>
    </div>
  );
};

export default RepositoryCard;
