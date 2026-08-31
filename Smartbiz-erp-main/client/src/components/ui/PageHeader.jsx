import "./PageHeader.css";

function PageHeader({
  title,
  subtitle,
  buttonText,
  onButtonClick,
}) {
  return (
    <div className="page-header">

      <div className="page-header-left">

        <h1>{title}</h1>

        <p>{subtitle}</p>

      </div>

      {buttonText && (
        <button
          className="page-header-btn"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      )}

    </div>
  );
}

export default PageHeader;