// A React functional "web-like" component
interface XSearchProps {
  name: string;
}

const XSearch: React.FC<XSearchProps> = ({ name }) => {
  const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {name}
    </a>
  );
};

export default XSearch;
