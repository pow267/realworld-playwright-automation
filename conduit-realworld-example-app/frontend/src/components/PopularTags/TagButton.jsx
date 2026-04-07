import { useFeedContext } from "../../context/FeedContext";

function TagButton({ tagsList }) {
  const { changeTab } = useFeedContext();

  const handleClick = (e) => {
    changeTab(e, "tag");
  };

  return tagsList.map((name, index) => (
    <button
      className="tag-pill tag-default"
      key={`${name}-${index}`}
      onClick={handleClick}
    >
      {name}
    </button>
  ));
}

export default TagButton;
