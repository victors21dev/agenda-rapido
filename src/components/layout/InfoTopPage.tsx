type InfoTopPageProps = {
  title: string;
  description: string;
};

const InfoTopPage = ({ title, description }: InfoTopPageProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default InfoTopPage;
