import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const Card = ({ data, numCard }: any) => {
  const name = data.producer;
  const photo = data.producerPhoto?.url;
  const description = data.producerDescription;
  const buttonText = data.buttonText;

  return (
    <div className="card">
      <div className="card-content">
        <h1>{numCard}</h1>
        <h3 className="card-title">
          {documentToReactComponents(description.json)}
        </h3>
        <img src={photo} alt="Card" className="card-image" />
        <button className="card-button">{buttonText}</button>
      </div>
    </div>
  );
};

export default Card;
