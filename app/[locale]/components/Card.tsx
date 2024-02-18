import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const Card = ({ data, numCard }: any) => {
  const name = data[0].producer;
  const photo = data[0].producerPhoto?.url;
  const description = data[0].producerDescription;
  const buttonText = data[0].buttonText;

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
